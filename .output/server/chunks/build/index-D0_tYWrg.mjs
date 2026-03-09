import { _ as __nuxt_component_0 } from './nuxt-link-Rz0oObpD.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { u as useHead } from './v3-Dh1nltNF.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'unhead/utils';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u6211\u7684\u4F5C\u54C1\u96C6 \u2014 Template Gallery",
      meta: [
        {
          name: "description",
          content: "\u7CBE\u5FC3\u6253\u9020\u7684\u7DB2\u7AD9\u6A21\u677F\u4F5C\u54C1\u96C6\uFF0C\u5C55\u793A\u591A\u7A2E\u8A2D\u8A08\u98A8\u683C"
        },
        { property: "og:title", content: "\u6211\u7684\u4F5C\u54C1\u96C6 \u2014 Template Gallery" }
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
        description: "\u6697\u9ED1\u79D1\u6280\u672A\u4F86\u611F \u2500 \u9069\u5408 SaaS\u3001AI \u7522\u54C1\u6216\u79D1\u6280\u516C\u53F8\u7684\u9AD8\u7AEF\u5C55\u793A\u9801\u9762\uFF0C\u9713\u8679\u5149\u6688\uFF0B\u7C92\u5B50\u52D5\u756B\u3002",
        tags: ["\u79D1\u6280", "SaaS", "Dark Mode", "\u52D5\u756B"],
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
        description: "\u73CA\u745A\u7C89\u6EAB\u67D4\u96FB\u5546\u98A8 \u2500 \u8B77\u819A\u54C1\u724C\u5C08\u5C6C\uFF0C\u512A\u96C5\u6392\u7248\u642D\u914D\u6D6E\u52D5\u6A19\u7C64\u3001\u5012\u6578\u8A08\u6642\u8207\u8A55\u50F9\u5340\u584A\u3002",
        tags: ["\u96FB\u5546", "\u8B77\u819A", "Light Mode", "\u7CBE\u7DFB"],
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
        description: "\u9ED1\u91D1\u9AD8\u7AEF 3C \u96FB\u5546 \u2500 \u8033\u6A5F / \u6D88\u8CBB\u96FB\u5B50\u7522\u54C1\u9801\uFF0C\u91D1\u5C6C\u8CEA\u611F\u642D\u914D Bento Grid \u7279\u8272\u5340\u584A\u8207\u898F\u683C\u5C55\u793A\u3002",
        tags: ["\u96FB\u5546", "3C", "Dark Mode", "\u8CEA\u611F"],
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "gallery-root" }, _attrs))} data-v-f57ebb5b><header class="header" data-v-f57ebb5b><div class="header-inner" data-v-f57ebb5b><div class="brand" data-v-f57ebb5b><span class="brand-dot" data-v-f57ebb5b></span><span class="brand-name" data-v-f57ebb5b>Zeona Studio</span></div><p class="header-tagline" data-v-f57ebb5b>\u7CBE\u9078\u7DB2\u7AD9\u6A21\u677F\u4F5C\u54C1\u96C6</p></div></header><section class="hero" data-v-f57ebb5b><div class="hero-bg-grid" data-v-f57ebb5b></div><div class="hero-content" data-v-f57ebb5b><span class="hero-badge" data-v-f57ebb5b>TEMPLATE GALLERY</span><h1 class="hero-title" data-v-f57ebb5b> \u70BA\u60A8\u7684\u54C1\u724C<br data-v-f57ebb5b><span class="gradient-text" data-v-f57ebb5b>\u627E\u5230\u5B8C\u7F8E\u7684\u7B2C\u4E00\u5370\u8C61</span></h1><p class="hero-desc" data-v-f57ebb5b> \u6BCF\u500B\u6A21\u677F\u90FD\u7D93\u904E\u7CBE\u5FC3\u8A2D\u8A08\uFF0C\u5C08\u6CE8\u65BC\u8996\u89BA\u885D\u64CA\u529B\u8207\u4F7F\u7528\u8005\u9AD4\u9A57\u3002<br data-v-f57ebb5b> \u9078\u64C7\u4E00\u500B\uFF0C\u8B93\u60A8\u7684\u54C1\u724C\u812B\u7A4E\u800C\u51FA\u3002 </p><div class="hero-stats" data-v-f57ebb5b><div class="stat" data-v-f57ebb5b><span class="stat-n" data-v-f57ebb5b>${ssrInterpolate(templates.length)}</span><span class="stat-l" data-v-f57ebb5b>\u500B\u6A21\u677F</span></div><div class="stat-divider" data-v-f57ebb5b></div><div class="stat" data-v-f57ebb5b><span class="stat-n" data-v-f57ebb5b>\u221E</span><span class="stat-l" data-v-f57ebb5b>\u53EF\u5BA2\u88FD\u5316</span></div><div class="stat-divider" data-v-f57ebb5b></div><div class="stat" data-v-f57ebb5b><span class="stat-n" data-v-f57ebb5b>100%</span><span class="stat-l" data-v-f57ebb5b>\u97FF\u61C9\u5F0F</span></div></div></div></section><section class="templates-section" data-v-f57ebb5b><div class="section-header" data-v-f57ebb5b><h2 class="section-title" data-v-f57ebb5b>\u6240\u6709\u6A21\u677F</h2><p class="section-sub" data-v-f57ebb5b>\u9EDE\u64CA\u5361\u7247\u9810\u89BD\u5B8C\u6574\u9801\u9762</p></div><div class="templates-grid" data-v-f57ebb5b><!--[-->`);
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
              _push2(`<!--]--></div><div class="preview-grid-lines" data-v-f57ebb5b${_scopeId}></div><div class="preview-badge" data-v-f57ebb5b${_scopeId}><span class="preview-dot" style="${ssrRenderStyle({ background: tpl.color })}" data-v-f57ebb5b${_scopeId}></span> \u5373\u6642\u9810\u89BD </div><div class="preview-overlay" data-v-f57ebb5b${_scopeId}><span class="preview-cta" data-v-f57ebb5b${_scopeId}>\u67E5\u770B\u6A21\u677F \u2192</span></div></div><div class="card-info" data-v-f57ebb5b${_scopeId}><div class="card-top" data-v-f57ebb5b${_scopeId}><h3 class="card-title" style="${ssrRenderStyle({ color: tpl.color })}" data-v-f57ebb5b${_scopeId}>${ssrInterpolate(tpl.title)}</h3><div class="card-arrow" data-v-f57ebb5b${_scopeId}>\u2197</div></div><p class="card-desc" data-v-f57ebb5b${_scopeId}>${ssrInterpolate(tpl.description)}</p><div class="card-tags" data-v-f57ebb5b${_scopeId}><!--[-->`);
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
                    createTextVNode(" \u5373\u6642\u9810\u89BD ")
                  ]),
                  createVNode("div", { class: "preview-overlay" }, [
                    createVNode("span", { class: "preview-cta" }, "\u67E5\u770B\u6A21\u677F \u2192")
                  ])
                ], 4),
                createVNode("div", { class: "card-info" }, [
                  createVNode("div", { class: "card-top" }, [
                    createVNode("h3", {
                      class: "card-title",
                      style: { color: tpl.color }
                    }, toDisplayString(tpl.title), 5),
                    createVNode("div", { class: "card-arrow" }, "\u2197")
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
      _push(`<!--]--><div class="template-card template-card--soon" data-v-f57ebb5b><div class="card-preview" style="${ssrRenderStyle({ "background": "#0d0d0d" })}" data-v-f57ebb5b><div class="soon-text" data-v-f57ebb5b>COMING<br data-v-f57ebb5b>SOON</div></div><div class="card-info" data-v-f57ebb5b><div class="card-top" data-v-f57ebb5b><h3 class="card-title" style="${ssrRenderStyle({ "color": "#444" })}" data-v-f57ebb5b>\u65B0\u6A21\u677F\u5373\u5C07\u63A8\u51FA</h3></div><p class="card-desc" data-v-f57ebb5b>\u6301\u7E8C\u66F4\u65B0\u4E2D\uFF0C\u6B61\u8FCE\u8FFD\u8E64 GitHub \u7372\u53D6\u6700\u65B0\u52D5\u614B\u3002</p></div></div></div></section><footer class="footer" data-v-f57ebb5b><p class="footer-copy" data-v-f57ebb5b> \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Zeona Studio \xB7 Built with Nuxt 3 \xB7 Hosted on Vercel </p><a href="https://github.com" target="_blank" rel="noopener" class="footer-gh" data-v-f57ebb5b><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" data-v-f57ebb5b><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" data-v-f57ebb5b></path></svg> GitHub </a></footer></div>`);
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

export { index as default };
//# sourceMappingURL=index-D0_tYWrg.mjs.map
