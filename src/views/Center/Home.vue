<template>
  <el-container style="height: 100vh;">
    <!-- 顶栏 -->
    <el-header style="background: #409EFF; color: white; display: flex; align-items: center; justify-content: space-between">
      <div style="font-size: 20px; font-weight: bold">管理中心</div>
      <el-avatar icon="el-icon-user-solid" :src="loginStore.userInfo.avatar"></el-avatar>
    </el-header>

    <el-container style="width: 100%;">

      <!-- 主内容区域 -->
      <el-main style="padding: 20px">
        <!-- 四个统计卡片 -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
          <el-card class="box-card" style="flex: 1; margin-right: 10px">
            <div style="display: flex; align-items: center">
              <el-icon><User /></el-icon>
              <div style="margin-left: 10px">
                <div>视频</div>
                <h2>{{ countInfo.videoCount }}</h2>
              </div>
            </div>
          </el-card>

          <el-card class="box-card" style="flex: 1; margin-right: 10px">
            <div style="display: flex; align-items: center">
              <el-icon><ChatDotRound /></el-icon>
              <div style="margin-left: 10px">
                <div>文章</div>
                <h2>{{ countInfo.passageCount }}</h2>
              </div>
            </div>
          </el-card>

          <el-card class="box-card" style="flex: 1; margin-right: 10px">
            <div style="display: flex; align-items: center">
              <el-icon><ShoppingBag /></el-icon>
              <div style="margin-left: 10px">
                <div>问题</div>
                <h2>{{ countInfo.problemCount }}</h2>
              </div>
            </div>
          </el-card>

          <el-card class="box-card" style="flex: 1">
            <div style="display: flex; align-items: center">
              <el-icon></el-icon>
              <div style="margin-left: 10px">
                <div>收藏</div>
                <h2>{{ star }}</h2>
              </div>
            </div>
          </el-card>
        </div>

        <!-- 图表区域 -->
        <div style="display: flex; justify-content:start">
          <!-- 折线图 -->
          <el-card style="flex: 1.3; margin-right: 20px">
            <div>稿件互动动态</div>
            <div id="lineChart" style="width: 100%; height: 400px" />
          </el-card>

          <!-- 环形图 -->
          <el-card style="flex: 1">
            <div>问题解决情况</div>
            <div id="pieChart" style="width: auto; height: 400px" />
          </el-card>
        </div>
      </el-main>
    </el-container>

    <el-footer>
      <!-- <wordCloudMap :data="data" :shape="circle" style="width: 250px;"/> -->
    </el-footer>
  </el-container>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { User, ChatDotRound, ShoppingBag, ShoppingCart } from '@element-plus/icons-vue'
import { useLoginStore } from '@/stores/loginStore';
const loginStore = useLoginStore();
const Option = ref({
    tooltip: { trigger: 'item' },
    legend: { top: 'bottom' },
    series: [
      {
        name: '解决情况',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: true },
        emphasis: { label: { show: true, fontSize: '16', fontWeight: 'bold' } },
        labelLine: { show: false },
        data: [
          { value: 735, name: '未解决' },
          { value: 1048, name: '已解决' },
          
        ]
      }
    ]
  });


const countInfo = ref({});
import { totalCountInfo,starCount,consoleCount } from "@/api/center";
//获取各版块总数量
const loadCounts = async()=>{
  let res = await totalCountInfo(loginStore.userInfo.id);
  if(res.code==200){
    countInfo.value.passageCount=res.data.passageCount;
    countInfo.value.videoCount=res.data.videoCount;
    countInfo.value.problemCount=res.data.problemCount;
  }
}

//获取收藏的数量
const star = ref(0);
const starCountInfo = async()=>{
  let res = await starCount(loginStore.userInfo.id);
  if(res.code == 200){
    star.value = res.data;
  }
};



//获取问题解决情况
const consoleInfo = ref([
{ value: 0, name: '未解决' },
{ value: 0, name: '已解决' }
]);
const ProblemConsoleInfo = async()=>{
  let res = await consoleCount(loginStore.userInfo.id);
  if(res.code == 200){
    consoleInfo.value = res.data;
  }
}
onMounted(() => {
  loadCounts();
  starCountInfo
  ProblemConsoleInfo();
  Option.value.series[0].data = consoleInfo.value
  const lineChart = echarts.init(document.getElementById('lineChart'))
  const pieChart = echarts.init(document.getElementById('pieChart'))

  lineChart.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 130, 250, 100, 80, 200, 170],
        type: 'line',
        areaStyle: {}
      },
      {
        data: [220, 110, 180, 200, 160, 140, 290],
        type: 'line'
      }
    ]
  })

  pieChart.setOption(Option.value);

});

</script>

<style>
.box-card {
  text-align: left;
}
</style>
