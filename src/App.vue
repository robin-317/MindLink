<script setup >
import zhCn from "element-plus/dist/locale/zh-cn.mjs"

import { ref,reactive,getCurrentInstance,nextTick, onMounted } from "vue";
const {Proxy} = getCurrentInstance();
import { useRoute,useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

import { useCategoryStore } from "@/stores/CategoryStore";
const categoryStore = useCategoryStore();

const config = ref({
  max:1,
});

// const autoLogin = ()=>{
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   if(!userInfo){
//     return;
//   }
//   loginStore.saveUserInfo(userInfo);
// }

// onMounted(()=>{
//   autoLogin();
// })
 </script>

<template>
  <el-config-provider :locale="zhCn" :message="config">
    <!-- 一级路由接口 -->
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss" scoped>

</style>