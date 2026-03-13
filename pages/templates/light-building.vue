<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

/* ── Cursor ─────────────────────────────────────────── */
const mx = ref(0),
  my = ref(0),
  rx = ref(0),
  ry = ref(0);
let raf = null;
const dotS = computed(() => ({ left: `${mx.value}px`, top: `${my.value}px` }));
const ringS = computed(() => ({ left: `${rx.value}px`, top: `${ry.value}px` }));
function trackMouse(e) {
  mx.value = e.clientX;
  my.value = e.clientY;
}
function loopRing() {
  rx.value += (mx.value - rx.value) * 0.1;
  ry.value += (my.value - ry.value) * 0.1;
  raf = requestAnimationFrame(loopRing);
}

/* ── Nav / scroll ───────────────────────────────────── */
const navSolid = ref(false);
const mobileOpen = ref(false);
function onScroll() {
  navSolid.value = window.scrollY > 60;
}
function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  mobileOpen.value = false;
}

/* ── Lang / UI State ────────────────────────────────── */
const lang = ref('zh');
const activeUnit = ref(0);
const lightboxIdx = ref(null);
const openFaq = ref(null);

function openLightbox(i) {
  lightboxIdx.value = i;
}
function lbPrev() {
  lightboxIdx.value =
    (lightboxIdx.value - 1 + galleryImages.length) % galleryImages.length;
}
function lbNext() {
  lightboxIdx.value = (lightboxIdx.value + 1) % galleryImages.length;
}

/* ── Form ───────────────────────────────────────────── */
const formLoading = ref(false);
const formDone = ref(false);
const form = reactive({
  name: '',
  phone: '',
  email: '',
  unit: '',
  time: '',
  note: '',
});
function submitForm() {
  formLoading.value = true;
  setTimeout(() => {
    formLoading.value = false;
    formDone.value = true;
  }, 1500);
}

/* ── Reveal ─────────────────────────────────────────── */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const d = parseFloat(el.style.getPropertyValue('--d') || '0');
        setTimeout(() => el.classList.add('revealed'), d * 1000);
      });
    },
    { threshold: 0.06 },
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

/* ── Data ───────────────────────────────────────────── */
const navItems = [
  { id: 'concept', cn: '設計理念', en: 'Concept' },
  { id: 'gallery', cn: '空間實拍', en: 'Gallery' },
  { id: 'units', cn: '戶型規劃', en: 'Units' },
  { id: 'amenities', cn: '公設配備', en: 'Amenities' },
  { id: 'location', cn: '地理位置', en: 'Location' },
];

const heroStats = [
  { val: '38F', cn: '建築樓層', en: 'Floors' },
  { val: '42戶', cn: '限量戶數', en: 'Limited Units' },
  { val: '86坪起', cn: '室內坪數', en: 'Sq. Ping' },
  { val: '2026', cn: '預計完工', en: 'Est. Complete' },
];

const tickerItems = [
  '御璽建設',
  'IMPERIAL ESTATE',
  '信義區頂尖地段',
  'Xinyi Prime Location',
  '42戶限量釋出',
  'Limited 42 Units',
  '國際聯名設計',
  'International Design Collaboration',
];

const conceptSpecs = [
  { val: 'B5F + 38F', cn: '建築規模', en: 'Scale' },
  { val: '86–286坪', cn: '戶型範圍', en: 'Unit Range' },
  { val: '4.2m', cn: '樓層高度', en: 'Ceiling Ht' },
  { val: '2026 Q4', cn: '預計完工', en: 'Completion' },
];

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&q=85&auto=format&fit=crop',
    cn: '客廳 · 城市全景',
    en: 'Living Room · City Panorama',
    size: 'lg',
  },
  {
    src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=85&auto=format&fit=crop',
    cn: '主臥 · 晨光質感',
    en: 'Master Suite · Morning Light',
    size: 'sm',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=85&auto=format&fit=crop',
    cn: '主臥 · 私人陽台',
    en: 'Master Suite · Private Terrace',
    size: 'sm',
  },
  {
    src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=85&auto=format&fit=crop',
    cn: '主衛 · 雙面盆設計',
    en: 'Master Bath · Double Vanity',
    size: 'sm',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=85&auto=format&fit=crop',
    cn: '開放式廚房',
    en: 'Open Kitchen',
    size: 'sm',
  },
  {
    src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=85&auto=format&fit=crop',
    cn: '書房 · 精工細作',
    en: 'Study · Artisanal Craft',
    size: 'lg',
  },
];

const units = [
  {
    id: 'A',
    tag: 'A 型',
    nameCn: '藏峰 · 三房',
    nameEn: 'Summit · 3BR',
    floor: '8–18F',
    price: 'NT$ 5,800萬 起',
    status: 'available',
    statusCn: '尚有餘戶',
    statusEn: 'Available',
    planImg:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80&auto=format&fit=crop',
    specs: [
      { icon: '📐', val: '86坪', cn: '室內坪數', en: 'Interior' },
      { icon: '🛏', val: '3+1', cn: '房間數', en: 'Bedrooms' },
      { icon: '🚿', val: '3', cn: '衛浴數', en: 'Baths' },
      { icon: '🅿', val: '2個', cn: '車位', en: 'Parking' },
    ],
    features: [
      { cn: '270° 環景客廳採光', en: '270° panoramic living room' },
      { cn: '義式進口廚具全配', en: 'Italian imported kitchen appliances' },
      { cn: '主臥私人露台', en: 'Master suite private terrace' },
      { cn: '獨立儲藏室', en: 'Separate storage room' },
    ],
  },
  {
    id: 'B',
    tag: 'B 型',
    nameCn: '雲居 · 四房',
    nameEn: 'Cloud · 4BR',
    floor: '19–28F',
    price: 'NT$ 9,200萬 起',
    status: 'limited',
    statusCn: '限量釋出',
    statusEn: 'Limited',
    planImg:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    specs: [
      { icon: '📐', val: '136坪', cn: '室內坪數', en: 'Interior' },
      { icon: '🛏', val: '4+1', cn: '房間數', en: 'Bedrooms' },
      { icon: '🚿', val: '4', cn: '衛浴數', en: 'Baths' },
      { icon: '🅿', val: '3個', cn: '車位', en: 'Parking' },
    ],
    features: [
      { cn: '全棟最佳視野樓層', en: 'Premium view floors in the tower' },
      { cn: '客廳餐廳完全開放式', en: 'Fully open living and dining concept' },
      { cn: '雙主臥套房規格', en: 'Dual master suite configuration' },
      { cn: '傭人房獨立動線', en: 'Separate staff quarters and entrance' },
    ],
  },
  {
    id: 'P',
    tag: 'PH',
    nameCn: '御頂 · 頂層複式',
    nameEn: 'Imperial Penthouse',
    floor: '37–38F',
    price: 'NT$ 3.8億 起',
    status: 'sold',
    statusCn: '已售出',
    statusEn: 'Sold',
    planImg:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80&auto=format&fit=crop',
    specs: [
      { icon: '📐', val: '286坪', cn: '室內坪數', en: 'Interior' },
      { icon: '🛏', val: '5+2', cn: '房間數', en: 'Bedrooms' },
      { icon: '🚿', val: '6', cn: '衛浴數', en: 'Baths' },
      { icon: '🅿', val: '5個', cn: '車位', en: 'Parking' },
    ],
    features: [
      { cn: '台北 360° 無遮蔽全景', en: 'Taipei 360° unobstructed panorama' },
      { cn: '頂樓私人花園泳池', en: 'Rooftop private garden pool' },
      { cn: '私人電梯直達入戶', en: 'Private elevator direct entry' },
      { cn: '智慧全宅系統', en: 'Full smart home system' },
    ],
  },
  {
    id: 'S',
    tag: 'S 型',
    nameCn: '悅居 · 兩房',
    nameEn: 'Serene · 2BR',
    floor: '3–7F',
    price: 'NT$ 3,200萬 起',
    status: 'available',
    statusCn: '尚有餘戶',
    statusEn: 'Available',
    planImg:
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80&auto=format&fit=crop',
    specs: [
      { icon: '📐', val: '56坪', cn: '室內坪數', en: 'Interior' },
      { icon: '🛏', val: '2+1', cn: '房間數', en: 'Bedrooms' },
      { icon: '🚿', val: '2', cn: '衛浴數', en: 'Baths' },
      { icon: '🅿', val: '1個', cn: '車位', en: 'Parking' },
    ],
    features: [
      { cn: '低樓層私花園設計', en: 'Low-floor private garden design' },
      { cn: '精品一字型廚房', en: 'Boutique linear kitchen' },
      { cn: '主臥套房衛浴', en: 'Master suite en-suite bathroom' },
      { cn: '優先使用健身房', en: 'Priority fitness center access' },
    ],
  },
];

const amenities = [
  {
    icon: '🏊',
    cn: '無邊際泳池',
    en: 'Infinity Pool',
    descCn: '37 樓戶外無邊際泳池，俯瞰台北全景，全年水溫恆定 28°C。',
    descEn:
      'Outdoor infinity pool on 37F, overlooking all of Taipei with year-round 28°C water.',
    img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80&auto=format&fit=crop',
  },
  {
    icon: '🏋',
    cn: '私人健身中心',
    en: 'Private Fitness',
    descCn: '配備 Technogym 全套義大利健身器材，並設有私人教練預約室。',
    descEn:
      'Full Technogym Italian equipment suite with private trainer booking room.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80&auto=format&fit=crop',
  },
  {
    icon: '🍷',
    cn: '恆溫酒窖沙龍',
    en: 'Wine Cellar Salon',
    descCn:
      '可容納 2,000 瓶的私藏酒窖，附設品酒沙龍空間，每月定期舉辦私人酒會。',
    descEn:
      'A 2,000-bottle private wine cellar with tasting salon, hosting monthly private wine events.',
    img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=500&q=80&auto=format&fit=crop',
  },
  {
    icon: '🧘',
    cn: 'SPA 療癒中心',
    en: 'Spa & Wellness',
    descCn: '融合和式枯山水元素的冥想庭院，搭配芬蘭頂級 Harvia 蒸氣浴設備。',
    descEn:
      'A contemplative garden with Japanese karesansui elements and Finnish Harvia premium sauna.',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80&auto=format&fit=crop',
  },
  {
    icon: '🎭',
    cn: '私人影音廳',
    en: 'Private Cinema',
    descCn: '20 席真皮躺椅、4K 雷射投影、杜比全景聲環繞，可私人包場使用。',
    descEn:
      '20 leather recliners, 4K laser projection, Dolby Atmos surround — available for private booking.',
    img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80&auto=format&fit=crop',
  },
  {
    icon: '🚗',
    cn: '代客泊車 & 洗車',
    en: 'Valet & Car Care',
    descCn: '24 小時代客泊車服務，配備電動車充電站，每週提供專業洗車服務。',
    descEn:
      '24-hour valet parking with EV charging stations and weekly professional car detailing.',
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&q=80&auto=format&fit=crop',
  },
];

const distances = [
  {
    icon: '🏙',
    placeCn: '台北 101 大樓',
    placeEn: 'Taipei 101',
    dist: '步行 5 分鐘 · 5 min walk',
  },
  {
    icon: '🛍',
    placeCn: '信義新天地 A8–11',
    placeEn: 'Xinyi ATT / Bellavita',
    dist: '步行 8 分鐘 · 8 min walk',
  },
  {
    icon: '✈',
    placeCn: '松山機場',
    placeEn: 'Songshan Airport',
    dist: '車程 12 分鐘 · 12 min drive',
  },
  {
    icon: '🏨',
    placeCn: '台北君悅大飯店',
    placeEn: 'Grand Hyatt Taipei',
    dist: '步行 3 分鐘 · 3 min walk',
  },
  {
    icon: '🏫',
    placeCn: '台北美國學校',
    placeEn: 'Taipei American School',
    dist: '車程 10 分鐘 · 10 min drive',
  },
];

const devAwards = [
  {
    year: '2024',
    titleCn: '亞太建築大獎 — 年度最佳豪宅建案',
    titleEn: 'Asia Pacific Architecture Award — Best Luxury Residential',
  },
  {
    year: '2023',
    titleCn: 'FIABCI 世界不動產卓越大獎 金獎',
    titleEn: "FIABCI World Prix d'Excellence — Gold Award",
  },
  {
    year: '2022',
    titleCn: 'Forbes Asia — 最具影響力建設品牌',
    titleEn: 'Forbes Asia — Most Influential Real Estate Brand',
  },
  {
    year: '2021',
    titleCn: '台灣建設公會 — 百大卓越建設企業',
    titleEn: 'Taiwan Construction Association — Top 100 Excellence',
  },
];

const devStats = [
  { num: '30+', cn: '年品牌歷史', en: 'Years of Legacy' },
  { num: '14', cn: '指標建案', en: 'Landmark Projects' },
  { num: '3,200+', cn: '交屋家庭', en: 'Families Served' },
  { num: '98%', cn: '業主推薦率', en: 'Owner Referral Rate' },
];

const contactInfo = [
  {
    icon: '📍',
    labelCn: '接待中心',
    labelEn: 'Sales Center',
    valCn: '台北市信義區松仁路 100 號 1F',
    valEn: '1F, No. 100, Songren Rd., Xinyi Dist., Taipei',
  },
  {
    icon: '📞',
    labelCn: '專線電話',
    labelEn: 'Hotline',
    valCn: '+886 (02) 2345-6789',
    valEn: '+886 (02) 2345-6789',
  },
  {
    icon: '🕙',
    labelCn: '開放時間',
    labelEn: 'Hours',
    valCn: '每日 10:00 — 18:00',
    valEn: 'Daily 10:00 — 18:00',
  },
  {
    icon: '✈',
    labelCn: '海外服務',
    labelEn: 'Overseas',
    valCn: 'WeChat · LINE · WhatsApp',
    valEn: 'WeChat · LINE · WhatsApp',
  },
];

const timeSlots = [
  { cn: '平日上午 10:00–12:00', en: 'Weekday Morning 10:00–12:00' },
  { cn: '平日下午 14:00–16:00', en: 'Weekday Afternoon 14:00–16:00' },
  { cn: '平日下午 16:00–18:00', en: 'Weekday Afternoon 16:00–18:00' },
  { cn: '週末上午 10:00–12:00', en: 'Weekend Morning 10:00–12:00' },
  { cn: '週末下午 14:00–16:00', en: 'Weekend Afternoon 14:00–16:00' },
  { cn: '依個人需求另行安排', en: 'By private appointment' },
];

const footerCols = [
  {
    headingCn: '建案資訊',
    headingEn: 'Project',
    links: [
      { cn: '設計理念', en: 'Concept' },
      { cn: '空間實拍', en: 'Gallery' },
      { cn: '戶型規劃', en: 'Units' },
      { cn: '公設配備', en: 'Amenities' },
    ],
  },
  {
    headingCn: '品牌資訊',
    headingEn: 'Company',
    links: [
      { cn: '關於我們', en: 'About' },
      { cn: '往期建案', en: 'Past Projects' },
      { cn: '品牌理念', en: 'Philosophy' },
      { cn: '媒體報導', en: 'Press' },
    ],
  },
  {
    headingCn: '聯絡服務',
    headingEn: 'Contact',
    links: [
      { cn: '預約鑑賞', en: 'Book Viewing' },
      { cn: '海外服務', en: 'Overseas' },
      { cn: '常見問題', en: 'FAQ' },
      { cn: '隱私政策', en: 'Privacy' },
    ],
  },
];

/* ── Lifecycle ──────────────────────────────────────── */
onMounted(() => {
  loopRing();
  window.addEventListener('scroll', onScroll, { passive: true });
  initReveal();
});
onUnmounted(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div class="re-page" @mousemove="trackMouse">
    <!-- Custom cursor -->
    <div class="cur-dot" :style="dotS" />
    <div class="cur-ring" :style="ringS" />

    <!-- ══ NAV ══════════════════════════════════════════ -->
    <header :class="['re-nav', { 're-nav--solid': navSolid }]">
      <div class="re-nav__inner">
        <a class="re-nav__logo" href="#" @click.prevent="go('hero')">
          <span class="re-nav__logo-mark">御</span>
          <div class="re-nav__logo-text">
            <span class="re-nav__logo-cn">御璽建設</span>
            <span class="re-nav__logo-en">IMPERIAL ESTATE</span>
          </div>
        </a>

        <nav :class="['re-nav__links', { open: mobileOpen }]">
          <a
            v-for="n in navItems"
            :key="n.id"
            :href="`#${n.id}`"
            class="re-nav__link"
            @click.prevent="
              go(n.id);
              mobileOpen = false;
            "
          >
            <span class="re-nav__link-cn">{{ n.cn }}</span>
            <span class="re-nav__link-en">{{ n.en }}</span>
          </a>
          <button
            class="btn btn--copper re-nav__cta"
            @click="
              go('contact');
              mobileOpen = false;
            "
          >
            預約賞屋
          </button>
        </nav>

        <div class="re-nav__lang">
          <button :class="{ active: lang === 'zh' }" @click="lang = 'zh'">
            中
          </button>
          <span>|</span>
          <button :class="{ active: lang === 'en' }" @click="lang = 'en'">
            EN
          </button>
        </div>

        <button class="re-nav__burger" @click="mobileOpen = !mobileOpen">
          <span /><span /><span />
        </button>
      </div>
    </header>

    <!-- ══ HERO ══════════════════════════════════════════ -->
    <section id="hero" class="hero">
      <!-- Full-bleed background image -->
      <div class="hero__bg">
        <img
          class="hero__bg-img"
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=90&auto=format&fit=crop"
          alt="luxury residence"
        />
        <div class="hero__bg-veil" />
        <div class="hero__bg-grain" />
      </div>

      <!-- Vertical title block -->
      <div class="hero__content">
        <div class="hero__eyebrow">
          <span class="hero__eyebrow-line" />
          <span>{{
            lang === 'zh'
              ? '指定收藏 · 限量釋出'
              : 'BY APPOINTMENT · LIMITED RELEASE'
          }}</span>
        </div>

        <h1 class="hero__title">
          <span class="hero__title-en">WHERE SILENCE<br />SPEAKS LUXURY</span>
          <span class="hero__title-cn">在靜默中<br />感受極致奢華</span>
        </h1>

        <p class="hero__sub">
          {{
            lang === 'zh'
              ? '全台唯一以「建築即藝術」為核心的私人住宅品牌，精選台北最後一塊絕版地段，誠邀全球頂尖藏家鑑賞。'
              : 'Taiwan\'s only private residential brand built on "architecture as art." The last irreplaceable address in Taipei — exclusively for the world\'s discerning collectors.'
          }}
        </p>

        <div class="hero__actions">
          <button class="btn btn--hero-primary" @click="go('units')">
            {{ lang === 'zh' ? '探索戶型' : 'Explore Units' }}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10h12M11 5l5 5-5 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button class="btn btn--hero-ghost" @click="go('contact')">
            {{ lang === 'zh' ? '私人鑑賞預約' : 'Private Viewing' }}
          </button>
        </div>

        <!-- Bottom stats bar -->
        <div class="hero__stats">
          <div v-for="s in heroStats" :key="s.val" class="hero__stat">
            <strong>{{ s.val }}</strong>
            <span>{{ lang === 'zh' ? s.cn : s.en }}</span>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero__scroll" @click="go('concept')">
        <div class="hero__scroll-wheel" />
        <span>{{ lang === 'zh' ? '向下探索' : 'Scroll' }}</span>
      </div>

      <!-- Awards badge -->
      <div class="hero__award">
        <div class="hero__award-icon">🏛</div>
        <div>
          <span class="hero__award-title">{{
            lang === 'zh'
              ? '2024 亞太建築大獎'
              : '2024 Asia Pacific Architecture Award'
          }}</span>
          <span class="hero__award-sub">{{
            lang === 'zh'
              ? '年度最佳豪宅建案'
              : 'Luxury Residential Project of the Year'
          }}</span>
        </div>
      </div>
    </section>

    <!-- ══ TICKER ══════════════════════════════════════ -->
    <div class="ticker">
      <div class="ticker__track">
        <span
          v-for="(t, i) in tickerItems.concat(tickerItems)"
          :key="i"
          class="ticker__item"
        >
          {{ t }} <em>✦</em>
        </span>
      </div>
    </div>

    <!-- ══ CONCEPT ════════════════════════════════════ -->
    <section id="concept" class="concept section">
      <div class="concept__inner wrap">
        <div class="concept__left reveal">
          <div class="concept__img-wrap">
            <img
              class="concept__img"
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85&auto=format&fit=crop"
              alt="interior"
            />
            <div class="concept__img-frame" />
          </div>
          <div class="concept__img-caption">
            <span>{{
              lang === 'zh'
                ? '主臥 · 私人陽台'
                : 'Master Suite · Private Terrace'
            }}</span>
          </div>
        </div>

        <div class="concept__right reveal" style="--d: 0.15s">
          <span class="section-label">{{
            lang === 'zh' ? '設計理念' : 'CONCEPT'
          }}</span>
          <h2 class="section-h2">
            {{
              lang === 'zh'
                ? '以精準的克制，\n成就永恆之作。'
                : 'Precise Restraint.\nTimeless Masterpiece.'
            }}
          </h2>
          <p class="section-body">
            {{
              lang === 'zh'
                ? '御璽，取「御」字皇室之意，「璽」之傳承之印。每一個設計決策皆源自對空間本質的深刻思索——光的路徑、材質的溫度、靜默的重量。'
                : 'Every design decision at Imperial Estate originates from a deep contemplation of spatial essence — the path of light, the warmth of material, the weight of silence.'
            }}
          </p>
          <p class="section-body">
            {{
              lang === 'zh'
                ? '我們邀請義大利建築師 Marco Bellini 主導空間規劃，與日本木作職人 Yamamoto Atelier 共同打造室內質感，在台灣土地上立起一座跨越時間的居住藝術。'
                : 'We invited Italian architect Marco Bellini to lead spatial planning, alongside Japanese woodcraft master Yamamoto Atelier, to erect a timeless residential artwork on Taiwanese soil.'
            }}
          </p>
          <div class="concept__specs">
            <div v-for="sp in conceptSpecs" :key="sp.val" class="concept__spec">
              <strong>{{ sp.val }}</strong>
              <span>{{ lang === 'zh' ? sp.cn : sp.en }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ GALLERY ════════════════════════════════════ -->
    <section id="gallery" class="gallery section section--dark">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="section-label light">{{
            lang === 'zh' ? '空間實拍' : 'GALLERY'
          }}</span>
          <h2 class="section-h2 light">
            {{
              lang === 'zh'
                ? '每一幀，都是藏品。'
                : "Every Frame, a Collector's Piece."
            }}
          </h2>
        </div>
        <div class="gallery__grid reveal" style="--d: 0.1s">
          <div
            v-for="(img, i) in galleryImages"
            :key="i"
            :class="['gallery__item', `gallery__item--${img.size}`]"
            @click="openLightbox(i)"
          >
            <img :src="img.src" :alt="lang === 'zh' ? img.cn : img.en" />
            <div class="gallery__item-overlay">
              <span class="gallery__item-label">{{
                lang === 'zh' ? img.cn : img.en
              }}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 4v12M4 10h12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      <Transition name="lb">
        <div
          v-if="lightboxIdx !== null"
          class="lightbox"
          @click.self="lightboxIdx = null"
        >
          <button class="lightbox__close" @click="lightboxIdx = null">✕</button>
          <button class="lightbox__prev" @click="lbPrev">‹</button>
          <img class="lightbox__img" :src="galleryImages[lightboxIdx].src" />
          <button class="lightbox__next" @click="lbNext">›</button>
          <div class="lightbox__caption">
            {{
              lang === 'zh'
                ? galleryImages[lightboxIdx].cn
                : galleryImages[lightboxIdx].en
            }}
          </div>
        </div>
      </Transition>
    </section>

    <!-- ══ UNITS ══════════════════════════════════════ -->
    <section id="units" class="units section">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="section-label">{{
            lang === 'zh' ? '戶型規劃' : 'FLOOR PLANS'
          }}</span>
          <h2 class="section-h2">
            {{
              lang === 'zh'
                ? '四種尺度，\n四種生活態度。'
                : 'Four Scales.\nFour Ways of Living.'
            }}
          </h2>
        </div>

        <!-- Tab switcher -->
        <div class="units__tabs reveal" style="--d: 0.1s">
          <button
            v-for="(u, i) in units"
            :key="u.id"
            :class="['units__tab', { active: activeUnit === i }]"
            @click="activeUnit = i"
          >
            <span>{{ u.tag }}</span>
            <span class="units__tab-name">{{
              lang === 'zh' ? u.nameCn : u.nameEn
            }}</span>
          </button>
        </div>

        <Transition name="unit-fade" mode="out-in">
          <div :key="activeUnit" class="units__detail reveal">
            <div class="units__floor-plan">
              <img
                :src="units[activeUnit].planImg"
                :alt="units[activeUnit].nameCn"
              />
              <div class="units__floor-badge">
                <span>{{ units[activeUnit].floor }}</span>
                <span class="units__floor-label">{{
                  lang === 'zh' ? '樓層' : 'Floor'
                }}</span>
              </div>
            </div>
            <div class="units__info">
              <div class="units__info-header">
                <h3 class="units__name">
                  {{
                    lang === 'zh'
                      ? units[activeUnit].nameCn
                      : units[activeUnit].nameEn
                  }}
                </h3>
                <div
                  class="units__status"
                  :class="`units__status--${units[activeUnit].status}`"
                >
                  {{
                    lang === 'zh'
                      ? units[activeUnit].statusCn
                      : units[activeUnit].statusEn
                  }}
                </div>
              </div>
              <div class="units__price">{{ units[activeUnit].price }}</div>
              <div class="units__specs-grid">
                <div
                  v-for="sp in units[activeUnit].specs"
                  :key="sp.label"
                  class="units__spec-box"
                >
                  <span class="units__spec-icon">{{ sp.icon }}</span>
                  <strong>{{ sp.val }}</strong>
                  <span>{{ lang === 'zh' ? sp.cn : sp.en }}</span>
                </div>
              </div>
              <ul class="units__features">
                <li v-for="f in units[activeUnit].features" :key="f.cn">
                  <span class="units__feature-dot" />
                  {{ lang === 'zh' ? f.cn : f.en }}
                </li>
              </ul>
              <div class="units__actions">
                <button class="btn btn--copper" @click="go('contact')">
                  {{ lang === 'zh' ? '預約此戶型' : 'Reserve This Unit' }}
                </button>
                <button class="btn btn--outline-dark">
                  {{ lang === 'zh' ? '下載平面圖' : 'Download Plan' }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- ══ AMENITIES ══════════════════════════════════ -->
    <section id="amenities" class="amenities section section--mist">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="section-label">{{
            lang === 'zh' ? '公設配備' : 'AMENITIES'
          }}</span>
          <h2 class="section-h2">
            {{
              lang === 'zh'
                ? '生活配備，\n超越想像。'
                : 'Amenities Beyond\nImagination.'
            }}
          </h2>
        </div>
        <div class="amenities__grid">
          <div
            v-for="(am, i) in amenities"
            :key="am.title"
            :class="['am-card', 'reveal']"
            :style="{ '--d': `${i * 0.07}s` }"
          >
            <div class="am-card__img-wrap">
              <img :src="am.img" :alt="lang === 'zh' ? am.cn : am.en" />
            </div>
            <div class="am-card__body">
              <span class="am-card__icon">{{ am.icon }}</span>
              <h4 class="am-card__title">
                {{ lang === 'zh' ? am.cn : am.en }}
              </h4>
              <p class="am-card__desc">
                {{ lang === 'zh' ? am.descCn : am.descEn }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ LOCATION ════════════════════════════════════ -->
    <section id="location" class="location section section--dark">
      <div class="wrap location__inner">
        <div class="location__left reveal">
          <span class="section-label light">{{
            lang === 'zh' ? '地理位置' : 'LOCATION'
          }}</span>
          <h2 class="section-h2 light">
            {{
              lang === 'zh'
                ? '台北最後一塊\n絕版稀有地段。'
                : 'The Last Rare Address\nin Taipei.'
            }}
          </h2>
          <p class="section-body light-body">
            {{
              lang === 'zh'
                ? '坐落信義計畫區精華核心，步行即達台北 101、國際五星飯店、頂級購物廊道，是真正意義上的「城市中的城市」。'
                : 'Situated at the heart of the Xinyi District. Taipei 101, five-star hotels, and premier retail — all within a leisurely walk. A city within the city.'
            }}
          </p>
          <div class="location__distances">
            <div v-for="d in distances" :key="d.place" class="loc-dist">
              <span class="loc-dist__icon">{{ d.icon }}</span>
              <div>
                <strong>{{ lang === 'zh' ? d.placeCn : d.placeEn }}</strong>
                <span>{{ d.dist }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="location__right reveal" style="--d: 0.15s">
          <div class="location__map-frame">
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format&fit=crop"
              alt="Taipei Xinyi District"
              class="location__map-img"
            />
            <div class="location__map-pin">
              <div class="location__map-pin-dot">
                <span class="location__map-pin-pulse" />
              </div>
              <div class="location__map-pin-label">
                {{ lang === 'zh' ? '御璽建設' : 'Imperial Estate' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ DEVELOPER ══════════════════════════════════ -->
    <section id="developer" class="developer section">
      <div class="wrap developer__inner">
        <div class="developer__left reveal">
          <span class="section-label">{{
            lang === 'zh' ? '建設品牌' : 'DEVELOPER'
          }}</span>
          <h2 class="section-h2">
            {{
              lang === 'zh'
                ? '三十年，\n只做傳世之作。'
                : 'Thirty Years of\nTimeless Craft.'
            }}
          </h2>
          <p class="section-body">
            {{
              lang === 'zh'
                ? '御璽建設自 1993 年成立，橫跨台北、上海、東京，在三座城市打造了超過 14 件指標性建案。我們的每一棟建築，皆在交屋後二十年仍保值升值。'
                : 'Founded in 1993, Imperial Estate has created over 14 landmark projects across Taipei, Shanghai, and Tokyo. Each of our buildings retains and appreciates in value two decades after delivery.'
            }}
          </p>
          <div class="developer__awards">
            <div v-for="a in devAwards" :key="a.title" class="dev-award">
              <span class="dev-award__year">{{ a.year }}</span>
              <span>{{ lang === 'zh' ? a.titleCn : a.titleEn }}</span>
            </div>
          </div>
        </div>
        <div class="developer__right reveal" style="--d: 0.12s">
          <div class="developer__stats-grid">
            <div v-for="s in devStats" :key="s.num" class="dev-stat">
              <strong class="dev-stat__num">{{ s.num }}</strong>
              <span class="dev-stat__label">{{
                lang === 'zh' ? s.cn : s.en
              }}</span>
            </div>
          </div>
          <div class="developer__portrait-wrap">
            <img
              class="developer__portrait"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d0549?w=500&q=80&auto=format&fit=crop&crop=face"
              alt="Developer"
              @error="
                (e) =>
                  (e.target.src =
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80&auto=format&fit=crop&crop=face')
              "
            />
            <div class="developer__sig">
              <strong>{{
                lang === 'zh'
                  ? '陳宏偉 · 創辦人暨總裁'
                  : 'Howard Chen · Founder & President'
              }}</strong>
              <span>{{
                lang === 'zh'
                  ? '「每一件作品，都是我們對土地與時間的承諾。」'
                  : '"Every project is our promise to the land and to time."'
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CONTACT ════════════════════════════════════ -->
    <section id="contact" class="contact section section--mist">
      <div class="wrap contact__inner">
        <div class="contact__left reveal">
          <span class="section-label">{{
            lang === 'zh' ? '私人接待' : 'PRIVATE RECEPTION'
          }}</span>
          <h2 class="section-h2">
            {{
              lang === 'zh'
                ? '預約您的\n專屬鑑賞時刻。'
                : 'Reserve Your\nExclusive Viewing.'
            }}
          </h2>
          <p class="section-body">
            {{
              lang === 'zh'
                ? '我們的私人接待專員將為您安排全程尊榮服務，包含空中俯瞰導覽、建材質感體驗，及私人財務規劃諮詢。'
                : 'Our private reception specialists will arrange a full exclusive experience — aerial overview, material touch tour, and private financial planning consultation.'
            }}
          </p>
          <div class="contact__info">
            <div
              v-for="ci in contactInfo"
              :key="ci.label"
              class="contact__info-item"
            >
              <span class="contact__info-icon">{{ ci.icon }}</span>
              <div>
                <span class="contact__info-label">{{
                  lang === 'zh' ? ci.labelCn : ci.labelEn
                }}</span>
                <span class="contact__info-val">{{
                  lang === 'zh' ? ci.valCn : ci.valEn
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="contact__right reveal" style="--d: 0.15s">
          <div class="contact__form-card">
            <Transition name="fade" mode="out-in">
              <div v-if="formDone" key="done" class="form-success">
                <div class="form-success__icon">✦</div>
                <strong>{{
                  lang === 'zh' ? '感謝您的預約' : 'Thank You'
                }}</strong>
                <span>{{
                  lang === 'zh'
                    ? '我們的專員將於 24 小時內與您聯繫，安排您的私人鑑賞。'
                    : 'Our specialist will contact you within 24 hours to arrange your private viewing.'
                }}</span>
              </div>
              <form
                v-else
                key="form"
                class="re-form"
                @submit.prevent="submitForm"
              >
                <h3 class="re-form__title">
                  {{
                    lang === 'zh'
                      ? '立即預約私人鑑賞'
                      : 'Book a Private Viewing'
                  }}
                </h3>
                <div class="re-form__row">
                  <div class="re-form__field">
                    <label>{{ lang === 'zh' ? '姓名' : 'Full Name' }}</label>
                    <input
                      v-model="form.name"
                      type="text"
                      :placeholder="lang === 'zh' ? '您的姓名' : 'Your name'"
                      required
                    />
                  </div>
                  <div class="re-form__field">
                    <label>{{ lang === 'zh' ? '聯絡電話' : 'Phone' }}</label>
                    <input
                      v-model="form.phone"
                      type="tel"
                      :placeholder="
                        lang === 'zh' ? '0912-345-678' : '+886 912 345 678'
                      "
                    />
                  </div>
                </div>
                <div class="re-form__field">
                  <label>{{ lang === 'zh' ? '電子信箱' : 'Email' }}</label>
                  <input
                    v-model="form.email"
                    type="email"
                    :placeholder="
                      lang === 'zh' ? 'email@example.com' : 'email@example.com'
                    "
                    required
                  />
                </div>
                <div class="re-form__field">
                  <label>{{
                    lang === 'zh' ? '感興趣的戶型' : 'Interested Unit'
                  }}</label>
                  <select v-model="form.unit">
                    <option value="">
                      {{ lang === 'zh' ? '請選擇…' : 'Select…' }}
                    </option>
                    <option v-for="u in units" :key="u.id" :value="u.id">
                      {{ lang === 'zh' ? u.nameCn : u.nameEn }}
                    </option>
                  </select>
                </div>
                <div class="re-form__field">
                  <label>{{
                    lang === 'zh' ? '偏好的鑑賞時間' : 'Preferred Viewing Time'
                  }}</label>
                  <select v-model="form.time">
                    <option value="">
                      {{ lang === 'zh' ? '請選擇…' : 'Select…' }}
                    </option>
                    <option v-for="t in timeSlots" :key="t.cn" :value="t.cn">
                      {{ lang === 'zh' ? t.cn : t.en }}
                    </option>
                  </select>
                </div>
                <div class="re-form__field">
                  <label>{{
                    lang === 'zh' ? '備註或特殊需求' : 'Special Requests'
                  }}</label>
                  <textarea
                    v-model="form.note"
                    rows="3"
                    :placeholder="
                      lang === 'zh'
                        ? '如需要口譯服務、輪椅無障礙空間等…'
                        : 'e.g. interpreter needed, accessibility requirements…'
                    "
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn--submit-re"
                  :disabled="formLoading"
                >
                  {{
                    formLoading
                      ? lang === 'zh'
                        ? '送出中…'
                        : 'Sending…'
                      : lang === 'zh'
                        ? '預約鑑賞'
                        : 'Book Viewing'
                  }}
                </button>
                <p class="re-form__note">
                  {{
                    lang === 'zh'
                      ? '🔒 您的個人資料受嚴格隱私保護'
                      : '🔒 Your data is protected under strict privacy policy'
                  }}
                </p>
              </form>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ FOOTER ══════════════════════════════════════ -->
    <footer class="re-footer">
      <div class="wrap re-footer__top">
        <div class="re-footer__brand">
          <span class="re-footer__logo-mark">御</span>
          <div>
            <span class="re-footer__logo-cn">御璽建設</span>
            <span class="re-footer__logo-en">IMPERIAL ESTATE</span>
          </div>
        </div>
        <div class="re-footer__cols">
          <div
            v-for="col in footerCols"
            :key="col.heading"
            class="re-footer__col"
          >
            <span class="re-footer__col-heading">{{
              lang === 'zh' ? col.headingCn : col.headingEn
            }}</span>
            <a
              v-for="link in col.links"
              :key="link.cn"
              href="#"
              class="re-footer__col-link"
            >
              {{ lang === 'zh' ? link.cn : link.en }}
            </a>
          </div>
        </div>
      </div>
      <div class="wrap re-footer__bottom">
        <span
          >© 2025 御璽建設有限公司 · Imperial Estate Ltd. All rights
          reserved.</span
        >
        <span>{{
          lang === 'zh'
            ? '不動產經紀人執照：台（北）字第 001234 號'
            : 'Real Estate License: Taipei No. 001234'
        }}</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ═══════════════════════════════════
   TOKENS
═══════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

.re-page {
  --copper: #b87a5e;
  --copper-lt: #d4a08a;
  --copper-pale: #f9f0eb;
  --iron: #2c2c2c;
  --iron-mid: #484848;
  --iron-lt: #6e6e6e;
  --mist: #f5f3f0;
  --fog: #eae7e3;
  --white: #ffffff;
  --dark-bg: #1a1a1a;
  --dark-card: #242424;
  --ink: #1a1a1a;
  --ink-2: #484848;
  --ink-3: #909090;
  --border: rgba(44, 44, 44, 0.1);
  --border-dk: rgba(255, 255, 255, 0.1);
  --sh-sm: 0 2px 12px rgba(44, 44, 44, 0.08);
  --sh-md: 0 8px 32px rgba(44, 44, 44, 0.12);
  --sh-lg: 0 24px 64px rgba(44, 44, 44, 0.18);
  --r: 4px;
  --r-lg: 12px;

  font-family: 'DM Sans', sans-serif;
  color: var(--ink);
  background: var(--white);
  overflow-x: hidden;
  cursor: none;
}

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

/* Cursor */
.cur-dot {
  position: fixed;
  z-index: 9999;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--copper);
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: multiply;
  transition:
    width 0.15s,
    height 0.15s;
}
.cur-ring {
  position: fixed;
  z-index: 9998;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(184, 122, 94, 0.4);
  pointer-events: none;
  transform: translate(-50%, -50%);
}

/* ── Layout ─────────────────────────────────────────── */
.wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
}
.section {
  padding: 100px 0;
}
.section--dark {
  background: var(--dark-bg);
}
.section--mist {
  background: var(--mist);
}

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.75s ease,
    transform 0.75s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: none;
}

/* ── Typography helpers ─────────────────────────────── */
.section-label {
  display: block;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--copper);
  margin-bottom: 14px;
}
.section-label.light {
  color: var(--copper-lt);
}
.section-h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 3.6vw, 3.2rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--iron);
  margin-bottom: 24px;
  white-space: pre-line;
}
.section-h2.light {
  color: #fff;
}
.section-body {
  font-size: 0.97rem;
  line-height: 1.9;
  color: var(--ink-2);
  margin-bottom: 16px;
}
.light-body {
  color: rgba(255, 255, 255, 0.6);
}
.section-head {
  text-align: center;
  margin-bottom: 56px;
}
.section-head .section-h2 {
  margin-bottom: 0;
}

/* ── Buttons ────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: var(--r);
  transition: all 0.25s;
  white-space: nowrap;
}
.btn--copper {
  background: var(--copper);
  color: #fff;
  padding: 13px 26px;
  box-shadow: 0 4px 16px rgba(184, 122, 94, 0.35);
}
.btn--copper:hover {
  background: var(--copper-lt);
  transform: translateY(-2px);
}
.btn--outline-dark {
  background: transparent;
  color: var(--iron);
  padding: 12px 24px;
  border: 1px solid var(--border);
}
.btn--outline-dark:hover {
  border-color: var(--iron);
}
.btn--submit-re {
  width: 100%;
  padding: 15px;
  justify-content: center;
  background: var(--iron);
  color: #fff;
  font-size: 0.88rem;
  border-radius: var(--r);
  box-shadow: var(--sh-md);
}
.btn--submit-re:hover:not(:disabled) {
  background: var(--iron-mid);
  transform: translateY(-2px);
}
.btn--submit-re:disabled {
  opacity: 0.6;
}
.btn--hero-primary {
  background: var(--copper);
  color: #fff;
  padding: 16px 32px;
  font-size: 0.85rem;
  box-shadow: 0 8px 24px rgba(184, 122, 94, 0.4);
}
.btn--hero-primary:hover {
  background: var(--copper-lt);
  transform: translateY(-2px);
}
.btn--hero-ghost {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
  padding: 15px 32px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 0.85rem;
}
.btn--hero-ghost:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.5);
}

/* ══ NAV ═══════════════════════════════════════════════ */
.re-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  border-bottom: 1px solid transparent;
  transition:
    background 0.35s,
    box-shadow 0.35s,
    border-color 0.35s;
}
.re-nav--solid {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20px);
  border-color: var(--border);
  box-shadow: var(--sh-sm);
}
.re-nav__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
  height: 76px;
  display: flex;
  align-items: center;
  gap: 36px;
}
.re-nav__logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: auto;
}
.re-nav__logo-mark {
  width: 40px;
  height: 40px;
  background: var(--iron);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  border-radius: 2px;
  flex-shrink: 0;
}
.re-nav--solid .re-nav__logo-mark {
  background: var(--iron);
}
.re-nav__logo:not(.re-nav--solid *) .re-nav__logo-mark {
  background: rgba(255, 255, 255, 0.15);
}
.re-nav__logo-cn {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--iron);
  line-height: 1.1;
}
.re-nav__logo-en {
  display: block;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  color: var(--iron-lt);
  text-transform: uppercase;
}
/* On hero (before scroll), override to white */
.re-nav:not(.re-nav--solid) .re-nav__logo-cn {
  color: #fff;
}
.re-nav:not(.re-nav--solid) .re-nav__logo-en {
  color: rgba(255, 255, 255, 0.5);
}

.re-nav__links {
  display: flex;
  align-items: center;
  gap: 24px;
}
.re-nav__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1px;
  transition: opacity 0.2s;
}
.re-nav__link:hover {
  opacity: 0.75;
}
.re-nav__link-cn {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}
.re-nav--solid .re-nav__link-cn {
  color: var(--ink-2);
}
.re-nav__link-en {
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
}
.re-nav--solid .re-nav__link-en {
  color: var(--ink-3);
}

.re-nav__lang {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
}
.re-nav--solid .re-nav__lang {
  color: var(--ink-3);
}
.re-nav__lang button {
  padding: 2px 4px;
  transition: color 0.2s;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
}
.re-nav--solid .re-nav__lang button {
  color: var(--ink-3);
}
.re-nav__lang button.active {
  color: var(--copper) !important;
  font-weight: 700;
}

.re-nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}
.re-nav__burger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  transition: all 0.3s;
}
.re-nav--solid .re-nav__burger span {
  background: var(--iron);
}

/* ══ HERO ══════════════════════════════════════════════ */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero__bg {
  position: absolute;
  inset: 0;
}
.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: slow-zoom 20s ease-in-out infinite alternate;
}
@keyframes slow-zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}
.hero__bg-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(20, 18, 16, 0.3) 0%,
    rgba(20, 18, 16, 0.15) 40%,
    rgba(20, 18, 16, 0.7) 75%,
    rgba(15, 13, 11, 0.92) 100%
  );
}
.hero__bg-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.5;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px 80px;
  width: 100%;
}
.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--copper-lt);
  margin-bottom: 24px;
}
.hero__eyebrow-line {
  display: block;
  width: 40px;
  height: 1px;
  background: var(--copper-lt);
}
.hero__title {
  margin-bottom: 24px;
  display: block;
}
.hero__title-en {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.6rem, 5.5vw, 6rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 8px;
}
.hero__title-cn {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.2rem, 2.5vw, 2.2rem);
  font-weight: 400;
  font-style: italic;
  color: var(--copper-lt);
  letter-spacing: 0.08em;
}
.hero__sub {
  max-width: 580px;
  font-size: 1rem;
  line-height: 1.85;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 36px;
}
.hero__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.hero__stats {
  display: flex;
  gap: 40px;
  padding-top: 36px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hero__stat strong {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}
.hero__stat span {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

.hero__scroll {
  position: absolute;
  bottom: 28px;
  right: 60px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.hero__scroll-wheel {
  width: 20px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  position: relative;
}
.hero__scroll-wheel::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 6px;
  background: var(--copper-lt);
  border-radius: 3px;
  animation: scroll-dot 2s ease-in-out infinite;
}
@keyframes scroll-dot {
  0%,
  100% {
    top: 5px;
    opacity: 1;
  }
  60% {
    top: 15px;
    opacity: 0;
  }
}
.hero__scroll span {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.hero__award {
  position: absolute;
  top: 110px;
  right: 60px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 14px 18px;
  border-radius: var(--r);
}
.hero__award-icon {
  font-size: 1.4rem;
}
.hero__award-title {
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  color: #fff;
}
.hero__award-sub {
  display: block;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.06em;
  margin-top: 2px;
}

/* ══ TICKER ════════════════════════════════════════════ */
.ticker {
  background: var(--iron);
  overflow: hidden;
  padding: 12px 0;
}
.ticker__track {
  display: inline-flex;
  animation: ticker-move 35s linear infinite;
  white-space: nowrap;
}
.ticker__item {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  padding: 0 28px;
}
.ticker__item em {
  color: var(--copper-lt);
  font-style: normal;
  padding-left: 4px;
}
@keyframes ticker-move {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* ══ CONCEPT ═══════════════════════════════════════════ */
.concept__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.concept__img-wrap {
  position: relative;
}
.concept__img {
  width: 100%;
  height: 560px;
  object-fit: cover;
  border-radius: var(--r);
}
.concept__img-frame {
  position: absolute;
  inset: -12px -12px auto auto;
  width: 70%;
  height: 70%;
  border: 1px solid var(--copper);
  border-radius: var(--r);
  pointer-events: none;
  z-index: -1;
}
.concept__img-caption {
  margin-top: 14px;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-3);
  text-align: right;
}
.concept__specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 28px;
}
.concept__spec {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--r);
  transition: all 0.25s;
}
.concept__spec:hover {
  border-color: var(--copper);
  box-shadow: var(--sh-sm);
}
.concept__spec strong {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--iron);
  margin-bottom: 3px;
}
.concept__spec span {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}

/* ══ GALLERY ════════════════════════════════════════════ */
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 280px);
  gap: 8px;
}
.gallery__item {
  overflow: hidden;
  border-radius: var(--r);
  position: relative;
  cursor: none;
}
.gallery__item--lg {
  grid-column: span 2;
  grid-row: span 1;
}
.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.gallery__item:hover img {
  transform: scale(1.06);
}
.gallery__item-overlay {
  position: absolute;
  inset: 0;
  background: rgba(20, 18, 16, 0);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 20px;
  gap: 8px;
  transition: background 0.3s;
}
.gallery__item:hover .gallery__item-overlay {
  background: rgba(20, 18, 16, 0.55);
}
.gallery__item-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s;
}
.gallery__item:hover .gallery__item-label {
  opacity: 1;
  transform: none;
}
.gallery__item-overlay svg {
  color: var(--copper-lt);
  opacity: 0;
  transition: opacity 0.3s 0.05s;
}
.gallery__item:hover .gallery__item-overlay svg {
  opacity: 1;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(10, 8, 6, 0.93);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}
.lightbox__img {
  max-height: 80vh;
  max-width: 80vw;
  border-radius: var(--r);
}
.lightbox__close {
  position: absolute;
  top: 20px;
  right: 24px;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;
}
.lightbox__close:hover {
  color: #fff;
}
.lightbox__prev,
.lightbox__next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.2s;
  padding: 0 20px;
}
.lightbox__prev {
  left: 0;
}
.lightbox__next {
  right: 0;
}
.lightbox__prev:hover,
.lightbox__next:hover {
  color: #fff;
}
.lightbox__caption {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.3s;
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}

/* ══ UNITS ══════════════════════════════════════════════ */
.units__tabs {
  display: flex;
  gap: 3px;
  margin-bottom: 36px;
  border-bottom: 1px solid var(--border);
}
.units__tab {
  padding: 12px 28px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--ink-3);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: all 0.2s;
}
.units__tab:hover {
  color: var(--iron);
}
.units__tab.active {
  color: var(--iron);
  border-bottom-color: var(--copper);
}
.units__tab-name {
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.08em;
}

.units__detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}
.units__floor-plan {
  position: relative;
}
.units__floor-plan img {
  width: 100%;
  height: 440px;
  object-fit: cover;
  border-radius: var(--r);
  filter: grayscale(30%);
}
.units__floor-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--iron);
  color: #fff;
  padding: 10px 14px;
  border-radius: var(--r);
  text-align: center;
}
.units__floor-badge span:first-child {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
}
.units__floor-label {
  display: block;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-top: 2px;
}
.units__info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.units__name {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--iron);
}
.units__status {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 2px;
}
.units__status--available {
  background: rgba(80, 160, 100, 0.12);
  color: #3a8a50;
}
.units__status--limited {
  background: rgba(184, 122, 94, 0.12);
  color: var(--copper);
}
.units__status--sold {
  background: rgba(44, 44, 44, 0.08);
  color: var(--iron-lt);
}
.units__price {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--copper);
  margin-bottom: 24px;
}
.units__specs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}
.units__spec-box {
  padding: 14px 12px;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: var(--r);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  transition: all 0.2s;
}
.units__spec-box:hover {
  border-color: var(--copper);
}
.units__spec-icon {
  font-size: 1rem;
}
.units__spec-box strong {
  font-family: 'Playfair Display', serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--iron);
}
.units__spec-box span {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.units__features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
}
.units__features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  color: var(--ink-2);
}
.units__feature-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--copper);
  flex-shrink: 0;
}
.units__actions {
  display: flex;
  gap: 12px;
}

/* Unit fade transition */
.unit-fade-enter-active,
.unit-fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.unit-fade-enter-from,
.unit-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

/* ══ AMENITIES ══════════════════════════════════════════ */
.amenities__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.am-card {
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  overflow: hidden;
  transition: all 0.3s;
}
.am-card:hover {
  box-shadow: var(--sh-md);
  transform: translateY(-4px);
  border-color: rgba(184, 122, 94, 0.25);
}
.am-card__img-wrap {
  height: 200px;
  overflow: hidden;
}
.am-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.am-card:hover .am-card__img-wrap img {
  transform: scale(1.06);
}
.am-card__body {
  padding: 22px;
}
.am-card__icon {
  font-size: 1.4rem;
  display: block;
  margin-bottom: 10px;
}
.am-card__title {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--iron);
  margin-bottom: 8px;
}
.am-card__desc {
  font-size: 0.83rem;
  color: var(--ink-3);
  line-height: 1.75;
}

/* ══ LOCATION ═══════════════════════════════════════════ */
.location__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.location__distances {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 28px;
}
.loc-dist {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: var(--r);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.2s;
}
.loc-dist:hover {
  border-color: rgba(184, 122, 94, 0.3);
}
.loc-dist__icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}
.loc-dist strong {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}
.loc-dist span {
  display: block;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 1px;
}

.location__map-frame {
  position: relative;
  border-radius: var(--r-lg);
  overflow: hidden;
  height: 480px;
  box-shadow: var(--sh-lg);
}
.location__map-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.location__map-pin {
  position: absolute;
  top: 40%;
  left: 52%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.location__map-pin-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--copper);
  position: relative;
}
.location__map-pin-pulse {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1.5px solid var(--copper-lt);
  opacity: 0.5;
  animation: pin-pulse 2s ease-in-out infinite;
}
@keyframes pin-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.4);
    opacity: 0;
  }
}
.location__map-pin-label {
  background: var(--iron);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 5px 10px;
  border-radius: 2px;
  white-space: nowrap;
}

/* ══ DEVELOPER ══════════════════════════════════════════ */
.developer__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}
.developer__awards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}
.dev-award {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.85rem;
  color: var(--ink-2);
}
.dev-award__year {
  font-family: 'Playfair Display', serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--copper);
  min-width: 36px;
  flex-shrink: 0;
}
.developer__stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 28px;
}
.dev-stat {
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--r);
  transition: all 0.25s;
}
.dev-stat:hover {
  border-color: var(--copper);
  box-shadow: var(--sh-sm);
}
.dev-stat__num {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--iron);
  line-height: 1;
  margin-bottom: 6px;
}
.dev-stat__label {
  display: block;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.developer__portrait-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  background: var(--mist);
  border-radius: var(--r);
}
.developer__portrait {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.developer__sig strong {
  display: block;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--iron);
  margin-bottom: 5px;
}
.developer__sig span {
  font-size: 0.78rem;
  color: var(--ink-3);
  font-style: italic;
  line-height: 1.6;
}

/* ══ CONTACT ════════════════════════════════════════════ */
.contact__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}
.contact__info {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 28px;
}
.contact__info-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: var(--r);
  border: 1px solid var(--border);
  background: #fff;
  transition: all 0.2s;
}
.contact__info-item:hover {
  border-color: rgba(184, 122, 94, 0.3);
  box-shadow: var(--sh-sm);
}
.contact__info-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--r);
  background: var(--copper-pale);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
}
.contact__info-label {
  display: block;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.contact__info-val {
  display: block;
  font-size: 0.88rem;
  color: var(--ink-2);
  margin-top: 2px;
}
.contact__form-card {
  background: #fff;
  border-radius: var(--r-lg);
  padding: 40px;
  box-shadow: var(--sh-lg);
  border: 1px solid var(--border);
}

/* ── Re-form ────────────────────────────────────────── */
.re-form__title {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--iron);
  margin-bottom: 24px;
}
.re-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.re-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.re-form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.re-form__field label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.re-form__field input,
.re-form__field select,
.re-form__field textarea {
  padding: 11px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--r);
  color: var(--ink);
  background: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition:
    border-color 0.25s,
    box-shadow 0.25s;
  width: 100%;
}
.re-form__field input:focus,
.re-form__field select:focus,
.re-form__field textarea:focus {
  border-color: var(--copper);
  box-shadow: 0 0 0 3px rgba(184, 122, 94, 0.1);
}
.re-form__field input::placeholder,
.re-form__field textarea::placeholder {
  color: var(--ink-3);
}
.re-form__field textarea {
  resize: vertical;
}
.re-form__field select {
  appearance: none;
}
.re-form__note {
  font-size: 0.7rem;
  color: var(--ink-3);
  text-align: center;
  margin-top: 4px;
}

/* Form success */
.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 20px;
  text-align: center;
}
.form-success__icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--copper-pale);
  color: var(--copper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}
.form-success strong {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--iron);
}
.form-success span {
  font-size: 0.88rem;
  color: var(--ink-3);
  line-height: 1.7;
  max-width: 280px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ══ FOOTER ══════════════════════════════════════════════ */
.re-footer {
  background: var(--iron);
}
.re-footer__top {
  display: flex;
  gap: 80px;
  padding-top: 56px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.re-footer__brand {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 14px;
}
.re-footer__logo-mark {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: #fff;
  border-radius: 2px;
  flex-shrink: 0;
}
.re-footer__logo-cn {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
}
.re-footer__logo-en {
  display: block;
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 3px;
}
.re-footer__cols {
  display: flex;
  gap: 56px;
  flex: 1;
  justify-content: flex-end;
}
.re-footer__col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.re-footer__col-heading {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 4px;
}
.re-footer__col-link {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.2s;
}
.re-footer__col-link:hover {
  color: var(--copper-lt);
}
.re-footer__bottom {
  display: flex;
  justify-content: space-between;
  padding: 20px 48px;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.22);
}

/* ══ RESPONSIVE ══════════════════════════════════════════ */
@media (max-width: 1024px) {
  .amenities__grid {
    grid-template-columns: 1fr 1fr;
  }
  .gallery__grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  .gallery__item--lg {
    grid-column: span 1;
  }
  .units__detail {
    grid-template-columns: 1fr;
  }
  .units__floor-plan img {
    height: 300px;
  }
}
@media (max-width: 860px) {
  .wrap {
    padding: 0 20px;
  }
  .section {
    padding: 72px 0;
  }
  .re-nav__inner {
    padding: 0 20px;
  }
  .re-nav__links {
    display: none;
  }
  .re-nav__links.open {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    background: #fff;
    padding: 16px 20px;
    gap: 4px;
    border-bottom: 1px solid var(--border);
    box-shadow: var(--sh-md);
  }
  .re-nav__links.open .re-nav__link-cn {
    color: var(--ink-2) !important;
  }
  .re-nav__links.open .re-nav__link-en {
    color: var(--ink-3) !important;
  }
  .re-nav__burger {
    display: flex;
  }
  .re-nav__lang {
    display: none;
  }
  .concept__inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .location__inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .developer__inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .contact__inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .amenities__grid {
    grid-template-columns: 1fr;
  }
  .gallery__grid {
    grid-template-columns: 1fr;
  }
  .hero__stats {
    flex-wrap: wrap;
    gap: 20px;
  }
  .hero__award {
    display: none;
  }
  .hero__scroll {
    display: none;
  }
  .units__specs-grid {
    grid-template-columns: 1fr 1fr;
  }
  .re-footer__top {
    flex-direction: column;
    gap: 32px;
  }
  .re-footer__cols {
    flex-wrap: wrap;
    gap: 28px;
    justify-content: flex-start;
  }
  .re-footer__bottom {
    flex-direction: column;
    gap: 6px;
    text-align: center;
    padding: 16px 20px;
  }
}
</style>
