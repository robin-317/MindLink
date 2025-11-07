<template>
  <div class="category-video-body" style="height: 200px;">

  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, computed } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const dataSource = ref({});
import { getAllVideo } from "@/api/get/getHomeList";
const loadingData = ref(false);

const loadDataList = async()=>{
  let params = {
    pageNo : dataSource.value.pageNo,
  }
  loadingData.value = true;
  let res = await getAllVideo();
  loadingData.value = false;
  if(res.code == 200){
    const dataList = dataSource.value.list;
    dataSource.value = Object.assign({},res.data);
    if(resultProps.data.pageNo > 1){
      dataSource.value.list = dataList.onecat(res.data.list)
    }
  }
};
</script>

<style lang="scss" scoped>
.category-video-body{
  margin-top: 30px;
  
}
</style>