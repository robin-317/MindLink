<template>
  <div class="card-post">
    <!-- 左侧封面/预览图 -->
    <div class="cover-wrapper">
      <!-- 
        这里示例使用一个静态图片路径。
        实际开发中，可以使用 props 将图片路径传进来。
      -->
      <img
        class="cover-image"
        :src=data.commentImg
        alt="cover"
      />
    </div>

    <!-- 右侧内容区域 -->
    <div class="content-wrapper">
      <!-- 标题/名称 -->
      <h2 class="post-title">{{ data.title }}</h2>

      <!-- 时间/日期展示 -->
      <p class="post-date">{{data.createTime}}</p>

      <!-- 统计信息 (阅读、评论、分享) -->
      <div class="stats">
        <span class="stat-item">点赞：{{ data.likeCount }}</span>

      </div>

      <!-- 操作按钮区域 -->
      <div class="actions">
        <button class="btn-edit" @click="onEdit">编辑</button>
        <button class="btn-broadcast" @click="onBroadcast">播报</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPost',
  props: {
    data:{
    type: Object,
    default: {},
  },
  },
  methods: {
    onEdit() {
      // 处理“编辑”逻辑
      // 可以使用 this.$emit('edit') 等形式通知父组件
      console.log('编辑按钮被点击');
    },
    onBroadcast() {
      // 处理“播报”逻辑
      // 可以使用 this.$emit('broadcast') 等形式通知父组件
      console.log('播报按钮被点击');
    }
  }
};
</script>

<style scoped>
.card-post {
  /* 外层容器 */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 600px; /* 你可以根据实际需求进行调整 */
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 6px;
  background-color: #fff;
}

/* 左侧封面区域 */
.cover-wrapper {
  margin-right: 12px;
}
.cover-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

/* 右侧内容区域 */
.content-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.post-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.post-date {
  margin: 4px 0;
  font-size: 14px;
  color: #999;
}

/* 统计信息区域 */
.stats {
  margin: 8px 0;
  font-size: 14px;
  color: #666;
}

.stat-item {
  margin-right: 12px;
}

/* 操作按钮区域 */
.actions {
  margin-top: 8px;
}

.actions .btn-edit,
.actions .btn-broadcast {
  padding: 6px 12px;
  margin-right: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #fafafa;
  transition: 0.3s;
}

.actions .btn-edit:hover {
  background-color: #d6eaff;
  border-color: #83bfff;
}

.actions .btn-broadcast:hover {
  background-color: #ffeacb;
  border-color: #ffd08a;
}
</style>
