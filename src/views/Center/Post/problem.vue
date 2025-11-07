<template>
  <div style="margin-left: 30px;">
    <div class="title-box">
      <label class="title">标题</label>
      <el-input
        v-model="page.title"
        style="width: 240px"
        size="large"
        placeholder="请输入标题"
    />
    </div>
    
    <div class="cover-box">
      
            <el-upload
              drag
              name="file"
              class="cover-uploader"
              action="/api/post/uploadTImg"
              :http-request="addFile"
              :on-success="CoverUploadSuccess"
              :accept="proxy.imageAccept"
              :before-upload="startUpload"
            >
            <div class="cover-box-text">
              <div class="iconfont icon-dangan"></div>
              <div>上传问题照片</div>
            </div>
            </el-upload>
    </div>
    <v-md-editor
    v-model="page.comment"
    :disabled-menus="[]"
    :toolbars="toolbars"
    @upload-image="handleUploadImage"
    height="500px"
    placeholder="问题详细描述"
  />
  <div class="post-btn">
    <el-button type="primary" @click="handleSubmit()" class="v-btn" >问题发布</el-button>
  </div>
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

const text = ref(``);
const page = ref({
  comment:``,//问题内容
  commentImg:"",//问题图片
  title:"",//标题
  userId:0//发帖人Id
})

const user = ref(null);
const handbook = ref();
const htmlCode = ref("");


import { problemPost } from "@/api/problem";
import axios from 'axios';


//封面上传成功获得封面地址
const CoverUploadSuccess=(response,uploadFile)=>{
  console.log('封面上传成功');
  page.value.commentImg = response.data
  console.log("上传了");
}


// 请求头：图片上传时需要登录权限
const handleUploadImage = async (event, insertImage, files) => {
  const formData = new FormData();
  formData.append('file', files[0]);

  try {
    const response = await axios.post('/api/post/pageImgPost', formData);

    const imageUrl = response.data.data.url; // 根据后端返回格式修改此处
    // console.log('图片上传成功，URL:', imageUrl);
    insertImage({
      url: imageUrl,
      desc: '上传图片',
    });
  } catch (error) {
    console.error('上传失败:', error);
  }
};


//提交内容调用接口传后端存储
const handleSubmit = async()=>{
  if(loginStore.userInfo.id==0){
    alert('请先登录');
    return;
  }
  if(!page.value.comment){
    alert('请输入问题内容');
    return;
  }
  if(!page.value.title){
    alert('请输入问题标题');
    return;
  }
  //调用接口，完成上传
  page.value.userId = loginStore.userInfo.id;
  let result = await problemPost(page.value);
  if(result.code==200){
    console.log('问题发布成功');
    page.value = {
      comment:``,//问题内容
      commentImg:"",//问题图片
      title:"",//标题
      userId:0//发帖人Id
    };
  }else{
    console.log('问题发布失败');
  }

}
</script>

<style lang="scss" scoped>
.uploader-start-panel{
  margin: 20px 200px;
}

.title-box{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .title{
    width: 100px;
    font-size: 35px;
    font-weight: 450;
  }
  .title-inp{
    flex: 1;
  }
}

.cover-box{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 2px dashed #ccc;
  :deep(.el-upload-dragger){
      border: none;
  };
}
.cover-box-text{
    align-items: center;
    cursor: pointer;

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