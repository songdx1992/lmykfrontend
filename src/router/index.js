import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import FixedCosts from '../src/components/FixedCosts.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/fixed-costs', component: FixedCosts }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
