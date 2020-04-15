import api from '../../api.js';

export default {
  fetchPosts (data) {
    api().post("/test-email", data);
  }
}