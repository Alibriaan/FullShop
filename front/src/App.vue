<template>
  <v-app >
    <v-app-bar
      color="primary"
      dark
      class="pa-0"
      content="3"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Phone Shop</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-badge
        content="5"
        color="green"
        right 
        :offset-x="5"
        :offset-y="15"
        >
          <v-icon large>mdi-basket</v-icon>
        </v-badge>
      </v-btn>

    </v-app-bar>
    <v-content>
      <router-link to="/">Home</router-link> |
      <router-link to="/posts">About</router-link> |
      <router-link to="/authorization-registration">Sign In / Sign Up</router-link>
      <router-view/>
    </v-content>
  </v-app>
</template>
