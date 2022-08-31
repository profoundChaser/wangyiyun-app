import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//默认全局样式
import './assets/css/base.css'

createApp(App).use(store).use(router).mount('#app')
