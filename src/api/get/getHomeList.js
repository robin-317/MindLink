import { ref } from "vue";
import request from "@/api/request";

//获取热门文章
export const hostTextList = () =>{
  return request.get('/home/getHostTextList');
}


//获取热门视频
export const hostVideoLst =()=>{
  return request.get('/home/getVideoList');
}


//获取视频发布者的信息
export const getVideoWritterMS =(id)=>{
  const data ={
    userId:0,
  };
  data.userId = id;
  return request({
    url: "/video/WritterMS",
    method: "post",
    data
  });
}



//获取文章发布者的信息
export const getPassageWritterMS = (id)=>{
  const data ={
    userId:0,
  };
  data.userId = id;
  return request({
    url: "/passage/WritterMS",
    method: "post",
    data
  });
}


//获取首页文章展示的数据
export const getAllPassage = ()=>{
  return request.get('/home/getAllPassageList');
}

//获取首页视频展示的数据
export const getAllVideo = ()=>{
  return request.get('/home/getAllVideoList');
}

//获取首页问题展示的数据
export const getAllProblem = ()=>{
  return request.get('/home/getAllProblemList');
}

//分页查询
export const getPaginationList =(Pagination)=>{
  //1：视频  2：文章  3：问题
  const data ={
    type: 0,
    page: 0,
    pageSize: 0,
  };
  data.type = Pagination.type;
  data.page = Pagination.currentPage;
  data.pageSize = Pagination.pageSize;
  return request({
    url: "/pagination",
    method: "post",
    data
  });
}

//搜索
export const SearchInfo = (describe)=>{
  return request.get(`/search/${describe}`)
}