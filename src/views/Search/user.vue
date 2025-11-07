<template>
  <div class="kong" v-if="userList.length == 0">
    <img src="@/assets/kong.svg" alt="">
  </div>
  <div class="bodys">
    <div>
    </div>
    <div class="video-list" style="margin-left: 30px; margin-bottom: 10px;">
      <div v-for="item in userList" :key="item">
        <showUser :data="item"></showUser>
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

const userList = ref([
  {
    id:5,
    username:'我是山里灵活的狗',
    avatar:'https://java-sllh.oss-cn-beijing.aliyuncs.com/2025/03/9e9432db-4068-4be8-93b9-920b92635cd0.jpg',
  }
]);
import { searchUser } from '@/api/search'
const getInfo = async()=>{
  let res = await searchUser(info.value);
  if(res.code == 200){
    userList.value = res.data;
  }
}

onMounted(()=>{
  getInfo();
  console.log(userList)
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
.bodys{
  width: auto;

}
  .video-list{
    margin-left: 10px;
    flex: 1;
    display: grid;
    grid-gap:40px;
    grid-template-columns: repeat(4,1fr);
  }
</style>

