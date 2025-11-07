<template>
  <div class="shell" @mouseover="hover = true" @mouseleave="hover = false">
    <ul class="nav">
      <li
        v-for="(item, index) in navItems"
        :key="index"
        :class="{ active: activeIndex === index }"
        :id="item.id || null"
        @click="setActive(index)"
      >
        <router-link :to="`${item.url}`">
        <a>
          <div class="icon">
            <div v-if="item.image" class="imageBox">
              <img :src="item.image" alt="" />
            </div>
            <i v-else :class="`iconfont ${item.icon}`"></i>
          </div>
          <div class="text">{{ item.text }}</div>
        </a>
        </router-link>
      </li>
    </ul>
  </div>
  <div style="overflow-x: hidden;width: 98%;">
    <router-view></router-view>
  </div>

</template> 

<script setup>
import userHome from "./userHome.vue";
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

const hover = ref(false)
const activeIndex = ref(0)


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


const setActive = (index) => {
  activeIndex.value = index;
  if(index == 6){
    logout();
    // router.push("/login")
  }
}



const navItems = [

  {
    id: 'logo',
    image: loginStore.userInfo.avatar,
    text: loginStore.userInfo.username,
    sign: 1 ,
    url:'/ownHome/home'
  },
  {
    icon: 'icon-daohang',
    text: '个人信息',
    sign: 2,
    url:'/ownHome/info'
  },
  {
    icon: 'icon-daohang',
    text: '个人文章',
    sign: 3,
    url:'/ownHome/passage'
  },
  {
    icon: 'icon-daohang',
    text: '发布问题',
    sign: 4,
    url:'/ownHome/problem'
  },
  {
    icon: 'icon-daohang',
    text: '视频发布',
    sign: 5,
    url:'/ownHome/video'
  },
  {
    icon: 'icon-daohang',
    text: '收藏',
    sign: 6,
    url:'/ownHome/collection'
  },
  {
    href: '#authentication',
    icon: 'icon-daohang',
    text: '退出',
  },
  {
    icon: 'icon-daohang',
    text: '返回大厅',
    url:'/home'
  },
];
import bus from '@/utils/eventBus'
onMounted(()=>{
  bus.on('activeI', (data) => {
    activeIndex.value = data;
    console.log(data)
  })
})
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
.top {
  display: flex;
  justify-content: flex-end;
  padding: 10px; /* 可选：加点内边距 */
}

body {
  background: #e4e9f5;
}

section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font: 900 100px '';
  color: rgba(110, 90, 240, 0.3);
  background: #e4e9f5;
}

.shell {
  position: fixed;
  width: 90px;
  height: 100%;
  background: #a39f9f;
  z-index: 9999;
  transition: width 0.5s;
  padding-left: 10px;
  overflow: hidden;
  color: rgba(110, 90, 240, 0.3);
  overflow: auto;
}

.shell:hover {
  width: 300px;
}

.imageBox {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.imageBox img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shell ul {
  position: relative;
  height: 100vh;
}

.shell ul li {
  position: relative;
  padding: 5px;
}

.active {
  background: #e4e9f5;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

.active::before {
  content: '';
  position: absolute;
  top: -30px;
  right: 0;
  width: 30px;
  height: 30px;
  border-bottom-right-radius: 25px;
  box-shadow: 5px 5px 0 5px #e4e9f5;
  background: transparent;
}

.active::after {
  content: '';
  position: absolute;
  bottom: -30px;
  right: 0;
  width: 30px;
  height: 30px;
  border-top-right-radius: 25px;
  box-shadow: 5px -5px 0 5px #e4e9f5;
  background: transparent;
}

#logo {
  margin: 40px 0 100px 0;
}

.shell ul li a {
  position: relative;
  display: flex;
  white-space: nowrap;
}

.icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  padding-left: 10px;
  height: 70px;
  color: rgb(110, 90, 240);
  transition: 0.5s;
}

.icon i {
  font-size: 30px;
  z-index: 999;
}

.text {
  position: relative;
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #333;
  padding-left: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: 0.5s;
}

.shell ul li:hover a .icon,
.shell ul li:hover a .text {
  color: #ffa117;
}

.active a .icon::before {
  content: '';
  position: absolute;
  inset: 5px;
  width: 60px;
  background: #fff;
  border-radius: 50%;
  transition: 0.5s;
  border: 7px solid rgb(110, 90, 240);
  box-sizing: border-box;
}
</style>