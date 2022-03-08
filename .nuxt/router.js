import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _29176138 = () => interopDefault(import('..\\pages\\characters.vue' /* webpackChunkName: "pages/characters" */))
const _73c4eb36 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _e94ddaea = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _d721e7d4 = () => interopDefault(import('..\\pages\\tree-view.vue' /* webpackChunkName: "pages/tree-view" */))
const _7c9d2118 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/characters",
    component: _29176138,
    name: "characters"
  }, {
    path: "/dashboard",
    component: _73c4eb36,
    name: "dashboard"
  }, {
    path: "/login",
    component: _e94ddaea,
    name: "login"
  }, {
    path: "/tree-view",
    component: _d721e7d4,
    name: "tree-view"
  }, {
    path: "/",
    component: _7c9d2118,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
