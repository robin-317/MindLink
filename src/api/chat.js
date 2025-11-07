import request from "@/api/request";

export const createChat = (data)=>{
  return request({
    url: "/chat/createChat",
    method: "post",
    data,
  });
}

export const getHistory=(id)=>{
  return request.get(`/chat/historyChat/${id}`)
}

export const getMessageList=(data)=>{
  return request({
    url: "/chat/getMessageList",
    method: "post",
    data,
  });
}

export const sendMessage=(data)=>{
  return request({
    url: "/chat/sendMessage",
    method: "post",
    data,
  });
}

//获取聊天对象的信息
export const OtherInfo = (id)=>{
  return request.get(`/chat/otherInfo/${id}`)
}