/**
 * Birthday Surprise — Main script
 * Customize CONFIG below for names, messages, photos, and music.
 */

const CONFIG = {
  /** Name shown on celebration screen */
  recipientName: "Beautiful Soul",

  /** Typewriter letter (use \n for line breaks) */
  birthdayLetter:
    "Happy Birthday, Sumye ❤️\n\n" +
    "First of all, thank you for choosing me and for loving me so much. I feel truly lucky to have you in my life. Always keep yourself happy, and don't worry too much about our future. I truly believe our future will be bright just like you. 😁 " +
    "There's one thing I want to ask you, and I'm begging you because I want the very best for you. Please take care of yourself. Exercise regularly, get enough sleep, eat healthy food, and please keep learning English. Try to speak to me in English whenever I call you for our English class. I know you can do it, and I'm always here to help you." +
    "There's one thing I want to ask you, and I'm begging you because I want the very best for you. Please take care of yourself. Exercise regularly, get enough sleep, eat healthy food, and please keep learning English. Try to speak to me in English whenever I call you for our English class. I know you can do it, and I'm always here to help you.\n\n" +
    "I'm so proud of how much you've grown. Before, you wanted us to get married as soon as possible, but now you understand the value of money and planning for our future.That makes me admire you even more.There will be many challenges in our lives, especially mentally, but I know we'll overcome them together.I promise that I'll always support your dreams and do everything I can to help you achieve them. More importantly,I promise that I'll love you until my very last breath, without any hesitation ❤️" +
    "Thank you for everything means  everything 🫠 And one more thing, my love... please don't panic over small things. Take a deep breath, relax, and think about how to solve the problem. That's what strong and brave girls do❤️.Now promise me that starting next week, you'll take good care of yourself by exercising, sleeping well, eating healthy, and attending our English classes. I'm giving you this week to prepare yourself, so please don't break your promise 🥺🫂.Happy Birthday once again, my love. I love you more than words can ever express.Be happyyyy.\n\n" +
    "With all my love,\n" +
    "Your's Mocha  ❤️",

  /** Final message inside the gift box */
  giftSurpriseMessage:
    "You are the most precious surprise life could ever give. " +
    "Never forget how loved, valued, and celebrated you are — today and always. ✨",

  /** Birthday wish cards */
  wishes: [
    { emoji: "🎂", text: "May every slice of life be as sweet as your smile!", from: "With love" },
    { emoji: "✨", text: "Shine brighter than the stars — you deserve the universe.", from: "Your admirer" },
    { emoji: "🌸", text: "Bloom wildly, dream boldly, and love fiercely this year.", from: "Forever yours" },
    { emoji: "🎈", text: "Float through the year with joy, courage, and endless wonder.", from: "Cheering for you" },
  ],

  /**
   * Gallery images — replace src with your photos in assets/images/
   * alt text for accessibility
   */
  gallery: [
    { src: "assets/images/memory-1.jpg", alt: "Memory 1", placeholder: "📸" },
    { src: "assets/images/memory-2.jpg", alt: "Memory 2", placeholder: "💕" },
    { src: "assets/images/memory-3.jpg", alt: "Memory 3", placeholder: "✨" },
    { src: "assets/images/memory-4.jpg", alt: "Memory 4", placeholder: "🎉" },
    { src: "assets/images/memory-5.jpg", alt: "Memory 5", placeholder: "🌟" },
    { src: "assets/images/memory-6.jpg", alt: "Memory 6", placeholder: "❤️" },
  ],

  /** Typewriter speed (ms per character) */
  typewriterSpeed: 35,

  /** Loading duration (ms) */
  loadingDuration: 2800,
};

/* ==========================================================================
   Screen manager
   ========================================================================== */

const ScreenManager = {
  current: "loading",
  screens: new Map(),

  init() {
    document.querySelectorAll(".screen").forEach((el) => {
      this.screens.set(el.dataset.screen, el);
    });
  },

  goTo(name, { onEnter } = {}) {
    const next = this.screens.get(name);
    const prev = this.screens.get(this.current);
    if (!next || name === this.current) return;

    if (prev) {
      prev.classList.remove("screen--active");
      prev.classList.add("screen--exit");
      prev.addEventListener(
        "transitionend",
        () => prev.classList.remove("screen--exit"),
        { once: true }
      );
    }

    next.classList.add("screen--active");
    this.current = name;

    if (typeof onEnter === "function") onEnter();
  },
};

/* ==========================================================================
   Ambient sparkles (loading + background)
   ========================================================================== */

function initLoadingSparkles(container) {
  if (!container) return;
  const count = 12;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.style.left = `${8 + Math.random() * 84}%`;
    s.style.top = `${20 + Math.random() * 60}%`;
    s.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(s);
  }
}

function initFloatingHearts(container, count = 8) {
  if (!container) return;
  const hearts = ["💗", "💕", "💖", "❤️", "✨"];
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = hearts[i % hearts.length];
    h.style.left = `${Math.random() * 100}%`;
    h.style.animationDuration = `${6 + Math.random() * 6}s`;
    h.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(h);
  }
}

/* ==========================================================================
   Particle canvas (subtle stars)
   ========================================================================== */

const Particles = {
  canvas: null,
  ctx: null,
  items: [],
  raf: null,
  reducedMotion: false,

  init() {
    this.canvas = document.getElementById("particles-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });
    if (!this.reducedMotion) this.seed();
  },

  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx?.scale(dpr, dpr);
  },

  seed() {
    this.items = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.5 + 0.2,
      sp: Math.random() * 0.3 + 0.1,
    }));
    this.loop();
  },

  loop() {
    if (!this.ctx || !this.canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.ctx.clearRect(0, 0, w, h);
    this.items.forEach((p) => {
      p.y -= p.sp;
      if (p.y < 0) p.y = h;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.a})`;
      this.ctx.fill();
    });
    this.raf = requestAnimationFrame(() => this.loop());
  },

  stop() {
    if (this.raf) cancelAnimationFrame(this.raf);
  },
};

/* ==========================================================================
   Confetti
   ========================================================================== */

const Confetti = {
  canvas: null,
  ctx: null,
  pieces: [],
  active: false,
  colors: ["#ff6eb4", "#ffd700", "#9d4edd", "#ffffff", "#ffb3d9"],

  attach(id) {
    this.canvas = document.getElementById(id);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });
  },

  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  },

  burst(count = 120) {
    if (!this.ctx) return;
    this.pieces = [];
    for (let i = 0; i < count; i++) {
      this.pieces.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.3,
        vx: (Math.random() - 0.5) * 12,
        vy: Math.random() * -14 - 4,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 3,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rot: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        gravity: 0.25 + Math.random() * 0.15,
      });
    }
    if (!this.active) {
      this.active = true;
      this.animate();
    }
  },

  animate() {
    if (!this.ctx) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.ctx.clearRect(0, 0, w, h);
    this.pieces = this.pieces.filter((p) => p.y < h + 20);
    this.pieces.forEach((p) => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rot * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      this.ctx.restore();
    });
    if (this.pieces.length) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.active = false;
      this.ctx.clearRect(0, 0, w, h);
    }
  },
};

/* ==========================================================================
   Fireworks
   ========================================================================== */

const Fireworks = {
  canvas: null,
  ctx: null,
  rockets: [],
  particles: [],
  running: false,
  raf: null,

  attach(id) {
    this.canvas = document.getElementById(id);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });
  },

  attachSecondary(id) {
    this.canvasSecondary = document.getElementById(id);
    if (this.canvasSecondary) {
      this.ctxSecondary = this.canvasSecondary.getContext("2d");
    }
  },

  resize() {
    [this.canvas, this.canvasSecondary].filter(Boolean).forEach((c) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      const ctx = c === this.canvas ? this.ctx : this.ctxSecondary;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  },

  start(durationMs = 8000) {
    if (!this.ctx || this.running) return;
    this.running = true;
    this.rockets = [];
    this.particles = [];
    const end = Date.now() + durationMs;
    const launch = () => {
      if (Date.now() > end) {
        this.running = false;
        return;
      }
      this.launchRocket();
      setTimeout(launch, 400 + Math.random() * 600);
    };
    launch();
    this.loop();
  },

  launchRocket() {
    const x = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
    this.rockets.push({
      x,
      y: window.innerHeight,
      vy: -8 - Math.random() * 4,
      hue: Math.random() * 60 + 280,
    });
  },

  explode(x, y, hue) {
    const n = 40 + Math.floor(Math.random() * 20);
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n + Math.random() * 0.2;
      const speed = 2 + Math.random() * 4;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        hue,
      });
    }
  },

  loop() {
    if (!this.ctx) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.ctx.clearRect(0, 0, w, h);

    this.rockets = this.rockets.filter((r) => {
      r.y += r.vy;
      r.vy += 0.05;
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsl(${r.hue}, 100%, 70%)`;
      this.ctx.fill();
      if (r.vy >= -1) {
        this.explode(r.x, r.y, r.hue);
        return false;
      }
      return true;
    });

    this.particles = this.particles.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.life -= 0.018;
      if (p.life <= 0) return false;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.life})`;
      this.ctx.fill();
      return true;
    });

    if (this.running || this.rockets.length || this.particles.length) {
      this.raf = requestAnimationFrame(() => this.loop());
    } else {
      this.ctx.clearRect(0, 0, w, h);
    }
  },

  /** Cake screen uses separate canvas */
  startOn(id, durationMs = 5000) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    let particles = [];
    let end = Date.now() + durationMs;

    const explode = (x, y) => {
      const hue = Math.random() * 60 + 280;
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          hue,
        });
      }
    };

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      if (Date.now() < end && Math.random() > 0.92) {
        explode(Math.random() * w, Math.random() * h * 0.5);
      }
      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.life -= 0.02;
        if (p.life <= 0) return false;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.life})`;
        ctx.fill();
        return true;
      });
      if (Date.now() < end || particles.length) requestAnimationFrame(tick);
    };
    tick();
  },
};

/* ==========================================================================
   Balloons
   ========================================================================== */

function initBalloons(container) {
  if (!container) return;
  const colors = ["#ff6eb4", "#9d4edd", "#ffd700", "#ffb3d9", "#c77dff"];
  for (let i = 0; i < 10; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.left = `${5 + i * 9}%`;
    b.style.background = colors[i % colors.length];
    b.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
    b.style.animationDuration = `${10 + Math.random() * 8}s`;
    b.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(b);
  }
}

/* ==========================================================================
   Loading sequence
   ========================================================================== */

function runLoading() {
  const bar = document.getElementById("loading-bar");
  const progress = document.querySelector(".progress");
  const duration = CONFIG.loadingDuration;
  const start = performance.now();

  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const pct = Math.floor(t * 100);
    if (bar) bar.style.width = `${pct}%`;
    if (progress) progress.setAttribute("aria-valuenow", String(pct));
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      setTimeout(() => ScreenManager.goTo("welcome"), 400);
    }
  }
  requestAnimationFrame(frame);
}

/* ==========================================================================
   Typewriter
   ========================================================================== */

function runTypewriter(text, el, speed, onComplete) {
  if (!el) return;
  el.textContent = "";
  let i = 0;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    el.textContent = text;
    onComplete?.();
    return;
  }

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i += 1;
      setTimeout(type, speed);
    } else {
      onComplete?.();
    }
  }
  type();
}

/* ==========================================================================
   Countdown 3-2-1
   ========================================================================== */

function runCountdown(onDone) {
  const el = document.getElementById("countdown-number");
  const sequence = ["3", "2", "1"];
  let idx = 0;

  function show() {
    if (!el) return;
    el.classList.remove("is-exit");
    el.textContent = sequence[idx];
    void el.offsetWidth;

    setTimeout(() => {
      el.classList.add("is-exit");
      idx += 1;
      if (idx < sequence.length) {
        setTimeout(show, 380);
      } else {
        setTimeout(onDone, 450);
      }
    }, 580);
  }
  show();
}

/* ==========================================================================
   Gallery (Updated with Emoji Reveal Mechanic)
   ========================================================================== */

function buildGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";

  CONFIG.gallery.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery__item";
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", "Tap to reveal photo");

    // 1. Emoji cover layer
    const cover = document.createElement("div");
    cover.className = "gallery__emoji-cover";
    cover.textContent = item.placeholder || "✨";
    btn.appendChild(cover);

    // 2. Photo layer underneath
    const img = document.createElement("img");
    img.alt = item.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.src = item.src;

    img.onerror = () => {
      cover.style.opacity = "1";
      cover.style.transform = "none";
    };

    btn.appendChild(img);

    // 3. Tap behavior (1st tap reveals, 2nd tap expands fullscreen)
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("is-revealed")) {
        btn.classList.add("is-revealed");
        btn.setAttribute("aria-label", `View ${item.alt} fullscreen`);
      } else {
        openLightbox(item, img.complete && img.naturalWidth ? item.src : null);
      }
    });

    grid.appendChild(btn);
  });
}

function openLightbox(item, src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if (!lb || !img) return;
  if (src) {
    img.src = src;
    img.alt = item.alt;
    img.style.display = "";
  } else {
    img.style.display = "none";
  }
  lb.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (lb) lb.hidden = true;
  document.body.style.overflow = "";
}

/* ==========================================================================
   Messages carousel (swipe + buttons)
   ========================================================================== */

const Carousel = {
  index: 0,
  track: null,
  slidesEl: null,
  dotsEl: null,
  touchStartX: 0,

  init() {
    this.track = document.getElementById("messages-track");
    this.dotsEl = document.getElementById("messages-dots");
    if (!this.track) return;

    this.slidesEl = document.createElement("div");
    this.slidesEl.className = "messages__slides";

    CONFIG.wishes.forEach((wish, i) => {
      const slide = document.createElement("article");
      slide.className = "message-card";
      slide.innerHTML = `
        <div class="message-card__inner">
          <span class="message-card__emoji">${wish.emoji}</span>
          <p class="message-card__text">${wish.text}</p>
          <p class="message-card__from">— ${wish.from}</p>
        </div>`;
      this.slidesEl.appendChild(slide);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "messages__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Message ${i + 1}`);
      dot.addEventListener("click", () => this.go(i));
      this.dotsEl?.appendChild(dot);
    });

    this.track.appendChild(this.slidesEl);
    this.bindSwipe();
    this.update();
  },

  go(i) {
    this.index = Math.max(0, Math.min(CONFIG.wishes.length - 1, i));
    this.update();
  },

  next() {
    this.go(this.index + 1);
  },

  prev() {
    this.go(this.index - 1);
  },

  update() {
    if (this.slidesEl) {
      this.slidesEl.style.transform = `translateX(-${this.index * 100}%)`;
    }
    this.dotsEl?.querySelectorAll(".messages__dot").forEach((d, i) => {
      d.classList.toggle("is-active", i === this.index);
    });
  },

  bindSwipe() {
    this.track.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    this.track.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].screenX - this.touchStartX;
        if (Math.abs(dx) < 40) return;
        if (dx < 0) this.next();
        else this.prev();
      },
      { passive: true }
    );
  },
};

/* ==========================================================================
   Music
   ========================================================================== */

const Music = {
  audio: null,
  btn: null,

  init() {
    this.audio = document.getElementById("birthday-audio");
    this.btn = document.getElementById("btn-music");
    this.btn?.addEventListener("click", () => this.toggle());
  },

  toggle() {
    if (!this.audio) return;
    if (this.audio.paused) {
      this.audio.play().catch(() => {
        /* User may not have added assets/music/birthday.mp3 yet */
      });
      this.btn?.classList.add("is-playing");
      this.btn?.setAttribute("aria-pressed", "true");
      this.btn?.setAttribute("aria-label", "Pause birthday music");
    } else {
      this.audio.pause();
      this.btn?.classList.remove("is-playing");
      this.btn?.setAttribute("aria-pressed", "false");
      this.btn?.setAttribute("aria-label", "Play birthday music");
    }
  },

  pause() {
    this.audio?.pause();
    this.btn?.classList.remove("is-playing");
  },
};

/* ==========================================================================
   Share & replay
   ========================================================================== */

async function shareSurprise() {
  const shareData = {
    title: "Birthday Surprise",
    text: "Someone made a special birthday surprise for you! 🎂✨",
    url: window.location.href,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      /* cancelled */
    }
  } else if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }
}

function replaySurprise() {
  Music.pause();
  const bar = document.getElementById("loading-bar");
  if (bar) bar.style.width = "0%";
  document.getElementById("envelope-hint").textContent = "Tap the envelope to open";
  document.getElementById("cake-hint").textContent = "Tap the candle to blow it out";
  document.getElementById("gift-hint").textContent = "Tap the gift to open";
  document.getElementById("envelope")?.classList.remove("is-open");
  document.getElementById("gift-box")?.classList.remove("is-open");
  document.getElementById("gift-message")?.setAttribute("hidden", "");
  document.getElementById("candle")?.classList.remove("is-blown");
  document.getElementById("cake")?.classList.remove("is-wished");
  document.getElementById("btn-cake-next")?.classList.remove("is-visible");
  document.getElementById("btn-gift-next")?.classList.remove("is-visible");
  document.getElementById("typewriter-text").textContent = "";
  document.getElementById("btn-letter-next").disabled = true;

  // Reset photos back behind emoji cards on replay
  document.querySelectorAll(".gallery__item").forEach((btn) => {
    btn.classList.remove("is-revealed");
    btn.setAttribute("aria-label", "Tap to reveal photo");
  });

  Carousel.index = 0;
  Carousel.update();
  ScreenManager.goTo("loading", {
    onEnter: () => runLoading(),
  });
}

/* ==========================================================================
   Event bindings
   ========================================================================== */

function bindEvents() {
  document.getElementById("btn-open-surprise")?.addEventListener("click", () => {
    ScreenManager.goTo("envelope");
  });

  const envelope = document.getElementById("envelope");
  envelope?.addEventListener("click", () => {
    if (envelope.classList.contains("is-open")) return;
    envelope.classList.add("is-open");
    setTimeout(() => ScreenManager.goTo("letter", { onEnter: startLetter }), 1400);
  });

  document.getElementById("btn-letter-next")?.addEventListener("click", () => {
    ScreenManager.goTo("countdown", { onEnter: () => runCountdown(startCelebration) });
  });

  document.getElementById("btn-celebration-next")?.addEventListener("click", () => {
    ScreenManager.goTo("gallery");
  });

  document.getElementById("btn-gallery-next")?.addEventListener("click", () => {
    ScreenManager.goTo("messages");
  });

  document.getElementById("btn-messages-next")?.addEventListener("click", () => {
    ScreenManager.goTo("cake");
  });

  document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
  document.getElementById("lightbox")?.addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });

  document.getElementById("messages-prev")?.addEventListener("click", () => Carousel.prev());
  document.getElementById("messages-next")?.addEventListener("click", () => Carousel.next());

  const candle = document.getElementById("candle");
  const cake = document.getElementById("cake");
  cake?.addEventListener("click", () => {
    if (candle?.classList.contains("is-blown")) return;
    candle?.classList.add("is-blown");
    cake.classList.add("is-wished");
    Fireworks.startOn("cake-fireworks", 5000);
    Confetti.burst(80);
    document.getElementById("cake-hint").textContent = "Wish granted! ✨";
    const next = document.getElementById("btn-cake-next");
    next?.classList.add("is-visible");
  });

  document.getElementById("btn-cake-next")?.addEventListener("click", () => {
    ScreenManager.goTo("gift");
  });

  const gift = document.getElementById("gift-box");
  gift?.addEventListener("click", () => {
    if (gift.classList.contains("is-open")) return;
    gift.classList.add("is-open");
    const msg = document.getElementById("gift-message");
    const text = document.getElementById("gift-message-text");
    if (text) text.textContent = CONFIG.giftSurpriseMessage;
    msg?.removeAttribute("hidden");
    document.getElementById("gift-hint").textContent = "For you, always.";
    document.getElementById("btn-gift-next")?.classList.add("is-visible");
  });

  document.getElementById("btn-gift-next")?.addEventListener("click", () => {
    ScreenManager.goTo("ending");
  });

  document.getElementById("btn-replay")?.addEventListener("click", replaySurprise);
  document.getElementById("btn-share")?.addEventListener("click", shareSurprise);
}

function startLetter() {
  const el = document.getElementById("typewriter-text");
  const btn = document.getElementById("btn-letter-next");
  runTypewriter(CONFIG.birthdayLetter, el, CONFIG.typewriterSpeed, () => {
    if (btn) btn.disabled = false;
  });
}

function startCelebration() {
  ScreenManager.goTo("celebration", {
    onEnter: () => {
      const nameEl = document.getElementById("celebration-name");
      if (nameEl) nameEl.textContent = `To ${CONFIG.recipientName} — with love`;
      Confetti.burst();
      Fireworks.start(9000);
      const balloonRoot = document.getElementById("balloons");
      if (balloonRoot) {
        balloonRoot.innerHTML = "";
        initBalloons(balloonRoot);
      }
    },
  });
}

/* ==========================================================================
   Boot
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  ScreenManager.init();
  Particles.init();
  Confetti.attach("confetti-canvas");
  Fireworks.attach("fireworks-canvas");
  initLoadingSparkles(document.querySelector(".sparkles--loading"));
  initFloatingHearts(document.querySelector(".floating-hearts"));
  buildGallery();
  Carousel.init();
  Music.init();
  bindEvents();
  runLoading();
});