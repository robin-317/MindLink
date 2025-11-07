import request from "./request";

//点击进作品后，存入历史记录
export const InsertHistory = (data)=>{
  return request({
    url: "/history/insert",
    method: "post",
    data,
  });
}

//获取历史记录
export const getHistoryTodayVInfo = (id)=>{

    return request.get(`/history/getInfoTodayVideo/${id}`);
}
export const getHistoryTodayTInfo = (id)=>{

    return request.get(`/history/getInfoTodayPassage/${id}`);

}
export const getHistoryTodayPInfo = (id)=>{

    return request.get(`/history/getInfoTodayProblem/${id}`);
}
