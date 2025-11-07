import moment from "moment";

const getLocalImage = (image) =>{
  return new URL(`@/assets/${image}`,import.meta.url).href;
}

const getFileName = (filename) =>{
  if(!filename){
    return filename;
  }

  return filename.lastIndexOf(".") == -1 ? filename : filename.substring(0,filename.lastIndexOf("."));
}

const formData = (timestamp) => {
  const timestampTime = moment(timestamp);
  const days = Number.parseInt(moment().format("YYYYMMDD")) - Number.parseInt(timestampTime.format("YYYYMDD"));
  if(days == 0){
    return timestampTime.format("HH:mm");
  }else if(days == 1){
    return '昨天';
  }else if(days>=2&&days<7){
    return timestampTime.format("dddd")
  }else if(days>=7){
    return timestampTime.format("YYYY-MM-DD")
  }
};

export default{
  getLocalImage,
  getFileName,
  formData
}