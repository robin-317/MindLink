<template>
  <div 
    :class="['video-item',layoutType == 1 ? 'video-item2':'']" 
    :style="{'margin-top':MarginTop + 'px'}" 
  >
  
    <router-link :to="`/video/${data.id}`" >  <!-- target="_blank"  已去掉，此为新页面打开-->
      <div class="cover">
        <Cover :source="props.data.imageUrl" style="height: 200px;" fit="cover"></Cover>
        <div class="shade">
          <div class="play-count" v-show="layoutType === 0">
            <div class="iconfont icon-tubiaozhizuomoban">{{ data.likeCount }}</div>
            <div style="width: 15px;"></div>
            <div class="iconfont icon-pinglun">弹幕|评论</div>
          </div>
          <div class="play-time">1小时</div>
        </div>
      </div>
    </router-link>
    <div class="video-info">
      <router-link 
        class="title" :to="`/video/${data.id}`" 
        v-html="data.title"
        target="_blank"
      ></router-link>
      <router-link 
        class="user-name" 
        :to="`/user/${data.userId}`" 
        target="_blank"
      >
        <!-- 发布者的名字 -->
        <span class="iconfont icon-yonghu2">{{ PostUserInfo.username }}</span>
        <!-- 发布的时间 -->
        <span >{{proxy.Utils.formData(data.createTime)}}</span>
      </router-link>
      <div class="play-count" v-show="layoutType === 1">
        <div class="iconfont icon-tubiaozhizuomoban">{{ data.likeCount }}</div>
        <div class="iconfont icon-pinglun">弹幕|评论</div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const props = defineProps({
  data:{
    type: Object,
    default: {},
  },
  //布局类型  0:上下布局  1:左右布局
  layoutType:{
    type: Number,
    default: 0
  },
  MarginTop:{
    type: Number,
    default: 0
  }
});
const PostUserInfo = ref({});
import { getVideoWritterMS } from "@/api/get/getHomeList";
const getVideoWriter = async(PostUserId)=>{
  console.log("开始获取视频发布者信息"+PostUserId)
  let res = await getVideoWritterMS(PostUserId);
  if(res.code == 200){
    PostUserInfo.value = res.data
    console.log("执行成功")
  }
}


onMounted(()=>{
  getVideoWriter(props.data.userId);
})
</script>

<style lang="scss" scoped>
.video-item{
  width: 100%;
  overflow: hidden;
  &:hover {
    transform: scale(1.05); /* 稍微放大一点 */
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 
                0 0 40px rgba(199, 105, 223, 0.61); /* 发亮光效 */
    border: 1px solid rgba(255, 255, 255, 0.6); /* 发光边框 */
  }
  .cover{
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .image-style{
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 5px;
    }
    .shade{
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      box-sizing: border-box;
      padding: 8px 8px 6px;
      width: 100%;
      height: 38px;
      border-bottom-right-radius: 6px;
      border-bottom-left-radius: 6px;
      background-image: linear-gradient(
        180deg,
        rgba(0,0,0,0) 0%,
        rgba(0,0,0,0.8) 100%
      );
      color: #fff;
      opacity: 1;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;
      .play-count{
        display: flex;
        .iconfont{
          font-size:13px;
          &::before{
            font-size: 16px;
            margin-right: 2px;
          }
        }
        .icon-danmu{
          margin-left:15px;
        }
      }
    }
  }
  .video-info{
    cursor:pointer;
    .title{
      height: 40px;
      color: var(--text2);
      font-size: 14px;
      margin-top: 10px;
      display: -webkit-box;
      overflow: hidden;
      text-decoration: none;
      -webkit-box-orient: vertical;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      word-break: break-word !important;
      word-break: break-all;
      line-break: anywhere;
      -webkit-line-clamp: 2;
      cursor: pointer;
      &:hover{
        color: var(--blue);
      }
      :deep(.highlight){
        color: red !important;
      }
    }
    .user-name{
      margin-top:5px;
      color: #9499a0;
      font-size: 13px;
      cursor: pointer;
      text-decoration: none;
      &:hover{
        color: var(--blue);
      }
      .iconfont{
        &::before{
          font-size: 18px;
          margin-right: 3px;
          float: left;
        }
        font-size: 13px;
      }
    }
  }
}
.video-item2{
  display: flex;
  .cover{
    width: 190px;
    .shade{
      justify-content: end;
    }
  }
  .video-info{
    flex: 1;
    margin-left: 15px;
    .title{
      margin-top: 0px;
    }
    .play-count{
      display: flex;
      width: 100%;
      margin-top: 5px;
      color: #9499a0;
      .iconfont{
        font-size: 14px;
        &::before{
          font-size: 16px;
          margin-right: 2px;
        }
      }
      .icon-danmu{
        margin-left: 15px;
      }
    }
  }
}
</style>