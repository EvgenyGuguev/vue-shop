import Vue from "vue";
import VueRouter from "vue-router";

import Catalog from "../components/catalog/Catalog";
import Cart from "../components/cart/Cart";
import MainPage from "../components/main-page/MainPage";

Vue.use(VueRouter);

let router = new VueRouter({
   mode: 'history',

   routes: [
        {
            path: '/',
            name: 'mainPaige',
            component: MainPage
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: Catalog
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            props: true,
        },
   ]
});

export default router;