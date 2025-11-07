<template>
  <router-link class="card" :to="`/problem/${data.id}`" target="_blank">
    <!-- 左侧图片 -->
    <!-- <router-link class="card-left" :to="`/problem/${data.id}`" target="_blank">
      <img class="main-img" :src="props.data.commentImg" alt="内容图片" />
    </router-link> -->

    <!-- 右侧信息 -->
    <div class="card-right">
      <span class="pT">{{ data.title }}</span>
      <!-- 用户信息 -->
      <router-link class="user-info" :to="`/user/${data.userId}`" target="_blank">
        <!-- <div style="width: 10px;"></div> -->
        <!-- <img class="avatar" :src="userInfo.avatar" alt="用户头像" /> -->
        <el-avatar :size="40" :src="userInfo.avatar"></el-avatar>
        <div class="text-info">
          <div class="username">{{ userInfo.username }}</div>
        </div>
        <!-- <div style="width: 10px;"></div> -->
        <div class="post-time">{{proxy.Utils.formData(data.createTime)}}</div>
      </router-link>

      
      <!-- 是否解决 -->
      <router-link class="status-box" :to="`/problem/${data.id}`" target="_blank">
        <span class="status-text iconfont icon-gou" style=" color: green;" v-if="props.data.console"> 已解决</span>
        <span class="status-text iconfont icon-cha" style=" color: red;" v-else>未解决</span>
      </router-link>
      <!-- <span style="font-size: 24px; color: red;">❎</span> -->
    </div>
  </router-link>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const props = defineProps({
  data:{
    type: Object,
    default: {},
  },
  //布局类型  0:上下布局  1:左右布局
  layoutType:{
    type: Number,
    default: 0
  },
  MarginTop:{
    type: Number,
    default: 0
  }
});

const userInfo = ref({
  username:'山里人',
  avatar:'https://yangyang-1.oss-cn-beijing.aliyuncs.com/71bc077de12b288e05a42175f8681c3.jpg'
});
import { getProblemWritterMS } from "@/api/problem";
const getProblemWriter = async(PostUserId)=>{
  let res = await getProblemWritterMS(PostUserId);
  if(res.code == 200){
    userInfo.value = res.data
    console.log("执行成功")
  }
}

onMounted(()=>{
  getProblemWriter(props.data.userId);
})
</script>

<style scoped lang="scss">
.card {
  text-decoration: none;
  display: flex;
  width: 100%;
  max-width: 800px;
  border: 2px solid rgba(23, 22, 22, 0.6);
  border-radius: 16px;
  overflow: hidden;
  background: #e4e0e0;
  margin: 20px auto;
  padding: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: scale(1.05); /* 稍微放大一点 */
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 
                0 0 40px rgba(0, 170, 255, 0.4); /* 发亮光效 */
    border: 1px solid rgba(255, 255, 255, 0.6); /* 发光边框 */
  }
}
// .fuckc{
//   border-radius: 50px;
//   // text-align: center;
//   backdrop-filter: blur(15px);
//   background: rgba(255, 255, 255, 0.24);
//   box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
//   border: 1px solid rgba(255, 255, 255, 0.18);
//   transition: all 0.3s ease; /* ✨ 让 hover 动画过渡 */
//   justify-content: center;

//   /* 鼠标悬停效果 */
//   &:hover {
//     transform: scale(1.05); /* 稍微放大一点 */
//     box-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 
//                 0 0 40px rgba(0, 170, 255, 0.4); /* 发亮光效 */
//     border: 1px solid rgba(255, 255, 255, 0.6); /* 发光边框 */
//     }
// }
.card-left {
  
  // display: flex;
  align-items: center;
  justify-content: center;
  flex: 3;
  position: relative;
  aspect-ratio: 4 / 3; // 或者你用 padding-bottom 技巧也可以
  overflow: hidden;
}

.main-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.card-right {
  color: black;
  text-decoration: none;
  flex: 2;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  justify-content: space-between;
  // .pT{
  //   width: auto;
  //   font-size: 20px;
  //   font-weight: bolder;
  // }
  .pT {
  // white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 100%; /* 可根据实际布局调整 */
  font-size: 20px;
  font-weight: bolder;
}
}

.user-info {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid black;
  object-fit: cover;
}

.text-info {
  /* display: flex; */
  flex-direction: column;
  font-size: 13px;
}

.username {
  font-weight:normal;
}

.post-time {
  color: gray;
  font-size: 12px;
}

.status-box {
  text-decoration: none;
  margin-top: 20px;
  border: 2px solid rgba(125, 99, 99, 0.158);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

.status-text {
  font-weight: bold;
  font-size: 16px;
}
</style>
