<!-- 其它用户展示界面 -->
<template>
  <div class="header">
    <router-link to="/home" class="logo">大厅</router-link>
    <div class="user-info">
      <Avatar class="avatar" :avatar="loginStore.userInfo.avatar" :userId="loginStore.userInfo.id" :width="35"></Avatar>
    </div>
  </div>

  <div class="total-panel">
    <nav class="nav-panel">
      <div style="height: 140px;"></div>
      <div class="user-panel">
        <Avatar class="avatar" :avatar="userInfo.avatar" :userId="userInfo.id" :width="88"></Avatar>
        <div class="user-info">
          <div class="user-name">{{ userInfo.username }}
          </div>
          <div class="user-sign">{{ userInfo.signature}}</div>
        </div>
        <div v-if="loginStore.userInfo.id != userInfo.id">
              <el-button class="btn"   @click="ChatUser">私聊</el-button>
        </div>
      </div>
    </nav>
    <main>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          历史投稿
          <!-- <router-link class="iconfont icon-circle" to="/user/post" style="text-decoration: none;">历史投稿</router-link> -->
        </el-menu-item>
      </el-menu>
    </main>
    <div class="listBox">
      <historyPost></historyPost>
      <!-- <router-view></router-view> -->
    </div>
  </div>

</template>
<script setup>
import HistoryPost from "./HistoryPost.vue";
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();
//获取用户信息
import { userInfoService } from "@/api/user";
const userInfo = ref({});
const getUserInfo = async()=>{
  let res = await userInfoService(route.params.userId);
  if(res.code==200){
    userInfo.value = res.data;
  }
}

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

import { createChat } from '@/api/chat';
const ChatUser = async()=>{
  //需要调用接口建立聊天组（如果不存在）
  const data = {
    uid1:loginStore.userInfo.id,
    uid2:route.params.userId
  }
  await createChat(data);
  router.push(`/chat/${userInfo.value.id}`);
}



onMounted(()=>{
  getUserInfo();
})
</script>


<style lang="scss" scoped>
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


.total-panel{
  margin:0px 250px;
  padding-top: 66px;
  // height: 1000px;
  height: auto;
  .nav-panel{
    padding-left: 100px;
    background-image: url(@/assets/img/bilibili/winter.jpg);
    background-repeat: no-repeat;
    width: 100%;
    height: auto;
    // display: flex;
    -webkit-box-pack: center;

    .user-panel{
      display: flex;
      align-items: center;
      .user-info{
        margin-left: 15px;
        .user-name{
          font-size: 30px;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .user-sign{
          font-size: 15px;
          font-weight: lighter;
        }

      }
    }

  }
}
.btn{
  margin-left: 12px;
  background: #ffffff00;
  font-size: 30px;
  border: 1px solid #fff;
  color: rgb(92, 141, 141);
              width: 66px;
              .iconfont{
                margin-right: 5px;
              }
            }
</style>