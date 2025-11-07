<template>
  <div class="action-panel">
    <div :class="['iconfont icon-dianzan',isLike ? 'active': 'normal']" @click="UserActivation('VIDEO_LIKE')">{{ problemInfo?.likeCount }}</div>
    <div :class="['iconfont icon-shoucang',isStart ? 'active': 'normal']" @click="UserActivation('VIDEO_START')">{{ problemInfo?.starCount }}</div>
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
  
  // //获取文章信息
  // const props = defineProps({
  //   problemInfo:{
  //     type: Object
  //   }
  // })
//获取文章信息
const problemInfo = ref({});
import { getProblemInfoById } from '@/api/problem';
const getProblemInfo = async()=>{
  // console.log("开始执行"+route.params.videoId)
  let res = await getProblemInfoById(route.params.problemId);
  if(res.code==200)
  {
    problemInfo.value = res.data;
    getProblemWriter(res.data.userId)//获取发帖人信息
    // insertInfo(res.data.id);//用户点赞和收藏初始化
    markdownText.value = res.data.comment;
  }
}



  const isLike=ref(false);
  const isStart=ref(false);
  const info = {
    type: 2,//问题
    userId: 0,
    toLikeId: 0,
  }
  import { IsLikeStart} from '@/api/get/getPasInfo';
  const preIsLS = async()=>{
    info.toLikeId = problemInfo.value.id;
    info.userId = loginStore.userInfo.id;
    const res = await IsLikeStart(info)
    if(res.code==200){
      if(res.data.isLike ==0){
        isLike.value = true;
      }
      if(res.data.isStart ==0 ){
        isStart.value = true;
      }
    }
  }

  import { toLike , toStar } from '@/api/problem';
  const UserActivation = async(inf)=>{
    info.userId = loginStore.userInfo.id;
    info.toLikeId = problemInfo.value.id;
    if(inf == 'VIDEO_LIKE'){//点赞
      if(!isLike.value){
        await toLike(info);
        // console.log("点赞");
        // console.log(info);
        getProblemInfo();
      }
    }
    if(inf == 'VIDEO_START'){//收藏
      if(!isStart.value){
        await toStar(info);
        // console.log("收藏")
        getProblemInfo();
      }
    }
  }
  
  onMounted(()=>{
    getProblemInfo();
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