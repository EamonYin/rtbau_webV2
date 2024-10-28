import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'https://hello.xiaomign100.club/api/' //通过nginx反向代理转将https为http请求
// axios.defaults.baseURL = 'http://localhost:8090/practice'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'


const app = createApp(App);
app.use(store).use(router).use(ElementPlus).use(less).use(VueAxios,axios).mount('#app')
app.config.globalProperties.$axios = axios;

