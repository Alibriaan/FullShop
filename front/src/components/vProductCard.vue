<template>
<v-card
    max-width="250"
    class="ma-4 primaryrproductcard"
  >
    <v-img
      :src="`data:image/png;base64, ${information.imgPath}` "
      contain
      max-height="200px"
      alt="img"
    ></v-img>
    <v-card-title class="primaryrproductcardtext--text">
      <p>{{information.name}}</p>
    </v-card-title>

    <v-card-subtitle class="primaryrproductcardtext--text">
      {{information.os}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn 
      class="primaryrproductcardtext--text"
      text
      @click="emitClick"
      >
      <v-icon>
        mdi-cart-plus
      </v-icon>
      В корзину
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
       class="primaryrproductcardtext--text"
        icon
        @click="toggleExpand"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text class="primaryrproductcardtext--text">
        {{information.description}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'v-product-card',
  props: {
    information: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
        show: false,
    }
  },
  methods: {
    toggleExpand() {
      this.show = !this.show
    },
    emitClick() {
      console.log("Emit Event");
      this.$emit('add-in-cart-click')
    }
  }
}
</script>

<style scoped>
</style>
