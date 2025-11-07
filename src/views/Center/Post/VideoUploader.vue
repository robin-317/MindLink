<template>
  <div v-show="!startUpload" class="uploader-start-panel">
    <VideoUploadStart @addFile="addFile"></VideoUploadStart>
  </div>
  <div v-if="startUpload">
    
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

import VideoUploadStart from "./VideoUploadStart.vue";
const startUpload = ref(false);

</script>

<style lang="scss" scoped>
.file-list{
  background: #f6f7f8;
  border-radius: 5px;
  margin: 0px 200px 0px 20px;
  .file-item{
    padding: 10px;
    display: flex;
    margin-bottom: 10px;
    .video-p{
      flex-shrink: 0;
      position: relative;
      width:44px;
      height: 40px;
      cursor: move;

      .icon-video{
        font-size:40px;
        color: #a6def1;
        padding: 0px;
      }

      .video-p-info{
        width:35px;
        line-height: 40px;
        text-align: center;
        color:#fff;
        top:0px;
        left: 0px;
        z-index: 1;
        position:absolute
      }
    }

    .video-info{
      flex:1;
      min-width: 0;
      padding-left: 10px;
    }

    .video-title{
      display: flex;
      align-items: center;
      width: 100%;

      .video-title{
        display: flex;
        align-items: center;
        width:100%;

        .upload-info{
          width: 100%;
          min-width: 0;
          flex: 1;

          .title{
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis0;
            white-space: nowrap;
            .title-show{
              line-height:24px;
              padding-left: 7px;
              font-size: 12px;
            }
          }

          .upload-status{
            margin-top: 5px;
            color: #999;
            font-size: 12px;
            .iconfont{
              font-size:12px;

              &::before{
                font-size: 16px;
                margin-right: 2px;
              }
            }
          }
        }

        .op{
          margin-left: 10px;
          display: flex;
          align-items: center;
          color: #909090;
          
          .item{
            margin-right: 10px;
            font-size: 13px;
          }

          .percent{
            width: 30px;
          }

          .iconfont{
            cursor: pointer;
            font-size: 20px;
            color: #909090;
          }
        }
      }

      .video-progress{
        margin-top: 5px;
      }
    }
  }
}

.add-video-btn{
  padding-left: 20px;
  margin-bottom: 10px;
}

</style>