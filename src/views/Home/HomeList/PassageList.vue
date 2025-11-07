<template>
  <div class="data-list" style="height: 200px;">
    
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, computed } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const dataSource = ref({});

import { getAllPassage } from "@/api/get/getHomeList";
const loadingData = ref(false);
const loadDataList = async()=>{
  loadingData.value = true;
  let res = await getAllPassage();
  loadingData.value = false;
  if(res.code == 200){
    dataSource.value = res.data;
  }
};
</script>

<style lang="scss" scoped>

</style>