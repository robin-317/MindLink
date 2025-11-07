<template>
  <div class="total-panel">
    <div style="width: 50px;"></div>
    
    <!-- <index></index> -->
    <div class="left">
      <div class="child-left">
        <div class="logo">
          <el-avatar :size="100" :src="loginStore.userInfo.avatar" style="width: 100px;margin-top: 20px;"/>
          <div :class="{ name: true, 'text-hidden': true,  }">
            <span class="bg">{{ loginStore.userInfo.username }}</span>
          </div>
        </div>
      </div>
      <div class="child-left">
            <!-- 简介 -->
        <div class="description cards" @click="editing = true">
              <div class="text">
                <p v-if="!editing">{{ signature }}</p>
                <!-- 编辑状态：输入框 -->
      <input
        v-else
        v-model="signature"
        @blur="saveSignature"
        @keyup.enter="saveSignature"
        ref="inputRef"
        class="edit-input"
      />
              </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="top-half">
        <div class="child-right">
          <div class="rights cards">
          <div class="time">
            <div class="date">
              <span>{{ currentTime.year }}&nbsp;年&nbsp;</span>
              <span>{{ currentTime.month }}&nbsp;月&nbsp;</span>
              <span>{{ currentTime.day }}&nbsp;日&nbsp;</span>
            </div>
            <span class="sm-hidden" >{{ currentTime.weekday }}</span>
            <div class="text">
              <span> {{ currentTime.hour }}:{{ currentTime.minute }}:{{ currentTime.second }}</span>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="bottom-half fuc">
        <!-- 下半部分可放其他内容 -->
        <el-row :gutter="50" class="row-center">
          <el-col :span="8">
            <router-link to="/ownHome/passage" style="text-decoration: none;"><div class="cardss fuckc"  @click="change(2)">文章</div></router-link>
          </el-col>
          <el-col :span="8">
            <router-link to="/ownHome/problem" style="text-decoration: none;"><div class="cardss fuckc" @click="change(3)">问题</div></router-link>
          </el-col>
          <el-col :span="8">
            <router-link to="/ownHome/video" style="text-decoration: none;"><div class="cardss fuckc"  @click="change(4)">视频</div></router-link>
          </el-col>
        </el-row>

        <el-row :gutter="50" class="row-center">
          <el-col :span="8">
            <router-link to="/ownHome/star" style="text-decoration: none;"><div class="cardss fuckc"  @click="change(5)">收藏</div></router-link>
          </el-col>
          <el-col :span="8">
            <router-link to="/ownHome/info" style="text-decoration: none;"><div class="cardss fuckc" @click="change(1)">个人信息</div></router-link>
          </el-col>
          <el-col :span="8">
            <router-link style="text-decoration: none;"><div class="cardss fuckc" @click="exits">退出</div></router-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
import index from "@/views/Personal/OwnOne/userHome/index.vue";
import { ref, reactive, getCurrentInstance, nextTick,onMounted,onBeforeUnmount,watch } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();
import { getCurrentTime } from "@/utils/getTime";


import bus from '@/utils/eventBus'
import axios from 'axios';

function logout() {
  // 1. 从 localStorage 中移除存储的用户信息／令牌
  localStorage.removeItem('loginUser');
  
  // 如果你只是把整个用户对象存进去，也可以直接调用 clear() 清空所有 localStorage
  // localStorage.clear();

  // 2. 清除 Axios 全局默认的 Authorization 头（如果之前有设置）
  delete axios.defaults.headers.common['Authorization'];

  // 3. （可选）跳转到登录页或首页
  window.location.href = '/login';
}


const change=(index)=>{
  bus.emit('activeI', index);
}
const exits = ()=>{
  logout();
  // router.push("/login")
}
// 当前时间
const currentTime = ref({});
const timeInterval = ref(null);
// 更新时间
const updateTimeData = () => {
  currentTime.value = getCurrentTime();
};


const editing = ref(false);
const signature = ref(loginStore.userInfo.signature);
const inputRef = ref(null);

// 自动 focus 输入框
watch(editing, (val) => {
  if (val) {
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
});
import { OtherInfo } from "@/api/chat";
const newInfo = async()=>{
  let res = await OtherInfo(loginStore.userInfo.id);
  if(res.code==200){
    // sessionStorage.setItem('userInfo', JSON.stringify(res.data));
  }
}

import { exchangeUserInfo } from "@/api/user";
// 保存签名并退出编辑状态
async function saveSignature() {
  editing.value = false;
  const form = {
    name: '',
    passwords:'',
    signature:signature.value,
    avatar:''
};

  let res = await exchangeUserInfo(loginStore.userInfo.id, form);
  if(res.code==200){
    newInfo();
  }
}

onMounted(() => {
  updateTimeData();
  timeInterval.value = setInterval(updateTimeData, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timeInterval.value);
});
</script>

<style lang="scss" scoped>

.total-panel{
  background-image: url(@/assets/img/背景3.jpg);
  // margin-left: 120px;
  padding-left: 50px;
  // margin-top: 10px;
  // margin-right: 15px;
  border-left: 2px solid rgb(223, 150, 150);
  border-radius:50px;
  // background: rgb(50, 50, 85);
  display: flex;
  width: 100vw;
  margin-left: calc(-50vw + 50%); /* 居中修正 */
  //height: 920px; /* 或具体高度 */
  height: 100vh; /* 100%视口高度 */
  /* 添加左边阴影 */
  box-shadow: -8px 0 15px -4px rgba(0, 0, 0, 0.4);

}

.re{
  // z-index: 220;
  display: flex;
  font-size: 35px;
  height: 40px;
}


.left, .right {
  height: 100%;
}
.left{
  flex: 1;
  display: flex;
  flex-direction: column;       /* 垂直排列 */
  justify-content: center;      /* 垂直方向居中 */
  align-items: center;          /* 水平方向居中 */
}
.right{
  flex: 2;
  display: flex;
  flex-direction: column;
}
.top-half {
  flex: 1;
  display: flex;
  justify-content: center;  /* ⭐ 水平居中整个子组件组合 */
  align-items: center;      /* 垂直居中（在上半部分） */
  // margin-right: 150px;
  // width: 300px;
  // height: 300px;
}
.child-right {

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.bottom-half {
  flex: 1;
  margin-right: 20px;
  .row-center {
  justify-content: center;
  display: flex;
  
  margin-bottom: 50px;
  text-decoration: none;
}
}




.child-left {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .description {
  width: 450px;
  height: 100px;
  margin-top: 50px;
  font-size: 40px;
  border-radius: 50px;
  // text-align: center;
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.24);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease; /* ✨ 让 hover 动画过渡 */
  justify-content: center;

  /* 鼠标悬停效果 */
  &:hover {
    transform: scale(1.05); /* 稍微放大一点 */
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 
                0 0 40px rgba(0, 170, 255, 0.4); /* 发亮光效 */
    border: 1px solid rgba(255, 255, 255, 0.6); /* 发光边框 */
    }
  }
  .text{
    font-size: 20px;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
  }

  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
 
    // max-width: 460px;
    .name {
      // width: 100%;
      // padding-left: 22px;
      // transform: translateY(-8px);
      margin-left: 10px;
      font-family: "Pacifico-Regular";

      .bg {
        font-size: 5rem;
      }
    }
    @media (max-width: 768px) {
      .logo-img {
        width: 100px;
      }
      .name {
        height: 128px;
        .bg {
          font-size: 4.5rem;
        }
      }
    }

    @media (max-width: 720px) {
      max-width: 100%;
    }
  }

}




// 卡片样式
.cards {
  border-radius: 6px;
  background-color: #00000040;
  backdrop-filter: blur(10px);
  transform: scale(1);
  transition:
    backdrop-filter 0.3s,
    transform 0.3s;
  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.98);
  }
}


.rights {
    width: 300px;

      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      animation: fade 0.5s;
      .time {
        font-size: 1.1rem;
        text-align: center;
        .sm-hidden{
          margin-top: 20px;
          font-size: 25px;
        }
        .date {
          text-overflow: ellipsis;
          overflow-x: hidden;
          white-space: nowrap;
        }
        .text {
          margin-top: 10px;
          font-size: 3.25rem;
          letter-spacing: 2px;
          font-family: "UnidreamLED";
        }
        @media (min-width: 1201px) and (max-width: 1280px) {
          font-size: 1rem;
        }
        @media (min-width: 911px) and (max-width: 992px) {
          font-size: 1rem;
          .text {
            font-size: 2.75rem;
          }
        }
      }
    }

.fuc {
  display: flex;
  flex-direction: column;
  align-items: center;    /* ⬅️ 水平居中 */
  justify-content: center;/* ⬅️ 垂直居中（可选） */
  padding: 10px;
  text-align: center;
}

.fuckc{
  border-radius: 50px;
  // text-align: center;
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.24);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease; /* ✨ 让 hover 动画过渡 */
  justify-content: center;

  /* 鼠标悬停效果 */
  &:hover {
    transform: scale(1.05); /* 稍微放大一点 */
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 
                0 0 40px rgba(0, 170, 255, 0.4); /* 发亮光效 */
    border: 1px solid rgba(255, 255, 255, 0.6); /* 发光边框 */
    }
}
/* 设置卡片宽高 */
.cardss {
  width: 200px;
  height: 100px;
  // background-color: #dceeff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
}

.edit-input {
  margin-top: 15px;
  width: 100%;
  padding: 4px 8px;
  font-size: 1.5rem;
  // border: 1px solid #cccccc00;
  border-radius: 4px;
  background: #ffffff00;
  height: 30px;
}
</style>