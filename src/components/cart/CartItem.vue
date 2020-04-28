<template>
    <div class="cart-item">
        <img :src="require('../../assets/images/' + cart_item_data.image)"
             alt="image"
             class="cart-item__img"
        >
        <div class="cart-item__info">
            <p>{{ cart_item_data.name }}</p>
            <p>Цена: {{ cart_item_data.price }} Р</p>
            <p>{{ cart_item_data.article }}</p>
        </div>
        <div class="cart-item__quantity">
            <p>Quantity: </p>
            <span class="cart-item__quantity_tool">
                <span
                        class="cart-item__quantity_change"
                        @click="minusQuantity"
                >-</span>
                {{ this.cart_item_data.quantity }}
                <span
                        class="cart-item__quantity_change"
                        @click="plusQuantity"
                >+</span>
            </span>

        </div>
        <button
                class="cart-item__btn button"
                @click="deleteFromCart"
        >Delete</button>
    </div>
</template>

<script>
    export default {
        name: "CartItem",
        props: {
            cart_item_data: {
                type: Object,
                default() {
                    return {};
                }
            },
        },
        methods: {
            deleteFromCart() {
                this.$emit('deleteFromCart')
            },
            minusQuantity() {
                this.$emit('minusQuantity');
            },
            plusQuantity() {
                this.$emit('plusQuantity');
            }
        }
    }
</script>

<style lang="scss">
    .cart-item {
        box-shadow: 0 0 8px 0 #a5a5a5;
        padding: 1rem;
        margin: 2rem;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: space-between;
        &__img {
            max-width: 50px;
        }
        &__btn {
            background-color: orangered;
            padding: 0.7rem;
            font-size: 0.7rem;
            &:hover {
                background-color: #d02c18;
            }
        }
        &__quantity_tool {
            user-select: none;
        }
        &__quantity_change{
            font-size: 1.5rem;
            cursor: pointer;
            margin: 0.5rem;
        }
    }
</style>