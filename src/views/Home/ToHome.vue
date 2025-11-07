<template>
  <div class="main-container" 
  :style="{
    'max-width': proxy.bodyMaxWidth + 'px',
    'min-width': proxy.bodyMinWidth + 'px',
  }">
    <div class="header">
      <TopHead ></TopHead>
      <div class="category-fixed">
        <div class="category-fixed-inner"></div>
      </div>
    </div>

    <div class="header-fixed" v-if="showFixedHeader">
      <TopHead theme="dark"></TopHead>
      <div style="background-color: #fff;height: 20px;"></div>
      <Category style="background-color: #fff;"></Category>
      <div style="background-color: #fff;height: 25px;box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.1);border-bottom-left-radius: 45px;border-bottom-right-radius: 45px;"></div>
    </div>

    <div v-else>
      <!-- <div style="background-color: #fff;height: 25px;"></div> -->
      <Category style="margin-top: 10px;"></Category>
      <!-- <div style="background-color: #fff;height: 4px;"></div> -->
      <el-divider>
        <el-icon>***</el-icon>
      </el-divider>
    </div>



    <div class="body-inner">
      <router-view></router-view>
    </div>
    <!-- <Account></Account>
    <test></test> -->
  </div>
  <div class="footer">
    <el-footer style="height:auto;margin-top: 30px;">
      <Footer></Footer>
    </el-footer>
  </div>
  <div>
  <!-- Scroll down to see the bottom-right button. -->
  <el-backtop :right="100" :bottom="100" />
</div>
</template>

<script setup>
import Account from '@/views/account/Account.vue';
import test from '../account/test.vue';
import Category from './components/Category.vue';
import { getCurrentInstance, onMounted, ref ,nextTick ,reactive} from 'vue';
import { useRoute ,useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()



import TopHead from './components/TopHead.vue';//顶部导航


const { proxy } = getCurrentInstance();

import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();


import { userInfoService } from "@/api/user";
const userInfo =ref({})
onMounted(()=>{
  window.addEventListener("scroll",windowScrollHandler);
  // console.log("检查信息")
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // loginStore.saveUserInfo(userInfo);
  // const userInfo = sessionStorage.getItem('userInfo');
  if (userInfo) {
    // loginStore.saveUserInfo(JSON.parse(userInfo));
  }
});


const showFixedHeader = ref(false);
const showFixedCategory = ref(false);
const windowScrollHandler = ()=>{
  var curScrollTop = window.scrollY;
  if(curScrollTop <= 35){
    showFixedHeader.value = false;
  } else {
    showFixedHeader.value = true;
  }
  if(curScrollTop <= 50 )
  {
    showFixedCategory.value = false;
  } else {
    showFixedCategory.value = true;
  }
};


</script>
<style>
body{
  background: #ededed !important;
}
</style>
<style lang="scss" scoped>
.main-container {
  background: #ebe9e9;
  margin: 0px auto;
  min-height: calc(100vh);
  

  .header{
    margin: 0px auto;
    // background-color: #7c9ce1;
    height: 182px;
    background-position: center;
    background-repeat: no-repeat;
    width:100%;
    position: relative;
    // background-image: url(@/assets/img/bilibili/bilibili-winter-view-2.jpg);
    background-image: url(@/assets/jsImg/3.png);
  }

  .body-inner{
    margin: 0px 66px;
    margin-top: 50px;

  }
  .header-fixed{
    position: fixed;
    z-index: 9999;
    height:70px;
    width:100%;
    background: rgb(179, 168, 138);
    top:0px;
  }
}
.category-fixed{
  margin-top: 120px;
  background: #f5f1f1;
}

</style>
