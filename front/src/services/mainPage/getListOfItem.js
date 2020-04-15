import api from "../api.js";
export default () => {
    return api().get('/list-of-item');
  }