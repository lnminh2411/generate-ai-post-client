import { createRouter, createWebHistory } from 'vue-router';
import ContentCreate from './components/ContentCreate.vue'
import AdminPage from './components/AdminPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import LoginPage from './components/LoginPage.vue'

const routes = [
  { path: '/', component: ContentCreate },
  {
    path: '/admin', component: AdminPage,
  },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
