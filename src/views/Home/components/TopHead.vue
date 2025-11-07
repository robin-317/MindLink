<template>
  <div :class="['header-bar', 'header-bar-' + theme]">
    <div class="menu">
      <router-link class="iconfont icon-bingyuanshenlu" to="/home" style="color:#524e4e;"
        >三源知苑</router-link
      >
      <button @click="goToGame" class="gamebtn iconfont icon-listyule">娱乐</button>
      <img src="@/assets/img/npc3.png" alt="" style="width: 50px; margin-left: 20px;margin-bottom: 10px;">
      <router-link style="font-size:25px ;color: #2f3238;margin-bottom: 20px;white-space: nowrap;" to="/StuMatch">学谕</router-link>
    </div>
    <div class="search-body">
      <!-- <!- 输入框 -> -->
      <div class="search-panel" >
        <div class="search-panel-inner">
          <div class="input-panel">
            <input type="text" placeholder="搜索" v-model="searchInput" @keyup.enter="searchTo"/>
            <div class="iconfont icon-mubiaoguanli-icon" @click="searchTo" ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间 -->

    <div class="user-panel">
        <!-- 显示用户头像 -->
      <div class="user-avatar" @click="logins" >
        <template v-if="loginStore.userInfo.id!=null" >
          <!-- Object.keys(loginStore.userInfo).length>0 -->
            <router-link to="/ownHome"  @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
              <Avatar 
              class="avatar" 
              :avatar="loginStore.userInfo.avatar" 
              :userId="loginStore.userInfo.id" 
              :width=AvWidth
              :lazy="false"></Avatar>
            </router-link>
        </template>
        <template  v-else>
          <Avatar 
          class="avatar"  
          :width="38" 
          :lazy="false" 
          @Click="logins"></Avatar>
        </template>

          
      </div>

      <div class="user-panel-item" @click="navJump('/userChat')">
        <div class="iconfont icon-xinxi" ></div>
        <div style="color:#524e4e;">消息</div>
      </div>

      <div class="user-panel-item" @click="navJump('/ownHome/collection')">
        <div class="iconfont icon-shoucang-copy"></div>
        <div style="color:#524e4e;">收藏</div>
      </div>

      <div class="user-panel-item" @click="navJump('/history')">
        <div class="iconfont icon-lishi"></div>
        <div style="color:#524e4e;">历史</div>
      </div>

      <div class="user-panel-item" @click="navJump('/center/home')">
        <div class="iconfont icon-circle"></div>
        <div style="color:#524e4e;">管理</div>
      </div>

      <div class="btn-upload" @click="navJump('/center/post/postVideo')">
        <el-button type="primary"  size="large">
          <span class="iconfont icon-plume"></span>
          <span style="color:#524e4e;">发布</span>
        </el-button>
      </div>
    </div>
  </div>
</template>


<script setup>
// import login from "@/api/login/login";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

const searchInput = ref('');

const props = defineProps({
  theme: {
    type: String,
    default: "light",
  },
  // 是否是固钉导航栏
  isFixHeaderBar: {
    type: Boolean,
    default() {
      return false;
    },
  },
  // 是否显示搜索输入框
  isShowSearchInput: {
    type: Boolean,
    default() {
      return true;
    },
  },
});

const logins =()=>{
  if(loginStore.userInfo.id==0){
    loginStore.setLogin(true);
    return;
  }
  else{
    router.push('')
  }
}

const navJump = (url) =>{
  if(loginStore.userInfo.id==0){
    loginStore.setLogin(true);
    return;
  }
  // window.open(url,"_blank");//新的页面打开
  router.push(url);
}


const searchTo = () => {
  const text = searchInput.value.trim()
  if (text !== '') {
    // 跳转到名称为 SearchResults 的路由，并传递查询参数 q
    // router.push({ path: '/search', query: { keyword: searchInput.value.trim() } })
    router.push(`/search/${searchInput.value.trim()}`)

    // router.push( `/search/${searchInput.value.trim()}`);
  } else {
    console.warn('请输入搜索内容');
  }
}


const AvWidth = ref(48)

const onMouseEnter=()=> {
      AvWidth.value=88;
};

const  onMouseLeave=() =>{
      AvWidth.value=48;
}
const goToGame = () => {
  // sessionStorage.setItem('userInfo', JSON.stringify(result.data));
  // loginStore.saveUserInfo(result.data);
  router.push('/game').then(() => {
    window.location.reload()
  })
}
</script>
  
  <style lang="scss" scoped>
.header-bar {
  width: 100%;
  height: 62px;
  padding: 0px 25px;
  display: grid;
  
  grid-template-columns: 1fr 1fr 1fr; //三等分块
  .menu {
    display: flex;

    align-items: center;
    a {
      text-decoration: none;
    }
    .icon-bingyuanshenlu {
      font-size: 42px;
      white-space: nowrap;
      &::before {
        float: left;
        margin-top: -4px;
        font-size: 30px;
        // margin-right: 5px;
      }
    }
    .icon-listyule{
        white-space: nowrap;
        font-size: 25px;
        margin-left: 40px;
        margin-bottom: 20px;
        color: #2f3238;
      }
  }

  .search-body {
    color: #61666d;
    .search-panel {
      margin: 0px auto;
      position: relative;
      max-width: 80%;
      .search-panel-inner {
        width: 100%;
        position: absolute;
        top: 10px;
        left: 0px;
        border: 1px solid #e5e8eb;
        border-radius: 8px;
        overflow: hidden;
        z-index: 10000;
        .input-panel {
          width: 100%;
          display: flex;
          align-items: center;
          background: #f1f2f3;
          input {
            width: 100%;
            border: none;
            background: #f1f2f3;
            border-radius: 5px;
            padding: 8px 10px;
            margin: 3px 10px 3px 10px;
            &:focus {
              outline: none;
            }
          }
        }
        .iconfont {
          
          font-size: 15px;
          // margin-right: 5px;
          color: #2f3238;
          width: 35px;
          height: 30px;
          display: flex;
          align-content: center;
          justify-content: center;
          border-radius: 5px;
          cursor: pointer;
          &:hover {
            background: #ddd;
          }
        }
      }
    }
  }

  .user-panel {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    margin: 5px;
    .user-avatar {
      width: 50px;
      height: 50px;
      z-index: 100;
      img {
        width: 100%;
        border-radius: 50%;
      }

      margin-right: 30px;
    }
    .user-panel-item {
      text-align: center;
      cursor: pointer;
      padding: 0px 13px;
      .iconfont {
        text-align: center;
        font-size: 30px;
        font-weight: normal;
      }
    }
    .btn-upload {
      margin-left: 10px;
      margin-top: 10px;
      .el-button {
        background: #7c9ce1;
        border-color: #7c9ce1;
        border-radius: 8px;
        padding: 0px 20px;
        .iconfont {
          &::before {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
.header-bar-light {
  color: #fff;
  .menu-item {
    color: #fff;
  }
  a {
    color: #fff;
  }
}
.header-bar-dark {
  color: #464343;
  .menu-item {
    color: #464343;
  }
  a {
    color: #464343;
  }
}

.gamebtn{
  background-color: #47484b00;
  border: 0px ;
  
}
</style>