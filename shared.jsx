// shared.jsx — shared UI: nav, drawer, footer, sticky CTA, exit popup, sections

function AppNav({ onMenu, onNav, currentRoute }) {
  return (
    <div className="app-nav">
      <div className="app-nav-brand" onClick={() => onNav('home')} style={{ cursor: 'pointer' }}>
        <div className="brand-mark">M</div>
        <div className="brand-name">
          Moira Deeming
          <small>MP · Western Metro</small>
        </div>
      </div>
      <div className="nav-actions">
        <button className="nav-donate-btn" onClick={() => onNav('donate')}>DONATE</button>
        <button className="nav-icon-btn" onClick={onMenu} aria-label="Menu">
          {ICONS.menu}
        </button>
      </div>
    </div>
  );
}

function Drawer({ open, onClose, onNav }) {
  const nav = (route) => { onNav(route); onClose(); };
  return (
    <>
      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`drawer ${open ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: 'Anton', fontSize: 20, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Menu</div>
          <button className="nav-icon-btn" onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)' }}>{ICONS.close}</button>
        </div>

        <button className="drawer-link" onClick={() => nav('home')}>Home {ICONS.chevron}</button>
        <button className="drawer-link" onClick={() => nav('about')}>About Moira {ICONS.chevron}</button>

        <div className="drawer-section-label">Campaigns</div>
        <button className="drawer-sublink" onClick={() => nav('campaign-vni')}>→ Stop VNI West</button>
        <button className="drawer-sublink" onClick={() => nav('campaign-cuv')}>→ Clean Up Victoria</button>
        <button className="drawer-sublink" onClick={() => nav('campaign-trans')}>→ Government Transparency</button>

        <div className="drawer-section-label">More</div>
        <button className="drawer-link" onClick={() => nav('news')}>News {ICONS.chevron}</button>
        <button className="drawer-link" onClick={() => nav('contact')}>Contact {ICONS.chevron}</button>
        <button className="drawer-link" onClick={() => nav('petition-vni')}>Sign a Petition {ICONS.chevron}</button>

        <div className="drawer-tagline">
          "Standing for Freedom, Fair Laws &amp; Family."
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="tagline-block">
        Standing for Freedom, Fair Laws &amp; Family.
      </div>
      <div className="footer-links">
        <a>Privacy</a><a>Authorised By</a><a>Contact</a><a>Press</a>
      </div>
      <div className="socials">
        <div className="social">{ICONS.fb}</div>
        <div className="social">{ICONS.ig}</div>
        <div className="social">{ICONS.x}</div>
      </div>
      <div className="vec">
        Authorised by J. Smith, 1 Example St, Caroline Springs VIC 3023.
        Donations over $1,000 are disclosed to the Victorian Electoral Commission.
        Maximum donation per financial year: $4,970.
      </div>
    </div>
  );
}

function StickyCTA({ visible, label, secondaryLabel, onPrimary, onSecondary }) {
  return (
    <div className={`sticky-cta ${visible ? 'visible' : ''}`}>
      <button className="btn btn-primary" onClick={onPrimary}>{label}</button>
      {secondaryLabel && <button className="btn btn-outline-white" onClick={onSecondary}>{secondaryLabel}</button>}
    </div>
  );
}

function ExitPopup({ open, onClose }) {
  const [val, setVal] = React.useState('');
  const [done, setDone] = React.useState(false);
  React.useEffect(() => { if (open) { setDone(false); setVal(''); } }, [open]);
  return (
    <div className={`exit-backdrop ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
        <button className="exit-close" onClick={onClose} aria-label="Close">×</button>
        {!done ? (
          <>
            <div className="hero-badge" style={{ marginBottom: 6 }}>BEFORE YOU GO</div>
            <h3>STAY IN THE FIGHT</h3>
            <p>I'll send you the next petition before it goes public — plus updates from Parliament. No spam.</p>
            <div className="field">
              <input type="email" placeholder="your@email.com.au" value={val} onChange={(e) => setVal(e.target.value)} />
            </div>
            <button className="btn btn-purple btn-block" onClick={() => setDone(true)} disabled={!val.includes('@')}>
              Get Updates
            </button>
            <p style={{ fontSize: 11, color: 'var(--grey)', marginTop: 10, marginBottom: 0 }}>
              No donation ask. Just the campaigns.
            </p>
          </>
        ) : (
          <>
            <div className="thanks-tick" style={{ width: 52, height: 52, fontSize: 24 }}>{ICONS.check}</div>
            <h3>YOU'RE IN</h3>
            <p>Welcome to the campaign. First update lands tomorrow morning.</p>
            <button className="btn btn-purple btn-block" onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
}

function ProofBar({ count, label }) {
  return (
    <div className="proof-bar">
      <div className="num"><span className="pulse"></span>{count.toLocaleString()}</div>
      <div className="label">{label}</div>
    </div>
  );
}

function InstaSection() {
  return (
    <div className="section section-light" style={{ paddingBottom: 24 }}>
      <div className="section-eyebrow" style={{ color: 'var(--purple)' }}>@MOIRADEEMINGMP</div>
      <h2 className="font-display section-title" style={{ color: 'var(--purple-deep)' }}>
        Follow the campaign
      </h2>
      <p className="section-sub">Latest updates from Moira's Instagram.</p>
      <div className="insta-grid">
        {[...Array(9)].map((_, i) => (
          <div className="insta-cell" key={i}>
            <span className="ig">{ICONS.ig}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-outline-purple btn-block">
        See all posts on Instagram {ICONS.arrow}
      </button>
    </div>
  );
}

function EmailBanner() {
  const [val, setVal] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <div className="email-banner">
      <h3>STAY IN THE FIGHT</h3>
      <p>Get Moira's updates — petitions, parliament, and the campaigns ahead.</p>
      {!submitted ? (
        <div className="email-form">
          <input type="email" placeholder="your@email.com.au" value={val} onChange={(e) => setVal(e.target.value)} />
          <button className="btn btn-primary btn-block" onClick={() => val.includes('@') && setSubmitted(true)}>
            Subscribe
          </button>
        </div>
      ) : (
        <div style={{ color: 'var(--gold)', fontFamily: 'Anton', fontSize: 22, letterSpacing: '0.02em' }}>
          {ICONS.check} YOU'RE SUBSCRIBED
        </div>
      )}
    </div>
  );
}

function DonateStrip({ onDonate }) {
  return (
    <div className="donate-strip">
      <div className="hero-badge" style={{ marginBottom: 8 }}>FUND THE FIGHT</div>
      <h3>Every dollar fights for your community.</h3>
      <p>Independent campaigns are funded by Victorians, not lobbyists. Even $10 puts the next ad in front of a thousand neighbours.</p>
      <button className="btn btn-primary btn-block" onClick={onDonate}>Donate Now {ICONS.arrow}</button>
    </div>
  );
}

Object.assign(window, { AppNav, Drawer, Footer, StickyCTA, ExitPopup, ProofBar, InstaSection, EmailBanner, DonateStrip });
