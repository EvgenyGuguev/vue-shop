<template>
    <div class="catalog-item">

        <popup
            class="catalog-item__popup"
            v-if="isPopupVisible"
            @closePopup="closeInfoPopup"
            rightBtnTitle="Add to Cart"
            :popupItem="product_data.name"
            @actionPopup="addToCart"
        >
            <img
                    class="catalog-item__image"
                    :src="require('../../assets/images/' + product_data.image)"
                    alt="img"
            >
            <div>
                <p><b>{{ product_data.name }}</b></p>
                <p><b>Price:</b> {{ product_data.price | toFix | formattedPrice }}</p>
                <p><b>Category:</b> {{ product_data.category }}</p>
                <p><b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, cupiditate dicta enim, error exercitationem illum inventore ipsam nostrum pariatur quae repudiandae tempore velit veritatis voluptates voluptatum! Distinctio facilis nesciunt veritatis.</p>

            </div>
        </popup>

        <img
                class="catalog-item__image"
                :src="require('../../assets/images/' + product_data.image)"
                alt="img"
                @click="productClick"
        >
        <h2>{{ product_data.name }}</h2>
        <p>Price: {{ product_data.price | toFix | formattedPrice}}</p>

        <div class="catalog-item__btns">
            <button class="button catalog-item__show-info"
                    @click="showPopup">
                Show Info
            </button>

            <button type="submit"
                    class="button"
                    @click="addToCart">
                Add to Cart
            </button>
        </div>
    </div>
</template>

<script>
    import Popup from "../popup/Popup";
    import toFix from "../../filters/toFix";
    import formattedPrice from "../../filters/priceFormat";

    export default {
        name: "CatalogItem",
        data() {
            return {
                isPopupVisible: false,
            }
        },
        filters: {
            toFix,
            formattedPrice
        },
        components: {
           Popup,
        },
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
            },
            showPopup() {
                this.isPopupVisible = true;
            },
            closeInfoPopup() {
                this.isPopupVisible = false;
            },
            productClick() {
                this.$emit('productClick', this.product_data.article);
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
        &__btns {
            display: flex;
            justify-content: space-between;
        }
        &__popup img {
            margin-right: 1rem;
        }
    }
    .button {
        outline: none;
        border-radius: 0.7rem;
        text-transform: uppercase;
        background-color: #2eba09;
        border: none;
        color: white;
        padding: 0.7rem;
        font-size: 0.9rem;
        cursor: pointer;
        &:hover {
            background-color: #1a670a;
        }
    }

    .catalog-item__show-info {

        background-color: #3193ef;
        &:hover {
            background-color: #3863e9;
        }
    }

</style>