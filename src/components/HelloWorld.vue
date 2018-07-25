<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <router-link :to="'upload'">to 上传文件</router-link>
    <router-link :to="'header'">to header</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to You'
    }
  }
}
</script>

<style scoped>

</style>
