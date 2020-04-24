<template>
    <div class="catalog-item">
        <img
                class="catalog-item__image"
                :src="require('../../assets/images/' + product_data.image)"
                alt="img">
        <h2>{{ product_data.name }}</h2>
        <p>Price: {{ product_data.price }} P</p>
        <p>Category: {{ product_data.category }}</p>
        <button type="submit"
                class="button"
                @click="addToCart">
            Add to Cart
        </button>
    </div>
</template>

<script>
    export default {
        name: "CatalogItem",
        props: {
            product_data: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        mounted() {
            this.$set(this.product_data, 'quantity', 1)
        },
        methods: {
            addToCart() {
                this.$emit('addToCart', this.product_data)
            }
        }
    }
</script>

<style lang="scss">
    .catalog-item {
        box-shadow: 2px 4px 5px #a5a5a5;
        padding: 1rem;
        margin: 2rem;
        flex-basis: 25%;
            &__image {
                width: 150px;
            }
    }
    .button {
        outline: none;
        border-radius: 0.7rem;
        text-transform: uppercase;
        background-color: #3193ef;
        border: none;
        color: white;
        padding: 1rem 2rem;
        font-size: 0.9rem;
        cursor: pointer;
        &:hover {
            background-color: #3863e9;
        }
    }

</style>