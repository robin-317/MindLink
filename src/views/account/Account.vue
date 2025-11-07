<template>
  <Dialog
    :show="loginStore.showLogin"
    :buttons="dialogConfig.buttons"
    width="900px"
    :showCancel="false"
    @close="dialogConfig.show=false">

    
    <div class="dialog-panel">
    <div class="bg">
      <img src="@/assets/img/waoku.jpg" alt="">
    </div>
    <el-form
      class="login-register"
      :model="formData"
      :rules="rules"
      ref="formDataRef"
      @submit.prevent
    >
        <div class="tab-panel">
          <div :class="[opType == 1 ? 'active' : '']" @click="showPanel(1)">登录</div>
          <el-divider direction="vertical"></el-divider>


          <div :class="[opType == 0 ? 'active' : '']" @click="showPanel(0)">注册</div>
        </div>

        <!-- input输入 -->
        <el-form-item  prop="username" v-if="onType == 1">
          <el-input
            clearable
            placeholder="输入账户名"
            v-model.trim="formData.username"
            >
              <template #prefix>
                <span class="iconfont icon-dangan"></span>
              </template>
          </el-input>
        </el-form-item>

        <el-form-item  prop="password" v-if="onType == 1">
          <el-input
            show-password
            placeholder="请输入密码"
            v-model.trim="formData.password"
            >
              <template #prefix>
                <span class="iconfont icon-tubiaozhizuomoban"></span>
              </template>
          </el-input>
        </el-form-item>

        <div v-if="onType == 0">
          <el-form-item  prop="nickname">
          <el-input
            clearable
            placeholder="输入账户名"
            v-model.trim="formData.nickname"
            >
              <template #prefix>
                <span class="iconfont icon-dangan"></span>
              </template>
          </el-input>
          </el-form-item>
          
          <el-form-item  prop="registerPassword">
          <el-input
            show-password
            placeholder="请输入密码"
            v-model.trim="formData.registerPassword"
            >
              <template #prefix>
                <span class="iconfont icon-tubiaozhizuomoban"></span>
              </template>
          </el-input>
          </el-form-item>

          <el-form-item  prop="reRegisterPassword">
          <el-input
            show-password
            placeholder="请再次输入密码"
            v-model.trim="formData.reRegisterPassword"
            >
              <template #prefix>
                <span class="iconfont icon-tubiaozhizuomoban"></span>
              </template>
          </el-input>
          </el-form-item>

        </div>

        <el-form-item label="" prop="">
          <el-button type="primary"  class="login-btn" size="large" v-if="onType==0" @click="register">
            <span>注册</span>
          </el-button>
          <el-button type="primary" class="login-btn" size="large" v-if="onType==1" @click="login">
            <span>登录</span>
          </el-button>
        </el-form-item>
    </el-form>
  </div>
  </Dialog>
</template>

<script setup>
import { validator } from "artplayer";
import { buttonEmits } from "element-plus";
import {ref, reactive, getCurrentInstance,nextTick, onMounted} from "vue"
const {proxy} = getCurrentInstance();
import { useRoute ,useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const dialogConfig = ref({
  buttons:[],
});

import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

const formData = ref({
  username:"",
  password:"",
  nickname:"",
  registerPassword:"",
  reRegisterPassword:""
});
const formDataRef = ref();

const checkRePassword = (rule,value,callback) =>{
  if(value != formData.value.registerPassword){
    callback(new Error(rule.message));
  }else{
    callback();
  }
}
const rules = {
  password : [{required: true, message: "请输入密码"}],
  username : [{required: true, message: "请输入账户名"}],
  nickname : [{required: true, message: "请输入账户名"}],
  registerPassword : [
    {required: true, message: "请输入密码"},
    {validator: proxy.Verify.password,
      message: "密码只能是数字，字母，特殊符号 8-18位",
    },
  ],

  reRegisterPassword : [
    {required: true, message: "请再次输入密码"},
    {validator: proxy.Verify.password,
      message: "两次密码输入不一致",
    },
  ],
};

const onType = ref(1);

const showPanel = (type) =>{
  onType.value = type;
  if(loginStore.showLogin){
    resetForm();
  }
  
};

const resetForm = ()=>{
  nextTick(()=>{
    formDataRef.value.resetFields();
    formData.value ={};
  });
}

import md5 from "js-md5";
import { registerService ,userLoginService} from "@/api/user";
const login = async()=>{
  //调用接口，完成登录
  let result = await userLoginService(formData)
  console.log(`${formData.username}和${formData.password}`)
  if(result.code==200){
    //登录成功
    const data = {
      // userID:0,
      // username:"",
      // userImg:"",
      // userSignature:""
    };
    // data=result.data;
    proxy.Message.success("登录成功")
    loginStore.saveUserInfo(result.data);
    // console.log(loginStore.userInfo)
    
  }else{
    return
  }
  
}

const register = async()=>{
  formData.username=formData.nickname;
  formData.password=formData.registerPassword;
  let result = await registerService(formData);
  if(result.code==200){
    alert("注册成功")
    showPanel(1);
  }else{
    alert("注册失败")
  }
  

}
// const doSubmit =()=>{
//   if(onType.value==1){//登录

//   }else{//注册

//   }
//           //注册,登录账户
//   // formDataRef.value.validate(async (valid) =>{
//   //   if(!valid){
//   //     return;
//   //   }
//   //   let params ={};
//   //   Object.assign(params, formData.value);
//   //   if(onType.value==1){
//   //     params.password = md5(params.password)
//   //   }
//   //   let result = await proxy.Request({
//   //     url:opType==0?proxy.Api.register:proxy.Api.login,
//   //     params,
//   //   });
//   //   if(!result){
//   //     return;
//   //   }

//   //   if(opType.value==0){
//   //     proxy.Message.success("注册成功,请登录");
//   //     showPanel(1);
//   //   }else if(onType.value==1){
//   //     proxy.Message.success("登录成功")
//   //     loginStore.saveUserInfo(result.data);
//   //   }
//   // });
// };




onMounted(()=>{
  showPanel(1)
})
</script>

<style lang="scss" scoped> 
.dialog-panel{
  display: flex;
  align-items: center;
  justify-content: space-around;
  .bg{
    width:700px;

    height: 580px;
    overflow: hidden;
    img{
      width:100%;
    }
  }
  .login-register{
    width:100%;
    .tab-panel{
      margin: 10px auto;
      display: flex;
      width: 130px;
      font-size: 18px;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      .active{
        color: var(--blue2);
      }
    }
    .no-account{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .login-btn{
      width: 100%;

    }
    .bottom-btn{
      margin-bottom: 0px;

    }
  }
}

.check-code-panel{
  display: flex;
  align-items: center;
  width: 100%;
  .input{
    flex: 1;
  }
  .right-panel{
    margin-left: 5px;
    cursor: pointer;
  }
}

</style>