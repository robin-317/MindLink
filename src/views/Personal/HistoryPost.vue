<template>
  <div>
    <div class="empty-box" v-if="PassageList.length==0 && VideoList.length==0 && ProblemList.length==0">
      <img src="@/assets/空空如也.svg" alt="" class="logK">
    </div>
    <div>


          <!-- 问题区域 -->
    
    <el-divider content-position="left" style="margin-bottom: 25px;" v-if="ProblemList.length==0">
      <div  style="font-size: 35px; margin-bottom: 5px;" class="iconfont icon-shoucang-copy">
        <router-link to="/home/problems" style="text-decoration: none;color: black;">问题>></router-link>
      </div>
    </el-divider>
    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in ProblemList" :key="item">
        <showProblem :data="item"></showProblem>
      </div>
    </div>

    <div class="fenge"></div>

    <!-- 文章区域 -->
    <el-divider content-position="left" style="margin-bottom: 25px;" v-if="PassageList.length==0">
      <div  style="font-size: 35px; margin-bottom: 5px;" class="iconfont icon-shoucang-copy">
        <router-link to="/home/passages" style="text-decoration: none;color: black;">文章>></router-link>
      </div>
    </el-divider>
    <div class="video-list" style="margin-left: 30px;" >
      <div v-for="item in PassageList" :key="item">
        <ShowTextItem :data="item"></ShowTextItem>
      </div>
    </div>


    <div class="fenge"></div>


    <!-- 视频区域 -->
    <div class="fenge"></div>
    <el-divider content-position="left" style="margin-bottom: 25px;" v-if="VideoList.length==0">
      <div  style="font-size: 35px; margin-bottom: 5px;" class="iconfont icon-shoucang-copy">
        <router-link to="/home/videos" style="text-decoration: none;color: black;">视频>></router-link>
      </div>
    </el-divider>
    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in VideoList" :key="item">
        <ShowItem :data="item"></ShowItem>
      </div>
    </div>

    </div>
  </div>
</template>
<script setup>

import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const userId = route.params.userId;
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();
//获取用户信息
import { userInfoService } from "@/api/user";
const userInfo = ref({});
const getUserInfo = async()=>{
  let res = await userInfoService(userId);
  if(res.code==200){
    userInfo.value = res.data;
    //执行操作获取用户发帖信息
    getPassageList();
    getVideoList();
    getProblemList();
  }
}

import { getPassage,getProblem,getVideo } from "@/api/get/getPerson";
//获取文章的数据
const PassageList =ref({});
const getPassageList = async()=>{
  let res = await getPassage(userInfo.value.id);
  if (res.code === 200) {
    PassageList.value = res.data;
  }
}


//获取视频的数据
const VideoList = ref({});
const getVideoList = async () => {
  let res = await getVideo(userInfo.value.id);
  if (res.code === 200) {
    VideoList.value = res.data;
  }
};

//获取问题的数据
const ProblemList = ref({});
const getProblemList = async()=>{
  let res = await getProblem(userInfo.value.id);
  if (res.code === 200) {
    ProblemList.value = res.data;
  }
}

onMounted(()=>{
  getUserInfo();

  
})

</script>

<style lang="scss" scoped>
.empty-box {
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100vh; /* 占满整个视口高度 */
}
.logK{
  width: 600px;
}
.fenge{
  width: 40px;
}
.video-list{
    margin-left: 10px;
    flex: 1;
    display: grid;
    grid-gap:30px;
    grid-template-columns: repeat(4,1fr);
  }
</style>