import api from '../../api';

export default (data) => {
    return api().post("/registration", data)
  }