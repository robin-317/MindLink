<template>
    <!-- 顶部 -->
  <div class="header-fixed">
    <TopHead theme="dark" />
    <div class="category-fixed">
      <div class="category-fixed-inner"></div>
    </div>
  </div>

  <div class="main-panel">
    <div class="top-title iconfont icon-shijian">历史记录</div>
    <div class="nav">
      <ul>
        <li><router-link to="/history/video"><div style="font-size: 35px;">视频</div></router-link></li>
        <li><router-link to="/history/passage"><div style="font-size: 35px;">文章</div></router-link></li>
        <li><router-link to="/history/problem"><div style="font-size: 35px;">问题</div></router-link></li>
        <div class="nav-box"></div>
      </ul>
    </div>
    <div style="height: 20px;"></div>
    <div>
      <router-view></router-view>
    </div>
  </div>
  
</template>

<script setup>
// 无需逻辑脚本，本组件仅为静态导航栏
import TopHead from '@/views/Home/components/TopHead.vue'
</script>

<style scoped lang="scss">
* {
  list-style: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #8da1f8;
}

.nav {
  // margin-top: 120px;
  // width: 1200px;
  width: 100%;
  height: 70px;
  position: relative;
  top: 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: #fff;
}
.nav ul {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  right: 5%;
}
.nav ul .nav-box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc((100% / 3) * 1);
  height: 10px;
  border-radius: 2px;
  transition: 0.5s;
}
.nav ul li {
  width: 100%;
  text-align: center;
}
.nav ul li router-link {
  color: rgb(153, 114, 214);
  font: 100 30px '优设标题黑';
  font-size: 30px;
  display: block;
  width: 100%;
  height: 100%;
  line-height: 70px;
}
.nav ul li:nth-child(1):hover ~ .nav-box {
  left: calc(100% / 3 * 0);
  background-color: rgb(250, 190, 250);
}
.nav ul li:nth-child(2):hover ~ .nav-box {
  left: calc(100% / 3 * 1);
  background-color: rgb(68, 91, 156);
}
.nav ul li:nth-child(3):hover ~ .nav-box {
  left: calc(100% / 3 * 2);
  background-color: #d18df8;
}

.header-fixed{
    background: #fff;
    // margin: 0px auto;
    // min-height: calc(100vh);
    position: fixed;
    z-index: 9999;
    height:75px;
    width:100%;
    background: rgba(179, 145, 243, 0.856);
    top:0px;
}
.category-fixed{
      border-bottom: 1px solid #e0e0e0; /* 底部边框 */
      box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.1); /* 底部阴影 */
      border-radius: 8px; /* 圆角，可以调成你想要的程度 */
      margin-top: 20px;
}

.main-panel{
  margin-left: 20%;
  margin-right: 20%;
  background: #f5f5f8bb;
  border-radius: 10px;
  .top-title{
    margin-top: 120px;
    font-weight: 500px;
    font-size: 66px;
  }
}
</style>
