<template>
  <div :class="store.mobileOpenState ? 'left hidden' : 'left'">
    <Message />
  </div>
</template>

<script setup>
import { mainStore } from "@/stores/person.js";
import Message from "@/views/Personal/OwnOne/userHome/Message.vue";

const store = mainStore();
</script>

<style lang="scss" scoped>
.left {
  // flex: 1 0 0%;
  width: 50%;
  margin-right: 10px;
  transform: translateY(20px);
  &.hidden {
    display: none;
  }
  @media (max-width: 720px) {
    margin-right: 0;
    width: 100%;
  }
}
</style>
