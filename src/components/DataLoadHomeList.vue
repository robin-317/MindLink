<template>
  <div class="" style="height: 200px;">
    123
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, computed } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const props = defineProps({
  dataSource:{
    type:Object,
    default:{},
  },
  loading:{
    type:Boolean
  },
  layoutType:{
    type:String,
    default:"grid"//默认宫格布局
  },
  gridCount:{
    type:Number,
    default:5,
  }
});
</script>

<style lang="scss" scoped>

</style>