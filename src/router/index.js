import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',          // 默认路径
      redirect: '/login'  // 重定向到登录页面
    },
    {
      path: '/login',     // 登录页面的路径
      name: 'Login',
      component: () => import('@/views/login/ToLogin.vue'),   // 登录组件
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home/ToHome.vue'),
      redirect: '/home/index',
      children:[
        {
          path:'/home/problems',
          name:'Problems',
          component: () => import('@/views/Home/components/Problems.vue'),
        },
        {
          path:'/home/passages',
          name:'Passages',
          component: () => import('@/views/Home/components/passages.vue'),
        },
        {
          path:'/home/videos',
          name:'Videos',
          component: () => import('@/views/Home/components/videos.vue'),
        },
        {
          path:'/home/index',
          name:"index",
          component:() =>import('@/views/Home/index.vue')
        }
      ]
    },
    {
      path:"/center",
      name:"Center",
      redirect:"/center/home",
      component: ()=>import('@/views/Center/UcLayout.vue'),
      children:[
        {
        path:'/center/home',
        name:"用户中心首页",
        component: ()=>import('@/views/Center/Home.vue'),
      },
      {
        path:'/center/post',
        name:"投稿编辑",
        component: ()=>import('@/views/Center/Post/Post.vue'),
        children:[
          {
            path:'/center/post/postVideo',
            name:'视频发布',
            component:()=>import('@/views/Center/Post/Video.vue')
          },
          {
            path:'/center/post/editVideo',
            name:'编辑视频',
            component:()=>import('@/views/Center/Post/Video.vue')
          },
          {
            path:'/center/post/postText',
            name:'文本发布',
            component:()=>import('@/views/Center/Post/Text.vue')
          },
          {
            path:'/center/post/editText',
            name:'编辑文本',
            component:()=>import('@/views/Center/Post/Text.vue')
          },
          {
            path:'/center/post/postProblem',
            name:'发布问题',
            component:()=>import('@/views/Center/Post/problem.vue')
          }
        ]
      },
      {
        path:'/center/content',
        name:'稿件管理',
        
        children:[
          {
            path:'/center/postWork',
            name:'作品列表',
            component:()=> import('@/views/Center/workList.vue'),
          }
        ]
      },
      {
        path:'/center/comment',
        name:'图标测试',
        component:()=>import('@/views/Center/Post/test.vue')
      }
    ]
    },
    {
      path:'/to/test',
      name:'测试',
      component:()=>import('@/views/test.vue')
    },
    {
      path:'/StuMatch',
      name:'智能大模型',
      component:()=>import('@/views/StuMatch/index.vue')

    },
    {
      path:'/video/:videoId',
      name:'视频详情',
      component:()=>import('@/views/VideoDetail/videoDetail.vue'),
    },
    {
      path:'/passage/:passageId',
      name:'文章详情',
      component:()=>import('@/views/PassageDetail/passageDetail.vue')
    },
    {
      path:'/problem/:problemId',
      name:'问题详情',
      component:()=>import('@/views/ProblemDetail/problemDetail.vue')
    },
    {
      path:'/search/:keyWord',
      name: '搜索',
      component:()=>import('@/views/Search/index.vue'),
      // redirect: (to) => `/search/video/${to.params.keyWord}`,
      // redirect:'/search/video/:keyWord',
      children:[
        {
          path:'/search/video/:keyWord',
          name:'搜索视频',
          component:()=>import('@/views/Search/video.vue')
        },
        {
          path:'/search/user/:keyWord',
          name:'搜索用户',
          component:()=>import('@/views/Search/user.vue')
        },
        {
          path:'/search/problem/:keyWord',
          name:'搜索问题',
          component:()=>import('@/views/Search/problem.vue')
        },
        {
          path:'/search/passage/:keyWord',
          name:'搜索文章',
          component:()=>import('@/views/Search/passage.vue')
        }
      ]
    },
    {
      path:'/user/:userId',
      name:'用户中心',
      component:()=>import('@/views/Personal/personal.vue'),
      // redirect:"/user/post/:userId",
      children:[
        {
          path:'post',
          name:'投稿历史',
          component:()=>import('@/views/Personal/HistoryPost.vue')
        }
      ]
    },
    {
      path:'/ownHome',
      name:'用户个人中心',
      component:()=>import('@/views/Personal/OwnOne/index.vue'),
      redirect:"/ownHome/home",
      children:[
        {
          path:'/ownHome/home',
          name:'主页',
          component:()=>import('@/views/Personal/OwnOne/userHome.vue')
        },
        {
          path:'/ownHome/passage',
          name:'文章',
          component:()=>import('@/views/Personal/OwnOne/userPassage.vue')
        },
        {
          path:'/ownHome/video',
          name:'视频',
          component:()=>import('@/views/Personal/OwnOne/userVideo.vue')
        },
        {
          path:'/ownHome/problem',
          name:'问题',
          component:()=>import('@/views/Personal/OwnOne/userProblem.vue')
        },
        {
          path:'/ownHome/start',
          name:'收藏',
          component:()=>import('@/views/Personal/OwnOne/userStar.vue')
        },
        {
          path:'/ownHome/info',
          name:'个人信息',
          component:()=>import('@/views/Personal/OwnOne/userInfo.vue')
        },
        {
          path:'/ownHome/collection',
          name:'collection',
          component:()=>import('@/views/Personal/OwnOne/userStar.vue')
        }
      ]
    },
    // {
    //   path:'/game',
    //   name:'娱乐中心',
    //   component:()=>import('@/views/Game/index.vue'),
    // },
    {
      path:'/game',
      name:'贪吃蛇',
      component:()=>import('@/views/Game/snack.vue')
    },
    {
      path:'/userChat',
      name:'聊天',
      component:()=>import('@/views/Chat/index.vue'),
      children:[
        {
          path:'/userChat/:uid2',
          name:'聊天详情页',
          component:()=>import('@/views/Chat/ChatMessage.vue')
        }
      ]
    },
    {
      path:'/chat/:uid2',
      name:'临时聊天',
      component:()=>import('@/views/Chat/NewMessagePage.vue')
    },
    {
      path:'/history',
      name:'历史记录',
      component:()=>import('@/views/History/index.vue'),
      redirect:'/history/video',
      children:[
        {
          path:'/history/video',
          name:'视频历史',
          component:()=>import('@/views/History/video.vue')
        },
        {
          path:'/history/passage',
          name:'文章历史',
          component:()=>import('@/views/History/passage.vue')
        },
        {
          path:'/history/problem',
          name:'问题历史',
          component:()=>import('@/views/History/problem.vue')
        }
      ]
    },

  ],
})
router.beforeEach((to, from, next) => {
  console.log('beforeEach:', to.name, from.name); // 调试输出
  
  // 获取登录状态（假设登录状态保存在 localStorage 中）
  let loginUser = JSON.parse(localStorage.getItem('loginUser'));
  
  // 如果未登录，并且目标路由不是登录页，跳转到登录页
  if (!loginUser && to.name !== 'Login') {
    console.log('用户未登录，跳转到登录页');
    next({ name: 'Login' });  // 跳转到 Login 页面
  } else {
    next();  // 如果已登录或目标页面是登录页，继续路由跳转
  }
});


export default router
