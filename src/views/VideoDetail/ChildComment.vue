<!-- 三级及以上评论 -->
<template>
  <div class="sub-reply-container" v-if="childComments && childComments.length">
    <div class="sub-reply" v-for="(child, index) in childComments" :key="index">
      <!-- 渲染内容 -->
      <div class="listbox-top-user">
        <el-avatar :size="30" :src="child.userImg" />
        <p>
          <span>{{ child.roleName }}</span>
          回复
          <span>@{{ child.parentName }}</span>
        </p>
      </div>
      <div class="listbox-middle-root">{{ child.comment }}</div>
      <div class="listbox-bottom">
        <span>发布时间：{{ child.createdAt }}</span>
        <span @click="handleReply(props.rootId, child.id)">回复</span>
      </div>

      <!-- 递归地渲染子评论的子评论：调用自己 -->
      <ChildComment
        :childComments="child.children"
        :parentName="child.createdBy"
        @to-reply="handleReply"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
// 接收父组件传过来的值
const props = defineProps({
  rootCommentId:{
    type:Number,
  },
  parentId:{
    type:Number,
  },
  parentName: {
    type: String,
    reequire: true,
  }
});
const childComments = ref({});

// console.log("🚀 ~ parentName:", parentName);
// console.log("🚀 ~ childComments:", childComments);

// 声明需要抛出的事件
const emit = defineEmits(["to-reply"]);

const handleReply = (rootCommentId, parentId) => {
  // 【注意】这里不以对象形式包裹发送，会导致嵌套；父组件中回复一级评论与子级评论共用一个传值方法
  emit("to-reply", rootCommentId, parentId);
};


//获取此评论下的儿子级别评论
import { loadChildComment } from '@/api/get/getInfo';
import { onMounted } from 'vue';

const getComment = async()=>{
  const data={
      root:props.rootCommentId,
      parent:props.parentId,
      videoId:route.params.videoId,
    }
  let res = await loadChildComment(data);
  if(res.code==200){
    childComments.value = res.data;
  }
}
onMounted(()=>{
  getComment();
})
// onCreated(()=>{
//   getComment();
// })
</script>
<style lang="scss" scoped>


.listbox-top-user {
  display: flex;

  p {
    margin-left: 10px;
    width: 100%;

    // 姓名条
    span:first-child {
      color:rgb(136, 73, 73);
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

    // 父级姓名条
    span:last-child {
      color: #0c9dd2;
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
</style>
