<template >
  <div :class="['header-bar', 'header-bar-' + theme]">
    <el-row class="row-bg" justify="space-around">
      <el-col :span="6">
        <div class="category ">
          <el-popover
            width="400"
            trigger="hover"
            offset="5"
            class="category-item "
            >
            <template #reference>
              <router-link class="category-btn iconfont icon-wenti" to="/home/problems" >疑难社</router-link>
            </template>

          </el-popover>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="category ">
          <el-popover
            width="400"
            trigger="hover"
            offset="5"
            class="category-item "
            >
            <template #reference>
              <router-link class="category-btn iconfont icon-mubiaoguanli-icon" to="/home/passages" >知文阁</router-link>
            </template>

          </el-popover>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="category ">
          <el-popover
            width="400"
            trigger="hover"
            offset="5"
            class="category-item "
            >
            <template #reference>
              <router-link class="category-btn iconfont icon-shipin1" to="/home/videos" >视学斋</router-link>
            </template>

          </el-popover>
        </div>
      </el-col>


    </el-row>
  </div>

</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, watch, computed } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useCategoryStore } from "@/stores/CategoryStore";
const categoryStore = useCategoryStore();

const catalogs =['文坛','阅文','乐学'];

const props = defineProps({
  theme: {
    type: String,
    default: "dark",
  },
})
</script>

<style lang="scss" scoped>
.header-bar {
  width: 100%;
  height: 65px;
  padding: 0px 25px;
  display: grid;
  // grid-template-columns: 1fr 1fr 1fr; 
  position: relative;
  // background: rgba(188, 117, 221, 0.062);


}
.header-bar-light {
  // background: rgba(188, 117, 221, 0.062);
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

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
  align-items: center;
}
.el-col {
  border-radius: 4px;
  align-items: center;
  position: relative;
  align-content: center;
  border: 1px solid #927d37c5;
  background-color: #4b48483a;
  border-radius: 13px;
}


.category{
  align-items: center;
  display: flex;
  justify-content: center;
  
  border-radius: 13px;
  height: 50px;

  .category-btn{
    text-decoration: none;
    justify-content: center;

    border-radius: 10px;
    

  }
  font-size: 30px;
  .category-item{
    &:hover {
    transform: scale(1.05); /* 稍微放大一点 */
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 
                0 0 40px rgba(199, 105, 223, 0.61); /* 发亮光效 */
    border: 1px solid rgba(255, 255, 255, 0.6); /* 发光边框 */
  }
  }

}

.child{
  border: 1px solid #5a56569a;
  background-color: #46434342;
  margin: 2px;
  font-size: 20px;
  justify-content:space-between;
  text-decoration: none;
  width: 50px;
  margin-left: 10px;
}

.iconfont{
  font-size: 30px;
  
}


</style>


