<template>
  <div class="my-message">
    <el-container class="height:100%;" v-if="OtherList">
      <!-- left -->
      <el-aside width="250px"
                class="left">
        <div class="left-title">最近消息</div>
        <div class="recent-mess-div">
          <router-link v-for="(otherUser,index) in OtherList"
              :class="activeId===index?'recent-mess-active':'recent-mess'"
              :key="index"
              @click="changeIn(index,otherUser)"
              :to="`/userChat/${otherUser.id}`"
          >
            <div  class="uCard" >
              <div class="head-picture">
                <el-avatar :src="otherUser.avatar" :size="42"></el-avatar>
              </div>
              <div class="nick-name">
                {{otherUser.username}}
              </div>
            </div>
          </router-link>
        </div>
      </el-aside>

      <!-- main -->
      <el-main style="padding-top:0px;padding-bottom:0px;" class="right" >
        <div class="nick-name-title">{{OtherList[activeId]?.username}}</div>
        <router-view :key="$route.fullPath"></router-view>
        <!-- <ChatMessage 
          :uid2="ui"
          :otherName="name" 
          :avatar="ava"
        ></ChatMessage> -->
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import ChatMessage from "./ChatMessage.vue";
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const activeId = ref(0);
const ui = ref(0);
const name = ref("");
const ava = ref("")
const changeIn =(index,item)=>{
  activeId.value = index;
  ui.value = item.id;
  name.value=item.username
}

import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();
const uid1 = loginStore.userInfo.id;//用户id

const OtherList = ref([{
  id:'1',
  username:'robin'
},{
  id:'2',
  username:'sllh'
}]);//与用户有关联的所有聊天组
import { getHistory } from "@/api/chat";
const GetOtherInfo = async()=>{
  let res = await getHistory(uid1);
  if(res.code==200){
    OtherList.value = res.data;
  }
}


// onMounted(()=>{
//   GetOtherInfo();
//   console.log(loginStore.userInfo.id);
// })
onMounted(async () => {
  await GetOtherInfo();
  if (OtherList.value.length > 0) {
    activeId.value = 0;
  }
});
</script>

<style lang="scss" scoped>
.my-message {
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  flex-direction: column;
  margin-top: 10px;
  height: 800px;
  overflow-y: auto;
}
.left {
  border-right: solid 1px #eee;
  height: 100%;
  overflow: hidden;
}
.right{
  overflow: hidden;
}
.left-title {
  height: auto;
  padding: 5px;
  padding-left: 10px;
  display: flex;
  color: #666666;
  font-size: 14px;
  border-bottom: solid 1px #eee;
}
.recent-mess-div {
  height: 650px;
  overflow-y: auto;
}
.recent-mess {
  display: flex;
  align-items: center;
  height: 80px;
  cursor: pointer;
}
.recent-mess:hover {
  background: #e4e5e6;
}
.recent-mess-active {
  display: flex;
  align-items: center;
  // background: #e4e5e6;
  background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
  height: 80px;
  cursor: pointer;
}
.head-picture {
  padding: 10px;
}
.nick-name {
  width: auto;
  color: #222;
  font-size: 16px;
  // margin-top: 20px;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-content: center;
}
.nick-name-title {
  padding: 5px;
  font-size: 14px;
  color: #222;
  border-bottom: solid 1px #eee;
}
.communication {
  background: #fff;
  height: 165px;
  /* box-shadow: 0 0 5px 1px rgba(158, 179, 193, 0.5); */
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 8px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3); */
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(251, 114, 153, 0.5);
  /* -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5); */
}
.uCard{
  display: flex;
}
</style>