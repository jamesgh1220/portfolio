import { createApp } from 'vue'
import 'lenis/dist/lenis.css'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import { applyGsapDefaults } from './lib/gsapDefaults'

applyGsapDefaults()

const app = createApp(App)

app.use(router)

app.mount('#app')
