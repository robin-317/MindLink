<template>
  <div class="card">
    <!-- 左侧图片 -->
    <router-link class="card-left" :to="`/problem/${data.id}`" target="_blank">
      <img class="main-img" :src="props.data.img" alt="内容图片" />
    </router-link>

    <!-- 右侧信息 -->
    <div class="card-right">
      <span class="pT">{{ data.title }}</span>
      <!-- 用户信息 -->
      <router-link class="user-info" :to="`/user/${data.authorId}`" target="_blank">
        <!-- <div style="width: 10px;"></div> -->
        <!-- <img class="avatar" :src="userInfo.avatar" alt="用户头像" /> -->
        <el-avatar :size="40" :src="userInfo.avatar"></el-avatar>
        <div class="text-info">
          <div class="username">{{ userInfo.username }}</div>
        </div>
        <!-- <div style="width: 10px;"></div> -->
      </router-link>

      <div class="post-time">{{proxy.Utils.formData(data.watchTime)}}</div>
    </div>
  </div>
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
  display: flex;
  width: 100%;
  max-width: 800px;
  max-height: 150px;
  border: 2px solid rgba(23, 22, 22, 0.6);
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  margin: 20px auto;
  padding: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}

.card-left {
  // display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  position: relative;
  aspect-ratio: 4 / 3; // 或者你用 padding-bottom 技巧也可以
  overflow: hidden;
}

.main-img {
  position: absolute;
  top: 3;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.card-right {
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 100%; /* 可根据实际布局调整 */
  font-size: 20px;
  font-weight: bolder;
}
}

.user-info {
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
