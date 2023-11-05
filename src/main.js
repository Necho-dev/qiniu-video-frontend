import {createApp} from 'vue'
import App from './App.vue'
// 注册样式组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 注册字体文件
import './assets/font/font.css';
// 注册状态管理组件
import {createPinia} from 'pinia'
// 注册路由组件
import router from './router/index'

const app = createApp(App);
const pinia = createPinia();


app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')