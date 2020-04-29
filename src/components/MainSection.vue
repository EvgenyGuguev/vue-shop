<template>
    <div class="main-section">
        <header-app />
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import Header from "./layouts/Header";
    import {mapGetters} from 'vuex';

    export default {
        name: "MainSection",
        components: {
            'header-app': Header
        },
        computed: {
            ...mapGetters([
               'CART'
            ]),
        },
    }
</script>

<style>
    .main-section {
        margin: 0 auto;
    }
</style>