<template>
  <!-- <el-divider content-position="left">
    <div  style="font-size: 35px; margin-bottom: 5px;background: #f5f1f1;" class="iconfont icon-shoucang-copy">
      <router-link to="" style="text-decoration: none;color: black;">热门推荐>></router-link>
    </div>
  </el-divider> -->
  <div  style="font-size: 35px; margin-bottom: 5px;background: #f5f1f1;" class="iconfont icon-navicon-jkhd">
      <router-link to="" style="text-decoration: none;color: black;">热门推荐>></router-link>
    </div>
  <div class="commend-panel">
    <div class="carousel-panel" style="width:600px;height: 360px;margin-top: 25px;">
      <el-carousel 
        class="carousel"
        height="360px"
        arrow="always"
        indicator-position="outside"
        @change="carouselChange"
        ref="carouselRef">
        <el-carousel-item 
          v-for="(item,index) in carouselTextList" 
          :key="item" 
          :name="index +''"
        >
          <div class="roll-image">
            <router-link 
              :to="`/passage/${item.id}`"
              target="_blank"
            >
              <img :src="`${item.commentImg}`"  alt="" style="width: 100%;height: 100%;">
            </router-link>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="carousel-bottom" v-if="(carouselTextList.length>0)">
        <div class="name-op">
          <router-link 
            class="video-name" 
            :to="`/passage/${carouselTextList[carouselIndex].id}`" 
            target="_blank">
            {{ carouselTextList[carouselIndex].title }}
          </router-link>
          <!-- 自定义切换按钮 -->
          <!-- <div class="change-btn">
            <span class="iconfont icon-bofang" @click="preCarousel"></span>
            <span class="iconfont icon-bofang" @click="nextCarousel"></span>
          </div> -->
          <div class="dtos">
            <div 
              :class="['dto-item',carouselIndex == item -1 ? 'active':'']" 
              v-for="item in carouselTextList.length" 
              :key="item" 
              @click="setCarousel(item)"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-list" style="margin-left: 30px;">
      <div v-for="item in commendVideoList" :key="item">
        <ShowItem :data="item"></ShowItem>
      </div>
    </div>
  </div>

  <hostList></hostList>

  
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

//获取热门文章列表
import { hostTextList ,hostVideoLst} from "@/api/get/getHomeList";
import hostList from "./HomeList/hostList.vue";

const carouselTextList = ref([]);
const loadRecommendText = async()=>{
  let res = await hostTextList();
  console.log(res)
  console.log("执行完毕")
  if(res.code==200){
    carouselTextList.value = res.data;
    console.log("成功获取")
    // console.log(carouselTextList)
  }
}

//获取图片当前轮播的定位
const carouselIndex = ref(0);
const carouselChange =(e)=>{
  carouselIndex.value = e;
}


const carouselRef = ref();
//上一张图
const preCarousel = ()=>{
  carouselRef.value.prev();
}
//下一张图
const nextCarousel = ()=>{
  carouselRef.value.next();
}

const setCarousel = (index)=>{
  carouselRef.value.setActiveItem(index -1 +"");
}


//获取热门视频
const commendVideoList = ref([])
const loadRecommendVideo = async()=>{
  let res = await hostVideoLst();
  console.log("成功执行,获取数据为: "+res);
  if(res.code == 200){
    commendVideoList.value = res.data;
    console.log("数据返回成功: "+commendVideoList)
  }
}

onMounted(()=>{
  loadRecommendText();//获取热门文章
  loadRecommendVideo();//获取热门视频
})
</script>

<style lang="scss" scoped>
.commend-panel{
  display: flex;
  margin-top: 20px;
   
  .carousel-panel{
    border-radius: 5px;
    // overflow: hidden;
    position: relative;
    .carousel{
      // margin-top: 40px;
      overflow: hidden;
      align-items: center;
      position: relative;
      align-content: center;
      border: 1px solid #927d37c5;
    }
    .roll-image{
      position: relative;
      background: #e9e9e9;
      text-align: center;
      a{
        display: block;
      }
      img{
        max-width: 100%;
      }
    }
    .carousel-bottom{
      
      
    
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 65px;
      background: rgba(0,0,0,0.6);
      padding: 10px;
      .name-op{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .video-name{
          flex: 1;
          color: #ffff;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
        }
        .change-btn{
          margin-left: 10px;
          width: 60px;
          display: flex;
          justify-content: space-between;
          .iconfont{
            cursor: pointer;
            text-align: center;
            widows: 25px;
            line-height: 25px;
            font-size: 20px;
            background-color: rgba(255,255,255,0.1);
            border-radius: 5px;
            color: #ffff;
          }
        }
      }
      .dtos{
        display: flex;
        margin-top: 5px;
        align-items: center;
        .dto-item{
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #b0b0b0;
          cursor: pointer;
          margin-right: 10px;
        }
        .active{
          width: 15px;
          height: 15px;
          background:#fff;
        }
      }
    }
  }
  .video-list{
    margin-left: 10px;
    flex: 1;
    display: grid;
    grid-gap:20px;
    grid-template-columns: repeat(3,1fr);
  }
}

</style>