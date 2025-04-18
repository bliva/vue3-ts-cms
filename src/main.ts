import 'normalize.css'
import './assets/css/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerIcons from './global/registerIcons'
import '@/mock'
const app = createApp(App)
app.use(router)
app.use(store)

app.use(registerIcons)
app.mount('#app')

console.log('hello world')
console.log('1111 world')
