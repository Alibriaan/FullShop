<template>
  <v-app>
    <v-app-bar
      class="pa-0"
      content="3"
      v-if="$route.meta.headerDisplay === true"
    >
      <v-app-bar-nav-icon class="d-sm-block d-md-none"></v-app-bar-nav-icon>
      <v-toolbar-title>Phone Shop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch
        v-model="$vuetify.theme.dark"
        hide-details
        inset
        label="Theme"
      ></v-switch>

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
    <transition name="slide-left"  mode="out-in" v-if="$route.meta.animationStatus === true">
      <router-view :key="$route.path" />
    </transition>
    <transition name="scale">
      <v-fab-transition v-if="$route.meta.backBtn === true">
        <v-btn
          color="red"
          @click="backIn"
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
    </transition>
      <v-speed-dial
      v-model="fab"
      fixed
      bottom
      right
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          color="blue"
          dark
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-cog</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="changeTheme"
      >
        <v-icon>mdi-compare</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>mdi-account-tie-voice</v-icon>
      </v-btn>
      <v-btn
        v-if="$route.meta.logoutButtonDisplay === true"
        @click="logout"
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-exit-run</v-icon>
      </v-btn>
    </v-speed-dial>
    </v-content>
    
  </v-app>
</template>

<script>
export default {
  name: "app",
  data: () => ({
        fab: false,
  }),
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout() {
      this.$router.push(`/authorization-registration`); 
    },
    backIn() {
      this.$router.push(this.$router.prevRoute);
    }
  },
}
</script>

<style>

.v-application .v-toolbar {
  flex: 0 1 auto;
}

#app .v-toolbar__content, .v-toolbar__extension {
  padding: 0 25px;
}

.v-content__wrap {
  position: relative;
}

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
</style>
