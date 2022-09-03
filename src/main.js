import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//默认全局样式
import './assets/css/base.css'
//引入图标
import './assets/fonts/font.css'
//引入vant和样式
// import './plugins'
import getVant from './plugins'
import 'vant/lib/index.css'

const app = createApp(App)
getVant(app)
app.use(store).use(router).mount('#app')
