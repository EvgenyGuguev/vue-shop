<template>
    <div class="select-app" @click="optionsIsVisible = !optionsIsVisible">
        <p class="select-app__title">{{ selected }}</p>
        <div class="select-app__options" v-if="optionsIsVisible || isExpanded">
            <p class="select-app__option"
               v-for="option in options"
               :key="option.value"
                @click="selectOption(option)">
                {{ option.name }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Select",
        data() {
            return {
                optionsIsVisible: false,
            }
        },
        props: {
            options: {
                type: Array,
                default() {
                    return [];
                }
            },
            selected: {
                type: String,
                default: '',
            },
            isExpanded: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            selectOption(option) {
                this.$emit('selectOption', option);
            },
        }
    }
</script>

<style lang="scss">
    .select-app {
        margin: 0 0 0 2.5rem;
        user-select: none;
        cursor: pointer;
        position: relative;
        width: 10rem;
        &__title {
            border: solid 1px gray;
        }
        &__options {
            border: solid 1px gray;
            position: absolute;
            top: 1.7rem;
            right: 0;
            width: 98.5%;
        }
        &__option:hover {
            background: #d0dce0;
        }
    }
    .select-app p {
        margin: 0;
    }
</style>