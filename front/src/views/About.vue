<template>
  <div class="about">
  <div class="posts-item" v-for="(item,index) in posts" :key="index">
    <h1>{{item.title}}</h1>
    <p>{{item.description}}</p>
  </div>
  <input type="text" placeholder="title" v-model="title" />
  <input type="text" placeholder="description" v-model="description" />
  <button @click="sendDataOnServer">Send</Button>
  </div>
</template>

<script>
// import PostsRequset from '../services/postRequest.js';
// import PostsService from '../services/postsService.js';
export default {
  name: 'about',
  data: () => {
    return {
      posts: [],
      title: "",
      description: ""
    }
  },
  
  methods: {
    async sendDataOnServer() {
      console.log("Post"); 
      // await PostsRequset.fetchPosts({
      //   title: this.title,
      //   description: this.description
      // });
      // const response = await PostsService.fetchPosts()
      // console.log(response.data);
    },
    async getPosts() {
        console.log("Get запрос");
        // const response = await PostsService.fetchPosts()
        // this.posts = response.data;
    }
  },
  mounted() {
    // this.getPosts();
  }
}
</script>

<style scoped>
</style>
