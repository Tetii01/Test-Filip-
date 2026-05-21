// Ambientale Sibiu — shared hi-fi components

const { useState, useEffect, useRef, useCallback } = React;

// ───── Reveal-on-scroll hook ─────
function useReveal(threshold = 0.15) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// Standalone DOM-side reveal init (so it works without React on init)
function initReveals() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(el => io.observe(el));
}

// ───── Logo mark (Concept 01 — radial fiber burst) ─────
const BrandMark = ({ size = 28 }) => (
  <svg className="brand-mark" width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const x2 = 32 + Math.cos(a) * 27;
      const y2 = 32 + Math.sin(a) * 27;
      const x1 = 32 + Math.cos(a) * 8;
      const y1 = 32 + Math.sin(a) * 8;
      return (
        <line key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="var(--accent)" strokeWidth="0.7"
          opacity={0.4 + (i % 3) * 0.18} strokeLinecap="round" />
      );
    })}
    <circle cx="32" cy="32" r="29" stroke="var(--accent)" strokeWidth="0.4" opacity="0.25" />
    <circle cx="32" cy="32" r="2.6" fill="var(--accent)" />
    <circle cx="32" cy="32" r="6" stroke="var(--accent)" strokeWidth="0.5" opacity="0.55" />
  </svg>
);

// ───── Brand lockup (mark + wordmark) ─────
const BrandLockup = ({ size = 28, layout = 'horizontal' }) => {
  const isV = layout === 'vertical';
  return (
    <a href="index.html" className="lockup" aria-label="Ambientale Sibiu — acasă"
       style={{ flexDirection: isV ? 'column' : 'row' }}>
      <BrandMark size={size + 14} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isV ? 'center' : 'flex-start' }}>
        <span className="word" style={{ fontSize: size * 0.78 }}>Ambientale</span>
        <span className="place">Sibiu — Atelier</span>
      </div>
    </a>
  );
};

// ───── Site header / sticky nav ─────
const SiteHeader = ({ active = 'home' }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const items = [
    { id: 'home',   href: 'index.html#top',         label: 'Acasă' },
    { id: 'serv',   href: 'index.html#servicii',    label: 'Servicii' },
    { id: 'cat',    href: 'index.html#catalog',     label: 'Catalog' },
    { id: 'config', href: 'configurator.html',      label: 'Configurator' },
    { id: 'faq',    href: 'index.html#faq',         label: 'FAQ' },
    { id: 'cont',   href: 'index.html#contact',     label: 'Contact' },
  ];
  return (
    <header className={'site-header' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap nav">
        <BrandLockup size={18} />
        <nav>
          <ul>
            {items.map(it => (
              <li key={it.id}>
                <a href={it.href} className={active === it.id ? 'active' : ''}>{it.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="phone" href="tel:+40759758815">
          <span className="dot" />
          0759 758 815
        </a>
      </div>
    </header>
  );
};

// ───── Footer ─────
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M14 4c.5 2.5 2.5 4 5 4.2v3c-2 0-3.6-.5-5-1.5v6.8a5.3 5.3 0 1 1-5.3-5.3c.4 0 .7 0 1 .1V14c-.3-.1-.6-.2-1-.2a2.3 2.3 0 1 0 2.3 2.3V4z" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h3l2 5-2 1c1 2 3 4 5 5l1-2 5 2v3c0 1-1 2-2 2A14 14 0 0 1 3 6c0-1 1-2 2-2z" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

const SiteFooter = () => (
  <footer className="site-footer">
    <div className="wrap">
      <div className="top">
        <div>
          <BrandLockup size={20} />
          <p className="about-line">
            Atelier privat în Sibiu. Lumini ambientale, plafoane înstelate și retapițare premium — pentru interioare făcute în liniște deplină.
          </p>
        </div>
        <div>
          <h5>Servicii</h5>
          <ul>
            <li><a href="index.html#servicii">Lumini ambientale</a></li>
            <li><a href="index.html#servicii">Plafon înstelat</a></li>
            <li><a href="index.html#servicii">Retapițare alcantara</a></li>
            <li><a href="index.html#servicii">Colantare trim</a></li>
          </ul>
        </div>
        <div>
          <h5>Atelier</h5>
          <ul>
            <li><a href="tel:+40759758815">0759 758 815</a></li>
            <li><a href="index.html#contact">Sibiu, România</a></li>
            <li><a href="index.html#contact">Lu–Vi · 9:00–19:00</a></li>
            <li><a href="configurator.html">Configurator</a></li>
          </ul>
        </div>
        <div>
          <h5>Social</h5>
          <ul>
            <li><a href="https://www.instagram.com/ambientale.sibiu" target="_blank" rel="noopener">Instagram ↗</a></li>
            <li><a href="https://www.tiktok.com/@ambientale.sibiu" target="_blank" rel="noopener">TikTok ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="bottom">
        <span>© 2026 Ambientale Sibiu</span>
        <span>EST. 2021</span>
        <span>Premium auto interiors</span>
      </div>
    </div>
  </footer>
);

// ───── Tweaks panel (shared) ─────
const TWEAK_DEFAULTS_HIFI = /*EDITMODE-BEGIN*/{
  "accent": "#c8c8d0",
  "theme": "dark"
}/*EDITMODE-END*/;

const ACCENT_SWATCHES_HIFI = ['#c8c8d0', '#d4af37', '#6ad9ff', '#ff5dc8', '#b06aff'];

function useGlobalTweaks() { return [TWEAK_DEFAULTS_HIFI, () => {}]; }

const GlobalTweaks = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS_HIFI);
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = tweaks.theme || 'dark';
    root.style.setProperty('--accent', tweaks.accent || '#c8c8d0');
  }, [tweaks.theme, tweaks.accent]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Atmosferă" />
      <TweakRadio
        label="Temă"
        value={tweaks.theme}
        options={[
          { value: 'dark',  label: 'Întunecat' },
          { value: 'light', label: 'Lumină' },
        ]}
        onChange={v => setTweak('theme', v)}
      />
      <TweakColor
        label="Accent"
        value={tweaks.accent}
        options={ACCENT_SWATCHES_HIFI}
        onChange={v => setTweak('accent', v)}
      />
      <TweakSection label="Note" />
      <div style={{ fontSize: 11, lineHeight: 1.5, color: 'rgba(41,38,27,.58)', padding: '0 2px' }}>
        Argintiu = stilul Bentley/Aston. RGB = atmosfera ambient. Schimbarea persistă între pagini.
      </div>
    </TweaksPanel>
  );
};

Object.assign(window, {
  useReveal, initReveals, BrandMark, BrandLockup, SiteHeader, SiteFooter,
  GlobalTweaks, useGlobalTweaks,
  InstagramIcon, TiktokIcon, PhoneIcon, PinIcon,
});
