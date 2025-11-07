import { defineStore } from "pinia";

const useNavAction = defineStore("navAction",{
  state:()=>{
    return{
      fixedHeader: true,//头部信息定位
      fixedCategory: true,//分类信息定位
      showHeader:true,//头部信息
      showCategory:true,//分类信息
      forceFixedHeader: false,//强制显示 固定头部信息
    }
  },
  actions:{
    setfixedHeader(fixedHeader){
      this.fixedHeader=fixedHeader;
    },
    setfixedCategory(fixedCategory){
      this.fixedCategory=fixedCategory;
    },
    setshowHeader(showHeader){
      this.showHeader=showHeader;
    },
    setshowCategory(showCategory){
      this.showCategory=showCategory;
    },
    setforceFixedHeader(forceFixedHeader){
      this.forceFixedHeader=forceFixedHeader;
    }
  }
})