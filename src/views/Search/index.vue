<template>
  <!-- 顶部 -->
  <div class="header-fixed">
    <TopHead theme="dark" />
    <div class="category-fixed">
      <div class="category-fixed-inner"></div>
    </div>
  </div>

  <!-- 导航栏 -->
  <div class="container">
    <ul id="nav" ref="navRef">
      <li class="slide1" :style="slide1Style"></li>
      <li class="slide2" :style="slide2Style" :class="{ squeeze: isHovering }"></li>
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        @click="handleClick(index, item.path, $event)"
        @mouseover="moveSlide2(index, $event)"
        @mouseout="hideSlide2"
      >
        <router-link :to="item.path">{{ item.label }}</router-link>
      </li>
    </ul>
  </div>

    <!-- 第一次进入，提示用户选择对应的按钮 -->
  <div class="fir" v-if="loading">
    <img src="@/assets/search.png" alt="">
  </div>

  <div style="height: 40px;" v-if ="!loading"></div>
  <div class="body-panel">
    <router-view :key="$route.fullPath" />
  </div>


  <div>

  </div>
</template>

<script setup>
import TopHead from '@/views/Home/components/TopHead.vue'
import { ref, onMounted ,watch} from 'vue'
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter()

const keyword = route.params.keyWord;

watch(() => route.params.keyWord, (newVal) => {
  keyword.value = newVal
})

const loading = ref(true);

// 菜单项及其对应的路由路径
const menuItems = [
  { label: '视频', path: `/search/video/${keyword}` },
  { label: '文章', path: `/search/passage/${keyword}` },
  { label: '问题', path: `/search/problem/${keyword}` },
  { label: '用户', path: `/search/user/${keyword}` }
]

const slide1Style = ref({})
const slide2Style = ref({})
const isHovering = ref(false)
const navRef = ref(null)

const moveSlide1 = (index, event) => {
  const li = event.target.closest('li')
  const position = li.offsetLeft
  const width = li.offsetWidth
  slide1Style.value = {
    opacity: 1,
    left: position + 'px',
    width: width + 'px'
  }
}

const moveSlide2 = (index, event) => {
  const li = event.target.closest('li')
  const position = li.offsetLeft
  const width = li.offsetWidth
  slide2Style.value = {
    opacity: 1,
    left: position + 'px',
    width: width + 'px'
  }
  isHovering.value = true
}

const hideSlide2 = () => {
  slide2Style.value.opacity = 0
  isHovering.value = false
}

const handleClick = (index, path, event) => {
  moveSlide1(index, event)
  loading.value = false;
  router.push(path)
}

onMounted(() => {
  const defaultIndex = 0 // 默认选中第一个菜单项
  const li = navRef.value.children[defaultIndex + 2]; // 前两个是 slide1 和 slide2
  const position = li.offsetLeft;
  const width = li.offsetWidth;
  slide1Style.value = {
    opacity: 1,
    left: position + 'px',
    width: width + 'px'
  };
  // keyword = route.query.keyword || '';
  console.log("sb");
  console.log(keyword);
})
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body,
html,
.container {
  margin-top: 100px;
  height: 100%;
  width: 100vw;
  margin-left: calc(-50vw + 50%); /* 居中修正 */
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./bg.jpg') no-repeat center center fixed;
  background-size: cover;
}

#nav {
  position: relative;
  border: none;
  border-radius: 10em;
  display: flex;
  list-style: none;
  background: #f5f5f5;
  box-shadow: 20px 40px 40px #00000033;
  padding: 10px;
}

#nav li a {
  position: relative;
  padding: 15px 50px;
  font: 500 24px '优设标题黑', sans-serif;
  border: none;
  outline: none;
  color: rgb(70, 100, 180);
  display: inline-block;
  text-decoration: none;
  z-index: 3;
}

.slide1,
.slide2 {
  position: absolute;
  display: inline-block;
  height: 60px;
  border-radius: 10em;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
}

.slide1 {
  background-color: rgb(170, 190, 255);
  z-index: 2;
}

.slide2 {
  opacity: 0;
  background-color: rgba(170, 190, 255, 0.5);
  z-index: 1;
  box-shadow: 0 0 20px #ffffffaa inset;
}

.squeeze {
  transform: scale(0.9);
}


.header-fixed{
    background: #fff;
    // margin: 0px auto;
    // min-height: calc(100vh);
    position: fixed;
    z-index: 9999;
    height:75px;
    width:100%;
    background: rgba(78, 118, 128, 0.993);
    top:0px;
}
.category-fixed{
      border-bottom: 1px solid #e0e0e0; /* 底部边框 */
      box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.1); /* 底部阴影 */
      border-radius: 8px; /* 圆角，可以调成你想要的程度 */
      margin-top: 20px;
}


.body-panel{
  width: 100%;
  width: 100%;
  // margin-left: 150px;
  margin-right: 150px;
  
}
.fir{
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 45%;
  }
}
.body-panel{
  width: 100%;
  
}
</style>
