<script setup lang="ts">
useHead({
  title: '我的作品集 — Template Gallery',
  meta: [
    {
      name: 'description',
      content: '精心打造的網站模板作品集，展示多種設計風格',
    },
    { property: 'og:title', content: '我的作品集 — Template Gallery' },
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap',
    },
  ],
});

const templates = [
  {
    id: 'dark-tech',
    title: 'Dark Tech',
    description:
      '暗黑科技未來感 ─ 適合 SaaS、AI 產品或科技公司的高端展示頁面，霓虹光暈＋粒子動畫。',
    tags: ['科技', 'SaaS', 'Dark Mode', '動畫'],
    color: '#00f5ff',
    bg: 'linear-gradient(135deg, #020408 0%, #0a1a2e 100%)',
    previewPath: '/templates/dark-tech',
    preview: {
      orbs: ['#00f5ff', '#ff006e', '#ffd60a'],
    },
  },
  // 更多模板陸續加入...
];
</script>

<template>
  <div class="gallery-root">
    <!-- Header -->
    <header class="header">
      <div class="header-inner">
        <div class="brand">
          <span class="brand-dot" />
          <span class="brand-name">Zeona Studio</span>
        </div>
        <p class="header-tagline">精選網站模板作品集</p>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg-grid" />
      <div class="hero-content">
        <span class="hero-badge">TEMPLATE GALLERY</span>
        <h1 class="hero-title">
          為您的品牌<br />
          <span class="gradient-text">找到完美的第一印象</span>
        </h1>
        <p class="hero-desc">
          每個模板都經過精心設計，專注於視覺衝擊力與使用者體驗。<br />
          選擇一個，讓您的品牌脫穎而出。
        </p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-n">{{ templates.length }}</span
            ><span class="stat-l">個模板</span>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <span class="stat-n">∞</span><span class="stat-l">可客製化</span>
          </div>
          <div class="stat-divider" />
          <div class="stat">
            <span class="stat-n">100%</span><span class="stat-l">響應式</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Templates Grid -->
    <section class="templates-section">
      <div class="section-header">
        <h2 class="section-title">所有模板</h2>
        <p class="section-sub">點擊卡片預覽完整頁面</p>
      </div>

      <div class="templates-grid">
        <NuxtLink
          v-for="tpl in templates"
          :key="tpl.id"
          :to="tpl.previewPath"
          class="template-card"
        >
          <!-- Preview Canvas -->
          <div class="card-preview" :style="{ background: tpl.bg }">
            <div class="preview-orbs">
              <div
                v-for="(c, i) in tpl.preview.orbs"
                :key="i"
                class="preview-orb"
                :style="{
                  background: c,
                  '--delay': `${i * 0.8}s`,
                  '--i': i,
                }"
              />
            </div>
            <div class="preview-grid-lines" />
            <div class="preview-badge">
              <span class="preview-dot" :style="{ background: tpl.color }" />
              即時預覽
            </div>
            <div class="preview-overlay">
              <span class="preview-cta">查看模板 →</span>
            </div>
          </div>

          <!-- Card Info -->
          <div class="card-info">
            <div class="card-top">
              <h3 class="card-title" :style="{ color: tpl.color }">
                {{ tpl.title }}
              </h3>
              <div class="card-arrow">↗</div>
            </div>
            <p class="card-desc">{{ tpl.description }}</p>
            <div class="card-tags">
              <span v-for="tag in tpl.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>

        <!-- Coming Soon Card -->
        <div class="template-card template-card--soon">
          <div class="card-preview" style="background: #0d0d0d">
            <div class="soon-text">COMING<br />SOON</div>
          </div>
          <div class="card-info">
            <div class="card-top">
              <h3 class="card-title" style="color: #444">新模板即將推出</h3>
            </div>
            <p class="card-desc">持續更新中，歡迎追蹤 GitHub 獲取最新動態。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p class="footer-copy">
        © {{ new Date().getFullYear() }} Zeona Studio · Built with Nuxt 3 ·
        Hosted on Vercel
      </p>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener"
        class="footer-gh"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
        GitHub
      </a>
    </footer>
  </div>
</template>

<style>
/* Reset & Base */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #080808;
  color: #e8e8e8;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
.gallery-root {
  min-height: 100vh;
}

/* ── Header ── */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(8, 8, 8, 0.8);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00f5ff;
  box-shadow: 0 0 12px #00f5ff;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.8);
  }
}
.brand-name {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
}
.header-tagline {
  font-size: 0.8rem;
  color: #555;
  letter-spacing: 0.05em;
}

/* ── Hero ── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 32px 80px;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    black 40%,
    transparent 100%
  );
}
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}
.hero-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.35em;
  color: #00f5ff;
  border: 1px solid rgba(0, 245, 255, 0.3);
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
  background: rgba(0, 245, 255, 0.05);
}
.hero-title {
  font-size: clamp(2.2rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1.15;
  margin-bottom: 20px;
  color: #fff;
}
.gradient-text {
  background: linear-gradient(135deg, #00f5ff 0%, #ff006e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-desc {
  font-size: 1rem;
  color: #888;
  line-height: 1.8;
  margin-bottom: 40px;
}
.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 24px 40px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  display: inline-flex;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-n {
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
}
.stat-l {
  font-size: 0.7rem;
  color: #555;
  letter-spacing: 0.1em;
}
.stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.08);
}

/* ── Templates Section ── */
.templates-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 32px 120px;
}
.section-header {
  margin-bottom: 48px;
}
.section-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
}
.section-sub {
  font-size: 0.9rem;
  color: #555;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
}

/* ── Template Card ── */
.template-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: #111;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  display: block;
}
.template-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
.template-card--soon {
  cursor: default;
  opacity: 0.5;
}
.template-card--soon:hover {
  transform: none;
}

/* Card Preview */
.card-preview {
  position: relative;
  height: 220px;
  overflow: hidden;
}
.preview-grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
}
.preview-orbs {
  position: absolute;
  inset: 0;
}
.preview-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;
  filter: blur(40px);
  width: 120px;
  height: 120px;
  animation: orb-float 4s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}
.preview-orb:nth-child(1) {
  top: -20px;
  left: 20%;
}
.preview-orb:nth-child(2) {
  bottom: -20px;
  right: 15%;
  width: 80px;
  height: 80px;
}
.preview-orb:nth-child(3) {
  top: 30%;
  left: 60%;
  width: 60px;
  height: 60px;
}
@keyframes orb-float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
}
.preview-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 100px;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
}
.preview-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.template-card:hover .preview-overlay {
  opacity: 1;
}
.preview-cta {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.05em;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 24px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Card Info */
.card-info {
  padding: 24px;
}
.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}
.card-arrow {
  font-size: 1.1rem;
  color: #444;
  transition:
    color 0.2s,
    transform 0.2s;
}
.template-card:hover .card-arrow {
  color: #fff;
  transform: translate(2px, -2px);
}
.card-desc {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 16px;
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  font-size: 0.7rem;
  padding: 4px 10px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #555;
  background: rgba(255, 255, 255, 0.03);
  letter-spacing: 0.05em;
}

/* Soon */
.soon-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.1);
  text-align: center;
  line-height: 1.3;
}

/* ── Footer ── */
.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-copy {
  font-size: 0.8rem;
  color: #444;
  letter-spacing: 0.03em;
}
.footer-gh {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #555;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-gh:hover {
  color: #fff;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .header-inner {
    padding: 14px 20px;
  }
  .header-tagline {
    display: none;
  }
  .hero {
    padding: 100px 20px 60px;
  }
  .templates-section {
    padding: 60px 20px 80px;
  }
  .templates-grid {
    grid-template-columns: 1fr;
  }
  .footer {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    padding: 24px 20px;
  }
  .hero-stats {
    padding: 16px 24px;
    gap: 20px;
  }
}
</style>
