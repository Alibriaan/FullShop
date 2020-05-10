import getProductQuery from "../../services/catalog/getProduct.js";

export default {
    state: {
        productsList: [],
        productType: "",
        paginationPage: 1
    },
    mutations: {
        getProductsFromTheDatabase(state, payload) {
            state.productsList = payload;
            console.log( state.productsList);
        },
        changePage(state, pageNumber) {
            state.paginationPage = pageNumber;
        },
        clearPagination(state) {
            state.paginationPage = 1;
        }
    },
    actions: {
        getProductsFromTheDatabase({ commit }, {id, page}) {
            console.log(id);
            getProductQuery({id, page})
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
        productCount: state => state.productsList.length
    }
};
