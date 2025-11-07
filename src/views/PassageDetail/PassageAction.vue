<template>
  <div class="action-panel">
    <div :class="['iconfont icon-dianzan',isLike ? 'active': 'normal']" @click="UserActivation('VIDEO_LIKE')">{{ passageInfo?.likeCount }}</div>
    <div :class="['iconfont icon-shoucang',isStart ? 'active': 'normal']" @click="UserActivation('VIDEO_START')">{{ passageInfo?.start }}</div>
  </div>
  </template>
  
  <script setup>
  import Player from '@/views/Home/components/Player.vue'
  import TopHead from '@/views/Home/components/TopHead.vue';//顶部导航
  import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
  const { proxy } = getCurrentInstance();
  import { useRoute, useRouter } from "vue-router";
  const route = useRoute();
  const router = useRouter();
  
  import { useLoginStore } from "@/stores/loginStore";
  const loginStore = useLoginStore();
  
  //获取文章信息
import { getPassageInfoById } from '@/api/get/getPassageInfo';
const passageInfo = ref({});
const getPassageInfo = async()=>{
  // console.log("开始执行"+route.params.videoId)
  let res = await getPassageInfoById(route.params.passageId);
  if(res.code==200)
  {
    passageInfo.value = res.data;
    // getPassageUserInfo();
    // insertInfo(res.data.id);
    markdownText.value = res.data.comment;
  }
}



  const isLike=ref(false);
  const isStart=ref(false);
  const info = {
    type: 0,//文章
    userId: 0,
    toLikeId: 0,
  }
  import { IsLikeStart,toLike,toStart } from '@/api/get/getPasInfo';
  const preIsLS = async()=>{
    info.toLikeId = passageInfo.value.id;
    info.userId = loginStore.userInfo.id;
    const res = await IsLikeStart(info)
    if(res.code==200){
      if(res.data.isLike == 0){
        isLike.value = true;
      }
      if(res.data.isStart ==0 ){
        isStart.value = true;
      }
    }
  }
  
  const UserActivation = async(inf)=>{
    info.userId = loginStore.userInfo.id;
    info.toLikeId = passageInfo.value.id;
    if(inf == 'VIDEO_LIKE'){//点赞
      
      if(!isLike.value){
        await toLike(info);
        console.log("点赞");
        console.log(info);
        getPassageInfo();
      }
    }
    if(inf == 'VIDEO_START'){//收藏
      
      if(!isStart.value){
        await toStart(info);
        // console.log("收藏")
        getPassageInfo();
      }
    }
  }
  
  onMounted(()=>{
    getPassageInfo();
    preIsLS();
  })
  </script>
  
  
  <style lang="scss" scoped>
  .action-panel{
    margin-right: 500px;
    // width: auto;
  
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e3e5e7;
    padding: 20px 0px;
    .iconfont{
      cursor: pointer;
      color: #61666d;
      display: flex;
      align-items: center;
      margin-right: 40px;
      &::before{
        margin-right: 10px;
        font-size: 35px;
      }
      &:hover{
      color: #6ac4bc;
      transform: scale(1.1); /* 稍微放大一点 */
    }
  }
  .action{
    &::before{
      color:var(--blue);
    }
    
  }
  .normal{
    color: #292224;
  }
  .active{
    color: #db507e;
  }
}
  </style>