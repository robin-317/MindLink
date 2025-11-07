<template>
  <div class="card-post">
    <!-- 左侧封面/预览图 -->
    <div class="cover-wrapper">
      <img class="cover-image" :src="data.commentImg" alt="cover" />
    </div>

    <!-- 右侧内容区域 -->
    <div class="content-wrapper">
      <h2 class="post-title">{{ data.title }}</h2>
      <p class="post-date">{{ data.createTime }}</p>

      <div class="stats">
        <span class="stat-item">点赞：{{ data.likeCount }}</span>
      </div>

      <div class="actions">
        <button class="btn-edit" @click="onEdit">编辑</button>
        <button class="btn-broadcast" @click="onBroadcast">是否解决</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { consoled } from '@/api/problem';
import { defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const onEdit = () => {
  console.log('编辑按钮被点击');
};

const onBroadcast = async () => {
  const info = { id: props.data.id };
  await consoled(info);
};
</script>

<style scoped>
.card-post {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 600px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 6px;
  background-color: #fff;
}

.cover-wrapper {
  margin-right: 12px;
}
.cover-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

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

.stats {
  margin: 8px 0;
  font-size: 14px;
  color: #666;
}

.stat-item {
  margin-right: 12px;
}

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
