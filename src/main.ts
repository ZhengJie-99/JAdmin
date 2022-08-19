import { createApp } from 'vue'
import './styles/main.less'
import './styles/theme.less'
import 'virtual:windi.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@purge-icons/generated'

// 避免样式冲突
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)


createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')