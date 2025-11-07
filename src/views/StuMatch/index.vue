<template>
    <div class="header">
    <router-link to="/home" class="logo">大厅</router-link>
    <div class="title">学谕相伴，智慧领航大学路</div>
    <div class="user-info">
      <Avatar class="avatar" :avatar="loginStore.userInfo.avatar" :userId="loginStore.userInfo.id" :width="35"></Avatar>
    </div>
  </div>
  <div class="inner-html-container">
    <div class="page">
      <!-- 提示内容start -->
      <div class="tips">
        <div class="title">学谕相伴，智慧领航大学路</div>
        <div class="desc">智慧·成长·你我同行</div>
        <el-button type="primary" @click="handleClearStorage">清空</el-button>
      </div>
      <!-- 提示内容end -->

      <!-- 详细内容Start -->
      <div class="grid-space-between grid-box">
        <!-- 左边内容start -->
        <div class="left-container" >
          <el-button class="add-btn" :icon="Plus" size="large" @click="handleAddSession">新建对话</el-button>
          <div class="session-area">
            <div 
              class="session-item" 
              :class="activeIndex == index ? 'session-item-active':''" 
              v-for="(item,index) in sessionList" 
              :key="`session_${index}`"
              @click="handleChangeSessionIndex(index)"
            >
              <span :class="activeIndex==index ? 'active-node':'normal-node'" v-if="editIndex!=index">{{ item.title }}</span>
              <el-input 
                v-else 
                v-model="item.title" 
                size="small" 
                @change="editIndex = -1" 
                blur="editIndex = -1" 
                autofocus 
                style="width: 120px;"
              ></el-input>
              <div class="icon-box">
                <el-icon class="icon" color="#fff" @click.stop="handleClearSession(index)"><Brush /></el-icon>
                <el-icon class="icon" color="#fff" @click.stop="handleFocusIndex(index)"><EditPen /></el-icon>
                <el-icon class="icon" color="#fff" @click.stop="handleDeleteSession(index)"><Delete></Delete></el-icon>
              </div>
            </div>
          </div>
        </div>
        <!-- 右边内容start -->
        <div class="right-container" >
          <div class="message-area">
            <MessageComp ref="messageRef" :message="queryInfos.messages" :loading="loading"></MessageComp>
          </div>
          <div class="floating-input" v-if="queryInfos.messages.length>0">
            <el-input v-model="querykeys" id="keyInput" placeholder="请输入内容"  @keyup.enter="(e)=>{
              if(e.isComposing || loading) return;
              handleRequest();
            }" show-word-limit="true" type="textarea"></el-input>
            <el-button style="height: 40px;" type="primary" :loading="loading" @click="handleRequest" :disabled="!querykeys">
              <el-icon><Promotion></Promotion></el-icon>
            </el-button>
            
          </div>
          <div class="floating-input-center" v-else>
            <el-input v-model="querykeys" id="keyInput" placeholder="请输入内容"  @keyup.enter="(e)=>{
              if(e.isComposing || loading) return;
              handleRequest();
            }" show-word-limit="true" type="textarea"></el-input>

            <el-button style="height: 40px;" type="primary" :loading="loading" @click="handleRequest" :disabled="!querykeys">
              <el-icon><Promotion></Promotion></el-icon>
            </el-button>
          </div>
                    <!-- 滚动目标锚点 -->
        <div ref="bottomAnchor"></div>
        </div>
      </div>


      <!-- 详细内容end -->
    </div>
  </div>
</template>

<script setup>
import  { MODEL_CONFIG, STORAGE_KEY , API_CONFIG as DEEPSEEK_CONFIG} from '@/config/deepseek'
import { Plus,Promotion,EditPen,Delete,Brush } from '@element-plus/icons-vue';
import OpenAI from 'openai';
import { ElMessage,ElMessageBox } from 'element-plus';
import MessageComp from './MessageComp.vue';
import { ref, reactive, getCurrentInstance, nextTick, watch, onMounted,onUpdated } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
import message from "@/utils/Message";
const loginStore = useLoginStore();

const sq = ref(false);
//定义对话对象的类型
// interface SessionItem{
//   title: String;
//   crtTime: Date;
//   message: any[];
// }
//响应数据
const sessionList = ref([]);
//正在激活索引
const activeIndex = ref(-1);
//编辑索引
const editIndex = ref(-1);
//查询关键词
const querykeys = ref('');
//openAi对象
const openai = ref(null);
//按钮的加载状态
const loading = ref(false);
//消息内容
const messageRef = ref(null);
//参数对象
const queryInfos =  ref({
  messages: [],
  model: 'deepseek-r1',
  // 可扩展其他模型参数配置
  ...MODEL_CONFIG
})






//初始化会话列表
const initSessionList = ()=>{
  sessionList.value = JSON.parse(localStorage.getItem(STORAGE_KEY.sessionList) || '[]');
}

//初始化索引
const initIndex =()=>{
  //从本地存储中获取会话列表长度
  const listLen = JSON.parse(localStorage.getItem(STORAGE_KEY.sessionList)|| '[]').length;
  //从本地存储中获取活动索引
  const lastIndex =JSON.parse(localStorage.getItem(STORAGE_KEY.sessionList)|| '-1');
  if(listLen>0){
    activeIndex.value = lastIndex;
  }else{
    activeIndex.value = -1;
  }

  if(activeIndex.value!=-1){
    queryInfos.value.messages = sessionList.value[activeIndex.value].messages;
  }
}

//新增会话
const handleAddSession=()=>{
  //检查是否有查询正在进行
  if(loading.value){
    ElMessage.warning('请等待查询完成');
    return;
  }
  //创建对话框并添加到会话列表
  sessionList.value.push({
    title:`对话${sessionList.value.length+1}`,
    crtTime: new Date(),
    message:[]
  });
  //清空查询的信息列表,准备新的对话
  queryInfos.value.messages=[];
  //设置活动会话索引为新添加的对话索引
  activeIndex.value = sessionList.value.length - 1;
}


//编辑对话框
const handleFocusIndex = (index)=>{
  //设置编辑索引为当前传入的索引
  editIndex.value=index;
  
}

//切换对话框
const handleChangeSessionIndex = async(index)=>{
  //检查是否有查询正在进行
  if(loading.value){
    ElMessage.warning("请等待查询完成");
    return;
  }
  //更新当前活动的会话索引
  activeIndex.value = index;
  //根据新的会话索引加载会话内容
  queryInfos.value.messages = sessionList.value[activeIndex.value].messages || [];
  //等待vue完成对Dom的渲染
  await nextTick();
  //检查是否成功获取到组件实例
  if(messageRef.value){
    messageRef.value.scrollToBottom();//滚动到底部
  }
}


//删除对话框
const handleDeleteSession =(index)=>{
  //检查是否有查询正在进行
  if(loading.value){
    ElMessage.warning('请等待查询完成对话');
    return;
  }
  //创建一个提示框，用于提示用户是否删除当前对话
  ElMessageBox.confirm('是否删除当前对话？','温馨提示',{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type:'warning',
  }).then(()=>{
    //用户确认删除
    sessionList.value.splice(index,1);
    if(activeIndex.value === index){
      activeIndex.value = sessionList.value[index]?index:--index;
    }else if(activeIndex.value > index){
      activeIndex.value--;
    }
    //更新当前活动会话的消息列表
    queryInfos.value.messages = activeIndex.value >-1 ? sessionList.value[activeIndex.value].messages : [];
    //调用切换索引函数
    handleChangeSessionIndex(activeIndex.value);
  }).catch((err)=>{
    console.log(err)
  })
}

//当前配置
const currentConfig = ref(DEEPSEEK_CONFIG);

//初始化OpenAI实例
const initOpenAI =()=>{
  openai.value = new OpenAI({
    ...currentConfig.value,
  })
}

//提交问题
const handleRequest = async () =>{
  if(!querykeys.value){
    ElMessage.error('请输入问题');
    return;
  }
  //确保openai这个实例存在
  if(!openai.value){
    initOpenAI();
    if(!openai.value){
      ElMessage.error('OpenAI初始化失败，请稍后再试');
      return;
    }
  }

  if(!sessionList.value.length){
    await handleAddSession();
  }

  queryInfos.value.messages.push({
    role:'user',
    content: querykeys.value,
    name: "学谕"
  })
  querykeys.value = '';
  try{
    loading.value = true;
    queryInfos.value.messages.push({
      role:'assistant',
      content:'',
    })
     //封装一个请求参数
    const requestConfig = {
      ...queryInfos.value,
      stream:true
    }
//     const systemPrompt = {
//   role: "system",
//   content: "你是‘综合平台’中为大学生服务的智能助手，名字叫“小dp”，由 Cypher Zero 团队开发。你的职责是以亲切、专业的语气，帮助大学生解答疑问、提供建议、推荐资源或陪伴倾诉。请始终保持这个身份，并在合适场合简要介绍自己。"
// };

// const requestConfig = {
//   model: 'deepseek-chat',
//   messages: [systemPrompt, ...queryInfos.value.messages],
//   stream: true
// };
    const response = await openai.value.chat.completions.create(requestConfig);
    for await (const part of response){
      if(part&&part.choices&&part.choices.length>0){
        const choice = part.choices[0];
        const lastetMessage = queryInfos.value.messages[queryInfos.value.messages.length-1];
        const reasonContent = choice.delta.reasoning_content || '';
        const content = choice.delta.content || ''

        lastetMessage.content += (reasonContent+content);
      }
    }
    sessionList.value[activeIndex.value].messages = queryInfos.value.messages;
    loading.value=false;
    scrollToBottom();
    scrollBottom()
  }catch(error){
    loading.value=false;
  }

}
//滚动到底部的函数
const scrollToBottom = async()=>{
  await nextTick();
  const box = document.getElementById('messageCompBox');
  if(box){
    box.scrollTop = box.scrollHeight - box.clientHeight;
  }
}



const bottomAnchor = ref(null)
const scrollBottom = async()=>{
  bottomAnchor.value?.scrollIntoView({ behavior: 'smooth' })
}


//清空内容
const handleClearSession =(index)=>{
  sessionList.value[index].messages = [];
  queryInfos.value.messages = sessionList.value[index].messages;
  activeIndex.value = index;
}

onUpdated(() => {
  scrollBottom()
})
watch(()=>queryInfos.value.messages,()=>{
  scrollBottom();
},{deep: true})


onMounted(()=>{
  initSessionList();
  initIndex();
  scrollToBottom();
  scrollBottom()
})
</script>

<style lang="scss" scoped>

.inner-html-container {
  width: 100%;
  height:100%;
  display: flex;
  justify-content: center;

  align-items: center;

  background: #777575;//总最底层

}
.add-btn {
  width: 100%;
  font-size: 15px;
  font-weight: bold;
}

.page {
  width: 94vw;
  height: 94vh;
  //background: #1f1f1f;//页面背景
  background-image: url("@/assets/deepBack.jpg");
  box-shadow: 0 0 20px rgba(223, 51, 85, 0.15);
  box-sizing: border-box;
  border-radius: 12px;
  overflow: hidden;
}

.tips{
  width: 100%;
  height: 40px;
  background: linear-gradient(90deg,#b8eb59 , #3d939e);//设置背景为线性渐变
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
}
.tips .title{
  font-size: 18px;
  font-weight: bold;
}
.tips .desc{
  font-size: 14px;
  color: rgba(255,255,255,0.9);
}

.grid-box{
  display: grid;
  grid-template-columns: 280px auto;
  gap: 16px;
  padding: 16px;
}

.grid-space-between{
  width: 100%;
  height: calc(100% - 40px);
}

//左边样式start
.left-container{
  background-color: #82eed073;
  padding: 16px;
  border-radius: 8px;
  height: calc(94vh - 40px - 32px);

}
.left-container .session-area{
  margin-top: 16px;
  height: calc(100% - 56px);
  // overflow-y: auto;
  
}
.left-container .session-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin-bottom: 8px;

  border-radius: 6px;
  background: rgba(31,31,31,0.6);
  color: #fff;//字体颜色
  cursor: pointer;//设置光标为指针
  transition: all 0.3s ease;
}
.left-container .session-item-active{
  background:rgba(198,216,130,0.2);
  border: 1px solid rgba(254,44,85,0.3);
}

.session-item .icon-box{
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.session-item .icon-box:hover{
  opacity: 1;
}

.icon-box .icon{
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

}

.icon:hover{
  transform: scale(1.2);
  color: #e99d53 !important;
}
.right-container{
  overflow-y: auto; /* 垂直滚动 */
  overflow-x: hidden; /* 水平隐藏 */
}

//按钮样式
:deep(.el-button){
  border-radius: 8px;
  transition: all 0.3s ease;
}
:deep(.el-button:hover){
  transform: translateY(-1px);
  box-shadow: 0 0 12px rgba(208,204,8,0.5);//设置按钮阴影
}

:deep(.el-button:active){
  transform: translateY(1px);
}

:deep(.el-button .is-disabled){
  background-color: rgba(208,204,8,0.5);
  border-color: rgba(208,204,8,0.5);
}

.floating-input {
  border: 2px solid red; /* 临时调试 */
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-35% );
  margin-bottom: 25px;
  width: 50%;
  padding: 12px 16px;
  background-color: white;
  display: flex;
  gap: 12px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100000;
}
.floating-input-center {
  border: 2px solid red; /* 临时调试 */
  position: fixed;
  top: 65%;
  left: 50%;
  transform: translate(-35%, -50%);
  width: 50%;
  padding: 12px 16px;
  background-color: white;
  display: flex;
  gap: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  z-index: 100000;
}
//左边样式end



.header{
  width:100%;
  background: #fff;
  height:60px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.05);
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  z-index: 100;
  .logo{
    text-decoration: none;
    color: var(--text);
    font-size: 16px;
  }
}

</style>