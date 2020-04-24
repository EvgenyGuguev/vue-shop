import Vue from 'vue';
import Vuex from 'vuex';

import commonActions from "./actions/actions";
import apiRequests from "./actions/apiRequests";
const actions = {...commonActions, ...apiRequests};

import getters from "./getters/getters";
import mutations from "./mutations/mutations";


Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cart: [],
        isMobile: false,
        isDesktop: true,
    },
    mutations,
    actions,
    getters,
});

export default store;