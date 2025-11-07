import { ref } from "vue";
import request from "@/api/request";




//获取文章，视频，问题的总数量
export const totalCountInfo=(id)=>{

  return request.get(`/center/totalCount/${id}`)

}

//分页查询用户个人投稿
export const getPaginationList =(Pagination)=>{
  //1：视频  2：文章  3：问题
  const data ={
    type: 0,
    page: 0,
    pageSize: 0,
    userId:0,
  };
  data.type = Pagination.type;
  data.page = Pagination.currentPage;
  data.pageSize = Pagination.pageSize;
  data.userId = Pagination.userId;
  return request({
    url: "/center/pagination",
    method: "post",
    data
  });
}

//获取用户收藏的数量
export const starCount =(id)=>{
  return request.get(`/center/starCount/${id}`);
}

//获取用户发布的问题解决和为解决的数量
export const consoleCount =(id)=>{
  return request.get(`/center/consoleCount/${id}`);
}