import '@/assets/scss/base.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import ElementPlusX from 'vue-element-plus-x'
const app = createApp(App)
import 'element-plus/dist/index.css'
import '@/assets/icon/iconfont.css'
import VueCookies from 'vue-cookies'
import Dialog from './components/Dialog.vue'
import Cover from './components/Cover.vue'
import Avatar from './components/Avatar.vue'
import ShowItem from './components/ShowItem.vue'
import ShowTextItem from './components/ShowTextItem.vue'
import DataLoadMoreList from './components/DataLoadMoreList.vue'
import Footer from './components/Footer.vue'
import showProblem from '@/components/showProblem.vue'
import showUser from './components/showUser.vue'
import showHistory from './views/History/showHistory.vue'
import Verify from './utils/Verify'
import Request from '@/utils/Request'
import Message from '@/utils/Message'
import { Api } from './utils/Api'
import Utils from './utils/Utils'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import 'prismjs/components/prism-json';
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
// VMdPreview.use(createEmojiPlugin());
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
// VMdPreview.use(createCopyCodePlugin());
const pinia = createPinia();
pinia.use(piniaPersist)
app.use(pinia);
app.use(router)
app.use(VueMarkdownEditor);
app.use(VMdPreview)
app.use(ElementPlusX)
app.use(ElementPlus)
// app.use(VueParticles)
app.component("Dialog",Dialog)
app.component("Cover",Cover)
app.component("Avatar" ,Avatar)
app.component("ShowItem",ShowItem)
app.component("ShowTextItem",ShowTextItem)
app.component("DataLoadMoreList",DataLoadMoreList)
app.component("Footer",Footer)
app.component("showProblem",showProblem)
app.component("showUser",showUser)
app.component("showHistory",showHistory)
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.bodyMaxWidth = 2000;
app.config.globalProperties.bodyMinWidth= 1250;
app.config.globalProperties.Verify = Verify;
app.config.globalProperties.Request = Request;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Api = Api;
app.config.globalProperties.Utils = Utils;
app.config.globalProperties.imageThumbnailSuffix = "_thumbnail.jpg"
app.config.globalProperties.imageAccept= ".jpg,.jpeg,.png,.gif,.png,.bmp,.webp"
app.config.globalProperties.videoAccept= ".mp4,.avi,.wmv,.rm,.rmvb,.mkv,.flv,.mpg,.mpeg,.mov,.3gp,.ts,.m3u8,.m4v,.webm"
app.config.globalProperties.rowCategoryCount = 3 
app.config.globalProperties.bodyPadding = 150;
app.mount('#app')
