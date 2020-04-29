export default {
    ADD_TO_CART({commit}, product) {
        commit('SET_CART', product);
    },
    PLUS_QUANTITY({commit}, index) {
        commit('PLUS', index);
    },
    DELETE_FROM_CART({commit}, index) {
        commit('REMOVE_FROM_CART', index);
    },
    MINUS_QUANTITY({commit}, index) {
        commit('MINUS', index);
    },
    SET_MOBILE({commit}) {
        commit('SWITCH_MOBILE');
    },
    SET_DESKTOP({commit}) {
        commit('SWITCH_DESKTOP');
    },
    GET_SEARCH_VALUE_TO_VUEX ({commit}, value) {
        commit('SET_SEARCH_VALUE_TO_VUEX', value);
    }
}