<template>
  <div>
    <router-link v-if="id" :to="`/user/${id}`" target="_blank">
      <Cover
        :lazy="lazy"
        :width="width"
        :source="avatar"
        :defaultImg="defaultAvatar"
        borderRadius="50%"
        :scale="1">
      </Cover>
    </router-link>
    <Cover
      v-else
        :lazy="lazy"
        :width="width"
        :source="avatar"
        :defaultImg="defaultAvatar"
        borderRadius="50%"
        :scale="1">
    </Cover>
  </div>
</template>

<script setup>
import { sources } from "@fingerprintjs/fingerprintjs";
import { ref, reactive, getCurrentInstance, nextTick, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const defaultAvatar = ref("user.png")
const props = defineProps({
  width:{
    type:Number,
    default: 50,
  },
  avatar:{
    type:String,
  },
  id:{
    type:String,
  },
  lazy:{
    type:Boolean,
    default: true,
  }
})
</script>

<style lang="scss" scoped></style>