import { createApp } from 'vue'
import './style.css'
import 'animate.css';
import App from './App.vue'
import router from './router'
import VueTyped from 'vue3-typed-js';

createApp(App).use(router).use(VueTyped).mount('#app')