import getProductQuery from "../../services/catalog/getProduct.js";

export default {
    state: {
        productsList: null,
        productCount: null,
        productType: "",
        paginationPage: 1
    },
    mutations: {
        getProductsFromTheDatabase(state, payload) {
            state.productsList = payload;
            state.productCount = payload.length;
            console.log( state.productsList);
            console.log( state.productCount);

        },
        changePage(state, pageNumber) {
            state.paginationPage = pageNumber;
        },
        clearPagination(state) {
            state.paginationPage = 1;
        }
    },
    actions: {
        getProductsFromTheDatabase({ commit }, type) {
            console.log("otpravka na server");
            console.log(type);
            getProductQuery({type})
            .then(response => {
                commit('getProductsFromTheDatabase', response.data.payload);
            })
            .catch(err => {
                console.log(err);
            })
        },
        changePage({ commit }, pageNumber) {
            commit('changePage', pageNumber);
        },
        clearPagination({ commit }) {
            commit('clearPagination');
        }
    },
    getters: {
        allProducts: state => state.productsList,
        page: state => state.paginationPage,
        productCount: state => state.productCount
    }
};
