<template>
    <div class="popup-wrapper" ref="popup-wrapper-ref">
        <div class="popup">
        <div class="popup__header">
            <span>{{ popupItem }}</span>
            <span>
                <i class="material-icons"
                   @click="closePopup"
                   style="cursor: pointer"
                    >
                    close
                </i>
            </span>
        </div>
        <div class="popup__content">
            <slot></slot>
        </div>
        <div class="popup__footer">
            <button class="modal-btn close-modal"
                    @click="closePopup">
                Close
            </button>
            <button class="modal-btn"
                    @click="rightBtnAction">
                {{ rightBtnTitle }}
            </button>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "Popup",
        props: {
            rightBtnTitle: {
                type: String,
                default: 'Ok',
            },
            popupItem: {
                type: String,
                default: 'Popup name',
            }
        },
        methods: {
            closePopup() {
                this.$emit('closePopup');
            },
            rightBtnAction() {
                this.$emit('actionPopup');
            }
        },
        mounted() {
            let vm = this;
            document.addEventListener('click', function (item) {
               if (item.target === vm.$refs['popup-wrapper-ref']) {
                   vm.closePopup();
               }
            });
        }
    }
</script>

<style lang="scss">
    .popup-wrapper {
        background: rgba(56, 51, 51, 0.47);
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
        z-index: 10;
    }

    .popup {
        box-shadow: 2px 4px 5px #a5a5a5;
        background: white;
        padding: 1rem;
        position: absolute;
        top: 6rem;
        width: 35rem;
        &__header {
            text-transform: uppercase;
            font-weight: bold;
        }
        &__header, &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem;
        }
        &__content {
            display: flex;
            justify-content: space-around;
            align-items: center;
            text-align: start;
        }

    }

    .modal-btn {
        outline: none;
        border-radius: 0.7rem;
        text-transform: uppercase;
        background-color: #3193ef;
        border: none;
        color: white;
        padding: 1rem 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        &:hover {
            background-color: #3863e9;
        }
    }

    .close-modal {
        background: orangered;
        &:hover {
            background-color: #d02c18;
        }
    }

</style>