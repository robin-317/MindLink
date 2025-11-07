<template>
<div class="action-panel">
  <div :class="['iconfont icon-dianzan',isLike ? 'active': 'normal']" @click="UserActivation('VIDEO_LIKE')">{{ videoInfo?.likeCount }}</div>
  <div :class="['iconfont icon-shoucang',isStart ? 'active': 'normal']" @click="UserActivation('VIDEO_START')">{{ videoInfo?.start }}</div>
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

const videoInfo = ref({});
import { getVideoInfoById } from '@/api/get/getInfo';
const getVideoInfo = async()=>{
  // console.log("开始执行"+route.params.videoId)
  let res = await getVideoInfoById(route.params.videoId);
  if(res.code==200)
  {
    videoInfo.value = res.data;
  }
}


const isLike=ref(false);
const isStart=ref(false);
const info = {
  type: 1,//视频
  userId: 0,
  toLikeId: 0,
}
import { IsLikeStart,toLike,toStart } from '@/api/get/getInfo';
const preIsLS = async()=>{
  info.toLikeId = videoInfo.value.id;
  info.userId = loginStore.userInfo.id;
  const res = await IsLikeStart(info)
  if(res.code==200){
    if(res.data.isLike == 0){
      isLike.value = true;
    }
    if(res.data.isStart == 0 ){
      isStart.value = true;
    }
  }
}

const UserActivation = async(inf)=>{
  info.userId = loginStore.userInfo.id;
  info.toLikeId = videoInfo.value.id;
  if(inf == 'VIDEO_LIKE'){
    if(!isLike.value){
      await toLike(info);
      getVideoInfo();
    }
  }
  if(inf == 'VIDEO_START'){
    if(!isStart.value){
      await toStart(info);
      getVideoInfo();
    }
  }
}

onMounted(()=>{
  getVideoInfo();
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