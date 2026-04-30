// desktop.jsx — desktop pages

function DTNav({ route, onNav }) {
  const [dropOpen, setDropOpen] = React.useState(false);
  return (
    <div className="dt-nav">
      <div className="dt-nav-brand" onClick={() => onNav('home')}>
        <div className="brand-mark">M</div>
        <div className="brand-name">
          Moira Deeming
          <small>MP · Western Metropolitan</small>
        </div>
      </div>
      <div className="dt-nav-links">
        <button className={`dt-nav-link ${route === 'about' ? 'active' : ''}`} onClick={() => onNav('about')}>Meet Moira</button>
        <div
          className="dt-nav-link dropdown-host"
          style={{ position: 'relative' }}
          onMouseEnter={() => setDropOpen(true)}
          onMouseLeave={() => setDropOpen(false)}
        >
          Take Action ▾
          <div className={`dt-dropdown ${dropOpen ? 'open' : ''}`}>
            <button className="dt-dropdown-item" onClick={() => { onNav('campaign-vni'); setDropOpen(false); }}>
              Parental Rights<small>Restore parental rights in the law</small>
            </button>
            <button className="dt-dropdown-item" onClick={() => { onNav('campaign-cuv'); setDropOpen(false); }}>
              Sex-Based Rights &amp; Safeguards<small>Protect women's hard-won rights</small>
            </button>
            <button className="dt-dropdown-item" onClick={() => { onNav('campaign-trans'); setDropOpen(false); }}>
              Environmental Protection<small>Regulate the circular economy</small>
            </button>
            <button className="dt-dropdown-item" onClick={() => { onNav('petition-vni'); setDropOpen(false); }}>
              Parliamentary Petitions<small>Sign &amp; share active petitions</small>
            </button>
          </div>
        </div>
        <button className={`dt-nav-link ${route === 'news' ? 'active' : ''}`} onClick={() => onNav('news')}>Media</button>
        <button className={`dt-nav-link ${route === 'contact' ? 'active' : ''}`} onClick={() => onNav('contact')}>Western Metro</button>
        <button className={`dt-nav-link ${route === 'contact' ? 'active' : ''}`} onClick={() => onNav('contact')}>Contact</button>
        <button className="dt-donate-btn" onClick={() => onNav('donate')}>Subscribe</button>
      </div>
    </div>
  );
}

function DTFooter() {
  return (
    <>
      <div className="dt-footer">
        <div className="dt-footer-grid">
          <div>
            <div className="tagline-block">"Standing for Freedom, Fair Laws &amp; Family."</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>
              Moira Deeming MP — Member for Western Metropolitan Region in the Victorian Legislative Council.
            </p>
            <div className="dt-socials">
              <div className="social">{ICONS.fb}</div>
              <div className="social">{ICONS.ig}</div>
              <div className="social">{ICONS.x}</div>
            </div>
          </div>
          <div>
            <h5>Take Action</h5>
            <ul>
              <li><a>Parental Rights</a></li>
              <li><a>Sex-Based Rights &amp; Safeguards</a></li>
              <li><a>Environmental Protection</a></li>
              <li><a>Parliamentary Petitions</a></li>
            </ul>
          </div>
          <div>
            <h5>About</h5>
            <ul>
              <li><a>Moira</a></li>
              <li><a>News</a></li>
              <li><a>Contact</a></li>
              <li><a>Donate</a></li>
            </ul>
          </div>
          <div>
            <h5>Compliance</h5>
            <ul>
              <li><a>Privacy Policy</a></li>
              <li><a>Authorised By</a></li>
              <li><a>VEC Disclosure</a></li>
            </ul>
          </div>
        </div>
        <div className="vec">
          Authorised by J. Smith, 1 Example St, Caroline Springs VIC 3023.
          Donations over $1,000 are disclosed to the Victorian Electoral Commission.
          Maximum donation per financial year: $4,970. All donors must be Australian residents.
        </div>
      </div>
    </>
  );
}

function DTHomePage({ totalSigs, onNav, heroDark }) {
  return (
    <div data-screen-label="01 Desktop Home">
      <div className={`dt-hero ${heroDark ? 'dark' : 'bright'}`}>
        <div>
          <div className="hero-badge">Member · Western Metro</div>
          <h1>STANDING FOR <span className="gold-word">FREEDOM</span>, FAIR LAWS &amp; <span className="gold-word">FAMILY</span></h1>
          <p className="sub">I'm Moira Deeming. I represent half a million Victorians in the Legislative Council — and I work for you, not the party room.</p>
          <div className="dt-hero-ctas">
            <button className="dt-btn primary" onClick={() => onNav('campaign-vni')}>See What I'm Fighting For {ICONS.arrow}</button>
            <button className="dt-btn outline-white" onClick={() => onNav('petition-vni')}>Sign a Petition</button>
          </div>
        </div>
        <div className="dt-hero-portrait" />
      </div>

      <div className="dt-proof">
        <div className="num">{totalSigs.toLocaleString()}</div>
        <div className="label">Victorians have taken action</div>
      </div>

      <div className="dt-section dt-section-light">
        <div className="dt-section-head">
          <div className="eyebrow">The Campaigns</div>
          <h2>What I'm fighting for</h2>
          <p>Three battles. One mission: a Victoria that listens.</p>
        </div>
        <div className="dt-pillars">
          {[
            { id: 'vni', t: 'Parental Rights', d: 'Children belong to their parents — not to the government, not to the school. Restore the law.' },
            { id: 'cuv', t: 'Sex-Based Rights & Safeguards', d: 'A century of hard-won rights for women is being unwound by stealth. We’re putting them back.' },
            { id: 'trans', t: 'Environmental Protection', d: 'Test every truckload. Regulate the circular economy. Protect the Western suburbs.' },
          ].map(p => (
            <div className="dt-pillar" key={p.id} onClick={() => onNav(`campaign-${p.id}`)}>
              <div className={`dt-pillar-img ${p.id}`}><span className="dt-pillar-tag">Active</span></div>
              <div className="dt-pillar-body">
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <div className="dt-pillar-cta">Learn More + Sign {ICONS.arrow}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dt-section dt-section-faint">
        <div className="dt-section-head">
          <div className="eyebrow">Latest</div>
          <h2>From parliament &amp; the press</h2>
        </div>
        <div className="dt-news-grid">
          {NEWS.map((n, i) => (
            <div className="dt-news" key={i}>
              <div className={`thumb ${i === 1 ? 'media' : ''}`} />
              <div className="body">
                <div className="meta">{n.tag} <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'currentColor', opacity: 0.5 }} /> {n.date}</div>
                <h4>{n.title}</h4>
                <p>{n.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dt-section dt-section-light">
        <div className="dt-section-head">
          <div className="eyebrow">Be Heard</div>
          <h2>Fill out our community survey</h2>
          <p>Tell me what matters to your street, your school, your suburb. Every response shapes the next campaign.</p>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button className="dt-btn purple" onClick={() => onNav('contact')}>Take the Survey {ICONS.arrow}</button>
        </div>
      </div>

      <div className="dt-section dt-section-faint">
        <div className="dt-section-head">
          <div className="eyebrow">Parliamentary Petitions</div>
          <h2>Tabled in the Legislative Council</h2>
          <p>Petitions I've moved through the Parliament of Victoria. Sign and share.</p>
        </div>
        <div className="dt-news-grid">
          {PETITIONS.map((p, i) => (
            <div className="dt-news" key={i}>
              <div className="body">
                <div className="meta">{p.date}</div>
                <h4>{p.title}</h4>
                <p>{p.excerpt}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)' }}>View Petition →</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dt-email-banner">
        <h3>Stay in the fight</h3>
        <p>Get Moira's updates — petitions, parliament, and the campaigns ahead.</p>
        <div className="dt-email-form">
          <input type="email" placeholder="your@email.com.au" />
          <button className="dt-btn primary">Subscribe</button>
        </div>
      </div>

      <DTFooter />
    </div>
  );
}

function DTCampaignHub({ campaign, count, onSign, onNav }) {
  return (
    <div data-screen-label={`02 Desktop Campaign — ${campaign.name}`}>
      <div className="dt-hero dark">
        <div>
          <div className="hero-badge">{campaign.badge}</div>
          <h1>{campaign.headlineWhite} <span className="gold-word">{campaign.headlineGold}</span> {campaign.headlineWhite2}</h1>
          <p className="sub">{campaign.sub}</p>
          <div className="dt-hero-ctas">
            <button className="dt-btn primary" onClick={() => document.getElementById('dt-petition')?.scrollIntoView({ behavior: 'smooth' })}>Sign the Petition {ICONS.arrow}</button>
            <button className="dt-btn outline-white" onClick={() => onNav('donate')}>Donate Now</button>
          </div>
        </div>
        <div className="dt-hero-portrait" />
      </div>

      <div className="dt-proof">
        <div className="num">{count.toLocaleString()}</div>
        <div className="label">have signed for {campaign.name}</div>
      </div>

      <div className="dt-section dt-section-faint" id="dt-petition">
        <div className="dt-twocol">
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 12 }}>The Campaign</div>
            <h2>{campaign.problemTitle}</h2>
            <p className="lead">
              The Government is rushing this through. The Opposition is silent. I'm taking the fight directly to the people who live here, and I need your name to do it.
            </p>
            <p className="lead" style={{ color: 'var(--grey)' }}>
              Your signature is filed publicly with my office and tabled in the Legislative Council. It's the most direct way to put pressure on the Premier.
            </p>
            <div className="dt-stats-grid">
              {campaign.stats.map((s, i) => (
                <div className="dt-stat" key={i}>
                  <div className="num">{s.num}</div>
                  <div className="lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="dt-petition-wrap">
            <PetitionForm campaign={campaign} count={count} onSign={onSign} onDonateClick={() => onNav('donate')} />
          </div>
        </div>
      </div>

      <div className="dt-section dt-section-dark">
        <div className="dt-section-head">
          <div className="eyebrow">The Problem</div>
          <h2>What's at stake</h2>
        </div>
        <div className="dt-problems">
          {campaign.problems.map((p, i) => (
            <div className="dt-problem" key={i}>
              <div className="big">{p.big}</div>
              <div className="ttl">{p.ttl}</div>
              <div className="desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dt-section dt-section-faint">
        <div className="dt-plan-grid">
          <div className="dt-plan-img" />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 12 }}>The Plan</div>
            <h2 style={{ fontFamily: 'Anton', fontSize: 56, lineHeight: 0.96, margin: '0 0 16px', textTransform: 'uppercase', color: 'var(--purple-deep)' }}>{campaign.planHeading}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--charcoal)', margin: 0 }}>{campaign.planSub}</p>
            <ul className="dt-plan-list">
              {campaign.plan.map((p, i) => (
                <li key={i}><span className="tick">{ICONS.check}</span><span>{p}</span></li>
              ))}
            </ul>
            <button className="dt-btn purple" onClick={() => document.getElementById('dt-petition')?.scrollIntoView({ behavior: 'smooth' })}>
              Sign the Petition {ICONS.arrow}
            </button>
          </div>
        </div>
      </div>

      <div className="dt-section dt-section-purple">
        <div className="dt-donate-grid">
          <div>
            <div className="hero-badge">FUND THE FIGHT</div>
            <h2 style={{ fontFamily: 'Anton', fontSize: 64, lineHeight: 0.95, margin: '12px 0 20px', textTransform: 'uppercase' }}>
              Put this campaign in <span className="gold-word">front of voters.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.85, margin: '0 0 28px' }}>
              Independent campaigns run on independent donations. There is no party machine behind this — there's just us.
            </p>
            <ul className="dt-impact-list">
              <li className="dt-impact"><b>$10</b> prints 50 flyers for a letterbox drop</li>
              <li className="dt-impact"><b>$25</b> funds one day of petition advertising</li>
              <li className="dt-impact"><b>$100</b> puts an ad in front of 5,000 voters</li>
            </ul>
          </div>
          <div>
            <DonateWidget campaign={campaign} embedded />
          </div>
        </div>
      </div>

      <div className="dt-section dt-section-light">
        <div className="dt-section-head">
          <div className="eyebrow">@MOIRADEEMINGMP</div>
          <h2>Follow the campaign</h2>
        </div>
        <div className="dt-insta-grid">
          {[...Array(8)].map((_, i) => <div className="dt-insta-cell" key={i} />)}
        </div>
      </div>

      <DTFooter />
    </div>
  );
}

function DTSimplePage({ title, lead, children }) {
  return (
    <div data-screen-label={`Desktop — ${title}`}>
      <div className="dt-hero dark" style={{ minHeight: 360, paddingTop: 60, paddingBottom: 60, gridTemplateColumns: '1fr' }}>
        <div>
          <div className="hero-badge">{title}</div>
          <h1 style={{ fontSize: 72 }}>{lead}</h1>
        </div>
      </div>
      <div className="dt-section dt-section-light">{children}</div>
      <DTFooter />
    </div>
  );
}

Object.assign(window, { DTNav, DTFooter, DTHomePage, DTCampaignHub, DTSimplePage });
