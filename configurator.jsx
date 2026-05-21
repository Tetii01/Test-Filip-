// Ambientale Sibiu — Configurator (dedicated multi-step page)

const { useState: useStateC, useEffect: useEffectC, useMemo: useMemoC } = React;

const STEPS = [
  {
    id: 'pack', single: true,
    title: <>Ce vrei <span className="italic">să atingi?</span></>,
    hint: 'Începem cu obiectivul. Poți alege o execuție completă sau o singură intervenție focusată — totul rămâne configurabil în pașii următori.',
    options: [
      { id: 'full',    title: 'Pachet complet',   desc: 'Lumini + plafon + retapițare. Cea mai populară alegere pentru o transformare reală.', price: 'estimare la cerere' },
      { id: 'lights',  title: 'Doar lumini',      desc: 'Sistem ambient RGB IC, controlat din aplicație. Cea mai vizibilă schimbare pentru bugetul investit.' },
      { id: 'stars',   title: 'Doar plafon înstelat', desc: 'Fibră optică punct cu punct, cu opțiuni de meteoriți și constelație personalizată.' },
      { id: 'trim',    title: 'Doar retapițare / colantare', desc: 'Alcantara, textil premium sau vinil pentru plafon, stâlpi și trimuri.' },
    ],
  },
  {
    id: 'lights', dependsOn: pack => ['full','lights'].includes(pack),
    title: <>Lumini <span className="italic">ambientale</span></>,
    hint: 'Bifează una sau mai multe — toate sunt compatibile între ele. Sistemul nostru folosește bandă RGB IC cu control individual pe LED.',
    options: [
      { id: 'app',    title: 'Control aplicație',     desc: '64+ culori, animații dinamice, scene salvate, iOS și Android.' },
      { id: 'doors',  title: 'Portiere',              desc: 'Bandă discretă pe toate cele 4 portiere, integrată în trim.' },
      { id: 'roof',   title: 'Plafon (linie LED)',    desc: 'Linie continuă de la stâlpul A până la cel C — efect "cer LED".' },
      { id: 'dash',   title: 'Bord & consolă',        desc: 'Sub bord și pe consola centrală, cu difuzie controlată.' },
      { id: 'music',  title: 'Sincronizare muzică',   desc: 'LED-urile reacționează la beat în timp real.' },
      { id: 'rgbic',  title: 'RGB IC dinamic',        desc: 'Efecte de curgere, val, comet — fiecare LED controlat independent.' },
    ],
  },
  {
    id: 'stars', dependsOn: pack => ['full','stars'].includes(pack),
    title: <>Plafon <span className="italic">înstelat</span></>,
    hint: 'Densitatea, efectele și personalizarea. Lucrăm fir cu fir, în alcantara sau textil — la alegere.',
    options: [
      { id: 'd300',   title: 'Densitate standard',  desc: '≈ 300 puncte. Efect discret, elegant.' },
      { id: 'd600',   title: 'Densitate premium',   desc: '≈ 600 puncte. Cer dens, recomandare populară.' },
      { id: 'd1000',  title: 'Densitate maximă',    desc: '≈ 1000 puncte. Pentru cei care vor "totul".' },
      { id: 'meteor', title: 'Cu meteoriți',        desc: 'Trasee LED care traversează plafonul aleator.' },
      { id: 'logo',   title: 'Logo personalizat',   desc: 'Logo de marcă sau monogramă brodată în lumină.' },
      { id: 'consl',  title: 'Constelație custom',  desc: 'Zodia ta sau harta cerului dintr-o dată anume.' },
    ],
  },
  {
    id: 'trim', dependsOn: pack => ['full','trim'].includes(pack),
    title: <>Retapițare & <span className="italic">colantare</span></>,
    hint: 'Materialele și suprafețele tratate. Lucrăm cu alcantara originală italiană și vinil 3M premium.',
    options: [
      { id: 'p-alc',  title: 'Plafon alcantara',      desc: 'Alcantara originală cu cusătură pe linia centrală.' },
      { id: 'p-txt',  title: 'Plafon textil premium', desc: 'Textil tip Mercedes-Benz, în 6 nuanțe de negru/antracit.' },
      { id: 's-alc',  title: 'Stâlpi A/B/C alcantara', desc: 'Cei 6 stâlpi îmbrăcați perfect, fără cute vizibile.' },
      { id: 't-crb',  title: 'Trimuri carbon real',   desc: 'Plăci de carbon real cu finisaj UV pentru bord și consolă.' },
      { id: 't-vnl',  title: 'Trimuri vinil (3M)',    desc: 'Colantare profi pentru butoane, mânere, console.' },
      { id: 't-pln',  title: 'Volan reîmbrăcat',      desc: 'Piele sau alcantara, cu cusătură contrast.' },
    ],
  },
  {
    id: 'extras', single: false,
    title: <>Atingeri <span className="italic">finale</span></>,
    hint: 'Detalii care fac diferența. Opționale, dar des cerute.',
    options: [
      { id: 'consult',  title: 'Consultație în atelier',  desc: 'Vii cu mașina, decidem totul împreună înainte de execuție.' },
      { id: 'photoset', title: 'Sesiune foto la finalizare', desc: 'Primești 10 fotografii profesionale ale rezultatului.' },
      { id: 'mainten',  title: 'Pachet întreținere 12 luni', desc: 'Verificare gratuită + retușuri minore timp de un an.' },
      { id: 'rush',     title: 'Execuție prioritară',     desc: 'Programare în 7 zile. Disponibilitate limitată.' },
    ],
  },
  {
    id: 'contact', kind: 'contact',
    title: <>Date <span className="italic">de contact</span></>,
    hint: 'Ultimul pas. Îți trimitem oferta personalizată pe telefon sau email — alegi tu canalul.',
  },
];

// ─── Visible steps ─────────────────────────────────────────────────────────
function getVisibleSteps(selections) {
  const pack = (selections.pack || [])[0];
  return STEPS.filter(s => !s.dependsOn || s.dependsOn(pack));
}

// ─── Summary aside ─────────────────────────────────────────────────────────
const Summary = ({ selections }) => {
  const pack = (selections.pack || [])[0];
  const packLabel = {
    full: 'Pachet complet', lights: 'Doar lumini',
    stars: 'Doar plafon înstelat', trim: 'Doar retapițare'
  }[pack];

  const lookup = (stepId) => {
    const step = STEPS.find(s => s.id === stepId);
    if (!step || !step.options) return [];
    const ids = selections[stepId] || [];
    return ids.map(id => step.options.find(o => o.id === id)?.title).filter(Boolean);
  };

  const lights = lookup('lights');
  const stars  = lookup('stars');
  const trim   = lookup('trim');
  const extras = lookup('extras');

  const totalCount = lights.length + stars.length + trim.length + extras.length + (pack ? 1 : 0);

  return (
    <div className="summary-card">
      <div className="eyebrow">Pachetul tău</div>
      <div className="package-name">
        {packLabel ? <>{packLabel.replace(/Doar /, '')}<br/><em>în construcție.</em></> : <>Niciun pachet <em>selectat încă.</em></>}
      </div>

      {pack && (
        <div className="summary-section">
          <div className="lbl">Direcție</div>
          <div className="items"><span className="it">{packLabel}</span></div>
        </div>
      )}
      {lights.length > 0 && (
        <div className="summary-section">
          <div className="lbl">Lumini ambientale</div>
          <div className="items">{lights.map(l => <span key={l} className="it">{l}</span>)}</div>
        </div>
      )}
      {stars.length > 0 && (
        <div className="summary-section">
          <div className="lbl">Plafon înstelat</div>
          <div className="items">{stars.map(l => <span key={l} className="it">{l}</span>)}</div>
        </div>
      )}
      {trim.length > 0 && (
        <div className="summary-section">
          <div className="lbl">Retapițare / colantare</div>
          <div className="items">{trim.map(l => <span key={l} className="it">{l}</span>)}</div>
        </div>
      )}
      {extras.length > 0 && (
        <div className="summary-section">
          <div className="lbl">Atingeri finale</div>
          <div className="items">{extras.map(l => <span key={l} className="it">{l}</span>)}</div>
        </div>
      )}

      <div className="summary-total">
        <span className="lbl">{totalCount} {totalCount === 1 ? 'selecție' : 'selecții'}</span>
        <span className="val">la cerere</span>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, lineHeight: 1.7, color: 'var(--ink-400)' }}>
        Estimările exacte depind de marca, modelul și anul mașinii — le primești după trimiterea cererii.
      </p>
    </div>
  );
};

// ─── Step content ─────────────────────────────────────────────────────────
const StepOptions = ({ step, selected = [], onToggle }) => (
  <div className="options-grid">
    {step.options.map(o => {
      const isOn = selected.includes(o.id);
      return (
        <div key={o.id} className={'option' + (isOn ? ' on' : '')} onClick={() => onToggle(o.id, step.single)}>
          <span className={'box' + (step.single ? ' radio' : '')}>
            {step.single
              ? <span className="inner" />
              : <svg viewBox="0 0 12 12"><path d="M2 6.5 L5 9 L10 3" stroke="var(--bg-100)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            }
          </span>
          <span className="label">
            <span className="title">{o.title}</span>
            <span className="desc">{o.desc}</span>
          </span>
          {o.price && <span className="price">{o.price}</span>}
        </div>
      );
    })}
  </div>
);

const ContactStep = ({ values, onChange }) => (
  <div className="contact-form" style={{ marginTop: 12 }}>
    <div className="field">
      <label>Nume</label>
      <input type="text" placeholder="ex. Radu Popescu" value={values.name || ''} onChange={e => onChange('name', e.target.value)} />
    </div>
    <div className="field">
      <label>Telefon</label>
      <input type="tel" placeholder="07__ ___ ___" value={values.phone || ''} onChange={e => onChange('phone', e.target.value)} />
    </div>
    <div className="field">
      <label>Mașina · marcă, model, an</label>
      <input type="text" placeholder="ex. BMW Seria 5, 2022" value={values.car || ''} onChange={e => onChange('car', e.target.value)} />
    </div>
    <div className="field">
      <label>Mesaj suplimentar (opțional)</label>
      <textarea rows="3" placeholder="Preferințe de culoare, urgență, alte detalii…" value={values.msg || ''} onChange={e => onChange('msg', e.target.value)}></textarea>
    </div>
  </div>
);

// ─── Configurator App ─────────────────────────────────────────────────────
const ConfiguratorApp = () => {
  useGlobalTweaks();

  const [selections, setSelections] = useStateC(() => {
    try { return JSON.parse(localStorage.getItem('amb-config') || '{}'); } catch { return {}; }
  });
  const [contact, setContact] = useStateC({});
  const [idx, setIdx] = useStateC(0);
  const [sent, setSent] = useStateC(false);

  useEffectC(() => {
    localStorage.setItem('amb-config', JSON.stringify(selections));
  }, [selections]);

  useEffectC(() => { initReveals(); }, []);

  const visible = useMemoC(() => getVisibleSteps(selections), [selections]);
  const safeIdx = Math.min(idx, visible.length - 1);
  const step = visible[safeIdx];
  const totalSteps = visible.length;

  // when pack changes, reset later selections that aren't visible anymore
  useEffectC(() => {
    setSelections(s => {
      const visibleIds = new Set(getVisibleSteps(s).map(x => x.id));
      const next = {};
      for (const k of Object.keys(s)) if (visibleIds.has(k)) next[k] = s[k];
      return next;
    });
  }, [(selections.pack || [])[0]]);

  const toggle = (id, single) => {
    setSelections(s => {
      const cur = s[step.id] || [];
      if (single) return { ...s, [step.id]: [id] };
      return { ...s, [step.id]: cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id] };
    });
  };

  const next = () => {
    if (safeIdx < totalSteps - 1) {
      setIdx(safeIdx + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const prev = () => {
    if (safeIdx > 0) {
      setIdx(safeIdx - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canAdvance = step?.kind === 'contact'
    ? !!(contact.name && contact.phone && contact.car)
    : (step?.options ? (selections[step.id]?.length > 0) : true);

  const submit = () => {
    const lookup = (stepId) => {
      const stp = STEPS.find(s => s.id === stepId);
      if (!stp || !stp.options) return [];
      return (selections[stepId] || []).map(id => stp.options.find(o => o.id === id)?.title).filter(Boolean);
    };
    const summary = {
      pack:    selections.pack?.[0] || null,
      lights:  lookup('lights'),
      stars:   lookup('stars'),
      trim:    lookup('trim'),
      extras:  lookup('extras'),
      contact,
    };
    localStorage.setItem('amb-config-summary', JSON.stringify(summary));
    setSent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (sent) {
    return (
      <>
        <SiteHeader active="config" />
        <main className="config-page" style={{ gridTemplateColumns: '1fr' }}>
          <section className="config-main">
            <div className="config-success">
              <div className="check">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14 L12 20 L22 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2>Mulțumim, <em>{contact.name?.split(' ')[0] || 'mulțumim'}.</em></h2>
              <p>
                Am primit configurația și datele tale. Te sunăm înapoi în maxim 24 ore lucrătoare cu oferta personalizată pentru <strong style={{ color: 'var(--ink-100)' }}>{contact.car || 'mașina ta'}</strong>.
              </p>
              <div style={{ display: 'inline-flex', gap: 12, marginTop: 8 }}>
                <a className="btn solid" href="index.html">Înapoi acasă</a>
                <a className="btn" href="tel:+40759758815">Sună acum</a>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
        <GlobalTweaks />
      </>
    );
  }

  return (
    <>
      <SiteHeader active="config" />
      <main className="config-page">
        <section className="config-main">
          <div className="config-intro">
            <div className="eyebrow">Configurator · 24h ofertă</div>
            <h1>Construiește-ți <span className="italic">pachetul.</span></h1>
            <p>Pas cu pas, fără apel, fără presiune. La final primești oferta pe telefon — în maxim 24 ore lucrătoare.</p>
          </div>

          <div className="config-progress" aria-label={`Pasul ${safeIdx + 1} din ${totalSteps}`}>
            {visible.map((_, i) => (
              <div key={i} className={'pip' + (i < safeIdx ? ' done' : i === safeIdx ? ' current' : '')} />
            ))}
          </div>

          {step && (
            <div className="config-step active" key={step.id}>
              <div className="step-meta">
                <span className="step-num">{String(safeIdx + 1).padStart(2, '0')}.</span>
                <span className="step-of">Pasul {safeIdx + 1} din {totalSteps}</span>
              </div>
              <h2>{step.title}</h2>
              <p className="hint">{step.hint}</p>

              {step.kind === 'contact'
                ? <ContactStep values={contact} onChange={(k, v) => setContact(c => ({ ...c, [k]: v }))} />
                : <StepOptions step={step} selected={selections[step.id] || []} onToggle={toggle} />
              }

              <div className="config-actions">
                {safeIdx > 0 && (
                  <button className="btn ghost" onClick={prev}>← Înapoi</button>
                )}
                <span className="spacer" />
                {step.kind === 'contact' ? (
                  <button className="btn solid" onClick={submit} disabled={!canAdvance} style={!canAdvance ? { opacity: 0.45, cursor: 'not-allowed' } : {}}>
                    Trimite cerere <span className="arrow">→</span>
                  </button>
                ) : (
                  <button className="btn solid" onClick={next} disabled={!canAdvance} style={!canAdvance ? { opacity: 0.45, cursor: 'not-allowed' } : {}}>
                    Continuă <span className="arrow">→</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        <aside className="config-aside">
          <Summary selections={selections} />
        </aside>
      </main>
      <SiteFooter />
      <GlobalTweaks />
    </>
  );
};

const __config_root = ReactDOM.createRoot(document.getElementById('root'));
__config_root.render(<ConfiguratorApp />);
