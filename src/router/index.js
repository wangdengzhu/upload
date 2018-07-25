import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Header from '@/components/Header'
import Upload from '@/views/upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/upload',
      component: Upload
    },
    {
      path: '/header',
      component: Header
    }
  ],
  mode: 'history'
})
