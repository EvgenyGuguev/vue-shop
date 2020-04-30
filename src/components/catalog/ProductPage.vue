<template>
    <div class="product-page">
        <notification
                :messages="messages"
        />
        <router-link :to="{ name: 'catalog'}">
            <div class="cart__link_to_catalog">
                Back to Catalog
            </div>
        </router-link>
        <img
                v-if="product.image"
                class="catalog-item__image"
                :src="require('../../assets/images/' + product.image)"
                alt="img"
        >
        <p>Product name: {{ product.name }} </p>

        <p><b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, cupiditate dicta enim, error exercitationem illum inventore ipsam nostrum pariatur quae repudiandae tempore velit veritatis voluptates voluptatum! Distinctio facilis nesciunt veritatis.</p>

        <p>Price: {{ product.price | toFix | priceFormat }}</p>

        <button type="submit"
                class="button"
                @click="addToCart">
            Add to Cart
        </button>
    </div>
</template>

<script>
    import Notification from "../notification/Notification";
    import {mapGetters, mapActions} from 'vuex';
    import toFix from "../../filters/toFix";
    import priceFormat from "../../filters/priceFormat";

    export default {
        name: "ProductPage",
        components: {
            Notification
        },
        data() {
            return {
                messages: [],
            }
        },
        props: {
            product_data: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        filters: {
            toFix,
            priceFormat
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
            ]),
            product() {
                let result = {};
                this.PRODUCTS.find(item => {
                    if (item.article === this.$route.query.product) {
                        result = item;
                    }
                });
                return result;
            },
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART'
            ]),
            addToCart() {
                this.ADD_TO_CART(this.product)
                    .then(() => {
                        let timeStamp = Date.now().toLocaleString();
                        this.messages.unshift(
                            { name: 'Товар добавлен в корзину', id: timeStamp, icon: 'check_circle'}
                        )
                    });
            },
        },
        mounted() {
            if (!this.PRODUCTS.length) {
                this.GET_PRODUCTS_FROM_API()
            }
        }

    }
</script>

<style lang="scss">
    .product-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 7rem;
        p {
            max-width: 30rem;
            text-align: center;
        }
    }
</style>