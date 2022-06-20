"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var serverRenderer = require("@vue/server-renderer");
var vueRouter = require("vue-router");
var vuex = require("vuex");
var _imports_0 = "/assets/logo.03d6d6da.png";
var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "a[data-v-7382a8bb] {\n  color: #42b983;\n}";
const _sfc_main$4 = {
  __ssrInlineRender: true,
  props: {
    msg: String
  },
  setup(__props) {
    const state = vue.reactive({ count: 0 });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1 data-v-7382a8bb>${serverRenderer.ssrInterpolate(__props.msg)}</h1><p data-v-7382a8bb><a href="https://vitejs.dev/guide/features.html" target="_blank" data-v-7382a8bb> Vite Documentation </a> | <a href="https://v3.vuejs.org/" target="_blank" data-v-7382a8bb>Vue 3 Documentation</a></p><button type="button" data-v-7382a8bb> count is: ${serverRenderer.ssrInterpolate(vue.unref(state).count)}</button><p data-v-7382a8bb> Edit <code data-v-7382a8bb>components/HelloWorld.vue</code> to test hot module replacement. </p><!--]-->`);
    };
  }
};
_sfc_main$4.__scopeId = "data-v-7382a8bb";
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/HelloWorld.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var App_vue_vue_type_style_index_0_lang = "\n#app {\r\n  font-family: Avenir, Helvetica, Arial, sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n  text-align: center;\r\n  color: #2c3e50;\r\n  margin-top: 60px;\n}\r\n";
const _sfc_main$3 = {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = vue.resolveComponent("router-link");
      const _component_router_view = vue.resolveComponent("router-view");
      _push(`<!--[--><img alt="Vue logo"${serverRenderer.ssrRenderAttr("src", _imports_0)}>`);
      _push(serverRenderer.ssrRenderComponent(_component_router_link, { to: "/" }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u9996\u9875`);
          } else {
            return [
              vue.createTextVNode("\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` | `);
      _push(serverRenderer.ssrRenderComponent(_component_router_link, { to: "/about" }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u5173\u4E8E`);
          } else {
            return [
              vue.createTextVNode("\u5173\u4E8E")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
      _push(serverRenderer.ssrRenderComponent(_sfc_main$4, { msg: "Hello Vue 3 + Vite" }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/App.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
/*!
 /**
  * vuex-router-sync v6.0.0-rc.1
  * (c) 2021 Evan You
  * @license MIT
  */
function sync(store, router, options) {
  const moduleName = (options || {}).moduleName || "route";
  store.registerModule(moduleName, {
    namespaced: true,
    state: cloneRoute(router.currentRoute.value),
    mutations: {
      ROUTE_CHANGED(_state, transition) {
        store.state[moduleName] = cloneRoute(transition.to, transition.from);
      }
    }
  });
  let isTimeTraveling = false;
  let currentPath;
  const storeUnwatch = store.watch((state) => state[moduleName], (route) => {
    const { fullPath } = route;
    if (fullPath === currentPath) {
      return;
    }
    if (currentPath != null) {
      isTimeTraveling = true;
      router.push(route);
    }
    currentPath = fullPath;
  }, { flush: "sync" });
  const afterEachUnHook = router.afterEach((to, from) => {
    if (isTimeTraveling) {
      isTimeTraveling = false;
      return;
    }
    currentPath = to.fullPath;
    store.commit(moduleName + "/ROUTE_CHANGED", { to, from });
  });
  return function unsync() {
    afterEachUnHook();
    storeUnwatch();
    store.unregisterModule(moduleName);
  };
}
function cloneRoute(to, from) {
  const clone = {
    name: to.name,
    path: to.path,
    hash: to.hash,
    query: to.query,
    params: to.params,
    fullPath: to.fullPath,
    meta: to.meta
  };
  if (from) {
    clone.from = cloneRoute(from);
  }
  return Object.freeze(clone);
}
const routes = [
  {
    path: "/",
    name: "index",
    component: () => Promise.resolve().then(function() {
      return Home;
    }),
    meta: {
      title: "\u9996\u9875"
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => Promise.resolve().then(function() {
      return About;
    }),
    meta: {
      title: "\u5173\u4E8E"
    }
  },
  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: () => Promise.resolve().then(function() {
      return _404;
    }),
    meta: {
      title: "404 Not Found"
    }
  }
];
var createRouter = () => vueRouter.createRouter({
  history: vueRouter.createMemoryHistory(),
  routes
});
function createStore() {
  return vuex.createStore({
    state: {
      message: "Hello vite2 vue3 ssr"
    },
    mutations: {},
    actions: {
      fetchMessage: ({ state }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            state.message = "Hello vite2 vue3 ssr scss vuex vue-router";
            resolve(0);
          }, 200);
        });
      }
    },
    modules: {}
  });
}
async function render(url, manifest) {
  const router = createRouter();
  const store = createStore();
  sync(store, router);
  const app = vue.createSSRApp(_sfc_main$3);
  app.use(router).use(store);
  router.push(url);
  await router.isReady();
  const to = router.currentRoute;
  const matchedRoute = to.value.matched;
  if (to.value.matched.length === 0) {
    return "";
  }
  const matchedComponents = [];
  matchedRoute.map((route) => {
    matchedComponents.push(...Object.values(route.components));
  });
  const asyncDataFuncs = matchedComponents.map((component) => {
    const asyncData = component.asyncData || null;
    if (asyncData) {
      const config = {
        store,
        route: to
      };
      return asyncData(config);
    }
  });
  await Promise.all(asyncDataFuncs);
  const context = {};
  const appHtml = await serverRenderer.renderToString(app, context);
  const state = store.state;
  return { appHtml, state };
}
var Home_vue_vue_type_style_index_0_scoped_true_lang = "p[data-v-7a40ceaf] {\n  color: #E86487;\n}";
const _sfc_main$2 = {
  setup() {
    const store = vuex.useStore();
    return { store };
  },
  asyncData({ store }) {
    return store.dispatch("fetchMessage");
  }
};
const _withId = /* @__PURE__ */ vue.withScopeId("data-v-7a40ceaf");
const _sfc_ssrRender$2 = /* @__PURE__ */ _withId((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  _push(`<!--[--><h1 data-v-7a40ceaf>home</h1><div data-v-7a40ceaf>Render the page with SSR</div><p data-v-7a40ceaf>msg: ${serverRenderer.ssrInterpolate($setup.store.state.message)}</p><!--]-->`);
});
_sfc_main$2.ssrRender = _sfc_ssrRender$2;
_sfc_main$2.__scopeId = "data-v-7a40ceaf";
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/Home.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Home = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$2
});
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1>about</h1><div>Render the page with SPA</div><!--]-->`);
}
_sfc_main$1.ssrRender = _sfc_ssrRender$1;
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/About.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var About = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$1
});
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>404</div>`);
}
_sfc_main.ssrRender = _sfc_ssrRender;
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/404.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _404 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main
});
exports.render = render;
