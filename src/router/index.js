import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DragTreeMain from './../components/dragTree/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tree',
      name: 'DragTreeMain',
      component: DragTreeMain
    }
  ]
})
