import Vue from 'vue';
import Router from 'vue-router';

// route level code-splitting
// this generates a separate chunk (path.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const MapViewerPage = () => import(/* webpackChunkName: "map-viewer" */ './views/MapViewerPage.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/map-viewer',
      name: 'map-viewer',

      component: MapViewerPage
    }
  ]
});
