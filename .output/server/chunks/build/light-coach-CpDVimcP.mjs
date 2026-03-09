import { ref, computed, reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = {
  __name: "light-coach",
  __ssrInlineRender: true,
  setup(__props) {
    const mx = ref(0), my = ref(0);
    const rx = ref(0), ry = ref(0);
    const dotStyle = computed(() => ({ left: `${mx.value}px`, top: `${my.value}px` }));
    const ringStyle = computed(() => ({ left: `${rx.value}px`, top: `${ry.value}px` }));
    const navSolid = ref(false);
    const menuOpen = ref(false);
    const loading = ref(false);
    const sent = ref(false);
    const fm = reactive({ first: "", last: "", email: "", company: "", focus: "", note: "" });
    const showBanner = ref(true);
    const openFaq = ref(null);
    const navItems = [
      { id: "about", label: "About" },
      { id: "programs", label: "Programs" },
      { id: "process", label: "Method" },
      { id: "results", label: "Results" },
      { id: "team", label: "Team" }
    ];
    const heroProof = [
      { num: "500+", label: "Leaders Coached" },
      { num: "94%", label: "Client Promotion Rate" },
      { num: "$2.1B", label: "Value Created" }
    ];
    const alumBrands = ["Goldman Sachs", "McKinsey", "Amazon", "Google", "Salesforce"];
    const tickerContent = [
      "Executive Coaching",
      "Leadership Acceleration",
      "Board Readiness",
      "Team Transformation",
      "Strategic Clarity",
      "High-Impact Communication",
      "Succession Planning",
      "Culture Architecture",
      "Startup Leadership",
      "Executive Coaching",
      "Leadership Acceleration",
      "Board Readiness"
    ];
    const differentiators = [
      { icon: "\u{1F3AF}", title: "Results in 90 Days", body: "Every engagement has defined KPIs. Measurable impact or your investment back." },
      { icon: "\u{1F9E0}", title: "Science-Backed Method", body: "Grounded in behavioral research and evidence-based leadership frameworks." },
      { icon: "\u{1F91D}", title: "Real Operator Experience", body: "Our coaches have held P&L responsibility, managed global teams, and led through crisis." }
    ];
    const programs = [
      {
        icon: "\u{1F331}",
        title: "Executive 1:1 Coaching",
        desc: "Deep-dive personal coaching for senior leaders facing complex transitions, performance ceilings, or rapid growth.",
        features: [
          "Weekly 60-min coaching sessions",
          "Unlimited async messaging",
          "360\xB0 stakeholder interviews",
          "Custom leadership growth roadmap",
          "90-day milestone reviews"
        ],
        duration: "3 or 6 months",
        price: "From $4,500 / mo",
        featured: false
      },
      {
        icon: "\u{1F680}",
        title: "Leadership Accelerator",
        desc: "A high-intensity 6-month cohort for high-potential VPs ready to step into the C-suite within 18 months.",
        features: [
          "Bi-weekly group workshops",
          "4 private coaching sessions/month",
          "Peer CEO mastermind access",
          "Board presentation simulations",
          "Alumni network (lifetime access)"
        ],
        duration: "6-month cohort",
        price: "From $2,800 / mo",
        featured: true
      },
      {
        icon: "\u{1F3E2}",
        title: "Corporate Programs",
        desc: "Custom workshops, manager academies, and culture engagements for organizations ready to build at scale.",
        features: [
          "Fully bespoke curriculum",
          "On-site & virtual delivery",
          "Org-level diagnostic included",
          "Manager coaching toolkit",
          "ROI reporting dashboard"
        ],
        duration: "Flexible",
        price: "Custom quote",
        featured: false
      }
    ];
    const processSteps = [
      { icon: "\u{1F50D}", title: "Discovery Call", body: "A focused 30-min conversation to understand your world, challenges, and ambitions." },
      { icon: "\u{1F4CA}", title: "Leadership Audit", body: "360\xB0 assessment of strengths, blindspots, and the one lever that will change everything." },
      { icon: "\u{1F5FA}\uFE0F", title: "Precision Roadmap", body: "A 90-day action plan with clear milestones, built around your specific situation." },
      { icon: "\u26A1", title: "Weekly Execution", body: "Intensive sessions plus real-time support between meetings to keep momentum high." },
      { icon: "\u{1F4C8}", title: "Measure & Compound", body: "Track hard metrics, lock in behavioral changes, and plan your next breakthrough." }
    ];
    const metricsList = [
      { display: "500+", target: 500, suffix: "+", label: "Leaders Coached", delay: 0 },
      { display: "94%", target: 94, suffix: "%", label: "Promotion Rate", delay: 0.08 },
      { display: "4.97", target: 497, suffix: "", label: "Avg. Rating (out of 5)", delay: 0.16 },
      { display: "18+", target: 18, suffix: "+", label: "Years of Excellence", delay: 0.24 }
    ];
    const testimonials = [
      {
        quote: `"Fort\xE9 didn't just improve my leadership\u2014they fundamentally changed how I think. Six months in, I was promoted to Chief Revenue Officer and our pipeline tripled."`,
        outcome: "+$43M",
        outcomeLbl: "Pipeline Impact",
        name: "Sarah Chen",
        role: "CRO, TechScale Inc.",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&auto=format"
      },
      {
        quote: `"The Accelerator gave me frameworks I use every single day. My team's engagement jumped 44 points and our velocity doubled. Best investment of my career."`,
        outcome: "+44pts",
        outcomeLbl: "Team Engagement",
        name: "Marcus Williams",
        role: "VP Engineering, Nexus AI",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format"
      },
      {
        quote: `"I was skeptical of executive coaching. Three months in, I'd restructured my org, landed two key partnerships, and finally had real clarity on my next five years."`,
        outcome: "2\xD7 faster",
        outcomeLbl: "Decision Velocity",
        name: "Jennifer Park",
        role: "CEO, Luminary Health",
        photo: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=80&h=80&fit=crop&crop=face&auto=format"
      }
    ];
    const coaches = [
      {
        name: "Dr. James Hartley",
        title: "Founder & Head Coach",
        bio: "Former McKinsey partner and HBS faculty. 20+ years coaching C-suite leaders across 6 continents.",
        tags: ["C-Suite", "Strategy", "Culture"],
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80&auto=format&fit=crop&crop=face"
      },
      {
        name: "Lisa Morgan",
        title: "Senior Executive Coach",
        bio: "Ex-SVP at Goldman Sachs. Specialist in board presence, high-stakes communication, and leadership transitions.",
        tags: ["Finance", "Presence", "Transitions"],
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80&auto=format&fit=crop&crop=face"
      },
      {
        name: "Dr. Raj Patel",
        title: "Organizational Psychologist",
        bio: "PhD Behavioral Science, Wharton. Leads our assessment methodology and team dynamics practice.",
        tags: ["Psychology", "Teams", "Data"],
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80&auto=format&fit=crop&crop=face"
      },
      {
        name: "Amanda Torres",
        title: "Peak Performance Coach",
        bio: "Former Olympic athlete. Works with leaders on resilience, energy management, and high-performance habits.",
        tags: ["Performance", "Resilience", "Habits"],
        photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&q=80&auto=format&fit=crop&crop=face"
      }
    ];
    const faqs = [
      {
        q: "How is coaching different from therapy or mentoring?",
        a: "Coaching is future-focused and performance-driven. Mentoring shares experience; coaching builds capability. Therapy addresses clinical issues; coaching maximizes leadership potential in a professional context. We work on strategy, behavior, and results \u2014 not personal history."
      },
      {
        q: "How quickly will I see results?",
        a: "Most clients report meaningful shifts within the first 30 days \u2014 sharper thinking, better conversations, faster decisions. By 90 days, structural changes become visible: team dynamics shift, org alignment improves, and business outcomes move."
      },
      {
        q: "Is this confidential?",
        a: "Absolutely. All coaching conversations are held under strict confidentiality. In corporate engagements, we report only on aggregate program-level outcomes \u2014 never individual session content."
      },
      {
        q: "Do you work with startups as well as enterprises?",
        a: "Yes. We work from Series A founders to Fortune 100 executives. The challenges are different, but the core leadership principles are universal. We tailor methodology and pacing to your stage."
      },
      {
        q: "What if it's not the right fit?",
        a: "If after the first session we don't both see a clear fit, we issue a full refund. Our reputation is built on results, not locked-in contracts. We earn your continued business every single session."
      }
    ];
    const focusOptions = [
      "Executive Presence & Communication",
      "Team Building & Culture",
      "Strategic Thinking",
      "High-Performance Leadership",
      "Career Transition / Promotion",
      "Startup Scaling Leadership",
      "Board & Investor Relations"
    ];
    const contactDetails = [
      { icon: "\u{1F4E7}", label: "Email Us", val: "hello@forteadvisory.com" },
      { icon: "\u{1F4DE}", label: "Call Us", val: "+1 (888) 555-0192" },
      { icon: "\u{1F4CD}", label: "Offices", val: "New York \xB7 San Francisco \xB7 London" }
    ];
    const footerNav = [
      { heading: "Programs", links: ["Executive 1:1", "Accelerator Cohort", "Corporate Training", "Team Workshops"] },
      { heading: "Company", links: ["About Us", "Our Coaches", "Case Studies", "Press"] },
      { heading: "Resources", links: ["Free Assessment", "Podcast", "Blog", "Newsletter"] }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-04ae9e70><div class="c-dot" style="${ssrRenderStyle(dotStyle.value)}" data-v-04ae9e70></div><div class="c-ring" style="${ssrRenderStyle(ringStyle.value)}" data-v-04ae9e70></div>`);
      if (showBanner.value) {
        _push(`<div class="banner" data-v-04ae9e70><span data-v-04ae9e70>\u{1F3AF} Next cohort starts <strong data-v-04ae9e70>September 8</strong> \u2014 Only 6 seats remaining</span><button class="banner__close" data-v-04ae9e70>\u2715</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="${ssrRenderClass(["nav", { "nav--solid": navSolid.value }])}" data-v-04ae9e70><div class="nav__wrap" data-v-04ae9e70><a class="nav__logo" href="#hero" data-v-04ae9e70><span class="nav__logo-emblem" data-v-04ae9e70>F</span><span class="nav__logo-name" data-v-04ae9e70>FORT\xC9 <em data-v-04ae9e70>ADVISORY</em></span></a><nav class="${ssrRenderClass([{ "nav__links--open": menuOpen.value }, "nav__links"])}" data-v-04ae9e70><!--[-->`);
      ssrRenderList(navItems, (n) => {
        _push(`<a${ssrRenderAttr("href", `#${n.id}`)} class="nav__link" data-v-04ae9e70>${ssrInterpolate(n.label)}</a>`);
      });
      _push(`<!--]--><button class="btn btn--cta nav__cta" data-v-04ae9e70> Book a Call </button></nav><button class="${ssrRenderClass([{ "nav__hamburger--open": menuOpen.value }, "nav__hamburger"])}" aria-label="Menu" data-v-04ae9e70><span data-v-04ae9e70></span><span data-v-04ae9e70></span><span data-v-04ae9e70></span></button></div></header><section id="hero" class="hero" data-v-04ae9e70><div class="hero__bg" data-v-04ae9e70><div class="hero__grid" data-v-04ae9e70></div><div class="hero__radial" data-v-04ae9e70></div></div><div class="hero__layout" data-v-04ae9e70><div class="hero__copy" data-v-04ae9e70><div class="hero__chip" data-v-04ae9e70><span class="chip__dot" data-v-04ae9e70></span> Executive Coaching \xB7 Leadership Development </div><h1 class="hero__h1" data-v-04ae9e70> The Coaching Firm<br data-v-04ae9e70> for Leaders Who<br data-v-04ae9e70><em class="hero__h1-italic" data-v-04ae9e70>Mean Business.</em></h1><p class="hero__sub" data-v-04ae9e70> We work exclusively with C-suite executives, founders, and high-potential VPs to compress years of leadership growth into 90 focused days. </p><div class="hero__proof-row" data-v-04ae9e70><!--[-->`);
      ssrRenderList(heroProof, (p) => {
        _push(`<div class="hero__proof" data-v-04ae9e70><strong class="hero__proof-num" data-v-04ae9e70>${ssrInterpolate(p.num)}</strong><span class="hero__proof-lbl" data-v-04ae9e70>${ssrInterpolate(p.label)}</span></div>`);
      });
      _push(`<!--]--></div><div class="hero__actions" data-v-04ae9e70><button class="btn btn--gold" data-v-04ae9e70> Schedule a Free Strategy Call <svg width="18" height="18" viewBox="0 0 18 18" fill="none" data-v-04ae9e70><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-04ae9e70></path></svg></button><button class="btn btn--outline-light" data-v-04ae9e70> See Programs </button></div><div class="hero__logos" data-v-04ae9e70><span class="hero__logos-label" data-v-04ae9e70>Alumni from</span><div class="hero__logos-list" data-v-04ae9e70><!--[-->`);
      ssrRenderList(alumBrands, (b) => {
        _push(`<span class="hero__logo-item" data-v-04ae9e70>${ssrInterpolate(b)}</span>`);
      });
      _push(`<!--]--></div></div></div><div class="hero__visual" data-v-04ae9e70><div class="hero__frame" data-v-04ae9e70><img class="hero__photo" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&amp;q=85&amp;auto=format&amp;fit=crop&amp;crop=face" alt="Executive coach" data-v-04ae9e70><div class="hero__frame-overlay" data-v-04ae9e70></div><div class="hero__corner hero__corner--tl" data-v-04ae9e70></div><div class="hero__corner hero__corner--br" data-v-04ae9e70></div></div><div class="stat-float stat-float--a" data-v-04ae9e70><span class="sf-num" data-v-04ae9e70>94<small data-v-04ae9e70>%</small></span><span class="sf-lbl" data-v-04ae9e70>Promotion Rate</span></div><div class="stat-float stat-float--b" data-v-04ae9e70><span class="sf-icon" data-v-04ae9e70>\u{1F3C6}</span><div data-v-04ae9e70><span class="sf-num" data-v-04ae9e70>4.97<small data-v-04ae9e70>/5</small></span><span class="sf-lbl" data-v-04ae9e70>Client Rating</span></div></div><div class="stat-float stat-float--c" data-v-04ae9e70><span class="sf-num" data-v-04ae9e70>$2.1<small data-v-04ae9e70>B</small></span><span class="sf-lbl" data-v-04ae9e70>Value Unlocked</span></div></div></div><button class="hero__scroll-cue" data-v-04ae9e70><span class="scroll-line" data-v-04ae9e70></span><span class="scroll-label" data-v-04ae9e70>Scroll</span></button></section><div class="ticker" data-v-04ae9e70><div class="ticker__track" data-v-04ae9e70><!--[-->`);
      ssrRenderList(tickerContent, (t, i) => {
        _push(`<span class="ticker__item" data-v-04ae9e70>${ssrInterpolate(t)} <span class="ticker__sep" data-v-04ae9e70>\u25C6</span></span>`);
      });
      _push(`<!--]--></div></div><section id="about" class="about section" data-v-04ae9e70><div class="wrap" data-v-04ae9e70><div class="about__left reveal" data-v-04ae9e70><div class="about__img-stack" data-v-04ae9e70><img class="about__img about__img--main" src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&amp;q=85&amp;auto=format&amp;fit=crop" alt="Coaching session" data-v-04ae9e70><img class="about__img about__img--secondary" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&amp;q=80&amp;auto=format&amp;fit=crop" alt="Executive" data-v-04ae9e70><div class="about__years-badge" data-v-04ae9e70><span class="yb-num" data-v-04ae9e70>18</span><span class="yb-lbl" data-v-04ae9e70>Years<br data-v-04ae9e70>Excellence</span></div></div></div><div class="about__right reveal" style="${ssrRenderStyle({ "--delay": ".15s" })}" data-v-04ae9e70><span class="eyebrow" data-v-04ae9e70>About Fort\xE9 Advisory</span><h2 class="h2" data-v-04ae9e70>Built for Leaders<br data-v-04ae9e70>Who Refuse to <em data-v-04ae9e70>Plateau</em></h2><p class="body-copy" data-v-04ae9e70> Fort\xE9 Advisory was founded on a conviction that the difference between a good leader and a transformational one isn&#39;t raw talent \u2014 it&#39;s access to the right challenge, at the right moment, with the right guide. </p><p class="body-copy" data-v-04ae9e70> Our coaches bring real boardroom experience from Fortune 100 companies, elite consulting firms, and high-growth startups. We don&#39;t traffic in theory. We drive results you can measure. </p><div class="about__differentiators" data-v-04ae9e70><!--[-->`);
      ssrRenderList(differentiators, (d) => {
        _push(`<div class="diff-item" data-v-04ae9e70><div class="diff-item__icon" data-v-04ae9e70>${ssrInterpolate(d.icon)}</div><div class="diff-item__body" data-v-04ae9e70><strong data-v-04ae9e70>${ssrInterpolate(d.title)}</strong><span data-v-04ae9e70>${ssrInterpolate(d.body)}</span></div></div>`);
      });
      _push(`<!--]--></div><button class="btn btn--navy" data-v-04ae9e70> Talk to a Coach <svg width="18" height="18" viewBox="0 0 18 18" fill="none" data-v-04ae9e70><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-04ae9e70></path></svg></button></div></div></section><section id="programs" class="programs section section--slate" data-v-04ae9e70><div class="wrap" data-v-04ae9e70><div class="section-head reveal" data-v-04ae9e70><span class="eyebrow" data-v-04ae9e70>Programs</span><h2 class="h2" data-v-04ae9e70>Choose Your <em data-v-04ae9e70>Path Forward</em></h2><p class="section-sub" data-v-04ae9e70>Every engagement is tailored. Every outcome is measurable.</p></div><div class="programs__grid" data-v-04ae9e70><!--[-->`);
      ssrRenderList(programs, (prog, i) => {
        _push(`<article class="${ssrRenderClass(["prog-card", "reveal", { "prog-card--featured": prog.featured }])}" style="${ssrRenderStyle({ "--delay": `${i * 0.1}s` })}" data-v-04ae9e70>`);
        if (prog.featured) {
          _push(`<div class="prog-card__ribbon" data-v-04ae9e70>Most Popular</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="prog-card__header" data-v-04ae9e70><span class="prog-card__icon" data-v-04ae9e70>${ssrInterpolate(prog.icon)}</span><h3 class="prog-card__title" data-v-04ae9e70>${ssrInterpolate(prog.title)}</h3></div><p class="prog-card__desc" data-v-04ae9e70>${ssrInterpolate(prog.desc)}</p><ul class="prog-card__list" data-v-04ae9e70><!--[-->`);
        ssrRenderList(prog.features, (f) => {
          _push(`<li data-v-04ae9e70><svg width="15" height="15" viewBox="0 0 15 15" fill="none" data-v-04ae9e70><path d="M2.5 7.5L6 11l6.5-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-04ae9e70></path></svg> ${ssrInterpolate(f)}</li>`);
        });
        _push(`<!--]--></ul><div class="prog-card__foot" data-v-04ae9e70><div class="prog-card__meta" data-v-04ae9e70><span class="prog-card__duration" data-v-04ae9e70>${ssrInterpolate(prog.duration)}</span><span class="prog-card__price" data-v-04ae9e70>${ssrInterpolate(prog.price)}</span></div><button class="${ssrRenderClass(["btn", prog.featured ? "btn--gold" : "btn--outline-navy"])}" data-v-04ae9e70> Enroll Now </button></div></article>`);
      });
      _push(`<!--]--></div></div></section><section id="process" class="process section" data-v-04ae9e70><div class="wrap" data-v-04ae9e70><div class="section-head reveal" data-v-04ae9e70><span class="eyebrow" data-v-04ae9e70>The Method</span><h2 class="h2" data-v-04ae9e70>From Ambiguity <em data-v-04ae9e70>to Momentum</em></h2></div><div class="process__track" data-v-04ae9e70><!--[-->`);
      ssrRenderList(processSteps, (step, i) => {
        _push(`<div class="process__step reveal" style="${ssrRenderStyle({ "--delay": `${i * 0.1}s` })}" data-v-04ae9e70><div class="ps__num" data-v-04ae9e70>${ssrInterpolate(String(i + 1).padStart(2, "0"))}</div><div class="ps__icon" data-v-04ae9e70>${ssrInterpolate(step.icon)}</div><h4 class="ps__title" data-v-04ae9e70>${ssrInterpolate(step.title)}</h4><p class="ps__body" data-v-04ae9e70>${ssrInterpolate(step.body)}</p></div>`);
      });
      _push(`<!--]--><div class="process__line" data-v-04ae9e70></div></div></div></section><div class="metrics-band" data-v-04ae9e70><div class="wrap metrics-band__inner" data-v-04ae9e70><!--[-->`);
      ssrRenderList(metricsList, (m) => {
        _push(`<div class="metric reveal" style="${ssrRenderStyle({ "--delay": `${m.delay}s` })}" data-v-04ae9e70><span class="metric__val"${ssrRenderAttr("data-target", m.target)}${ssrRenderAttr("data-suffix", m.suffix)} data-v-04ae9e70>${ssrInterpolate(m.display)}</span><span class="metric__lbl" data-v-04ae9e70>${ssrInterpolate(m.label)}</span></div>`);
      });
      _push(`<!--]--></div></div><section id="results" class="results section section--slate" data-v-04ae9e70><div class="wrap" data-v-04ae9e70><div class="section-head reveal" data-v-04ae9e70><span class="eyebrow" data-v-04ae9e70>Client Results</span><h2 class="h2" data-v-04ae9e70>Proof Over <em data-v-04ae9e70>Promises</em></h2></div><div class="results__grid" data-v-04ae9e70><!--[-->`);
      ssrRenderList(testimonials, (t, i) => {
        _push(`<div class="t-card reveal" style="${ssrRenderStyle({ "--delay": `${i * 0.1}s` })}" data-v-04ae9e70><div class="t-card__stars" data-v-04ae9e70>\u2605\u2605\u2605\u2605\u2605</div><blockquote class="t-card__quote" data-v-04ae9e70>${ssrInterpolate(t.quote)}</blockquote><div class="t-card__outcome" data-v-04ae9e70><span class="t-card__outcome-val" data-v-04ae9e70>${ssrInterpolate(t.outcome)}</span><span class="t-card__outcome-lbl" data-v-04ae9e70>${ssrInterpolate(t.outcomeLbl)}</span></div><footer class="t-card__author" data-v-04ae9e70><img class="t-card__avatar"${ssrRenderAttr("src", t.photo)}${ssrRenderAttr("alt", t.name)} data-v-04ae9e70><div data-v-04ae9e70><strong class="t-card__name" data-v-04ae9e70>${ssrInterpolate(t.name)}</strong><span class="t-card__role" data-v-04ae9e70>${ssrInterpolate(t.role)}</span></div></footer></div>`);
      });
      _push(`<!--]--></div></div></section><section id="team" class="team-section section" data-v-04ae9e70><div class="wrap" data-v-04ae9e70><div class="section-head reveal" data-v-04ae9e70><span class="eyebrow" data-v-04ae9e70>The Coaches</span><h2 class="h2" data-v-04ae9e70>World-Class <em data-v-04ae9e70>Expertise</em></h2></div><div class="team__grid" data-v-04ae9e70><!--[-->`);
      ssrRenderList(coaches, (c, i) => {
        _push(`<div class="coach-card reveal" style="${ssrRenderStyle({ "--delay": `${i * 0.1}s` })}" data-v-04ae9e70><div class="coach-card__photo-wrap" data-v-04ae9e70><img class="coach-card__photo"${ssrRenderAttr("src", c.photo)}${ssrRenderAttr("alt", c.name)} data-v-04ae9e70><div class="coach-card__hover-bio" data-v-04ae9e70><p data-v-04ae9e70>${ssrInterpolate(c.bio)}</p></div></div><div class="coach-card__info" data-v-04ae9e70><strong class="coach-card__name" data-v-04ae9e70>${ssrInterpolate(c.name)}</strong><span class="coach-card__title" data-v-04ae9e70>${ssrInterpolate(c.title)}</span><div class="coach-card__tags" data-v-04ae9e70><!--[-->`);
        ssrRenderList(c.tags, (tag) => {
          _push(`<span class="ctag" data-v-04ae9e70>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div></div></section><section id="faq" class="faq-section section section--slate" data-v-04ae9e70><div class="wrap faq-section__inner" data-v-04ae9e70><div class="faq-section__left reveal" data-v-04ae9e70><span class="eyebrow" data-v-04ae9e70>FAQ</span><h2 class="h2" data-v-04ae9e70>Questions <em data-v-04ae9e70>Answered</em></h2><p class="body-copy" data-v-04ae9e70> Don&#39;t see your question here? Book a free 30-minute call \u2014 we&#39;ll answer everything without any pressure. </p><button class="btn btn--navy" data-v-04ae9e70> Speak With Us <svg width="18" height="18" viewBox="0 0 18 18" fill="none" data-v-04ae9e70><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-04ae9e70></path></svg></button></div><div class="faq-section__list reveal" style="${ssrRenderStyle({ "--delay": ".15s" })}" data-v-04ae9e70><!--[-->`);
      ssrRenderList(faqs, (faq, i) => {
        _push(`<div class="${ssrRenderClass(["faq-item", { "faq-item--open": openFaq.value === i }])}" data-v-04ae9e70><button class="faq-item__q" data-v-04ae9e70>${ssrInterpolate(faq.q)} <svg class="${ssrRenderClass(["faq-item__caret", { "faq-item__caret--flip": openFaq.value === i }])}" width="20" height="20" viewBox="0 0 20 20" fill="none" data-v-04ae9e70><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-04ae9e70></path></svg></button>`);
        if (openFaq.value === i) {
          _push(`<div class="faq-item__a" data-v-04ae9e70>${ssrInterpolate(faq.a)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section><section id="contact" class="contact section" data-v-04ae9e70><div class="contact__bg" data-v-04ae9e70><div class="contact__mesh" data-v-04ae9e70></div></div><div class="wrap contact__inner" data-v-04ae9e70><div class="contact__pitch reveal" data-v-04ae9e70><span class="eyebrow" style="${ssrRenderStyle({ "color": "var(--gold-lt)" })}" data-v-04ae9e70>Let&#39;s Begin</span><h2 class="h2" style="${ssrRenderStyle({ "color": "#fff" })}" data-v-04ae9e70> Your Next<br data-v-04ae9e70><em style="${ssrRenderStyle({ "color": "var(--gold-lt)" })}" data-v-04ae9e70>Breakthrough</em><br data-v-04ae9e70> Starts Here. </h2><p class="contact__pitch-body" data-v-04ae9e70> Schedule a complimentary 30-minute strategy session. We&#39;ll identify your biggest leadership lever and map a clear path forward \u2014 no sales pitch, just substance. </p><div class="contact__details" data-v-04ae9e70><!--[-->`);
      ssrRenderList(contactDetails, (d) => {
        _push(`<div class="contact__detail" data-v-04ae9e70><span class="contact__detail-icon" data-v-04ae9e70>${ssrInterpolate(d.icon)}</span><div data-v-04ae9e70><span class="contact__detail-label" data-v-04ae9e70>${ssrInterpolate(d.label)}</span><span class="contact__detail-val" data-v-04ae9e70>${ssrInterpolate(d.val)}</span></div></div>`);
      });
      _push(`<!--]--></div></div><div class="contact__form-wrap reveal" style="${ssrRenderStyle({ "--delay": ".2s" })}" data-v-04ae9e70><div class="contact__form-card" data-v-04ae9e70><h3 class="form-heading" data-v-04ae9e70>Book Your Free Strategy Call</h3>`);
      if (sent.value) {
        _push(`<div class="form-success" data-v-04ae9e70><div class="form-success__check" data-v-04ae9e70>\u2713</div><strong data-v-04ae9e70>Request Confirmed!</strong><span data-v-04ae9e70>We&#39;ll reach out within 24 hours to lock in your session.</span></div>`);
      } else {
        _push(`<form class="form" data-v-04ae9e70><div class="form-row" data-v-04ae9e70><div class="form-field" data-v-04ae9e70><label data-v-04ae9e70>First Name</label><input${ssrRenderAttr("value", fm.first)} type="text" placeholder="Alexandra" required data-v-04ae9e70></div><div class="form-field" data-v-04ae9e70><label data-v-04ae9e70>Last Name</label><input${ssrRenderAttr("value", fm.last)} type="text" placeholder="Chen" required data-v-04ae9e70></div></div><div class="form-field" data-v-04ae9e70><label data-v-04ae9e70>Business Email</label><input${ssrRenderAttr("value", fm.email)} type="email" placeholder="alex@company.com" required data-v-04ae9e70></div><div class="form-field" data-v-04ae9e70><label data-v-04ae9e70>Title &amp; Company</label><input${ssrRenderAttr("value", fm.company)} type="text" placeholder="VP of Sales, Acme Corp" data-v-04ae9e70></div><div class="form-field" data-v-04ae9e70><label data-v-04ae9e70>Primary Focus</label><select data-v-04ae9e70><option value="" data-v-04ae9e70${ssrIncludeBooleanAttr(Array.isArray(fm.focus) ? ssrLooseContain(fm.focus, "") : ssrLooseEqual(fm.focus, "")) ? " selected" : ""}>Select a focus area\u2026</option><!--[-->`);
        ssrRenderList(focusOptions, (f) => {
          _push(`<option${ssrRenderAttr("value", f)} data-v-04ae9e70${ssrIncludeBooleanAttr(Array.isArray(fm.focus) ? ssrLooseContain(fm.focus, f) : ssrLooseEqual(fm.focus, f)) ? " selected" : ""}>${ssrInterpolate(f)}</option>`);
        });
        _push(`<!--]--></select></div><div class="form-field" data-v-04ae9e70><label data-v-04ae9e70>Your Biggest Leadership Challenge</label><textarea rows="3" placeholder="Tell us what&#39;s standing between you and your next level\u2026" data-v-04ae9e70>${ssrInterpolate(fm.note)}</textarea></div><button type="submit" class="btn btn--submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-04ae9e70>`);
        if (loading.value) {
          _push(`<span data-v-04ae9e70>Sending\u2026</span>`);
        } else {
          _push(`<span data-v-04ae9e70> Schedule My Free Call <svg width="18" height="18" viewBox="0 0 18 18" fill="none" data-v-04ae9e70><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-04ae9e70></path></svg></span>`);
        }
        _push(`</button><p class="form-disclaimer" data-v-04ae9e70>\u{1F512} Strictly confidential. No spam, no obligation.</p></form>`);
      }
      _push(`</div></div></div></section><footer class="footer" data-v-04ae9e70><div class="wrap footer__top" data-v-04ae9e70><div class="footer__brand" data-v-04ae9e70><span class="footer__emblem" data-v-04ae9e70>F</span><div data-v-04ae9e70><span class="footer__name" data-v-04ae9e70>FORT\xC9 <em data-v-04ae9e70>ADVISORY</em></span><span class="footer__tagline" data-v-04ae9e70>Transforming leaders. Building legacies.</span></div></div><div class="footer__cols" data-v-04ae9e70><!--[-->`);
      ssrRenderList(footerNav, (col) => {
        _push(`<div class="footer__col" data-v-04ae9e70><span class="footer__col-heading" data-v-04ae9e70>${ssrInterpolate(col.heading)}</span><!--[-->`);
        ssrRenderList(col.links, (link) => {
          _push(`<a href="#" class="footer__col-link" data-v-04ae9e70>${ssrInterpolate(link)}</a>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div><div class="wrap footer__bottom" data-v-04ae9e70><span data-v-04ae9e70>\xA9 2025 Fort\xE9 Advisory LLC. All rights reserved.</span><span data-v-04ae9e70>Photos: Unsplash (CC0 License)</span></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/templates/light-coach.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lightCoach = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-04ae9e70"]]);

export { lightCoach as default };
//# sourceMappingURL=light-coach-CpDVimcP.mjs.map
