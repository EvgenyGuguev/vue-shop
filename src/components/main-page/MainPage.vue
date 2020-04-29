<template>
    <div class="main-page">
        <h1>Vue.js Demo Shop</h1>
        <p>
            <router-link :to="{ name: 'catalog' }" >
                to Catalog
            </router-link>
        </p>
    </div>
</template>

<script>
    export default {
        name: "MainPage"
    }
</script>

<style lang="scss">
    .main-page {
        margin-top: 7rem;
        p {
            font-size: 1.5rem;
            text-transform: uppercase;

        }
    }

</style>