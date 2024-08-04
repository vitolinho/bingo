import { createApp, ref } from 'vue'
import { createI18n } from 'vue-i18n'
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

const storedLanguage = ref(localStorage.getItem('language') || 'en')
console.log(storedLanguage.value)
const i18n = createI18n({
  locale: String(storedLanguage.value),
  fallbackLocale: 'en',
  messages: {
    en: {
      home: {
        play: 'Play',
        restart: 'Restart',
        quit: 'Quit',
      },
      navigation: {
        home: 'Home',
        generate: 'Generate'
      },
      generate: {
        title: 'Here you can generate your bingo trays !',
        label: 'Quantity',
        button: 'Download {quantity} Bingo trays'
      }
    },
    fr: {
      home: {
        play: 'Jouer',
        restart: 'Recommencer',
        quit: 'Quitter',
      },
      navigation: {
        home: 'Accueil',
        generate: 'Génerer'
      },
      generate: {
        title: 'Ici vous pouvez générer vos plateaux de bingo !',
        label: 'Quantité',
        button: 'Télécharger {quantity} plateaux de bingo'
      }
    }
  }
})

createApp(App).use(router).use(i18n).mount('#app')
