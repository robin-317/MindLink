<template>

  <div class="total-panel">
    <div style="font-size: 35px;" class="text">视频</div>
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>


    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in VideoList" :key="item">
        <ShowItem :data="item"></ShowItem>
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

import { getVideo } from "@/api/get/getPerson";
//获取视频的数据
const VideoList = ref([]);
const getVideoList = async () => {
  let res = await getVideo(loginStore.userInfo.id);
  if (res.code === 200) {
    VideoList.value = res.data;
  }
};
onMounted(()=>{
  getVideoList();
})
</script>

<style lang="scss" scoped>

.total-panel{
  padding-top: 50px;
  margin-top: 10px;
  padding-right: 15px;
  margin-left: 110px;
  padding-left: 50px;
  margin-top: 10px;
  margin-right: 1px;
  border-left: 2px solid rgb(223, 150, 150);
  border-radius:50px;
  // background: rgb(50, 50, 85);
  width: auto;
  height: auto;
  min-height: 920px; /* 或具体高度 */
  min-height: 920px; /* 或具体高度 */
  /* 添加左边阴影 */
  box-shadow: -8px 0 15px -4px rgba(0, 0, 0, 0.4);
  overflow: auto;
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