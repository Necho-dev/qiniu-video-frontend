import {createApp} from 'vue'
import App from './App.vue'
// 注册Ant全局组件
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// 注册状态管理组件
import {createPinia} from 'pinia'

const app = createApp(App);
const pinia = createPinia();

app.use(Antd)
app.use(pinia)
app.mount('#app')
