import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  // common
  { path: route.main, name: 'main', component: ProcedureInfo },
  { path: route.missionControls, name: 'missionControls', component: MissionControls },
  { path: route.videoPlayer, name: 'videoPlayerContainer', component: VideoPlayerContainer }
];

export default new VueRouter({
  routes // short for `routes: routes`
})