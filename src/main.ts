import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router/index'
import { setupVant } from '@/plugins/vant'

const app = createApp(App)

setupRouter(app)
setupVant(app)

app.mount('#app')
