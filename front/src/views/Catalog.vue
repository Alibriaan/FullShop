<template>
    <v-container
    fluid
    >
    <v-row
        align="center"
        justify="center"
    >
        <h1>Каталог</h1>
    </v-row>
    <v-row class="item-list d-flex justify-center align-start
 flex-wrap">
        <template v-for="(item,index) in allProducts">
            <v-product-card v-on:add-in-cart-click="addInCart" :information="item" :key="index" />
        </template>
    </v-row>
    <template v-if="basketStatus">
        <transition name="scale" mode="in-out">
            <v-fab-transition>
                <v-btn
                color="green"
                @click="goToBasket"
                dark
                fixed
                top
                right
                small
                fab
                >
                    <v-icon>mdi-cart</v-icon>
                </v-btn>
            </v-fab-transition>
        </transition>
    </template>
     <v-pagination
      v-if="productCount > 20"
      v-model="paginationPage"
      :length="Math.round(productCount / 20)"
      circle
    ></v-pagination>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import vProductCard from "../components/vProductCard";
export default {
    name: "Catalog",
    components: {
        vProductCard
    },
    data: () => {
        return {
            paginationPage: 1,
        }
    },
    watch: {
        paginationPage: function() {
            this.changePage(this.paginationPage)
        }
    },
    computed: {
         ...mapGetters(["allProducts", "page", "basketStatus", "productCount"])
    },
    methods: {
        ...mapActions(["getProductsFromTheDatabase", "changePage", "clearPagination", "addToBasket"]),
        backInMainPage() {
            this.$router.push('/');
        },
        goToBasket() {
            this.$router.push("/basket");
        },
        addInCart(product) {
            this.basketSize += 1;
            this.addToBasket(product);
            console.log(product)
        }
    },
    created() {
        this.paginationPage = this.page;
        this.getProductsFromTheDatabase( {
            id: this.$route.params.id, 
            page: this.paginationPage
        });
    },
    beforeRouteLeave (to, from, next) {
      if(to.name === "Home") {
          this.clearPagination();
      }
      next();
    }
}
</script>

<style scoped>

.scale-enter-active {
  animation: scale 0.5s;
} 
.scale-leave-active {
  animation: slide_left 0.5s reverse;
}

@keyframes scale {
    0%{ 
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
</style>