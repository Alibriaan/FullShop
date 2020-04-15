import api from '../../api.js';

export default (data) => {
    return api().post("/confirmation", data)
  }