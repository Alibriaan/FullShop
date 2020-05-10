<template>
    <v-container class="home-page d-flex align-center" fluid >
      <v-container>
      <v-row class="my-3 d-flex justify-center text-center">
          <h1>Choose Your Destiny</h1>
      </v-row>
      <v-row class="d-flex justify-center">
        <template v-for="(item,index) in catalog">
          <v-btn v-if="item.status === 'active'" :key="index" class="ma-2" outlined @click="goToCatalogPage(item.name)">
           {{item.title}}
          </v-btn>
          <v-btn disabled v-else :key="index" class="ma-2" outlined>{{item.title}} 
            <v-badge
            top
            right
            overlap
            class="white--text"
            color="green"
            content="in dev"
            offset-x="30"
            offset-y="-8"
            ></v-badge>
          </v-btn>

        </template>
      </v-row>
      </v-container>
    </v-container>
</template>

<script>
import getListOfItem from "../services/mainPage/getListOfItem.js";
export default {
  name: 'Home',
  data: () => {
    return {
      catalog: false
    }
  },
  methods: {
    goToCatalogPage(product) {
        this.$router.push(`/catalog/${product}`);
    }
  },
  created() {
      console.log("Get list of item");
      getListOfItem()
      .then((res) => {
          this.catalog = res.data;
      })
      .catch((err) => {
          console.error(err);
      });
  }
}
  
</script>

<style scoped>

.home-page {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}
</style>