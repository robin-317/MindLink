<template>

  <div class="total-panel">
    <div style="font-size: 35px;" class="text">问题</div>
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>

    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in ProblemList" :key="item">
        <showProblem :data="item"></showProblem>
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

import {getProblem } from "@/api/get/getPerson";
//获取问题的数据
const ProblemList = ref({});
const getProblemList = async()=>{
  let res = await getProblem(loginStore.userInfo.id);
  if (res.code === 200) {
    ProblemList.value = res.data;
  }
}

onMounted(()=>{
  getProblemList();
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