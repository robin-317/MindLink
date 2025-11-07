<template>
  <div class="kong" v-if="videoList.length == 0">
    <img src="@/assets/kong.svg" alt="">
  </div>
  <div>
    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in videoList" :key="item">
        <ShowItem :data="item"></ShowItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'

const route = useRoute()
const info = ref(route.params.keyWord || '')
const loading =ref(true);

watch(() => route.params.keyWord, (newVal) => {
  info.value = newVal
}, { immediate: true })

const videoList = ref([]);
import { searchVideo } from '@/api/search'
const getInfo = async()=>{
  let res = await searchVideo(info.value);
  if(res.code == 200){
    videoList.value = res.data;

  }
}

onMounted(()=>{
  getInfo();
})

</script>

<style lang="scss" scope>
.kong{
  margin: 0px;
  padding: 0px;
  display: flex;
  align-content: center;
  justify-content: center;
  img{
    height: 600px;
    margin-right: 220px;
  }
}
.video-list{
    margin-left: 10px;
    flex: 1;
    display: grid;
    grid-gap:40px;
    grid-template-columns: repeat(4,1fr);
  }
</style>

