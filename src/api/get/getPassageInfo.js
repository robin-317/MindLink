import { ref } from "vue";
import request from "@/api/request";

//依据视频id获取文章信息
export const getPassageInfoById = (id)=>{
  return request.get(`/getPassageInfo/${id}`)
}

//进入文章详情页后初始化此用户的点赞收藏
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