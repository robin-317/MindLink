<!-- 二级评论 -->

<template>
  <div v-if="childComments && childComments.length">
    <div
      class="sub-reply-container"
      id="child-reply"
      v-for="(child, childIndex) in childComments"
      :key="childIndex"
    >
      <div class="listbox-top-user">
        <el-avatar :size="30" :src="child.userImg" />
        <p>
          <span>{{ child.roleName }}</span>
        </p>
      </div>
      <div class="listbox-middle-root">{{ child.comment }}</div>
      <div class="listbox-bottom">
        <span>发布时间：{{ child.createdAt }}</span>
        <!-- 回复的是二级评论 -->
        <span @click="handleReply(props.rootCommentId, child.id)">回复</span>
      </div>
      <template>
      <ChildComment
          :rootCommentId="props.rootCommentId"
          :parentId="child.id"
          @to-reply="handleReply"
          style="margin-left: 65px"
      />
    </template>
    </div>
  </div>



</template>
<script setup>
import ChildComment from "./ChildComment.vue";
import { useRoute, useRouter } from "vue-router";
import { onUpdated, ref, watch } from "vue";
const route = useRoute();
// 接收父组件传过来的值：二级留言
const props = defineProps({
  secondComments: {
    type: Array,
    default: [],
  },
  rootCommentId:{
    type:Number
  }
});
const childComments = ref([]);

// 声明需要抛出的事件
const emit = defineEmits(["handle-reply"]);

const handleReply = (rootCommentId, parentId) => {
  // 【注意】这里不以对象形式包裹发送，会导致嵌套；因为父组件中回复一级评论与子级评论共用一个传值方法
  emit("handle-reply", rootCommentId, parentId);
};


//获取此评论下的儿子级别评论
import { loadChildComment } from '@/api/get/getPasInfo';
import { onMounted } from 'vue';
const getComment = async()=>{
  
  const data={
      root:props.rootCommentId,
      parent:props.rootCommentId,
      passageId:route.params.passageId,
    }
  let res = await loadChildComment(data);
  console.log(data);
  console.log(res);
  if(res.code==200){
    childComments.value = res.data;
  }
}
onMounted(()=>{
  getComment();
});
onUpdated(() => {
  getComment();
  console.log("🚀 ~ childComments:", childComments);
});
watch(
  () => props.rootCommentId,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      getComment();
    }
  },
  {
    immediate: true, // 可选，确保在组件首次渲染时也执行一次
  }
);
</script>
<style lang="scss" scoped>

.sub-reply-container {
  margin: 20px 0 0 65px;

  .listbox-top-user {
    display: flex;

    p {
      margin-left: 10px;
      width: 100%;

      // 姓名条
      span:first-child {
        color: rgb(136, 73, 73);
      }

      // 身份标签
      span:nth-child(2) {
        margin-left: 5px;
        font-size: 8px;
        padding: 2px;
        background-color: rgb(136, 73, 73);
        color: white;
        border-radius: 5px;
        position: relative;
        bottom: 4px;
      }
    }
  }

  .listbox-middle-root,
  .listbox-bottom {
    margin-left: 38px;
  }

  .listbox-bottom {
    font-size: 12px;
    color: #9499a0;
    margin: 10px 0 10px 35px;
    display: flex;

    span {
      display: block;
      margin-right: 20px;
    }

    span:last-child:hover {
      cursor: pointer;
      color: rgb(136, 73, 73);
    }
  }
}
</style>