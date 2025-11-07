<template>
  <div class="video-tab">
    <div class="tab">稿件管理</div>
    <div class="search"></div>
  </div>
  <div class="video-manage" >
    <div class="top-info">
      <div class="all-video-panel">
        <div class="all-video" @click="cleanStatusLoad">全部稿件
          <span class="count-info">
            {{ countInfo.passageCount+countInfo.problemCount+countInfo.videoCount }}
          </span>
        </div>
      </div>
      

      <div class="video-status">
        <span @click="statusLoad(2)" :class="['item' , status == 2?'active':'']">文章<span class="count-info">{{ countInfo.passageCount }}</span></span>
        <el-divider direction="vertical"></el-divider>
        <span @click="statusLoad(1)" :class="['item' , status == 1?'active':'']">视频<span class="count-info">{{ countInfo.videoCount }}</span></span>
        <el-divider direction="vertical" ></el-divider>
        <span @click="statusLoad(3)" :class="['item' , status == 3?'active':'']">问题<span class="count-info">{{ countInfo.problemCount }}</span></span>
      </div>
    </div>

    <div class="video-list">
      <div v-if="(status==2)"> <!-- 展示文章 -->
        <div v-for="item in dataList" :key="item" >
          <textItem :data=item></textItem>
        </div>
      </div>
      <div v-if="(status==1)"> <!-- 展示视频 -->
        <div v-for="item in dataList" :key="item" >
          <videoItem :data=item></videoItem>
        </div>
      </div>
      <div v-if="(status==3)"> <!-- 展示问题 -->
        <div v-for="item in dataList" :key="item" >
          <problemItem :data=item></problemItem>
        </div>
      </div>
    </div>
    <el-pagination 
        background 
        layout="prev, pager, next" 
        :total="totalCount" 
        :page-size="10"
        :current-page="pagination.currentPage"
        hide-on-single-page=true
        @current-change="handleCurrentChange"/>

  </div>
</template>

<script setup>
import problemItem from "./problemItem.vue";
import textItem from "./textItem.vue";
import videoItem from "./videoItem.vue";
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
import Video from "./Post/Video.vue";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();
const workNameFuzzy = ref();
const countInfo = ref({passageCount:0,videoCount:0,problemCount:0});

const dataList=ref({});
const status = ref();
const totalCount = ref();
//分页组件
const pagination = ref({type:2, currentPage: 1, pageSize: 10, userId: loginStore.userInfo.id})//1：视频  2：文章  3：问题

const statusLoad = (_status)=>{
  status.value = _status;
  pagination.value.type = _status;
  loadVideoList();
}
import { getPaginationList } from "@/api/center";
const loadVideoList = async()=>{
  const res = await getPaginationList(pagination.value);
  if(res.code==200){
    totalCount.value = res.data.total;
    dataList.value = res.data.results;
  }

}
//当前页码发生变化时触发
const handleCurrentChange = (page) => {
  pagination.value.currentPage = page
  loadVideoList()
}
import { totalCountInfo } from "@/api/center";
//获取各版块总数量
const loadCounts = async()=>{
  let res = await totalCountInfo(loginStore.userInfo.id);
  if(res.code==200){
    countInfo.value.passageCount=res.data.passageCount;
    countInfo.value.videoCount=res.data.videoCount;
    countInfo.value.problemCount=res.data.problemCount;
    
  }
}
onMounted(()=>{
  status.value=2;
  loadCounts();
  loadVideoList();
})
</script>

<style lang="scss" scoped>
.video-tab{
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 0px 40px;
  justify-content: space-between;
  .tab{
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    color: var(--blue);
    padding-bottom: 3px solid var(--blue);

  }
  .search{
    width:200px;
  }
}
.video-manage{
  margin-top: 10px;
  padding: 0px 40px 10px 40px;
  .top-info{
    .count-info{
      padding: 0px 5px;
    }
    .all-video-panel{
      display: flex;
      .all-video{
        cursor: pointer;
        font-size: 14px;
        color: var(--blue);
      }
    }
    .video-status{
      margin-top:10px;
      display: flex;
      align-items: center;
      .item{
        cursor: pointer;
        font-size: 13px;
        margin-right: 0px;
        color: var(--text2);
        &:hover{
          color: var(--blue);
        }
      }
      .action{
        color: var(--blue);
      }
    }
  }
}
</style>