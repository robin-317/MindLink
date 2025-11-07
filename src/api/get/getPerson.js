import { ref } from "vue";
import request from "@/api/request";

//获取用户文章展示的数据
export const getPassage = (id)=>{
  return request.get(`/user/getAllPassageList/${id}`);
}

//获取用户视频展示的数据
export const getVideo = (id)=>{
  return request.get(`/user/getAllVideoList/${id}`);
}

//获取用户问题展示的数据
export const getProblem = (id)=>{
  return request.get(`/user/getAllProblemList/${id}`);
}

//获取用户的收藏
export const getStarStar = (data)=>{
  const id = data.userId;
  if(data.type==1){//文章
    return request.get(`/user/getPassageStarList/${id}`);
  }
  if(data.type==2){//视频
    return request.get(`/user/getVideoStarList/${id}`);
  }
  if(data.type==3){//问题
    return request.get(`/user/getProblemStarList/${id}`);
  }
}