<template>
  <div class="user-card">
    <!-- 头像 -->
    <el-avatar :size="60" :src="data.avatar" />

    <!-- 用户信息 -->
    <div class="user-info">
      <div class="user-name">
        {{ data.username }}
      </div>
    </div>

    <!-- 聊天按钮 -->
    <el-button class="follow-btn" type="primary" size="small" @click="ChatUser">
      + 私聊
    </el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import { createChat } from '@/api/chat'
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

const router = useRouter()


const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const ChatUser = async () => {
  const payload = {
    uid1: loginStore.userInfo.id,
    uid2: props.data.id
  }
  await createChat(payload)
  router.push(`/chat/${loginStore.userInfo.id}`)
}
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: fit-content;
  gap: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-name {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.user-level {
  font-size: 12px;
  background-color: #e5f3ff;
  color: #409eff;
  border-radius: 4px;
  padding: 2px 4px;
}

.user-meta {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}

.follow-btn {
  margin-left: auto;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 20px;
}
</style>
