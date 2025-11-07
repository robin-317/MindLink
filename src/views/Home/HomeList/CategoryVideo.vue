<template>
  <div class="category-video-body">
    <div :class="['category-list',categoryFixied?'category-fixed':'']" id="category-list">
      <div class="category-title">

      </div>
    </div>
  </div>
  <VideoList></VideoList>
</template>

<script setup>
import VideoList from "./VideoList.vue";
import { ref, reactive, getCurrentInstance, nextTick, watch, computed } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const curentPCategoyy = [
  {
    categoryName:"java",
  },
  {
    categoryName:"生活",
  },
  {
    categoryName:"健康",
  },
  {
    categoryName:"前端",
  },
  {
    categoryName:"后端",
  },
]
</script>

<style lang="scss" scoped>
.category-video-body{
  margin-top: 30px;
  .category-list{
    display: flex;
    align-items: center;
    line-height: 30px;
    position: sticky;
    top: 0px;
    height: 60px;
    background: #fff;
    z-index: 2;
    .category-title{
      font-size: 24px;
      margin-right: 40px;
      cursor: pointer;
    }
    .category-item{
      margin-right: 40px;
      font-size: 15px;
      cursor: pointer;
      border-bottom: 3px solid #fff;
      &:hover{   
        color: var(--blue);
        border-color: var(--blue);
      }
    }
    .active{
      color: var(--blue);
      border-color: var(--blue);
    }
  }
  .category-fxied{
    box-shadow: 0 2px 4px rgba(0,0,0,0.08)
  }
}
</style>