<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

/* ── Cursor ─────────────────────────────────────────── */
const mx = ref(0),
  my = ref(0);
const rx = ref(0),
  ry = ref(0);
let raf = null;

const dotStyle = computed(() => ({
  left: `${mx.value}px`,
  top: `${my.value}px`,
}));
const ringStyle = computed(() => ({
  left: `${rx.value}px`,
  top: `${ry.value}px`,
}));

function trackMouse(e) {
  mx.value = e.clientX;
  my.value = e.clientY;
}
function loopRing() {
  rx.value += (mx.value - rx.value) * 0.12;
  ry.value += (my.value - ry.value) * 0.12;
  raf = requestAnimationFrame(loopRing);
}

/* ── Nav ────────────────────────────────────────────── */
const navSolid = ref(false);
const menuOpen = ref(false);
function onScroll() {
  navSolid.value = window.scrollY > 50;
}
function goto(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  menuOpen.value = false;
}

/* ── Reveal ─────────────────────────────────────────── */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          const delay = el.style.getPropertyValue('--delay') || '0s';
          setTimeout(
            () => el.classList.add('revealed'),
            parseFloat(delay) * 1000,
          );
        }
      });
    },
    { threshold: 0.07 },
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

/* ── Metric counters ────────────────────────────────── */
function initCounters() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target.querySelector('.metric__val');
        if (!el || el.dataset.done) return;
        el.dataset.done = '1';
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        let n = 0;
        const step = target / 60;
        const iv = setInterval(() => {
          n += step;
          if (n >= target) {
            n = target;
            clearInterval(iv);
          }
          el.textContent = Math.floor(n).toLocaleString() + suffix;
        }, 18);
      });
    },
    { threshold: 0.5 },
  );
  document.querySelectorAll('.metric').forEach((el) => io.observe(el));
}

/* ── Form ───────────────────────────────────────────── */
const loading = ref(false);
const sent = ref(false);
const fm = reactive({
  first: '',
  last: '',
  email: '',
  company: '',
  focus: '',
  note: '',
});
function submitForm() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    sent.value = true;
  }, 1500);
}

/* ── UI State ───────────────────────────────────────── */
const showBanner = ref(true);
const openFaq = ref(null);

/* ── Data ───────────────────────────────────────────── */
const navItems = [
  { id: 'about', label: '關於我們' },
  { id: 'programs', label: '課程方案' },
  { id: 'process', label: '方法論' },
  { id: 'results', label: '客戶成果' },
  { id: 'team', label: '教練團隊' },
];

const heroProof = [
  { num: '500+', label: '培訓領導者人數' },
  { num: '94%', label: '客戶晉升率' },
  { num: '$2.1B', label: '創造商業價值' },
];

const alumBrands = ['高盛集團', '麥肯錫', '台積電', '鴻海集團', 'Google'];

const tickerContent = [
  '高階主管教練',
  '領導力加速發展',
  '董事會簡報訓練',
  '團隊文化轉型',
  '策略思維清晰化',
  '高影響力溝通',
  '接班人計劃',
  '組織文化架構',
  '新創領導力',
  '高階主管教練',
  '領導力加速發展',
  '董事會簡報訓練',
];

const differentiators = [
  {
    icon: '🎯',
    title: '90 天內看見成果',
    body: '每個合作都設定明確 KPI，可量化的影響力，否則退款保證。',
  },
  {
    icon: '🧠',
    title: '科學實證的方法論',
    body: '以行為科學研究為基礎，結合實證領導力框架，而非空洞理論。',
  },
  {
    icon: '🤝',
    title: '真實的營運經驗',
    body: '我們的教練都曾親自負責損益、管理跨國團隊，並帶領組織度過危機。',
  },
];

const programs = [
  {
    icon: '🌱',
    title: '一對一高管教練',
    desc: '為面臨複雜轉型、績效瓶頸或快速成長的資深領導者，提供深度個人化教練服務。',
    features: [
      '每週 60 分鐘一對一教練會談',
      '不限次數非同步訊息支援',
      '360° 利害關係人訪談評估',
      '客製化領導力成長路線圖',
      '90 天里程碑進度檢視',
    ],
    duration: '3 個月或 6 個月',
    price: 'NT$120,000起',
    featured: false,
  },
  {
    icon: '🚀',
    title: '領導力加速器',
    desc: '高強度 6 個月梯隊課程，專為準備在 18 個月內晉升 C 字頭的高潛力副總而設計。',
    features: [
      '雙週群組工作坊',
      '每月 4 次私人教練會談',
      '同儕 CEO 智囊團資格',
      '董事會簡報實戰模擬',
      '校友人脈網絡（終身資格）',
    ],
    duration: '6 個月梯隊制',
    price: 'NT$75,000起',
    featured: true,
  },
  {
    icon: '🏢',
    title: '企業培訓方案',
    desc: '為準備大規模建設的組織，提供客製化工作坊、主管培訓學院與文化轉型專案。',
    features: [
      '全客製化課程設計',
      '實體與線上彈性授課',
      '含組織層級診斷評估',
      '主管教練工具包',
      'ROI 成效追蹤報表',
    ],
    duration: '彈性配合',
    price: '依規模客製報價',
    featured: false,
  },
];

const processSteps = [
  {
    icon: '🔍',
    title: '探索對話',
    body: '聚焦 30 分鐘，深入了解您的處境、挑戰與核心目標。',
  },
  {
    icon: '📊',
    title: '領導力健診',
    body: '360° 評估優勢與盲點，找出那個能改變一切的關鍵槓桿。',
  },
  {
    icon: '🗺️',
    title: '精準路線圖',
    body: '圍繞您的具體情境，制定含清晰里程碑的 90 天行動計畫。',
  },
  {
    icon: '⚡',
    title: '每週深度執行',
    body: '密集會談加上會議間的即時支援，持續維持高動能狀態。',
  },
  {
    icon: '📈',
    title: '衡量與複利',
    body: '追蹤關鍵指標，鎖固行為改變，規劃下一個突破點。',
  },
];

const metricsList = [
  {
    display: '500+',
    target: 500,
    suffix: '+',
    label: '培訓領導者人數',
    delay: 0,
  },
  { display: '94%', target: 94, suffix: '%', label: '客戶晉升率', delay: 0.08 },
  {
    display: '4.97',
    target: 497,
    suffix: '',
    label: '平均滿意度（滿 5 分）',
    delay: 0.16,
  },
  {
    display: '18+',
    target: 18,
    suffix: '+',
    label: '卓越服務年資',
    delay: 0.24,
  },
];

const testimonials = [
  {
    quote:
      '「Zeona 不只改善了我的領導力——他們從根本上改變了我的思維方式。六個月後，我晉升為首席營收長，公司業績管道翻了三倍。」',
    outcome: '+$43M',
    outcomeLbl: '業績管道成長',
    name: '陳雅婷',
    role: '首席營收長，台灣科技集團',
    photo:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&auto=format',
  },
  {
    quote:
      '「加速器課程給了我每天都在用的框架。我的團隊敬業度提升了 44 分，交付速度整整翻倍。這是我職涯中最值得的一筆投資。」',
    outcome: '+44分',
    outcomeLbl: '團隊敬業度提升',
    name: '林志遠',
    role: '工程副總，Nexus AI',
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face&auto=format',
  },
  {
    quote:
      '「一開始我對企業教練抱持懷疑。三個月後，我完成了組織重整，談成兩個關鍵策略夥伴，終於對未來五年有了清晰的方向。」',
    outcome: '決策速度 2×',
    outcomeLbl: '決策效率提升',
    name: '王慧君',
    role: '執行長，明曜健康科技',
    photo:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face&auto=format',
  },
];

const coaches = [
  {
    name: '陳建宏 博士',
    title: '創辦人暨首席教練',
    bio: '前麥肯錫合夥人、台大商研所客座教授。逾 20 年橫跨 6 大洲的 C 字頭高管教練經驗。',
    tags: ['高管教練', '策略思維', '組織文化'],
    photo:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&q=80&auto=format&fit=crop&crop=face',
  },
  {
    name: '林美玲',
    title: '資深高管教練',
    bio: '前高盛集團資深副總裁。專精董事會影響力、高風險溝通談判及領導力轉型。',
    tags: ['財務領導', '影響力', '轉型管理'],
    photo:
      'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=500&q=80&auto=format&fit=crop&crop=face',
  },
  {
    name: '張志明 博士',
    title: '組織心理學家',
    bio: '賓州大學沃頓商學院行為科學博士。主導本公司評估方法論與團隊動力培訓實務。',
    tags: ['心理評估', '團隊動力', '行為科學'],
    photo:
      'https://images.unsplash.com/photo-1600486913747-55e5470d0549?w=500&q=80&auto=format&fit=crop&crop=face',
  },
  {
    name: '吳雅雯',
    title: '巔峰績效教練',
    bio: '前奧運代表隊選手，現深耕頂尖績效領域。協助領導者提升韌性、能量管理與高效能習慣。',
    tags: ['巔峰績效', '韌性培養', '習慣養成'],
    photo:
      'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=500&q=80&auto=format&fit=crop&crop=face',
  },
];

const faqs = [
  {
    q: '教練輔導與心理諮商或導師制有何不同？',
    a: '教練輔導著眼未來、以績效為驅動核心。導師分享經驗；教練建立能力。心理諮商處理臨床議題；教練則最大化您在專業情境中的領導潛能。我們聚焦策略、行為與成果——而非個人過去。',
  },
  {
    q: '多快能看見成果？',
    a: '大多數客戶在前 30 天就感受到明顯的轉變——思考更清晰、對話更有力、決策更果斷。到第 90 天，結構性的改變就會顯現：團隊動能轉變、組織對齊改善、業務成果開始移動。',
  },
  {
    q: '我們的對話內容會保密嗎？',
    a: '絕對保密。所有教練會談均受嚴格保密協議保護。企業合作中，我們僅就整體方案層級的成果進行報告——絕不涉及個別會談內容。',
  },
  {
    q: '你們同時服務新創與大型企業嗎？',
    a: '是的。我們的服務對象涵蓋 A 輪新創創辦人到財星百強的高階主管。挑戰不同，但核心領導力原則是普世的。我們會依據您的發展階段調整方法論與節奏。',
  },
  {
    q: '如果合作不適合怎麼辦？',
    a: '若在第一次會談後，我們雙方都認為彼此不合適，我們將全額退款。我們的聲譽建立在成果上，而非綁約。我們在每次會談中都用心贏得您的持續信任。',
  },
];

const focusOptions = [
  '高管影響力與溝通表達',
  '團隊建設與組織文化',
  '策略思維與決策能力',
  '高績效領導力',
  '職涯轉型與晉升準備',
  '新創與快速擴張領導力',
  '董事會與投資人關係',
];

const contactDetails = [
  { icon: '📧', label: '電子信箱', val: '54ziziyo@gmail.com' },
  { icon: '📞', label: '聯絡電話', val: '+886 (02) 1234-5678' },
  { icon: '📍', label: '服務據點', val: '台北・台中・高雄・線上全球服務' },
];

const footerNav = [
  {
    heading: '課程方案',
    links: ['一對一高管教練', '領導力加速器', '企業培訓方案', '團隊工作坊'],
  },
  {
    heading: '關於我們',
    links: ['公司簡介', '教練團隊', '成功案例', '媒體報導'],
  },
  {
    heading: '免費資源',
    links: ['領導力評測', '公開講座', '部落格', '電子報訂閱'],
  },
];

/* ── Lifecycle ──────────────────────────────────────── */
onMounted(() => {
  loopRing();
  window.addEventListener('scroll', onScroll, { passive: true });
  initReveal();
  initCounters();
});
onUnmounted(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div class="page" @mousemove="trackMouse">
    <!-- ─── Custom Cursor ─────────────────────────────── -->
    <div class="c-dot" :style="dotStyle" />
    <div class="c-ring" :style="ringStyle" />

    <!-- ─── Top Announcement Bar ─────────────────────── -->
    <div v-if="showBanner" class="banner">
      <span
        >🎯 下一期培訓梯隊將於 <strong>9 月 8 日</strong> 開始 — 僅剩 6
        個名額</span
      >
      <button class="banner__close" @click="showBanner = false">✕</button>
    </div>

    <!-- ─── Navigation ───────────────────────────────── -->
    <header :class="['nav', { 'nav--solid': navSolid }]">
      <div class="nav__wrap">
        <a class="nav__logo" href="#hero" @click.prevent="goto('hero')">
          <span class="nav__logo-emblem">Z</span>
          <span class="nav__logo-name">Zeona <em>Studio</em></span>
        </a>

        <nav class="nav__links" :class="{ 'nav__links--open': menuOpen }">
          <a
            v-for="n in navItems"
            :key="n.id"
            :href="`#${n.id}`"
            class="nav__link"
            @click.prevent="
              goto(n.id);
              menuOpen = false;
            "
          >
            {{ n.label }}
          </a>
          <button
            class="btn btn--cta nav__cta"
            @click="
              goto('contact');
              menuOpen = false;
            "
          >
            預約諮詢
          </button>
        </nav>

        <button
          class="nav__hamburger"
          :class="{ 'nav__hamburger--open': menuOpen }"
          @click="menuOpen = !menuOpen"
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>

    <!-- ══════════════════════════════════════════════════
        HERO
    ══════════════════════════════════════════════════ -->
    <section id="hero" class="hero">
      <div class="hero__bg">
        <div class="hero__grid" />
        <div class="hero__radial" />
      </div>

      <div class="hero__layout">
        <!-- Left: Copy -->
        <div class="hero__copy">
          <div class="hero__chip">
            <span class="chip__dot" />
            高階主管教練 · 領導力發展
          </div>

          <h1 class="hero__h1">
            真正頂尖的<br />
            企業教練顧問公司，<br />
            <em class="hero__h1-italic">為認真的領導者而生。</em>
          </h1>

          <p class="hero__sub">
            我們專屬服務主管、創辦人與高潛力副總， 協助您在 90
            天內完成數年的領導力躍升。
          </p>

          <div class="hero__proof-row">
            <div v-for="p in heroProof" :key="p.label" class="hero__proof">
              <strong class="hero__proof-num">{{ p.num }}</strong>
              <span class="hero__proof-lbl">{{ p.label }}</span>
            </div>
          </div>

          <div class="hero__actions">
            <button class="btn btn--gold" @click="goto('contact')">
              預約免費策略諮詢
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button class="btn btn--outline-light" @click="goto('programs')">
              查看課程方案
            </button>
          </div>

          <div class="hero__logos">
            <span class="hero__logos-label">學員來自</span>
            <div class="hero__logos-list">
              <span v-for="b in alumBrands" :key="b" class="hero__logo-item">{{
                b
              }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Image Card -->
        <div class="hero__visual">
          <div class="hero__frame">
            <img
              class="hero__photo"
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=85&auto=format&fit=crop&crop=face"
              alt="Executive coach"
              @error="
                (e) =>
                  (e.target.src =
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=85&auto=format&fit=crop')
              "
            />
            <div class="hero__frame-overlay" />

            <!-- Gold corner accents -->
            <div class="hero__corner hero__corner--tl" />
            <div class="hero__corner hero__corner--br" />
          </div>

          <!-- Floating stat cards -->
          <div class="stat-float stat-float--a">
            <span class="sf-num">94<small>%</small></span>
            <span class="sf-lbl">晉升率</span>
          </div>
          <div class="stat-float stat-float--b">
            <span class="sf-icon">🏆</span>
            <div>
              <span class="sf-num">4.97<small>/5</small></span>
              <span class="sf-lbl">客戶滿意度</span>
            </div>
          </div>
          <div class="stat-float stat-float--c">
            <span class="sf-num">$2.1<small>B</small></span>
            <span class="sf-lbl">創造價值</span>
          </div>
        </div>
      </div>

      <button class="hero__scroll-cue" @click="goto('about')">
        <span class="scroll-line" />
        <span class="scroll-label">向下滾動</span>
      </button>
    </section>

    <!-- ══════════════════════════════════════════════════
        TICKER BAND
    ══════════════════════════════════════════════════ -->
    <div class="ticker">
      <div class="ticker__track">
        <span v-for="(t, i) in tickerContent" :key="i" class="ticker__item">
          {{ t }} <span class="ticker__sep">◆</span>
        </span>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════
        ABOUT
    ══════════════════════════════════════════════════ -->
    <section id="about" class="about section">
      <div class="wrap">
        <div class="about__left reveal">
          <div class="about__img-stack">
            <img
              class="about__img about__img--main"
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=85&auto=format&fit=crop"
              alt="Coaching session"
              @error="
                (e) =>
                  (e.target.src =
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85&auto=format')
              "
            />
            <img
              class="about__img about__img--secondary"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80&auto=format&fit=crop"
              alt="Executive"
              @error="
                (e) =>
                  (e.target.src =
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80&auto=format')
              "
            />
            <div class="about__years-badge">
              <span class="yb-num">18</span>
              <span class="yb-lbl">年卓越<br />品質</span>
            </div>
          </div>
        </div>

        <div class="about__right reveal" style="--delay: 0.15s">
          <span class="eyebrow">關於 Zeona Studio</span>
          <h2 class="h2">專為拒絕<em>停滯不前</em><br />的領導者而建</h2>
          <p class="body-copy">
            Zeona Studio
            的創立源於一個深刻的信念：優秀領導者與卓越領導者之間的差距，
            不在於天賦，而在於能否在關鍵時刻獲得正確的引導與挑戰。
          </p>
          <p class="body-copy">
            我們的教練團隊擁有來自財星百強企業、頂尖顧問公司與高速成長新創的真實董事會經驗。
            我們不兜售理論，我們創造可量化的成果。
          </p>

          <div class="about__differentiators">
            <div v-for="d in differentiators" :key="d.title" class="diff-item">
              <div class="diff-item__icon">{{ d.icon }}</div>
              <div class="diff-item__body">
                <strong>{{ d.title }}</strong>
                <span>{{ d.body }}</span>
              </div>
            </div>
          </div>

          <button class="btn btn--navy" @click="goto('contact')">
            與教練對話
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
        PROGRAMS
    ══════════════════════════════════════════════════ -->
    <section id="programs" class="programs section section--slate">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">課程方案</span>
          <h2 class="h2">選擇您的<em>成長路徑</em></h2>
          <p class="section-sub">
            每一個合作方案都量身訂製，每一個成果都可以衡量。
          </p>
        </div>

        <div class="programs__grid">
          <article
            v-for="(prog, i) in programs"
            :key="prog.title"
            :class="[
              'prog-card',
              'reveal',
              { 'prog-card--featured': prog.featured },
            ]"
            :style="{ '--delay': `${i * 0.1}s` }"
          >
            <div v-if="prog.featured" class="prog-card__ribbon">最多人選擇</div>
            <div class="prog-card__header">
              <span class="prog-card__icon">{{ prog.icon }}</span>
              <h3 class="prog-card__title">{{ prog.title }}</h3>
            </div>
            <p class="prog-card__desc">{{ prog.desc }}</p>
            <ul class="prog-card__list">
              <li v-for="f in prog.features" :key="f">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M2.5 7.5L6 11l6.5-7"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ f }}
              </li>
            </ul>
            <div class="prog-card__foot">
              <div class="prog-card__meta">
                <span class="prog-card__duration">{{ prog.duration }}</span>
                <br />
                <span class="prog-card__price">{{ prog.price }}</span>
              </div>
              <button
                :class="[
                  'btn',
                  prog.featured ? 'btn--gold' : 'btn--outline-navy',
                ]"
                @click="goto('contact')"
              >
                立即報名
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
        PROCESS
    ══════════════════════════════════════════════════ -->
    <section id="process" class="process section">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">方法論</span>
          <h2 class="h2">從模糊不清<em>到全速前進</em></h2>
        </div>

        <div class="process__track">
          <div
            v-for="(step, i) in processSteps"
            :key="step.title"
            class="process__step reveal"
            :style="{ '--delay': `${i * 0.1}s` }"
          >
            <div class="ps__num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="ps__icon">{{ step.icon }}</div>
            <h4 class="ps__title">{{ step.title }}</h4>
            <p class="ps__body">{{ step.body }}</p>
          </div>
          <div class="process__line" />
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
        METRICS BAND
    ══════════════════════════════════════════════════ -->
    <div class="metrics-band">
      <div class="wrap metrics-band__inner">
        <div
          v-for="m in metricsList"
          :key="m.label"
          class="metric reveal"
          :style="{ '--delay': `${m.delay}s` }"
        >
          <span
            class="metric__val"
            :data-target="m.target"
            :data-suffix="m.suffix"
          >
            {{ m.display }}
          </span>
          <span class="metric__lbl">{{ m.label }}</span>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════
        TESTIMONIALS
    ══════════════════════════════════════════════════ -->
    <section id="results" class="results section section--slate">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">客戶成果</span>
          <h2 class="h2">用成果說話，<em>而非承諾</em></h2>
        </div>

        <div class="results__grid">
          <div
            v-for="(t, i) in testimonials"
            :key="t.name"
            class="t-card reveal"
            :style="{ '--delay': `${i * 0.1}s` }"
          >
            <div class="t-card__stars">★★★★★</div>
            <blockquote class="t-card__quote">{{ t.quote }}</blockquote>
            <div class="t-card__outcome">
              <span class="t-card__outcome-val">{{ t.outcome }}</span>
              <span class="t-card__outcome-lbl">{{ t.outcomeLbl }}</span>
            </div>
            <footer class="t-card__author">
              <img
                class="t-card__avatar"
                :src="t.photo"
                :alt="t.name"
                @error="
                  (e) =>
                    (e.target.src =
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format')
                "
              />
              <div>
                <strong class="t-card__name">{{ t.name }}</strong>
                <span class="t-card__role">{{ t.role }}</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
        TEAM
    ══════════════════════════════════════════════════ -->
    <section id="team" class="team-section section">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">教練團隊</span>
          <h2 class="h2">世界級的<em>專業陣容</em></h2>
        </div>

        <div class="team__grid">
          <div
            v-for="(c, i) in coaches"
            :key="c.name"
            class="coach-card reveal"
            :style="{ '--delay': `${i * 0.1}s` }"
          >
            <div class="coach-card__photo-wrap">
              <img
                class="coach-card__photo"
                :src="c.photo"
                :alt="c.name"
                @error="
                  (e) =>
                    (e.target.src =
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face')
                "
              />
              <div class="coach-card__hover-bio">
                <p>{{ c.bio }}</p>
              </div>
            </div>
            <div class="coach-card__info">
              <strong class="coach-card__name">{{ c.name }}</strong>
              <span class="coach-card__title">{{ c.title }}</span>
              <div class="coach-card__tags">
                <span v-for="tag in c.tags" :key="tag" class="ctag">{{
                  tag
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
        FAQ
    ══════════════════════════════════════════════════ -->
    <section id="faq" class="faq-section section section--slate">
      <div class="wrap faq-section__inner">
        <div class="faq-section__left reveal">
          <span class="eyebrow">常見問題</span>
          <h2 class="h2">您想知道的<br /><em>所有事</em></h2>
          <p class="body-copy">
            沒找到您的問題？預約免費 30
            分鐘電話，我們毫無保留地為您解答，沒有任何推銷壓力。
          </p>
          <button class="btn btn--navy" @click="goto('contact')">
            與我們對話
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div class="faq-section__list reveal" style="--delay: 0.15s">
          <div
            v-for="(faq, i) in faqs"
            :key="faq.q"
            :class="['faq-item', { 'faq-item--open': openFaq === i }]"
          >
            <button
              class="faq-item__q"
              @click="openFaq = openFaq === i ? null : i"
            >
              {{ faq.q }}
              <svg
                :class="[
                  'faq-item__caret',
                  { 'faq-item__caret--flip': openFaq === i },
                ]"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <Transition name="slide-faq">
              <div v-if="openFaq === i" class="faq-item__a">{{ faq.a }}</div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         CONTACT / CTA
    ══════════════════════════════════════════════════ -->
    <section id="contact" class="contact section">
      <div class="contact__bg">
        <div class="contact__mesh" />
      </div>
      <div class="wrap contact__inner">
        <!-- Left: Pitch -->
        <div class="contact__pitch reveal">
          <span class="eyebrow" style="color: var(--gold-lt)">開始吧</span>
          <h2 class="h2" style="color: #fff">
            您的下一個<br />
            <em style="color: var(--gold-lt)">突破</em><br />
            從這裡開始。
          </h2>
          <p class="contact__pitch-body">
            預約 30 分鐘免費策略諮詢。我們將一起找出您最關鍵的領導力槓桿，
            規劃清晰的前進路徑——沒有銷售話術，只有真正的實質內容。
          </p>

          <div class="contact__details">
            <div
              v-for="d in contactDetails"
              :key="d.label"
              class="contact__detail"
            >
              <span class="contact__detail-icon">{{ d.icon }}</span>
              <div>
                <span class="contact__detail-label">{{ d.label }}</span>
                <span class="contact__detail-val">{{ d.val }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="contact__form-wrap reveal" style="--delay: 0.2s">
          <div class="contact__form-card">
            <h3 class="form-heading">預約免費策略諮詢</h3>

            <Transition name="fade-form" mode="out-in">
              <div v-if="sent" key="success" class="form-success">
                <div class="form-success__check">✓</div>
                <strong>預約確認！</strong>
                <span>我們將在 24 小時內與您聯繫，確認您的諮詢時間。</span>
              </div>

              <form v-else key="form" class="form" @submit.prevent="submitForm">
                <div class="form-row">
                  <div class="form-field">
                    <label>姓氏</label>
                    <input
                      v-model="fm.first"
                      type="text"
                      placeholder="王"
                      required
                    />
                  </div>
                  <div class="form-field">
                    <label>名字</label>
                    <input
                      v-model="fm.last"
                      type="text"
                      placeholder="小明"
                      required
                    />
                  </div>
                </div>
                <div class="form-field">
                  <label>公司信箱</label>
                  <input
                    v-model="fm.email"
                    type="email"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div class="form-field">
                  <label>職稱 & 公司</label>
                  <input
                    v-model="fm.company"
                    type="text"
                    placeholder="業務副總，台灣大企業"
                  />
                </div>
                <div class="form-field">
                  <label>主要關注領域</label>
                  <select v-model="fm.focus">
                    <option value="">請選擇關注領域…</option>
                    <option v-for="f in focusOptions" :key="f" :value="f">
                      {{ f }}
                    </option>
                  </select>
                </div>
                <div class="form-field">
                  <label>您目前最大的領導力挑戰</label>
                  <textarea
                    v-model="fm.note"
                    rows="3"
                    placeholder="告訴我們是什麼阻礙了您邁向下一個層次…"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn--submit"
                  :disabled="loading"
                >
                  <span v-if="loading">傳送中…</span>
                  <span v-else>
                    預約我的免費諮詢
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <p class="form-disclaimer">
                  🔒 嚴格保密，不發垃圾信，無任何義務。
                </p>
              </form>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
        FOOTER
    ══════════════════════════════════════════════════ -->
    <footer class="footer">
      <div class="wrap footer__top">
        <div class="footer__brand">
          <span class="footer__emblem">Z</span>
          <div>
            <span class="footer__name">Zeona <em>Studio</em></span>
            <span class="footer__tagline">成就卓越領導者，鑄造永恆傳承。</span>
          </div>
        </div>
        <div class="footer__cols">
          <div v-for="col in footerNav" :key="col.heading" class="footer__col">
            <span class="footer__col-heading">{{ col.heading }}</span>
            <a
              v-for="link in col.links"
              :key="link"
              href="#"
              class="footer__col-link"
              >{{ link }}</a
            >
          </div>
        </div>
      </div>
      <div class="wrap footer__bottom">
        <span>© 2025 Zeona Studio LLC. 版權所有，保留一切權利。</span>
        <span>照片來源：Unsplash（CC0 授權）</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ═══════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════ */
.page {
  /* Palette */
  --navy: #0c1e35;
  --navy-mid: #152d4a;
  --navy-lt: #1e3f63;
  --navy-pale: #edf2f7;
  --gold: #b8832a;
  --gold-lt: #d4a853;
  --gold-pale: #fbf5e8;
  --slate: #f4f6f9;
  --white: #ffffff;
  --ink: #0c1e35;
  --ink-2: #3a4f65;
  --ink-3: #7a8fa6;
  --border: rgba(12, 30, 53, 0.1);
  --border-lt: rgba(12, 30, 53, 0.06);

  /* Shadows */
  --sh-sm: 0 2px 10px rgba(12, 30, 53, 0.08);
  --sh-md: 0 8px 30px rgba(12, 30, 53, 0.12);
  --sh-lg: 0 20px 60px rgba(12, 30, 53, 0.16);

  /* Radius */
  --r: 6px;
  --r-lg: 14px;

  font-family: 'Cormorant Garamond', 'Georgia', serif;
  color: var(--ink);
  background: var(--white);
  overflow-x: hidden;
  cursor: none;
}

/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

/* ── Cursor ─────────────────────────────────────────── */
.c-dot {
  position: fixed;
  z-index: 9999;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--gold);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition:
    width 0.15s,
    height 0.15s;
  mix-blend-mode: multiply;
}
.c-ring {
  position: fixed;
  z-index: 9998;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1.5px solid rgba(184, 131, 42, 0.35);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition:
    width 0.3s,
    height 0.3s;
}

/* ── Global resets ──────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
img {
  display: block;
  max-width: 100%;
}
a {
  text-decoration: none;
  color: inherit;
}
button {
  cursor: none;
  font-family: inherit;
  border: none;
  background: none;
}

/* ── Layout helpers ─────────────────────────────────── */
.wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 48px;
}
.section {
  padding: 96px 0;
}
.section--slate {
  background: var(--slate);
}

/* ── Typography helpers ─────────────────────────────── */
.eyebrow {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  display: block;
  margin-bottom: 16px;
}
.h2 {
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--navy);
  margin-bottom: 20px;
}
.h2 em {
  font-style: italic;
  color: var(--gold);
}
.body-copy {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--ink-2);
  font-weight: 400;
  margin-bottom: 20px;
}
.section-head {
  text-align: center;
  margin-bottom: 64px;
}
.section-sub {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--ink-3);
  line-height: 1.7;
  margin-top: -8px;
}

/* ── Reveal animation ───────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: none;
}

/* ── Buttons ────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  border-radius: var(--r);
  transition: all 0.25s;
  white-space: nowrap;
}
.btn--gold {
  background: var(--gold);
  color: #fff;
  padding: 14px 28px;
  box-shadow: 0 4px 18px rgba(184, 131, 42, 0.35);
}
.btn--gold:hover {
  background: var(--gold-lt);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(184, 131, 42, 0.4);
}

.btn--navy {
  background: var(--navy);
  color: #fff;
  padding: 14px 28px;
  box-shadow: var(--sh-md);
}
.btn--navy:hover {
  background: var(--navy-mid);
  transform: translateY(-2px);
}

.btn--outline-light {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  padding: 13px 28px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
}
.btn--outline-light:hover {
  border-color: rgba(255, 255, 255, 0.7);
  color: #fff;
}

.btn--outline-navy {
  background: transparent;
  color: var(--navy);
  padding: 12px 22px;
  border: 1.5px solid var(--border);
}
.btn--outline-navy:hover {
  background: var(--navy);
  color: #fff;
  border-color: var(--navy);
}

.btn--cta {
  background: var(--gold);
  color: #fff;
  padding: 11px 22px;
  font-size: 0.78rem;
  box-shadow: 0 3px 12px rgba(184, 131, 42, 0.3);
}
.btn--cta:hover {
  background: var(--gold-lt);
  transform: translateY(-1px);
}

.btn--submit {
  width: 100%;
  padding: 16px;
  justify-content: center;
  background: var(--navy);
  color: #fff;
  font-size: 0.9rem;
  border-radius: var(--r);
  box-shadow: var(--sh-md);
}
.btn--submit:hover:not(:disabled) {
  background: var(--navy-mid);
  transform: translateY(-2px);
}
.btn--submit:disabled {
  opacity: 0.6;
}

/* ══ BANNER ════════════════════════════════════════════ */
.banner {
  background: var(--navy);
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.78rem;
  text-align: center;
  padding: 10px 48px;
  position: relative;
}
.banner strong {
  color: var(--gold-lt);
}
.banner__close {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  opacity: 0.5;
  transition: opacity 0.2s;
}
.banner__close:hover {
  opacity: 1;
}

/* ══ NAV ═══════════════════════════════════════════════ */
.nav {
  position: sticky;
  top: 0;
  z-index: 200;
  background: transparent;
  transition:
    background 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
  border-bottom: 1px solid transparent;
}
.nav--solid {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(18px);
  border-color: var(--border-lt);
  box-shadow: var(--sh-sm);
}
.nav__wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 48px;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 40px;
}
.nav__logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: auto;
}
.nav__logo-emblem {
  width: 36px;
  height: 36px;
  background: var(--navy);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 3px;
  flex-shrink: 0;
}
.nav__logo-name {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--navy);
  text-transform: uppercase;
}
.nav__logo-name em {
  font-style: normal;
  color: var(--gold);
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
}
.nav__link {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--ink-2);
  transition: color 0.2s;
  text-transform: uppercase;
}
.nav__link:hover {
  color: var(--navy);
}

/* Mobile hamburger */
.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  margin-left: auto;
}
.nav__hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--navy);
  border-radius: 2px;
  transition: all 0.3s;
}
.nav__hamburger--open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.nav__hamburger--open span:nth-child(2) {
  opacity: 0;
}
.nav__hamburger--open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile menu */
@media (max-width: 900px) {
  .nav__links {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    background: #fff;
    padding: 20px 24px;
    gap: 4px;
    border-bottom: 1px solid var(--border);
    box-shadow: var(--sh-md);
  }
  .nav__links--open {
    display: flex !important;
  }
  .nav__hamburger {
    display: flex;
  }
  .nav__link {
    font-size: 0.9rem;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-lt);
    width: 100%;
  }
  .nav__cta {
    margin-top: 8px;
  }
}

/* ══ HERO ══════════════════════════════════════════════ */
.hero {
  min-height: 100vh;
  background: var(--navy);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 64px 64px;
}
.hero__radial {
  position: absolute;
  right: -5%;
  top: -10%;
  width: 70vw;
  height: 70vw;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(184, 131, 42, 0.1) 0%,
    transparent 60%
  );
}

.hero__layout {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
  padding: 80px 48px;
  position: relative;
  z-index: 2;
}

/* Chip */
.hero__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-lt);
  border: 1px solid rgba(184, 131, 42, 0.35);
  background: rgba(184, 131, 42, 0.08);
  padding: 7px 14px;
  border-radius: 2px;
  margin-bottom: 28px;
}
.chip__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold-lt);
  box-shadow: 0 0 6px var(--gold-lt);
  animation: blink 1.6s infinite;
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

/* Headline */
.hero__h1 {
  font-size: clamp(3rem, 5.5vw, 5.2rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 24px;
}
.hero__h1-italic {
  font-style: italic;
  color: var(--gold-lt);
}

.hero__sub {
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 36px;
  max-width: 440px;
}

/* Proof row */
.hero__proof-row {
  display: flex;
  gap: 36px;
  margin-bottom: 36px;
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.hero__proof {
  display: flex;
  flex-direction: column;
}
.hero__proof-num {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--gold-lt);
  line-height: 1;
}
.hero__proof-lbl {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 5px;
}

.hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

/* Logo cloud */
.hero__logos-label {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  display: block;
  margin-bottom: 10px;
}
.hero__logos-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.hero__logo-item {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
  transition: color 0.25s;
}
.hero__logo-item:hover {
  color: rgba(255, 255, 255, 0.6);
}

/* Photo frame */
.hero__visual {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero__frame {
  position: relative;
  width: 440px;
  height: 520px;
  border-radius: 2px;
  overflow: hidden;
  box-shadow:
    var(--sh-lg),
    0 0 0 1px rgba(255, 255, 255, 0.06);
}
.hero__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero__frame-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    transparent 40%,
    rgba(12, 30, 53, 0.65) 100%
  );
}
.hero__corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: var(--gold-lt);
  border-style: solid;
}
.hero__corner--tl {
  top: 12px;
  left: 12px;
  border-width: 2px 0 0 2px;
}
.hero__corner--br {
  bottom: 12px;
  right: 12px;
  border-width: 0 2px 2px 0;
}

/* Floating stat cards */
.stat-float {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: var(--r);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--sh-md);
  animation: bob 4s ease-in-out infinite;
}
.hero__visual {
  position: relative;
}
.stat-float--a {
  bottom: 22%;
  left: -48px;
  animation-delay: 0s;
}
.stat-float--b {
  top: 15%;
  right: -48px;
  animation-delay: 0.9s;
  flex-direction: row;
}
.stat-float--c {
  bottom: 8%;
  right: -40px;
  animation-delay: 1.7s;
}
@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.sf-icon {
  font-size: 1.5rem;
}
.sf-num {
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--navy);
  line-height: 1;
}
.sf-num small {
  font-size: 0.65em;
  font-weight: 600;
  opacity: 0.6;
}
.sf-lbl {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-top: 3px;
}

/* Scroll cue */
.hero__scroll-cue {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.25);
  z-index: 2;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: color 0.2s;
}
.hero__scroll-cue:hover {
  color: rgba(255, 255, 255, 0.55);
}
.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.55),
    transparent
  );
  animation: line-pulse 2s ease-in-out infinite;
}
.scroll-label {
  font-size: 0.6rem;
}
@keyframes line-pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

/* ══ TICKER ════════════════════════════════════════════ */
.ticker {
  background: var(--gold);
  overflow: hidden;
  padding: 11px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.ticker__track {
  display: inline-flex;
  gap: 0;
  animation: scroll-ticker 32s linear infinite;
  white-space: nowrap;
}
.ticker__item {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  padding: 0 28px;
}
.ticker__sep {
  color: rgba(255, 255, 255, 0.4);
  padding-left: 4px;
}
@keyframes scroll-ticker {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* ══ ABOUT ═════════════════════════════════════════════ */
.about .wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.about__img-stack {
  position: relative;
}
.about__img {
  border-radius: var(--r);
  display: block;
}
.about__img--main {
  width: 100%;
  height: 520px;
  object-fit: cover;
  box-shadow: var(--sh-lg);
}
.about__img--secondary {
  position: absolute;
  bottom: -28px;
  right: -24px;
  width: 46%;
  height: 260px;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: var(--sh-md);
}
.about__years-badge {
  position: absolute;
  top: -16px;
  left: -16px;
  background: var(--gold);
  color: #fff;
  padding: 18px 20px;
  border-radius: var(--r);
  text-align: center;
  box-shadow: var(--sh-md);
}
.yb-num {
  display: block;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1;
}
.yb-lbl {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.75;
  margin-top: 4px;
}

.about__differentiators {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 28px 0;
}
.diff-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px 18px;
  border-radius: var(--r);
  border: 1px solid var(--border);
  background: var(--slate);
  transition: all 0.25s;
}
.diff-item:hover {
  border-color: rgba(184, 131, 42, 0.35);
  box-shadow: var(--sh-sm);
}
.diff-item__icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  padding-top: 2px;
}
.diff-item__body {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.diff-item__body strong {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--navy);
}
.diff-item__body span {
  font-size: 0.85rem;
  color: var(--ink-3);
  line-height: 1.5;
}

/* ══ PROGRAMS ══════════════════════════════════════════ */
.programs__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
}
.prog-card {
  background: #fff;
  padding: 36px 30px;
  border: 1px solid var(--border);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}
.prog-card:hover {
  box-shadow: var(--sh-md);
  transform: translateY(-4px);
  z-index: 1;
}
.prog-card--featured {
  background: var(--navy);
  border-color: var(--navy);
}
.prog-card__ribbon {
  position: absolute;
  top: 18px;
  right: 18px;
  background: var(--gold);
  color: #fff;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 2px;
}
.prog-card__header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}
.prog-card__icon {
  font-size: 1.8rem;
}
.prog-card__title {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--navy);
}
.prog-card--featured .prog-card__title {
  color: #fff;
}
.prog-card__desc {
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--ink-2);
  margin-bottom: 22px;
}
.prog-card--featured .prog-card__desc {
  color: rgba(255, 255, 255, 0.6);
}
.prog-card__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 28px;
  flex: 1;
}
.prog-card__list li {
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.82rem;
  color: var(--ink-2);
}
.prog-card--featured .prog-card__list li {
  color: rgba(255, 255, 255, 0.7);
}
.prog-card__list svg {
  flex-shrink: 0;
  color: var(--gold);
}
.prog-card__foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
.prog-card--featured .prog-card__foot {
  border-color: rgba(255, 255, 255, 0.12);
}
.prog-card__duration {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 4px;
}
.prog-card--featured .prog-card__duration {
  color: rgba(255, 255, 255, 0.4);
}
.prog-card__price {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--navy);
}
.prog-card--featured .prog-card__price {
  color: var(--gold-lt);
}
.prog-card--featured .btn--outline-navy {
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
.prog-card--featured .btn--outline-navy:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
}

/* ══ PROCESS ═══════════════════════════════════════════ */
.process__track {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  position: relative;
}
.process__step {
  padding: 32px 24px;
  text-align: center;
  position: relative;
  border: 1px solid var(--border);
  margin-right: -1px;
  background: #fff;
  transition: all 0.3s;
  overflow: hidden;
}
.process__step::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--navy);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s ease;
  z-index: 0;
}
.process__step:hover::before {
  transform: scaleY(1);
}
.process__step > * {
  position: relative;
  z-index: 1;
}
.process__step:hover .ps__num,
.process__step:hover .ps__title,
.process__step:hover .ps__body {
  color: rgba(255, 255, 255, 0.8);
}
.process__step:hover .ps__icon {
  filter: none;
}

.ps__num {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--gold);
  margin-bottom: 16px;
  display: block;
  transition: color 0.4s;
}
.ps__icon {
  font-size: 1.7rem;
  margin-bottom: 14px;
  display: block;
}
.ps__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 8px;
  transition: color 0.4s;
}
.ps__body {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.78rem;
  color: var(--ink-3);
  line-height: 1.65;
  transition: color 0.4s;
}

/* ══ METRICS BAND ══════════════════════════════════════ */
.metrics-band {
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-lt) 100%);
  padding: 56px 0;
}
.metrics-band__inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
.metric {
  text-align: center;
  padding: 0 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.metric:last-child {
  border-right: none;
}
.metric__val {
  display: block;
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--gold-lt);
  line-height: 1;
  margin-bottom: 10px;
}
.metric__lbl {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

/* ══ RESULTS ═══════════════════════════════════════════ */
.results__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.t-card {
  background: #fff;
  border-radius: var(--r-lg);
  padding: 32px;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: all 0.3s;
}
.t-card:hover {
  box-shadow: var(--sh-md);
  transform: translateY(-4px);
  border-color: rgba(184, 131, 42, 0.3);
}
.t-card__stars {
  color: #e8a020;
  font-size: 0.85rem;
  letter-spacing: 2px;
}
.t-card__quote {
  font-size: 0.97rem;
  line-height: 1.8;
  color: var(--ink-2);
  font-style: italic;
  flex: 1;
}
.t-card__outcome {
  background: var(--gold-pale);
  border-radius: var(--r);
  padding: 12px 16px;
  border-left: 3px solid var(--gold);
}
.t-card__outcome-val {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}
.t-card__outcome-lbl {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-top: 4px;
}
.t-card__author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.t-card__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
}
.t-card__name {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--navy);
}
.t-card__role {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.72rem;
  color: var(--ink-3);
  margin-top: 2px;
}

/* ══ TEAM ══════════════════════════════════════════════ */
.team__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.coach-card {
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all 0.3s;
}
.coach-card:hover {
  box-shadow: var(--sh-md);
  transform: translateY(-4px);
}
.coach-card__photo-wrap {
  position: relative;
  height: 290px;
  overflow: hidden;
}
.coach-card__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.coach-card:hover .coach-card__photo {
  transform: scale(1.05);
}
.coach-card__hover-bio {
  position: absolute;
  inset: 0;
  background: rgba(12, 30, 53, 0.88);
  display: flex;
  align-items: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}
.coach-card:hover .coach-card__hover-bio {
  opacity: 1;
}
.coach-card__hover-bio p {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}
.coach-card__info {
  padding: 18px 20px;
  background: #fff;
}
.coach-card__name {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 4px;
}
.coach-card__title {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.73rem;
  color: var(--ink-3);
  margin-bottom: 10px;
}
.coach-card__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.ctag {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 2px;
  background: var(--navy-pale);
  color: var(--navy);
}

/* ══ FAQ ═══════════════════════════════════════════════ */
.faq-section__inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  align-items: start;
}
.faq-item {
  border-bottom: 1px solid var(--border);
}
.faq-item__q {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--navy);
  gap: 12px;
  transition: color 0.2s;
}
.faq-item__q:hover {
  color: var(--gold);
}
.faq-item__caret {
  flex-shrink: 0;
  color: var(--gold);
  transition: transform 0.3s;
}
.faq-item__caret--flip {
  transform: rotate(180deg);
}
.faq-item__a {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.9rem;
  color: var(--ink-2);
  line-height: 1.8;
  padding-bottom: 20px;
}

/* FAQ slide transition */
.slide-faq-enter-active,
.slide-faq-leave-active {
  transition: all 0.35s ease;
  overflow: hidden;
}
.slide-faq-enter-from,
.slide-faq-leave-to {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
}
.slide-faq-enter-to,
.slide-faq-leave-from {
  max-height: 300px;
  opacity: 1;
}

/* ══ CONTACT ═══════════════════════════════════════════ */
.contact {
  background: var(--navy);
  position: relative;
  overflow: hidden;
}
.contact__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.contact__mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 52px 52px;
}
.contact__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
  position: relative;
  z-index: 2;
}
.contact__pitch-body {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 36px;
}
.contact__details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.contact__detail {
  display: flex;
  align-items: center;
  gap: 16px;
}
.contact__detail-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--r);
  background: rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.contact__detail-label {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}
.contact__detail-val {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 2px;
}

/* Form card */
.contact__form-card {
  background: #fff;
  border-radius: var(--r-lg);
  padding: 40px;
  box-shadow: var(--sh-lg);
}
.form-heading {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 26px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-field label {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.form-field input,
.form-field select,
.form-field textarea {
  padding: 11px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--r);
  color: var(--ink);
  background: #fff;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  outline: none;
  transition:
    border-color 0.25s,
    box-shadow 0.25s;
  width: 100%;
}
.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(184, 131, 42, 0.12);
}
.form-field input::placeholder,
.form-field textarea::placeholder {
  color: var(--ink-3);
}
.form-field textarea {
  resize: vertical;
}
.form-field select {
  appearance: none;
}

.form-disclaimer {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.7rem;
  color: var(--ink-3);
  text-align: center;
  margin-top: 4px;
}

.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 20px;
  text-align: center;
}
.form-success__check {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--gold);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
.form-success strong {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--navy);
  font-family: 'Instrument Sans', sans-serif;
}
.form-success span {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.88rem;
  color: var(--ink-2);
  line-height: 1.6;
}

/* Fade form transition */
.fade-form-enter-active,
.fade-form-leave-active {
  transition: opacity 0.35s;
}
.fade-form-enter-from,
.fade-form-leave-to {
  opacity: 0;
}

/* ══ FOOTER ════════════════════════════════════════════ */
.footer {
  background: #070f1a;
}
.footer__top {
  display: flex;
  gap: 80px;
  padding-top: 60px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.footer__brand {
  flex-shrink: 0;
}
.footer__emblem {
  display: inline-flex;
  width: 36px;
  height: 36px;
  background: var(--navy-mid);
  color: #fff;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 3px;
  margin-bottom: 10px;
}
.footer__name {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 10px;
}
.footer__name em {
  font-style: normal;
  color: var(--gold);
}
.footer__tagline {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.28);
  font-style: italic;
  max-width: 180px;
  line-height: 1.5;
}
.footer__cols {
  display: flex;
  gap: 56px;
  flex: 1;
  justify-content: flex-end;
}
.footer__col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer__col-heading {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 4px;
}
.footer__col-link {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.42);
  transition: color 0.2s;
}
.footer__col-link:hover {
  color: var(--gold-lt);
}
.footer__bottom {
  display: flex;
  justify-content: space-between;
  padding: 20px 48px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.22);
}

/* ══ RESPONSIVE ════════════════════════════════════════ */
@media (max-width: 1100px) {
  .team__grid {
    grid-template-columns: 1fr 1fr;
  }
  .process__track {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 860px) {
  .wrap {
    padding: 0 20px;
  }
  .section {
    padding: 72px 0;
  }
  .hero__layout {
    grid-template-columns: 1fr;
    padding: 48px 20px 80px;
    gap: 0;
  }
  .hero__visual {
    display: none;
  }
  .about .wrap {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .about__img--secondary {
    display: none;
  }
  .about__years-badge {
    right: 0;
    left: auto;
  }
  .programs__grid {
    grid-template-columns: 1fr;
  }
  .results__grid {
    grid-template-columns: 1fr;
  }
  .faq-section__inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .contact__inner {
    grid-template-columns: 1fr;
  }
  .metrics-band__inner {
    grid-template-columns: 1fr 1fr;
  }
  .metric {
    padding: 20px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .footer__top {
    flex-direction: column;
    gap: 32px;
  }
  .footer__cols {
    flex-wrap: wrap;
    gap: 28px;
    justify-content: flex-start;
  }
  .footer__bottom {
    flex-direction: column;
    gap: 6px;
    text-align: center;
    padding: 16px 20px;
  }
  .nav__wrap {
    padding: 0 20px;
  }
  .hero__proof-row {
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>

<style scoped>
/* ═══════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════ */
.page {
  /* Palette */
  --navy: #0c1e35;
  --navy-mid: #152d4a;
  --navy-lt: #1e3f63;
  --navy-pale: #edf2f7;
  --gold: #b8832a;
  --gold-lt: #d4a853;
  --gold-pale: #fbf5e8;
  --slate: #f4f6f9;
  --white: #ffffff;
  --ink: #0c1e35;
  --ink-2: #3a4f65;
  --ink-3: #7a8fa6;
  --border: rgba(12, 30, 53, 0.1);
  --border-lt: rgba(12, 30, 53, 0.06);

  /* Shadows */
  --sh-sm: 0 2px 10px rgba(12, 30, 53, 0.08);
  --sh-md: 0 8px 30px rgba(12, 30, 53, 0.12);
  --sh-lg: 0 20px 60px rgba(12, 30, 53, 0.16);

  /* Radius */
  --r: 6px;
  --r-lg: 14px;

  font-family: 'Cormorant Garamond', 'Georgia', serif;
  color: var(--ink);
  background: var(--white);
  overflow-x: hidden;
  cursor: none;
}

/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

/* ── Cursor ─────────────────────────────────────────── */
.c-dot {
  position: fixed;
  z-index: 9999;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--gold);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition:
    width 0.15s,
    height 0.15s;
  mix-blend-mode: multiply;
}
.c-ring {
  position: fixed;
  z-index: 9998;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1.5px solid rgba(184, 131, 42, 0.35);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition:
    width 0.3s,
    height 0.3s;
}

/* ── Global resets ──────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
img {
  display: block;
  max-width: 100%;
}
a {
  text-decoration: none;
  color: inherit;
}
button {
  cursor: none;
  font-family: inherit;
  border: none;
  background: none;
}

/* ── Layout helpers ─────────────────────────────────── */
.wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 48px;
}
.section {
  padding: 96px 0;
}
.section--slate {
  background: var(--slate);
}

/* ── Typography helpers ─────────────────────────────── */
.eyebrow {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  display: block;
  margin-bottom: 16px;
}
.h2 {
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--navy);
  margin-bottom: 20px;
}
.h2 em {
  font-style: italic;
  color: var(--gold);
}
.body-copy {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--ink-2);
  font-weight: 400;
  margin-bottom: 20px;
}
.section-head {
  text-align: center;
  margin-bottom: 64px;
}
.section-sub {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--ink-3);
  line-height: 1.7;
  margin-top: -8px;
}

/* ── Reveal animation ───────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: none;
}

/* ── Buttons ────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  border-radius: var(--r);
  transition: all 0.25s;
  white-space: nowrap;
}
.btn--gold {
  background: var(--gold);
  color: #fff;
  padding: 14px 28px;
  box-shadow: 0 4px 18px rgba(184, 131, 42, 0.35);
}
.btn--gold:hover {
  background: var(--gold-lt);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(184, 131, 42, 0.4);
}

.btn--navy {
  background: var(--navy);
  color: #fff;
  padding: 14px 28px;
  box-shadow: var(--sh-md);
}
.btn--navy:hover {
  background: var(--navy-mid);
  transform: translateY(-2px);
}

.btn--outline-light {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  padding: 13px 28px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
}
.btn--outline-light:hover {
  border-color: rgba(255, 255, 255, 0.7);
  color: #fff;
}

.btn--outline-navy {
  background: transparent;
  color: var(--navy);
  padding: 12px 22px;
  border: 1.5px solid var(--border);
}
.btn--outline-navy:hover {
  background: var(--navy);
  color: #fff;
  border-color: var(--navy);
}

.btn--cta {
  background: var(--gold);
  color: #fff;
  padding: 11px 22px;
  font-size: 0.78rem;
  box-shadow: 0 3px 12px rgba(184, 131, 42, 0.3);
}
.btn--cta:hover {
  background: var(--gold-lt);
  transform: translateY(-1px);
}

.btn--submit {
  width: 100%;
  padding: 16px;
  justify-content: center;
  background: var(--navy);
  color: #fff;
  font-size: 0.9rem;
  border-radius: var(--r);
  box-shadow: var(--sh-md);
}
.btn--submit:hover:not(:disabled) {
  background: var(--navy-mid);
  transform: translateY(-2px);
}
.btn--submit:disabled {
  opacity: 0.6;
}

/* ══ BANNER ════════════════════════════════════════════ */
.banner {
  background: var(--navy);
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.78rem;
  text-align: center;
  padding: 10px 48px;
  position: relative;
}
.banner strong {
  color: var(--gold-lt);
}
.banner__close {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  opacity: 0.5;
  transition: opacity 0.2s;
}
.banner__close:hover {
  opacity: 1;
}

/* ══ NAV ═══════════════════════════════════════════════ */
.nav {
  position: sticky;
  top: 0;
  z-index: 200;
  background: transparent;
  transition:
    background 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
  border-bottom: 1px solid transparent;
}
.nav--solid {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(18px);
  border-color: var(--border-lt);
  box-shadow: var(--sh-sm);
}
.nav__wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 48px;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 40px;
}
.nav__logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: auto;
}
.nav__logo-emblem {
  width: 36px;
  height: 36px;
  background: var(--navy);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 3px;
  flex-shrink: 0;
}
.nav__logo-name {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--navy);
  text-transform: uppercase;
}
.nav__logo-name em {
  font-style: normal;
  color: var(--gold);
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
}
.nav__link {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--ink-2);
  transition: color 0.2s;
  text-transform: uppercase;
}
.nav__link:hover {
  color: var(--navy);
}

/* Mobile hamburger */
.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  margin-left: auto;
}
.nav__hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--navy);
  border-radius: 2px;
  transition: all 0.3s;
}
.nav__hamburger--open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.nav__hamburger--open span:nth-child(2) {
  opacity: 0;
}
.nav__hamburger--open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile menu */
@media (max-width: 900px) {
  .nav__links {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    background: #fff;
    padding: 20px 24px;
    gap: 4px;
    border-bottom: 1px solid var(--border);
    box-shadow: var(--sh-md);
  }
  .nav__links--open {
    display: flex !important;
  }
  .nav__hamburger {
    display: flex;
  }
  .nav__link {
    font-size: 0.9rem;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-lt);
    width: 100%;
  }
  .nav__cta {
    margin-top: 8px;
  }
}

/* ══ HERO ══════════════════════════════════════════════ */
.hero {
  min-height: 100vh;
  background: var(--navy);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 64px 64px;
}
.hero__radial {
  position: absolute;
  right: -5%;
  top: -10%;
  width: 70vw;
  height: 70vw;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(184, 131, 42, 0.1) 0%,
    transparent 60%
  );
}

.hero__layout {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
  padding: 80px 48px;
  position: relative;
  z-index: 2;
}

/* Chip */
.hero__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-lt);
  border: 1px solid rgba(184, 131, 42, 0.35);
  background: rgba(184, 131, 42, 0.08);
  padding: 7px 14px;
  border-radius: 2px;
  margin-bottom: 28px;
}
.chip__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold-lt);
  box-shadow: 0 0 6px var(--gold-lt);
  animation: blink 1.6s infinite;
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

/* Headline */
.hero__h1 {
  font-size: clamp(3rem, 5.5vw, 5.2rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 24px;
}
.hero__h1-italic {
  font-style: italic;
  color: var(--gold-lt);
}

.hero__sub {
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 36px;
  max-width: 440px;
}

/* Proof row */
.hero__proof-row {
  display: flex;
  gap: 36px;
  margin-bottom: 36px;
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.hero__proof {
  display: flex;
  flex-direction: column;
}
.hero__proof-num {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--gold-lt);
  line-height: 1;
}
.hero__proof-lbl {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 5px;
}

.hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

/* Logo cloud */
.hero__logos-label {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  display: block;
  margin-bottom: 10px;
}
.hero__logos-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.hero__logo-item {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
  transition: color 0.25s;
}
.hero__logo-item:hover {
  color: rgba(255, 255, 255, 0.6);
}

/* Photo frame */
.hero__visual {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero__frame {
  position: relative;
  width: 440px;
  height: 520px;
  border-radius: 2px;
  overflow: hidden;
  box-shadow:
    var(--sh-lg),
    0 0 0 1px rgba(255, 255, 255, 0.06);
}
.hero__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero__frame-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    transparent 40%,
    rgba(12, 30, 53, 0.65) 100%
  );
}
.hero__corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: var(--gold-lt);
  border-style: solid;
}
.hero__corner--tl {
  top: 12px;
  left: 12px;
  border-width: 2px 0 0 2px;
}
.hero__corner--br {
  bottom: 12px;
  right: 12px;
  border-width: 0 2px 2px 0;
}

/* Floating stat cards */
.stat-float {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: var(--r);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--sh-md);
  animation: bob 4s ease-in-out infinite;
}
.hero__visual {
  position: relative;
}
.stat-float--a {
  bottom: 22%;
  left: -48px;
  animation-delay: 0s;
}
.stat-float--b {
  top: 15%;
  right: -48px;
  animation-delay: 0.9s;
  flex-direction: row;
}
.stat-float--c {
  bottom: 8%;
  right: -40px;
  animation-delay: 1.7s;
}
@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.sf-icon {
  font-size: 1.5rem;
}
.sf-num {
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--navy);
  line-height: 1;
}
.sf-num small {
  font-size: 0.65em;
  font-weight: 600;
  opacity: 0.6;
}
.sf-lbl {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-top: 3px;
}

/* Scroll cue */
.hero__scroll-cue {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.25);
  z-index: 2;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: color 0.2s;
}
.hero__scroll-cue:hover {
  color: rgba(255, 255, 255, 0.55);
}
.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.55),
    transparent
  );
  animation: line-pulse 2s ease-in-out infinite;
}
.scroll-label {
  font-size: 0.6rem;
}
@keyframes line-pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

/* ══ TICKER ════════════════════════════════════════════ */
.ticker {
  background: var(--gold);
  overflow: hidden;
  padding: 11px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.ticker__track {
  display: inline-flex;
  gap: 0;
  animation: scroll-ticker 32s linear infinite;
  white-space: nowrap;
}
.ticker__item {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  padding: 0 28px;
}
.ticker__sep {
  color: rgba(255, 255, 255, 0.4);
  padding-left: 4px;
}
@keyframes scroll-ticker {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* ══ ABOUT ═════════════════════════════════════════════ */
.about .wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.about__img-stack {
  position: relative;
}
.about__img {
  border-radius: var(--r);
  display: block;
}
.about__img--main {
  width: 100%;
  height: 520px;
  object-fit: cover;
  box-shadow: var(--sh-lg);
}
.about__img--secondary {
  position: absolute;
  bottom: -28px;
  right: -24px;
  width: 46%;
  height: 260px;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: var(--sh-md);
}
.about__years-badge {
  position: absolute;
  top: -16px;
  left: -16px;
  background: var(--gold);
  color: #fff;
  padding: 18px 20px;
  border-radius: var(--r);
  text-align: center;
  box-shadow: var(--sh-md);
}
.yb-num {
  display: block;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1;
}
.yb-lbl {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.75;
  margin-top: 4px;
}

.about__differentiators {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 28px 0;
}
.diff-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px 18px;
  border-radius: var(--r);
  border: 1px solid var(--border);
  background: var(--slate);
  transition: all 0.25s;
}
.diff-item:hover {
  border-color: rgba(184, 131, 42, 0.35);
  box-shadow: var(--sh-sm);
}
.diff-item__icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  padding-top: 2px;
}
.diff-item__body {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.diff-item__body strong {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--navy);
}
.diff-item__body span {
  font-size: 0.85rem;
  color: var(--ink-3);
  line-height: 1.5;
}

/* ══ PROGRAMS ══════════════════════════════════════════ */
.programs__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
}
.prog-card {
  background: #fff;
  padding: 36px 30px;
  border: 1px solid var(--border);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}
.prog-card:hover {
  box-shadow: var(--sh-md);
  transform: translateY(-4px);
  z-index: 1;
}
.prog-card--featured {
  background: var(--navy);
  border-color: var(--navy);
}
.prog-card__ribbon {
  position: absolute;
  top: 18px;
  right: 18px;
  background: var(--gold);
  color: #fff;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 2px;
}
.prog-card__header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}
.prog-card__icon {
  font-size: 1.8rem;
}
.prog-card__title {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--navy);
}
.prog-card--featured .prog-card__title {
  color: #fff;
}
.prog-card__desc {
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--ink-2);
  margin-bottom: 22px;
}
.prog-card--featured .prog-card__desc {
  color: rgba(255, 255, 255, 0.6);
}
.prog-card__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 28px;
  flex: 1;
}
.prog-card__list li {
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.82rem;
  color: var(--ink-2);
}
.prog-card--featured .prog-card__list li {
  color: rgba(255, 255, 255, 0.7);
}
.prog-card__list svg {
  flex-shrink: 0;
  color: var(--gold);
}
.prog-card__foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
.prog-card--featured .prog-card__foot {
  border-color: rgba(255, 255, 255, 0.12);
}
.prog-card__duration {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 4px;
}
.prog-card--featured .prog-card__duration {
  color: rgba(255, 255, 255, 0.4);
}
.prog-card__price {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--navy);
}
.prog-card--featured .prog-card__price {
  color: var(--gold-lt);
}
.prog-card--featured .btn--outline-navy {
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
.prog-card--featured .btn--outline-navy:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
}

/* ══ PROCESS ═══════════════════════════════════════════ */
.process__track {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  position: relative;
}
.process__step {
  padding: 32px 24px;
  text-align: center;
  position: relative;
  border: 1px solid var(--border);
  margin-right: -1px;
  background: #fff;
  transition: all 0.3s;
  overflow: hidden;
}
.process__step::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--navy);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s ease;
  z-index: 0;
}
.process__step:hover::before {
  transform: scaleY(1);
}
.process__step > * {
  position: relative;
  z-index: 1;
}
.process__step:hover .ps__num,
.process__step:hover .ps__title,
.process__step:hover .ps__body {
  color: rgba(255, 255, 255, 0.8);
}
.process__step:hover .ps__icon {
  filter: none;
}

.ps__num {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--gold);
  margin-bottom: 16px;
  display: block;
  transition: color 0.4s;
}
.ps__icon {
  font-size: 1.7rem;
  margin-bottom: 14px;
  display: block;
}
.ps__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 8px;
  transition: color 0.4s;
}
.ps__body {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.78rem;
  color: var(--ink-3);
  line-height: 1.65;
  transition: color 0.4s;
}

/* ══ METRICS BAND ══════════════════════════════════════ */
.metrics-band {
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-lt) 100%);
  padding: 56px 0;
}
.metrics-band__inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
.metric {
  text-align: center;
  padding: 0 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.metric:last-child {
  border-right: none;
}
.metric__val {
  display: block;
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--gold-lt);
  line-height: 1;
  margin-bottom: 10px;
}
.metric__lbl {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

/* ══ RESULTS ═══════════════════════════════════════════ */
.results__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.t-card {
  background: #fff;
  border-radius: var(--r-lg);
  padding: 32px;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: all 0.3s;
}
.t-card:hover {
  box-shadow: var(--sh-md);
  transform: translateY(-4px);
  border-color: rgba(184, 131, 42, 0.3);
}
.t-card__stars {
  color: #e8a020;
  font-size: 0.85rem;
  letter-spacing: 2px;
}
.t-card__quote {
  font-size: 0.97rem;
  line-height: 1.8;
  color: var(--ink-2);
  font-style: italic;
  flex: 1;
}
.t-card__outcome {
  background: var(--gold-pale);
  border-radius: var(--r);
  padding: 12px 16px;
  border-left: 3px solid var(--gold);
}
.t-card__outcome-val {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}
.t-card__outcome-lbl {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-top: 4px;
}
.t-card__author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.t-card__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
}
.t-card__name {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--navy);
}
.t-card__role {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.72rem;
  color: var(--ink-3);
  margin-top: 2px;
}

/* ══ TEAM ══════════════════════════════════════════════ */
.team__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.coach-card {
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all 0.3s;
}
.coach-card:hover {
  box-shadow: var(--sh-md);
  transform: translateY(-4px);
}
.coach-card__photo-wrap {
  position: relative;
  height: 290px;
  overflow: hidden;
}
.coach-card__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.coach-card:hover .coach-card__photo {
  transform: scale(1.05);
}
.coach-card__hover-bio {
  position: absolute;
  inset: 0;
  background: rgba(12, 30, 53, 0.88);
  display: flex;
  align-items: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}
.coach-card:hover .coach-card__hover-bio {
  opacity: 1;
}
.coach-card__hover-bio p {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}
.coach-card__info {
  padding: 18px 20px;
  background: #fff;
}
.coach-card__name {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 4px;
}
.coach-card__title {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.73rem;
  color: var(--ink-3);
  margin-bottom: 10px;
}
.coach-card__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.ctag {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 2px;
  background: var(--navy-pale);
  color: var(--navy);
}

/* ══ FAQ ═══════════════════════════════════════════════ */
.faq-section__inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  align-items: start;
}
.faq-item {
  border-bottom: 1px solid var(--border);
}
.faq-item__q {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--navy);
  gap: 12px;
  transition: color 0.2s;
}
.faq-item__q:hover {
  color: var(--gold);
}
.faq-item__caret {
  flex-shrink: 0;
  color: var(--gold);
  transition: transform 0.3s;
}
.faq-item__caret--flip {
  transform: rotate(180deg);
}
.faq-item__a {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.9rem;
  color: var(--ink-2);
  line-height: 1.8;
  padding-bottom: 20px;
}

/* FAQ slide transition */
.slide-faq-enter-active,
.slide-faq-leave-active {
  transition: all 0.35s ease;
  overflow: hidden;
}
.slide-faq-enter-from,
.slide-faq-leave-to {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
}
.slide-faq-enter-to,
.slide-faq-leave-from {
  max-height: 300px;
  opacity: 1;
}

/* ══ CONTACT ═══════════════════════════════════════════ */
.contact {
  background: var(--navy);
  position: relative;
  overflow: hidden;
}
.contact__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.contact__mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 52px 52px;
}
.contact__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
  position: relative;
  z-index: 2;
}
.contact__pitch-body {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 36px;
}
.contact__details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.contact__detail {
  display: flex;
  align-items: center;
  gap: 16px;
}
.contact__detail-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--r);
  background: rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.contact__detail-label {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}
.contact__detail-val {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 2px;
}

/* Form card */
.contact__form-card {
  background: #fff;
  border-radius: var(--r-lg);
  padding: 40px;
  box-shadow: var(--sh-lg);
}
.form-heading {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 26px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-field label {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.form-field input,
.form-field select,
.form-field textarea {
  padding: 11px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--r);
  color: var(--ink);
  background: #fff;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  outline: none;
  transition:
    border-color 0.25s,
    box-shadow 0.25s;
  width: 100%;
}
.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(184, 131, 42, 0.12);
}
.form-field input::placeholder,
.form-field textarea::placeholder {
  color: var(--ink-3);
}
.form-field textarea {
  resize: vertical;
}
.form-field select {
  appearance: none;
}

.form-disclaimer {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.7rem;
  color: var(--ink-3);
  text-align: center;
  margin-top: 4px;
}

.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 20px;
  text-align: center;
}
.form-success__check {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--gold);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
.form-success strong {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--navy);
  font-family: 'Instrument Sans', sans-serif;
}
.form-success span {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.88rem;
  color: var(--ink-2);
  line-height: 1.6;
}

/* Fade form transition */
.fade-form-enter-active,
.fade-form-leave-active {
  transition: opacity 0.35s;
}
.fade-form-enter-from,
.fade-form-leave-to {
  opacity: 0;
}

/* ══ FOOTER ════════════════════════════════════════════ */
.footer {
  background: #070f1a;
}
.footer__top {
  display: flex;
  gap: 80px;
  padding-top: 60px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.footer__brand {
  flex-shrink: 0;
}
.footer__emblem {
  display: inline-flex;
  width: 36px;
  height: 36px;
  background: var(--navy-mid);
  color: #fff;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 3px;
  margin-bottom: 10px;
}
.footer__name {
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 10px;
}
.footer__name em {
  font-style: normal;
  color: var(--gold);
}
.footer__tagline {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.28);
  font-style: italic;
  max-width: 180px;
  line-height: 1.5;
}
.footer__cols {
  display: flex;
  gap: 56px;
  flex: 1;
  justify-content: flex-end;
}
.footer__col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer__col-heading {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 4px;
}
.footer__col-link {
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.42);
  transition: color 0.2s;
}
.footer__col-link:hover {
  color: var(--gold-lt);
}
.footer__bottom {
  display: flex;
  justify-content: space-between;
  padding: 20px 48px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.22);
}

/* ══ RESPONSIVE ════════════════════════════════════════ */
@media (max-width: 1100px) {
  .team__grid {
    grid-template-columns: 1fr 1fr;
  }
  .process__track {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 860px) {
  .wrap {
    padding: 0 20px;
  }
  .section {
    padding: 72px 0;
  }
  .hero__layout {
    grid-template-columns: 1fr;
    padding: 48px 20px 80px;
    gap: 0;
  }
  .hero__visual {
    display: none;
  }
  .about .wrap {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .about__img--secondary {
    display: none;
  }
  .about__years-badge {
    right: 0;
    left: auto;
  }
  .programs__grid {
    grid-template-columns: 1fr;
  }
  .results__grid {
    grid-template-columns: 1fr;
  }
  .faq-section__inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .contact__inner {
    grid-template-columns: 1fr;
  }
  .metrics-band__inner {
    grid-template-columns: 1fr 1fr;
  }
  .metric {
    padding: 20px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .footer__top {
    flex-direction: column;
    gap: 32px;
  }
  .footer__cols {
    flex-wrap: wrap;
    gap: 28px;
    justify-content: flex-start;
  }
  .footer__bottom {
    flex-direction: column;
    gap: 6px;
    text-align: center;
    padding: 16px 20px;
  }
  .nav__wrap {
    padding: 0 20px;
  }
  .hero__proof-row {
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
