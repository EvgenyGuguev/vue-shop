<template>
    <div class="notification">
        <transition-group
                name="animate-messages"
                class="notification__animate-list"
        >
            <div class="notification__content"
                 v-for="message in messages"
                 :key="message.id"
                 :class="message.icon"
            >
                <div class="content-text">
                    <span>{{ message.name }}</span>
                    <i class="material-icons">{{ message.icon }}</i>
                </div>
                <div class="content-buttons">
                    <button v-if="rightBtn.length">{{ rightBtn }}</button>
                    <button  v-if="leftBtn.length">{{ leftBtn }}</button>
                </div>
            </div>
        </transition-group>

    </div>
</template>

<script>
    export default {
        name: "Notification",
        props: {
            messages: {
                type: Array,
                default() {
                    return [];
                }
            },
            rightBtn: {
                type: String,
                default: '',
            },
            leftBtn: {
                type: String,
                default: '',
            },
            timeout: {
                type: Number,
                default: 3000,
            }
        },
        methods: {
            hideNotification() {
                let vm = this;
                if (this.messages.length) {
                    setTimeout(() => {
                        vm.messages.splice(vm.messages.length - 1, 1);
                    }, vm.timeout);
                }

            }
        },
        watch: {
            messages() {
                this.hideNotification();
            }
        },
        mounted() {
            this.hideNotification();
        }
    }
</script>

<style lang="scss">
    .notification {
        position: fixed;
        top: 5rem;
        right: 1rem;
        z-index: 10;

        &__content {
            background: #169616c2;
            padding: 0.7rem;
            border-radius: 0.5rem;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 4rem;
            margin-bottom: 1rem;

            &.error {
                background: #d02c18b5;
            }
            &.check_circle {
                background: #169616c2;
            }
            &.warning {
                background: #ffa500b8;
            }
        }

        .content-text {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .material-icons {
            margin-left: 1rem;
        }
    }

    .animate-messages {
        &-enter {
            transform: translateX(10rem);
            opacity: 0;
        }

        &-enter-active {
            transition: all .6s ease;
        }

        &-enter-to {
            opacity: 1;
        }

        &-leave {
            height: 4rem;
            opacity: 1;
        }

        &-leave-active {
            transition: transform .6s, opacity .6s, height .6s .2s;
        }

        &-leave-to {
            height: 0;
            transform: translateX(10rem);
            opacity: 0;
        }

        &-move {
            transition: transform .6s ease;
        }
    }

</style>