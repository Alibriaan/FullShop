
function findIndex(state, id) {
    return state.basket.findIndex((item) => { 
        return item.id === id
     });
}

export default {
    state: {
        basket: [],
    },
    mutations: {
        addToBasket(state, product) {
            const index = findIndex(state, product._id);
            console.log(index);
            if(index !== -1) {
                state.basket[index].count += 1;
            } else {
                state.basket.push({
                    id: product._id,
                    name: product.name,
                    imgPath:  product.imgPath,
                    count: 1,
                    price: product.price
                });
            }
            console.log(state.basket);
        },
        plusItem(state, id) {
            const index = findIndex(state, id);
            state.basket[index].count += 1;
        },
        minusItem(state, id) {
            const index = findIndex(state, id);
            if(state.basket[index].count - 1 === 0) {
                state.basket.splice(index, 1);
            } else {
                state.basket[index].count -= 1;
            }
        },
        clearBasket(state) {
            state.basket = [];
        },
        deletProductFromBasket(state, id) {
            const index = findIndex(state, id);
            state.basket.splice(index, 1);
        }
    },
    actions: {
        addToBasket({commit}, product) {
            commit("addToBasket", product);
        },
        plusItem({commit}, id) {
            commit("plusItem", id);
        },
        minusItem({commit}, id) {
            commit("minusItem", id);
        },
        clearBasket({commit}) {
            commit("clearBasket");
        },
        deletProductFromBasket({commit}, id) {
            commit("deletProductFromBasket", id);
        }
    },
    getters: {
        basket: state => state.basket,
        basketStatus: state => {
            return !!state.basket.length
        }
    }
};
