<template>
  <div class="page-container">
    <div class="scrollable-top">
      <!-- 这里是可以滚动的上方内容 -->
      <div class="box-item" v-for="(item,index) in messageList" :key="`message_${index}`">
        <div>
          <div v-if="item.uid1 == route.params.uid2" >
            <Bubble :content="item.content" placement="start" isMarkdown="true" maxWidth="500px">
              <template #avatar>
                  <el-avatar
                      :size="40"
                      :src="otherInfo.avatar"
                  />
              </template>
              <template #footer>
                <div class="footer-container">
                  <div>{{ item.createTime }}</div>
                  <el-button color="#626aef" :icon="DocumentCopy" size="small" circle class="iconfont icon-circle"/>
                </div>
              </template>
              <template #header>
                <span>{{ otherInfo.username }}</span>
              </template>
          </Bubble>
          </div>
          <div v-if="item.uid1 == loginStore.userInfo.id" >
            <Bubble :content="item.content" placement="end" isMarkdown="true" maxWidth="500px">
              <template #avatar>
                  <el-avatar
                      :size="40"
                      :src="loginStore.userInfo.avatar"
                  />
              </template>
              <template #footer>
                <div class="footer-container">
                  <div>{{ item.createTime }}</div>
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
    </div>

    <el-backtop :right="100" :bottom="500" />

    <div class="fixed-bottom">
      <!-- 这里是底部固定组件，发送按钮 -->
      <Sender 
        ref="senderRef" 
        v-model="contents" 
        :loading="senderLoading"
        clearable 
        @submit="handleSubmit" 
        :input-style="{ backgroundColor: 'transparent', color: '#FF5454', fontSize: '20px', fontWeight: 700 }" 
        style="background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%); border-radius: 8px;width: 1000px;"
      />
    </div>
  </div>
  <!-- <Sender v-model="senderValue" :input-style="{ backgroundColor: 'transparent', color: '#FF5454', fontSize: '20px', fontWeight: 700 }" style="background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%); border-radius: 8px;" /> -->
  
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted, onUpdated } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

const senderRef = ref()
const timeValue = ref(null)
const contents = ref('')//评论信息
const senderLoading = ref(false)

const submitBtnDisabled = ref(true)
//route.params.problemId

const otherInfo = ref({})
import { OtherInfo } from "@/api/chat";
const getInfo = async()=>{
  let res = await OtherInfo(route.params.uid2);
  if(res.code == 200){
    otherInfo.value = res.data;
    getUserMessageList();
  }
}


const userInfo = computed(() => ({
  uid1: loginStore.userInfo.id,
  uid2: route.params.uid2
}));


const messageList = ref([]);



import { getMessageList } from "@/api/chat";
const getUserMessageList = async()=>{
  const data ={
    uid1:loginStore.userInfo.id,
    uid2:route.params.uid2,
  };
  let res = await getMessageList(data);
  if(res.code == 200){
    messageList.value=res.data;
  }
}



import { sendMessage } from "@/api/chat";
const sendUSerMessage = async(value)=>{
  senderLoading.value = true;
  const data ={
    uid1:loginStore.userInfo.id,
    uid2:route.params.uid2,
    content:value
  };
  let res = await sendMessage(data);
  if(res.code==200){
    senderLoading.value = false;
    getUserMessageList();
    contents.value = '';
  }
}

function handleSubmit(value) {
  sendUSerMessage(value);
}


// onMounted(()=>{
//   getInfo();
//   
// })
// watch(() => props.uid2, (newVal, oldVal) => {
//   if (newVal !== oldVal) {
//     getUserMessageList();
//   }
// });


import {  onUnmounted } from 'vue'

let timer = null;

onMounted(() => {
  getInfo(); // 初始加载
  timer = setInterval(() => {
    getUserMessageList();
  }, 1000); // 每 3 秒拉一次
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});


//滚到底部
// const scrollToBottom = () => {
//   nextTick(() => {
//     const container = document.querySelector(".scrollable-top");
//     container.scrollTop = container.scrollHeight;
//   });
// };

// watch(messageList, () => {
//   scrollToBottom();
// });


</script>

<style scoped lang="scss">
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 可滚动的上方区域 */
.scrollable-top {
  // flex: 1; /* 占据除去底部的全部空间 */
  overflow-y: auto;
  padding: 5px;
  min-height: 700px;
  max-height: 700px;
  height: auto;
  background-color: #f9f9f9;
}

/* 固定底部区域 */
.fixed-bottom {
  height: 60px;
  // background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
