<template>
  <div class="container-message" id="messageCompBox">
    <!-- 有内容start -->
     <template v-if="props.message.length">
      <div class="box-item" v-for="(item,index) in props.message" :key="`message_${index}`">
        <div>
          <div v-if="item.role==='assistant'" >
            <Bubble :content="item.content" placement="start" isMarkdown="true" maxWidth="500px">
              <template #avatar>
                  <el-avatar
                      :size="32"
                      :src="avatarImg"
                  />
              </template>
              <template #footer>
                <div class="footer-container">
                  <el-button type="info" :icon="Refresh" size="small" circle class="iconfont icon-circle"/>
                  <el-button type="success" :icon="Search" size="small" circle class="iconfont icon-circle"/>
                  <el-button type="warning" :icon="Star" size="small" circle class="iconfont icon-circle"/>
                  <el-button color="#626aef" :icon="DocumentCopy" size="small" circle class="iconfont icon-circle"/>
                </div>
              </template>
              <template #header>
                <span>学谕</span>
              </template>
          </Bubble>
          </div>
          <div v-if="item.role !='assistant'" >
            <Bubble :content="item.content" placement="end" isMarkdown="true" maxWidth="500px">
              <template #avatar>
                  <el-avatar
                      :size="32"
                      :src="loginStore.userInfo.avatar"
                  />
              </template>
              <template #footer>
                <div class="footer-container">
                  <el-button type="info" :icon="Refresh" size="small" circle class="iconfont icon-circle"/>
                  <el-button type="success" :icon="Search" size="small" circle class="iconfont icon-circle"/>
                  <el-button type="warning" :icon="Star" size="small" circle class="iconfont icon-circle"/>
                  <el-button color="#626aef" :icon="DocumentCopy" size="small" circle class="iconfont icon-circle"/>
                </div>
              </template>
              <template #header>
                <span>{{ loginStore.userInfo.username }}</span>
              </template>
          </Bubble>
          </div>
        </div>
      </div>
     </template>
    <!-- 有内容end -->

    <!-- 无内容start -->
     <template v-else>
      <div class="empty-box">
        <!-- <el-empty description="暂无对话消息"></el-empty> -->
         <!-- <img src="@/assets/暂无记录.svg" alt=""> -->
          <img src="@/assets/img/npc2.png" alt="">
      </div>
     </template>
    <!-- 无内容end -->
  </div>
</template>
<script setup>
import avatarImg from '@/assets/npc2.png'
import Markdown from 'vue3-markdown-it';
import { ref, reactive, getCurrentInstance, nextTick, watch, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
import message from "@/utils/Message";
const loginStore = useLoginStore();

//接收父组件传递过来的数据
const props = defineProps({
  message:{
    type:Array,
    default:()=>[]
  }
})
const scrollToBottom = async () => {
  await nextTick() // 等 DOM 更新完成

  const box = document.getElementById('messageCompBox')
  if (box) {
    // 判断是否已经在底部附近（避免用户手动滚动时强行干预）
    const isNearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 50
    if (isNearBottom) {
      box.scrollTop = box.scrollHeight
    }
  }
}

//将scrollToBottom方法暴露出去
defineExpose({
  scrollToBottom
})
watch(()=>props.message,()=>{
  scrollToBottom();
},{deep: true})

onMounted(()=>{
  console.log(props.message)
  scrollToBottom();
})
</script>

<style lang="scss" scoped>
.container-message{
  // 滚动条例样式
  width: 100%;
  height: 100%;
  overflow: auto;//元素的溢出文本处理方式为自动

}

.empty-box{
  width: 100%;
  height: 100%;
  display: flex;
  // margin-top: 220px;
  justify-content: center;
  align-items: center;
}

.box-item{
  margin-bottom: 12px;
  height: auto;
  // max-height: 666px;


}

.message-item{
  //网格布局
  display: grid;
  column-gap: 8px;
}
.message-item-assistant{
  grid-template-columns: 40px auto 40px;
  justify-content: start;
}
.message-item-user{
  grid-template-columns: 0% auto 40px;
  justify-content: end;
}

.message-item-avatar{
  width: 36px;
  height: 36px;
  background-color: #888282;//设置元素的背景颜色
  border: 2px solid #e99d53;
  padding: 4px;//设置元素的内边距
}
.message-item-content{
  background-color: #706d6d;//设置元素的背景颜色
  position: relative;
  border-radius: 8px;
}

.message-item-content-left::before,
.message-item-content-right::before{
  content: '';//设置内容为空
  width: 0;
  height: 0;
  position: absolute;//绝对位置
  border: 5px solid transparent;
}
.message-item-content-left::before{//右边框
  border-right-color: #2f2f2f;
  left: -9px;
}
.message-item-content-right::before{//左边框
  border-left-color: #2f2f2f;
  right: -9px;
}
.message-item-text{
  padding: 0rem 12px;
  color: #fff;
  position: absolute;
  font-size: 0.875rem;
  line-height: 1.5;
}


</style>