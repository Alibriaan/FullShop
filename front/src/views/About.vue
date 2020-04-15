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
