<template>

  <div class="total-panel">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="用户名" class="user" size="30px">
        <el-input v-model="form.name" style="width: 300px;"/>
      </el-form-item>
      <el-form-item label="密码" style="margin-bottom: 30px;">
        <el-input v-model="form.passwords" type="password" />
      </el-form-item>
      <el-form-item label="Activity form" style="margin-bottom: 30px;">
        <el-input v-model="form.signature" type="textarea" />
      </el-form-item>
      <span style="font-size: 30px;">头像</span>
      <div class="bo" style="margin-bottom: 30px;">
        <el-upload
        class="avatar-uploader"
        action="/api/userAvatar"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>

    </el-form>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="disSubmit">Cancel</el-button>
    </el-form-item>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

// do not use same name with ref
const form = reactive({
  name: '',
  passwords:'',
  signature:'',
  avatar:''
})

const onSubmit = () => {
  changeInfo();
}
const disSubmit =  () =>{
  form.name='';
  form.avatar='';
  form.passwords='';
  form.signature='';
}

import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import { OtherInfo } from "@/api/chat";
const newInfo = async()=>{
  let res = await OtherInfo(loginStore.userInfo.id);
  if(res.code==200){
    sessionStorage.setItem('userInfo', JSON.stringify(res.data));
  }
}

// 上传成功的回调函数
const handleAvatarSuccess = (response, uploadFile) => {
  // 这里返回的是文件对象，可以通过 raw 属性获取到实际的文件数据
  form.avatar = URL.createObjectURL(uploadFile.raw)
  ElMessage.success('上传成功!')
}
import { exchangeUserInfo } from "@/api/user";
const changeInfo = async()=>{
  // let res = await exchangeUserInfo(loginStore.userInfo.id, form);
  if(res.code==200){
    newInfo();
  }
}
</script>

<style lang="scss" scoped>

.total-panel {
  position: relative;
  overflow: hidden; /* 防止背景层溢出 */
  z-index: 1;
  /* 你原本的样式 */
  background: none; /* 移除原来的背景图片 */
  margin-left: 120px;
  padding-left: 50px;
  margin-top: 10px;
  margin-right: 15px;
  border-left: 2px solid rgb(223, 150, 150);
  border-radius: 50px;
  display: flex;
  width: 100%;
  height: 920px;
  box-shadow: -8px 0 15px -4px rgba(0, 0, 0, 0.4);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 让组件中心点对准屏幕中心 */
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* 可选的美化样式 */
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.total-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("@/assets/img/粉背景.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.3; /* 控制透明度 */
  z-index: -1;
  filter: blur(4px); /* 可选，给背景图加点模糊效果 */
}

.avatar-uploader .el-upload {
  border: 1px solid #2e2a2a;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.bo{
  border: 2px solid red;
}


/* 表单卡片样式 */
.form-card {
  margin-bottom: 24px;
  padding: 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.form-card:hover {
  border: 1px solid #66afe9;
  box-shadow: 0 0 20px rgba(102, 175, 233, 0.6);
}

/* 放大 input */
.el-form-item {
  font-size: 18px;
}
.el-input__inner,
.el-textarea__inner {
  height: 48px;
  font-size: 16px;
}


.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-uploader-icon {
  font-size: 32px;
  color: #409eff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* 提交按钮区域 */
.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.user{
  font-size: 50px;
  margin-bottom: 25px;
}
</style>