<template>
    <div class="header">
        <router-link :to="{ name: 'mainPaige' }">
            <img src="../../assets/logo.png" alt="">
        </router-link>


        <div class="search-field-block"
             v-if="IS_DESKTOP">
            <input
                    type="text"
                    class="search-field"
                    placeholder="search..."
                    v-model="searchValue"
                    @keypress.enter="searchItem(searchValue)"
            >
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "Header",
        data() {
            return {
                searchValue: '',
            }
        },
        methods: {
            ...mapActions([
                'GET_SEARCH_VALUE_TO_VUEX',
            ]),
            searchItem(value) {
                this.GET_SEARCH_VALUE_TO_VUEX(value);

                if (this.$route.path !== '/catalog') {
                    this.$router.push('/catalog');
                }
            }
        },
        computed: {
            ...mapGetters([
                'IS_DESKTOP',
                'SEARCH_VALUE'
            ]),
        },
    }
</script>

<style lang="scss">
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.6rem;
        background: #3193ef;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        img {
            width: 4rem;
        }
        .search-field-block {
            position: relative;
            right: 15rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .search-field {
                padding: 0.5rem;
                border-radius: 0.7rem;
                font-size: 1rem;
                color: black;
                background: white;
            }
        }
    }
</style>