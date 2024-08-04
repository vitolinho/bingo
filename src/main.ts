import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'

import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import GenerateBingoTray from './pages/GenerateBingoTray.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/generate-bingo-tray', component: GenerateBingoTray },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
