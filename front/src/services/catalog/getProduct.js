import api from "../api.js";
export default (type) => {
    return api().post('/product', type);
  }