<template>
  <div>
  <el-timeline style="max-width: 600px">
    <el-timeline-item center timestamp="今天" placement="top">
      <el-card v-for="(item,index) in todayHistory" :key="index">
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="昨天" placement="top">
      <el-card v-for="(item,index) in yesterdayHistory" :key="index">
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item center timestamp="近一周" placement="top">
      <el-card v-for="(item,index) in weekHistory" :key="index">
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();
const route = useRoute();
const router = useRouter();
const todayHistory = ref([]);
const yesterdayHistory = ref([]);
const weekHistory = ref([]);

import { getHistoryTodayInfo,getHistoryYesterdayInfo,getHistoryWeekInfo } from "@/api/history";
const getToday = async()=>{
  let res = await getHistoryTodayInfo(loginStore.userInfo.id);
  if(res.code == 200){
    todayHistory.value = res.data;
  }
}
const getYesterday = async()=>{
  let res = await getHistoryYesterdayInfo(loginStore.userInfo.id);
  if(res.code == 200){
    yesterdayHistory.value = res.data;
  }
}
const getWeek = async()=>{
  let res = await getHistoryWeekInfo(loginStore.userInfo.id);
  if(res.code == 200){
    weekHistory.value = res.data;
  }
}

onMounted(()=>{
  getToday();
  getYesterday();
  getWeek();
})
</script>

<style lang="scss" scoped>

</style>