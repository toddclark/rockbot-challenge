import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/app', redirect: '/' },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('@/views/Library.vue'),
    },
  ]
});

export default router;
