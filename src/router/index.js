import { createRouter, createWebHashHistory } from 'vue-router'
import MainApp from '@/components/MainApp.vue'
import Chat from '@/components/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'MainApp',
    component: MainApp
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
