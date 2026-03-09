<script setup lang="ts">
useHead({
  title: 'BLOOM 護膚精華 — 限定新品發佈',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap',
    },
  ],
});

const topbarVisible = ref(true);
const qty = ref(1);
const selectedVariant = ref('🌹 玫瑰保濕');
const isSaved = ref(false);
const orderDone = ref(false);
const cartCount = ref(1);
const cdH = ref('47');
const cdM = ref('59');
const cdS = ref('59');
const openFaq = ref<number | null>(null);

const variants = ['🌹 玫瑰保濕', '🍵 綠茶控油', '💜 薰衣草舒緩', '🍊 柑橘亮白'];

const faqs = [
  {
    q: '敏感肌可以使用嗎？',
    a: '可以！所有 BLOOM 產品均通過皮膚科過敏測試，不含酒精、香料、防腐劑，專為敏感肌設計。建議先在耳後做測試。',
  },
  {
    q: '多久可以看到效果？',
    a: '一般用戶在 7-14 天即可感受保濕效果提升，色斑淡化通常在 28 天後最為明顯。建議持續使用至少 4 週。',
  },
  {
    q: '懷孕或哺乳期間可以使用嗎？',
    a: '成分溫和，但建議懷孕或哺乳期間使用前諮詢醫師。煙酰胺系列請特別事先確認。',
  },
  {
    q: '退換貨政策是什麼？',
    a: '30 天無條件退換保障。如有不滿意請聯繫客服，我們承擔退運費用，3-5 個工作天內完成退款。',
  },
  {
    q: '限時優惠什麼時候結束？',
    a: '新品發佈優惠價 NT$1,280（原價 NT$1,980）僅限 48 小時，活動結束後恢復原價，建議把握機會！',
  },
];

const unitPrice = 1280;

const summaryPrice = computed(
  () => `NT$${(unitPrice * qty.value).toLocaleString()}`,
);
const grandTotal = computed(
  () => `NT$${(unitPrice * qty.value).toLocaleString()}`,
);

function selectVariant(name: string) {
  selectedVariant.value = name;
}

function changeQty(d: number) {
  qty.value = Math.max(1, qty.value + d);
}

function buyNow() {
  cartCount.value += qty.value;
  document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToCheckout() {
  document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
}

function handleOrder(btn: HTMLButtonElement) {
  btn.textContent = '⏳ 處理中…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '🎉 訂單成立！感謝您的購買';
    btn.style.background = '#2ECC71';
  }, 1800);
}

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i;
}

onMounted(() => {
  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  if (cur && ring) {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document
      .querySelectorAll<HTMLElement>(
        'a,button,.bundle-card,.review-card,.feature-row,.step-card',
      )
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cur.style.width = '6px';
          cur.style.height = '6px';
          ring.style.width = '52px';
          ring.style.height = '52px';
        });
        el.addEventListener('mouseleave', () => {
          cur.style.width = '12px';
          cur.style.height = '12px';
          ring.style.width = '38px';
          ring.style.height = '38px';
        });
      });
  }

  // Countdown
  const end = Date.now() + 48 * 3600 * 1000;
  const pad = (n: number) => String(n).padStart(2, '0');
  setInterval(() => {
    const d = Math.max(0, end - Date.now());
    cdH.value = pad(Math.floor(d / 3600000));
    cdM.value = pad(Math.floor((d % 3600000) / 60000));
    cdS.value = pad(Math.floor((d % 60000) / 1000));
  }, 1000);

  // Stats counter
  const statObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target.querySelector('.stat-num') as HTMLElement;
        if (!el || el.dataset.counted) return;
        el.dataset.counted = '1';
        const raw = +(el.dataset.target || 0);
        const div = +(el.dataset.div || 1);
        const target = raw / div;
        const suffix = el.dataset.suffix || '+';
        let c = 0;
        const step = target / 60;
        const iv = setInterval(() => {
          c += step;
          if (c >= target) {
            c = target;
            clearInterval(iv);
          }
          const disp = div > 1 ? c.toFixed(1) : Math.floor(c).toLocaleString();
          el.textContent = disp + suffix;
        }, 20);
      });
    },
    { threshold: 0.4 },
  );
  document.querySelectorAll('.stat-block').forEach((b) => statObs.observe(b));

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
    <div id="cur-ring" />

    <!-- TOPBAR -->
    <div v-if="topbarVisible" id="topbar">
      🌸 新品上市！買二送一 + 免運，限時 48 小時 — 已有 3,284 人加入購物車
      <button class="tb-close" @click="topbarVisible = false">✕</button>
    </div>

    <!-- NAV -->
    <nav>
      <div class="nav-logo">bloom.</div>
      <ul class="nav-links">
        <li><a href="#features">成分</a></li>
        <li><a href="#how-to">使用方法</a></li>
        <li><a href="#reviews">評價</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <button class="btn-cart" @click="scrollToCheckout">
        🛒 購物車 <span class="cart-badge">{{ cartCount }}</span>
      </button>
    </nav>

    <!-- HERO -->
    <section id="hero">
      <div class="hero-left">
        <div class="pill-badge">
          <span class="pill-dot" />
          🌿 2025 全新配方 · 限量首發
        </div>
        <h1 class="hero-title">
          讓肌膚<br /><em>自然</em><br /><span class="stroke">綻放</span>
        </h1>
        <p class="hero-sub">
          融合 10 種植萃精華 × 玻尿酸微導技術，72
          小時深層保濕，讓每一吋肌膚都煥發光采。
        </p>
        <div class="price-row">
          <span class="price-now">NT$1,280</span>
          <span class="price-was">NT$1,980</span>
          <span class="discount-pill">-35%</span>
        </div>
        <div class="countdown-bar">
          <span class="cd-label">⏰ 優惠倒數</span>
          <div class="cd-nums">
            <span class="cnum">{{ cdH }}</span
            ><span class="csep">:</span> <span class="cnum">{{ cdM }}</span
            ><span class="csep">:</span>
            <span class="cnum">{{ cdS }}</span>
          </div>
        </div>
        <div class="variant-label">選擇系列</div>
        <div class="scent-options">
          <button
            v-for="v in variants"
            :key="v"
            class="scent-chip"
            :class="{ active: selectedVariant === v }"
            @click="selectVariant(v)"
          >
            {{ v }}
          </button>
        </div>
        <div class="buy-row">
          <div class="qty-ctrl">
            <button class="qty-btn" @click="changeQty(-1)">−</button>
            <span class="qty-val">{{ qty }}</span>
            <button class="qty-btn" @click="changeQty(1)">+</button>
          </div>
          <button class="btn-primary-buy" @click="buyNow">立即購買 🛒</button>
          <button
            class="btn-save"
            :class="{ active: isSaved }"
            @click="isSaved = !isSaved"
          >
            {{ isSaved ? '♥' : '♡' }}
          </button>
        </div>
        <div class="trust-strip">
          <span class="trust-chip"><span>🚚</span>全台免運</span>
          <span class="trust-chip"><span>🌿</span>純植物配方</span>
          <span class="trust-chip"><span>🔄</span>30天退換</span>
          <span class="trust-chip"><span>✅</span>皮膚科測試</span>
        </div>
      </div>

      <div class="hero-right">
        <div class="product-showcase">
          <div class="deco-circle c1" />
          <div class="deco-circle c2" />
          <div class="deco-circle c3" />
          <img
            class="product-main-img"
            src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=85&auto=format&fit=crop"
            alt="BLOOM 護膚精華"
          />
          <div class="float-label fl1">
            <div class="fl-icon">💧</div>
            <div class="fl-val">72hr</div>
            <div class="fl-key">深層保濕</div>
          </div>
          <div class="float-label fl2">
            <div class="fl-icon">🌿</div>
            <div class="fl-val">10種</div>
            <div class="fl-key">植萃成分</div>
          </div>
          <div class="float-label fl3">
            <div class="fl-icon">✅</div>
            <div class="fl-val">皮膚科</div>
            <div class="fl-key">測試認證</div>
          </div>
          <div class="float-label fl4">
            <div class="fl-icon">🚫</div>
            <div class="fl-val">無酒精</div>
            <div class="fl-key">敏感肌適用</div>
          </div>
          <div class="product-shadow" />
        </div>
      </div>
    </section>

    <!-- RIBBON -->
    <div class="ribbon">
      <div class="ribbon-track">
        <template v-for="_ in 2" :key="_">
          <span
            v-for="item in [
              '純植物配方',
              '皮膚科認證',
              '72小時保濕',
              '10種植萃精華',
              '30天退換保障',
              '全台免運送達',
              '無酒精無香料',
              '5,847則好評',
              '敏感肌適用',
              '限時35% OFF',
            ]"
            :key="item"
            class="ribbon-item"
            >{{ item }} <span style="opacity: 0.4">🌸</span></span
          >
        </template>
      </div>
    </div>

    <!-- STATS -->
    <div class="stats-bar">
      <div class="stat-block reveal">
        <span class="stat-num" data-target="50000" data-suffix="+">0+</span
        ><span class="stat-label">滿意客戶</span>
      </div>
      <div class="stat-block reveal" style="transition-delay: 0.1s">
        <span class="stat-num" data-target="49" data-suffix=" ★" data-div="10"
          >0</span
        ><span class="stat-label">平均評分</span>
      </div>
      <div class="stat-block reveal" style="transition-delay: 0.2s">
        <span class="stat-num" data-target="97" data-suffix="%">0%</span
        ><span class="stat-label">回購率</span>
      </div>
      <div class="stat-block reveal" style="transition-delay: 0.3s">
        <span class="stat-num" data-target="28" data-suffix="天">0天</span
        ><span class="stat-label">見效時間</span>
      </div>
    </div>

    <!-- FEATURES -->
    <section id="features">
      <div class="reveal">
        <span class="section-eyebrow">核心成分</span>
        <h2 class="section-title">大自然的<em>饋贈</em></h2>
        <p class="section-body">
          嚴選全球 10
          種珍貴植萃原料，經過瑞士實驗室三年研發，讓每一滴精華都充滿能量。
        </p>
      </div>
      <div class="features-layout">
        <div class="features-img-wrap reveal">
          <img
            class="features-img"
            src="https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=700&q=85&auto=format&fit=crop"
            alt="植萃成分"
          />
          <div class="features-img-tag">🔬 瑞士實驗室研發</div>
        </div>
        <div class="features-list">
          <div class="feature-row reveal">
            <div class="feature-icon-wrap">🌹</div>
            <div class="feature-text">
              <h4>玫瑰果萃取</h4>
              <p>
                富含天然維生素 C 與抗氧化劑，深度修護受損肌膚，提升膚色透明感。
              </p>
            </div>
          </div>
          <div class="feature-row reveal" style="transition-delay: 0.1s">
            <div class="feature-icon-wrap">💎</div>
            <div class="feature-text">
              <h4>玻尿酸微導技術</h4>
              <p>獨家奈米級分子，穿透角質層深層補水，72 小時持續鎖水保濕。</p>
            </div>
          </div>
          <div class="feature-row reveal" style="transition-delay: 0.2s">
            <div class="feature-icon-wrap">🌿</div>
            <div class="feature-text">
              <h4>積雪草精萃</h4>
              <p>傳統漢方草本精華，強效舒緩泛紅與敏感，重建肌膚保護屏障。</p>
            </div>
          </div>
          <div class="feature-row reveal" style="transition-delay: 0.3s">
            <div class="feature-icon-wrap">✨</div>
            <div class="feature-text">
              <h4>煙酰胺複合體</h4>
              <p>高濃度 5% 精準淡化色斑，均勻膚色，帶來如濾鏡般的亮白效果。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW TO -->
    <section id="how-to">
      <div class="how-to-inner">
        <div class="reveal" style="text-align: center">
          <span class="section-eyebrow">使用步驟</span>
          <h2 class="section-title" style="text-align: center">
            4 個步驟，<em>開始改變</em>
          </h2>
        </div>
        <div class="steps-grid">
          <div class="step-card reveal">
            <div class="step-num">01</div>
            <div class="step-icon">🧴</div>
            <div class="step-title">潔膚準備</div>
            <div class="step-desc">
              以溫水輕柔洗臉，趁肌膚微濕狀態，讓精華吸收效果提升 3 倍。
            </div>
            <div class="step-arrow">→</div>
          </div>
          <div class="step-card reveal" style="transition-delay: 0.1s">
            <div class="step-num">02</div>
            <div class="step-icon">💧</div>
            <div class="step-title">取適量精華</div>
            <div class="step-desc">
              按壓 2-3 下，約黃豆大小的用量，足夠覆蓋全臉。
            </div>
            <div class="step-arrow">→</div>
          </div>
          <div class="step-card reveal" style="transition-delay: 0.2s">
            <div class="step-num">03</div>
            <div class="step-icon">🤲</div>
            <div class="step-title">輕拍按摩</div>
            <div class="step-desc">
              從臉頰由下往上輕拍，配合淋巴排毒按摩手法促進吸收。
            </div>
            <div class="step-arrow">→</div>
          </div>
          <div class="step-card reveal" style="transition-delay: 0.3s">
            <div class="step-num">04</div>
            <div class="step-icon">🌙</div>
            <div class="step-title">日夜使用</div>
            <div class="step-desc">早晚各一次，連續 28 天可見顯著改善。</div>
            <div class="step-arrow">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- BEFORE/AFTER -->
    <section id="before-after">
      <div class="reveal" style="text-align: center">
        <span class="section-eyebrow">真實改變</span>
        <h2 class="section-title" style="text-align: center">
          28 天，<em>見證奇蹟</em>
        </h2>
      </div>
      <div class="ba-grid">
        <div class="ba-card reveal">
          <img
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700&q=85&auto=format&fit=crop"
            alt="使用前"
          />
          <div class="ba-overlay" />
          <div class="ba-label">使用前</div>
          <div class="ba-badge">第 0 天</div>
        </div>
        <div class="ba-card reveal" style="transition-delay: 0.15s">
          <img
            src="https://images.unsplash.com/photo-1559599101-f09722fb4948?w=700&q=85&auto=format&fit=crop"
            alt="使用後"
          />
          <div class="ba-overlay" />
          <div class="ba-label">使用後</div>
          <div class="ba-badge" style="background: var(--green)">
            第 28 天 ✨
          </div>
        </div>
      </div>
    </section>

    <!-- REVIEWS -->
    <section id="reviews">
      <div class="reviews-inner">
        <div class="reviews-header reveal">
          <div>
            <span class="section-eyebrow">用戶評價</span>
            <h2 class="section-title">她們都這樣說</h2>
          </div>
          <div>
            <div class="rating-big">4.9</div>
            <div class="rating-stars">★★★★★</div>
            <div class="rating-sub">共 5,847 則評價</div>
          </div>
        </div>
        <div class="reviews-grid">
          <div class="review-card reveal">
            <div class="rv-stars">★★★★★</div>
            <p class="rv-body">
              「用了一週皮膚就開始有光澤感！以前臉總是乾乾的，現在同事一直問我是不是做了什麼保養。絕對回購！」
            </p>
            <div class="rv-author">
              <img
                class="rv-avatar"
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&crop=face&auto=format"
                alt="用戶"
              />
              <div>
                <div class="rv-name">林雅婷</div>
                <div class="rv-meta">
                  敏感混合肌 · <span class="rv-verified">✓ 已驗證購買</span>
                </div>
              </div>
            </div>
          </div>
          <div class="review-card reveal" style="transition-delay: 0.1s">
            <div class="rv-stars">★★★★★</div>
            <p class="rv-body">
              「身為醫美診所護理師，我對保養品要求很高。這款精華成分紮實、吸收快不黏膩，玫瑰系列的味道超好聞，強力推薦！」
            </p>
            <div class="rv-author">
              <img
                class="rv-avatar"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&auto=format"
                alt="用戶"
              />
              <div>
                <div class="rv-name">陳芳瑜</div>
                <div class="rv-meta">
                  醫美護理師 · <span class="rv-verified">✓ 已驗證購買</span>
                </div>
              </div>
            </div>
          </div>
          <div class="review-card reveal" style="transition-delay: 0.2s">
            <div class="rv-stars">★★★★★</div>
            <p class="rv-body">
              「已經是第五瓶了！色斑真的淡了很多，老公說我最近氣色越來越好，這就是最好的認可。」
            </p>
            <div class="rv-author">
              <img
                class="rv-avatar"
                src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=80&h=80&fit=crop&crop=face&auto=format"
                alt="用戶"
              />
              <div>
                <div class="rv-name">王淑慧</div>
                <div class="rv-meta">
                  35歲上班族 · <span class="rv-verified">✓ 已驗證購買</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rating-summary-card reveal">
          <div class="rs-block">
            <div class="rs-val">4.9</div>
            <div class="rating-stars" style="font-size: 0.9rem">★★★★★</div>
            <div class="rs-lbl">綜合評分</div>
          </div>
          <div class="rs-div" />
          <div class="rs-block">
            <div class="rs-val">5,847</div>
            <div class="rs-lbl">評價數量</div>
          </div>
          <div class="rs-div" />
          <div class="rs-block">
            <div class="rs-val">97%</div>
            <div class="rs-lbl">推薦比率</div>
          </div>
          <div class="rs-div" />
          <div class="rbar-wrap">
            <div class="rbar-row">
              <span class="rbar-lbl">5★</span>
              <div class="rbar-track">
                <div class="rbar-fill" style="width: 89%" />
              </div>
              <span class="rbar-pct">89%</span>
            </div>
            <div class="rbar-row">
              <span class="rbar-lbl">4★</span>
              <div class="rbar-track">
                <div class="rbar-fill" style="width: 8%; opacity: 0.7" />
              </div>
              <span class="rbar-pct">8%</span>
            </div>
            <div class="rbar-row">
              <span class="rbar-lbl">3★</span>
              <div class="rbar-track">
                <div class="rbar-fill" style="width: 2%; opacity: 0.5" />
              </div>
              <span class="rbar-pct">2%</span>
            </div>
            <div class="rbar-row">
              <span class="rbar-lbl">2★</span>
              <div class="rbar-track">
                <div class="rbar-fill" style="width: 1%; opacity: 0.3" />
              </div>
              <span class="rbar-pct">1%</span>
            </div>
            <div class="rbar-row">
              <span class="rbar-lbl">1★</span>
              <div class="rbar-track">
                <div class="rbar-fill" style="width: 0%" />
              </div>
              <span class="rbar-pct">0%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BUNDLE -->
    <section id="bundle">
      <div class="reveal">
        <span class="section-eyebrow">搭配組合</span>
        <h2 class="section-title">完整保養<em>一步到位</em></h2>
        <p class="section-body" style="margin-top: 12px">
          搭配我們的完整系列，享受疊加倍效，更可享組合優惠折扣。
        </p>
      </div>
      <div class="bundle-grid">
        <div class="bundle-card reveal">
          <div class="bundle-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80&auto=format&fit=crop"
              alt="潔顏慕斯"
            />
          </div>
          <div class="bundle-body">
            <div class="bundle-name">🫧 BLOOM 玫瑰潔顏慕斯</div>
            <div class="bundle-desc">
              溫和胺基酸配方，深層清潔不過乾，是精華的完美前置步驟。
            </div>
            <div class="bundle-price-row">
              <span class="bundle-price">NT$680</span
              ><span class="bundle-orig">NT$980</span>
            </div>
            <a href="#checkout" class="bundle-btn">加入購物車</a>
          </div>
        </div>
        <div class="bundle-card reveal" style="transition-delay: 0.1s">
          <div class="bundle-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1619451683794-af38c0ef45df?w=400&q=80&auto=format&fit=crop"
              alt="乳霜"
            />
          </div>
          <div class="bundle-body">
            <div class="bundle-name">🌸 BLOOM 玫瑰修護乳霜</div>
            <div class="bundle-desc">
              夜間深度修護，精華使用後立即鎖水，讓保濕效果延長至隔天。
            </div>
            <div class="bundle-price-row">
              <span class="bundle-price">NT$880</span
              ><span class="bundle-orig">NT$1,280</span>
            </div>
            <a href="#checkout" class="bundle-btn">加入購物車</a>
          </div>
        </div>
        <div
          class="bundle-card reveal"
          style="transition-delay: 0.2s; border-color: rgba(255, 107, 71, 0.35)"
        >
          <div class="bundle-img-wrap" style="position: relative">
            <img
              src="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&q=80&auto=format&fit=crop"
              alt="超值組合"
            />
            <div
              style="
                position: absolute;
                top: 10px;
                left: 10px;
                background: var(--coral);
                color: #fff;
                font-size: 0.68rem;
                font-weight: 700;
                padding: 4px 10px;
                border-radius: 100px;
              "
            >
              ⭐ 最超值
            </div>
          </div>
          <div class="bundle-body">
            <div class="bundle-name">🎁 三件組超值套組</div>
            <div class="bundle-desc">
              精華 + 潔顏慕斯 + 修護乳霜，完整早晚保養，買三享 45% OFF。
            </div>
            <div class="bundle-price-row">
              <span class="bundle-price">NT$2,288</span
              ><span class="bundle-orig">NT$4,240</span>
            </div>
            <a
              href="#checkout"
              class="bundle-btn"
              style="
                background: var(--coral);
                color: #fff;
                border-color: var(--coral);
              "
              >搶購組合優惠</a
            >
          </div>
        </div>
      </div>
    </section>

    <!-- CHECKOUT -->
    <section id="checkout">
      <div class="checkout-wrap">
        <div class="reveal" style="text-align: center">
          <span class="section-eyebrow">安全結帳</span>
          <h2 class="section-title">完成您的<em>美麗計畫</em></h2>
        </div>
        <div class="checkout-box reveal">
          <div class="form-pane">
            <div class="pane-title">收件資訊</div>
            <div class="f-row">
              <div class="f-group">
                <label class="f-label">姓氏</label
                ><input class="f-input" placeholder="林" />
              </div>
              <div class="f-group">
                <label class="f-label">名字</label
                ><input class="f-input" placeholder="小美" />
              </div>
            </div>
            <div class="f-group">
              <label class="f-label">電子郵件</label
              ><input
                class="f-input"
                type="email"
                placeholder="your@email.com"
              />
            </div>
            <div class="f-group">
              <label class="f-label">手機</label
              ><input class="f-input" type="tel" placeholder="0912 345 678" />
            </div>
            <div class="f-group">
              <label class="f-label">收件地址</label
              ><input
                class="f-input"
                placeholder="台北市大安區仁愛路四段 1 號"
              />
            </div>
            <div class="f-row">
              <div class="f-group">
                <label class="f-label">城市</label
                ><input class="f-input" placeholder="台北市" />
              </div>
              <div class="f-group">
                <label class="f-label">郵遞區號</label
                ><input class="f-input" placeholder="106" />
              </div>
            </div>
            <div class="pane-title" style="margin-top: 24px">付款方式</div>
            <div class="f-group">
              <label class="f-label">卡號</label
              ><input class="f-input" placeholder="1234 5678 9012 3456" />
            </div>
            <div class="f-row">
              <div class="f-group">
                <label class="f-label">到期日</label
                ><input class="f-input" placeholder="MM / YY" />
              </div>
              <div class="f-group">
                <label class="f-label">安全碼</label
                ><input class="f-input" placeholder="CVC" />
              </div>
            </div>
          </div>
          <div class="order-pane">
            <div class="pane-title">訂單明細</div>
            <div class="order-item">
              <img
                class="order-item-img"
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=120&q=80&auto=format&fit=crop"
                alt="精華"
              />
              <div class="oi-info">
                <div class="oi-name">BLOOM 護膚精華 ×{{ qty }}</div>
                <div class="oi-variant">{{ selectedVariant }}</div>
              </div>
              <div class="oi-price">{{ summaryPrice }}</div>
            </div>
            <div class="total-rows">
              <div class="t-row">
                <span>小計</span><span>{{ summaryPrice }}</span>
              </div>
              <div class="t-row">
                <span>運費</span><span style="color: var(--green)">免費</span>
              </div>
              <div class="t-row">
                <span>新品優惠</span
                ><span style="color: var(--badge-red)">－NT$700</span>
              </div>
              <div class="t-row grand">
                <span>總計</span><span class="amount">{{ grandTotal }}</span>
              </div>
            </div>
            <button
              class="submit-btn"
              @click="(e) => handleOrder(e.target as HTMLButtonElement)"
            >
              立即付款 — {{ grandTotal }} 🌸
            </button>
            <div class="secure-row">
              🔒 SSL 加密 · Apple Pay · LINE Pay · 信用卡
            </div>
            <div class="box-included">
              <div class="bi-title">🎁 訂購包含</div>
              <div class="bi-list">
                ✅ BLOOM 護膚精華 30ml<br />✅ 精美禮盒包裝<br />✅
                使用說明卡<br />✅ 試用小樣（隨機）<br />✅ 6 個月品質保障
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq">
      <div style="text-align: center; margin-bottom: 48px" class="reveal">
        <span class="section-eyebrow">常見問題</span>
        <h2 class="section-title">您想知道的<em>一切</em></h2>
      </div>
      <div>
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="faq-item"
          :class="{ open: openFaq === i }"
        >
          <button class="faq-q" @click="toggleFaq(i)">
            {{ item.q }}<span class="faq-plus">+</span>
          </button>
          <div class="faq-a">{{ item.a }}</div>
        </div>
      </div>
    </section>

    <footer>
      <div class="footer-logo">bloom.</div>
      <div class="footer-links">
        <a href="#">隱私政策</a><a href="#">服務條款</a><a href="#">聯絡客服</a
        ><a href="#">退換貨</a>
      </div>
      <div>© 2025 BLOOM Beauty · 圖片來源：Unsplash (CC0)</div>
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
  --coral: #ff6b47;
  --coral-dk: #e84e2c;
  --coral-lt: #ff8e6e;
  --coral-pale: #fff0ec;
  --coral-bg: #fef6f4;
  --cream: #fffbf8;
  --warm-white: #fff8f5;
  --sand: #f5ede6;
  --sand-dk: #e8d9ce;
  --text: #1a1007;
  --text-2: #4a3728;
  --text-3: #9a8070;
  --border: rgba(255, 107, 71, 0.15);
  --border-neu: rgba(26, 16, 7, 0.08);
  --green: #2ecc71;
  --badge-red: #ff3b30;
  --shadow-sm: 0 2px 12px rgba(255, 107, 71, 0.12);
  --shadow-md: 0 8px 32px rgba(255, 107, 71, 0.18);
  --shadow-lg: 0 20px 60px rgba(255, 107, 71, 0.22);
  background: var(--cream);
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
}
html:has(.page-root) body {
  cursor: none;
  background: var(--cream);
}
.page-root button {
  cursor: none;
  font-family: inherit;
  border: none;
  background: none;
}

#cur {
  position: fixed;
  width: 12px;
  height: 12px;
  background: var(--coral);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition:
    width 0.2s,
    height 0.2s;
}
#cur-ring {
  position: fixed;
  width: 38px;
  height: 38px;
  border: 2px solid rgba(255, 107, 71, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition:
    width 0.3s,
    height 0.3s;
}

#topbar {
  background: linear-gradient(
    90deg,
    var(--coral-dk),
    var(--coral),
    var(--coral-lt)
  );
  color: #fff;
  text-align: center;
  padding: 10px 20px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  position: relative;
  z-index: 300;
}
.tb-close {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  transition: color 0.2s;
}
.tb-close:hover {
  color: #fff;
}

nav {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 52px;
  height: 66px;
  background: rgba(255, 251, 248, 0.93);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-neu);
}
.nav-logo {
  font-family: serif;
  font-size: 1.7rem;
  font-weight: 900;
  color: var(--coral);
}
.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
}
.nav-links a {
  font-size: 0.83rem;
  font-weight: 500;
  color: var(--text-2);
  transition: color 0.2s;
}
.nav-links a:hover {
  color: var(--coral);
}
.btn-cart {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--coral);
  color: #fff;
  padding: 9px 20px;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.25s;
  box-shadow: var(--shadow-sm);
}
.btn-cart:hover {
  background: var(--coral-dk);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}
.cart-badge {
  background: #fff;
  color: var(--coral);
  font-size: 0.62rem;
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
  min-height: calc(100vh - 104px);
  background: var(--warm-white);
  overflow: hidden;
  position: relative;
}
#hero::before {
  content: '';
  position: absolute;
  right: -100px;
  top: -80px;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(255, 107, 71, 0.1) 0%,
    transparent 65%
  );
  pointer-events: none;
  z-index: 0;
  animation: blob 10s ease-in-out infinite alternate;
}
#hero::after {
  content: '';
  position: absolute;
  left: -80px;
  bottom: -60px;
  width: 380px;
  height: 380px;
  background: radial-gradient(
    circle,
    rgba(255, 142, 110, 0.08) 0%,
    transparent 65%
  );
  pointer-events: none;
  z-index: 0;
  animation: blob 14s ease-in-out infinite alternate-reverse;
}
@keyframes blob {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(30px, -20px) scale(1.08);
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
.pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--coral-pale);
  border: 1px solid rgba(255, 107, 71, 0.25);
  color: var(--coral-dk);
  padding: 7px 14px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  margin-bottom: 24px;
  align-self: flex-start;
}
.pill-dot {
  width: 7px;
  height: 7px;
  background: var(--coral);
  border-radius: 50%;
  box-shadow: 0 0 6px var(--coral);
  animation: pulse-d 1.4s infinite;
}
@keyframes pulse-d {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.6);
    opacity: 0.5;
  }
}
.hero-title {
  font-family: serif;
  font-size: clamp(3rem, 5.5vw, 5.2rem);
  font-weight: 900;
  line-height: 1;
  color: var(--text);
  margin-bottom: 18px;
  letter-spacing: -0.02em;
}
.hero-title em {
  font-style: italic;
  color: var(--coral);
}
.hero-title .stroke {
  -webkit-text-stroke: 2px var(--coral);
  color: transparent;
}
.hero-sub {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-2);
  font-weight: 300;
  max-width: 420px;
  margin-bottom: 28px;
}
.price-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.price-now {
  font-family: serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--coral);
  line-height: 1;
}
.price-was {
  font-size: 1rem;
  color: var(--text-3);
  text-decoration: line-through;
}
.discount-pill {
  background: var(--badge-red);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 100px;
  letter-spacing: 0.06em;
}
.countdown-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--coral-pale);
  border: 1px solid rgba(255, 107, 71, 0.2);
  border-radius: 12px;
  padding: 10px 16px;
  margin-bottom: 22px;
}
.cd-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--coral-dk);
}
.cd-nums {
  display: flex;
  gap: 4px;
  align-items: center;
}
.cnum {
  background: var(--coral);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  width: 34px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.csep {
  font-weight: 700;
  color: var(--coral);
}
.variant-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--text-3);
  text-transform: uppercase;
  margin-bottom: 10px;
}
.scent-options {
  display: flex;
  gap: 8px;
  margin-bottom: 26px;
  flex-wrap: wrap;
}
.scent-chip {
  padding: 7px 16px;
  border-radius: 100px;
  border: 1.5px solid var(--border-neu);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-2);
  background: #fff;
  transition: all 0.2s;
}
.scent-chip.active {
  border-color: var(--coral);
  color: var(--coral);
  background: var(--coral-pale);
  box-shadow: 0 0 0 3px rgba(255, 107, 71, 0.12);
}
.buy-row {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 26px;
}
.qty-ctrl {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--border-neu);
  border-radius: 100px;
  background: #fff;
  overflow: hidden;
}
.qty-btn {
  width: 38px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-2);
  transition: all 0.2s;
}
.qty-btn:hover {
  background: var(--coral-pale);
  color: var(--coral);
}
.qty-val {
  width: 40px;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  border-left: 1.5px solid var(--border-neu);
  border-right: 1.5px solid var(--border-neu);
}
.btn-primary-buy {
  flex: 1;
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--coral) 0%, var(--coral-dk) 100%);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 100px;
  transition: all 0.3s;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}
.btn-primary-buy::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 40%;
  height: 200%;
  background: rgba(255, 255, 255, 0.22);
  transform: skewX(-25deg);
  transition: left 0.5s;
}
.btn-primary-buy:hover::before {
  left: 140%;
}
.btn-primary-buy:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
.btn-save {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid var(--border-neu);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--text-3);
  transition: all 0.25s;
  flex-shrink: 0;
}
.btn-save:hover,
.btn-save.active {
  border-color: var(--coral);
  color: var(--coral);
  background: var(--coral-pale);
}
.trust-strip {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  padding-top: 20px;
  border-top: 1px solid var(--border-neu);
}
.trust-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--text-3);
  font-weight: 500;
}

.hero-right {
  background: var(--sand);
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
    ellipse 60% 50% at 50% 30%,
    rgba(255, 107, 71, 0.1) 0%,
    transparent 65%
  );
}
.product-showcase {
  position: relative;
  width: 420px;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.deco-circle {
  position: absolute;
  border-radius: 50%;
  border: 1.5px dashed rgba(255, 107, 71, 0.2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.deco-circle.c1 {
  width: 400px;
  height: 400px;
  animation: spin-s 40s linear infinite;
}
.deco-circle.c2 {
  width: 310px;
  height: 310px;
  animation: spin-s 28s linear infinite reverse;
  border-style: solid;
  border-color: rgba(255, 107, 71, 0.08);
}
.deco-circle.c3 {
  width: 210px;
  height: 210px;
  animation: spin-s 18s linear infinite;
  border-color: rgba(255, 107, 71, 0.15);
}
@keyframes spin-s {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.product-main-img {
  width: 300px;
  height: 370px;
  object-fit: contain;
  position: relative;
  z-index: 3;
  filter: drop-shadow(0 24px 60px rgba(255, 107, 71, 0.22))
    drop-shadow(0 4px 16px rgba(0, 0, 0, 0.08));
  animation: float-up 5s ease-in-out infinite;
}
@keyframes float-up {
  0%,
  100% {
    transform: translateY(0) rotate(-0.5deg);
  }
  50% {
    transform: translateY(-16px) rotate(0.5deg);
  }
}
.float-label {
  position: absolute;
  z-index: 4;
  background: #fff;
  border-radius: 14px;
  padding: 10px 14px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.09);
  animation: float-up 4s ease-in-out infinite;
  white-space: nowrap;
}
.float-label.fl1 {
  top: 8%;
  left: 0;
  animation-delay: 0.3s;
}
.float-label.fl2 {
  top: 8%;
  right: 0;
  animation-delay: 1s;
}
.float-label.fl3 {
  bottom: 14%;
  left: -2%;
  animation-delay: 0.7s;
}
.float-label.fl4 {
  bottom: 14%;
  right: -2%;
  animation-delay: 1.5s;
}
.fl-icon {
  font-size: 1rem;
  margin-bottom: 3px;
}
.fl-val {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text);
}
.fl-key {
  font-size: 0.65rem;
  color: var(--text-3);
}
.product-shadow {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 20px;
  background: radial-gradient(
    ellipse,
    rgba(255, 107, 71, 0.18) 0%,
    transparent 70%
  );
  filter: blur(6px);
  animation: shadow-p 5s ease-in-out infinite;
}
@keyframes shadow-p {
  0%,
  100% {
    transform: translateX(-50%) scaleX(1);
    opacity: 0.8;
  }
  50% {
    transform: translateX(-50%) scaleX(0.7);
    opacity: 0.4;
  }
}

.ribbon {
  background: var(--coral-pale);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  padding: 12px 0;
}
.ribbon-track {
  display: inline-flex;
  animation: ticker 28s linear infinite;
}
.ribbon-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--coral-dk);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 0 28px;
  white-space: nowrap;
}
@keyframes ticker {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.stats-bar {
  background: var(--coral);
  padding: 36px 52px;
  display: flex;
  justify-content: center;
  gap: 0;
}
.stat-block {
  flex: 1;
  text-align: center;
  padding: 0 24px;
  position: relative;
}
.stat-block + .stat-block::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10%;
  height: 80%;
  width: 1px;
  background: rgba(255, 255, 255, 0.25);
}
.stat-num {
  font-family: serif;
  font-size: 2.4rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  display: block;
}
.stat-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 6px;
  display: block;
}

.section-eyebrow {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--coral);
  text-transform: uppercase;
  display: block;
  margin-bottom: 14px;
}
.section-title {
  font-family: serif;
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 900;
  line-height: 1.05;
  color: var(--text);
  margin-bottom: 14px;
  letter-spacing: -0.02em;
}
.section-title em {
  font-style: italic;
  color: var(--coral);
}
.section-body {
  font-size: 0.95rem;
  color: var(--text-2);
  line-height: 1.85;
  font-weight: 300;
  max-width: 540px;
}

#features {
  padding: 100px 52px;
  background: var(--warm-white);
  max-width: 1300px;
  margin: 0 auto;
}
.features-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  margin-top: 64px;
}
.features-img-wrap {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  height: 480px;
  box-shadow: var(--shadow-lg);
}
.features-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.features-img-wrap:hover .features-img {
  transform: scale(1.04);
}
.features-img-tag {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: #fff;
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text);
  box-shadow: var(--shadow-sm);
}
.features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.feature-row {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  padding: 20px;
  border-radius: 16px;
  border: 1.5px solid var(--border-neu);
  background: #fff;
  transition: all 0.3s;
}
.feature-row:hover {
  border-color: rgba(255, 107, 71, 0.3);
  box-shadow: var(--shadow-sm);
  transform: translateX(6px);
}
.feature-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--coral-pale);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  transition: background 0.2s;
}
.feature-row:hover .feature-icon-wrap {
  background: var(--coral);
}
.feature-text h4 {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 5px;
}
.feature-text p {
  font-size: 0.82rem;
  color: var(--text-3);
  line-height: 1.65;
}

#how-to {
  padding: 100px 52px;
  background: var(--coral-pale);
}
.how-to-inner {
  max-width: 1200px;
  margin: 0 auto;
}
.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
  margin-top: 56px;
}
.step-card {
  background: #fff;
  padding: 36px 28px;
  position: relative;
  transition: all 0.3s;
  border: 1.5px solid rgba(255, 107, 71, 0.1);
  border-radius: 3px;
}
.step-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-6px);
  border-color: rgba(255, 107, 71, 0.35);
}
.step-num {
  font-family: serif;
  font-size: 3.5rem;
  font-weight: 900;
  color: rgba(255, 107, 71, 0.12);
  line-height: 1;
  margin-bottom: 14px;
}
.step-icon {
  font-size: 1.8rem;
  margin-bottom: 14px;
}
.step-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}
.step-desc {
  font-size: 0.82rem;
  color: var(--text-3);
  line-height: 1.7;
}
.step-arrow {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--coral);
  z-index: 1;
}
.step-card:last-child .step-arrow {
  display: none;
}

#before-after {
  padding: 100px 52px;
  background: var(--warm-white);
  max-width: 1300px;
  margin: 0 auto;
}
.ba-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 56px;
}
.ba-card {
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  height: 340px;
  box-shadow: var(--shadow-md);
}
.ba-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(15%);
  transition:
    filter 0.5s,
    transform 0.6s;
}
.ba-card:hover img {
  filter: grayscale(0%);
  transform: scale(1.04);
}
.ba-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(26, 16, 7, 0.5) 0%, transparent 60%);
}
.ba-label {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-family: serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
}
.ba-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--coral);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 100px;
  letter-spacing: 0.08em;
}

#reviews {
  padding: 100px 52px;
  background: var(--sand);
}
.reviews-inner {
  max-width: 1200px;
  margin: 0 auto;
}
.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
}
.rating-big {
  font-family: serif;
  font-size: 4.5rem;
  font-weight: 700;
  color: var(--coral);
  line-height: 1;
}
.rating-stars {
  color: #ff9500;
  font-size: 1.1rem;
  letter-spacing: 2px;
}
.rating-sub {
  font-size: 0.78rem;
  color: var(--text-3);
  margin-top: 4px;
}
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}
.review-card {
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  transition: all 0.3s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
.review-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}
.rv-stars {
  color: #ff9500;
  font-size: 0.82rem;
  letter-spacing: 2px;
  margin-bottom: 12px;
}
.rv-body {
  font-size: 0.87rem;
  color: var(--text-2);
  line-height: 1.8;
  margin-bottom: 18px;
}
.rv-author {
  display: flex;
  align-items: center;
  gap: 10px;
}
.rv-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--coral-pale);
}
.rv-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
}
.rv-meta {
  font-size: 0.7rem;
  color: var(--text-3);
  margin-top: 2px;
}
.rv-verified {
  color: var(--green);
}
.rating-summary-card {
  background: #fff;
  border-radius: 20px;
  padding: 32px 36px;
  display: flex;
  align-items: center;
  gap: 48px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
}
.rs-block {
  text-align: center;
  flex-shrink: 0;
}
.rs-val {
  font-family: serif;
  font-size: 3rem;
  font-weight: 700;
  color: var(--coral);
  line-height: 1;
}
.rs-lbl {
  font-size: 0.7rem;
  color: var(--text-3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 4px;
}
.rs-div {
  width: 1px;
  height: 60px;
  background: var(--border-neu);
}
.rbar-wrap {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rbar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.rbar-lbl {
  font-size: 0.72rem;
  color: var(--text-3);
  width: 20px;
  text-align: right;
}
.rbar-track {
  flex: 1;
  height: 6px;
  background: var(--sand-dk);
  border-radius: 3px;
  overflow: hidden;
}
.rbar-fill {
  height: 100%;
  background: var(--coral);
  border-radius: 3px;
}
.rbar-pct {
  font-size: 0.72rem;
  color: var(--text-3);
  width: 28px;
}

#bundle {
  padding: 100px 52px;
  background: var(--warm-white);
  max-width: 1300px;
  margin: 0 auto;
}
.bundle-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 48px;
}
.bundle-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  border: 1.5px solid var(--border-neu);
  transition: all 0.3s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}
.bundle-card:hover {
  border-color: rgba(255, 107, 71, 0.3);
  box-shadow: var(--shadow-md);
  transform: translateY(-6px);
}
.bundle-img-wrap {
  height: 180px;
  overflow: hidden;
  background: var(--sand);
  position: relative;
}
.bundle-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.bundle-card:hover .bundle-img-wrap img {
  transform: scale(1.06);
}
.bundle-body {
  padding: 20px;
}
.bundle-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
}
.bundle-desc {
  font-size: 0.78rem;
  color: var(--text-3);
  line-height: 1.6;
  margin-bottom: 14px;
}
.bundle-price-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.bundle-price {
  color: var(--coral);
  font-weight: 700;
  font-size: 0.95rem;
}
.bundle-orig {
  color: var(--text-3);
  font-size: 0.8rem;
  text-decoration: line-through;
}
.bundle-btn {
  display: block;
  text-align: center;
  margin-top: 12px;
  padding: 9px;
  border-radius: 100px;
  border: 1.5px solid var(--coral);
  color: var(--coral);
  font-size: 0.78rem;
  font-weight: 600;
  transition: all 0.25s;
}
.bundle-btn:hover {
  background: var(--coral);
  color: #fff;
}

#checkout {
  padding: 100px 52px;
  background: linear-gradient(
    160deg,
    var(--coral-pale) 0%,
    var(--warm-white) 100%
  );
}
.checkout-wrap {
  max-width: 960px;
  margin: 0 auto;
}
.checkout-box {
  background: #fff;
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  margin-top: 52px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.form-pane {
  padding: 44px 40px;
}
.order-pane {
  padding: 44px 40px;
  background: var(--sand);
  border-left: 1px solid var(--border-neu);
}
.pane-title {
  font-family: serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 26px;
}
.f-group {
  margin-bottom: 14px;
}
.f-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--text-3);
  text-transform: uppercase;
  display: block;
  margin-bottom: 6px;
}
.f-input {
  width: 100%;
  padding: 11px 14px;
  background: #fff;
  border: 1.5px solid var(--border-neu);
  border-radius: 10px;
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.88rem;
  outline: none;
  transition:
    border-color 0.25s,
    box-shadow 0.25s;
}
.f-input:focus {
  border-color: var(--coral);
  box-shadow: 0 0 0 3px rgba(255, 107, 71, 0.12);
}
.f-input::placeholder {
  color: var(--text-3);
}
.f-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.order-item {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-neu);
}
.order-item-img {
  width: 56px;
  height: 64px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}
.oi-info {
  flex: 1;
}
.oi-name {
  font-size: 0.87rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 3px;
}
.oi-variant {
  font-size: 0.73rem;
  color: var(--text-3);
}
.oi-price {
  font-weight: 700;
  color: var(--coral);
  font-size: 0.9rem;
}
.total-rows {
  margin-top: 18px;
}
.t-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.84rem;
  color: var(--text-2);
  padding: 6px 0;
}
.t-row.grand {
  border-top: 1px solid var(--border-neu);
  margin-top: 10px;
  padding-top: 14px;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
}
.t-row.grand .amount {
  color: var(--coral);
}
.submit-btn {
  width: 100%;
  margin-top: 24px;
  padding: 16px;
  background: linear-gradient(135deg, var(--coral) 0%, var(--coral-dk) 100%);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 100px;
  transition: all 0.3s;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.04em;
}
.submit-btn::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 40%;
  height: 200%;
  background: rgba(255, 255, 255, 0.22);
  transform: skewX(-25deg);
  transition: left 0.5s;
}
.submit-btn:hover::before {
  left: 140%;
}
.submit-btn:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
.secure-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 0.72rem;
  color: var(--text-3);
}
.box-included {
  margin-top: 24px;
  padding: 16px;
  background: var(--coral-pale);
  border-radius: 14px;
  border: 1px solid rgba(255, 107, 71, 0.2);
}
.bi-title {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--coral);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
  text-transform: uppercase;
}
.bi-list {
  font-size: 0.8rem;
  color: var(--text-2);
  line-height: 2;
}

#faq {
  padding: 80px 52px;
  max-width: 800px;
  margin: 0 auto;
}
.faq-item {
  border-bottom: 1px solid var(--border-neu);
}
.faq-q {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text);
  transition: color 0.2s;
}
.faq-q:hover {
  color: var(--coral);
}
.faq-plus {
  color: var(--coral);
  font-size: 1.2rem;
  transition: transform 0.3s;
  flex-shrink: 0;
  margin-left: 12px;
}
.faq-item.open .faq-plus {
  transform: rotate(45deg);
}
.faq-a {
  font-size: 0.87rem;
  color: var(--text-2);
  line-height: 1.85;
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.4s ease,
    padding 0.3s;
}
.faq-item.open .faq-a {
  max-height: 200px;
  padding-bottom: 18px;
}

footer {
  background: var(--text);
  color: rgba(255, 255, 255, 0.45);
  padding: 40px 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
}
.footer-logo {
  font-family: serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--coral);
}
.footer-links {
  display: flex;
  gap: 20px;
}
.footer-links a {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.2s;
}
.footer-links a:hover {
  color: var(--coral-lt);
}

.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.65s ease,
    transform 0.65s ease;
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
  .product-showcase {
    width: 280px;
    height: 300px;
  }
  .product-main-img {
    width: 220px;
    height: 260px;
  }
  .deco-circle.c1 {
    width: 260px;
    height: 260px;
  }
  .deco-circle.c2 {
    width: 200px;
    height: 200px;
  }
  .deco-circle.c3 {
    width: 140px;
    height: 140px;
  }
  .features-layout,
  .ba-grid,
  .checkout-box {
    grid-template-columns: 1fr;
  }
  .bundle-grid {
    grid-template-columns: 1fr 1fr;
  }
  .steps-grid {
    grid-template-columns: 1fr 1fr;
  }
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  .stats-bar {
    flex-wrap: wrap;
    gap: 20px;
    padding: 28px 20px;
  }
  .reviews-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  #features,
  #how-to,
  #before-after,
  #reviews,
  #bundle,
  #checkout,
  #faq {
    padding: 72px 20px;
  }
  footer {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  .rating-summary-card {
    gap: 20px;
    justify-content: center;
  }
  .form-pane,
  .order-pane {
    padding: 28px 24px;
  }
  .order-pane {
    border-left: none;
    border-top: 1px solid var(--border-neu);
  }
  .step-arrow {
    display: none;
  }
}
</style>
