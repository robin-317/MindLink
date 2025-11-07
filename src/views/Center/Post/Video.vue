<template>
  <div>
    <VideoUploader></VideoUploader>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

import VideoUploader from "./VideoUploader.vue";


</script>

<style>

</style>