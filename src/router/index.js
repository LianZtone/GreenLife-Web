import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import BlogView from "../views/BlogView.vue";
import CommunityView from "../views/CommunityView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import CartView from "../views/CartView.vue";
import UserView from "../views/UserView.vue";
import AuthView from "../views/AuthView.vue";
import OrderView from "../views/OrderView.vue";
import FavoriteView from "../views/FavoriteView.vue";
import SettingsView from "../views/SettingsView.vue";
import { isAuthenticated } from "@/utils/auth";


const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/produk", name: "products", component: ProductsView },
  { path: "/artikel", name: "blog", component: BlogView },
  { path: "/komunitas", name: "community", component: CommunityView },
  { path: "/tentang", name: "about", component: AboutView },
  { path: "/kontak", name: "contact", component: ContactView },
  { path: "/keranjang", name: "cart", component: CartView, alias: "/addtochart", meta: { requiresAuth: true } },
  { path: "/profil", name: "profile", component: UserView, alias: "/userprofile", meta: { requiresAuth: true } },
  { path: "/auth", name: "auth", component: AuthView, alias: "/authview", meta: { guestOnly: true } },
  { path: "/pesanan", name: "orders", component: OrderView, meta: { requiresAuth: true } },
  { path: "/favorit", name: "favorites", component: FavoriteView, meta: { requiresAuth: true } },
  { path: "/pengaturan", name: "settings", component: SettingsView, meta: { requiresAuth: true } },

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return {
      path: "/auth",
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.guestOnly && isAuthenticated()) {
    return { path: "/" }
  }
})

export default router;
