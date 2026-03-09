import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { u as useHead } from "./v3-Dh1nltNF.js";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/@unhead+vue@2.1.10_vue@3.5.30_typescript@5.9.3_/node_modules/@unhead/vue/dist/index.mjs";
import "/Users/ziyun/one-page-template/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/h3@1.15.6/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/ziyun/one-page-template/node_modules/defu/dist/defu.mjs";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/ufo@1.6.3/node_modules/ufo/dist/index.mjs";
import "/Users/ziyun/one-page-template/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dark-3c",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "AURA X1 Pro — 次世代降噪耳機",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap"
        }
      ]
    });
    const topbarVisible = ref(true);
    const selectedColor = ref({ key: "obsidian", name: "墨晶黑" });
    const isWished = ref(false);
    const cartCount = ref(1);
    const countdown = ref("47:59:59");
    const openFaq = ref(null);
    ref(false);
    const colors = [
      { key: "obsidian", name: "墨晶黑" },
      { key: "champagne", name: "香檳金" },
      { key: "midnight", name: "午夜藍" },
      { key: "chalk", name: "月光白" }
    ];
    const faqs = [
      { q: "這個價格是限時的嗎？", a: "是的，此早鳥優惠（NT$7,990）僅限發售初期 48 小時，活動結束後將恢復原價 NT$9,490。建議把握時機！" },
      { q: "是否支援多點連線？", a: "是的，X1 Pro 支援 Multipoint 技術，可同時配對 3 台裝置。切換時只需在新設備上播放音樂即可自動跳轉。" },
      { q: "退換貨流程是什麼？", a: "購買後 30 天內，如有任何不滿意均可申請無理由退換。請聯繫客服取得退貨標籤，我們承擔退運費用，退款於 3-5 個工作天內完成。" },
      { q: "保固期是多長？", a: "X1 Pro 提供 2 年全球原廠保固，涵蓋正常使用下的硬體故障。台灣設有在地維修服務中心，保固期內維修費用完全免費。" },
      { q: "幾天可以收到貨？", a: "台灣本島一般 2-3 個工作天送達，離島地區約 5-7 個工作天。下單後 24 小時內出貨，您將收到物流追蹤號碼。" }
    ];
    const tickerItems = ["免運送達全台", "Hi-Res 音質認證", "40dB 主動降噪", "80 小時續航", "限時優惠進行中", "2 年原廠保固", "IP54 防水防汗", "30 天無條件退換", "Multipoint 三設備連線", "早鳥限定 NT$1,500 OFF"];
    const imgFilterMap = {
      obsidian: "sepia(0) brightness(1)",
      champagne: "sepia(.5) saturate(1.5) brightness(1.1)",
      midnight: "sepia(0) hue-rotate(200deg) brightness(.9)",
      chalk: "sepia(.2) brightness(1.3)"
    };
    const productImgFilter = computed(
      () => `drop-shadow(0 30px 80px rgba(200,169,110,.25)) ${imgFilterMap[selectedColor.value.key] || ""}`
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-root" }, _attrs))}><div id="cur"></div><div id="cur-trail"></div>`);
      if (unref(topbarVisible)) {
        _push(`<div id="topbar"> 🔥 限時 48 小時 — 早鳥優惠 NT$1,500 OFF，送專屬收納包！剩餘庫存：47 件 <button class="topbar-close">✕</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<nav><div class="nav-brand">AURA</div><ul class="nav-links"><li><a href="#specs">規格</a></li><li><a href="#features">特色</a></li><li><a href="#reviews">評價</a></li><li><a href="#faq">FAQ</a></li></ul><button class="cart-btn"> 🛒 購物車 <span class="cart-count">${ssrInterpolate(unref(cartCount))}</span></button></nav><section id="hero"><div class="hero-left"><div class="hero-countdown-wrap"><span class="countdown-dot"></span><span class="countdown-label">限時優惠倒數</span><span class="countdown-timer">${ssrInterpolate(unref(countdown))}</span></div><div class="hero-eyebrow">新品發佈 · 2025 旗艦系列</div><h1 class="hero-title">AURA<br><em>X1 PRO</em><br>NOVA</h1><p class="hero-sub">沉浸式 40dB 主動降噪 × 80 小時超長續航 × Hi-Res 認證音質。每一次聆聽，都是與世界的完美隔離。</p><div class="price-block"><span class="price-current">NT$7,990</span><span class="price-original">NT$9,490</span><span class="price-badge">-16%</span></div><div class="option-label">選擇顏色 — <span style="${ssrRenderStyle({ "color": "var(--cream)" })}">${ssrInterpolate(unref(selectedColor).name)}</span></div><div class="color-options"><!--[-->`);
      ssrRenderList(colors, (c) => {
        _push(`<div class="${ssrRenderClass([{ active: unref(selectedColor).key === c.key, [c.key]: true }, "color-swatch"])}"></div>`);
      });
      _push(`<!--]--></div><div class="hero-ctas"><button class="btn-buy">立即購買 — NT$7,990</button><button class="btn-wishlist">${ssrInterpolate(unref(isWished) ? "♥" : "♡")}</button></div><div class="trust-row"><span class="trust-item">🚚 全台免運</span><span class="trust-item">🔄 30 天退換</span><span class="trust-item">🔒 安全付款</span><span class="trust-item">🎁 精品禮盒</span></div></div><div class="hero-right"><div class="product-stage"><div class="stage-ring r1"></div><div class="stage-ring r2"></div><div class="product-img-wrap"><img class="product-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&amp;q=85&amp;auto=format&amp;fit=crop" alt="AURA X1 Pro" style="${ssrRenderStyle({ filter: unref(productImgFilter) })}"></div><div class="stage-dot d1">ANC 40dB</div><div class="stage-dot d2">Hi-Res ✓</div><div class="stage-dot d3">80hr 續航</div><div class="stage-dot d4">BT 5.3</div><div class="stage-shadow"></div></div></div></section><div class="ticker"><div class="ticker-inner"><!--[-->`);
      ssrRenderList(2, (_) => {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(tickerItems, (item) => {
          _push(`<span class="ticker-item">${ssrInterpolate(item)} <span style="${ssrRenderStyle({ "opacity": ".4" })}">✦</span></span>`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]--></div></div><section id="specs"><div class="specs-visual reveal"><img class="specs-img" src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&amp;q=80&amp;auto=format&amp;fit=crop" alt="耳機細節"><div class="specs-img-overlay"></div><div class="specs-corner tl"></div><div class="specs-corner tr"></div><div class="specs-corner bl"></div><div class="specs-corner br"></div></div><div class="reveal" style="${ssrRenderStyle({ "transition-delay": ".15s" })}"><span class="section-eyebrow">核心規格</span><h2 class="section-title">專業<em>音響</em><br>極致<em>工藝</em></h2><p class="section-body">採用 40mm 液晶高分子振膜單體，搭載第三代自研降噪晶片，在嘈雜環境中精準過濾 98% 環境噪音，讓您沉浸於純粹的聲音世界。</p><div class="specs-grid"><div class="spec-card reveal"><div class="spec-val">40dB</div><div class="spec-key">主動降噪</div></div><div class="spec-card reveal" style="${ssrRenderStyle({ "transition-delay": ".05s" })}"><div class="spec-val">80hr</div><div class="spec-key">超長續航</div></div><div class="spec-card reveal" style="${ssrRenderStyle({ "transition-delay": ".1s" })}"><div class="spec-val">40mm</div><div class="spec-key">振膜單體</div></div><div class="spec-card reveal" style="${ssrRenderStyle({ "transition-delay": ".15s" })}"><div class="spec-val">BT5.3</div><div class="spec-key">藍牙版本</div></div></div></div></section><div class="divider"></div><section id="features"><div class="reveal"><span class="section-eyebrow">產品特色</span><h2 class="section-title">為什麼選擇 <em>X1 Pro</em>？</h2></div><div class="bento-grid"><div class="bento-card reveal"><div class="bento-icon">🎵</div><div class="bento-title">Hi-Res 認證</div><div class="bento-desc">通過日本音響學會 Hi-Res Audio 認證，支援 LDAC 96kHz/990kbps 無線傳輸，還原錄音棚級別的細節。</div><div class="bento-num">01</div></div><div class="bento-card reveal" style="${ssrRenderStyle({ "transition-delay": ".08s" })}"><div class="bento-icon">🔇</div><div class="bento-title">三段降噪模式</div><div class="bento-desc">深度降噪 / 環境透傳 / 自適應模式，一鍵切換，適應各種場景需求。</div><div class="bento-num">02</div></div><div class="bento-card reveal" style="${ssrRenderStyle({ "transition-delay": ".16s" })}"><div class="bento-icon">⚡</div><div class="bento-title">急速快充</div><div class="bento-desc">充電 10 分鐘，聆聽 4 小時。USB-C 滿電僅需 90 分鐘，無線充電同步支援。</div><div class="bento-num">03</div></div><div class="bento-card feature-img-card span2 reveal" style="${ssrRenderStyle({ "transition-delay": ".1s" })}"><img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&amp;q=80&amp;auto=format&amp;fit=crop" alt="耳機配戴情境"><div class="feature-img-overlay"></div><div class="feature-img-label">沉浸體驗，<em style="${ssrRenderStyle({ "color": "var(--gold)" })}">從此開始</em></div></div><div class="bento-card reveal" style="${ssrRenderStyle({ "transition-delay": ".2s" })}"><div class="bento-icon">🎙️</div><div class="bento-title">六麥降噪通話</div><div class="bento-desc">六組指向性麥克風陣列，AI 演算法即時消除風聲與背景雜音。</div><div class="bento-num">04</div></div><div class="bento-card reveal" style="${ssrRenderStyle({ "transition-delay": ".28s" })}"><div class="bento-icon">🏋️</div><div class="bento-title">IP54 防水防汗</div><div class="bento-desc">通過工業級防塵防水認證，運動出汗或突發雨天都能安心使用。</div><div class="bento-num">05</div></div><div class="bento-card reveal" style="${ssrRenderStyle({ "transition-delay": ".36s" })}"><div class="bento-icon">📱</div><div class="bento-title">多設備連線</div><div class="bento-desc">同時配對 3 台設備，手機 / 電腦 / 平板無縫切換，Multipoint 一鍵跳轉。</div><div class="bento-num">06</div></div></div></section><div class="divider"></div><section id="reviews"><div class="reviews-header reveal"><div><span class="section-eyebrow">真實評價</span><h2 class="section-title">用戶怎麼說？</h2></div><div style="${ssrRenderStyle({ "text-align": "right" })}"><div class="rating-big">4.9</div><div class="rating-stars">★★★★★</div><div class="rating-count">基於 2,847 則評價</div></div></div><div class="reviews-grid"><div class="review-card reveal"><div class="review-stars">★★★★★</div><p class="review-body">「降噪效果超乎預期！搭地鐵通勤完全聽不到廣播聲，音質更是沒話說，低頻下潛深、人聲清晰，這個價位根本找不到對手。」</p><div class="review-author"><img class="author-img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&amp;h=80&amp;fit=crop&amp;crop=face&amp;auto=format" alt="用戶"><div><div class="author-name">陳彥廷</div><div class="author-meta">🎵 音樂製作人 · <span class="verified">✓ 已驗證購買</span></div></div></div></div><div class="review-card reveal" style="${ssrRenderStyle({ "transition-delay": ".1s" })}"><div class="review-stars">★★★★★</div><p class="review-body">「作為長時間使用電腦工作的人，這副耳機真的救了我。配戴舒適度極佳，戴 8 小時耳朵不痛，通話品質同事都說非常清晰。強烈推薦！」</p><div class="review-author"><img class="author-img" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&amp;h=80&amp;fit=crop&amp;crop=face&amp;auto=format" alt="用戶"><div><div class="author-name">林宜庭</div><div class="author-meta">💻 軟體工程師 · <span class="verified">✓ 已驗證購買</span></div></div></div></div><div class="review-card reveal" style="${ssrRenderStyle({ "transition-delay": ".2s" })}"><div class="review-stars">★★★★★</div><p class="review-body">「從開箱到使用全程驚喜。包裝質感高級、附件完整，App 的 EQ 調整很直覺。80 小時續航完全不用每天煩惱充電。」</p><div class="review-author"><img class="author-img" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&amp;h=80&amp;fit=crop&amp;crop=face&amp;auto=format" alt="用戶"><div><div class="author-name">王冠宇</div><div class="author-meta">✈️ 商務旅行者 · <span class="verified">✓ 已驗證購買</span></div></div></div></div></div><div class="review-aggregate reveal"><div class="agg-col"><div class="agg-val">4.9</div><div class="agg-label">綜合評分</div></div><div class="agg-divider"></div><div class="agg-col"><div class="agg-val">2,847</div><div class="agg-label">評價數量</div></div><div class="agg-divider"></div><div class="agg-col"><div class="agg-val">97%</div><div class="agg-label">推薦比率</div></div><div class="agg-divider"></div><div class="bar-ratings"><div class="bar-row"><span class="bar-label">5★</span><div class="bar-track"><div class="bar-fill" style="${ssrRenderStyle({ "width": "88%" })}"></div></div><span class="bar-pct">88%</span></div><div class="bar-row"><span class="bar-label">4★</span><div class="bar-track"><div class="bar-fill" style="${ssrRenderStyle({ "width": "9%", "opacity": ".7" })}"></div></div><span class="bar-pct">9%</span></div><div class="bar-row"><span class="bar-label">3★</span><div class="bar-track"><div class="bar-fill" style="${ssrRenderStyle({ "width": "2%", "opacity": ".5" })}"></div></div><span class="bar-pct">2%</span></div><div class="bar-row"><span class="bar-label">2★</span><div class="bar-track"><div class="bar-fill" style="${ssrRenderStyle({ "width": "1%", "opacity": ".3" })}"></div></div><span class="bar-pct">1%</span></div><div class="bar-row"><span class="bar-label">1★</span><div class="bar-track"><div class="bar-fill" style="${ssrRenderStyle({ "width": ".5%", "opacity": ".2" })}"></div></div><span class="bar-pct">0%</span></div></div></div></section><div class="divider"></div><section id="bundle"><div class="reveal"><span class="section-eyebrow">搭配推薦</span><h2 class="section-title">升級您的<em>音樂體驗</em></h2></div><div class="bundle-grid"><div class="bundle-card reveal"><img class="bundle-img" src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&amp;q=80&amp;auto=format&amp;fit=crop" alt="收納包"><div><div class="bundle-name">AURA 硬殼保護收納包</div><div class="bundle-desc">EVA 高密度防摔材質，內附配件網袋，完美保護您的 X1 Pro。</div><div><span class="bundle-price">NT$890</span><span class="bundle-orig">NT$1,290</span></div></div></div><div class="bundle-card reveal" style="${ssrRenderStyle({ "transition-delay": ".1s" })}"><img class="bundle-img" src="https://images.unsplash.com/photo-1583394293214-5c9ff89c40bc?w=200&amp;q=80&amp;auto=format&amp;fit=crop" alt="耳機架"><div><div class="bundle-name">鋁合金桌面耳機架</div><div class="bundle-desc">航太鋁合金一體成型，質感收納展示，讓桌面更整齊有型。</div><div><span class="bundle-price">NT$1,290</span><span class="bundle-orig">NT$1,890</span></div></div></div></div></section><section id="checkout"><div class="checkout-wrap"><div class="reveal"><span class="section-eyebrow">安全結帳</span><h2 class="section-title">完成您的<em>訂單</em></h2></div><div class="checkout-form reveal"><div class="form-section"><div class="form-section-title">收件資訊</div><div class="form-row"><div class="form-group"><label class="form-label">姓氏</label><input class="form-input" placeholder="王"></div><div class="form-group"><label class="form-label">名字</label><input class="form-input" placeholder="小明"></div></div><div class="form-group"><label class="form-label">電子郵件</label><input class="form-input" type="email" placeholder="your@email.com"></div><div class="form-group"><label class="form-label">手機號碼</label><input class="form-input" type="tel" placeholder="0912 345 678"></div><div class="form-group"><label class="form-label">收件地址</label><input class="form-input" placeholder="台北市信義區信義路五段 7 號"></div><div class="form-row"><div class="form-group"><label class="form-label">城市</label><input class="form-input" placeholder="台北市"></div><div class="form-group"><label class="form-label">郵遞區號</label><input class="form-input" placeholder="110"></div></div><div class="form-section-title" style="${ssrRenderStyle({ "margin-top": "28px" })}">付款方式</div><div class="form-group"><label class="form-label">卡號</label><input class="form-input" placeholder="1234 5678 9012 3456"></div><div class="form-row"><div class="form-group"><label class="form-label">到期日</label><input class="form-input" placeholder="MM / YY"></div><div class="form-group"><label class="form-label">安全碼</label><input class="form-input" placeholder="CVC"></div></div></div><div class="form-section"><div class="form-section-title">訂單明細</div><div class="order-item"><img class="order-item-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&amp;q=80&amp;auto=format&amp;fit=crop" alt="AURA X1 Pro"><div class="order-item-info"><div class="order-item-name">AURA X1 Pro Nova</div><div class="order-item-variant">${ssrInterpolate(unref(selectedColor).name)} × 1</div></div><div class="order-item-price">NT$7,990</div></div><div class="order-totals"><div class="total-row"><span>小計</span><span>NT$7,990</span></div><div class="total-row"><span>運費</span><span style="${ssrRenderStyle({ "color": "var(--green)" })}">免費</span></div><div class="total-row"><span>早鳥折扣</span><span style="${ssrRenderStyle({ "color": "var(--green)" })}">－NT$1,500</span></div><div class="total-row grand"><span>總計</span><span class="amount">NT$6,490</span></div></div><button class="submit-btn">立即付款 — NT$6,490</button><div class="secure-note">🔒 SSL 安全加密 · 支援信用卡 / Apple Pay / LINE Pay</div><div style="${ssrRenderStyle({ "margin-top": "24px", "padding": "16px", "background": "rgba(200,169,110,.06)", "border": "1px solid rgba(200,169,110,.2)", "border-radius": "2px" })}"><div style="${ssrRenderStyle({ "font-size": ".78rem", "color": "var(--gold)", "letter-spacing": ".1em", "margin-bottom": "8px", "font-weight": "600" })}">🎁 您的訂單包含</div><div style="${ssrRenderStyle({ "font-size": ".8rem", "color": "var(--muted)", "line-height": "1.9" })}">✓ AURA X1 Pro Nova 耳機本體<br>✓ USB-C 充電線<br>✓ 3.5mm 音訊線<br>✓ 飛機轉接頭<br>✓ 精品磁吸禮盒<br>✓ 2 年原廠保固</div></div></div></div></div></section><section id="faq"><div style="${ssrRenderStyle({ "margin-bottom": "48px" })}" class="reveal"><span class="section-eyebrow">常見問題</span><h2 class="section-title">您可能想知道</h2></div><div><!--[-->`);
      ssrRenderList(faqs, (item, i) => {
        _push(`<div class="${ssrRenderClass([{ open: unref(openFaq) === i }, "faq-item"])}"><button class="faq-q">${ssrInterpolate(item.q)}<span class="faq-arrow">+</span></button><div class="faq-a">${ssrInterpolate(item.a)}</div></div>`);
      });
      _push(`<!--]--></div></section><footer><div class="footer-brand">AURA</div><div class="footer-links"><a href="#">隱私政策</a><a href="#">服務條款</a><a href="#">聯絡客服</a></div><div>© 2025 AURA Audio · 圖片來源：Unsplash (CC0)</div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/templates/dark-3c.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=dark-3c-DXE6POka.js.map
