import request from "@/api/request";


//搜索视频
export const searchVideo = (searchInfo)=>{
  return request.get(`/search/video/${searchInfo}`)
}

//搜索文章
export const searchPassage = (searchInfo)=>{
  return request.get(`/search/passage/${searchInfo}`);
}

//搜索问题
export const searchProblem = (searchInfo) =>{
  return request.get(`/search/problem/${searchInfo}`);
}

//搜索用户
export const searchUser = (searchInfo)=>{
  return request.get(`/search/user/${searchInfo}`);
}
