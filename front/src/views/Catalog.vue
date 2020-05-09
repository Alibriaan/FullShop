<template>
    <transition name="slide-left"  mode="out-in">
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
    <v-fab-transition>
              <v-btn
                color="red"
                @click="backInMainPage"
                dark
                fixed
                top
                left
                small
                fab
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
    </v-fab-transition>
    <template v-if="basketSize > 0">
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
    </transition>
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
            basketSize: 0
        }
    },
    watch: {
        paginationPage: function() {
            this.changePage(this.paginationPage)
        }
    },
    computed: {
         ...mapGetters(["allProducts", "page", "productCount"])
    },
    methods: {
        ...mapActions(["getProductsFromTheDatabase", "changePage", "clearPagination"]),
        backInMainPage() {
            this.$router.push('/');
        },
        goToBasket() {
            this.$router.push("/basket");
        },
        addInCart() {
            console.log("Emit get");
            this.basketSize += 1;
        }
    },
    created() {
        this.paginationPage = this.page;
        this.getProductsFromTheDatabase(this.$route.params.id);
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


.slide-left-enter-active {
  animation: slide_left 0.5s;
} 
.slide-left-leave-active {
  animation: slide_left 0.5s reverse;
}

@keyframes slide_left {
    from{ 
        transform: translateX(100px) scale(0.9);
        opacity: 0;
    }
    to {
        transform: translateX(0) scale(1);
        opacity: 1;
    }
}


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