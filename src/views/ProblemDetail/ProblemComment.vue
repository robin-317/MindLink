//1
<template>
  <div class="comment-panel">
    <div class="comment-title">
      <div class="title">
        评论<span class="comment-count"></span>
      </div>
      <div
        :class="['order-type-item',orderType == 0 ? 'active':'']"
        @click="changeOrder(0)"
      >
        最热
      </div>
      <div style="width: 10px;"></div><span>|</span><div style="width: 10px;"></div>
      <div
        :class="['order-type-item',orderType == 1 ? 'active':'']"
        @click="changeOrder(1)"
      >
        最新
      </div>
    </div>



  </div>
  <div class="comments">
    <el-card>
      <!-- 编辑区
      		1. 左侧：显示当前登录用户头像
      		2. 中间：输入框，使用 v-model 收集用户输入的内容 comment
      		3. 右侧：在 handlePublish 方法中请求新增留言接口
       -->
      <div class="editbox">
        <div class="editbox-left">
          <el-avatar :size="45" :src="loginStore.userInfo.avatar" />
        </div>
        <div class="editbox-middle">
          <el-input
            placeholder="与其赞同别人的话语，不如自己畅所欲言..."
            v-model="comment"
          ></el-input>
        </div>
        <div class="editbox-right">
          <el-button @click="handlePublish(comment)">发布</el-button>
        </div>
      </div>

      <!-- 列表区
      		1. 遍历分页获取的留言列表，并设置唯一的 key 值
      		2. 顶级留言包括：头像、昵称、角色名标签、留言内容、发布时间
      		3. 点击 “回复” 会触发事件 handleReply，同时传入两个参数：当前被回复留言的根ID、当前被回复留言的直接父级ID
      			a. 这两个参数用于给【即将发布的留言】设置根ID与直接父级ID，做到 “回复框的定位” 
      			b. 对于二级留言，这两个值传入顶级留言本身的ID就行
       -->
      <div class="listbox" v-for="(item, index) in commentsList" :key="index">
        <!-- 顶级留言：这没什么好说的，就直接展示遍历的结果 -->
        <div class="top-level">
          <div class="listbox-top-user">
            <el-avatar :size="45" :src="item.userImg" />
            <p>
              <span>{{ item.roleName }}</span>
            </p>
          </div>
          <div class="listbox-middle-root">{{ item.comment }}</div>
          <div class="listbox-bottom">
            <span>发布时间：{{ item.createdAt }}</span>
            <span @click="handleReply(item.id, item.id)">回复</span>
          </div>
        </div>
         
         <!-- 子留言区
        		1. 这里没有使用在二级组件中引入三级以上组件的方式，因为当时开发的时候感觉传值有点麻烦
        		2. 使用两个子组件同级的形式
         
	         子留言：二级
	          		1. 判断顶层留言是否存在二级子留言，是则引入 SecondComment 子组件
	          		2. 父组件传递参数：二级评论 item.children
	          		3. 处理 “回复” 功能，使用同一个方法实现（handleReply），这里的根ID和直接父ID是子组件传过来的
	          		4. handle-reply 是子组件中声明需要抛出的事件，@handle-reply 代表监听子组件的自定义事件
         -->
        <div >
          <SecondComment
            :rootCommentId="item.id"
            @handle-reply="handleReply"
            style="margin-left: 0"
          />

          <!-- 子留言：三级
          		1. 因为使用的同级结构，所以需要先遍历每一个二级留言，判断其下是否存在子留言，是则引入 ChildComment 子组件。
          		2. 必须要遍历二级留言并设置唯一的 key ！！无法直接获取 item.children.children ！！！（原因有点忘了...）
          		3. 同样要给子组件传递参数：三级评论 child.children
          		4. 同时将二级留言的发表人昵称传递给子组件，用于非二级留言的子留言显示 “ @nickname ” 
          		5. 同样拥有 “回复” 功能，使用同一个方法实现（handleReply），这里的根ID和直接父ID是子组件传过来的
          		6. 子组件中声明的抛出事件（to-reply）不能与其他组件重复
           -->
          <!-- <template
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
          >
            <template v-if="child.children && child.children.length">
              <ChildComment
                :childComments="child.children"
                :parentName="child.createdBy"
                @to-reply="handleReply"
                style="margin-left: 65px"
              />
            </template>
          </template> -->
          <!-- <template>
              <ChildComment
                :rootId="item.id"
                @to-reply="handleReply"
                style="margin-left: 65px"
              />
          </template> -->
        </div>

        <!-- 回复框
        		1. 使用一个变量 showReply 来控制显示隐藏
        		2. 同时使用变量 showReplyIndex 用来确定是在哪条留言下显示回复框，否则点击 “回复” 会在所有留言下都出现回复框
        		3. 当 handleReply 方法被触发时，改变 showReply 和 showReplyIndex 的值
        		4. 使用 replyComment 收集回复框输入的内容，当触发 handlePublish 方法时作为参数传进去
         -->
        <div
          class="reply-box-container"
          v-show="showReplyIndex === item.id && showReply"
        >
          <div class="replybox" id="reply-box">
            <div class="replybox-left">
              <el-avatar :size="30" :src="loginStore.userInfo.avatar" />
            </div>
            <div class="replybox-middle">
              <el-input placeholder="回复" v-model="replyComment"></el-input>
            </div>
            <div class="replybox-right">
              <el-button @click="handlePublish(replyComment)">提交</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器：这也是一个单独的组件，此处不做深究，有机会会再出一篇封装分页组件的文章 -->
      <!-- <PageQuery
        :total="total"
        :pageNum="getCommentForm.pageNum"
        :pageSize="getCommentForm.pageSize"
        @page-size="handlePageSize"
        @page-num="handlePageNum"
      /> -->
      <el-pagination 
        background 
        layout="prev, pager, next" 
        :total="totalCount" 
        :page-size="24"
        :current-page="pagination.currentPage"
        @current-change="handleCurrentChange"/>
    </el-card>
  </div>
</template>

<script setup>
import SecondComment from "./SecondComment.vue";
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted, inject } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

// 收集 “编辑区” 的输入内容
const comment = ref("");
// 收集 “回复框” 的输入内容
const replyComment = ref("");
// 存储请求回来的数据总数
const totalCount = ref(0);
// 存储请求回来的留言列表
const commentsList = ref({});
// 控制回复框的索引
const showReplyIndex = ref(0);
// 控制回复框的显示隐藏
const showReply = ref(false);

// const passageInfo = ref({})
//获取文章信息
// import { getPassageInfoById } from '@/api/get/getPassageInfo';
// const getPassageInfo = async()=>{
//   // console.log("开始执行"+route.params.videoId)
//   let res = await getPassageInfoById(route.params.passageId);
//   if(res.code==200)
//   {
//     passageInfo.value = res.data;
//     getPassageUserInfo();
//     insertInfo(res.data.id);
//     markdownText.value = res.data.comment;
//   }
// }


const dataSource = ref({});
const loadingData = ref(false);
const orderType = ref(0);
const changeOrder=(type)=>{
  orderType.value = type;
  // loadCommentList();
}

import { loadTopTopComment } from "@/api/problem";



//分页组件
const pagination = ref({currentPage: 1, pageSize: 24, problemId: route.params.problemId});

//当前页码发生变化时触发
const handleCurrentChange = (page) => {
  pagination.value.currentPage = page
  queryPage()
}

//分页条件查询,获取顶层评论数据
const queryPage = async () => {
  const res = await loadTopTopComment(pagination.value);
  console.log("获取成功");
  console.log(res);
  if(res.code == 200){
    commentsList.value = res.data.results;
    totalCount.value = res.data.total;
    console.log("获取成功");
    console.log(res.data);
  }
}




// 请求当前主体的评论列表
const getCommentForm = reactive({
  size: 1,
  pageSize: 10,
  // ChildPageNum: 1,
  // ChildPageSize: 2,
  momentId: route.params.passageId,
});



/**
 * 显示 回复编辑框
 */
const handleReply = (rootCommentId, parentId) => {
  // 解决只在 当前点击项下 显示回复框
  showReplyIndex.value = rootCommentId;
  // 控制显示隐藏
  showReply.value = !showReply.value;

  const replyBox = document.querySelector(".reply-box-container");
  // 更新回复编辑框的属性，作为参数传给父组件
  // 这里使用到一个知识点：自定义属性
  // 因为需要实现绑定某回复框并使其含有rootCommentId和parentId，发送新增子留言请求时需要这两个参数
  replyBox.setAttribute("data-parent-comment-id", parentId);
  replyBox.setAttribute("data-root-comment-id", rootCommentId);
  // showReply.value = !showReply.value;
};

/**
 * 发布/回复 评论
 */
import { postAddCommentApi } from "@/api/problem";
const handlePublish = async (commen) => {
  // 封装请求体：数据从父组件来
  const params = {
    comment: commen,//评论内容
    rootCommentId: null,//根评论
    parentId: null,//父评论
    parentName:null,
    roleName:loginStore.userInfo.username,
    userImg:loginStore.userInfo.avatar,
    problemId:route.params.problemId,
  };
  // 子评论 添加属性
  const replyBox = document.querySelector(".reply-box-container");
  if (replyBox&&replyBox.getAttribute("data-root-comment-id")!=null) {
    // 获取根评论ID
    const rootCommentId = replyBox.getAttribute("data-root-comment-id");
    // 获取直接父评论ID
    const parentId = replyBox.getAttribute("data-parent-comment-id");

    params.rootCommentId = rootCommentId;
    params.parentId = parentId;

    const data={
      root:rootCommentId,
      parent:parentId,
      problemId:route.params.problemId,
    };
    replyBox.setAttribute("data-parent-comment-id", null);
    replyBox.setAttribute("data-root-comment-id", null);
    
    // const res = await getparentNameById(data);
    // params.parentName = res.data.userName
  }

  // 发送请求
  try {
    console.log(params);
    const res = await postAddCommentApi(params);
    if(res.code==200){
      queryPage();
    }
    // queryPage();
    comment.value='';
    replyComment.value = '';
    // 【问题】发布评论后，输入框中的值没有消失
  } catch (error) {
    console.log("🚀 ~ handlePublish ~ error:", error);
  }
};



onMounted(()=>{
  // getPassageInfo();
  queryPage();
})

</script>

<style lang="scss" scoped>
.comment-panel{
  margin-top: 20px;
  margin-bottom: 50px;
  .comment-title{
    margin-left: 25%;
    
    display: flex;
    align-items: center;
    font-size: 15px;
    .title{
      font-size: 20px;
      font-weight: 500;
      .comment-count{
        margin-left:5px;
        font-size:14px;
        margin-right:30px;
        color: var(--text2);
      }
    }
    .order-type-item{
      cursor: pointer;
    }
    .active{
      color: var(--blue);
    }
  }
  .comment-content-panel{
    padding-left: 10px;
    position: relative;
    .comment-list{
      padding-bottom: 20px;
    }
  }
}






// @import "@/assets/css/var.scss";
// 留言区
.comments {
  margin-top: 30px;
  margin-bottom: 100px;

  .el-card {
    width: 80%;
    margin: 20px auto;
  }

  .editbox,
  .listbox {
    margin: 0px 20px 20px 20px;
    display: flex;
  }

  // 编辑区
  .editbox {
    justify-content: space-between;
    align-items: center;
    .editbox-middle {
      width: 85%;
    }
  }

  // 列表展示区
  .listbox {
    flex-direction: column;
    border-bottom: 1px solid rgb(189, 187, 187);

    // 时间 + 回复
    .listbox-bottom {
      font-size: 12px;
      color: #9499a0;
      margin: 10px 0 10px 65px;
      display: flex;

      span {
        display: block;
        margin-right: 20px;
      }

       // 这里 color 换成普通颜色表示即可
      span:last-child:hover {
        cursor: pointer;
        color: rgba(231, 55, 55, 0.801);
      }
    }

    // 信息条
    .listbox-top-user {
      display: flex;

      // 个人信息
      p {
        margin-left: 20px;
        width: 100%;
        position: relative;

        span:first-child {
          color: rgb(136, 73, 73);
        }
        // 身份标签
        span:last-child {
          margin-left: 5px;
          font-size: 8px;
          padding: 2px;
          background-color: rgb(136, 73, 73);
          color: white;
          border-radius: 5px;
          position: absolute;
        }
      }
    }

    // 顶级评论
    .top-level {
      // 根评论内容
      .listbox-middle-root {
        margin-left: 65px;
      }
    }

    // 回复评论输入框
    .replybox {
      margin: 10px 0 20px 65px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 60%;

      .replybox-middle {
        width: 75%;
      }
    }

    // 展示更多
    .view-more {
      margin-left: 65px;
      font-size: 12px;
      color: #9499a0;
    }

    .view-more span:hover,
    .view-less span:hover {
      cursor: pointer;
      color: rgb(136, 73, 73);
    }

    // 展示更少
    .view-less {
      font-size: 12px;
      color: #9499a0;
      margin-left: 37px;
    }
  }
}
</style>