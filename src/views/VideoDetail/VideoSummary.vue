<template>
  <div class="summary-panel">
    <div class="des">{{ videoInfo.description }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const videoInfo = ref({});
import { getVideoInfoById } from '@/api/get/getInfo';
const getVideoInfo = async()=>{
  // console.log("开始执行"+route.params.videoId)
  let res = await getVideoInfoById(route.params.videoId);
  if(res.code==200)
  {
    videoInfo.value = res.data;
  }
}
onMounted(()=>{
  getVideoInfo();
})
</script>

<style lang="scss" scoped>
.summary-panel{
  // margin-right: 450px;
  justify-content: center;
  align-content: center;
  align-items: center;
  // justify-items: center;
  // width: 50%;
  // margin-left: 200px;
  // margin-right: 200px;
  // margin: 100px 0;
  // padding: 25px 0px;
  // border-bottom: 1px solid #ddd;

  .des{
    display: flex;
    // justify-content: center;
    margin-left: 25%;
    width: 53%;
    padding: 25px 0px;
    border-bottom: 1px solid #ddd;
  }
  .summary{
    overflow: hidden;
  }
  .expand-btn{
    display: inline-block;
    margin-top: flex;
    cursor: pointer;
    &hover{
      color: var(--blue);
    }
  }
}
</style>