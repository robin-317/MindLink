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


const emit = defineEmits(["loadData"]);
const scrollHandler = (curScrollTop)=>{
  if(window.innerHeight+curScrollTop<document.body.offsetHeight){
    return;
  }
  if(props.loading || props.dataSource.pageNo>=props.dataSource.pageTotal){
    return;
  }
  props.dataSource.pageNo++;
  emit("localData")
}
const props = defineProps({
  dataSource:{
    type:Object,
    default:{},
  },
  loading:{
    type:Boolean
  },
  loadEndMsg:{
    type:String,
    default:"已经到底了~~~"
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