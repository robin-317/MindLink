<template class="body">

<div class="header-fixed">
      <TopHead theme="dark"></TopHead>
      <div class="category-fixed">
        <div class="category-fixed-inner"></div>
      </div>
</div>

<div style="background-color: #fff;height: 25px;"></div>

<div class="video-detail">
  <!-- <div class="reLase iconfont icon-zuojiantou" @click="router.go(-1)"></div> -->
  <div class="video-user-info">
      <Avatar :userId="userInfo.id" :avatar="userInfo.avatar"></Avatar>
      <div class="user-info">
        <router-link class="nick-name" :to="`/user/${userInfo?.id}`" target="_blank">{{ userInfo.username }}</router-link>
        <div class="introduction">
          {{ userInfo.signature || "~~~~~~~~" }}
        </div>
        <div class="op-btns">
          <router-link class="btn-go-home" :to="`/user/${userInfo.id}`" target="_blank">
              <div v-if="loginStore.userInfo.id != userInfo.id">访问</div>
              <div v-if="loginStore.userInfo.id == userInfo.id">我的空间</div>
          </router-link>
          <div class="focus-btn">
            <!-- <el-button class="btn" type="primary" @click="ChatUser" v-if="loginStore.userInfo.id != userInfo.id">私聊</el-button> -->
          </div>
        </div>
      </div>
  </div>


  <div class="video-header">
    <div class="video-title">
      <div class="title">{{ videoInfo.title }}</div>
      <div class="video-info">
        <div class="iconfont icon-bofang">{{ videoInfo.likeCount }}</div>
        <div class="iconfont icon-pinglun">{{ videoInfo.danmaku }}</div>
        <div class="iconfont icon-plume">{{ videoInfo.createTime }}</div>
      </div>
    </div>
  </div>

  <div class="video-body">
    <div class="video-left">
      <div class="video-panel" :style="{position: wideScreen?'absolute':'static'}">
        <Player ref="playerRef" @changeWideScreen="changeWideScreenHandler" ></Player>
        <div :style="wideScreen ? playerHeight  + 56 + 'px' : '0px'" class="action-panel">
            <VideoAction  class="Vaction"></VideoAction>
            <VideoSummary v-if="videoInfo!=null" style="width: 100%;"></VideoSummary>
            <VideoComment style="width: 100%;"></VideoComment>
        </div>
      </div>
      

    </div>
    <div class="video-right">
      <div class="video-panel" :style="wideScreen ? playerHeight  + 70 + 'px' : '0px'">
        
      </div>
      <div>
        
      </div>
    </div>
    
  </div>
</div>




</template>

<script setup>
import VideoComment from './VideoComment.vue';
import VideoSummary from './VideoSummary.vue';
import VideoAction from './VideoAction.vue';
import Player from '@/views/Home/components/Player.vue'
import TopHead from '@/views/Home/components/TopHead.vue';//顶部导航
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const info = reactive({
  type: 1,//视频
  userId: 0,
  toLikeId: 0,
})
const videoInfo = ref({});
const userInfo = ref({});
const vUrl = ref();

import { getVideoWritterMS } from '@/api/get/getHomeList';
const getVideoUserInfo = async()=>{
  // console.log("开始执行")
  let res = await getVideoWritterMS(videoInfo.value.userId);
  if(res.code==200){
    userInfo.value=res.data;
    vUrl.value = res.data.videoUrl;
    insertHistoryInfo();
  }
}


import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();
import { getVideoInfoById } from '@/api/get/getInfo';
const getVideoInfo = async()=>{
  // console.log("开始执行"+route.params.videoId)
  let res = await getVideoInfoById(route.params.videoId);
  if(res.code==200)
  {
    videoInfo.value = res.data;
    getVideoUserInfo();
    insertInfo(res.data.id);
  }
}

const wideScreen = ref(true);
const changeWideScreenHandler = (res)=>{
  wideScreen.value = res;
}


import { insertInit } from '@/api/get/getInfo';
const insertInfo = async(id)=>{
  info.toLikeId = id;
  info.userId = loginStore.userInfo.id;
  await insertInit(info)
}


const uid = ref({
  uid1:loginStore.userInfo.id,
  uid2:userInfo.value.id
});
import { createChat } from '@/api/chat';
const ChatUser = async()=>{
  //需要调用接口建立聊天组（如果不存在）
  //uid1=loginStore.userInfo.id,uid2=userInfo.id
  uid.value.uid2 = userInfo.value.id;
  await createChat(uid.value);
  router.push(`/chat/${userInfo.value.id}`);
}

import { InsertHistory } from '@/api/history';
const insertHistoryInfo = async()=>{
  const data = {
    authorId:userInfo.value.id,
    contentId:route.params.videoId,
    type:3,
    title:videoInfo.value.title,
    img:videoInfo.value.imageUrl,
    userId:loginStore.userInfo.id
  }
  await InsertHistory(data);
  console.log('添加进历史信息');
}

onMounted(()=>{
  getVideoInfo();
})
</script>

<style lang="scss" scoped>
.header-fixed{
    background: #fff;
    // margin: 0px auto;
    // min-height: calc(100vh);
    position: fixed;
    z-index: 9999;
    height:75px;
    width:100%;
    background: rgba(107, 110, 85, 0.993);
    top:0px;
}
.category-fixed{
      border-bottom: 1px solid #e0e0e0; /* 底部边框 */
      box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.1); /* 底部阴影 */
      border-radius: 8px; /* 圆角，可以调成你想要的程度 */
      margin-top: 20px;
    }


.video-detail{
  margin-top: 60px;
  min-height: calc(100vh - 64px);
  

  .video-header{
    padding-top: 20px;
    display: flex;

    .video-title{
      flex: 1; 
      justify-content: center;
      justify-items: center;
      .title{
        font-size: 22px;
      }

      .video-info{
        margin-top: 10px;
        display: flex;
        color: #9499a0;

        .iconfont{
          margin-right: 20px;
          font-size: 14px;

          &::before{
            font-size: 18px;
            margin-right: 3px;
          }
        }
      }
    }

    // .video-user-info{
    //   margin-left: 300px;

    //   // width: 410px;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;

    //   .user-info{
    //     flex: 1;
    //     margin-left: 10px;

    //     .nick-name{
    //       font-size: 16px;
    //       // text-overflow: ellipsis;
    //       text-overflow: clip;
    //       white-space: nowrap;
    //       overflow: hidden;
    //       color: var(--text);
    //       text-decoration: none;
    //     }

    //     .introduction{
    //       color: var(--text2);
    //       font-size: 13px;
    //       text-overflow: ellipsis;
    //       white-space: nowrap;
    //       overflow: hidden;
    //       margin: 3px 0px;
    //     }

    //     .op-btns{
    //       display: flex;

    //       .btn-go-home{
    //         margin-right: 10px;
    //         text-decoration: none;
    //         color: #fb7299;
    //         border: 1px solid #fb7299;
    //         line-height: 28px;
    //         border-radius: 5px;
    //         padding: 0px 20px;

    //         &:hover{
    //           background:#ffecf1;
    //         }
    //       }
    //       .focus-btn{
    //         flex: 1;
    //         width: 230px;

    //         .el-dropdowm{
    //           width: 100%;
    //         }
    //         .btn{
    //           width: 100%;
    //           .iconfont{
    //             margin-right: 5px;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
  .video-user-info{
      margin-left: 400px;

      // width: 410px;
      display: flex;
      align-items: center;
      justify-content: center;

      .user-info{
        flex: 1;
        margin-left: 10px;

        .nick-name{
          font-size: 16px;
          // text-overflow: ellipsis;
          text-overflow: clip;
          white-space: nowrap;
          overflow: hidden;
          color: var(--text);
          text-decoration: none;
        }

        .introduction{
          color: var(--text2);
          font-size: 13px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin: 3px 0px;
        }

        .op-btns{
          display: flex;

          .btn-go-home{
            margin-right: 10px;
            text-decoration: none;
            color: #fb7299;
            border: 1px solid #fb7299;
            line-height: 28px;
            border-radius: 5px;
            padding: 0px 20px;

            &:hover{
              background:#ffecf1;
            }
          }
          .focus-btn{
            flex: 1;
            width: 230px;

            .el-dropdowm{
              width: 100%;
            }
            .btn{
              width: 10%;
              .iconfont{
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  .video-body{
    // margin-top: 20px;
    position: relative;
    display: flex;

    .video-left{
      flex: 1;
    }
    .video-panel{
      position: static;
      width: 100%;
    }
    .video-right{
      margin-left: 30px;
      width: 410px;
      padding-bottom: 5px;
    }
  }
}

// .action-panel{
//   margin-left: 250px ;
// }
.Vaction{
  width: 100%;
}
</style>