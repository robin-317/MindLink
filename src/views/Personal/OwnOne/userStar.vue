<template>
  <div class="total-panel">
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>
    <div>
    <!-- 文章区域 -->

      <div  style="font-size: 35px; margin-bottom: 5px;" class="iconfont icon-wenti">
        文章收藏
      </div>

    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in starPassage" :key="item">
        <ShowTextItem :data="item"></ShowTextItem>
      </div>
    </div>

    <!-- 问题区域 -->
    <div class="fenge"></div>

      <div  style="font-size: 35px; margin-bottom: 5px;" class="iconfont icon-mubiaoguanli-icon">
        问题收藏
      </div>

    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in starProblem" :key="item">
        <ShowTextItem :data="item"></ShowTextItem>
      </div>
    </div>

    <!-- 视频区域 -->
    <div class="fenge"></div>

      <div  style="font-size: 35px; margin-bottom: 5px;" class="iconfont icon-shipin1">
        视频收藏
      </div>

    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in starVideo" :key="item">
        <ShowItem :data="item"></ShowItem>
      </div>
    </div>

  </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

const info = {
  userId: loginStore.userInfo.id,
  type: 1
}
import { getStarStar } from "@/api/get/getPerson";
const starVideo =ref({});
const starProblem =ref({});
const starPassage = ref({});
const getList = async()=>{
  info.type = 1;//文章
  let res = await getStarStar(info);
  if(res.code==200){
    starPassage.value = res.data;
  }
  info.type = 2;//视频
  res = await getStarStar(info);
  if(res.code==200){
    starVideo.value = res.data;
  }
  info.type = 3;//问题
  res = await getStarStar(info);
  if(res.code==200){
    starProblem.value = res.data;
  }
}

onMounted(()=>{
  getList();
})
</script>

<style lang="scss" scoped>

.total-panel{
  padding-top: 50px;
  margin-top: 10px;
  padding-right: 15px;
  margin-left: 120px;
  padding-left: 50px;
  margin-top: 10px;
  margin-right: 15px;
  border-left: 2px solid rgb(223, 150, 150);
  border-radius:50px;
  // background: rgb(50, 50, 85);
  width: auto;
  height: auto;
  min-height: 920px; /* 或具体高度 */
  min-height: 920px;/* 或具体高度 */
  /* 添加左边阴影 */
  box-shadow: -8px 0 15px -4px rgba(0, 0, 0, 0.4);
}

.video-list{
    margin-left: 10px;
    flex: 1;
    display: grid;
    grid-gap:30px;
    grid-template-columns: repeat(4,2fr);
  }

  .text {
  font-size: 35px;
  background: linear-gradient(to right, #4facfe, #00f2fe); /* 蓝绿渐变 */
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>