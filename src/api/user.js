import { ref } from "vue";
import request from "./request";

//注册
// export const registerService = (registerData)=>{
//   // var params = new URLSearchParams()
//   // for(let key in registerData){
//   //   params.append(key,registerData[key])
//   // }
//   return request.post('/user/register',registerData)
// }
export const registerService = (registerData) => {
  const data = {
    username:"toms",
    password:"123456"
  }
  data.username=registerData.username;
  data.password=registerData.password;
  return request({
    url:"/user/register",
    method:"post",
    data
  })
};

export const userLoginService = (login) => {
  const data = {
    username:"toms",
    password:"123456"
  }
  data.username=login.username;
  data.password=login.password;
  return request({
    url:"/user/login",
    method:"post",
    data
  })
};


//获取用户详细信息
export const userInfoService = (id)=>{
  return request.get(`/user/${id}`)
};


//获取列表信息
export const CategoryList = ()=>{
  return request.get("/loadCategory");
};


//修改用户信息
export const exchangeUserInfo = (id,data)=>{
  return request({
    url:`/user/changeInfo/${id}`,
    headers:{
      isToken:true
    },
    method:"put",
    data
  })
}

//修改标签
export const exchangeSignInfo = (id,data)=>{
  return request({
    url:`/user/changeSignature/${id}`,
    headers:{
      isToken:true
    },
    method:"put",
    data
  })
}

// 获取token
export const getToken = (login)=>{
  const data = {
    username:"jack",
    password:"123456"
  }
  data.username=login.username;
  data.password=login.password;
  return request({
    url:"/user/token",
    headers:{
      isToken:true
    },
    method:"post",
    data
  })
}