<template>
  <div class="header-fixed">
    <TopHead theme="dark"></TopHead>
    <div class="category-fixed">
        <div class="category-fixed-inner"></div>
    </div>
  </div>

  <div class="video-list">
    <div v-for="item in contentList" :key="item">
        <SearchShowItem :data="item"></SearchShowItem>
      </div>
  </div>

  <div></div>


  <div class="search-panel">
    <div class="search">

    </div>
  </div>
</template>
<script setup>
import SearchShowItem from '@/components/SearchShowItem.vue';
import { SearchInfo } from '@/api/get/getHomeList';
import TopHead from '@/views/Home/components/TopHead.vue';//顶部导航
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

// 通过计算属性获取查询参数
const searchQuery = computed(() => route.query.q || ''); //传递过来的查询值
const contentList = ref([]);

const ToSearch = async()=>{
  let res = await SearchInfo(searchQuery);
  if(res.code==200){
    contentList.value = res.data;
  }
}

onMounted(()=>{
  ToSearch()
})


</script>
<style lang="scss" scoped>
.header-fixed{
    background: #fff;
    // margin: 0px auto;
    // min-height: calc(100vh);
    position: fixed;
    z-index: 9999;
    height:75px;
    width:100%;
    background: rgba(107, 110, 85, 0.993);
    top:0px;
}
.category-fixed{
      border-bottom: 1px solid #e0e0e0; /* 底部边框 */
      box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.1); /* 底部阴影 */
      border-radius: 8px; /* 圆角，可以调成你想要的程度 */
      margin-top: 20px;
    }
.search-panel{
  margin: 0px 200px; /* 上下20px，左右40px */
  background-color: red;
  height: 2000px;
}
.video-list{
    margin-left: 10px;
    flex: 1;
    display: grid;
    grid-gap:30px;
    grid-template-columns: repeat(5,1fr);
  }
</style>
<!-- const route = useRoute();

// 通过计算属性获取查询参数
const searchQuery = computed(() => route.query.q || ''); -->
