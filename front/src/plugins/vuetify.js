import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            success: "4CAF50",
            accent: '#8c9eff',
            error: '#ff5252',
            primarylink: "#121212",
            navigationlistprimary: "#ffffff",
            navigationformtext: "#212121",
            primaryrproductcard: "#ffffff",
            primaryrproductcardtext: "#121212",
            primaryregisrationauthorizationform: "#ffffff",
            secondaryregisrationauthorizationform: "#1976D2",
            paginationColor: "#1976D2",
            basketBtnColor: "#2196F3",
            basketBtnTextColor: "#ffffff",
            basketTextColor: "#121212",
            basketCompleteBtn: "4CAF50"
          },
          dark: {
              primary: "#E0E0E0",
              secondary: "#424242",
              primarylink: "#e0e0e0",
              navigationlistprimary: "#E0E0E0",
              navigationform: "#E0E0E0",
              navigationformtext: "#212121",
              primaryrproductcard: "#ffffff",
              primaryrproductcardtext: "#121212",
              primaryregisrationauthorizationform: "#ffffff",
              secondaryregisrationauthorizationform: "#1976D2",
              paginationColor: "#1976D2",
              basketBtnColor: "#2196F3",
              basketBtnTextColor: "#ffffff",
              basketTextColor: "#121212",
              success: "#4CAF50",
              basketCompleteBtn: "4CAF50"
          }
        },
      },
});
