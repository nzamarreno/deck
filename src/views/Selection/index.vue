<template>
    <div class="welcome selection outside">
        <div class="welcome__wrapper">
            <h1 class="title">Choose your deck</h1>
            <div class="c-input">
                <input class="c-input__input" placeholder="Your name here" v-model="name"/>
            </div>
            <div class="slider">
                <div class="slider__wrapper">
                    <div class="card" @click="onSelectCollection(item, index)" v-for="(item, index) in collections"
                         :key="index">
                        <!--            <span class="card__inner" :style="{backgroundColor: item.color}"></span>-->
                        <div class="card__wrapper" :style="{color: item.color}" :class="{ '--is-active': collectionIndexSelected === index ? true : false}">
                            <h1 class="card__title">{{item.name}}</h1>
                            <p class="card__synopsis">{{item.cards.length}} cards</p>
                            <div class="card__content">
                                <h4 class="card__subtitle">{{abbreviation(item.name)}}</h4>
                                <div class="card__shape">
                                    <svg class="currentColor" viewBox="0 0 265 273" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                                d="M263.83 153.949C265.733 184.409 262.878 231.764 233.37 250.979C220.758 259.189 204.993 262.283 190.834 266.744C172.57 272.515 157.459 274.776 139.196 267.577C121.289 260.498 104.869 250.622 85.951 246.101C72.3871 242.829 56.146 242.591 44.4262 234.084C32.5279 225.398 29.7319 209.811 25.746 196.545C20.2133 178.162 11.5276 160.91 5.04301 142.943C-2.15542 122.954 0.0457527 105.702 5.69742 85.7127C9.92129 70.8399 13.5503 55.1343 24.5561 43.593C35.9189 31.6947 52.16 26.6975 67.3898 21.7597C87.3193 15.3346 107.189 7.5413 127.535 3.13895C164.658 -4.95185 206.659 9.32603 230.039 40.083C240.331 53.647 245.09 69.7691 249.909 85.8912C256.691 108.438 262.342 130.748 263.83 153.949Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="onSubmit" class="c-button c-button--pink selection__button">Let's Go!</button>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import {uuidv4} from "../../core/helpers/uid";
    import {SOCKETEVENT} from "../../core/helpers/socket-event";
    import TransitionMixin from "../../mixins/TransitionMixin";

    export default Vue.extend({
        mixins: [TransitionMixin],

        data() {
            return {
                name: "",
                collections: [],
                collectionSelected: null,
                collectionIndexSelected: null,
            };
        },

        async mounted() {
            this.collections = await this.$GraphClient.getCollection();

            window.setTimeout(() => {
                tns({
                    container: '.slider__wrapper',
                    items: 1,
                    mouseDrag: true,
                    loop: false,
                    gutter: 20,
                    autoplay: false,
                    controls: false,
                    nav: false,
                    responsive: {
                        576: {
                            items: 3,
                        },
                        768: {
                            items: 3,
                        },
                        992: {
                            items: 4,
                        },
                        1200: {
                            items: 5,
                        }
                    }
                });
            }, 200);
        },

        methods: {
            abbreviation(name) {
                return `${name.substring(0, 2)}.`;
            },

            onSelectCollection(collection, index) {
                this.collectionSelected = collection;
                this.collectionIndexSelected = index;
            },

            onSubmit() {
                if (this.name === "" || !this.collectionSelected) return;
                const roomId = uuidv4();

                this.$VueSocket.sendMessage({
                    username: this.name,
                    roomId: roomId,
                    collection: this.collectionSelected,
                    type: SOCKETEVENT.CREATE
                });

                this.$router.push(`/board/${roomId}`);
            }
        },
    });
</script>