// petition.jsx — petition form, thank-you state, donate widget

function PetitionForm({ campaign, count, onSign, onDonateClick, compact = false }) {
  const [signed, setSigned] = React.useState(false);
  const [data, setData] = React.useState({ name: '', email: '', postcode: '', suburb: '', phone: '', updates: true });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const submit = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'Required';
    if (!data.email.match(/.+@.+\..+/)) e.email = 'Valid email required';
    if (!data.postcode.match(/^[0-9]{4}$/)) e.postcode = 'Must be 4 digits';
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSigned(true);
      onSign && onSign();
    }, 700);
  };

  const reset = () => { setSigned(false); setData({ name: '', email: '', postcode: '', suburb: '', phone: '', updates: true }); };

  // Expose reset for tweaks panel
  React.useEffect(() => {
    window.__resetPetition = reset;
    window.__forceSigned = (s) => setSigned(s);
  }, []);

  if (signed) {
    return (
      <div className="petition-card">
        <div className="thanks">
          <div className="thanks-tick">{ICONS.check}</div>
          <h3>Thank you, {data.name.split(' ')[0] || 'friend'}!</h3>
          <p>Your signature has been added. Now help fund the fight — every dollar puts this petition in front of more voters.</p>
          <button className="btn btn-primary btn-block" onClick={onDonateClick}>Donate to Fund the Fight {ICONS.arrow}</button>
          <div className="share-row">
            <button className="share-btn">{ICONS.fb} Share</button>
            <button className="share-btn">{ICONS.x} Post</button>
            <button className="share-btn" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
              {ICONS.copy} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <button onClick={reset} style={{ marginTop: 14, background: 'transparent', border: 'none', color: 'var(--grey)', fontSize: 12, textDecoration: 'underline' }}>
            ← Sign another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="petition-card">
      <h3>{campaign.petitionTitle}</h3>
      <p className="lead">{campaign.petitionLead}</p>

      <div className="field">
        <label>Full Name<span className="req">*</span></label>
        <input autoComplete="name" value={data.name} onChange={(e) => update('name', e.target.value)}
          className={errors.name ? 'error' : ''} placeholder="Jane Citizen" />
        {errors.name && <span className="err">{errors.name}</span>}
      </div>

      <div className="field">
        <label>Email<span className="req">*</span></label>
        <input type="email" autoComplete="email" value={data.email} onChange={(e) => update('email', e.target.value)}
          className={errors.email ? 'error' : ''} placeholder="jane@example.com.au" />
        {errors.email && <span className="err">{errors.email}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 8 }}>
        <div className="field">
          <label>Postcode<span className="req">*</span></label>
          <input type="text" inputMode="numeric" pattern="[0-9]{4}" maxLength={4}
            autoComplete="postal-code"
            value={data.postcode}
            onChange={(e) => update('postcode', e.target.value.replace(/\D/g, '').slice(0, 4))}
            className={errors.postcode ? 'error' : ''} placeholder="3023" />
          {errors.postcode && <span className="err">{errors.postcode}</span>}
        </div>
        <div className="field">
          <label>Suburb</label>
          <input value={data.suburb} onChange={(e) => update('suburb', e.target.value)} placeholder="Caroline Springs" />
        </div>
      </div>

      {!compact && (
        <div className="field">
          <label>Phone (optional)</label>
          <input type="tel" autoComplete="tel" value={data.phone} onChange={(e) => update('phone', e.target.value)} placeholder="04XX XXX XXX" />
        </div>
      )}

      <label className="checkbox-row">
        <input type="checkbox" checked={data.updates} onChange={(e) => update('updates', e.target.checked)} />
        <span>Keep me updated on this campaign and Moira's work in Parliament.</span>
      </label>

      <button className="btn btn-purple btn-block" onClick={submit} disabled={loading}>
        {loading ? 'Submitting…' : 'Sign Now — Add Your Name'}
      </button>

      <div className="signature-counter">
        <b>{count.toLocaleString()}</b> people have already signed
      </div>
    </div>
  );
}

function DonateWidget({ campaign, embedded = false }) {
  const [amount, setAmount] = React.useState(25);
  const [custom, setCustom] = React.useState('');
  const [monthly, setMonthly] = React.useState(false);
  const presets = [10, 25, 50, 100];

  const finalAmount = custom ? Number(custom) || 0 : amount;
  const heading = campaign
    ? (campaign.id === 'vni' ? 'Your donation funds the fight to Stop VNI West'
      : campaign.id === 'cuv' ? 'Your donation helps Clean Up Victoria'
      : 'Your donation restores transparency')
    : 'Fund the campaign';

  return (
    <div className="donate-card">
      {embedded && <h3 style={{ fontFamily: 'Anton', fontSize: 22, letterSpacing: '0.01em', textTransform: 'uppercase', color: 'var(--purple-deep)', margin: '0 0 14px' }}>{heading}</h3>}

      <div className="amount-row">
        {presets.map((p) => (
          <button key={p} className={`amt-btn ${amount === p && !custom ? 'active' : ''}`}
            onClick={() => { setAmount(p); setCustom(''); }}>
            {p === 25 && <span className="pop">POPULAR</span>}
            ${p}
          </button>
        ))}
      </div>

      <div className="custom-amt">
        <span>$</span>
        <input type="number" inputMode="numeric" placeholder="Custom amount"
          value={custom} onChange={(e) => setCustom(e.target.value)} />
        <span style={{ fontSize: 12, color: 'var(--grey)', fontWeight: 500 }}>AUD</span>
      </div>

      <div className="monthly-toggle">
        <span>Make it monthly</span>
        <button className={`toggle-switch ${monthly ? 'on' : ''}`} onClick={() => setMonthly(!monthly)} aria-pressed={monthly} />
      </div>

      <button className="btn btn-primary btn-block" style={{ marginBottom: 10 }}>
        Donate ${finalAmount}{monthly ? '/month' : ''}
      </button>

      <p style={{ fontSize: 11, color: 'var(--grey)', textAlign: 'center', margin: '8px 0 0' }}>
        Secure payment via Donorbox. Australian residents only. Donations over $1,000 disclosed to the VEC.
      </p>
    </div>
  );
}

function ImpactList() {
  return (
    <ul className="impact-list">
      <li className="impact-row"><b>$10</b> prints 50 flyers for a letterbox drop</li>
      <li className="impact-row"><b>$25</b> funds one day of petition advertising</li>
      <li className="impact-row"><b>$100</b> puts an ad in front of 5,000 voters</li>
    </ul>
  );
}

Object.assign(window, { PetitionForm, DonateWidget, ImpactList });
