import { useEffect, useRef, useState } from 'react';
import './App.css';

/* ==================================================================
   CONFIG — everything a marketer edits lives here.
   Replace every value marked PLACEHOLDER before running ads: Meta
   reviews landing pages, and invented testimonials or seat counts
   can get an ad account restricted.
   ================================================================== */

// Where every CTA goes. PLACEHOLDER: point at your checkout / registration page.
const REGISTER_URL = '#enrol';

const PRICE = 299;
const PRICE_WAS = '₹1,999';
const CURRENCY = 'INR';

const WHATSAPP_DISPLAY = '+91 96309 21905';
const WHATSAPP_LINK =
  'https://wa.me/919630921905?text=' +
  encodeURIComponent('Hi, I have a question about the Business Analyst live workshop.');

const EVENT = {
  date: 'Saturday, 24th Oct',
  time: '11:00 AM IST',
  platform: 'ZOOM',
  language: 'English',
  lengthLabel: '3 Hour Workshop',
};

// PLACEHOLDER social proof: use your real numbers.
const REGISTERED = 1247;
const SEATS_LEFT = 47;
const SEATS_TOTAL = 200;
const SEAT_ICONS = 12;

const MENTOR = {
  name: 'Meera Raghunathan',
  title: 'Lead Business Analyst',
  // PLACEHOLDER photo
  photo: 'https://i.pravatar.cc/600?img=45',
};

const TOOLS = [
  'googlesheets', 'postgresql', 'looker', 'jira', 'confluence', 'notion',
  'miro', 'figma', 'airtable', 'snowflake', 'googlebigquery', 'python',
];

// PLACEHOLDER video testimonials: replace with real, consented learner videos.
// vimeoId: the number in vimeo.com/123456789. For unlisted videos also set `hash`
// (the part after the slash in vimeo.com/123456789/abcdef1234).
// The first entry is the featured (large) video, so put your strongest story there.
// `seed` draws the fallback poster shown if Vimeo's thumbnail can't load.
const RESULTS = [
  { vimeoId: '22439234', hash: '', metric: '+46%', who: 'Ishaan Verma', path: 'Support lead to Business Analyst, lending startup', seed: [30, 34, 31, 40, 44, 52, 61, 70] },
  { vimeoId: '1084537', hash: '', metric: '3.1×', who: 'Kavya Pillai', path: 'B.Com graduate to Product Analyst, D2C brand', seed: [20, 22, 30, 28, 41, 48, 55, 68] },
  { vimeoId: '90509568', hash: '', metric: '+38%', who: 'Rohan Dsouza', path: 'Ops executive to BA, logistics platform', seed: [40, 38, 44, 47, 46, 55, 58, 66] },
  { vimeoId: '22439234', hash: '', metric: '62 days', who: 'Ananya Bose', path: 'From first SQL query to signed BA offer', seed: [12, 18, 26, 30, 38, 47, 58, 72] },
  { vimeoId: '1084537', hash: '', metric: '+29%', who: 'Farhan Qureshi', path: 'Junior analyst to Senior BA, insurance', seed: [48, 50, 49, 54, 57, 60, 64, 69] },
];

const PAINS = [
  ['ph-database', 'You know Excel well but freeze the moment someone asks for SQL'],
  ['ph-file-x', 'The requirement docs you write get ignored or rewritten by engineers'],
  ['ph-chart-line-down', "A metric drops and you can't explain why in the Monday review"],
  ['ph-briefcase', 'Interviews ask for case studies you have never actually done'],
  ['ph-signpost', "You're stuck in ops or support with no clear path into a BA role"],
  ['ph-presentation-chart', 'Your dashboards look busy, but nobody opens them twice'],
];

const AUDIENCE = [
  ['Fresh Graduates', 'Land a first role with a real portfolio.'],
  ['Career Switchers', 'Turn domain know-how into BA leverage.'],
  ['Working Analysts', 'Move from reporting to recommending.'],
];

const MODULES = [
  {
    n: '01', title: 'Think Like A Business Analyst', items: [
      'Problem framing with the 5 Whys',
      'Writing user stories engineers trust',
      'Process mapping with BPMN basics',
      'Stakeholder mapping and RACI',
      'Turning vague asks into scoped requirements',
    ],
  },
  {
    n: '02', title: 'Data Skills That Get You Hired', items: [
      'SQL joins and window functions on a real dataset',
      'From spreadsheet to Looker dashboard in one sitting',
      'Defining KPIs leadership actually tracks',
      'Cohort and funnel analysis, step by step',
      'Spotting bad data before it reaches a slide',
    ],
  },
  {
    n: '03', title: 'Present, Persuade, Get Promoted', items: [
      'The one-slide recommendation framework',
      'Live case 1: diagnose a 14.3% drop in checkout conversion',
      'Live case 2: prioritise a 40-item backlog with RICE',
      'Live case 3: build a portfolio project you can show',
      'Teardown of three real BA interview case rounds',
    ],
  },
];

const VALUE_STACK = [
  ['ph ph-check-circle', '3 Hour Live BA Bootcamp', '₹4,999'],
  ['ph ph-check-circle', 'SQL Practice Dataset & Query Pack', '₹2,499'],
  ['ph ph-check-circle', 'BRD & User Story Template Kit', '₹1,999'],
  ['ph ph-check-circle', 'Live Portfolio Review With Meera', '₹7,999'],
  ['ph-fill ph-gift', 'Bonus: 120 BA Interview Questions', '₹1,499'],
];

const OUTCOMES = [
  ['ph-target', 'You stop guessing and start framing every problem with a clear hypothesis'],
  ['ph-list-checks', 'You write requirements engineers ship without a second meeting'],
  ['ph-terminal-window', 'You query real data with SQL instead of waiting on the data team'],
  ['ph-folder-star', 'You walk into interviews with a portfolio project, not just a resume'],
  ['ph-chart-line-up', 'You explain why a metric moved, and what to do about it'],
  ['ph-squares-four', 'You build dashboards that leadership opens every Monday'],
  ['ph-handshake', 'You earn a seat in product decisions instead of taking tickets'],
  ['ph-trend-up', 'You negotiate your next role with proof of the impact you created'],
];

const FAQS = [
  ['Do I need a technical or coding background?', 'No. If you can use a spreadsheet, you can follow along. SQL is taught from the first SELECT, on a dataset we share before the session.'],
  ['Will I get the recording?', 'Yes. Everyone registered gets the recording and all templates for 30 days, but the portfolio review only happens live.'],
  ['What do I need on the day?', 'A laptop, a stable connection, and a free Google account for Sheets and Looker Studio. The setup checklist arrives with your confirmation email.'],
  ['I already work as an analyst. Is this too basic?', 'Module 03 is built for working analysts: recommendation framing, prioritisation and interview case rounds for senior roles.'],
  ["Is there a refund if I can't attend?", `Write to us 24 hours before the session and we'll move you to the next cohort or refund the full ₹${PRICE}.`],
  ['Will I get a certificate?', 'Yes. Attendees who submit the live case receive a certificate of completion you can add to LinkedIn.'],
  ['I have a question that is not listed here.', `Message us on WhatsApp at ${WHATSAPP_DISPLAY}. A real person replies, usually within a few minutes during working hours.`],
];

/* ==================================================================
   Tracking. The Pixel base code lives in index.html. eventID lets
   Meta de-duplicate this browser event against the same event sent
   server-side through the Conversions API.
   ================================================================== */
function track(event, params = {}) {
  const eventID = `${event}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', event, params, { eventID });
  }
  return eventID;
}

const trackCta = (placement) =>
  track('InitiateCheckout', { content_name: 'BA Live Workshop', placement, value: PRICE, currency: CURRENCY });

const trackWhatsApp = (placement) => track('Contact', { method: 'whatsapp', placement });

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ==================================================================
   Hooks
   ================================================================== */

// One shared observer adds `.in` to every `.rv` (and the audience section) once it scrolls into view.
function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const targets = root.querySelectorAll('.rv, .audience');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          io.unobserve(en.target);
        }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

// Sticky bar shows once the hero (and its CTA) has scrolled above the viewport.
function useStickyAfter(targetRef) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = targetRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [targetRef]);
  return show;
}

// Seconds left until the end of today, local time (the offer window).
function useCountdownToMidnight() {
  const calc = () => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return Math.max(0, Math.floor((end - Date.now()) / 1000));
  };
  const [left, setLeft] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

/* ==================================================================
   Small building blocks
   ================================================================== */

const fmt = (n) => n.toLocaleString('en-IN');

function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="gFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A970FF" stopOpacity=".45" />
          <stop offset="1" stopColor="#A970FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gCurve" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#A970FF" stopOpacity=".15" />
          <stop offset=".55" stopColor="#A970FF" />
          <stop offset="1" stopColor="#E1EAF7" />
        </linearGradient>
        <pattern id="gridInk" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0H0V56" fill="none" stroke="#FBFDFF" strokeOpacity=".045" />
        </pattern>
        <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#FBFDFF" fillOpacity=".14" />
        </pattern>
      </defs>
    </svg>
  );
}

function CtaButton({ children, className = '', placement }) {
  return (
    <a href={REGISTER_URL} className={`btn ${className}`} onClick={() => trackCta(placement)}>
      {children}
    </a>
  );
}

function Price() {
  return (
    <>
      <s>{PRICE_WAS}</s> ₹{PRICE}
    </>
  );
}

function Trust() {
  return (
    <div className="trust">
      <span><i className="ph ph-lock-simple" />Secure Payment</span>
      <span><i className="ph ph-check-circle" />Instant Confirmation</span>
      <span><i className="ph ph-gift" />Templates Included</span>
      <span><i className="ph ph-question" />Live Q&amp;A With Meera</span>
    </div>
  );
}

function Proof() {
  return (
    <span className="proof">
      <i className="ph-fill ph-users-three" />
      {fmt(REGISTERED)} people have registered
    </span>
  );
}

function Seats() {
  const free = Math.max(0, Math.min(SEAT_ICONS, Math.round((SEATS_LEFT / SEATS_TOTAL) * SEAT_ICONS)));
  const taken = SEAT_ICONS - free;
  return (
    <div className="seats">
      <span className="seat-row" aria-hidden="true">
        {Array.from({ length: SEAT_ICONS }, (_, i) => (
          <i key={i} className={`ph-fill ph-armchair${i >= taken ? ' off' : ''}`} />
        ))}
      </span>
      <span className="left">Only {SEATS_LEFT} seats left at this price</span>
    </div>
  );
}

/* CTA block: one action, repeated with the same promise every time. */
function CtaBlock({ label, placement, id, trustFirst = false, full = false, extraClass = 'rv' }) {
  return (
    <div className={`cta-block ${extraClass}`} id={id}>
      <CtaButton className={full ? 'full' : 'wide'} placement={placement}>
        {label} <Price />
      </CtaButton>
      {trustFirst && <Trust />}
      <Proof />
      <Seats />
      {!trustFirst && <Trust />}
    </div>
  );
}

function WhatsAppLink({ placement, className = 'wa-link', children }) {
  return (
    <a
      className={className}
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp(placement)}
    >
      <i className="ph-fill ph-whatsapp-logo" />
      {children}
    </a>
  );
}

function Portrait({ src, alt, eager = false }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <img
      src={src}
      alt={alt}
      width="600"
      height="720"
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      onError={() => setOk(false)}
    />
  );
}

function CountUp({ end, suffix = '' }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    let raf = 0;
    const run = () => {
      if (prefersReducedMotion()) { setVal(end); return; }
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / 1400);
        setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    if (!el || !('IntersectionObserver' in window)) { setVal(end); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      run();
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [end]);
  return <b ref={ref}>{fmt(val)}{suffix}</b>;
}

function Timer() {
  const s = useCountdownToMidnight();
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <span className="timer" role="timer" aria-label="Offer time remaining">
      <span>{pad(Math.floor(s / 3600))}</span>:<span>{pad(Math.floor((s % 3600) / 60))}</span>:<span>{pad(s % 60)}</span>
    </span>
  );
}

/* Generated chart art for each result card. */
function ResultArt({ seed, index }) {
  const W = 200, H = 310;
  const max = Math.max(...seed), min = Math.min(...seed);
  const pts = seed.map((v, k) => [14 + (k * (W - 28)) / (seed.length - 1), 150 - ((v - min) / (max - min || 1)) * 100]);
  const line = pts.map((p, k) => `${k ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg className="art" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width={W} height={H} fill="url(#dots)" />
      {index % 2 ? (
        <>
          <circle cx={W - 30} cy="44" r="58" fill="none" stroke="#A970FF" strokeOpacity=".18" />
          <circle cx={W - 30} cy="44" r="36" fill="none" stroke="#A970FF" strokeOpacity=".28" />
        </>
      ) : (
        <>
          <path d={`M0 30 L${W} 70`} stroke="#FBFDFF" strokeOpacity=".08" />
          <path d={`M0 60 L${W} 100`} stroke="#FBFDFF" strokeOpacity=".08" />
        </>
      )}
      <path d={`${line} L${W - 14} 190 L14 190Z`} fill="url(#gFade)" opacity=".7" />
      <path d={line} fill="none" stroke="#A970FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="9" fill="#A970FF" fillOpacity=".25" />
      <circle cx={lx} cy={ly} r="4.5" fill="#FBFDFF" />
      <rect x="0" y="170" width={W} height={H - 170} fill="#0E0A17" opacity=".55" />
    </svg>
  );
}

/* ==================================================================
   Sections
   ================================================================== */

function HeroBackdrop() {
  return (
    <svg className="hero-bg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <radialGradient id="heroHalo" cx="50%" cy="0%" r="65%">
        <stop offset="0" stopColor="#A970FF" stopOpacity=".16" />
        <stop offset="1" stopColor="#A970FF" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="gridFade" cx="50%" cy="30%" r="70%">
        <stop offset="0" stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <mask id="heroMask"><rect width="1440" height="900" fill="url(#gridFade)" /></mask>
      <rect width="1440" height="900" fill="url(#gridInk)" mask="url(#heroMask)" />
      <rect width="1440" height="900" fill="url(#heroHalo)" />
      <path d="M-20 760 C 260 700, 380 520, 620 560 S 1000 420, 1460 300" fill="none" stroke="#FBFDFF" strokeOpacity=".12" strokeWidth="1.5" strokeDasharray="4 8" />
      <g fill="none" stroke="#A970FF" strokeWidth="1.5" opacity=".7">
        <circle cx="120" cy="170" r="46" />
        <circle cx="120" cy="170" r="28" strokeDasharray="3 5" />
        <circle cx="1330" cy="250" r="62" />
        <circle cx="1330" cy="250" r="38" strokeDasharray="3 5" />
      </g>
    </svg>
  );
}

function DashboardBackdrop() {
  const label = { fill: '#FBFDFF', fillOpacity: '.55', fontSize: '10', fontFamily: 'Red Hat Display, sans-serif' };
  const tile = { fill: '#1B1433', stroke: '#FBFDFF', strokeOpacity: '.14' };
  return (
    <svg className="backdrop" viewBox="0 0 520 510" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="520" height="510" fill="#0E0A17" />
      <rect width="520" height="510" fill="url(#dots)" />
      <g className="float">
        <rect x="22" y="40" width="150" height="96" rx="12" {...tile} />
        <text x="36" y="64" {...label}>Weekly revenue</text>
        <path d="M36 118 L60 106 L82 110 L104 92 L128 96 L156 74" fill="none" stroke="#A970FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 118 L60 106 L82 110 L104 92 L128 96 L156 74 L156 126 L36 126Z" fill="url(#gFade)" />
      </g>
      <g className="float" style={{ animationDelay: '-2s' }}>
        <rect x="352" y="30" width="148" height="112" rx="12" {...tile} />
        <circle cx="400" cy="86" r="30" fill="none" stroke="#FBFDFF" strokeOpacity=".12" strokeWidth="10" />
        <circle cx="400" cy="86" r="30" fill="none" stroke="#A970FF" strokeWidth="10" strokeDasharray="132 189" transform="rotate(-90 400 86)" strokeLinecap="round" />
        <text x="400" y="91" textAnchor="middle" fill="#FBFDFF" fontSize="14" fontWeight="700" fontFamily="Red Hat Display, sans-serif">71%</text>
        <rect x="444" y="66" width="44" height="6" rx="3" fill="#FBFDFF" fillOpacity=".25" />
        <rect x="444" y="80" width="32" height="6" rx="3" fill="#A970FF" fillOpacity=".7" />
        <rect x="444" y="94" width="38" height="6" rx="3" fill="#FBFDFF" fillOpacity=".15" />
      </g>
      <g className="float" style={{ animationDelay: '-4s' }}>
        <rect x="14" y="230" width="112" height="140" rx="12" {...tile} />
        <g fill="#A970FF">
          <rect x="30" y="320" width="12" height="34" rx="3" fillOpacity=".45" />
          <rect x="48" y="300" width="12" height="54" rx="3" fillOpacity=".6" />
          <rect x="66" y="282" width="12" height="72" rx="3" fillOpacity=".8" />
          <rect x="84" y="262" width="12" height="92" rx="3" />
        </g>
        <text x="28" y="252" {...label}>Cohort lift</text>
      </g>
      <g className="float" style={{ animationDelay: '-1s' }}>
        <rect x="394" y="240" width="112" height="120" rx="12" {...tile} />
        <path d="M450 268 v16 M450 300 v16 M428 330 h44" stroke="#FBFDFF" strokeOpacity=".3" strokeWidth="1.5" fill="none" />
        <rect x="430" y="256" width="40" height="14" rx="4" fill="#A970FF" />
        <rect x="430" y="286" width="40" height="14" rx="4" fill="#FBFDFF" fillOpacity=".3" />
        <rect x="410" y="318" width="34" height="14" rx="4" fill="#FBFDFF" fillOpacity=".18" />
        <rect x="458" y="318" width="34" height="14" rx="4" fill="#A970FF" fillOpacity=".55" />
      </g>
    </svg>
  );
}

function Hero({ heroRef }) {
  return (
    <section className="hero" ref={heroRef}>
      <HeroBackdrop />
      <div className="wrap">
        <div className="hero-head rv">
          <span className="eyebrow">
            <i className="ph-fill ph-broadcast" />
            Live Business Analyst Workshop · {EVENT.date.replace(/^\w+,\s*/, '')} · ₹{PRICE}
          </span>
          <h1 className="display h1">
            The Exact <span className="hl">Analysis Playbook</span> Senior Business Analysts Use To Turn Messy Data Into Decisions Leadership Signs Off On.
          </h1>
          <p className="tag">Without A Tech Degree Or Years Of Trial And Error.</p>
          <p className="sub">Learn requirements, SQL and stakeholder storytelling in one live, hands-on session.</p>
          {/* social proof above the fold */}
          <p className="hero-proof">
            <span><i className="ph-fill ph-users-three" /><b>{fmt(REGISTERED)}</b> registered</span>
            <span><i className="ph-fill ph-graduation-cap" /><b>6,800+</b> analysts mentored by {MENTOR.name.split(' ')[0]}</span>
            <span><i className="ph-fill ph-seal-check" />Certificate included</span>
          </p>
        </div>

        <div className="hero-grid">
          {/* glowing planet-horizon arc the cards sit on */}
          <div className="horizon" aria-hidden="true" />
          <div className="portrait rv" style={{ '--i': 1 }}>
            <div className="portrait-frame">
              <DashboardBackdrop />
              <Portrait src={MENTOR.photo} alt={`Portrait of mentor ${MENTOR.name}`} eager />
            </div>
            <div className="nameplate">
              <b>{MENTOR.name.toUpperCase()}</b>
              <span>{MENTOR.title}</span>
            </div>
            <p className="bio">
              <strong>{MENTOR.name}</strong> has led analysis for 240+ product launches across fintech and SaaS, and has mentored 6,800+ analysts into their first BA role.
            </p>
          </div>

          <div className="details rv" style={{ '--i': 2 }}>
            <h2 className="details-title">WORKSHOP DETAILS</h2>
            <div className="drow"><span className="k"><i className="ph ph-calendar-blank" />Date</span><span className="v">{EVENT.date}</span></div>
            <div className="drow"><span className="k"><i className="ph ph-clock" />Time</span><span className="v">{EVENT.time}</span></div>
            <div className="drow"><span className="k"><i className="ph ph-video-camera" />Live on</span><span className="v">{EVENT.platform}</span></div>
            <div className="drow"><span className="k"><i className="ph ph-translate" />Language</span><span className="v">{EVENT.language}</span></div>
            <CtaBlock label="Yes! Reserve My Seat For" placement="hero" trustFirst full extraClass="" />
            <p className="ask">
              Questions before you join?{' '}
              <WhatsAppLink placement="hero">WhatsApp {WHATSAPP_DISPLAY}</WhatsAppLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tools() {
  const logos = (hidden) =>
    TOOLS.map((s) => (
      <figure key={`${s}-${hidden ? 'b' : 'a'}`} aria-hidden={hidden || undefined}>
        <img src={`https://cdn.simpleicons.org/${s}/E6E1F5`} alt={hidden ? '' : s} width="30" height="30" loading="lazy" />
      </figure>
    ));
  return (
    <section className="tools">
      <h2 className="tools-title rv">Tools You Will Work In During The Session</h2>
      <div className="marquee rv" style={{ '--i': 1 }}>
        {/* duplicated once so the -50% loop is seamless */}
        <div className="marquee-track">{logos(false)}{logos(true)}</div>
      </div>
    </section>
  );
}

/* ---------- Video testimonials (Vimeo) ----------
   "Lite" embeds: each card shows a poster and a play button, and the Vimeo
   iframe (about 1 MB of player code) only loads when someone taps play. That
   keeps the page fast for ad traffic. Only one video plays at a time. */

const vimeoSrc = ({ vimeoId, hash }) => {
  const p = new URLSearchParams({
    autoplay: '1', title: '0', byline: '0', portrait: '0', dnt: '1', color: 'A970FF',
  });
  if (hash) p.set('h', hash);
  return `https://player.vimeo.com/video/${vimeoId}?${p}`;
};

// Fetch the video's thumbnail from Vimeo's public oEmbed API, once the section is near.
function useVimeoThumb(video, enabled) {
  const [thumb, setThumb] = useState(null);
  useEffect(() => {
    if (!enabled) return undefined;
    let alive = true;
    const page = `https://vimeo.com/${video.vimeoId}${video.hash ? `/${video.hash}` : ''}`;
    fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(page)}&width=1280`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d?.thumbnail_url) setThumb(d.thumbnail_url); })
      .catch(() => {});
    return () => { alive = false; };
  }, [video.vimeoId, video.hash, enabled]);
  return thumb;
}

function useNear(ref, margin = '600px') {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setNear(true); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); io.disconnect(); }
    }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return near;
}

function VideoCard({ video, index, featured = false, playing, onPlay, near }) {
  const thumb = useVimeoThumb(video, near);
  return (
    <article className={`vcard${featured ? ' featured' : ''}${playing ? ' playing' : ''}`}>
      <div className="vframe">
        {playing ? (
          <iframe
            src={vimeoSrc(video)}
            title={`${video.who}: video testimonial`}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            allowFullScreen
          />
        ) : (
          <button type="button" className="vposter" onClick={onPlay} aria-label={`Play ${video.who}'s story`}>
            {thumb ? <img src={thumb} alt="" loading="lazy" decoding="async" /> : <ResultArt seed={video.seed} index={index} />}
            <span className="vplay" aria-hidden="true"><i className="ph-fill ph-play" /></span>
            {featured && <span className="vtag" aria-hidden="true"><i className="ph-fill ph-star" />Featured story</span>}
          </button>
        )}
      </div>
      <div className="vmeta">
        <div className="metric">{video.metric}</div>
        <div>
          <div className="who">{video.who}</div>
          <div className="path">{video.path}</div>
        </div>
      </div>
    </article>
  );
}

function Results() {
  const ref = useRef(null);
  const near = useNear(ref);
  const [playing, setPlaying] = useState(null);
  const play = (i) => {
    setPlaying(i);
    track('ViewContent', { content_type: 'video_testimonial', content_name: RESULTS[i].who });
  };
  const [first, ...rest] = RESULTS;

  return (
    <section className="results-shell" ref={ref}>
      <div className="wrap">
        <div className="results-head rv">
          <h2 className="display">Real Analysts. Real Promotions.</h2>
          <p>Hear It From Past Cohorts: Where They Landed After Using This Playbook</p>
        </div>
        <div className="vlayout">
          <div className="rv">
            <VideoCard video={first} index={0} featured near={near} playing={playing === 0} onPlay={() => play(0)} />
          </div>
          {/* On phones this becomes a swipeable row */}
          <div className="vrail rv" style={{ '--i': 1 }} aria-label="More video stories">
            {rest.map((v, k) => (
              <VideoCard key={v.who} video={v} index={k + 1} near={near} playing={playing === k + 1} onPlay={() => play(k + 1)} />
            ))}
          </div>
        </div>
        <p className="vhint" aria-hidden="true"><i className="ph ph-hand-swipe-left" />Swipe for more stories</p>
      </div>
    </section>
  );
}

function Pains() {
  return (
    <section className="pains">
      <div className="wrap">
        <span className="pill rv">Who This Is For</span>
        <h2 className="display h2 rv">Do You Relate To Any Of These While <span className="hl">Building Your BA Career?</span></h2>
        <p className="lead rv">A live workshop for graduates, switchers and working analysts who want to think in systems, speak data, and get hired for it.</p>
        <div className="pain-grid">
          {PAINS.map(([icon, text], i) => (
            <div className="pain rv" style={{ '--i': i }} key={icon}>
              <div className="ico"><i className={`ph ${icon}`} /></div>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurveLabel({ cls, x, dotY, lineTop, titleY, title, body }) {
  const ink = '#FBFDFF';
  const display = { fill: ink, fontFamily: 'Red Hat Display, sans-serif', fontWeight: '500', fontSize: '30' };
  const small = { fill: ink, fillOpacity: '.68', fontFamily: 'Red Hat Display, sans-serif', fontSize: '13' };
  return (
    <g className={`lbl ${cls}`}>
      <line x1={x} y1={dotY - 3} x2={x} y2={lineTop} stroke={ink} strokeOpacity=".7" strokeWidth="2" />
      <circle cx={x} cy={dotY} r="9" fill="#0E0A17" stroke={ink} strokeWidth="2" />
      <circle cx={x} cy={dotY} r="4" fill="#A970FF" />
      <text x={x - 6} y={titleY} textAnchor="end" {...display}>{title[0]}</text>
      <text x={x - 6} y={titleY + 32} textAnchor="end" {...display}>{title[1]}</text>
      <line x1={x + 6} y1={titleY - 16} x2={x + 6} y2={titleY + 36} stroke={ink} strokeOpacity=".5" />
      <text x={x + 16} y={titleY} {...small}>{body[0]}</text>
      <text x={x + 16} y={titleY + 17} {...small}>{body[1]}</text>
    </g>
  );
}

function Audience() {
  return (
    <section className="audience" id="audience">
      <div className="wrap">
        <div className="aud-inner">
          <div className="aud-copy rv">
            <small>Data Is The New Language Of Business</small>
            <h2 className="display">Who Is This <span className="hl">Analyst</span><br />Workshop For?</h2>
          </div>
          <svg className="curve" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Growth curve from fresh graduates to career switchers to working analysts">
            <rect x="0" y="0" width="1200" height="600" fill="url(#gridInk)" />
            <radialGradient id="curveHalo" cx="70%" cy="40%" r="55%">
              <stop offset="0" stopColor="#A970FF" stopOpacity=".2" />
              <stop offset="1" stopColor="#A970FF" stopOpacity="0" />
            </radialGradient>
            <rect width="1200" height="600" fill="url(#curveHalo)" />
            <linearGradient id="areaFadeX" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".35" stopColor="#fff" />
              <stop offset=".8" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="areaMask"><rect x="80" y="0" width="1100" height="600" fill="url(#areaFadeX)" /></mask>
            <path d="M80 540 C 260 520, 330 470, 440 410 S 640 330, 760 270 S 980 120, 1140 40 L1200 40 L1200 600 L80 600Z" fill="url(#gFade)" opacity=".45" mask="url(#areaMask)" />
            <path className="stroke" d="M80 540 C 260 520, 330 470, 440 410 S 640 330, 760 270 S 980 120, 1140 40" fill="none" stroke="url(#gCurve)" strokeWidth="8" strokeLinecap="round" />
            <CurveLabel cls="l1" x={290} dotY={503} lineTop={400} titleY={356} title={['Fresh', 'Graduates']} body={['Land a first role', 'with a real portfolio.']} />
            <CurveLabel cls="l2" x={600} dotY={347} lineTop={250} titleY={206} title={['Career', 'Switchers']} body={['Turn domain know-how', 'into BA leverage.']} />
            <CurveLabel cls="l3" x={930} dotY={162} lineTop={96} titleY={52} title={['Working', 'Analysts']} body={['Move from reporting', 'to recommending.']} />
          </svg>
          <ul className="aud-list">
            {AUDIENCE.map(([b, s]) => (
              <li key={b}><b>{b}</b><span>{s}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section className="modules">
      <div className="wrap">
        <h2 className="display h2 rv">Inside This Live <span className="hl">3 Hour</span> Analyst Bootcamp</h2>
        <p className="lead rv">You'll learn and build live alongside graduates, career switchers and working analysts.</p>
        <div className="mod-grid">
          {MODULES.map((m, i) => (
            <article className="mod rv" style={{ '--i': i }} key={m.n}>
              <span className="pill">MODULE {m.n}</span>
              <h3>{m.title}</h3>
              <ul>
                {m.items.map((it) => (
                  <li key={it}><i className="ph ph-check-circle" />{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <CtaBlock label="Claim My Spot Before It's Gone For" placement="modules" />
      </div>
    </section>
  );
}

function ValueStack() {
  return (
    <section className="value">
      <div className="wrap">
        <div className="stack rv">
          <h2 className="display h2">What You're Getting <span className="hl">Today:</span></h2>
          <ul>
            {VALUE_STACK.map(([icon, label, worth]) => (
              <li key={label}><i className={icon} /><span>{label} <em>(Value: {worth})</em></span></li>
            ))}
          </ul>
          <p className="total">Total Real-World Value: <s>₹18,995</s></p>
          <p className="invest">Your Investment<br />Today : <span className="hl">₹{PRICE}</span></p>
        </div>
        <CtaBlock label="Start My Analyst Journey For" placement="value" />
      </div>
    </section>
  );
}

function Mentor() {
  return (
    <section className="mentor">
      <div className="wrap">
        <div className="mentor-card rv">
          <div className="top">
            <h2 className="display h2">Meet Your Mentor : <span className="hl">{MENTOR.name}</span></h2>
            <span className="pill">Lead Business Analyst, 11 Years In Fintech &amp; SaaS</span>
          </div>
          <div className="mentor-photo">
            <Portrait src={MENTOR.photo} alt={`${MENTOR.name} at work`} />
            <svg viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="mShade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset=".45" stopColor="#0E0A17" stopOpacity="0" />
                  <stop offset="1" stopColor="#0E0A17" stopOpacity=".92" />
                </linearGradient>
              </defs>
              <rect width="400" height="500" fill="url(#mShade)" />
              <path d="M20 450 L80 420 L130 432 L190 380 L250 392 L310 330 L380 300" fill="none" stroke="#A970FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <g fill="#A970FF"><circle cx="190" cy="380" r="5" /><circle cx="310" cy="330" r="5" /><circle cx="380" cy="300" r="6" /></g>
            </svg>
          </div>
          <div className="mentor-copy">
            <p className="roles">Product Analytics · Requirements Lead · Career Mentor</p>
            <div className="stats">
              <div><CountUp end={11} suffix="+" /><span>Years in analysis</span></div>
              <div><CountUp end={240} suffix="+" /><span>Launches analysed</span></div>
              <div><CountUp end={6800} suffix="+" /><span>Analysts mentored</span></div>
            </div>
            <p>Meera started in customer support, taught herself SQL on night shifts, and moved into her first BA role at a payments company within 14 months.</p>
            <p>Since then she has written requirements for lending, payouts and onboarding products used by millions, and now leads a team of 9 analysts.</p>
            <p>This is not a recorded course. This is Meera working through <strong>three live cases</strong> with you, using the exact templates her team uses every sprint.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section className="outcomes">
      <div className="wrap">
        <h2 className="display h2 rv">Your Analyst Career System</h2>
        <div className="out-grid">
          {OUTCOMES.map(([icon, text], i) => (
            <div className="out rv" style={{ '--i': i }} key={icon}>
              <span>{text}</span>
              <span className="ico"><i className={`ph ${icon}`} /></span>
            </div>
          ))}
        </div>
        <CtaBlock label="Yes! Reserve My Seat For" placement="outcomes" />
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq">
      <div className="wrap">
        <h2 className="display h2 rv">Frequently Asked <span className="hl">Questions</span></h2>
        <div className="faq-list">
          {FAQS.map(([q, a]) => (
            <details className="rv" key={q}>
              <summary>{q}<i className="ph ph-plus" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <div className="support rv">
          <span>Still unsure? Talk to our team before you register.</span>
          <WhatsAppLink placement="faq" className="wa-link strong">Chat on WhatsApp · {WHATSAPP_DISPLAY}</WhatsAppLink>
        </div>
        <div className="horizon-band" aria-hidden="true"><div className="horizon" /></div>
        <h2 className="display h2 final-title rv">Ready To Become The Analyst <span className="hl">Leadership Listens To?</span></h2>
        <CtaBlock label="Start My Analyst Journey For" placement="final" id="enrol" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>© {new Date().getFullYear()} Analyst Playbook Live. All rights reserved.</span>
        <span className="foot-links">
          <WhatsAppLink placement="footer">{WHATSAPP_DISPLAY}</WhatsAppLink>
          {/* PLACEHOLDER: Meta requires a reachable privacy policy for lead/checkout pages */}
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </span>
      </div>
    </footer>
  );
}

function StickyBar({ show }) {
  return (
    <div className={`sticky${show ? ' show' : ''}`} role="region" aria-label="Limited seats">
      <span className="chip">{EVENT.lengthLabel}</span>
      <div className="wrap">
        <div className="urg">
          <div><b>Hurry Up!</b> Only {SEATS_LEFT} seats left at ₹{PRICE}</div>
          <small>Offer ends in <Timer /></small>
        </div>
        <CtaButton placement="sticky" className="">
          Reserve My Seat · ₹{PRICE}
        </CtaButton>
      </div>
    </div>
  );
}

/* ==================================================================
   App
   ================================================================== */
export default function App() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  useReveal(rootRef);
  const showSticky = useStickyAfter(heroRef);

  return (
    <div className="page" ref={rootRef}>
      <SvgDefs />
      <div className="topbar">For <b>Graduates, Career Switchers &amp; Working Analysts</b> Ready To Level Up</div>
      <main>
        <Hero heroRef={heroRef} />
        <Tools />
        <Results />
        <Pains />
        <Audience />
        <Modules />
        <ValueStack />
        <Mentor />
        <Outcomes />
        <Faq />
      </main>
      <Footer />
      <StickyBar show={showSticky} />
    </div>
  );
}
