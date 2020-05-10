import api from "../api.js";
export default ({id, page}) => {
    return api().post('/product', {id, page});
  }