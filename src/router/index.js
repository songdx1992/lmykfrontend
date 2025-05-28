import { createRouter, createWebHistory } from "vue-router";
import Layout from '../views/Layout.vue';
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import FixedCostsPage from '../views/FixedCostsPage.vue';


const routes = [
  { path: "/login", component: Login },
  { path: "/", 
    component: Layout,
    children: [
      { path: "dashboard", component: Dashboard },
      { path: "fixed-costs", component: FixedCostsPage }
    ]
  },
   { path: '/:pathMatch(.*)*', redirect: '/dashboard' } // fallback
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
