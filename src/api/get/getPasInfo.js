import { ref } from "vue";
import request from "@/api/request";



//进入视频详情页后初始化此用户的点赞收藏
export const insertInit = (info)=>{
  const data = {
    type:0,
    toLikeId:0,
    userId:0,
  };
  data.type = info.type;
  data.toLikeId = info.toLikeId;
  data.userId = info.userId;
  return request({
    url: "/initLike",
    method: "post",
    data
  });
}


//获取视频或文章是否被点赞和收藏
export const IsLikeStart = (info) => {
  const data = {
    type:0,
    toLikeId:0,
    userId:0,
  };
  data.type = info.type;
  data.toLikeId = info.toLikeId;
  data.userId = info.userId;
  return request({
    url: "/startLike",
    method: "post",
    data
  });
}

//文章点赞
export const toLike = (info)=>{
  const data ={
    userId:0,//点赞者的id
    toLikeId:0,//被点赞的对象的id
    type:0,//点赞对象的类型 0：文章 1：视频
  }
  data.type = info.type;
  data.toLikeId = info.toLikeId;
  data.userId = info.userId;
  return request({
    url: "/passage/toLike",
    method: "post",
    data
  });
}

//收藏
export const toStart = (info)=>{
  const data ={
    userId:0,//点赞者的id
    toLikeId:0,//被点赞的对象的id
    type:0,//点赞对象的类型 0：文章 1：视频
  }
  data.type = info.type;
  data.toLikeId = info.toLikeId;
  data.userId = info.userId;
  return request({
    url: "/passage/toStart",
    method: "post",
    data
  });
}


//获取顶层评论信息
export const loadTopTopComment =(info)=>{
  const data ={
    size:0,
    pageSize: 0,
    passageId: 0,
  }
  data.size = info.currentPage;
  data. pageSize = info. pageSize;
  data.passageId = info.passageId;
  return request({
    url: "/passage/loadTopTopComment",
    method: "post",
    data
  });
}

//获取儿子评论
export const loadChildComment = (info)=>{
  const data ={
    rootCommentId:0,
    parentId:0,
    passageId: 0,
  }
  data.rootCommentId = info.root
  data.parentId = info.parent;
  data.passageId = info.passageId;
  return request({
    url: "/passage/loadChildComment",
    method: "post",
    data
  });
}


export const postAddCommentApi = (data)=>{
  return request({
    url: "/passage/postAddComment",
    method: "post",
    data
  });
}