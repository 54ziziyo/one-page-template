<script setup lang="ts">
useHead({
  title: 'AURA X1 Pro — 次世代降噪耳機',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap',
    },
  ],
});

const topbarVisible = ref(true);
const selectedColor = ref({ key: 'obsidian', name: '墨晶黑' });
const isWished = ref(false);
const cartCount = ref(1);
const countdown = ref('47:59:59');
const openFaq = ref<number | null>(null);
const orderDone = ref(false);

const colors = [
  { key: 'obsidian', name: '墨晶黑' },
  { key: 'champagne', name: '香檳金' },
  { key: 'midnight', name: '午夜藍' },
  { key: 'chalk', name: '月光白' },
];

const faqs = [
  {
    q: '這個價格是限時的嗎？',
    a: '是的，此早鳥優惠（NT$7,990）僅限發售初期 48 小時，活動結束後將恢復原價 NT$9,490。建議把握時機！',
  },
  {
    q: '是否支援多點連線？',
    a: '是的，X1 Pro 支援 Multipoint 技術，可同時配對 3 台裝置。切換時只需在新設備上播放音樂即可自動跳轉。',
  },
  {
    q: '退換貨流程是什麼？',
    a: '購買後 30 天內，如有任何不滿意均可申請無理由退換。請聯繫客服取得退貨標籤，我們承擔退運費用，退款於 3-5 個工作天內完成。',
  },
  {
    q: '保固期是多長？',
    a: 'X1 Pro 提供 2 年全球原廠保固，涵蓋正常使用下的硬體故障。台灣設有在地維修服務中心，保固期內維修費用完全免費。',
  },
  {
    q: '幾天可以收到貨？',
    a: '台灣本島一般 2-3 個工作天送達，離島地區約 5-7 個工作天。下單後 24 小時內出貨，您將收到物流追蹤號碼。',
  },
];

const tickerItems = [
  '免運送達全台',
  'Hi-Res 音質認證',
  '40dB 主動降噪',
  '80 小時續航',
  '限時優惠進行中',
  '2 年原廠保固',
  'IP54 防水防汗',
  '30 天無條件退換',
  'Multipoint 三設備連線',
  '早鳥限定 NT$1,500 OFF',
];

const imgFilterMap: Record<string, string> = {
  obsidian: 'sepia(0) brightness(1)',
  champagne: 'sepia(.5) saturate(1.5) brightness(1.1)',
  midnight: 'sepia(0) hue-rotate(200deg) brightness(.9)',
  chalk: 'sepia(.2) brightness(1.3)',
};

const productImgFilter = computed(
  () =>
    `drop-shadow(0 30px 80px rgba(200,169,110,.25)) ${imgFilterMap[selectedColor.value.key] || ''}`,
);

function selectColor(c: { key: string; name: string }) {
  selectedColor.value = c;
}

function toggleWish() {
  isWished.value = !isWished.value;
}

function addToCart() {
  cartCount.value += 1;
}

function scrollToCheckout() {
  document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
  addToCart();
}

function handleCheckout(btn: HTMLButtonElement) {
  btn.textContent = '⏳ 處理中…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✅ 訂單送出成功！';
    btn.style.background = '#22c55e';
  }, 1800);
}

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i;
}

onMounted(() => {
  // Cursor
  const cur = document.getElementById('cur');
  const trail = document.getElementById('cur-trail');
  if (cur && trail) {
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
    });
    (function loop() {
      tx += (mx - tx) * 0.13;
      ty += (my - ty) * 0.13;
      trail.style.left = tx + 'px';
      trail.style.top = ty + 'px';
      requestAnimationFrame(loop);
    })();
    document
      .querySelectorAll<HTMLElement>(
        'a,button,.bento-card,.review-card,.spec-card,.bundle-card',
      )
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cur.style.width = '5px';
          cur.style.height = '5px';
          trail.style.width = '52px';
          trail.style.height = '52px';
        });
        el.addEventListener('mouseleave', () => {
          cur.style.width = '10px';
          cur.style.height = '10px';
          trail.style.width = '36px';
          trail.style.height = '36px';
        });
      });
  }

  // Countdown
  const end = Date.now() + 48 * 3600 * 1000;
  const pad = (n: number) => String(n).padStart(2, '0');
  setInterval(() => {
    const d = Math.max(0, end - Date.now());
    countdown.value = `${pad(Math.floor(d / 3600000))}:${pad(Math.floor((d % 3600000) / 60000))}:${pad(Math.floor((d % 60000) / 1000))}`;
  }, 1000);

  // Bento mouse glow
  document.querySelectorAll<HTMLElement>('.bento-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty(
        '--mx',
        ((e.clientX - r.left) / r.width) * 100 + '%',
      );
      card.style.setProperty(
        '--my',
        ((e.clientY - r.top) / r.height) * 100 + '%',
      );
    });
  });

  // Reveal
  const ro = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('up');
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll('.reveal').forEach((el) => ro.observe(el));
});
</script>

<template>
  <div class="page-root">
    <div id="cur" />
    <div id="cur-trail" />

    <!-- TOPBAR -->
    <div v-if="topbarVisible" id="topbar">
      🔥 限時 48 小時 — 早鳥優惠 NT$1,500 OFF，送專屬收納包！剩餘庫存：47 件
      <button class="topbar-close" @click="topbarVisible = false">✕</button>
    </div>

    <!-- NAV -->
    <nav>
      <div class="nav-brand">AURA</div>
      <ul class="nav-links">
        <li><a href="#specs">規格</a></li>
        <li><a href="#features">特色</a></li>
        <li><a href="#reviews">評價</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <button class="cart-btn" @click="scrollToCheckout">
        🛒 購物車 <span class="cart-count">{{ cartCount }}</span>
      </button>
    </nav>

    <!-- HERO -->
    <section id="hero">
      <div class="hero-left">
        <div class="hero-countdown-wrap">
          <span class="countdown-dot" />
          <span class="countdown-label">限時優惠倒數</span>
          <span class="countdown-timer">{{ countdown }}</span>
        </div>
        <div class="hero-eyebrow">新品發佈 · 2025 旗艦系列</div>
        <h1 class="hero-title">AURA<br /><em>X1 PRO</em><br />NOVA</h1>
        <p class="hero-sub">
          沉浸式 40dB 主動降噪 × 80 小時超長續航 × Hi-Res
          認證音質。每一次聆聽，都是與世界的完美隔離。
        </p>
        <div class="price-block">
          <span class="price-current">NT$7,990</span>
          <span class="price-original">NT$9,490</span>
          <span class="price-badge">-16%</span>
        </div>
        <div class="option-label">
          選擇顏色 —
          <span style="color: var(--cream)">{{ selectedColor.name }}</span>
        </div>
        <div class="color-options">
          <div
            v-for="c in colors"
            :key="c.key"
            class="color-swatch"
            :class="{ active: selectedColor.key === c.key, [c.key]: true }"
            @click="selectColor(c)"
          />
        </div>
        <div class="hero-ctas">
          <button class="btn-buy" @click="scrollToCheckout">
            立即購買 — NT$7,990
          </button>
          <button class="btn-wishlist" @click="toggleWish">
            {{ isWished ? '♥' : '♡' }}
          </button>
        </div>
        <div class="trust-row">
          <span class="trust-item">🚚 全台免運</span>
          <span class="trust-item">🔄 30 天退換</span>
          <span class="trust-item">🔒 安全付款</span>
          <span class="trust-item">🎁 精品禮盒</span>
        </div>
      </div>

      <div class="hero-right">
        <div class="product-stage">
          <div class="stage-ring r1" />
          <div class="stage-ring r2" />
          <div class="product-img-wrap">
            <img
              class="product-img"
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85&auto=format&fit=crop"
              alt="AURA X1 Pro"
              :style="{ filter: productImgFilter }"
            />
          </div>
          <div class="stage-dot d1">ANC 40dB</div>
          <div class="stage-dot d2">Hi-Res ✓</div>
          <div class="stage-dot d3">80hr 續航</div>
          <div class="stage-dot d4">BT 5.3</div>
          <div class="stage-shadow" />
        </div>
      </div>
    </section>

    <!-- TICKER -->
    <div class="ticker">
      <div class="ticker-inner">
        <template v-for="_ in 2" :key="_">
          <span v-for="item in tickerItems" :key="item" class="ticker-item"
            >{{ item }} <span style="opacity: 0.4">✦</span></span
          >
        </template>
      </div>
    </div>

    <!-- SPECS -->
    <section id="specs">
      <div class="specs-visual reveal">
        <img
          class="specs-img"
          src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80&auto=format&fit=crop"
          alt="耳機細節"
        />
        <div class="specs-img-overlay" />
        <div class="specs-corner tl" />
        <div class="specs-corner tr" />
        <div class="specs-corner bl" />
        <div class="specs-corner br" />
      </div>
      <div class="reveal" style="transition-delay: 0.15s">
        <span class="section-eyebrow">核心規格</span>
        <h2 class="section-title">專業<em>音響</em><br />極致<em>工藝</em></h2>
        <p class="section-body">
          採用 40mm
          液晶高分子振膜單體，搭載第三代自研降噪晶片，在嘈雜環境中精準過濾 98%
          環境噪音，讓您沉浸於純粹的聲音世界。
        </p>
        <div class="specs-grid">
          <div class="spec-card reveal">
            <div class="spec-val">40dB</div>
            <div class="spec-key">主動降噪</div>
          </div>
          <div class="spec-card reveal" style="transition-delay: 0.05s">
            <div class="spec-val">80hr</div>
            <div class="spec-key">超長續航</div>
          </div>
          <div class="spec-card reveal" style="transition-delay: 0.1s">
            <div class="spec-val">40mm</div>
            <div class="spec-key">振膜單體</div>
          </div>
          <div class="spec-card reveal" style="transition-delay: 0.15s">
            <div class="spec-val">BT5.3</div>
            <div class="spec-key">藍牙版本</div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider" />

    <!-- FEATURES -->
    <section id="features">
      <div class="reveal">
        <span class="section-eyebrow">產品特色</span>
        <h2 class="section-title">為什麼選擇 <em>X1 Pro</em>？</h2>
      </div>
      <div class="bento-grid">
        <div class="bento-card reveal">
          <div class="bento-icon">🎵</div>
          <div class="bento-title">Hi-Res 認證</div>
          <div class="bento-desc">
            通過日本音響學會 Hi-Res Audio 認證，支援 LDAC 96kHz/990kbps
            無線傳輸，還原錄音棚級別的細節。
          </div>
          <div class="bento-num">01</div>
        </div>
        <div class="bento-card reveal" style="transition-delay: 0.08s">
          <div class="bento-icon">🔇</div>
          <div class="bento-title">三段降噪模式</div>
          <div class="bento-desc">
            深度降噪 / 環境透傳 / 自適應模式，一鍵切換，適應各種場景需求。
          </div>
          <div class="bento-num">02</div>
        </div>
        <div class="bento-card reveal" style="transition-delay: 0.16s">
          <div class="bento-icon">⚡</div>
          <div class="bento-title">急速快充</div>
          <div class="bento-desc">
            充電 10 分鐘，聆聽 4 小時。USB-C 滿電僅需 90
            分鐘，無線充電同步支援。
          </div>
          <div class="bento-num">03</div>
        </div>
        <div
          class="bento-card feature-img-card span2 reveal"
          style="transition-delay: 0.1s"
        >
          <img
            src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&q=80&auto=format&fit=crop"
            alt="耳機配戴情境"
          />
          <div class="feature-img-overlay" />
          <div class="feature-img-label">
            沉浸體驗，<em style="color: var(--gold)">從此開始</em>
          </div>
        </div>
        <div class="bento-card reveal" style="transition-delay: 0.2s">
          <div class="bento-icon">🎙️</div>
          <div class="bento-title">六麥降噪通話</div>
          <div class="bento-desc">
            六組指向性麥克風陣列，AI 演算法即時消除風聲與背景雜音。
          </div>
          <div class="bento-num">04</div>
        </div>
        <div class="bento-card reveal" style="transition-delay: 0.28s">
          <div class="bento-icon">🏋️</div>
          <div class="bento-title">IP54 防水防汗</div>
          <div class="bento-desc">
            通過工業級防塵防水認證，運動出汗或突發雨天都能安心使用。
          </div>
          <div class="bento-num">05</div>
        </div>
        <div class="bento-card reveal" style="transition-delay: 0.36s">
          <div class="bento-icon">📱</div>
          <div class="bento-title">多設備連線</div>
          <div class="bento-desc">
            同時配對 3 台設備，手機 / 電腦 / 平板無縫切換，Multipoint 一鍵跳轉。
          </div>
          <div class="bento-num">06</div>
        </div>
      </div>
    </section>

    <div class="divider" />

    <!-- REVIEWS -->
    <section id="reviews">
      <div class="reviews-header reveal">
        <div>
          <span class="section-eyebrow">真實評價</span>
          <h2 class="section-title">用戶怎麼說？</h2>
        </div>
        <div style="text-align: right">
          <div class="rating-big">4.9</div>
          <div class="rating-stars">★★★★★</div>
          <div class="rating-count">基於 2,847 則評價</div>
        </div>
      </div>
      <div class="reviews-grid">
        <div class="review-card reveal">
          <div class="review-stars">★★★★★</div>
          <p class="review-body">
            「降噪效果超乎預期！搭地鐵通勤完全聽不到廣播聲，音質更是沒話說，低頻下潛深、人聲清晰，這個價位根本找不到對手。」
          </p>
          <div class="review-author">
            <img
              class="author-img"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format"
              alt="用戶"
            />
            <div>
              <div class="author-name">陳彥廷</div>
              <div class="author-meta">
                🎵 音樂製作人 · <span class="verified">✓ 已驗證購買</span>
              </div>
            </div>
          </div>
        </div>
        <div class="review-card reveal" style="transition-delay: 0.1s">
          <div class="review-stars">★★★★★</div>
          <p class="review-body">
            「作為長時間使用電腦工作的人，這副耳機真的救了我。配戴舒適度極佳，戴
            8 小時耳朵不痛，通話品質同事都說非常清晰。強烈推薦！」
          </p>
          <div class="review-author">
            <img
              class="author-img"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&auto=format"
              alt="用戶"
            />
            <div>
              <div class="author-name">林宜庭</div>
              <div class="author-meta">
                💻 軟體工程師 · <span class="verified">✓ 已驗證購買</span>
              </div>
            </div>
          </div>
        </div>
        <div class="review-card reveal" style="transition-delay: 0.2s">
          <div class="review-stars">★★★★★</div>
          <p class="review-body">
            「從開箱到使用全程驚喜。包裝質感高級、附件完整，App 的 EQ
            調整很直覺。80 小時續航完全不用每天煩惱充電。」
          </p>
          <div class="review-author">
            <img
              class="author-img"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format"
              alt="用戶"
            />
            <div>
              <div class="author-name">王冠宇</div>
              <div class="author-meta">
                ✈️ 商務旅行者 · <span class="verified">✓ 已驗證購買</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review-aggregate reveal">
        <div class="agg-col">
          <div class="agg-val">4.9</div>
          <div class="agg-label">綜合評分</div>
        </div>
        <div class="agg-divider" />
        <div class="agg-col">
          <div class="agg-val">2,847</div>
          <div class="agg-label">評價數量</div>
        </div>
        <div class="agg-divider" />
        <div class="agg-col">
          <div class="agg-val">97%</div>
          <div class="agg-label">推薦比率</div>
        </div>
        <div class="agg-divider" />
        <div class="bar-ratings">
          <div class="bar-row">
            <span class="bar-label">5★</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: 88%" />
            </div>
            <span class="bar-pct">88%</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">4★</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: 9%; opacity: 0.7" />
            </div>
            <span class="bar-pct">9%</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">3★</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: 2%; opacity: 0.5" />
            </div>
            <span class="bar-pct">2%</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">2★</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: 1%; opacity: 0.3" />
            </div>
            <span class="bar-pct">1%</span>
          </div>
          <div class="bar-row">
            <span class="bar-label">1★</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: 0.5%; opacity: 0.2" />
            </div>
            <span class="bar-pct">0%</span>
          </div>
        </div>
      </div>
    </section>

    <div class="divider" />

    <!-- BUNDLE -->
    <section id="bundle">
      <div class="reveal">
        <span class="section-eyebrow">搭配推薦</span>
        <h2 class="section-title">升級您的<em>音樂體驗</em></h2>
      </div>
      <div class="bundle-grid">
        <div class="bundle-card reveal">
          <img
            class="bundle-img"
            src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&q=80&auto=format&fit=crop"
            alt="收納包"
          />
          <div>
            <div class="bundle-name">AURA 硬殼保護收納包</div>
            <div class="bundle-desc">
              EVA 高密度防摔材質，內附配件網袋，完美保護您的 X1 Pro。
            </div>
            <div>
              <span class="bundle-price">NT$890</span
              ><span class="bundle-orig">NT$1,290</span>
            </div>
          </div>
        </div>
        <div class="bundle-card reveal" style="transition-delay: 0.1s">
          <img
            class="bundle-img"
            src="https://images.unsplash.com/photo-1583394293214-5c9ff89c40bc?w=200&q=80&auto=format&fit=crop"
            alt="耳機架"
          />
          <div>
            <div class="bundle-name">鋁合金桌面耳機架</div>
            <div class="bundle-desc">
              航太鋁合金一體成型，質感收納展示，讓桌面更整齊有型。
            </div>
            <div>
              <span class="bundle-price">NT$1,290</span
              ><span class="bundle-orig">NT$1,890</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CHECKOUT -->
    <section id="checkout">
      <div class="checkout-wrap">
        <div class="reveal">
          <span class="section-eyebrow">安全結帳</span>
          <h2 class="section-title">完成您的<em>訂單</em></h2>
        </div>
        <div class="checkout-form reveal">
          <div class="form-section">
            <div class="form-section-title">收件資訊</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">姓氏</label
                ><input class="form-input" placeholder="王" />
              </div>
              <div class="form-group">
                <label class="form-label">名字</label
                ><input class="form-input" placeholder="小明" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">電子郵件</label
              ><input
                class="form-input"
                type="email"
                placeholder="your@email.com"
              />
            </div>
            <div class="form-group">
              <label class="form-label">手機號碼</label
              ><input
                class="form-input"
                type="tel"
                placeholder="0912 345 678"
              />
            </div>
            <div class="form-group">
              <label class="form-label">收件地址</label
              ><input
                class="form-input"
                placeholder="台北市信義區信義路五段 7 號"
              />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">城市</label
                ><input class="form-input" placeholder="台北市" />
              </div>
              <div class="form-group">
                <label class="form-label">郵遞區號</label
                ><input class="form-input" placeholder="110" />
              </div>
            </div>
            <div class="form-section-title" style="margin-top: 28px">
              付款方式
            </div>
            <div class="form-group">
              <label class="form-label">卡號</label
              ><input class="form-input" placeholder="1234 5678 9012 3456" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">到期日</label
                ><input class="form-input" placeholder="MM / YY" />
              </div>
              <div class="form-group">
                <label class="form-label">安全碼</label
                ><input class="form-input" placeholder="CVC" />
              </div>
            </div>
          </div>
          <div class="form-section">
            <div class="form-section-title">訂單明細</div>
            <div class="order-item">
              <img
                class="order-item-img"
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80&auto=format&fit=crop"
                alt="AURA X1 Pro"
              />
              <div class="order-item-info">
                <div class="order-item-name">AURA X1 Pro Nova</div>
                <div class="order-item-variant">
                  {{ selectedColor.name }} × 1
                </div>
              </div>
              <div class="order-item-price">NT$7,990</div>
            </div>
            <div class="order-totals">
              <div class="total-row">
                <span>小計</span><span>NT$7,990</span>
              </div>
              <div class="total-row">
                <span>運費</span><span style="color: var(--green)">免費</span>
              </div>
              <div class="total-row">
                <span>早鳥折扣</span
                ><span style="color: var(--green)">－NT$1,500</span>
              </div>
              <div class="total-row grand">
                <span>總計</span><span class="amount">NT$6,490</span>
              </div>
            </div>
            <button
              class="submit-btn"
              @click="(e) => handleCheckout(e.target as HTMLButtonElement)"
            >
              立即付款 — NT$6,490
            </button>
            <div class="secure-note">
              🔒 SSL 安全加密 · 支援信用卡 / Apple Pay / LINE Pay
            </div>
            <div
              style="
                margin-top: 24px;
                padding: 16px;
                background: rgba(200, 169, 110, 0.06);
                border: 1px solid rgba(200, 169, 110, 0.2);
                border-radius: 2px;
              "
            >
              <div
                style="
                  font-size: 0.78rem;
                  color: var(--gold);
                  letter-spacing: 0.1em;
                  margin-bottom: 8px;
                  font-weight: 600;
                "
              >
                🎁 您的訂單包含
              </div>
              <div
                style="font-size: 0.8rem; color: var(--muted); line-height: 1.9"
              >
                ✓ AURA X1 Pro Nova 耳機本體<br />✓ USB-C 充電線<br />✓ 3.5mm
                音訊線<br />✓ 飛機轉接頭<br />✓ 精品磁吸禮盒<br />✓ 2 年原廠保固
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq">
      <div style="margin-bottom: 48px" class="reveal">
        <span class="section-eyebrow">常見問題</span>
        <h2 class="section-title">您可能想知道</h2>
      </div>
      <div>
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="faq-item"
          :class="{ open: openFaq === i }"
        >
          <button class="faq-q" @click="toggleFaq(i)">
            {{ item.q }}<span class="faq-arrow">+</span>
          </button>
          <div class="faq-a">{{ item.a }}</div>
        </div>
      </div>
    </section>

    <footer>
      <div class="footer-brand">AURA</div>
      <div class="footer-links">
        <a href="#">隱私政策</a><a href="#">服務條款</a><a href="#">聯絡客服</a>
      </div>
      <div>© 2025 AURA Audio · 圖片來源：Unsplash (CC0)</div>
    </footer>
  </div>
</template>

<style scoped>
/* ─ Universal resets（全域安全，純中性設定）─ */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
img {
  display: block;
  max-width: 100%;
}
a {
  text-decoration: none;
  color: inherit;
}

/* ─ 所有 CSS 變數 & 頁面基礎樣式改為 .page-root 範疇，不外洩至其他頁面 ─ */
.page-root {
  --ink: #0a0a0c;
  --ink2: #111116;
  --ink3: #1a1a22;
  --border: rgba(255, 255, 255, 0.07);
  --gold: #c8a96e;
  --gold-lt: #e8cfa0;
  --cream: #f5f0e8;
  --muted: #6b6b7a;
  --white: #ffffff;
  --red: #e84040;
  --green: #22c55e;
  background: var(--ink);
  color: var(--cream);
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
}
html:has(.page-root) body {
  cursor: none;
  background: var(--ink);
}
.page-root button {
  cursor: none;
  font-family: inherit;
  border: none;
  background: none;
}

#cur {
  position: fixed;
  width: 10px;
  height: 10px;
  background: var(--gold);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition:
    width 0.15s,
    height 0.15s;
  mix-blend-mode: difference;
}
#cur-trail {
  position: fixed;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(200, 169, 110, 0.45);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition:
    width 0.3s,
    height 0.3s;
}

#topbar {
  background: var(--gold);
  color: var(--ink);
  text-align: center;
  padding: 9px 20px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  position: relative;
}
.topbar-close {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: var(--ink);
  opacity: 0.6;
  transition: opacity 0.2s;
}
.topbar-close:hover {
  opacity: 1;
}

nav {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 68px;
  background: rgba(10, 10, 12, 0.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
}
.nav-brand {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.7rem;
  letter-spacing: 0.12em;
  color: var(--gold);
  text-shadow: 0 0 24px rgba(200, 169, 110, 0.4);
}
.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
}
.nav-links a {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-transform: uppercase;
  transition: color 0.25s;
}
.nav-links a:hover {
  color: var(--cream);
}
.cart-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  padding: 8px 18px;
  border-radius: 2px;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  color: var(--cream);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.25s;
}
.cart-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.cart-count {
  background: var(--gold);
  color: var(--ink);
  font-size: 0.65rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 106px);
  padding: 0;
  overflow: hidden;
  position: relative;
}
#hero::before {
  content: '';
  position: absolute;
  right: 15%;
  top: 20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(200, 169, 110, 0.08) 0%,
    transparent 65%
  );
  pointer-events: none;
  animation: glow-drift 8s ease-in-out infinite alternate;
}
@keyframes glow-drift {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(-40px, 30px) scale(1.1);
  }
}

.hero-left {
  padding: 70px 60px 60px 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
}
.hero-countdown-wrap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(200, 169, 110, 0.35);
  background: rgba(200, 169, 110, 0.06);
  padding: 6px 14px;
  border-radius: 2px;
  margin-bottom: 28px;
}
.countdown-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 8px var(--red);
  animation: blink 1s infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
.countdown-label {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--gold);
  text-transform: uppercase;
}
.countdown-timer {
  font-family: 'DM Mono', monospace;
  font-size: 0.88rem;
  color: var(--cream);
  letter-spacing: 0.15em;
}
.hero-eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 14px;
  font-weight: 500;
}
.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3.8rem, 7vw, 7rem);
  line-height: 0.95;
  letter-spacing: 0.02em;
  margin-bottom: 10px;
  color: var(--white);
}
.hero-title em {
  font-style: normal;
  background: linear-gradient(
    120deg,
    var(--gold) 0%,
    var(--gold-lt) 50%,
    var(--gold) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: shimmer 4s linear infinite;
}
@keyframes shimmer {
  to {
    background-position: 200% center;
  }
}
.hero-sub {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--muted);
  max-width: 440px;
  margin-bottom: 32px;
  font-weight: 300;
}
.price-block {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 28px;
}
.price-current {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  color: var(--white);
  letter-spacing: 0.03em;
}
.price-original {
  font-size: 1.1rem;
  color: var(--muted);
  text-decoration: line-through;
}
.price-badge {
  background: var(--red);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  border-radius: 2px;
}
.option-label {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--muted);
  text-transform: uppercase;
  margin-bottom: 10px;
}
.color-options {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}
.color-swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: all 0.2s;
}
.color-swatch.active,
.color-swatch:hover {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(200, 169, 110, 0.25);
}
.color-swatch.obsidian {
  background: #1a1a1a;
}
.color-swatch.champagne {
  background: #c8a96e;
}
.color-swatch.midnight {
  background: #1e2a4a;
}
.color-swatch.chalk {
  background: #e8e4dc;
}
.hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}
.btn-buy {
  flex: 1;
  min-width: 200px;
  padding: 18px 32px;
  background: linear-gradient(135deg, var(--gold) 0%, #b8914e 100%);
  color: var(--ink);
  font-weight: 700;
  font-size: 0.88rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
}
.btn-buy::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 40%;
  height: 200%;
  background: rgba(255, 255, 255, 0.25);
  transform: skewX(-25deg);
  transition: left 0.5s;
}
.btn-buy:hover::before {
  left: 140%;
}
.btn-buy:hover {
  box-shadow: 0 8px 40px rgba(200, 169, 110, 0.45);
  transform: translateY(-2px);
}
.btn-wishlist {
  padding: 18px 22px;
  border: 1px solid var(--border);
  border-radius: 2px;
  color: var(--muted);
  font-size: 1.1rem;
  transition: all 0.25s;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
}
.btn-wishlist:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.trust-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding-top: 22px;
  border-top: 1px solid var(--border);
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.75rem;
  color: var(--muted);
  letter-spacing: 0.05em;
}

.hero-right {
  background: linear-gradient(135deg, var(--ink2) 0%, #0d1018 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-right::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 60% at 50% 40%,
    rgba(200, 169, 110, 0.07) 0%,
    transparent 65%
  );
}
.product-stage {
  position: relative;
  width: 460px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.product-img-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-img {
  width: 380px;
  height: 380px;
  object-fit: contain;
  animation: float-product 5s ease-in-out infinite;
}
@keyframes float-product {
  0%,
  100% {
    transform: translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateY(-18px) rotate(1deg);
  }
}
.stage-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.stage-ring.r1 {
  width: 420px;
  height: 420px;
  border-color: rgba(200, 169, 110, 0.08);
  animation: spin-s 30s linear infinite;
}
.stage-ring.r2 {
  width: 340px;
  height: 340px;
  border-color: rgba(200, 169, 110, 0.06);
  border-style: dashed;
  animation: spin-s 20s linear infinite reverse;
}
@keyframes spin-s {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.stage-dot {
  position: absolute;
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  color: var(--gold);
  background: rgba(200, 169, 110, 0.1);
  border: 1px solid rgba(200, 169, 110, 0.25);
  padding: 5px 10px;
  border-radius: 2px;
  white-space: nowrap;
  animation: float-product 4s ease-in-out infinite;
}
.stage-dot.d1 {
  top: 6%;
  left: -2%;
  animation-delay: 0.5s;
}
.stage-dot.d2 {
  top: 6%;
  right: -2%;
  animation-delay: 1.2s;
}
.stage-dot.d3 {
  bottom: 12%;
  left: 2%;
  animation-delay: 0.8s;
}
.stage-dot.d4 {
  bottom: 12%;
  right: 2%;
  animation-delay: 1.8s;
}
.stage-shadow {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  height: 30px;
  background: radial-gradient(
    ellipse,
    rgba(200, 169, 110, 0.18) 0%,
    transparent 70%
  );
  filter: blur(8px);
  animation: shadow-p 5s ease-in-out infinite;
}
@keyframes shadow-p {
  0%,
  100% {
    transform: translateX(-50%) scaleX(1);
    opacity: 0.8;
  }
  50% {
    transform: translateX(-50%) scaleX(0.75);
    opacity: 0.4;
  }
}

.ticker {
  background: var(--gold);
  overflow: hidden;
  white-space: nowrap;
  padding: 10px 0;
}
.ticker-inner {
  display: inline-flex;
  animation: ticker 22s linear infinite;
}
.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  color: var(--ink);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0 32px;
}
@keyframes ticker {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.section-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--gold);
  text-transform: uppercase;
  display: block;
  margin-bottom: 14px;
  text-shadow: 0 0 15px rgba(200, 169, 110, 0.4);
}
.section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  line-height: 0.97;
  letter-spacing: 0.02em;
  color: var(--white);
  margin-bottom: 14px;
}
.section-title em {
  font-style: normal;
  color: var(--gold);
}
.section-body {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.85;
  font-weight: 300;
  max-width: 460px;
}

#specs {
  padding: 100px 52px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
}
.specs-visual {
  position: relative;
  height: 480px;
  overflow: hidden;
}
.specs-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
  filter: grayscale(20%) contrast(1.1);
  transition:
    transform 0.6s,
    filter 0.4s;
}
.specs-visual:hover .specs-img {
  transform: scale(1.03);
  filter: grayscale(0%) contrast(1);
}
.specs-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(10, 10, 12, 0.8) 100%
  );
}
.specs-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: var(--gold);
  border-style: solid;
}
.specs-corner.tl {
  top: 10px;
  left: 10px;
  border-width: 2px 0 0 2px;
}
.specs-corner.tr {
  top: 10px;
  right: 10px;
  border-width: 2px 2px 0 0;
}
.specs-corner.bl {
  bottom: 10px;
  left: 10px;
  border-width: 0 0 2px 2px;
}
.specs-corner.br {
  bottom: 10px;
  right: 10px;
  border-width: 0 2px 2px 0;
}
.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  margin-top: 36px;
}
.spec-card {
  background: var(--ink2);
  border: 1px solid var(--border);
  padding: 22px 20px;
  transition: all 0.3s;
}
.spec-card:hover {
  border-color: rgba(200, 169, 110, 0.3);
  background: var(--ink3);
}
.spec-val {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  color: var(--gold);
  letter-spacing: 0.05em;
  line-height: 1;
}
.spec-key {
  font-size: 0.72rem;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 4px;
}

#features {
  padding: 100px 52px;
  max-width: 1300px;
  margin: 0 auto;
}
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  margin-top: 56px;
}
.bento-card {
  background: var(--ink2);
  border: 1px solid var(--border);
  padding: 36px 32px;
  position: relative;
  overflow: hidden;
  transition: all 0.35s;
}
.bento-card:hover {
  border-color: rgba(200, 169, 110, 0.25);
  background: var(--ink3);
}
.bento-card.span2 {
  grid-column: span 2;
}
.bento-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    rgba(200, 169, 110, 0.06) 0%,
    transparent 55%
  );
  opacity: 0;
  transition: opacity 0.4s;
}
.bento-card:hover::after {
  opacity: 1;
}
.bento-card.feature-img-card {
  padding: 0;
  overflow: hidden;
}
.bento-icon {
  font-size: 2rem;
  margin-bottom: 18px;
  filter: drop-shadow(0 0 8px rgba(200, 169, 110, 0.4));
}
.bento-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  color: var(--white);
  margin-bottom: 10px;
}
.bento-desc {
  font-size: 0.87rem;
  color: var(--muted);
  line-height: 1.75;
}
.bento-num {
  position: absolute;
  bottom: 24px;
  right: 24px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 5rem;
  line-height: 1;
  color: rgba(200, 169, 110, 0.05);
  pointer-events: none;
}
.feature-img-card img {
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: cover;
  filter: grayscale(15%) brightness(0.85);
  transition:
    filter 0.5s,
    transform 0.6s;
}
.feature-img-card:hover img {
  filter: grayscale(0%) brightness(1);
  transform: scale(1.04);
}
.feature-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 10, 12, 0.6) 0%,
    transparent 60%
  );
  pointer-events: none;
}
.feature-img-label {
  position: absolute;
  bottom: 24px;
  left: 24px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.6rem;
  letter-spacing: 0.08em;
  color: var(--white);
}

#reviews {
  padding: 100px 52px;
  background: var(--ink2);
}
.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 56px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.rating-big {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4.5rem;
  line-height: 1;
  color: var(--gold);
  letter-spacing: 0.05em;
}
.rating-stars {
  color: #ffd60a;
  font-size: 1.1rem;
  letter-spacing: 3px;
  text-shadow: 0 0 8px rgba(255, 214, 10, 0.5);
}
.rating-count {
  font-size: 0.78rem;
  color: var(--muted);
  margin-top: 4px;
}
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  margin-bottom: 48px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.review-card {
  background: var(--ink);
  border: 1px solid var(--border);
  padding: 32px;
  transition: all 0.3s;
}
.review-card:hover {
  border-color: rgba(200, 169, 110, 0.2);
  transform: translateY(-4px);
}
.review-stars {
  color: #ffd60a;
  font-size: 0.8rem;
  letter-spacing: 3px;
  margin-bottom: 14px;
  text-shadow: 0 0 8px rgba(255, 214, 10, 0.4);
}
.review-body {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.8;
  margin-bottom: 20px;
}
.review-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.author-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--border);
  filter: grayscale(20%);
}
.author-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--cream);
}
.author-meta {
  font-size: 0.72rem;
  color: var(--muted);
  margin-top: 2px;
}
.verified {
  color: var(--green);
}
.review-aggregate {
  background: var(--ink3);
  border: 1px solid var(--border);
  padding: 32px 40px;
  display: flex;
  align-items: center;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}
.agg-col {
  text-align: center;
}
.agg-val {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.8rem;
  color: var(--gold);
  letter-spacing: 0.05em;
}
.agg-label {
  font-size: 0.72rem;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 3px;
}
.agg-divider {
  width: 1px;
  height: 60px;
  background: var(--border);
}
.bar-ratings {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.bar-label {
  font-size: 0.72rem;
  color: var(--muted);
  width: 40px;
  text-align: right;
}
.bar-track {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  background: var(--gold);
  border-radius: 2px;
}
.bar-pct {
  font-size: 0.72rem;
  color: var(--muted);
  width: 28px;
}

#bundle {
  padding: 100px 52px;
  max-width: 1300px;
  margin: 0 auto;
}
.bundle-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  margin-top: 56px;
}
.bundle-card {
  background: var(--ink2);
  border: 1px solid var(--border);
  padding: 32px;
  display: flex;
  gap: 24px;
  align-items: center;
  transition: all 0.3s;
}
.bundle-card:hover {
  border-color: rgba(200, 169, 110, 0.3);
}
.bundle-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 2px;
  flex-shrink: 0;
  filter: grayscale(15%);
}
.bundle-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 6px;
  color: var(--cream);
}
.bundle-desc {
  font-size: 0.82rem;
  color: var(--muted);
  margin-bottom: 12px;
  line-height: 1.6;
}
.bundle-price {
  color: var(--gold);
  font-weight: 700;
  font-size: 1rem;
}
.bundle-orig {
  color: var(--muted);
  font-size: 0.82rem;
  text-decoration: line-through;
  margin-left: 8px;
}

#checkout {
  padding: 100px 52px;
  background: linear-gradient(to bottom, var(--ink2), var(--ink));
}
.checkout-wrap {
  max-width: 900px;
  margin: 0 auto;
}
.checkout-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  background: var(--ink2);
  border: 1px solid var(--border);
  margin-top: 52px;
}
.form-section {
  padding: 40px;
  border-right: 1px solid var(--border);
}
.form-section:last-child {
  border-right: none;
}
.form-section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 0.1em;
  color: var(--gold);
  margin-bottom: 24px;
}
.form-group {
  margin-bottom: 16px;
}
.form-label {
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: var(--muted);
  text-transform: uppercase;
  display: block;
  margin-bottom: 7px;
}
.form-input {
  width: 100%;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  color: var(--cream);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  border-radius: 2px;
  outline: none;
  transition: border-color 0.25s;
}
.form-input:focus {
  border-color: var(--gold);
}
.form-input::placeholder {
  color: var(--muted);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.order-item {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}
.order-item-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 2px;
  border: 1px solid var(--border);
  filter: grayscale(10%);
}
.order-item-info {
  flex: 1;
}
.order-item-name {
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 3px;
}
.order-item-variant {
  font-size: 0.75rem;
  color: var(--muted);
}
.order-item-price {
  font-weight: 700;
  color: var(--gold);
}
.order-totals {
  margin-top: 20px;
}
.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--muted);
  padding: 6px 0;
}
.total-row.grand {
  border-top: 1px solid var(--border);
  margin-top: 12px;
  padding-top: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--cream);
}
.total-row.grand .amount {
  color: var(--gold);
}
.submit-btn {
  width: 100%;
  margin-top: 28px;
  padding: 20px;
  background: linear-gradient(135deg, var(--gold) 0%, #b8914e 100%);
  color: var(--ink);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: all 0.3s;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  position: relative;
  overflow: hidden;
}
.submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.submit-btn:hover::before {
  opacity: 1;
}
.submit-btn:hover {
  box-shadow: 0 8px 40px rgba(200, 169, 110, 0.4);
  transform: translateY(-2px);
}
.secure-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 14px;
  font-size: 0.72rem;
  color: var(--muted);
}

#faq {
  padding: 80px 52px;
  max-width: 800px;
  margin: 0 auto;
}
.faq-item {
  border-bottom: 1px solid var(--border);
}
.faq-q {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--cream);
  transition: color 0.25s;
}
.faq-q:hover {
  color: var(--gold);
}
.faq-arrow {
  font-size: 0.8rem;
  color: var(--gold);
  transition: transform 0.3s;
  flex-shrink: 0;
  margin-left: 16px;
}
.faq-item.open .faq-arrow {
  transform: rotate(45deg);
}
.faq-a {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.8;
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.4s ease,
    padding 0.3s;
}
.faq-item.open .faq-a {
  max-height: 200px;
  padding-bottom: 20px;
}

footer {
  border-top: 1px solid var(--border);
  padding: 40px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  color: var(--muted);
}
.footer-brand {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.4rem;
  color: var(--gold);
  letter-spacing: 0.12em;
}
.footer-links {
  display: flex;
  gap: 24px;
}
.footer-links a {
  color: var(--muted);
  transition: color 0.2s;
}
.footer-links a:hover {
  color: var(--cream);
}

.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(200, 169, 110, 0.15),
    rgba(255, 0, 110, 0.1),
    transparent
  );
  position: relative;
  z-index: 2;
}
.reveal {
  opacity: 0;
  transform: translateY(36px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.reveal.up {
  opacity: 1;
  transform: none;
}

@media (max-width: 960px) {
  nav {
    padding: 0 20px;
  }
  .nav-links {
    display: none;
  }
  #hero {
    grid-template-columns: 1fr;
  }
  .hero-right {
    height: 360px;
  }
  .hero-left {
    padding: 48px 20px 40px;
  }
  .product-stage {
    width: 300px;
    height: 320px;
  }
  .product-img {
    width: 260px;
    height: 260px;
  }
  .stage-ring.r1 {
    width: 290px;
    height: 290px;
  }
  .stage-ring.r2 {
    width: 220px;
    height: 220px;
  }
  #specs,
  .bundle-grid,
  .checkout-form {
    grid-template-columns: 1fr;
  }
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-card.span2 {
    grid-column: span 1;
  }
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  .review-aggregate {
    flex-wrap: wrap;
    gap: 24px;
  }
  .form-section {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  footer {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  .reviews-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  #features,
  #reviews,
  #bundle,
  #checkout,
  #faq,
  #specs {
    padding: 72px 20px;
  }
}
</style>
