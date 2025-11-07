<template>
  <div>
    <!-- 问题区域 -->
    <!-- <el-divider content-position="left" style="margin-bottom: 25px;background: #f5f1f1;">
      <div  style="font-size: 35px; margin-bottom: 5px;background: #f5f1f1;" class="iconfont icon-shoucang-copy">
        <router-link to="/home/problems" style="text-decoration: none;color: black;">排忧解疑>></router-link>
      </div>
    </el-divider> -->
    <div  style="font-size: 35px; margin-bottom: 5px;background: #f5f1f1;" class="iconfont icon-zhenduan">
        <router-link to="/home/problems" style="text-decoration: none;color: black;">排忧解疑>></router-link>
      </div>
    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in ProblemList" :key="item">
        <showProblem :data="item"></showProblem>
      </div>
    </div>

    <div class="fenge"></div>

    <!-- 文章区域 -->
    <!-- <el-divider content-position="left" style="margin-bottom: 25px;">
      <div  style="font-size: 35px; margin-bottom: 5px;background: #f5f1f1;" class="iconfont icon-shoucang-copy">
        <router-link to="/home/passages" style="text-decoration: none;color: black;">好文推选>></router-link>
      </div>
    </el-divider> -->
    <div  style="font-size: 35px; margin-bottom: 20px;background: #f5f1f1;" class="iconfont icon-wodewenzhang">
        <router-link to="/home/passages" style="text-decoration: none;color: black;">好文推选>></router-link>
      </div>
    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in PassageList" :key="item">
        <ShowTextItem :data="item"></ShowTextItem>
      </div>
    </div>


    <!-- 视频区域 -->
    <div class="fenge"></div>
    <!-- <el-divider content-position="left" style="margin-bottom: 25px;">
      <div  style="font-size: 35px; margin-bottom: 5px;background: #f5f1f1;" class="iconfont icon-shoucang-copy">
        <router-link to="/home/videos" style="text-decoration: none;color: black;">视频学习>></router-link>
      </div>
    </el-divider> -->
    <div  style="font-size: 35px; margin-bottom: 20px;background: #f5f1f1;" class="iconfont icon-shipin2">
        <router-link to="/home/videos" style="text-decoration: none;color: black;">视频学习>></router-link>
      </div>
    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in VideoList" :key="item">
        <ShowItem :data="item"></ShowItem>
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

import { getAllPassage,getAllProblem,getAllVideo } from "@/api/get/getHomeList";
//获取文章的数据
const PassageList =ref({});
const getPassageList = async()=>{
  let res = await getAllPassage();
  if (res.code === 200) {
    let allPassages = res.data;
    if (allPassages.length > 12) {
      // 随机打乱数组
      let shuffled = allPassages.sort(() => Math.random() - 0.5);
      // 取前12个
      PassageList.value = shuffled.slice(0, 12);
    } else {
      // 如果小于等于12，直接赋值
      PassageList.value = allPassages;
    }
  }
}
//获取视频的数据
const VideoList = ref([]);
const getVideoList = async () => {
  let res = await getAllVideo();
  if (res.code === 200) {
    let allVideos = res.data;
    if (allVideos.length > 12) {
      // 随机打乱数组
      let shuffled = allVideos.sort(() => Math.random() - 0.5);
      // 取前12个
      VideoList.value = shuffled.slice(0, 12);
    } else {
      // 如果小于等于12，直接赋值
      VideoList.value = allVideos;
    }
  }
};
//获取问题的数据
const ProblemList = ref([{
  id:1,
  commentImg:'https://yangyang-1.oss-cn-beijing.aliyuncs.com/2025/04/09/2b5fac98-c600-435e-bbb2-50cc62d8cf07.jpg',
  title:'我要成为原神高手',
  createTime:'2024-6-18',
  console:true
},{
  id:2,
  commentImg:'https://java-sllh.oss-cn-beijing.aliyuncs.com/2025/03/d00bc987-a782-4d00-bd03-c684a35168c0.jpg',
  title:'我要成为原神高手',
  createTime:'2024-6-18',
  console:false
},{
  id:3,
  commentImg:'https://java-sllh.oss-cn-beijing.aliyuncs.com/2025/03/9e9432db-4068-4be8-93b9-920b92635cd0.jpg',
  title:'我要成为原神高手',
  createTime:'2024-6-18',
  console:true
},{
  id:4,
  commentImg:'https://tse3-mm.cn.bing.net/th/id/OIP-C.YgCOHrQFPDT1Q380kCiTfQHaJs?w=198&h=260&c=7&r=0&o=5&pid=1.7',
  title:'我要成为原神高手',
  createTime:'2024-6-18',
  console:true
}]);
const getProblemList = async()=>{
  let res = await getAllProblem();
  if (res.code === 200) {
    let allProblems = res.data;
    if (allProblems.length > 12) {
      // 随机打乱数组
      let shuffled = allProblems.sort(() => Math.random() - 0.5);
      // 取前12个
      ProblemList.value = shuffled.slice(0, 12);
    } else {
      // 如果小于等于12，直接赋值
      ProblemList.value = allProblems;
    }
  }
}

onMounted(()=>{
  getPassageList();
  getVideoList();
  getProblemList();
})
</script>

<style lang="scss" scoped>
  .video-list{
    margin-left: 10px;
    flex: 1;
    display: grid;
    grid-gap:30px;
    grid-template-columns: repeat(4,1fr);
  }

.fenge{
  margin-top: 66px;
}
</style>