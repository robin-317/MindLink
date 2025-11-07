<template>
  
  <!-- 最外层的大盒子 -->
  <div class="bigBox" id="logins" ref="loginsRef">
    <div class="box" ref="box">
      <!-- 滑动盒子 -->
      <div class="pre-box">
        <h1>学海无涯</h1>
        <p>WHELCOM TO ！</p>
        <div class="img-box">
          <img src="@/assets/img/waoku.jpg" alt="" id="avatar" class="logo2" ref="avatarRef"/>
        </div>
      </div>

      <!-- 注册盒子 -->
      <div class="register-form">
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>注册</h1>
        </div>
        <!-- 输入框盒子 -->
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="rules"
          label-with="5px"
        >
          <el-form-item prop="username" label=" ">
            <el-input
              type="text"
              placeholder="用户名"
              :suffix-icon="User"
              v-model="registerForm.username"
            />
          </el-form-item>
          <el-form-item prop="password" label=" ">
            <el-input
              type="password"
              placeholder="密码"
              :suffix-icon="Lock"
              v-model="registerForm.password"
            />
          </el-form-item>
          <el-form-item prop="confirmPassword" label=" ">
            <el-input
              type="password"
              placeholder="确认密码"
              :suffix-icon="Lock"
              v-model="registerForm.confirmPassword"
            />
          </el-form-item>
        </el-form>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <button @click="mySwitch(false)">注册</button>
        </div>
      </div>

      <!-- 登录盒子 -->
      <div class="login-form">
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>登录</h1>
        </div>
        <!-- 输入框盒子 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          label-with="5px"
        >
          <el-form-item prop="username" label=" ">
            <el-input
              type="text"
              placeholder="用户名"
              :suffix-icon="User"
              v-model="loginForm.username"
            />
          </el-form-item>
          <el-form-item prop="password" label=" ">
            <el-input
              type="password"
              placeholder="密码"
              :suffix-icon="Lock"
              v-model="loginForm.password"
            />
          </el-form-item>
        </el-form>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <button @click="login()" class="loginbtn">登录</button>
          <!-- 绑定点击事件 -->
          <p @click="mySwitch(true)">没有账号?去注册</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Lock, User } from "@element-plus/icons-vue";
import { reactive, ref , onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { el } from "element-plus/es/locales.mjs";


const loginForm = reactive({
  username: "",
  password: "",
});

const registerForm = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});

const avatarRef = ref(null);
const mySwitch = (flag) => {
  const pre_box = document.querySelector(".pre-box");
  // const img = avatarRef.value;
  if(registerForm.password!==registerForm.confirmPassword){
    registerForm.password = '';
    registerForm.confirmPassword='';
    alert("密码输入不一致，请重新输入！")
    return;
  }

  if (flag==true) {
    pre_box.style.transform = "translateX(100%)";
    pre_box.style.backgroundColor = "#c9e0ed";
  } else {
   
    pre_box.style.transform = "translateX(0%)";
    pre_box.style.backgroundColor = "#edd4dc";
    register();
  }
};

const loginFormRef = ref("");
const registerFormRef = ref();
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 10, message: "长度应该在2~10个字符之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, message: "长度应该大于5", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
    { min: 5, message: "长度应该大于5", trigger: "blur" },
  ],
});

//自定义确认密码的校验函数
const rePasswordvalid=(rule,value,callback)=>{
  if(value == null || value==''){
    return callback(new Error('请再次确认密码'))
  }
  if(registerForm.confirmPassword!=value){
    return callback(new Error('两次输入的密码不一致'))
  }
}


const router = useRouter();

import { registerService ,userLoginService,getToken} from "@/api/user";
const register = async()=>{
  let result = await registerService(registerForm);
  if(registerForm.username == ''){
    alert('请输入账户！');
    return;
  }else if(registerForm.password == '' || registerForm.confirmPassword == ''){
    alert("请输入密码");
    return;
  }
  if(result.code==200){
    ElMessage.success("注册成功")
    router.push('/login')
  }else{
    ElMessage.error("注册失败")
  }
  ClearRegisterData();
}
const ClearRegisterData=()=>{
  registerForm.value={
    username: "",
    password: "",
    confirmPassword: ""
  }
}

// const tokenStore = useTokenStore();

import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

const Token = async()=>{
  let result = await getToken(loginForm);
  if(result.code == 200){
    loginStore.saveUserInfo(result.data);
    router.push('/home');
  }
}

const login = async()=>{
  //调用接口，完成登录
  let result = await userLoginService(loginForm)
  ElMessage.success(result.msg?result.msg:'登录成功')
  if(result.code==200){
    //登录成功
    // data=result.data;
    // loginStore.saveUserInfo(result.data);
    // localStorage.setItem('userInfo',JSON.stringify(result.data));
    // console.log(loginStore.userInfo)
    // sessionStorage.setItem('userInfo', JSON.stringify(result.data));
    //Token();

    //补回来
    localStorage.setItem('loginUser', JSON.stringify(result.data))
    Token();

    // loginStore.saveUserInfo(result.data);
    // router.push('/home');


    

  }else{
    router.push('/login')
  }
}


</script>

<style scoped>
/* 去除input的轮廓 */
input {
  outline: none;
}

.bigBox {
  /* 溢出隐藏 */
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  background-image: url("@/assets/img/1.png");
  background-size: cover;
}

/* 最外层的大盒子 */
.box {
  overflow-x: hidden;
  display: flex;
  /* 渐变方向从左到右 */
  /* background: linear-gradient(to right, rgb(247, 209, 215), rgb(191, 227, 241)); */
  opacity: 90%;

  width: 1050px;
  height: 600px;
  display: flex;
  /* 相对定位 */
  position: relative;
  z-index: 2;
  margin: auto;
  /* 设置圆角 */
  border-radius: 8px;
  /* 设置边框 */
  border: 1px solid rgba(255, 255, 255, 0.6);
  /* 设置盒子阴影 */
  box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
}

/* 滑动的盒子 */
.pre-box {
  /* 宽度为大盒子的一半 */
  width: 50%;
  height: 100%;
  /* 绝对定位 */
  position: absolute;
  /* 距离大盒子左侧为0 */
  left: 0;
  /* 距离大盒子顶部为0 */
  top: 0;
  z-index: 99;
  border-radius: 4px;
  background-color: #edd4dc;
  box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
  /* 动画过渡，先加速再减速 */
  transition: 0.5s ease-in-out;
}

/* 滑动盒子的标题 */
.pre-box h1 {
  margin-top: 150px;
  text-align: center;
  /* 文字间距 */
  letter-spacing: 5px;
  color: white;
  /* 禁止选中 */
  user-select: none;
  /* 文字阴影 */
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 滑动盒子的文字 */
.pre-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  /* 禁止选中 */
  user-select: none;
  font-weight: bold;
  color: white;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片盒子 */
.img-box {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  /* 设置为圆形 */
  border-radius: 50%;
  /* 设置用户禁止选中 */
  user-select: none;
  overflow: hidden;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片 */
.img-box img {
  width: 100%;
  transition: 0.5s;
}

/* 登录和注册盒子 */
.login-form,
.register-form {
  flex: 1;
  height: 100%;
}

/* 标题盒子 */
.title-box {
  height: 300px;
  line-height: 500px;
}

/* 标题 */
.title-box h1 {
  text-align: center;
  color: white;
  /* 禁止选中 */
  user-select: none;
  letter-spacing: 5px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 输入框盒子 */
.el-form {
  display: flex;
  /* 纵向布局 */
  flex-direction: column;
  /* 水平居中 */
  align-items: center;
}
.el-form-item {
  width: 65%;
}
/* 输入框 */
input {
  /* width: 60%; */
  height: 40px;
  margin-bottom: 20px;
  text-indent: 10px;
  border: 1px solid #fff;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 120px;
  /* 增加磨砂质感 */
  backdrop-filter: blur(10px);
}

input:focus {
  /* 光标颜色 */
  color: #b0cfe9;
}

/* 聚焦时隐藏文字 */
input:focus::placeholder {
  opacity: 0;
}

/* 按钮盒子 */
.btn-box {
  display: flex;
  justify-content: center;
}

/* 按钮 */
button {
  width: 100px;
  height: 30px;
  margin: 0 7px;
  line-height: 30px;
  border: none;
  border-radius: 4px;
  background-color: #69b3f0;
  color: white;
}

/* 按钮悬停时 */
button:hover {
  /* 鼠标小手 */
  cursor: pointer;
  /* 透明度 */
  opacity: 0.8;
}

/* 按钮文字 */
.btn-box p {
  height: 30px;
  line-height: 30px;
  /* 禁止选中 */
  user-select: none;
  font-size: 14px;
  color: white;
}

.btn-box p:hover {
  cursor: pointer;
  border-bottom: 1px solid white;
}
.logo2 {
  margin: 5px 5px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 12px rgba(255, 255, 255, 0.9);
  transition: all 1s;
  /*box-shadow: 0px 0px 10px #ffffff;*/
}

.logo2:hover {
  transform: rotate(360deg);
  box-shadow: 0px 0px 50px rgba(255, 255, 255, 1);

  transition: all 1s;
  /*box-shadow: 0px 0px 10px #ffffff;*/
}
</style>
