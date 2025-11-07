<template>
  <div class="content-title">
    <div class="ms">
      我的消息
    </div>
    <div class="re">
      <router-link to="/home" class=" iconfont icon-tuihui">大厅</router-link>
    </div>
  </div>
  <div>
    <myMessage></myMessage>
  </div>
</template>

<script setup>
import myMessage from './myMessage.vue';
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

</script>

<style scoped lang="scss">
.content-title {
  height: 42px;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 15px;
  color: #666;
  border-radius: 4px;
}
.me{
  flex: 2;
}
.re{
  flex:0.1
}
</style>