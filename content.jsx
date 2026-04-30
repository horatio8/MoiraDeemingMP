// content.jsx — Site content data + small icon helpers

const ICONS = {
  menu: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  close: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chevron: <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  fb: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7c4.8-.8 8.5-5 8.5-9.9z"/></svg>,
  ig: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>,
  x: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 3H22l-7.4 8.5L23.3 21H16.5l-5.3-7-6.1 7H1.9L9.8 12 1.5 3h6.9l4.8 6.4L18.9 3zm-1.1 16h1.7L7.3 4.8H5.4L17.8 19z"/></svg>,
  copy: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>,
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" strokeLinecap="round"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>,
  spark: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v6m0 8v6M2 12h6m8 0h6M5 5l4 4m6 6l4 4M5 19l4-4m6-6l4-4"/></svg>,
};

// Real campaigns from moiradeemingmp.com — folded into the brief's purple/gold visual system
const CAMPAIGNS = {
  vni: {
    id: 'vni',
    badge: 'Parental Rights',
    name: 'Parental Rights',
    headlineWhite: 'PARENTS ARE',
    headlineGold: "CHILDREN'S",
    headlineWhite2: 'BEST PROTECTORS.',
    sub: 'Restore parental rights in the law. Children belong to their parents — not to the government, not to the school, not to the sporting club.',
    petitionTitle: 'Restore Parental Rights',
    petitionLead: 'Demand the Victorian Parliament restore parental rights as the default in legislation governing schools, health, and child welfare.',
    counterStart: 3742,
    stats: [
      { num: '2023', lbl: 'When Rights Were Curtailed' },
      { num: '0', lbl: 'Parental Notice Required' },
      { num: '12+', lbl: 'Affected Statutes' },
      { num: '1', lbl: 'Bill to Restore Them' },
    ],
    problems: [
      { big: 'NO NOTICE', ttl: 'Parents Cut Out of the Loop', desc: 'Schools and clinics can act on a child\'s behalf without notifying the parent. The default has been inverted.' },
      { big: 'NO CONSENT', ttl: 'Decisions Without You', desc: 'Major decisions on social, medical, and identity matters happen with no requirement to involve the family.' },
      { big: 'NO RECOURSE', ttl: 'Concerns Brushed Aside', desc: 'Parents who object are labelled obstructive. There is no clear administrative path to be heard.' },
    ],
    plan: [
      'Reinstate parental notification as the legislative default',
      'Restore informed consent requirements in health and education',
      'Enshrine the right to access a child\'s school and medical records',
      'Establish an independent parental concerns ombudsman',
      'Audit every Victorian statute that displaces parental authority',
    ],
    planHeading: "Moira's plan to restore parental rights",
    planSub: "I've been in Parliament tabling this every sitting fortnight. Here's exactly what I'm pushing for.",
    imgClass: 'vni',
    eyebrow: 'The Problem',
    problemTitle: 'Parents quietly written out of the law',
    started: 'Started, May 8, 2024',
  },
  cuv: {
    id: 'cuv',
    badge: 'Sex-Based Rights & Safeguards',
    name: 'Sex-Based Rights',
    headlineWhite: 'PROTECT',
    headlineGold: 'SEX-BASED RIGHTS',
    headlineWhite2: 'IN LAW.',
    sub: "The hard-won rights women fought for over a hundred years — female-only toilets, change rooms, refuges, sport — are being eroded. We're putting them back.",
    petitionTitle: 'Sex-Based Rights & Safeguards',
    petitionLead: 'Demand legislation that restores and protects single-sex spaces, services, and sports for women and girls in Victoria.',
    counterStart: 5218,
    stats: [
      { num: '100 yrs', lbl: 'of Hard-Won Rights' },
      { num: '0', lbl: 'Female-Only Guarantees' },
      { num: '6', lbl: 'Acts to Amend' },
      { num: '1', lbl: 'Private Member\'s Bill' },
    ],
    problems: [
      { big: 'NO GUARANTEES', ttl: 'Single-Sex Spaces Erased', desc: 'There is no legislative guarantee of female-only toilets, change rooms, or refuges anywhere in Victorian law.' },
      { big: 'UNFAIR SPORT', ttl: 'Women Pushed Out of Their Own Categories', desc: 'Female sport is being opened up with no statutory definition of sex. Women lose places, podiums, and pay.' },
      { big: 'NO DEBATE', ttl: 'Reform by Stealth', desc: 'These changes have been made through guidelines and policy, never put to a clear vote of the Parliament.' },
    ],
    plan: [
      'Define "sex" and "woman" in Victorian legislation',
      'Statutory protection for female-only refuges and rape crisis services',
      'Legal protection for single-sex female sport and prizes',
      'Right to female-only medical care on request',
      'Independent commissioner for women\'s rights and safeguards',
    ],
    planHeading: "Moira's plan to protect women",
    planSub: 'Five concrete legislative actions to put women\'s rights back where they belong — in the statute book.',
    imgClass: 'cuv',
    eyebrow: 'The Problem',
    problemTitle: "A century of progress, quietly unwound",
    started: 'Started, May 8, 2024',
  },
  trans: {
    id: 'trans',
    badge: 'Environmental Protection',
    name: 'Environmental Protection',
    headlineWhite: 'TEST EVERY',
    headlineGold: 'TRUCKLOAD.',
    headlineWhite2: 'PROTECT THE WEST.',
    sub: 'Victoria\'s circular economy is dumping untested feedstock across our suburbs and farmland. Mandate testing. Mandate certification. Mandate accountability.',
    petitionTitle: 'Environmental Protection',
    petitionLead: 'Demand all feedstock materials in Victoria\'s circular economy are tested and certified free from hazardous contaminants before reuse.',
    counterStart: 2104,
    stats: [
      { num: '0%', lbl: 'Feedstock Tested' },
      { num: '4M+', lbl: 'Tonnes Processed' },
      { num: '40+', lbl: 'Sites in West' },
      { num: '0', lbl: 'Mandatory Audits' },
    ],
    problems: [
      { big: 'NO TESTING', ttl: 'Feedstock Goes Untested', desc: 'There is no requirement to test or certify feedstock before it enters the circular economy stream.' },
      { big: 'WESTERN SUBURBS', ttl: 'The Burden Falls Here', desc: 'A disproportionate share of processing sits across Western Melbourne — next to homes, schools, and farms.' },
      { big: 'NO ENFORCEMENT', ttl: 'EPA Powers Underused', desc: 'Reports go in, audits don\'t follow. Regulators wait for harm before they act.' },
    ],
    plan: [
      'Mandate testing and certification of all feedstock materials',
      'Require public reporting of every processing site\'s inputs',
      'Empower the EPA to suspend operators on a single failed audit',
      'Statutory right of community access to facility data',
      'Cumulative-impact assessments for the Western suburbs',
    ],
    planHeading: "Moira's plan for a clean circular economy",
    planSub: 'Five practical actions to make Victoria\'s recycling industry safe — without shutting it down.',
    imgClass: 'trans',
    eyebrow: 'The Problem',
    problemTitle: 'A circular economy without a safety net',
    started: 'Started, May 9, 2024',
  },
};

const NEWS = [
  { tag: 'Interview', date: '12 Aug', title: 'Moira Deeming & Sal Grover discuss the new Victorian Government Gender Identity campaign (Part 4)', excerpt: 'Continuing the conversation on what the new state campaign means for women\'s sex-based rights and safeguards.' },
  { tag: 'Interview', date: '12 Aug', title: 'Moira Deeming & Sal Grover discuss the new Victorian Government Gender Identity campaign (Part 3)', excerpt: 'Part three: the legislative levers, what\'s in play this sitting fortnight, and where the Opposition stands.' },
  { tag: 'Speech', date: '18 Apr', title: 'Notice of Motion: regulate Victoria\'s circular economy properly', excerpt: 'Moira gave notice that this House calls on the Government to mandate testing and certification of all feedstock materials.' },
];

const PETITIONS = [
  { date: 'Started, Aug 24, 2023', title: 'Review the current vaccine mandates imposed on workers', excerpt: 'The Petition of certain citizens of the State of Victoria draws to the attention of the Legislative Council the need for decision-makers to reconsider the current mandates…' },
  { date: 'Started, Aug 24, 2023', title: 'Halt Gender Affirmation Practices', excerpt: 'Victorians! If you agree that the Cass Review justifies a halt to gender affirmation practices for minors, please sign and share.' },
];

const VALUES = [
  { ttl: 'Freedom', desc: 'A free society starts with free speech, free conscience, and free families. I will defend each of these in every Bill that comes through the chamber.' },
  { ttl: 'Fair Laws', desc: 'Laws must apply equally to all Victorians — politicians and union bosses included. No back-room deals. No special exemptions.' },
  { ttl: 'Family', desc: 'Strong families build strong communities. Parents must remain the primary decision-makers in their children\'s lives.' },
  { ttl: 'Community', desc: 'I represent Western Melbourne. Every petition I bring forward begins with the people who live there — not lobbyists, not party room consensus.' },
];

Object.assign(window, { ICONS, CAMPAIGNS, NEWS, VALUES, PETITIONS });
