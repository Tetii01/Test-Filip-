/* Popas Tălmaciu · interactions */
(function () {
  // ── Nav: scrolled state + mobile toggle ────────────────────────────────
  const nav = document.querySelector('.nav');
  const links = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toggle && toggle.addEventListener('click', () => links.classList.toggle('open'));
  links && links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  // ── Smooth scroll for anchor links ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ── Reveal on scroll ───────────────────────────────────────────────────
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add('in')),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // ── Image fallback ─────────────────────────────────────────────────────
  document.querySelectorAll('img[data-img-slot]').forEach((img) => {
    img.addEventListener('error', () => {
      const slot = img.getAttribute('data-img-slot');
      img.src = `https://picsum.photos/seed/${encodeURIComponent(slot)}/1600/1000`;
    }, { once: true });
  });

  // ── Today's date for booking inputs ────────────────────────────────────
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  document.querySelectorAll('input[type="date"]').forEach((i) => {
    if (!i.value && i.dataset.default !== 'empty') i.min = `${yyyy}-${mm}-${dd}`;
  });

  // ── Form submission (preview demo) ─────────────────────────────────────
  document.querySelectorAll('form[data-demo]').forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const kind = f.dataset.demo;
      const msg = {
        booking: 'Mulțumim! O să vă confirmăm disponibilitatea prin email și telefon.',
        table:   'Masa este aproape pregătită — primiți confirmare în 10 minute.',
        event:   'Cererea ta a ajuns la noi. Răspundem în maxim 24 de ore.',
        contact: 'Mesajul tău a fost trimis. Te contactăm cât mai curând.',
      }[kind] || 'Mulțumim!';
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = msg;
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add('in'));
      setTimeout(() => { toast.classList.remove('in'); setTimeout(() => toast.remove(), 400); }, 4500);
    });
  });

  // ── Tweaks panel ───────────────────────────────────────────────────────
  const TWEAK_DEFAULTS = window.TWEAK_DEFAULTS || {};
  const state = { ...TWEAK_DEFAULTS };
  const root = document.documentElement;

  function applyTweaks() {
    if (state.accent) {
      const variants = {
        gold:     { gold: '#a47e3e', deep: '#826132', faint: '#ead7af' },
        burgundy: { gold: '#8a3a3a', deep: '#682929', faint: '#e9c8c0' },
        forest:   { gold: '#4f6e4a', deep: '#3a5238', faint: '#cfdac3' },
        slate:    { gold: '#4a5e72', deep: '#384757', faint: '#cdd6df' },
      };
      const v = variants[state.accent] || variants.gold;
      root.style.setProperty('--gold', v.gold);
      root.style.setProperty('--gold-deep', v.deep);
      root.style.setProperty('--gold-faint', v.faint);
    }
    if (state.mood) {
      const moods = {
        cream:  { cream: '#faf6ec', deep: '#f1ead8', paper: '#fffcf3', wood: '#3a2e23' },
        warm:   { cream: '#f7eedd', deep: '#ecdfc4', paper: '#fdf6e6', wood: '#3d2618' },
        cool:   { cream: '#f4f1e8', deep: '#e6e1d0', paper: '#fbf9f0', wood: '#2a2f33' },
        stone:  { cream: '#ede9e0', deep: '#dcd5c5', paper: '#f6f3eb', wood: '#2d2c28' },
      };
      const m = moods[state.mood] || moods.cream;
      root.style.setProperty('--cream', m.cream);
      root.style.setProperty('--cream-deep', m.deep);
      root.style.setProperty('--paper', m.paper);
      root.style.setProperty('--wood', m.wood);
    }
    if (state.fontPair) {
      const pairs = {
        cormorant: { serif: '"Cormorant Garamond", Georgia, serif' },
        playfair:  { serif: '"Playfair Display", Georgia, serif' },
        dmserif:   { serif: '"DM Serif Display", Georgia, serif' },
      };
      const p = pairs[state.fontPair] || pairs.cormorant;
      root.style.setProperty('--serif', p.serif);
    }
  }
  applyTweaks();

  function postTweak(key, value) {
    state[key] = value;
    applyTweaks();
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
    } catch (_) {}
    document.querySelectorAll(`[data-tweak="${key}"]`).forEach((el) => {
      el.querySelectorAll('[data-val]').forEach((b) => {
        b.classList.toggle('on', b.dataset.val === String(value));
      });
    });
  }

  // Build tweaks panel UI
  const panel = document.createElement('div');
  panel.className = 'tweaks-panel';
  panel.innerHTML = `
    <div class="tp-head">
      <span>Tweaks</span>
      <button class="tp-close" aria-label="închide">×</button>
    </div>
    <div class="tp-body">
      <div class="row" data-tweak="accent">
        <label>Accent</label>
        <div class="swatches">
          <button class="swatch" data-val="gold"     style="background:#a47e3e" title="Auriu"></button>
          <button class="swatch" data-val="burgundy" style="background:#8a3a3a" title="Bordo"></button>
          <button class="swatch" data-val="forest"   style="background:#4f6e4a" title="Pădure"></button>
          <button class="swatch" data-val="slate"    style="background:#4a5e72" title="Ardezie"></button>
        </div>
      </div>
      <div class="row" data-tweak="mood">
        <label>Atmosferă</label>
        <div class="segs">
          <button data-val="cream">Crem</button>
          <button data-val="warm">Cald</button>
          <button data-val="cool">Rece</button>
          <button data-val="stone">Piatră</button>
        </div>
      </div>
      <div class="row" data-tweak="fontPair">
        <label>Typografie</label>
        <div class="segs">
          <button data-val="cormorant">Cormorant</button>
          <button data-val="playfair">Playfair</button>
          <button data-val="dmserif">DM Serif</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  panel.querySelectorAll('[data-tweak]').forEach((row) => {
    const key = row.dataset.tweak;
    row.querySelectorAll('[data-val]').forEach((b) => {
      if (b.dataset.val === String(state[key])) b.classList.add('on');
      b.addEventListener('click', () => postTweak(key, b.dataset.val));
    });
  });

  panel.querySelector('.tp-close').addEventListener('click', () => {
    panel.classList.remove('open');
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (_) {}
  });

  window.addEventListener('message', (e) => {
    if (!e.data || !e.data.type) return;
    if (e.data.type === '__activate_edit_mode')   panel.classList.add('open');
    if (e.data.type === '__deactivate_edit_mode') panel.classList.remove('open');
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (_) {}
})();
