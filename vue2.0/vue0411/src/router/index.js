import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout";
import DraggableView from "../views/Draggable";
import VueGridLayout from "../views/VueGridLayout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      { path: "/draggable", name: "Dragable", component: DraggableView },
      {
        path: "/vue-grid-layout",
        name: "VueGridLayout",
        component: VueGridLayout,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
