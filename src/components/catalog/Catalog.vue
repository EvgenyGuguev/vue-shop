<template>
    <div class="catalog">

        <notification
            :messages="messages"
        />

        <router-link :to="{ name: 'cart', params: {cart_data: CART}}">
            <div class="catalog__link_to_cart">
                Cart: {{ CART.length }}
            </div>
        </router-link>
        <h1 class="catalog__title" v-if="IS_DESKTOP">Catalog</h1>

        <div class="filters" :class="{ 'is_mobile_filters': IS_MOBILE }">
            <select-app
                    :options="categories"
                    @selectOption="selectCategory"
                    :selected="selected"
                    :is-expanded="IS_MOBILE"
            />

            <div class="range-slider" v-if="IS_DESKTOP">
                <input type="range" min="0" max="9000" step="100"
                        v-model.number="minPrice"
                        @change="setRangeSlider">
                <input type="range" min="0" max="9000" step="100"
                       v-model.number="maxPrice"
                       @change="setRangeSlider">
            </div>

            <div class="range-values" v-if="IS_DESKTOP">
                <p>Min: {{ minPrice }}</p>
                <p>Max: {{ maxPrice }}</p>
            </div>
        </div>


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
    import Notification from "../notification/Notification";
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
                minPrice: 0,
                maxPrice: 10000,
                messages: [],
            }
        },
        components: {
            CatalogItem,
            'select-app': Select,
            Notification,
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART'
            ]),
            addToCart(data) {
                this.ADD_TO_CART(data)
                    .then(() => {
                        let timeStamp = Date.now().toLocaleString();
                        this.messages.unshift(
                            { name: 'Товар добавлен в корзину', id: timeStamp, icon: 'check_circle'}
                        )
                    });
            },
            selectCategory(category) {
                let vm = this;
                this.sortedProducts = [...this.PRODUCTS];
                this.sortedProducts = this.sortedProducts.filter(function (item) {
                    return item.price >= vm.minPrice && item.price <= vm.maxPrice;
                });
                if (category) {
                    this.sortedProducts = this.sortedProducts.filter(function (item) {
                        vm.selected = category.name;
                        return item.category === category.name;
                    });
                }
            },
            setRangeSlider() {
                if (this.minPrice > this.maxPrice) {
                    let temp = this.maxPrice;
                    this.maxPrice = this.minPrice;
                    this.minPrice = temp;
                }
                this.selectCategory();
            },
            searchProductsByValue(value) {
                this.sortedProducts = [...this.PRODUCTS];
                if (value) {
                    this.sortedProducts = this.sortedProducts.filter(item => {
                        return item.name.includes(value);
                    });
                } else  {
                    this.sortedProducts = this.PRODUCTS;
                }

            }
        },
        watch: {
            SEARCH_VALUE() {
                this.searchProductsByValue(this.SEARCH_VALUE);
            }
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API()
                .then((res) => {
                    if (res.data) {
                        this.selectCategory();
                        this.searchProductsByValue();
                    }
                });
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'CART',
                'IS_MOBILE',
                'IS_DESKTOP',
                'SEARCH_VALUE'
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

    // Catalog
    .catalog {
        margin-top: 5rem;
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
            position: fixed;
            top: 0.9rem;
            right: 1rem;
            padding: 1rem;
            border: solid 1px slategray;
            cursor: pointer;
            background: white;
        }

        .is_mobile {
            margin-top: 12rem;
        }

        // Filters
        .filters {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .is_mobile_filters {
            margin-top: 2rem;
        }

        .range-values {
            margin-right: 3rem;
            text-align: end;
            font-weight: bold;
        }

        // Range Slider
        .range-slider {
            width: 15rem;
            margin: auto 0;
            text-align: center;
            position: relative;
        }
        .range-slider svg, .range-slider input[type=range] {
            position: absolute;
            left: 0;
            bottom: 0;
        }
        input[type=range]::-webkit-slider-thumb {
            z-index: 2;
            position: relative;
            top: 0.2rem;
            margin-top: -0.7rem;
        }
    }
</style>