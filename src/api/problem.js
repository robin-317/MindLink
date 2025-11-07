import { ref } from "vue";
import request from "@/api/request";

//发布问题
export const problemPost =(data)=>{
  return request({
    url: "/post/problemPost",
    method: "post",
    data,
  });
}


//获取问题发布人的信息
export const getProblemWritterMS =(id)=>{
  return request.get(`/problemWriter/${id}`)
}

//分页查询问题
//分页查询
export const getPaginationList =(Pagination)=>{
  const data ={
    page: 0, //当前页
    pageSize: 0, //每一页数量
  };
  data.page = Pagination.currentPage;
  data.pageSize = Pagination.pageSize;
  return request({
    url: "/problem/pagination",
    method: "post",
    data
  });
}

//进入问题详情页后初始化此用户的点赞收藏
export const insertInit = (info)=>{
  const data = {
    type:2,//问题
    toLikeId:0,//问题id
    userId:0,//浏览者id
  };
  data.toLikeId = info.toLikeId;
  data.userId = info.userId;
  return request({
    url: "/initLike",
    method: "post",
    data
  });
}

//根据id获取问题贴的详情
export const getProblemInfoById =(id)=>{
  return request.get(`/getProblemInfo/${id}`)
}


//问题点赞
export const toLike = (info)=>{
  const data ={
    userId:0,//点赞者的id
    toLikeId:0,//被点赞的对象的id
  }
  data.toLikeId = info.toLikeId;
  data.userId = info.userId;
  return request({
    url: "/problem/toLike",
    method: "post",
    data
  });
}

//收藏
export const toStar = (info)=>{
  const data ={
    userId:0,//点赞者的id
    toLikeId:0,//被点赞的对象的id
  }
  data.toLikeId = info.toLikeId;
  data.userId = info.userId;
  return request({
    url: "/problem/toStar",
    method: "post",
    data
  });
}

//获取顶层评论信息
export const loadTopTopComment =(info)=>{
  const data ={
    size:0,
    pageSize: 0,
    problemId: 0,
  }
  data.size = info.currentPage;
  data. pageSize = info. pageSize;
  data.problemId = info.problemId;
  return request({
    url: "/problem/loadTopTopComment",
    method: "post",
    data
  });
}

//发布评论
export const postAddCommentApi = (data)=>{
  return request({
    url: "/problem/postAddComment",
    method: "post",
    data
  });
}

//获取儿子评论
export const loadChildComment = (info)=>{
  const data ={
    rootCommentId:0,
    parentId:0,
    problemId: 0,
  }
  data.rootCommentId = info.root
  data.parentId = info.parent;
  data.problemId = info.problemId;
  return request({
    url: "/problem/loadChildComment",
    method: "post",
    data
  });
}

//问题已解决
export const consoled =(data)=>{
  return request({
    url: "/problem/console",
    method: "post",
    data
  });
}
