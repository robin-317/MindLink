<template>
  <div class="commend-panel">
    <div>
      <div class="video-list" style="margin-left: 30px;">
        <div v-for="item in PassageList" :key="item">
          <ShowTextItem :data="item"></ShowTextItem>
        </div>
      </div>
      <el-pagination 
        background 
        layout="prev, pager, next" 
        :total="totalCount" 
        :page-size="24"
        :current-page="pagination.currentPage"
        hide-on-single-page=true
        @current-change="handleCurrentChange"/>
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import { getAllPassage,getPaginationList} from "@/api/get/getHomeList";
//获取文章的数据
//初始获取第一页内容
const PassageList =ref({});
const totalCount = ref();


//分页组件
const pagination = ref({type:2, currentPage: 1, pageSize: 24})
//当前页码发生变化时触发
const handleCurrentChange = (page) => {
  pagination.value.currentPage = page
  queryPage()
}
//分页条件查询
const queryPage = async () => {
  const res = await getPaginationList(pagination.value);

  if(res.code == 200) {
    PassageList.value = res.data.results;
    totalCount.value = res.data.total;
  }
}




onMounted(()=>{
  queryPage();
})
</script>

<style lang="scss" scoped>
.commend-panel{
  margin-top: 20px;
  .video-list{
    margin-left: 10px;
    flex: 1;
    display: grid;
    grid-gap:40px;
    grid-template-columns: repeat(4,1fr);
  }
}
.footer{
  margin-top: 66px;
  box-shadow: 0 -4px 8px -4px rgba(0, 0, 0, 0.1); /* 向上的阴影 */
}
</style>