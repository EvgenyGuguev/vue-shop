<template>
    <div class="catalog">
        <router-link :to="{ name: 'cart', params: {cart_data: CART}}">
            <div class="catalog__link_to_cart">
                Cart: {{ CART.length }}
            </div>
        </router-link>
        <h1 class="catalog__title" v-if="IS_DESKTOP">Catalog</h1>

        <select-app
                :options="categories"
                @selectOption="selectCategory"
                :selected="selected"
                :is-expanded="IS_MOBILE"
        />

        <div class="catalog__list" :class="{ 'is_mobile': IS_MOBILE }">
            <catalog-item
                    v-for="product in filteredProducts"
                    :key="product.article"
                    :product_data="product"
                    @addToCart="addToCart"
            />
        </div>
    </div>
</template>

<script>
    import CatalogItem from "./CatalogItem";
    import Select from "../Select";
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "Catalog",
        data() {
            return {
                categories: [
                    {name: 'Все', value: 'all   '},
                    {name: 'Мужские', value: 'м'},
                    {name: 'Женские', value: 'ж'},
                ],
                selected: 'Все',
                sortedProducts: [],
            }
        },
        components: {
            CatalogItem,
            'select-app': Select,
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART'
            ]),
            addToCart(data) {
                this.ADD_TO_CART(data);
            },
            selectCategory(category) {
                this.sortedProducts = [];
                let vm = this;
                this.PRODUCTS.map(function (item) {
                    if (item.category === category.name) {
                        vm.sortedProducts.push(item);
                    }
                })
                this.selected = category.name;
            }
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API()
                .then((res) => {
                    if (res.data) {
                        console.log('ITS OK');
                    }
                });
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'CART',
                'IS_MOBILE',
                'IS_DESKTOP',
            ]),
            filteredProducts() {
                if (this.sortedProducts.length) {
                    return this.sortedProducts;
                } else {
                    return this.PRODUCTS;
                }
            },
        }
    }
</script>

<style lang="scss">
    .catalog {
        display: flex;
        flex-direction: column;
        &__list {
             display: flex;
             flex-wrap: wrap;
             align-items: center;
             justify-content: space-around;
         }
        &__title {
            text-transform: uppercase;
            font-size: 3rem;
        }
        &__link_to_cart {
            display: block;
            position: fixed;
            top: 1rem;
            right: 1rem;
            padding: 1rem;
            border: solid 1px slategray;
            cursor: pointer;
        }

        .is_mobile {
            margin-top: 7.4rem;
        }
    }
</style>