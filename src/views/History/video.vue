<template>
  <div>
  <el-timeline style="max-width: 600px">
    <el-timeline-item center timestamp="今天" placement="top">
      <div>
        <div v-for="(item,index) in todayHistory" :key="index">
          <showHistory :data="item"></showHistory>
        </div>
      </div>
    </el-timeline-item>
<!-- 
    <el-timeline-item timestamp="昨天" placement="top">
      <div>
        <div v-for="(item,index) in todayHistory" :key="index">
          <showHistory :data="item"></showHistory>
        </div>
      </div>
    </el-timeline-item>

    <el-timeline-item center timestamp="近一周" placement="top">
      <div>
        <div v-for="(item,index) in todayHistory" :key="index">
          <showHistory :data="item"></showHistory>
        </div>
      </div>
    </el-timeline-item> -->
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
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡',
//   img:'https://yangyang-1.oss-cn-beijing.aliyuncs.com/2025/04/09/2b5fac98-c600-435e-bbb2-50cc62d8cf07.jpg'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡',
//   img:'https://yangyang-1.oss-cn-beijing.aliyuncs.com/2025/04/09/2b5fac98-c600-435e-bbb2-50cc62d8cf07.jpg'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡',
//   img:'https://yangyang-1.oss-cn-beijing.aliyuncs.com/2025/04/09/2b5fac98-c600-435e-bbb2-50cc62d8cf07.jpg'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡',
//   img:'https://yangyang-1.oss-cn-beijing.aliyuncs.com/2025/04/09/2b5fac98-c600-435e-bbb2-50cc62d8cf07.jpg'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡',
//   img:'https://yangyang-1.oss-cn-beijing.aliyuncs.com/2025/04/09/2b5fac98-c600-435e-bbb2-50cc62d8cf07.jpg'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡',
//   img:'https://yangyang-1.oss-cn-beijing.aliyuncs.com/2025/04/09/2b5fac98-c600-435e-bbb2-50cc62d8cf07.jpg'
// },]);
// const yesterdayHistory = ref([{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡'
// },]);
// const weekHistory = ref([{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡'
// },{
//   watchTime:'2024',
//   title:'吴志⚪大战轴🗡'
// },]);

import { getHistoryTodayVInfo } from "@/api/history";
const getToday = async()=>{
  let res = await getHistoryTodayVInfo(loginStore.userInfo.id);
  if(res.code == 200){
    todayHistory.value = res.data;
  }
}
// const getYesterday = async()=>{
//   let res = await getHistoryYesterdayInfo(loginStore.userInfo.id,3);
//   if(res.code == 200){
//     yesterdayHistory.value = res.data;
//   }
// }
// const getWeek = async()=>{
//   let res = await getHistoryWeekInfo(loginStore.userInfo.id,3);
//   if(res.code == 200){
//     weekHistory.value = res.data;
//   }
// }

onMounted(()=>{
  getToday();
  // getYesterday();
  // getWeek();
})
</script>

<style lang="scss" scoped>

</style>