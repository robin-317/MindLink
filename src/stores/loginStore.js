import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { info } from 'sass'

const useLoginStore = defineStore('loginState', {
  state:()=>{
    return {
      showLogin: false,
      userInfo:{
      },
    }
  },
  actions: {
    setLogin(show){
      this.showLogin = show
    },
    saveUserInfo(info){
      this.userInfo = info
    }
  },
  // ✅ 添加持久化配置
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'loginState',
        storage: sessionStorage, // 或 localStorage（你想永久保留的话）
      }
    ]
  }
})
export {
  useLoginStore
}
