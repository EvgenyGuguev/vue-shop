import Vue from "vue";
import VueRouter from "vue-router";

import Catalog from "../components/catalog/Catalog";
import Cart from "../components/cart/Cart";

Vue.use(VueRouter);

let router = new VueRouter({
   mode: 'history',

   routes: [
        {
            path: '/',
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