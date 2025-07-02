import { createRouter, createWebHistory } from 'vue-router'
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
  history: createWebHistory(),
  routes
})

export default router
