<template>
  <div class="player-panel">
    <div class="player-style " ref="playerRef" :style="{height:playerHeight+'px'}"></div>
      <div class="danmu-panel">
        <div class="watcher">
          已装填{{ danmuCount }}条弹幕
        </div>
        <div id="danmu" v-show="showDanmu"></div>
        <div class="close-danmu" v-show="!showDanmu">已关闭弹幕</div>
      </div>
      <div id="play"><img src="@/assets/play.png" alt=""></div>
    
  </div>
</template>

<script setup>

import TopHead from '@/views/Home/components/TopHead.vue';//顶部导航
import { ref, reactive, getCurrentInstance, nextTick, watch, computed, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import Hls from 'hls.js';
import Artplayer from 'artplayer';
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku';
import { resolve } from '@kangc/v-md-editor';
let playerRef = ref();
let player = null;

const initPlayer = (Vurl) =>{
  // console.log(videoInfo)
  console.log("开始")
  console.log(Vurl);
  //隐藏右键菜单
  Artplayer.CONTEXTMENU = false;
  //自动回放功能的最小记录时长，单位为秒
  Artplayer.AUTO_PLAYBACK_MAX = 20;
  //自动会放功能的最小记录时长，单位为秒，默认为5
  Artplayer.AUTO_PLAYBACK_MIN = 10;
  player = new Artplayer({
    container: playerRef.value,
    url: Vurl,    // url:`${props.videoUrl}`,
    // url:videoSrc,
    // type:'m3u8',
    // customType:{
    //   m3u8:function(video,url,art){
    //     if(Hls.isSupported()){
    //       if(art.hls){
    //         art.hls.destroyed();
    //       }
    //       const hls = new Hls();
    //       hls.loadSource(url);
    //       hls.attachMedia(video);
    //       art.hls = hls;
    //       art.on('destroy',()=>hls.destroy())
    //     }else if(video.canPlayType('application/vnd.apple.mpegurlr')){
    //       video.src = url
    //     }else{
    //       art.notice.show = '浏览器不支持该播放器'
    //     }
    //   },
    // },
    theme:'#23ade5',//播放器主题颜色， 目前用于进度条 和 高亮元素上
    volume: 0.7,//播放器默认音量
    autoplay: true,//是否自动播放
    autoMini: true,//当播放器滚动到浏览器视口以外时，自动进入迷你播放模式
    fullscreen: true,//设置和获取播放器窗口全屏
    setting: true,


    volume: 0.5,
    muted: false,
    
    pip: true,//开启画中画
    autoSize: true,

    screenshot: false,//截图

    loop: true,
    flip: true,//是否显示视频翻转功能，会出现在设置面板和右键菜单里
    playbackRate: true,//是否显示视频播放速度功能，会出现 设置面板和右键菜单里面
    aspectRatio: true,//比例

    fullscreenWeb: true,
    subtitleOffset: true,
    miniProgressBar: true,//迷你进度条
    mutex: true,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,//自动回放
    airplay: true,

    lang: navigator.language.toLowerCase(),
    moreVideoAttr: {
        crossOrigin: 'anonymous',
    },
    //自定义图标
    icons:{
      state:document.querySelector('#play')
    },
    settings: [
        {
            width: 200,
            html: 'Subtitle',
            tooltip: 'Bilingual',
            icon: '<img width="22" height="22" src="/assets/img/subtitle.svg">',
            onSelect: function (item) {
                art.subtitle.switch(item.url, {
                    name: item.html,
                });
                return item.html;
            },
        },
        {
            html: 'Switcher',
            icon: '<img width="22" heigth="22" src="/assets/img/state.svg">',
            tooltip: 'OFF',
            switch: false,
            onSwitch: function (item) {
                item.tooltip = item.switch ? 'OFF' : 'ON';
                console.info('You clicked on the custom switch', item.switch);
                return !item.switch;
            },
        },
        {
            html: 'Slider',
            icon: '<img width="22" heigth="22" src="/assets/img/state.svg">',
            tooltip: '5x',
            range: [5, 1, 10, 0.1],
            onRange: function (item) {
                return item.range[0] + 'x';
            },
        },
    ],
    contextmenu: [
        {
            html: 'Custom menu',
            click: function (contextmenu) {
                console.info('You clicked on the custom menu');
                contextmenu.show = false;
            },
        },
    ],
    controls: [
        {
          name:'wide-screen',
          position:'right',
          html:'<span class="iconfont icon-coolFlow"></span>',
          tooltip:'宽屏模式',
          style:{
            color:'#fff',
            display:'flex',
          },
          click:function(...args){
            changeWideScreen()
          },
        },
        {
          name:'narrow-screen',
          position:'right',
          html:'<span class="iconfont icon-coolFlow"></span>',
          tooltip:'退出宽屏模式',
          style:{
            color:'#fff',
            display:'none',
          },
          click:function(...args){
            changeWideScreen()
          },
        }
    ],
    plugins: [
      artplayerPluginDanmuku({
        mount: document.querySelector('#danmu'),
        theme:'light',
        emitter:true,
        danmuku:function(){
          return new Promise(async (resolve)=>{
            //是否展示弹幕
            const danmuList = await loadDanmuList()
            return resolve(danmuList)
          })
        },
        beforeEmit: async(danmu)=>{
          let res = await postDanmu(danmu)
          //重新获取一下弹幕列表
          loadDanmuList()
          if(!res){
            return false;
          }

          //还有些逻辑处理

          return true;
        }
      })
    ],
  })

  player.on('hover',(state)=>{
    let display = 'none';
    if(state){
      display = 'flex';
    }
    player.template.$bottom.style.display = display
  })
  //视频播放完成
  player.on('video:ended',(e)=>{
    //视频播放完成

  })
}


onMounted(() => {
  getVideoInfo();
  // nextTick(() => {
  //   initPlayer();
  // });

  
});

const playerHeight = ref(600);
const showDanmu = ref(true);
const onlineCount = ref(0)

import { getDanmuInfoById } from '@/api/get/getInfo';
const fileId = ref();//视频id

const danmuCount = ref(0)
const loadDanmuList = async()=>{
  if(!fileId.value){
    return[]
  }
  let res = await getDanmuInfoById(route.params.videoId)
  if(res.code !=200){
    return;
  }
  danmuCount.value = res.data.length;
  return res.data.results;
}

const videoInfo = ref({});
import { getVideoInfoById } from '@/api/get/getInfo';
const getVideoInfo = async()=>{
  // console.log("开始执行"+route.params.videoId)
  let res = await getVideoInfoById(route.params.videoId);
  if(res.code==200)
  {
    videoInfo.value = res.data;
    nextTick(() => {
      initPlayer(videoInfo.value.videoUrl);
    });
  }
}




</script>

<style lang="scss" scoped>
.player-panel{
  .player-style{
    // width:100%;
    // .art-video{
    //   width:800px;
    // }
    :deep(.art-video-player .art-mask-show .art-state){
      //播放按钮
      position: absolute;
      right: 40px;
      bottom: 50px;

      .art-icon-state{
        width: 60%;
        height: 60%;
        img{
          width:100%;
        }
      }
    }

    //改变播放器的右侧操作按钮
    :deep(.art-controls-right){
      position: relative;
      display: block;
      width: 280px;
      .art-control{
        position: absolute;
      }
      //截屏
      .art-control-screenshot{
        left:0px;
      }
      //设置按钮
      .art-control-seeting{
        left: 46px;
      }
      //画中画
      .art-control-pip{
        left: 92px;
      }
      //宽屏
      .art-control-wide-screen
      .art-control-narrow-screen{
        left: 138px;
        .iconfont{
          font-size: 20px;
        }
      }
      //网页全屏按钮
      .art-control-fullscreenWeb{
        left: 184px;
      }

      //全屏按钮
      .art-control-fullscreen{
        left: 230px;
      }
    }
  }
  .danmu-panel{
    box-shadow: 0 2px 6px #ddd;
    height: 56px;
    border-top: none;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    width: 50%;
    align-content: center;
    justify-content: center;
    // margin: 0px 100px 0px 100px;
    margin-left: 25%;
    // margin-bottom: 50px;

    .watcher{
      width: 250px;
      color: var(--text2);
    }
    #danmu{
      flex: 1;
    }
    .close-danmu{
      flex: 1;
      color: var(--text2);
      text-align: center;
    }
  }

  :deep(.danmu-setting){
    background:none !important;
    padding: 0px;
    border: none;

    .inner-panel{
      width: 300px;
      height: 280px;
      position:relative;

      .inner{
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 99999;
        color: #fff;

      }
      .mask{
        position: absolute;
        top: 0px;
        right: 0px;
        left: 0px;
        bottom: 0px;
        background: #000;
        opacity: 0.6;
      }
    }
  }
}


</style>