import { _ as __nuxt_component_0 } from "./nuxt-link-Rz0oObpD.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { u as useHead } from "./v3-Dh1nltNF.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/ufo@1.6.3/node_modules/ufo/dist/index.mjs";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/@unhead+vue@2.1.10_vue@3.5.30_typescript@5.9.3_/node_modules/@unhead/vue/dist/index.mjs";
import "/Users/ziyun/one-page-template/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/h3@1.15.6/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/ziyun/one-page-template/node_modules/defu/dist/defu.mjs";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "我的作品集 — Template Gallery",
      meta: [
        {
          name: "description",
          content: "精心打造的網站模板作品集，展示多種設計風格"
        },
        { property: "og:title", content: "我的作品集 — Template Gallery" }
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap"
        }
      ]
    });
    const templates = [
      {
        id: "dark-tech",
        title: "Dark Tech",
        description: "暗黑科技未來感 ─ 適合 SaaS、AI 產品或科技公司的高端展示頁面，霓虹光暈＋粒子動畫。",
        tags: ["科技", "SaaS", "Dark Mode", "動畫"],
        color: "#00f5ff",
        bg: "linear-gradient(135deg, #020408 0%, #0a1a2e 100%)",
        previewPath: "/templates/dark-tech",
        preview: {
          orbs: ["#00f5ff", "#ff006e", "#ffd60a"]
        }
      },
      {
        id: "light-skincare",
        title: "Light Skincare",
        description: "珊瑚粉溫柔電商風 ─ 護膚品牌專屬，優雅排版搭配浮動標籤、倒數計時與評價區塊。",
        tags: ["電商", "護膚", "Light Mode", "精緻"],
        color: "#FF6B47",
        bg: "linear-gradient(135deg, #FFF8F5 0%, #F5EDE6 100%)",
        previewPath: "/templates/light-skincare",
        preview: {
          orbs: ["#FF6B47", "#FF8E6E", "#FFF0EC"]
        }
      },
      {
        id: "dark-3c",
        title: "Dark 3C",
        description: "黑金高端 3C 電商 ─ 耳機 / 消費電子產品頁，金屬質感搭配 Bento Grid 特色區塊與規格展示。",
        tags: ["電商", "3C", "Dark Mode", "質感"],
        color: "#c8a96e",
        bg: "linear-gradient(135deg, #0a0a0c 0%, #111116 100%)",
        previewPath: "/templates/dark-3c",
        preview: {
          orbs: ["#c8a96e", "#e8cfa0", "#1a1a22"]
        }
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "gallery-root" }, _attrs))} data-v-f57ebb5b><header class="header" data-v-f57ebb5b><div class="header-inner" data-v-f57ebb5b><div class="brand" data-v-f57ebb5b><span class="brand-dot" data-v-f57ebb5b></span><span class="brand-name" data-v-f57ebb5b>Zeona Studio</span></div><p class="header-tagline" data-v-f57ebb5b>精選網站模板作品集</p></div></header><section class="hero" data-v-f57ebb5b><div class="hero-bg-grid" data-v-f57ebb5b></div><div class="hero-content" data-v-f57ebb5b><span class="hero-badge" data-v-f57ebb5b>TEMPLATE GALLERY</span><h1 class="hero-title" data-v-f57ebb5b> 為您的品牌<br data-v-f57ebb5b><span class="gradient-text" data-v-f57ebb5b>找到完美的第一印象</span></h1><p class="hero-desc" data-v-f57ebb5b> 每個模板都經過精心設計，專注於視覺衝擊力與使用者體驗。<br data-v-f57ebb5b> 選擇一個，讓您的品牌脫穎而出。 </p><div class="hero-stats" data-v-f57ebb5b><div class="stat" data-v-f57ebb5b><span class="stat-n" data-v-f57ebb5b>${ssrInterpolate(templates.length)}</span><span class="stat-l" data-v-f57ebb5b>個模板</span></div><div class="stat-divider" data-v-f57ebb5b></div><div class="stat" data-v-f57ebb5b><span class="stat-n" data-v-f57ebb5b>∞</span><span class="stat-l" data-v-f57ebb5b>可客製化</span></div><div class="stat-divider" data-v-f57ebb5b></div><div class="stat" data-v-f57ebb5b><span class="stat-n" data-v-f57ebb5b>100%</span><span class="stat-l" data-v-f57ebb5b>響應式</span></div></div></div></section><section class="templates-section" data-v-f57ebb5b><div class="section-header" data-v-f57ebb5b><h2 class="section-title" data-v-f57ebb5b>所有模板</h2><p class="section-sub" data-v-f57ebb5b>點擊卡片預覽完整頁面</p></div><div class="templates-grid" data-v-f57ebb5b><!--[-->`);
      ssrRenderList(templates, (tpl) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: tpl.id,
          to: tpl.previewPath,
          class: "template-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-preview" style="${ssrRenderStyle({ background: tpl.bg })}" data-v-f57ebb5b${_scopeId}><div class="preview-orbs" data-v-f57ebb5b${_scopeId}><!--[-->`);
              ssrRenderList(tpl.preview.orbs, (c, i) => {
                _push2(`<div class="preview-orb" style="${ssrRenderStyle({
                  background: c,
                  "--delay": `${i * 0.8}s`,
                  "--i": i
                })}" data-v-f57ebb5b${_scopeId}></div>`);
              });
              _push2(`<!--]--></div><div class="preview-grid-lines" data-v-f57ebb5b${_scopeId}></div><div class="preview-badge" data-v-f57ebb5b${_scopeId}><span class="preview-dot" style="${ssrRenderStyle({ background: tpl.color })}" data-v-f57ebb5b${_scopeId}></span> 即時預覽 </div><div class="preview-overlay" data-v-f57ebb5b${_scopeId}><span class="preview-cta" data-v-f57ebb5b${_scopeId}>查看模板 →</span></div></div><div class="card-info" data-v-f57ebb5b${_scopeId}><div class="card-top" data-v-f57ebb5b${_scopeId}><h3 class="card-title" style="${ssrRenderStyle({ color: tpl.color })}" data-v-f57ebb5b${_scopeId}>${ssrInterpolate(tpl.title)}</h3><div class="card-arrow" data-v-f57ebb5b${_scopeId}>↗</div></div><p class="card-desc" data-v-f57ebb5b${_scopeId}>${ssrInterpolate(tpl.description)}</p><div class="card-tags" data-v-f57ebb5b${_scopeId}><!--[-->`);
              ssrRenderList(tpl.tags, (tag) => {
                _push2(`<span class="tag" data-v-f57ebb5b${_scopeId}>${ssrInterpolate(tag)}</span>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              return [
                createVNode("div", {
                  class: "card-preview",
                  style: { background: tpl.bg }
                }, [
                  createVNode("div", { class: "preview-orbs" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(tpl.preview.orbs, (c, i) => {
                      return openBlock(), createBlock("div", {
                        key: i,
                        class: "preview-orb",
                        style: {
                          background: c,
                          "--delay": `${i * 0.8}s`,
                          "--i": i
                        }
                      }, null, 4);
                    }), 128))
                  ]),
                  createVNode("div", { class: "preview-grid-lines" }),
                  createVNode("div", { class: "preview-badge" }, [
                    createVNode("span", {
                      class: "preview-dot",
                      style: { background: tpl.color }
                    }, null, 4),
                    createTextVNode(" 即時預覽 ")
                  ]),
                  createVNode("div", { class: "preview-overlay" }, [
                    createVNode("span", { class: "preview-cta" }, "查看模板 →")
                  ])
                ], 4),
                createVNode("div", { class: "card-info" }, [
                  createVNode("div", { class: "card-top" }, [
                    createVNode("h3", {
                      class: "card-title",
                      style: { color: tpl.color }
                    }, toDisplayString(tpl.title), 5),
                    createVNode("div", { class: "card-arrow" }, "↗")
                  ]),
                  createVNode("p", { class: "card-desc" }, toDisplayString(tpl.description), 1),
                  createVNode("div", { class: "card-tags" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(tpl.tags, (tag) => {
                      return openBlock(), createBlock("span", {
                        key: tag,
                        class: "tag"
                      }, toDisplayString(tag), 1);
                    }), 128))
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><div class="template-card template-card--soon" data-v-f57ebb5b><div class="card-preview" style="${ssrRenderStyle({ "background": "#0d0d0d" })}" data-v-f57ebb5b><div class="soon-text" data-v-f57ebb5b>COMING<br data-v-f57ebb5b>SOON</div></div><div class="card-info" data-v-f57ebb5b><div class="card-top" data-v-f57ebb5b><h3 class="card-title" style="${ssrRenderStyle({ "color": "#444" })}" data-v-f57ebb5b>新模板即將推出</h3></div><p class="card-desc" data-v-f57ebb5b>持續更新中，歡迎追蹤 GitHub 獲取最新動態。</p></div></div></div></section><footer class="footer" data-v-f57ebb5b><p class="footer-copy" data-v-f57ebb5b> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Zeona Studio · Built with Nuxt 3 · Hosted on Vercel </p><a href="https://github.com" target="_blank" rel="noopener" class="footer-gh" data-v-f57ebb5b><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" data-v-f57ebb5b><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" data-v-f57ebb5b></path></svg> GitHub </a></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f57ebb5b"]]);
export {
  index as default
};
//# sourceMappingURL=index-D0_tYWrg.js.map
