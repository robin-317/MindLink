import { Stream } from "openai/streaming";

//deepseek配置文件
export const API_CONFIG = {
  baseURL:'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiKey:'sk-33aa61d20f4a46d5adfaf8ecb0ae06da',
  dangerouslyAllowBrowser:true,
};

//模型配置
export const MODEL_CONFIG={
  temperature: 0.6,
  max_tokens:8192,
  Stream:true,
}

//本地存储键名配置
export const STORAGE_KEY = {
  sessionList:'xueden_list',
  activeIndex: 'xueden_index'
}