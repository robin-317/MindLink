<template>
  <div>
    <div class="echarts-wrap" ref="echartWord"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';

const maskImage = new Image()
maskImage.src='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'
const props = defineProps({
  // 词云数据
  data: {
    type: Array,
    required: true,
    // 示例：
    // [
    //   { name: 'Vue', value: 1000 },
    //   { name: 'ECharts', value: 618 },
    //   // ...
    // ]
  },
  // 词云形状，可以是 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon' 等
  shape: {
    type: String,
    default: 'triangle-forward',
  },
});

const echartWord = ref(null);
let myChart = null;

const initChart = () => {
  if (echartWord.value) {
    myChart = echarts.init(echartWord.value);
    const option = {
      series: [{
        type: 'wordCloud',
        shape: props.shape,
        // 其他形状你可以使用形状路径
        // shape: 'circle', // 示例
        // 或者自定义路径
        gridSize: 2,
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 45,
        maskImage: maskImage,
        // 字体
        textStyle: {
          normal: {
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        // 设置词云数据
        data: props.data
      }]
    };
    maskImage.onload = function () {
      myChart.setOption(option, true);
    }
    window.addEventListener('resize', myChart.resize);
  }
};

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  if (myChart) {
    window.removeEventListener('resize', myChart.resize);
    myChart.dispose();
  }
});
</script>

<style lang="scss" scoped>
.echarts-wrap{
  width: 700px;
  height:600px;
}
</style>

