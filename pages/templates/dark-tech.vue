<script setup lang="ts">
useHead({
  title: 'ZEONA — 未來科技解決方案',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Noto+Sans+TC:wght@300;400;700&display=swap',
    },
  ],
});

onMounted(() => {
  // ── Custom Cursor ──
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    }
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    if (cursorRing) {
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document
    .querySelectorAll(
      'a, button, .feature-card, .pricing-card, .testimonial-card',
    )
    .forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (!cursor || !cursorRing) return;
        cursor.style.width = '6px';
        cursor.style.height = '6px';
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.borderColor = 'rgba(0,245,255,0.8)';
      });
      el.addEventListener('mouseleave', () => {
        if (!cursor || !cursorRing) return;
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'rgba(0,245,255,0.5)';
      });
    });

  // ── Canvas Grid ──
  const canvas = document.getElementById(
    'grid-canvas',
  ) as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;
  let W: number,
    H: number,
    particles: Particle[] = [];

  function resize() {
    W = canvas!.width = window.innerWidth;
    H = canvas!.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  class Particle {
    x!: number;
    y!: number;
    size!: number;
    speedX!: number;
    speedY!: number;
    opacity!: number;
    color!: string;

    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.8 ? '#ff006e' : '#00f5ff';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((W * H) / 8000);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  initParticles();

  function drawGrid() {
    const size = 60;
    ctx.strokeStyle = 'rgba(0,245,255,0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.globalAlpha = 1;
      ctx.stroke();
    }
    for (let y = 0; y < H; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.globalAlpha = 1;
      ctx.stroke();
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#00f5ff';
          ctx.globalAlpha = (1 - dist / 120) * 0.15;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  // ── Feature card mouse tracking ──
  document.querySelectorAll('.feature-card').forEach((card) => {
    card.addEventListener('mousemove', (e: Event) => {
      const me = e as MouseEvent;
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = ((me.clientX - rect.left) / rect.width) * 100;
      const y = ((me.clientY - rect.top) / rect.height) * 100;
      (card as HTMLElement).style.setProperty('--mx', x + '%');
      (card as HTMLElement).style.setProperty('--my', y + '%');
    });
  });

  // ── Scroll Reveal ──
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.1 },
  );
  document
    .querySelectorAll('.reveal')
    .forEach((el) => revealObserver.observe(el));

  // ── Counter Animation ──
  function animateCounter(el: Element, target: number, suffix = '') {
    let current = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 20);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          document.querySelectorAll('[data-target]').forEach((el) => {
            const target = parseInt((el as HTMLElement).dataset.target || '0');
            const label =
              el.closest('.stat-num')?.nextElementSibling?.textContent || '';
            const suffix = label.includes('%')
              ? '%'
              : label.includes('倍')
                ? 'x'
                : '+';
            animateCounter(el, target, suffix);
          });
          statsObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 },
  );
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // ── Smooth scroll for nav ──
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(
        (a as HTMLAnchorElement).getAttribute('href')!,
      );
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Glitch Text Effect ──
  const titleLines = document.querySelectorAll(
    '.hero-title .line1, .hero-title .line2',
  );
  setInterval(() => {
    titleLines.forEach((line) => {
      const el = line as HTMLElement;
      el.style.filter = `blur(${Math.random() * 2}px)`;
      el.style.transform = `translateX(${(Math.random() - 0.5) * 3}px)`;
      setTimeout(() => {
        el.style.filter = '';
        el.style.transform = '';
      }, 80);
    });
  }, 5000);
});
</script>

<template>
  <div class="dark-tech-root">
    <!-- Custom cursor -->
    <div id="cursor" />
    <div id="cursor-ring" />

    <!-- Animated Grid Background -->
    <canvas id="grid-canvas" />

    <!-- NAV -->
    <nav>
      <a href="#hero" class="logo">ZEONA</a>
      <ul class="nav-links">
        <li><a href="#features">功能</a></li>
        <li><a href="#showcase">技術</a></li>
        <li><a href="#pricing">方案</a></li>
        <li><a href="#testimonials">客戶</a></li>
        <li><a href="#cta" class="nav-cta">立即開始</a></li>
      </ul>
    </nav>

    <!-- HERO -->
    <section id="hero">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot" />
          下一代企業解決方案 · {{ new Date().getFullYear() }}
        </div>
        <h1 class="hero-title">
          <span class="line1">重新定義</span>
          <span class="line2">數位未來</span>
        </h1>
        <p class="hero-sub">
          透過尖端 AI 技術與自動化平台，驅動您的企業超越極限。
          從資料洞察到全端整合，ZEONA 為您提供無可匹敵的競爭優勢。
        </p>
        <div class="hero-buttons">
          <a href="#cta" class="btn-primary">免費試用 14 天</a>
          <a href="#showcase" class="btn-secondary">了解技術</a>
        </div>
        <div class="hero-stats">
          <div>
            <div class="stat-num" data-target="500">0</div>
            <div class="stat-label">企業客戶 +</div>
          </div>
          <div>
            <div class="stat-num" data-target="99">0</div>
            <div class="stat-label">上線率 %</div>
          </div>
          <div>
            <div class="stat-num" data-target="10">0</div>
            <div class="stat-label">倍效能提升</div>
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE VISUAL -->
      <div class="hero-visual">
        <div class="hero-orb-wrap">
          <div class="hero-glow" />
          <svg
            class="hero-connect-svg"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="200"
              y1="200"
              x2="40"
              y2="40"
              stroke="rgba(0,245,255,0.12)"
              stroke-width="1"
              stroke-dasharray="4 4"
            />
            <line
              x1="200"
              y1="200"
              x2="360"
              y2="40"
              stroke="rgba(0,245,255,0.12)"
              stroke-width="1"
              stroke-dasharray="4 4"
            />
            <line
              x1="200"
              y1="200"
              x2="20"
              y2="200"
              stroke="rgba(0,245,255,0.1)"
              stroke-width="1"
              stroke-dasharray="4 4"
            />
            <line
              x1="200"
              y1="200"
              x2="380"
              y2="200"
              stroke="rgba(0,245,255,0.1)"
              stroke-width="1"
              stroke-dasharray="4 4"
            />
            <line
              x1="200"
              y1="200"
              x2="50"
              y2="320"
              stroke="rgba(255,0,110,0.1)"
              stroke-width="1"
              stroke-dasharray="4 4"
            />
            <line
              x1="200"
              y1="200"
              x2="350"
              y2="320"
              stroke="rgba(255,0,110,0.1)"
              stroke-width="1"
              stroke-dasharray="4 4"
            />
            <polygon
              points="200,30 350,110 350,290 200,370 50,290 50,110"
              stroke="rgba(0,245,255,0.06)"
              stroke-width="1"
              fill="none"
            />
            <circle
              cx="200"
              cy="200"
              r="175"
              stroke="rgba(0,245,255,0.05)"
              stroke-width="1"
              stroke-dasharray="20 8"
              fill="none"
            />
          </svg>
          <div class="ring ring-1" />
          <div class="ring ring-2" />
          <div class="ring ring-3" />
          <div class="ring ring-4" />
          <div class="hero-core">
            <div class="hero-core-inner" />
          </div>
          <div class="data-node n1">
            <div class="node-val">AI.ENGINE</div>
            <div class="node-bar" />
          </div>
          <div class="data-node n2">
            <div class="node-val">CLOUD.SYNC</div>
            <div
              class="node-bar"
              style="background: linear-gradient(90deg, transparent, #ff006e)"
            />
          </div>
          <div class="data-node n3">
            <div class="node-val">DATA: 99.97%</div>
            <div class="node-bar" />
          </div>
          <div class="data-node n4">
            <div class="node-val">SEC.LAYER</div>
            <div
              class="node-bar"
              style="background: linear-gradient(90deg, transparent, #ff006e)"
            />
          </div>
          <div class="data-node n5">
            <div class="node-val">NODES: 2847</div>
            <div class="node-bar" />
          </div>
          <div class="data-node n6">
            <div class="node-val">LAT: 0.3ms</div>
            <div
              class="node-bar"
              style="background: linear-gradient(90deg, transparent, #ff006e)"
            />
          </div>
          <div class="hero-scanlines" />
        </div>
      </div>

      <div class="scroll-indicator">
        <span class="scroll-text">scroll</span>
        <div class="scroll-line" />
      </div>
    </section>

    <div class="divider" />

    <!-- FEATURES -->
    <section id="features">
      <div class="section-header">
        <span class="section-tag">核心能力</span>
        <h2 class="section-title">為 <span>頂尖企業</span> 打造的工具</h2>
      </div>
      <div class="features-grid">
        <div class="feature-card reveal">
          <div class="feature-num">01</div>
          <div class="feature-icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4L4 14v20l20 10 20-10V14L24 4z"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="none"
              />
              <path
                d="M24 4v30M4 14l20 10 20-10"
                stroke="#00f5ff"
                stroke-width="1.5"
                opacity="0.5"
              />
              <circle
                cx="24"
                cy="24"
                r="5"
                fill="rgba(0,245,255,0.15)"
                stroke="#00f5ff"
                stroke-width="1.5"
              />
            </svg>
          </div>
          <h3 class="feature-title">AI 智能分析引擎</h3>
          <p class="feature-desc">
            即時處理數百萬筆資料點，提供深度洞察與可執行建議，讓決策更快、更精準。
          </p>
        </div>
        <div class="feature-card reveal" style="transition-delay: 0.1s">
          <div class="feature-num">02</div>
          <div class="feature-icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="4"
                width="18"
                height="18"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="none"
              />
              <rect
                x="26"
                y="4"
                width="18"
                height="18"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="rgba(0,245,255,0.08)"
              />
              <rect
                x="4"
                y="26"
                width="18"
                height="18"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="rgba(0,245,255,0.08)"
              />
              <rect
                x="26"
                y="26"
                width="18"
                height="18"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="none"
              />
            </svg>
          </div>
          <h3 class="feature-title">全端自動化平台</h3>
          <p class="feature-desc">
            無縫整合現有工作流程，自動化重複性任務，釋放團隊潛力專注於高價值工作。
          </p>
        </div>
        <div class="feature-card reveal" style="transition-delay: 0.2s">
          <div class="feature-num">03</div>
          <div class="feature-icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke="#00f5ff"
                stroke-width="1.5"
                stroke-dasharray="4 2"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="10"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="rgba(0,245,255,0.05)"
              />
              <circle cx="24" cy="24" r="3" fill="#00f5ff" />
              <path
                d="M24 6v6M24 36v6M6 24h6M36 24h6"
                stroke="#00f5ff"
                stroke-width="1.5"
              />
            </svg>
          </div>
          <h3 class="feature-title">零信任安全架構</h3>
          <p class="feature-desc">
            軍規等級加密保護，多層驗證機制，確保企業資產與客戶資料絕對安全。
          </p>
        </div>
        <div class="feature-card reveal" style="transition-delay: 0.3s">
          <div class="feature-num">04</div>
          <div class="feature-icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 36V20l16-12 16 12v16H8z"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="none"
              />
              <path
                d="M18 36v-10h12v10"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="rgba(0,245,255,0.08)"
              />
              <circle
                cx="24"
                cy="19"
                r="3"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="rgba(0,245,255,0.15)"
              />
            </svg>
          </div>
          <h3 class="feature-title">雲端無限擴展</h3>
          <p class="feature-desc">
            彈性雲端基礎架構，依需求自動擴縮，無論流量高峰或低谷都能保持最佳效能。
          </p>
        </div>
        <div class="feature-card reveal" style="transition-delay: 0.4s">
          <div class="feature-num">05</div>
          <div class="feature-icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 38l11-16 8 8 8-14 13 22H4z"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="rgba(0,245,255,0.05)"
              />
              <circle cx="15" cy="22" r="2" fill="#00f5ff" />
              <circle cx="23" cy="30" r="2" fill="#00f5ff" />
              <circle cx="31" cy="16" r="2" fill="#00f5ff" />
              <circle cx="44" cy="38" r="2" fill="#00f5ff" />
            </svg>
          </div>
          <h3 class="feature-title">即時監控儀表板</h3>
          <p class="feature-desc">
            視覺化所有關鍵指標，24/7 即時警報通知，讓您隨時掌握業務脈動。
          </p>
        </div>
        <div class="feature-card reveal" style="transition-delay: 0.5s">
          <div class="feature-num">06</div>
          <div class="feature-icon">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4a20 20 0 100 40A20 20 0 0024 4z"
                stroke="#00f5ff"
                stroke-width="1.5"
                fill="none"
              />
              <path
                d="M14 24h20M24 14v20"
                stroke="#00f5ff"
                stroke-width="1.5"
                opacity="0.4"
              />
              <path
                d="M10 14c4 2 7 5.5 7 10s-3 8-7 10M38 14c-4 2-7 5.5-7 10s3 8 7 10"
                stroke="#00f5ff"
                stroke-width="1.5"
                opacity="0.6"
              />
            </svg>
          </div>
          <h3 class="feature-title">全球 API 整合</h3>
          <p class="feature-desc">
            200+ 預建整合連接器，REST / GraphQL API
            支援，輕鬆串接您的現有生態系統。
          </p>
        </div>
      </div>
    </section>

    <div class="divider" />

    <!-- SHOWCASE -->
    <section id="showcase">
      <div class="showcase-visual reveal">
        <img
          class="showcase-img"
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=800&q=75"
          alt="technology circuit board"
        />
        <div class="showcase-border" />
        <div class="showcase-corner tl" />
        <div class="showcase-corner tr" />
        <div class="showcase-corner bl" />
        <div class="showcase-corner br" />
        <div class="scan-line" />
        <div class="hud-overlay">
          SYS.STATUS: ONLINE<br />
          NODE.ACTIVE: 2,847<br />
          LATENCY: 0.3ms<br />
          UPTIME: 99.97%
        </div>
      </div>
      <div class="showcase-text reveal" style="transition-delay: 0.2s">
        <span class="section-tag" style="text-align: left; margin-bottom: 16px"
          >技術優勢</span
        >
        <h2>以 <em>毫秒</em> 為單位<br />重新定義效能標準</h2>
        <p>
          ZEONA 採用最先進的分散式運算架構，結合邊緣運算技術，在全球 40+
          數據中心部署，確保您的使用者無論身在何處都能獲得極速體驗。
        </p>
        <p>
          我們的系統每秒可處理超過 100 萬筆事務，並以 99.97% 的 SLA
          保障業務不中斷。
        </p>
        <ul class="showcase-list">
          <li>分散式微服務架構，零單點故障</li>
          <li>智能負載平衡，自動容錯切換</li>
          <li>端對端 AES-256 加密傳輸</li>
          <li>即時資料同步，多區域備份</li>
          <li>GDPR / HIPAA 合規認證</li>
        </ul>
        <a
          href="#cta"
          class="btn-primary"
          style="display: inline-block; text-align: center"
          >探索完整技術文件</a
        >
      </div>
    </section>

    <div class="divider" />

    <!-- PRICING -->
    <section id="pricing">
      <div class="section-header">
        <span class="section-tag">定價方案</span>
        <h2 class="section-title">選擇適合您的<span>成長計劃</span></h2>
      </div>
      <div class="pricing-grid">
        <div class="pricing-card reveal">
          <div class="pricing-plan">Starter</div>
          <div class="pricing-price"><sup>$</sup>999</div>
          <div class="pricing-period">/ 每月 · 最多 3 位用戶</div>
          <div class="pricing-divider" />
          <ul class="pricing-features">
            <li><span class="check">◆</span> AI 分析報告（每月 50 份）</li>
            <li><span class="check">◆</span> 基礎自動化工作流程</li>
            <li><span class="check">◆</span> 5 個 API 整合</li>
            <li><span class="check">◆</span> 電子郵件支援</li>
            <li>
              <span class="cross">✕</span>
              <span style="opacity: 0.3">進階安全功能</span>
            </li>
            <li>
              <span class="cross">✕</span>
              <span style="opacity: 0.3">專屬客戶成功經理</span>
            </li>
          </ul>
          <a href="#cta" class="btn-plan btn-plan-outline">開始使用</a>
        </div>
        <div
          class="pricing-card featured reveal"
          style="transition-delay: 0.1s"
        >
          <div class="pricing-badge">最受歡迎</div>
          <div class="pricing-plan">Professional</div>
          <div class="pricing-price"><sup>$</sup>3,999</div>
          <div class="pricing-period">/ 每月 · 最多 20 位用戶</div>
          <div class="pricing-divider" />
          <ul class="pricing-features">
            <li><span class="check">◆</span> 無限 AI 分析報告</li>
            <li><span class="check">◆</span> 進階自動化流程（無限制）</li>
            <li><span class="check">◆</span> 50+ API 整合</li>
            <li><span class="check">◆</span> 零信任安全架構</li>
            <li><span class="check">◆</span> 優先技術支援 24/7</li>
            <li>
              <span class="cross">✕</span>
              <span style="opacity: 0.3">專屬客戶成功經理</span>
            </li>
          </ul>
          <a href="#cta" class="btn-plan btn-plan-filled">立即升級</a>
        </div>
        <div class="pricing-card reveal" style="transition-delay: 0.2s">
          <div class="pricing-plan">Enterprise</div>
          <div
            class="pricing-price"
            style="font-size: 2rem; padding-top: 0.4rem"
          >
            客製化
          </div>
          <div class="pricing-period">/ 無限用戶 · 專屬部署</div>
          <div class="pricing-divider" />
          <ul class="pricing-features">
            <li><span class="check">◆</span> 全功能無限存取</li>
            <li><span class="check">◆</span> 私有雲 / 地端部署</li>
            <li><span class="check">◆</span> 客製化 AI 模型訓練</li>
            <li><span class="check">◆</span> 專屬客戶成功經理</li>
            <li><span class="check">◆</span> SLA 99.99% 保障</li>
            <li><span class="check">◆</span> 合規顧問服務</li>
          </ul>
          <a href="#cta" class="btn-plan btn-plan-outline">聯繫銷售團隊</a>
        </div>
      </div>
    </section>

    <div class="divider" />

    <!-- TESTIMONIALS -->
    <section id="testimonials">
      <div class="section-header">
        <span class="section-tag">客戶見證</span>
        <h2 class="section-title">頂尖企業的<span>一致選擇</span></h2>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card reveal">
          <div class="stars">★★★★★</div>
          <p class="testimonial-text">
            「導入 ZEONA 後，我們的資料分析效率提升了 8
            倍，決策速度大幅加快。這是我們近年來最值得的科技投資。」
          </p>
          <div class="testimonial-author">
            <img
              class="author-avatar"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="客戶頭像"
            />
            <div>
              <div class="author-name">陳建宏</div>
              <div class="author-role">CTO · 台灣科技股份有限公司</div>
            </div>
          </div>
        </div>
        <div class="testimonial-card reveal" style="transition-delay: 0.15s">
          <div class="stars">★★★★★</div>
          <p class="testimonial-text">
            「ZEONA 的自動化平台幫助我們節省了 60%
            的人力成本，同時錯誤率降低至接近於零。團隊現在可以專注在真正重要的工作上。」
          </p>
          <div class="testimonial-author">
            <img
              class="author-avatar"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
              alt="客戶頭像"
            />
            <div>
              <div class="author-name">林雅婷</div>
              <div class="author-role">營運長 · 新創科技集團</div>
            </div>
          </div>
        </div>
        <div class="testimonial-card reveal" style="transition-delay: 0.3s">
          <div class="stars">★★★★★</div>
          <p class="testimonial-text">
            「安全性是我們最在意的，ZEONA
            的零信任架構讓我們徹底放心。客服團隊的專業度也超出預期，真正的企業級夥伴。」
          </p>
          <div class="testimonial-author">
            <img
              class="author-avatar"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="客戶頭像"
            />
            <div>
              <div class="author-name">王志遠</div>
              <div class="author-role">資安長 · 金融科技有限公司</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider" />

    <!-- CTA -->
    <section id="cta">
      <div class="cta-glow" />
      <div class="cta-content reveal">
        <span class="cta-tag">立即行動</span>
        <h2 class="cta-title">準備好<span>起飛</span>了嗎？</h2>
        <p class="cta-sub">
          加入 500+ 家領先企業的行列，體驗 ZEONA 帶來的革命性轉變。前 14
          天免費，無需信用卡。
        </p>
        <div class="cta-form">
          <input
            class="cta-input"
            type="email"
            placeholder="輸入您的企業信箱"
          />
          <button class="cta-btn">免費開始</button>
        </div>
        <p
          style="margin-top: 16px; font-size: 0.75rem; color: var(--text-muted)"
        >
          ✓ 免費 14 天試用 &nbsp;·&nbsp; ✓ 無需信用卡 &nbsp;·&nbsp; ✓ 隨時取消
        </p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer>
      <div class="footer-logo">ZEONA</div>
      <div class="footer-links">
        <a href="#">隱私政策</a>
        <a href="#">服務條款</a>
        <a href="#">技術文件</a>
        <a href="#">聯絡我們</a>
      </div>
      <div class="footer-copy">
        © {{ new Date().getFullYear() }} ZEONA Corp. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style>
/* ── Dark Tech 全域樣式 (只在此頁生效的基底) ── */
.dark-tech-root {
  --neon-cyan: #00f5ff;
  --neon-magenta: #ff006e;
  --neon-gold: #ffd60a;
  --dark-bg: #020408;
  --dark-card: #070d14;
  --dark-border: #0a1a2e;
  --text-primary: #e8f4ff;
  --text-muted: #5a7a99;

  background: var(--dark-bg);
  color: var(--text-primary);
  font-family: 'Noto Sans TC', sans-serif;
  overflow-x: hidden;
  cursor: none;
  min-height: 100vh;
}

.dark-tech-root::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
  opacity: 0.3;
}

/* Custom Cursor */
#cursor {
  position: fixed;
  width: 12px;
  height: 12px;
  background: var(--neon-cyan);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition:
    transform 0.1s,
    width 0.2s,
    height 0.2s,
    opacity 0.2s;
  mix-blend-mode: screen;
}
#cursor-ring {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 245, 255, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition:
    transform 0.15s ease-out,
    width 0.3s,
    height 0.3s;
}

/* Canvas */
#grid-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.4;
}

/* NAV */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(2, 4, 8, 0.95) 0%,
    transparent 100%
  );
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 245, 255, 0.05);
}
.logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: var(--neon-cyan);
  text-shadow:
    0 0 20px rgba(0, 245, 255, 0.6),
    0 0 40px rgba(0, 245, 255, 0.3);
  position: relative;
}
.logo::after {
  content: 'ZEONA';
  position: absolute;
  left: 2px;
  top: 2px;
  color: var(--neon-magenta);
  opacity: 0.3;
  filter: blur(1px);
  animation: glitch-logo 4s infinite;
}
@keyframes glitch-logo {
  0%,
  95% {
    clip-path: none;
    transform: none;
  }
  96% {
    clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
    transform: translate(-3px, 0);
  }
  97% {
    clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
    transform: translate(3px, 0);
  }
  98% {
    clip-path: none;
    transform: none;
  }
}
.nav-links {
  display: flex;
  gap: 40px;
  list-style: none;
}
.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: color 0.3s;
  position: relative;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--neon-cyan);
  transition: width 0.3s;
  box-shadow: 0 0 8px var(--neon-cyan);
}
.nav-links a:hover {
  color: var(--neon-cyan);
}
.nav-links a:hover::after {
  width: 100%;
}
.nav-cta {
  border: 1px solid var(--neon-cyan);
  padding: 10px 24px;
  color: var(--neon-cyan) !important;
  font-family: 'Orbitron', monospace;
  font-size: 0.75rem !important;
  letter-spacing: 0.2em !important;
  transition: all 0.3s !important;
  background: transparent;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}
.nav-cta:hover {
  background: var(--neon-cyan) !important;
  color: var(--dark-bg) !important;
  box-shadow: 0 0 30px rgba(0, 245, 255, 0.4);
}

section {
  position: relative;
  z-index: 2;
}

/* HERO */
#hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 100px 60px 60px;
  position: relative;
  overflow: hidden;
  gap: 40px;
}
.hero-content {
  position: relative;
  z-index: 3;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  border: 1px solid rgba(0, 245, 255, 0.15);
  padding: 8px 16px;
  margin-bottom: 32px;
  background: rgba(0, 245, 255, 0.03);
  animation: fadeInUp 0.8s ease both;
}
.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--neon-cyan);
  box-shadow: 0 0 8px var(--neon-cyan);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.hero-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 24px;
  animation: fadeInUp 0.8s ease 0.2s both;
}
.hero-title .line1 {
  display: block;
  color: var(--text-primary);
}
.hero-title .line2 {
  display: block;
  background: linear-gradient(
    135deg,
    var(--neon-cyan) 0%,
    var(--neon-magenta) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.9;
  max-width: 480px;
  margin-bottom: 40px;
  animation: fadeInUp 0.8s ease 0.4s both;
}
.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease 0.5s both;
}
.btn-primary {
  padding: 16px 40px;
  background: linear-gradient(135deg, var(--neon-cyan), #0099bb);
  color: var(--dark-bg);
  font-family: 'Orbitron', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-decoration: none;
  text-transform: uppercase;
  clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.btn-primary::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 40%;
  height: 200%;
  background: rgba(255, 255, 255, 0.3);
  transform: skewX(-25deg);
  transition: left 0.5s;
}
.btn-primary:hover::before {
  left: 130%;
}
.btn-primary:hover {
  box-shadow:
    0 0 40px rgba(0, 245, 255, 0.5),
    0 0 80px rgba(0, 245, 255, 0.2);
  transform: translateY(-2px);
}
.btn-secondary {
  padding: 16px 40px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
  font-family: 'Orbitron', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-decoration: none;
  text-transform: uppercase;
  clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.02);
}
.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  gap: 50px;
  margin-top: 70px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  animation: fadeInUp 0.8s ease 0.6s both;
}
.stat-num {
  font-family: 'Orbitron', monospace;
  font-size: 2rem;
  font-weight: 900;
  color: var(--neon-cyan);
  text-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
  line-height: 1;
}
.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  margin-top: 6px;
  text-transform: uppercase;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 520px;
}
.hero-orb-wrap {
  position: relative;
  width: 400px;
  height: 400px;
}
.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 245, 255, 0.08) 0%,
    transparent 70%
  );
  animation: glow-pulse 3s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.15);
    opacity: 1;
  }
}
.hero-connect-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ring-1 {
  width: 360px;
  height: 360px;
  border-color: rgba(0, 245, 255, 0.15);
  animation: spin-cw 20s linear infinite;
}
.ring-2 {
  width: 280px;
  height: 280px;
  border-color: rgba(255, 0, 110, 0.12);
  border-style: dashed;
  animation: spin-ccw 14s linear infinite;
}
.ring-3 {
  width: 200px;
  height: 200px;
  border-color: rgba(0, 245, 255, 0.25);
  animation: spin-cw 9s linear infinite;
}
.ring-4 {
  width: 130px;
  height: 130px;
  border-color: rgba(255, 0, 110, 0.3);
  animation: spin-ccw 6s linear infinite;
}
.ring::before,
.ring::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--neon-cyan);
  box-shadow:
    0 0 10px var(--neon-cyan),
    0 0 20px rgba(0, 245, 255, 0.5);
  top: -3px;
  left: 50%;
}
.ring::after {
  background: var(--neon-magenta);
  box-shadow: 0 0 10px var(--neon-magenta);
  top: auto;
  bottom: -3px;
}
@keyframes spin-cw {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes spin-ccw {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

.hero-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 245, 255, 0.3) 0%,
    rgba(0, 245, 255, 0.05) 60%,
    transparent 100%
  );
  border: 1px solid rgba(0, 245, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-core-inner {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--neon-cyan);
  box-shadow:
    0 0 20px var(--neon-cyan),
    0 0 40px rgba(0, 245, 255, 0.5);
  animation: core-pulse 2s ease-in-out infinite;
}
@keyframes core-pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow:
      0 0 20px var(--neon-cyan),
      0 0 40px rgba(0, 245, 255, 0.5);
  }
  50% {
    transform: scale(0.85);
    box-shadow:
      0 0 30px var(--neon-cyan),
      0 0 60px rgba(0, 245, 255, 0.3);
  }
}

/* Data nodes */
.data-node {
  position: absolute;
  background: rgba(7, 13, 20, 0.9);
  border: 1px solid rgba(0, 245, 255, 0.2);
  padding: 6px 10px;
  font-family: 'Orbitron', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  color: var(--neon-cyan);
  white-space: nowrap;
}
.node-val {
  margin-bottom: 4px;
}
.node-bar {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--neon-cyan));
  width: 60px;
  animation: bar-fill 2s ease-in-out infinite;
}
@keyframes bar-fill {
  0%,
  100% {
    opacity: 0.4;
    transform: scaleX(0.6);
    transform-origin: left;
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}
.n1 {
  top: 5%;
  left: -10%;
  animation: float-node 5s ease-in-out infinite;
}
.n2 {
  top: 20%;
  right: -12%;
  animation: float-node 6s ease-in-out infinite 1s;
}
.n3 {
  bottom: 30%;
  left: -15%;
  animation: float-node 7s ease-in-out infinite 0.5s;
}
.n4 {
  bottom: 10%;
  right: -10%;
  animation: float-node 5.5s ease-in-out infinite 1.5s;
}
.n5 {
  top: 45%;
  left: -20%;
  animation: float-node 6.5s ease-in-out infinite 0.8s;
}
.n6 {
  top: 70%;
  right: -15%;
  animation: float-node 4.5s ease-in-out infinite 2s;
}
@keyframes float-node {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.hero-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  border-radius: 50%;
  pointer-events: none;
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: fadeIn 1s ease 1s both;
}
.scroll-line {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, var(--neon-cyan), transparent);
  animation: scroll-pulse 2s infinite;
}
@keyframes scroll-pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scaleY(1);
  }
  50% {
    opacity: 1;
    transform: scaleY(1.1);
  }
}
.scroll-text {
  font-size: 0.65rem;
  color: var(--text-muted);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
}

/* FEATURES */
#features {
  padding: 120px 60px;
  background: linear-gradient(
    to bottom,
    var(--dark-bg),
    #040810,
    var(--dark-bg)
  );
}
.section-header {
  text-align: center;
  margin-bottom: 80px;
}
.section-tag {
  font-family: 'Orbitron', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  color: var(--neon-magenta);
  text-transform: uppercase;
  margin-bottom: 16px;
  display: block;
  text-shadow: 0 0 15px rgba(255, 0, 110, 0.5);
}
.section-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}
.section-title span {
  color: var(--neon-cyan);
  text-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  max-width: 1200px;
  margin: 0 auto;
}
.feature-card {
  background: var(--dark-card);
  padding: 50px 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s;
  border: 1px solid var(--dark-border);
}
.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--neon-cyan),
    transparent
  );
  transform: scaleX(0);
  transition: transform 0.4s;
}
.feature-card:hover::before {
  transform: scaleX(1);
}
.feature-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    rgba(0, 245, 255, 0.05) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.4s;
}
.feature-card:hover::after {
  opacity: 1;
}
.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 245, 255, 0.15);
}

.feature-icon {
  width: 56px;
  height: 56px;
  margin-bottom: 28px;
  position: relative;
}
.feature-icon svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px var(--neon-cyan));
}
.feature-num {
  position: absolute;
  top: 30px;
  right: 30px;
  font-family: 'Orbitron', monospace;
  font-size: 3rem;
  font-weight: 900;
  color: rgba(0, 245, 255, 0.04);
  line-height: 1;
}
.feature-title {
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  letter-spacing: 0.05em;
}
.feature-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.8;
}

/* SHOWCASE */
#showcase {
  padding: 120px 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
}
.showcase-visual {
  position: relative;
  height: 500px;
  overflow: hidden;
}
.showcase-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
  transition: opacity 0.5s;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 30px),
    calc(100% - 30px) 100%,
    0 100%
  );
}
.showcase-visual:hover .showcase-img {
  opacity: 0.8;
}
.showcase-border {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(0, 245, 255, 0.15);
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 30px),
    calc(100% - 30px) 100%,
    0 100%
  );
}
.showcase-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: var(--neon-cyan);
  border-style: solid;
  box-shadow: 0 0 10px var(--neon-cyan);
}
.showcase-corner.tl {
  top: 8px;
  left: 8px;
  border-width: 2px 0 0 2px;
}
.showcase-corner.tr {
  top: 8px;
  right: 8px;
  border-width: 2px 2px 0 0;
}
.showcase-corner.bl {
  bottom: 8px;
  left: 8px;
  border-width: 0 0 2px 2px;
}
.showcase-corner.br {
  bottom: 38px;
  right: 8px;
  border-width: 0 2px 2px 0;
}
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--neon-cyan),
    transparent
  );
  animation: scan 4s linear infinite;
  opacity: 0.5;
}
@keyframes scan {
  0% {
    top: -5%;
  }
  100% {
    top: 105%;
  }
}
.hud-overlay {
  position: absolute;
  bottom: 40px;
  left: 40px;
  font-family: 'Orbitron', monospace;
  font-size: 0.6rem;
  color: var(--neon-cyan);
  opacity: 0.7;
  line-height: 1.8;
  letter-spacing: 0.1em;
}
.showcase-text h2 {
  font-family: 'Orbitron', monospace;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
}
.showcase-text h2 em {
  font-style: normal;
  color: var(--neon-cyan);
  text-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
}
.showcase-text p {
  color: var(--text-muted);
  line-height: 1.9;
  font-size: 0.95rem;
  margin-bottom: 16px;
}
.showcase-list {
  list-style: none;
  margin: 30px 0 40px;
}
.showcase-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-muted);
  font-size: 0.9rem;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.showcase-list li::before {
  content: '◆';
  color: var(--neon-cyan);
  font-size: 0.5rem;
  text-shadow: 0 0 8px var(--neon-cyan);
  flex-shrink: 0;
}

/* PRICING */
#pricing {
  padding: 120px 60px;
  background: linear-gradient(
    to bottom,
    var(--dark-bg),
    #030709,
    var(--dark-bg)
  );
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  max-width: 1100px;
  margin: 0 auto;
}
.pricing-card {
  background: var(--dark-card);
  padding: 50px 40px;
  border: 1px solid var(--dark-border);
  position: relative;
  overflow: hidden;
  transition: all 0.4s;
}
.pricing-card.featured {
  border-color: rgba(0, 245, 255, 0.3);
  background: linear-gradient(160deg, #0a1f30, #070d14);
  transform: scale(1.02);
  z-index: 2;
}
.pricing-card.featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--neon-magenta), var(--neon-cyan));
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
}
.pricing-badge {
  display: inline-block;
  font-family: 'Orbitron', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--dark-bg);
  background: var(--neon-cyan);
  padding: 4px 12px;
  margin-bottom: 24px;
  text-transform: uppercase;
}
.pricing-plan {
  font-family: 'Orbitron', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 16px;
}
.pricing-price {
  font-family: 'Orbitron', monospace;
  font-size: 3rem;
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 8px;
}
.pricing-price sup {
  font-size: 1.2rem;
  color: var(--text-muted);
  vertical-align: top;
  margin-top: 10px;
  display: inline-block;
}
.pricing-period {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 30px;
}
.pricing-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 24px 0;
}
.pricing-features {
  list-style: none;
  margin-bottom: 40px;
}
.pricing-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  color: var(--text-muted);
  padding: 8px 0;
}
.pricing-features li .check {
  color: var(--neon-cyan);
  font-size: 0.7rem;
  text-shadow: 0 0 8px var(--neon-cyan);
}
.pricing-features li .cross {
  color: #2a3a4a;
}
.btn-plan {
  display: block;
  text-align: center;
  padding: 14px;
  font-family: 'Orbitron', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}
.btn-plan-outline {
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  background: transparent;
}
.btn-plan-outline:hover {
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
  background: rgba(0, 245, 255, 0.03);
}
.btn-plan-filled {
  background: linear-gradient(135deg, var(--neon-cyan), #0099bb);
  color: var(--dark-bg);
  font-weight: 700;
}
.btn-plan-filled:hover {
  box-shadow: 0 0 30px rgba(0, 245, 255, 0.4);
  transform: translateY(-2px);
}

/* TESTIMONIALS */
#testimonials {
  padding: 120px 60px;
}
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.testimonial-card {
  background: var(--dark-card);
  border: 1px solid var(--dark-border);
  padding: 40px;
  position: relative;
  transition: all 0.4s;
  overflow: hidden;
}
.testimonial-card:hover {
  border-color: rgba(0, 245, 255, 0.1);
  transform: translateY(-4px);
}
.testimonial-card::before {
  content: '"';
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 6rem;
  font-family: Georgia, serif;
  color: rgba(0, 245, 255, 0.06);
  line-height: 1;
}
.stars {
  color: var(--neon-gold);
  font-size: 0.8rem;
  letter-spacing: 3px;
  margin-bottom: 16px;
  text-shadow: 0 0 8px rgba(255, 214, 10, 0.5);
}
.testimonial-text {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 24px;
}
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.author-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(0, 245, 255, 0.2);
  object-fit: cover;
  filter: grayscale(30%);
}
.author-name {
  font-weight: 700;
  font-size: 0.88rem;
  color: var(--text-primary);
}
.author-role {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 2px;
}

/* CTA */
#cta {
  padding: 120px 60px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
#cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    rgba(0, 245, 255, 0.04) 0%,
    transparent 70%
  );
}
.cta-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(0, 245, 255, 0.06) 0%,
    transparent 70%
  );
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: cta-pulse 4s ease-in-out infinite;
}
@keyframes cta-pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
}
.cta-content {
  position: relative;
  z-index: 2;
}
.cta-tag {
  font-family: 'Orbitron', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  color: var(--neon-magenta);
  text-transform: uppercase;
  margin-bottom: 20px;
  display: block;
}
.cta-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--text-primary);
}
.cta-title span {
  background: linear-gradient(
    135deg,
    var(--neon-cyan) 0%,
    var(--neon-magenta) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.cta-sub {
  color: var(--text-muted);
  font-size: 1rem;
  max-width: 500px;
  margin: 0 auto 50px;
  line-height: 1.7;
}
.cta-form {
  display: flex;
  gap: 0;
  max-width: 480px;
  margin: 0 auto;
}
.cta-input {
  flex: 1;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: 'Noto Sans TC', sans-serif;
  outline: none;
  transition: border-color 0.3s;
  clip-path: polygon(8px 0%, 100% 0%, 100% 100%, 0% 100%);
}
.cta-input:focus {
  border-color: rgba(0, 245, 255, 0.4);
}
.cta-input::placeholder {
  color: var(--text-muted);
}
.cta-btn {
  padding: 16px 32px;
  background: var(--neon-cyan);
  border: none;
  color: var(--dark-bg);
  font-family: 'Orbitron', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  clip-path: polygon(0 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  white-space: nowrap;
}
.cta-btn:hover {
  background: #fff;
  box-shadow: 0 0 30px rgba(0, 245, 255, 0.5);
}

/* FOOTER */
footer {
  padding: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}
.footer-logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--neon-cyan);
  letter-spacing: 0.2em;
  text-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
}
.footer-links {
  display: flex;
  gap: 30px;
}
.footer-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.3s;
  letter-spacing: 0.1em;
}
.footer-links a:hover {
  color: var(--neon-cyan);
}
.footer-copy {
  color: var(--text-muted);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Divider */
.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 245, 255, 0.15),
    rgba(255, 0, 110, 0.15),
    transparent
  );
  position: relative;
  z-index: 2;
}

/* Responsive */
@media (max-width: 900px) {
  nav {
    padding: 20px 24px;
  }
  .nav-links {
    display: none;
  }
  #hero {
    padding: 100px 24px 60px;
    grid-template-columns: 1fr;
  }
  .hero-visual {
    height: 300px;
  }
  .hero-orb-wrap {
    width: 260px;
    height: 260px;
  }
  .ring-1 {
    width: 240px;
    height: 240px;
  }
  .ring-2 {
    width: 185px;
    height: 185px;
  }
  .ring-3 {
    width: 130px;
    height: 130px;
  }
  .ring-4 {
    width: 85px;
    height: 85px;
  }
  .hero-stats {
    gap: 30px;
  }
  #features,
  #pricing,
  #testimonials,
  #showcase,
  #cta {
    padding: 80px 24px;
  }
  .features-grid,
  .pricing-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 2px;
  }
  #showcase {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .showcase-visual {
    height: 300px;
  }
  .pricing-card.featured {
    transform: none;
  }
  footer {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
</style>
