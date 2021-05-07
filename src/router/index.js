import Vue from 'vue'
import CommonLayout from '../layouts/CommonLayout'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import maskGoogleMap from '@/components/maskGoogleMap'

Vue.use(Router)

const NotFoundedPage = Vue.component('Test', {
  name: 'Test',
  template: `
    <div>404 Not Found. see src/router/index.js file</div>
  `,
  data() {
    return {
    };
  },
});

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: CommonLayout,
      children: [{
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
      },{
        path: '/HelloWorld/demo',
        component: HelloWorld,
        props: {
          tabIndex: 0,
        },
      },{
        path: '/HelloWorld/demo2',
        component: HelloWorld,
        props: {
          tabIndex: 1,
        },
      }, {
        path: '/maskGoogleMap',
        name: 'maskGoogleMap',
        component: maskGoogleMap
      }],
    }, {
      path: '*',
      component: NotFoundedPage,
    }]
})
