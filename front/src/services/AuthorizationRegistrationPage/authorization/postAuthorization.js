import api from '../../api.js';

export default (data) => {
    return api().post("/authorization", data)
  }