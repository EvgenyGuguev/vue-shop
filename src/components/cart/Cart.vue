<template>
    <div class="cart">
        <router-link :to="{ name: 'catalog'}">
            <div class="cart__link_to_catalog">
                Back to Catalog
            </div>
        </router-link>
        <h1>Cart</h1>
        <p v-if="!cart_data.length" style="font-size: 1.5rem">Cart is empty now...</p>
        <cart-item
                v-for="(item, index) in cart_data"
                :key="item.article"
                :cart_item_data="item"
                @deleteFromCart="deleteFromCart(index)"
                @minusQuantity="minusQuantity(index)"
                @plusQuantity="plusQuantity(index)"
        />
        <div class="cart__total">
            <p class="cart__total_name">Total: </p>
            <p>{{ cartTotalCost | toFix | formattedPrice }}</p>
        </div>
    </div>
</template>

<script>
    import CartItem from "./CartItem";
    import {mapActions} from 'vuex';
    import toFix from "../../filters/toFix";
    import formattedPrice from "../../filters/priceFormat";

    export default {
        name: "Cart",
        props: {
          cart_data: {
              type: Array,
              default() {
                  return [];
              }
          }
        },
        filters: {
            toFix,
            formattedPrice
        },
        computed: {
          cartTotalCost() {
              return this.cart_data.reduce((res, item) =>
                  res + item.price * item.quantity, 0);
          }
        },
        components: {
            CartItem,
        },
        methods: {
            ...mapActions([
               'DELETE_FROM_CART',
                'PLUS_QUANTITY',
                'MINUS_QUANTITY'
            ]),
            deleteFromCart(index) {
                this.DELETE_FROM_CART(index);
            },
            minusQuantity(index) {
                this.MINUS_QUANTITY(index);
            },
            plusQuantity(index) {
                this.PLUS_QUANTITY(index);
            },
        }
    }
</script>

<style lang="scss">
    .cart {
        margin-bottom: 9rem;
        &__link_to_catalog {
            z-index: 7;
            position: fixed;
            top: 0.9rem;
            right: 1rem;
            padding: 1rem;
            border: solid 1px slategray;
            cursor: pointer;
            background: white;
        }
        &__total {
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            padding: 0.5rem;
            display: flex;
            justify-content: center;
            background: #3193ef;
            color: white;
            font-size: 1.5rem;
        }
        &__total_name {
            margin-right: 1rem;

        }
    }

</style>