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
