import { createRouter, createWebHistory } from "vue-router";
import Layout from '../views/Layout.vue';
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import FixedCostsPage from '../views/FixedCostsPage.vue';
import ProductsView  from '../views/Products.vue';


const routes = [
    // 默认跳转到登录页
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/", 
    component: Layout,
    children: [
      { path: "dashboard", component: Dashboard },
      { path: "fixed-costs", component: FixedCostsPage },
      { path: "addproducts", component: ProductsView }
    ]
  },
   // fallback: 任意未匹配路径跳转登录
   { path: '/:pathMatch(.*)*', redirect: '/login' } // fallback
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
