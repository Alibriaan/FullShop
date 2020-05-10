<template>
    <v-container fluid>
         <v-row
            align="center"
            justify="center"
        >
            <h1>BASKET</h1>
        </v-row>
        <v-row
            align="center"
            justify="center"
        >
            <transition name="scale"  mode="out-in">
                <v-card
                    v-if="subPage === 'BASKET'"
                    max-width="768px"
                    class="ma-4 primaryrproductcard basket-card basketTextColor--text"
                    key="BASKET"
                >
                <template v-if="basketStatus">
                    <template v-for="(item,index) in basket">
                        <v-container :key="index" class="item-section basketTextColor--text">
                            <v-row class="d-flex justify-center align-center">
                                <v-btn class="mx-4 basketBtnColor basketBtnTextColor--text d-sm-block d-none" fab x-small @click="minusBtnClick(item.id)">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                <v-img
                                class="basket-product-img"
                                :src="`data:image/png;base64, ${item.imgPath}` "
                                max-width="300px"
                                contain
                                alt="img"
                                >
                                </v-img>
                                <v-btn class="mx-4 basketBtnColor basketBtnTextColor--text d-sm-block d-none" fab  x-small @click="plusBtnClick(item.id)">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-row>
                            <v-row class="d-flex justify-center">
                                <h2 class="upper-case">{{item.name}}</h2>
                            </v-row>
                            <v-row class="d-flex flex-column align-center">
                                    <p class="item-count-text my-2">{{item.count}}</p>
                            </v-row>
                            <v-row class="item-price d-flex justify-center">
                                    <p v-text="getPrice(item.price, item.count)"></p>
                            </v-row>
                            <v-row class="d-sm-none d-flex justify-center">
                                <v-btn class="mx-4 basketBtnColor basketBtnTextColor--text" fab x-small @click="minusBtnClick(item.id)">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                <v-btn class="mx-4 basketBtnColor basketBtnTextColor--text" fab  x-small @click="plusBtnClick(item.id)">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-row>
                        </v-container>
                    </template>
                    <v-container>
                        <v-row class="full-price d-flex justify-center">
                                Total: {{summaryPrice}} euro
                        </v-row>
                    </v-container>
                    <v-container>
                        <v-row class="mx-2">
                            <v-btn
                            class="complete-btn basketCompleteBtn basketBtnTextColor--text"
                            block
                            :loading="loading"
                            :disabled="loading"
                            @click="completeOrder"
                            >
                            Accept Terms
                            </v-btn>
                        </v-row>
                    </v-container>
                    </template>
                    <template v-else>
                        <v-container>
                            <v-row class="d-flex justify-center">
                                <h2>Empty basket</h2>
                            </v-row>
                            <v-row class="d-flex justify-center">
                                <v-btn @click="goToShop" class="success">Back in shop</v-btn>
                            </v-row>
                        </v-container>
                    </template>
                </v-card>
                <v-container class="success-order" v-if="subPage === 'SUCCESS_ORDER'" key="SUCCESS_ORDER">
                    <v-row class="success-animatio-block flex-sm-row flex-column d-flex justify-sm-center align-center flex-nowrap">
                        <h2 class="success--text">THANKS FOR YOUR ORDER</h2>
                        <svg :class="[ checkStatus ?'animate': '', 'mx-0, mx-sm-4']" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#3da35a" fill="transparent"/>
                        </svg>
                    </v-row>
                </v-container>
            </transition>
        </v-row>
    </v-container>
</template>

<script>

import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    name: "basket-page",
    data: () => {
        return {
            loading: false,
            subPage: "BASKET",
            checkStatus: false
        }
    },
  computed: {
         ...mapGetters(["basket", "basketStatus"]),
         summaryPrice() {
                let sum = 0;
                this.basket.forEach( item => {
                    const payText = item.price.split(" ");
                    sum += payText[0] * item.count;
                    
             })
            return sum;
         }
    },
    methods: {
        ...mapActions(["getProductsFromTheDatabase", "changePage", "clearPagination", "addToBasket", "plusItem", "minusItem", "deletProductFromBasket" ,"clearBasket"]),
        minusBtnClick(id) {
            this.minusItem(id);
        },
        plusBtnClick(id) {
            this.plusItem(id);
        },
        deleteItem(id) {
            this.deletProductFromBasket(id);
        },
        completeOrder() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false
                this.subPage = "SUCCESS_ORDER"
                this.clearBasket();
            }, 1000);
            setTimeout( () => {
                this.checkStatus = true;
            }, 1700)
            setTimeout( () => {
                this.$router.push(this.$router.prevRoute);
            }, 3000);
        },
        getPrice(price,count) {
            const payText = price.split(" ");
            return (payText[0] * count) + " " +payText[1]
        },
        goToShop() {
            this.$router.push(this.$router.prevRoute);
        },
    }
}
</script>

<style scoped>
.upper-case {
    text-transform: uppercase;
}

.item-price,
.full-price,
.item-count-text {
    font-size: 24px;
}

.item-section {
    position: relative;
}
.item-section:not(:last-child):after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 70%;
    height: 2px;
    background: #e9e9e9;
    transform: translateX(-50%);
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

}
.basket-card {
    width: 95%;
}

.basket-product-img {
    max-width: 50%;
    width: 100%;
}
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined),
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background: #4CAF50 !important;
}
.theme--light.v-btn.v-btn--disabled,
.theme--dark.v-btn.v-btn--disabled {
    color: #ffffff !important;
}

.scale-enter-active {
  animation: scale 0.5s;
} 
.scale-leave-active {
    animation: scale 0.5s reverse;
}

@keyframes scale {
    from{ 
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}

.success-animatio-block h2 {
    display: flex;
    align-items: flex-end;
}
.success-animatio-block svg {
    max-height: 48px;
    max-width: 48px;
}

path {
  stroke-dasharray: 99.47578430175781;
  stroke-dashoffset: -99.47578430175781;
  fill: transparent;
}

svg.animate path {
  animation: 1.7s ease forwards draw;
  opacity:1;
}

@keyframes draw {
  0% {
    opacity: 1;
    stroke-dashoffset: -99.47578430175781;
    fill: transparent;
    transform: translateY(0);
  }
  
  35% {
    stroke-dashoffset: 0;
    fill: transparent;
  }
  
  60% {
    fill: #3da35a;
    opacity: 1;
    transform: translateY(0);
  }
  
  100% {
    fill: #3da35a;
    stroke-dashoffset: 0;
    opacity: 1;
  }
}



</style>