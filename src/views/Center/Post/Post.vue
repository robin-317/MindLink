<template>
  <div class="head">
    <router-link class="upload-video iconfont icon-bianji" to="/center/post/postVideo">视频</router-link>
    <router-link class="upload-text iconfont icon-bianji" to="/center/post/postProblem">问题</router-link>
    <router-link class="upload-text iconfont icon-bianji" to="/center/post/postText">文章</router-link>
  </div>
  <el-divider>
      <el-icon>***</el-icon>
  </el-divider>
  <div class="body">
    <router-view>
    </router-view>
  </div>
</template>

<script setup>



</script>

<style lang="scss" scoped>
.head{
  display: flex;
  align-content: center;
  justify-content: space-around;
  width: 100%; /* 100%视口宽度 */
  // margin-left: calc(-50vw + 50%); /* 居中修正 */
  overflow-x: hidden;
  .upload-video,.upload-text{
    background:#47412c;
    display: inline-block;
    color:#fff;
    padding: 10px 40px;
    margin: 20px auto;
    text-decoration: none;
    cursor: pointer;
    &::before{
      margin-right: 5px;
    }
    &:hover{
      opacity: 0.8;
    }
  }
}
.body{
  width: 100%; /* 100%视口宽度 */
  // margin-left: calc(-50vw + 50%); /* 居中修正 */
  overflow-x: hidden;
}
</style>