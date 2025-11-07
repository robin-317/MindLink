<template>
  <div class="chart-container">
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch } from "vue";
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components';
// import VChart from 'vue-echarts';

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, TitleComponent]);

const option = ref({
  title: {
    text: '2024年中国在线泛知识内容用户产品使用占比',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: ['引擎搜索', '在线知识问答', '资讯浏览', '在线知识阅读', '音频课堂'],
    axisLabel: {
      interval: 0,
      rotate: 0,
      fontSize: 12
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}%'
    },
    max: 90,
    interval: 10
  },
  series: [{
    data: [82, 68, 65, 58, 45],
    type: 'bar',
    barWidth: '40%',
    itemStyle: {
      color: '#5470c6'
    },
    label: {
      show: true,
      position: 'top',
      formatter: '{c}%'
    }
  }],
  grid: {
    containLabel: true,
    left: '5%',
    right: '5%',
    bottom: '5%'
  }
});
</script>

<style scoped>
.chart-container {
  width: 800px;
  height: 500px;
  margin: 20px auto;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>