<template>
  <v-container class="home" fluid>
    <img alt="Vue logo" src="../assets/logo.png">
    <v-row>
      <v-col class="navigation-menu pa-1">
        <v-list class="pa-0" v-if="catalog.length">
          <v-subheader>Каталог</v-subheader>
          <v-list-item v-for="(item,index) in catalog" @click="goToCatalog(item.name)" :key="index">
           <v-list-item-content class="text-center">
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col class="main-shop-container">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import getListOfItem from "../services/mainPage/getListOfItem.js";
// import axios from "axios";
export default {
  name: 'Home',
  data: () => {
    return {
      catalog: false
    }
  },
  created() {
      getListOfItem()
      .then((res) => {
          console.log(res);
          this.catalog = res.data;
          console.log("Success");
      })
      .catch((err) => {
          console.log(err);
          console.log("Error");
      });
  },
</script>
<style scoped>

.navigation-menu{
  background: red;
  max-width: 250px;
}

.main-shop-container{
  background: green;
}

#app .v-list-item {
  min-height: 32px;
}
</style>
