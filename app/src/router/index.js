import Vue from 'vue'
import Router from 'vue-router'

const LandingPage = () => import("../views/LandingPage.vue");
import Home from '../views/Home.vue'

Vue.use(Router)

import BlogEntries from '../statics/data/blogs.json';

const blogRoutes = Object.keys(BlogEntries).map(section => {
  const children = BlogEntries[section].map(child => ({
    path: child.id,
    name: child.id,
    component: () => import(`../blog/${section}/${child.id}.md`)
  }))
  return {
    path: `/${section}`,
    name: section,
    component: () => import('../views/Blog.vue'),
    children
  }
});
console.log(blogRoutes);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Happy Welcome',
      component: LandingPage
    },
    ...blogRoutes
  ]
})