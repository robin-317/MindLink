<template>
  <div class="container">
    <!-- Main Title -->
    <div class="title">
      娱乐中心
    </div>
    

    <!-- Game Boxes -->
    <div class="game-boxes">
      <div class="game-box"  >
        <button class=" iconfont icon-shouye" @click="goToGame(1)"><p>贪吃蛇</p></button>
      </div>
      <div class="game-box"  >
        <button class=" iconfont icon-shouye" @click="goToGame(1)"><p>贪吃蛇</p></button>
      </div>
      <div class="game-box"  >
        <button class=" iconfont icon-shouye" @click="goToGame(1)"><p>贪吃蛇</p></button>
      </div>
    </div>
    <div class="floating-component">
      <el-button @click="goBack" class="toHome iconfont icon-shouye">返回大厅</el-button>
    </div>
  </div>
</template>

<script>
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

// import { useRouter } from 'vue-router'

// const goToGame = (index) => {
//   if(index==1){
//     router.push('/game/snack')
//   }
  
// }
export default {
  data() {
    return {
      games: [
        { name: '贪吃蛇' ,url:'/game/snack'},
        { name: '游戏2' },
        { name: '游戏3' }
      ],
      userAvatar: loginStore.userInfo.avatar  // 用户头像链接，可以替换为真实的链接
    };
  },
  methods: {
    goBack() {
      // 跳转回大厅主页面
      this.$router.push('/home'); // 确保你已经设置了路由
    },
    goToGame(index){
      if(index==1){
        this.$router.push('/game/snack').then(() => {
    window.location.reload() // 👈 刷新当前新跳转的页面
  }); 
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
}

.title {
  font-size: 88px;
  font-weight: bold;
  color: #ff4e50;
  background: linear-gradient(90deg, rgba(255, 0, 150, 1) 0%, rgba(0, 204, 255, 1) 100%);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 166px;
  text-align: center;
  animation: glow 1.5s ease-in-out infinite;
}

@keyframes glow {
  0% { text-shadow: 0 0 10px #ff4e50, 0 0 20px #ff4e50, 0 0 30px #ff4e50; }
  50% { text-shadow: 0 0 40px #ff4e50, 0 0 50px #ff4e50, 0 0 70px #ff4e50; }
  100% { text-shadow: 0 0 10px #ff4e50, 0 0 20px #ff4e50, 0 0 30px #ff4e50; }
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.back-btn {
  background-color: #ff4e50;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #e03d3d;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.game-boxes {
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.game-box {
  width: 30%;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  border: 2px solid #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}

.game-box:hover {
  border-color: #ff4e50;
  box-shadow: 0 0 15px rgba(255, 78, 80, 0.7);
  transform: scale(1.05);
}

.game-box p {
  font-size: 20px;
}

/* Floating Component */
.floating-component {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(193, 228, 67, 0.164);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.topHead{
  margin-top: 50px;
  margin-left: 35px;
  .toHome{
    font-size: 52px;

  }
}
</style>
