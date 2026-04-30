// desktop-app.jsx — desktop root

const DT_DEFAULTS = /*EDITMODE-BEGIN*/{
  "campaign": "vni",
  "showThanks": false,
  "heroDark": true,
  "signatureCount": 8331,
  "counterTicks": true,
  "showExitPopup": false
}/*EDITMODE-END*/;

function DesktopApp() {
  const [t, setTweak] = useTweaks(DT_DEFAULTS);
  const [route, setRoute] = React.useState('home');
  const [count, setCount] = React.useState(t.signatureCount);
  const [exitOpen, setExitOpen] = React.useState(false);

  React.useEffect(() => {
    if (!t.counterTicks) return;
    const id = setInterval(() => setCount(c => c + Math.floor(Math.random() * 3) + 1), 4500);
    return () => clearInterval(id);
  }, [t.counterTicks]);

  React.useEffect(() => { setCount(t.signatureCount); }, [t.signatureCount]);
  React.useEffect(() => { if (t.showExitPopup) setExitOpen(true); }, [t.showExitPopup]);
  React.useEffect(() => { if (window.__forceSigned) window.__forceSigned(t.showThanks); }, [t.showThanks, route]);

  const onNav = (r) => {
    setRoute(r);
    setTweak('showThanks', false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 0);
  };
  const onSign = () => setCount(c => c + 1);

  React.useEffect(() => {
    if (route.startsWith('campaign-')) onNav(`campaign-${t.campaign}`);
  }, [t.campaign]);

  const routeCampaign = route.startsWith('campaign-') ? route.replace('campaign-', '') : null;
  const activeCampaign = CAMPAIGNS[routeCampaign] || CAMPAIGNS[t.campaign];

  let pageEl = null;
  if (route === 'home') pageEl = <DTHomePage totalSigs={count} onNav={onNav} heroDark={t.heroDark} />;
  else if (route.startsWith('campaign-')) pageEl = <DTCampaignHub campaign={activeCampaign} count={count} onSign={onSign} onNav={onNav} />;
  else if (route === 'donate') pageEl = (
    <DTSimplePage title="Fund the Fight" lead={<>EVERY DOLLAR PUTS THE NEXT AD <span className="gold-word">IN FRONT OF VOTERS.</span></>}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <ul className="dt-impact-list" style={{ marginBottom: 24 }}>
          <li className="dt-impact" style={{ background: 'var(--purple-faint)', color: 'var(--charcoal)', borderLeftColor: 'var(--purple)' }}><b style={{ color: 'var(--purple)' }}>$10</b> prints 50 flyers for a letterbox drop</li>
          <li className="dt-impact" style={{ background: 'var(--purple-faint)', color: 'var(--charcoal)', borderLeftColor: 'var(--purple)' }}><b style={{ color: 'var(--purple)' }}>$25</b> funds one day of petition advertising</li>
          <li className="dt-impact" style={{ background: 'var(--purple-faint)', color: 'var(--charcoal)', borderLeftColor: 'var(--purple)' }}><b style={{ color: 'var(--purple)' }}>$100</b> puts an ad in front of 5,000 voters</li>
        </ul>
        <DonateWidget embedded />
      </div>
    </DTSimplePage>
  );
  else if (route === 'about') pageEl = (
    <DTSimplePage title="About Moira" lead={<>MOIRA <span className="gold-word">DEEMING</span> MP</>}>
      <div className="dt-twocol" style={{ alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: 18, lineHeight: 1.6, marginTop: 0 }}>
            Member for Western Metropolitan Region in the Victorian Legislative Council. Public school teacher. Mother of four. Independent voice in a Parliament that's stopped listening.
          </p>
          <p style={{ fontSize: 16, color: 'var(--grey)', lineHeight: 1.6 }}>
            I came into Parliament to defend the things teachers, mothers, and tradies tell me they care about — fair laws, real consequences, and the freedom to raise your kids your way.
          </p>
        </div>
        <div className="value-list">
          {VALUES.map((v, i) => (
            <div className="value-card" key={i}>
              <h4>{v.ttl}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </DTSimplePage>
  );
  else if (route === 'news') pageEl = (
    <DTSimplePage title="News &amp; Updates" lead={<>FROM THE <span className="gold-word">CHAMBER</span></>}>
      <div className="dt-news-grid">
        {NEWS.map((n, i) => (
          <div className="dt-news" key={i}>
            <div className={`thumb ${i === 1 ? 'media' : ''}`} />
            <div className="body">
              <div className="meta">{n.tag} · {n.date}</div>
              <h4>{n.title}</h4>
              <p>{n.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </DTSimplePage>
  );
  else if (route === 'contact') pageEl = (
    <DTSimplePage title="Contact" lead={<>GET IN <span className="gold-word">TOUCH</span></>}>
      <div className="value-list" style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="value-card"><h4>Electorate Office</h4><p>Suite 12, 100 Caroline Springs Blvd, Caroline Springs VIC 3023</p></div>
        <div className="value-card"><h4>Phone</h4><p>(03) 9000 0000 · Monday – Friday, 9 AM – 5 PM</p></div>
        <div className="value-card"><h4>Email</h4><p>moira.deeming@parliament.vic.gov.au</p></div>
      </div>
    </DTSimplePage>
  );
  else if (route.startsWith('petition-')) pageEl = (
    <DTSimplePage title={activeCampaign.badge} lead={<>{activeCampaign.headlineWhite} <span className="gold-word">{activeCampaign.headlineGold}</span></>}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <PetitionForm campaign={activeCampaign} count={count} onSign={onSign} onDonateClick={() => onNav('donate')} />
      </div>
    </DTSimplePage>
  );

  return (
    <div className="desktop-root">
      <DTNav route={route} onNav={onNav} />
      {pageEl}
      <ExitPopup open={exitOpen} onClose={() => { setExitOpen(false); setTweak('showExitPopup', false); }} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Navigation" />
        <TweakSelect label="Page"
          value={route}
          options={[
            { value: 'home', label: 'Home' },
            { value: 'campaign-vni', label: 'Campaign Hub' },
            { value: 'petition-vni', label: 'Standalone Petition' },
            { value: 'donate', label: 'Donate' },
            { value: 'about', label: 'About' },
            { value: 'news', label: 'News' },
            { value: 'contact', label: 'Contact' },
          ]}
          onChange={(v) => onNav(v)} />
        <TweakRadio label="Campaign"
          value={t.campaign}
          options={[{ value: 'vni', label: 'VNI' }, { value: 'cuv', label: 'CUV' }, { value: 'trans', label: 'Trans.' }]}
          onChange={(v) => setTweak('campaign', v)} />

        <TweakSection label="Look" />
        <TweakToggle label="Hero: dark treatment" value={t.heroDark} onChange={(v) => setTweak('heroDark', v)} />

        <TweakSection label="Behaviour" />
        <TweakToggle label="Show petition thank-you state" value={t.showThanks} onChange={(v) => setTweak('showThanks', v)} />
        <TweakToggle label="Live counter ticks" value={t.counterTicks} onChange={(v) => setTweak('counterTicks', v)} />
        <TweakSlider label="Signature counter" value={t.signatureCount} min={500} max={50000} step={100}
          onChange={(v) => setTweak('signatureCount', v)} />

        <TweakSection label="Modals" />
        <TweakButton label="Trigger exit-intent popup" onClick={() => { setExitOpen(true); setTweak('showExitPopup', true); }} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DesktopApp />);
