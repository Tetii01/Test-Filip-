// Ambientale Sibiu — Homepage

const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

// ───── Hero ─────
const Hero = () => {
  const ref = useRefH(null);
  useEffectH(() => {
    const id = requestAnimationFrame(() => {
      ref.current && ref.current.classList.add('in');
    });
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <section ref={ref} className="hero" id="top">
      <div className="bg">
        <div className="ambient-glow" />
        <div className="horizon" />
        <div className="horizon-glow" />
        <div className="horizon-rgb" />
      </div>
      <div className="grain" />
      <div className="wrap inner">
        <div className="eyebrow">
          <span className="line" />
          Atelier privat · Sibiu
          <span className="line" />
        </div>
        <h1>
          <span className="word">Redefinim</span>{' '}
          <span className="word">atmosfera</span><br />
          <span className="word">mașinii</span>{' '}
          <span className="word italic">tale.</span>
        </h1>
        <p className="sub">
          Lumini ambientale, plafoane înstelate și retapițare la milimetru — pentru interioare făcute în liniște deplină.
        </p>
        <div className="ctas">
          <a className="btn solid" href="configurator.html">
            Configurator
            <span className="arrow">→</span>
          </a>
          <a className="btn" href="#catalog">Vezi catalog</a>
        </div>
      </div>
      <a href="#servicii" className="scroll-cue" aria-label="Continuă scroll">
        <span>Scroll</span>
        <span className="line" />
      </a>
    </section>
  );
};

// ───── Services ─────
const ServiceMark = ({ kind }) => {
  if (kind === 'ambient') return (
    <svg viewBox="0 0 64 64" fill="none">
      <rect x="6" y="28" width="52" height="8" rx="4" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <rect x="6" y="28" width="52" height="8" rx="4" fill="url(#a-grad)" opacity="0.7" />
      <defs>
        <linearGradient id="a-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="var(--rgb-1)" />
          <stop offset="50%" stopColor="var(--rgb-2)" />
          <stop offset="100%" stopColor="var(--rgb-3)" />
        </linearGradient>
      </defs>
    </svg>
  );
  if (kind === 'stars') return (
    <svg viewBox="0 0 64 64" fill="none">
      {[[14,16],[28,10],[42,20],[52,12],[20,28],[34,34],[46,36],[56,28],[12,42],[24,48],[38,50],[48,46]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={1 + (i % 3) * 0.6} fill="currentColor" opacity={0.5 + (i%3)*0.18} />
      ))}
    </svg>
  );
  if (kind === 'alcantara') return (
    <svg viewBox="0 0 64 64" fill="none">
      <path d="M8 32 Q32 16 56 32 Q32 48 8 32 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.5" fill="none" />
      <path d="M8 32 Q32 22 56 32" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.7" fill="none" />
      <path d="M8 32 Q32 42 56 32" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.7" fill="none" />
    </svg>
  );
  if (kind === 'trim') return (
    <svg viewBox="0 0 64 64" fill="none">
      <rect x="10" y="10" width="44" height="44" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <rect x="10" y="10" width="44" height="22" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.85" fill="currentColor" fillOpacity="0.04" />
      <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
  return null;
};

const Services = () => {
  const items = [
    {
      idx: '01', kind: 'ambient',
      title: <>Lumini <em>ambientale</em></>,
      desc: 'Sistem RGB IC discret integrat în portiere, plafon și bord — controlat din aplicație, cu peste 64 de culori și animații dinamice.',
      feats: ['Control aplicație', '64+ culori', 'RGB IC dinamic', 'Sincron muzică'],
    },
    {
      idx: '02', kind: 'stars',
      title: <>Plafon <em>înstelat</em></>,
      desc: 'Fibră optică montată fir cu fir în plafon, cu opțiuni de meteoriți, constelație personalizată sau logo brodat în lumină.',
      feats: ['300–1000 puncte', 'Meteoriți', 'Logo personal', 'Garanție 24 luni'],
    },
    {
      idx: '03', kind: 'alcantara',
      title: <>Retapițare <em>plafon & stâlpi</em></>,
      desc: 'Alcantara originală sau textil premium, croit, lipit și cusut în atelierul propriu. Finisaj de bijutier la fiecare cusătură.',
      feats: ['Alcantara original', 'Cusătură contrast', 'Stâlpi A/B/C', 'Cer plafon'],
    },
    {
      idx: '04', kind: 'trim',
      title: <>Colantare <em>trimuri</em></>,
      desc: 'Vinil 3M, hidroprintare sau carbon real pentru bordul mașinii, butoane, mânere portiere și consolă centrală.',
      feats: ['Vinil 3M premium', 'Carbon real', 'Hidroprintare', 'Demontare profi'],
    },
  ];
  return (
    <section className="band" id="servicii">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="num">i.</div>
            <div className="eyebrow reveal">Ce facem</div>
            <h2 className="reveal" data-delay="1">Patru servicii, <span className="italic">o singură obsesie.</span></h2>
          </div>
          <div className="lede reveal" data-delay="2">
            Fiecare lucrare începe cu o consultare în atelier și se termină cu o livrare programată — fără surprize, fără compromisuri.
          </div>
        </div>
      </div>
      <div className="services reveal">
        {items.map((s, i) => (
          <article key={s.idx} className="service">
            <span className="visual"><ServiceMark kind={s.kind} /></span>
            <span className="idx">{s.idx}</span>
            <h3>{s.title}</h3>
            <p className="desc">{s.desc}</p>
            <div className="feats">
              {s.feats.map(f => <span key={f}>{f}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

// ───── Configurator CTA ─────
const ConfigCta = () => (
  <section className="config-cta">
    <div className="wrap">
      <div className="eyebrow reveal">Configurator personalizat</div>
      <h2 className="reveal" data-delay="1">
        Construiește-ți pachetul<br/>
        în <span className="italic">patru pași.</span>
      </h2>
      <p className="reveal" data-delay="2">
        Alegi serviciile, finisajele și detaliile — primești ofertă personalizată în 24 de ore. Fără apel, fără presiune.
      </p>
      <div className="reveal" data-delay="3">
        <a className="btn solid" href="configurator.html">
          Începe configurator
          <span className="arrow">→</span>
        </a>
      </div>
      <div className="meta reveal" data-delay="4">
        <span>~ 2 minute</span>
        <span>·</span>
        <span>Ofertă în 24h</span>
        <span>·</span>
        <span>Fără obligație</span>
      </div>
    </div>
  </section>
);

// ───── Catalog (masonry) ─────
const CATALOG = [
  { h: 320, cat: 'Plafon',     tag: 'Stele',    title: 'BMW Seria 7 · plafon premium',  art: 'starry' },
  { h: 220, cat: 'Lumini',     tag: 'Ambient',  title: 'Audi RS6 · portiere RGB',        art: 'violet' },
  { h: 280, cat: 'Retapițare', tag: 'Alcantara',title: 'Plafon Mercedes E · cusătură',   art: 'alcantara' },
  { h: 360, cat: 'Plafon',     tag: 'Meteoriți',title: 'Range Rover · meteoriți',        art: 'starry' },
  { h: 240, cat: 'Lumini',     tag: 'Ambient',  title: 'Porsche Macan · bord + plafon',  art: 'cyan' },
  { h: 200, cat: 'Trimuri',    tag: 'Carbon',   title: 'Volan M5 · carbon real',         art: 'carbon' },
  { h: 300, cat: 'Plafon',     tag: 'Stele',    title: 'Maybach S · constelație',        art: 'starry' },
  { h: 260, cat: 'Retapițare', tag: 'Alcantara',title: 'Stâlpi A/B AMG GT · alcantara',  art: 'beige' },
  { h: 220, cat: 'Lumini',     tag: 'RGB IC',   title: 'Tesla Model S · sync muzică',    art: 'red-line' },
  { h: 320, cat: 'Trimuri',    tag: 'Vinil',    title: 'Consolă centrală · butoane',     art: 'amber' },
  { h: 240, cat: 'Lumini',     tag: 'Ambient',  title: 'Mercedes GLE · ambient violet',  art: 'violet' },
  { h: 280, cat: 'Plafon',     tag: 'Stele',    title: 'Audi Q8 · stele dense',          art: 'starry' },
];

const Catalog = () => {
  const [filter, setFilter] = useStateH('Toate');
  const cats = ['Toate', 'Lumini', 'Plafon', 'Retapițare', 'Trimuri'];
  const shown = filter === 'Toate' ? CATALOG : CATALOG.filter(c => c.cat === filter);
  useEffectH(() => {
    requestAnimationFrame(() => initReveals());
  }, [filter]);
  return (
    <section className="band" id="catalog">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="num">ii.</div>
            <div className="eyebrow reveal">Catalog · lucrări</div>
            <h2 className="reveal" data-delay="1">Din <span className="italic">atelier.</span></h2>
          </div>
          <div className="lede reveal" data-delay="2">
            Selecție de lucrări recente. Imagini de prezentare — pe parcurs vor fi înlocuite cu fotografiile reale ale fiecărei lucrări finalizate.
          </div>
        </div>

        <div className="gallery-controls reveal">
          {cats.map(c => (
            <button key={c} className={'chip' + (filter === c ? ' on' : '')} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
          <span className="count">{shown.length} lucrări</span>
        </div>

        <div className="masonry">
          {shown.map((it, i) => (
            <article key={it.title + i} className="tile reveal" data-delay={(i % 4) + 1}>
              <div className="ph" style={{ height: it.h }}>
                <div className={`ph-grad ${it.art}`}>
                  <span className="ph-hint">photo</span>
                </div>
              </div>
              <div className="meta">
                <span>{it.title}</span>
                <span className="tag">{it.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───── Contact form ─────
const SERVICE_PICKS = [
  'Lumini ambientale',
  'Plafon înstelat',
  'Retapițare plafon',
  'Stâlpi alcantara',
  'Colantare trim',
  'Pachet complet',
];

const Contact = () => {
  const [picks, setPicks] = useStateH(() => {
    try {
      const s = JSON.parse(localStorage.getItem('amb-config-summary') || '{}');
      const fromConfig = [];
      if (s.lights && s.lights.length) fromConfig.push('Lumini ambientale');
      if (s.stars && s.stars.length) fromConfig.push('Plafon înstelat');
      if (s.trim && s.trim.length) {
        if (s.trim.some(t => t.toLowerCase().includes('alcantara'))) fromConfig.push('Stâlpi alcantara');
        if (s.trim.some(t => t.toLowerCase().includes('plafon'))) fromConfig.push('Retapițare plafon');
        if (s.trim.some(t => t.toLowerCase().includes('carbon') || t.toLowerCase().includes('vinil'))) fromConfig.push('Colantare trim');
      }
      return [...new Set(fromConfig)];
    } catch { return []; }
  });
  const [sent, setSent] = useStateH(false);
  const toggle = (s) => setPicks(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section className="band" id="contact">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="num">iii.</div>
            <div className="eyebrow reveal">Programare</div>
            <h2 className="reveal" data-delay="1">Hai să <span className="italic">vorbim.</span></h2>
          </div>
          <div className="lede reveal" data-delay="2">
            Lasă-ne câteva detalii și te sunăm înapoi în maxim 24 de ore lucrătoare. Sau sună direct, dacă preferi.
          </div>
        </div>

        <div className="contact-grid">
          <form className="contact-form reveal" onSubmit={submit}>
            <div className="field">
              <label>Nume</label>
              <input type="text" placeholder="ex. Radu Popescu" required />
            </div>
            <div className="field">
              <label>Telefon</label>
              <input type="tel" placeholder="07__ ___ ___" required />
            </div>
            <div className="field">
              <label>Mașina</label>
              <input type="text" placeholder="ex. BMW Seria 5, 2022" required />
            </div>

            <div className="field">
              <label>Servicii dorite</label>
              <div className="services-pick" style={{ marginTop: 4 }}>
                {SERVICE_PICKS.map(s => (
                  <div key={s} className={'pick' + (picks.includes(s) ? ' on' : '')} onClick={() => toggle(s)}>
                    <span className="box">
                      <svg viewBox="0 0 12 12"><path d="M2 6.5 L5 9 L10 3" stroke="var(--bg-100)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="name">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Mesaj (opțional)</label>
              <textarea placeholder="Detalii suplimentare, preferințe de culoare, model exact…" rows="3"></textarea>
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginTop: 8 }}>
              <button type="submit" className="btn solid">
                {sent ? 'Mulțumim! Te sunăm.' : 'Trimite cerere'}
                <span className="arrow">→</span>
              </button>
              <a className="btn" href="tel:+40759758815">
                <PhoneIcon />
                <span>Sună · 0759 758 815</span>
              </a>
            </div>
          </form>

          <aside className="contact-side reveal" data-delay="2">
            <div className="card">
              <h4>Atelier</h4>
              <div className="row">
                <span className="ico"><PinIcon /></span>
                <div>
                  <span className="lbl">Adresă</span>
                  <span className="val">Sibiu, România</span>
                </div>
              </div>
              <div className="row">
                <span className="ico"><PhoneIcon /></span>
                <div>
                  <span className="lbl">Telefon</span>
                  <span className="val">0759 758 815</span>
                </div>
              </div>
            </div>
            <div className="card">
              <h4>Social</h4>
              <div className="row">
                <span className="ico"><InstagramIcon /></span>
                <div>
                  <span className="lbl">Instagram</span>
                  <a className="val" href="https://www.instagram.com/ambientale.sibiu" target="_blank" rel="noopener">@ambientale.sibiu</a>
                </div>
              </div>
              <div className="row">
                <span className="ico"><TiktokIcon /></span>
                <div>
                  <span className="lbl">TikTok</span>
                  <a className="val" href="https://www.tiktok.com/@ambientale.sibiu" target="_blank" rel="noopener">@ambientale.sibiu</a>
                </div>
              </div>
            </div>
            <div className="card" style={{ background: 'transparent', borderStyle: 'dashed' }}>
              <h4>Răspuns</h4>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic', color: 'var(--ink-100)' }}>
                În <span style={{ color: 'var(--accent)' }}>24 ore</span> lucrătoare.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

// ───── FAQ ─────
const FAQ_ITEMS = [
  {
    q: 'Cât durează montajul plafonului înstelat?',
    a: 'Între 6 și 10 ore, în funcție de densitatea aleasă (300, 600 sau 1000 puncte) și de finisajul cerut la plafon — textil simplu sau alcantara cu cusătură. Mașina rămâne în atelier o zi.'
  },
  {
    q: 'Afectează montajul garanția mașinii?',
    a: 'Nu — toate intervențiile sunt reversibile și folosim cablaje cu mufe originale, fără tăieri în harnașul mașinii. Garanția producătorului rămâne intactă.'
  },
  {
    q: 'Aplicația de control este pe iOS și Android?',
    a: 'Da. Sistemul nostru folosește un modul Bluetooth dedicat și o aplicație disponibilă pe ambele platforme — controlezi culorile, animațiile, sincronizarea cu muzica și luminozitatea.'
  },
  {
    q: 'Pot să aleg o constelație personalizată?',
    a: 'Da — zodia, data nașterii, harta cerului dintr-o anumită noapte. Lucrăm pe baza unei machete pe care o aprobi înainte de execuție. Costul depinde de complexitate.'
  },
  {
    q: 'Cât costă un pachet complet pentru o mașină medie?',
    a: 'Estimările sunt strict personalizate — depind de marcă, model, finisaj și opțiuni. Configurează-ți pachetul în pagina dedicată și primești ofertă în 24 ore.'
  },
  {
    q: 'Oferiți garanție la retapițare în alcantara?',
    a: 'Da, 24 de luni la materiale și execuție. Folosim alcantara originală italiană și adezivi profesionali rezistenți la temperaturile interiorului auto pe vară.'
  },
];

const FAQ = () => (
  <section className="band" id="faq">
    <div className="wrap">
      <div className="section-head">
        <div>
          <div className="num">iv.</div>
          <div className="eyebrow reveal">Răspunsuri</div>
          <h2 className="reveal" data-delay="1">Întrebări <span className="italic">frecvente.</span></h2>
        </div>
        <div className="lede reveal" data-delay="2">
          Dacă nu găsești răspunsul aici, sună-ne sau scrie pe Instagram — răspundem rapid.
        </div>
      </div>

      <div className="faq reveal">
        {FAQ_ITEMS.map((it, i) => (
          <details key={i} {...(i === 0 ? { open: true } : {})}>
            <summary>
              <span>{it.q}</span>
              <span className="plus">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <line x1="7" y1="2" x2="7" y2="12" />
                  <line x1="2" y1="7" x2="12" y2="7" />
                </svg>
              </span>
            </summary>
            <div className="ans">{it.a}</div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// ───── App ─────
const HomeApp = () => {
  useGlobalTweaks();
  useEffectH(() => {
    initReveals();
  }, []);
  return (
    <>
      <SiteHeader active="home" />
      <Hero />
      <Services />
      <ConfigCta />
      <Catalog />
      <Contact />
      <FAQ />
      <SiteFooter />
      <GlobalTweaks />
    </>
  );
};

const __home_root = ReactDOM.createRoot(document.getElementById('root'));
__home_root.render(<HomeApp />);
