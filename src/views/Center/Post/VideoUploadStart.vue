<template>
  <div class="uploader-start-panel">
    <div style="font-size: 30px;">视频发布</div>
    <el-upload 
      class="uploader-start"
      drag
      name="file"
      :show-file-list="true"
      :http-request="addFile"
      :before-upload="startUpload"
      :accept="proxy.videoAccept"
      :on-success="VedioUploadSuccess"
      action="/api/post/uploadVideo"
    >
      <div class="upload-handler">
        <div class="iconfont icon-sands"></div>
        <div class="info">拖拽可上传</div>
        <div class="upload-btn">上传视频</div>
      </div>
    </el-upload>
  </div>
  <div class="upload-explain">
    <el-popover placement="top-end" :width="400" trigger="hover">
      <template #reference>
        <div class="item">视频大小</div>
      </template>
      <div>
        <p>上传视频大小上限为100MB</p>
        <p>过长或过大视频建议拆分后使用分p或合集功能进行发布~</p>
      </div>
    </el-popover>

    <el-popover placement="top-end" :width="420" trigger="hover">
      <template #reference>
        <div class="item">视频格式</div>
      </template>
      <div>
        <p>推荐上传视频格式为：mp4</p>
        <p>其它允许上传的格式：mp4,avi,rmvb,mkv,mov</p>
      </div>
    </el-popover>

    <el-popover placement="top-end" :width="350" trigger="hover">
      <template #reference>
        <div class="item">视频码率</div>
      </template>
      <div>
        <p>分辨率最大支持 8192*4320</p>
      </div>
    </el-popover>
  </div>
  <el-divider>
      <el-icon>*****</el-icon>
  </el-divider>
  <div style="font-size: 30px;margin-bottom: 25px;margin: 20px 200px;">编辑信息</div>
  <div class="uploader-edit-panel">
    <div class="upload-edit">
      <el-form :gutter="20">
        <el-row > 
          <el-form-item>
            <label class="iconfont icon-dangan mb-2 block">封面</label>
            <el-upload
              drag
              class="cover-uploader"
              action="/api/post/uploadVImg"
              list-type="picture-card"
              limit="1"
              :on-success="CoverUploadSuccess"
              :show-file-list="true"
              :http-request="addFile"
              :accept="proxy.imageAccept"
            >
              <el-icon><Plus />封面上传</el-icon>
            </el-upload>
          </el-form-item>
        </el-row>

        <el-row :gutter="20">
          <el-form-item>
            <label class="font-medium mb-2 block">标题</label>
            <el-input v-model="form.title" maxlength="80" show-word-limit placeholder="请输入视频标题" />
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <label class="font-medium mb-2 block">简介</label>
            <el-input
              type="textarea"
              v-model="form.description"
              :rows="5"
              maxlength="2000"
              show-word-limit
              placeholder="填写更全面的相关信息，让更多人能找到你的视频吧"
              class="description"
            />
            
          </el-form-item>
        </el-row>

        <!-- <el-row :gutter="20">
          <el-form-item class="post-btn">
            <el-button type="primary" @click="handleSubmit" class="post-btn">发布视频</el-button>
          </el-form-item>
        </el-row> -->
      </el-form>
      
    </div>
  </div>
  <div class="post-btn">
    <el-button type="primary" @click="handleSubmit()" class="v-btn" >发布视频</el-button>
  </div>
  <!-- <el-button type="primary" @click="handleSubmit" class="post-btn">发布视频</el-button> -->
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
// import {mitter} from "@/eventbus/eventBus.js";

import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();
import {VideoPost} from "@/api/post/posts";



//传递给后端的表单数据
const form = ref({
  videoUrl:'',//视频地址
  imageUrl:'',//封面地址
  title: '',//标题
  userId: 0,//标签
  description: '',//简介
})

//视频上传成功获得视频地址
const VedioUploadSuccess=(response,uploadFile)=>{
  console.log('视频上传成功');
  // employee.value.image = response.data
  form.value.videoUrl = response.data
}

//封面上传成功获得封面地址
const CoverUploadSuccess=(response,uploadFile)=>{
  console.log('封面上传成功');
  form.value.imageUrl = response.data
}
 
//提交内容调用接口传后端存储
const handleSubmit = async()=>{
  if(loginStore.userInfo.id==0){
    alert('请先登录');
    return;
  }
  // if(!form.value.videoUrl){
  //   alert('请上传视频');
  //   return;
  // }
  //调用接口，完成登录
  form.value.userId = loginStore.userInfo.id;
  let result = await VideoPost(form.value)
  if(result.code==200){
    console.log('视频发布成功');
    form.value = {
      videoUrl:'',//视频地址
      imageUrl:'',//封面地址
      title: '',//标题
      userId: 0,//标签
      description: '',//简介
    };
    router.push("/center/post")
  }else{
    console.log('视频发布失败');
  }
}


</script>

<style lang="scss"  scoped>
.uploader-start-panel{
  margin: 20px 200px;

  .uploader-start{
    border: 2px dashed #ccc;
    :deep(.el-upload-dragger){
      border: none;
    }
    height: 200px;//自定义高度
    .upload-handel{

      align-items: center;
      color:#999;
      padding: 50px 0px;
      .icon-sands{
        font-size: 30px;
      }
      .info{
        margin: 20px 0px;

      }
      .upload-btn{
        color: #fff;
        margin: 20px auto;
        width:200px;
        height: 44px;
        cursor: pointer;
        background: #00a1d6;
        border-radius: 4px;
        transition: background-color 0.3s ease;
        text-align: center;
        line-height: 40px;
        &:hover{
          opacity: 0.8;
        }
      }
    }
  }
  .upload-explain{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .item{
      color:var(--text3);
      padding: 0px 20px;
      cursor: pointer;
    }
   
  }
}

.uploader-edit-panel{
  margin: 20px 200px;
  border: #00a1d6 1px solid;
  
  .upload-edit{
    margin-left: 35px;
    .mb-2{
      width:100%
    }
  }
}

.description{
  width: 200px;
}
.post-btn{

  margin-top: 20px;
  margin: 20px 200px;
  display: flex;
  justify-content: center;
  .v-btn{
    align-items: center;
    text-align: center;
    margin-bottom: 66px;
  }
}

</style>