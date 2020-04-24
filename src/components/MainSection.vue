<template>
    <div class="main-section">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "MainSection",
        computed: {
            ...mapGetters([
               'CART'
            ]),
        },
    }
</script>

<style>
    .main-section {
        max-width: 1400px;
        margin: 0 auto;
    }
</style>