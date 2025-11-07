import { ref } from "vue";
import request from "@/api/request";

//视频
export const VideoPost = (data) => {
  return request({
    url: "/post/postVideo",
    method: "post",
    data,
  });
};

//文章
export const PagePost = (data) => {
  return request({
    url: "/post/pagePost",
    method: "post",
    data,
  });
};


