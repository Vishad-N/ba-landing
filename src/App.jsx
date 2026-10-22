import { useEffect, useRef, useState } from 'react';
import './App.css';

/* ==================================================================
   CONFIG — all copy, numbers and contact details come from Rupak
   Aich's live page: https://teamproductivityonspeed.com/posonline/
   Edit them here; nothing is hard-coded further down.
   ================================================================== */

// Every CTA opens the registration page.
const REGISTER_URL = 'https://webinar.gg/register/cmvj4mk8600fos60ylzzqtq81';

const EVENT_NAME = 'MAP49™ Online Live Session';
const COMPANY = 'Sparsh Magic';
const TAGLINE = 'Growth. Yours Forever.';

const PHONE_DISPLAY = '+91 96309 21905';
const PHONE_TEL = 'tel:+919630921905';
const WHATSAPP_LINK =
  'https://wa.me/919630921905?text=' +
  encodeURIComponent('Hi, I have a question about the MAP49 Online Live Session.');
const WEBSITE_URL = 'https://www.teamproductivityonspeed.com';
const WEBSITE_LABEL = 'teamproductivityonspeed.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/rupakaich/';

const EVENT = {
  date: 'Sunday, 25th October 2026',
  dateShort: '25th October',
  time: '09:00 AM - 11:00 AM IST',
  startsAt: '2026-10-25T09:00:00+05:30',
  platform: 'ZOOM',
  price: 'FREE',
  lengthLabel: '2 Hour Live Session',
};

const SEATS_TOTAL = 100;
const SEATS_TAKEN = 73;
const SEATS_LEFT = SEATS_TOTAL - SEATS_TAKEN;
const SEAT_ICONS = 12;

const MENTOR = {
  name: 'Rupak Aich',
  title: "India's #1 Team Productivity Expert",
  photo: '/rupak-aich.jpg',
};

// Hero intro video (landscape 16:9).
// vimeoId: the number in vimeo.com/123456789. For unlisted videos also set `hash`
// (the part after the slash in vimeo.com/123456789/abcdef1234).
// In Vimeo: Settings > Privacy > allow embedding on your domain, and keep audio on.
const INTRO_VIDEO = { vimeoId: '1238382386', hash: '' };

const HEADLINE_STATS = [
  ['ph-fill ph-buildings', '342+ MSMEs Transformed'],
  ['ph-fill ph-users-three', '32,000+ Employees Analyzed'],
  ['ph-fill ph-star', '5-Star Rated by Founders'],
];

const CLIENTS = [
  'S Square Marketing', 'Kohinoor Mall', 'JSA', 'A D Naik Wealth', 'Patco Precision', '38barracks',
];

const PAINS = [
  ['ph-arrows-clockwise', 'Constant Follow-Ups. Every. Single. Day.', 'You ask once. Nothing happens. You follow up. Still nothing. You feel like you\'re the only one who cares.', 'Stealing 4+ hours daily from you'],
  ['ph-door-open', 'Good Employees Keep Leaving', 'You train them. You invest in them. And just when they become valuable, they resign. Each exit costs more than you realise.', '₹1,25,000 lost per employee exit'],
  ['ph-user-circle-minus', 'No Ownership. No Accountability.', 'Every decision routes through you. Your team waits for instruction before moving. You\'ve become the system.', 'Zero scalability without you'],
  ['ph-chart-line-down', 'Profits Not Growing Despite Hard Work', 'Revenue looks okay but margins are shrinking. Effort is going up but the numbers don\'t reflect it. Something is leaking.', 'Up to 30% profit leaked silently'],
  ['ph-umbrella-simple', 'You Can\'t Take A Break Without It Breaking', 'No holiday. No real weekend. Because the moment you step away, things start to fall apart without you there.', 'Zero business freedom'],
  ['ph-users-three', 'Hiring More Isn\'t The Solution', 'You\'ve tried hiring better people. But the same problems repeat with every new face. The issue is deeper.', 'The real issue is the missing system'],
];

const JOURNEY = [
  ['Follow-Up Culture', 'Owner chases every task.'],
  ['Automatic Accountability', 'Systems, not supervision.'],
  ['Self-Driven Team', 'Delivery without being pushed.'],
];

const MODULES = [
  { n: '01', title: 'The MAP49™ Team Productivity Framework', items: [
    'The complete Matrix of Accountability and Productivity: 4 areas, 9 performance scores',
    'Know exactly where your team is leaking productivity and profit right now',
  ] },
  { n: '02', title: 'How to Install Automatic Accountability', items: [
    'Accountability is not a behaviour problem, it is a system installation problem',
    'Build it into your team permanently without being the police',
  ] },
  { n: '03', title: 'End the Follow-Up Culture Forever', items: [
    'The one framework that removes constant follow-ups from your daily life',
    'Replace them with structured team ownership you can implement within days',
  ] },
  { n: '04', title: 'Why Good Employees Leave, and How to Stop It', items: [
    'The real reasons your best people quit (it\'s not salary)',
    'The proven system fix that retains them for years, in any industry',
  ] },
  { n: '05', title: 'From Dependent Team to Self-Driven Team', items: [
    'The roadmap from a team that needs you for everything to one that delivers without being pushed',
    'So you can finally work ON your business',
  ] },
  { n: '06', title: 'Live Case Studies + Q&A with Rupak', items: [
    'Real MSME examples with measurable before/after results',
    'Rupak answers your specific business and team challenges live',
  ] },
];

const MENTOR_STATS = [
  [20, '+', 'Years of experience'],
  [342, '+', 'MSMEs studied'],
  [32000, '+', 'Employees analyzed'],
];

const WINS = [
  'Built the MAP49™ system from 342+ real MSME case studies, not imported theories',
  'Helped a retail chain go from 100% owner-dependent to fully self-running in 90 days',
  'Delivered 171% revenue growth for a distribution business in 2 years',
  'Reduced operational costs by 15% across multiple businesses without firing anyone',
  'Featured speaker for MSME associations and business chambers across India',
  'Trusted by founders in Manufacturing, Retail, Healthcare, Finance and Services',
];

const GALLERY = [
  ['/image1.jpg', 'Rupak Aich speaking at a live event', 'Live Event'],
  ['/image2.jpg', 'A MAP49 workshop session', 'Workshop Session'],
  ['/image3.jpg', 'Recognition and awards', 'Recognition & Awards'],
];

const RESULT_STATS = [
  ['ph-trend-up', '21%', 'Average Profit Growth', 'via engaged teams'],
  ['ph-coins', '171%', 'Revenue Growth', 'in 2 years'],
  ['ph-trend-down', '15%', 'Cost Reduction', 'without firing anyone'],
  ['ph-target', '35%', 'Team ROI Increase', 'average across MSMEs'],
];

const CASE_STUDY = [
  ['Daily Review System', 'Random', 'Structured'],
  ['Task Completion Rate', '61%', '94%'],
  ['MD Intervention Needed', 'Daily', 'Weekly'],
  ['Employee Retention Rate', '0%', '92%'],
];

const TESTIMONIALS = [
  ['UA', 'Umesh Agrawal', 'S Square Marketing, Distributor', 'By our side we have grown in ways we hadn\'t even dreamt of. In two years with Rupak we have grown by 171%.'],
  ['AG', 'Ashwin Gandhi', 'Kohinoor Mall, Retail', 'Team capable of handling the store on its own. They can now play with data, think data and work with data. This has been my biggest achievement.'],
  ['JS', 'Jagmohan Singh', 'JSA', 'Team productivity increased by 70%. I rate them 8 out of 10 in implementing Team Productivity. The system actually works.'],
  ['NN', 'Nikhil Naik', 'A D Naik Wealth', 'Team got aligned and we are on growth trajectory. The MAP49 system gave us clarity we never had before in 10 years of business.'],
  ['RP', 'Ravindra Patil', 'Patco Precision', 'The clarity I got about my team\'s performance in one session was more than I got in 5 years of running the business.'],
  ['MF', 'MSME Founder', 'MAP49™ Online Attendee', 'I have been running my business for 12 years and nobody ever showed me this. This is the most practical thing I have ever attended.'],
];

// YouTube testimonials. The first one is the featured (large) video.
const VIDEOS = [
  { id: 'Z_UgC6dlifg', metric: '171%', who: 'POS Online', path: 'In two years with Rupak, we grew by 171%. The MAP49 system changed everything.' },
  { id: '4gbyKHIk07Q', metric: '70%', who: 'Jagmohan Singh, JSA', path: 'Team\'s productivity increased by 70%. The system actually works.' },
  { id: 'e-VT1RWkI7A', metric: 'Aligned', who: 'Ankur Agarwal, 38barracks', path: 'Team aligned, on growth trajectory. Clarity we never had in 10 years.' },
];

const ATTEND = [
  'You are a Business Owner, Founder or MD',
  'You have a team of 10+ employees',
  'You are in Manufacturing, Retail, Services, Distribution or Healthcare',
  'Your team lacks ownership and accountability',
  'You are dealing with high attrition and constant follow-ups',
  'You want to scale but feel the team can\'t handle it',
  'You want to work ON your business, not IN it',
];

const SKIP = [
  'You are looking for a motivational talk',
  'You think your team is the problem (not the system)',
  'You are not willing to implement new frameworks',
  'You haven\'t started a business yet',
  'You believe hiring more people will fix everything',
  'You want theory without real implementation',
];

const GIFTS = [
  ['ph-clipboard-text', 'Team Accountability Templates', 'Ready-to-use templates to install accountability in your team from Day 1.'],
  ['ph-calculator', 'Productivity Calculation Models', 'Simple models to calculate exactly how much productivity is leaking from your team right now.'],
  ['ph-list-checks', 'Implementation Checklist', 'A step-by-step checklist to implement the MAP49™ system within 30 days.'],
  ['ph-gift', 'Surprise Digital Gifts', 'Special digital gifts shared with every live attendee. You have to show up to find out.'],
  ['ph-chats-circle', 'Live Q&A with Rupak', 'Ask your specific business and team challenges directly to Rupak. Get answers live on Zoom.'],
  ['ph-crown-simple', 'Executive Circle (Last 30 Seats)', 'The last 30 registrations get VIP placement, priority Q&A access and exclusive benefits on the call.'],
];

const VALUE_STACK = [
  'Complete MAP49™ Team Productivity System',
  '9-Matrix Team Performance Score',
  'Live Implementation Frameworks',
  'Real MSME Case Studies',
  'Action Plan for Your Business',
  'Team Accountability Templates',
  'Productivity Calculation Models',
  'Implementation Checklist',
  'Join from Anywhere in India via Zoom',
  'Live Q&A with Rupak Aich',
  'Surprise Digital Gifts for All Attendees',
];

const FAQS = [
  ['Is this a recorded session or live?', 'This is a fully LIVE online session on Zoom. Not a recording. Not a replay. You need to show up live. The live format is intentional: real questions, real answers, real transformation in real time.'],
  ['I have attended workshops before. How is this different?', 'Most workshops give you knowledge. This gives you a system. MAP49™ is not a concept you take notes on. It is a working framework you implement the very next day. Every session is built on 342+ real MSME case studies, not theory from a textbook.'],
  ['Do I need to install anything to join?', 'No installation needed. Just click the Zoom link you receive after registration. You can join from your phone, tablet or laptop. Make sure you have a stable internet connection and a quiet place to sit for the full session.'],
  ['Why is this session completely free?', 'This session is 100% free because we believe every serious founder deserves access to the MAP49™ system, regardless of budget. Our mission is transformation at scale. No hidden costs, no upsell surprises on the call. Just show up and learn.'],
  ['What if I miss the live session?', `There is no replay or recording of this session. If you miss it you will have to wait for the next live event. We strongly recommend you register and block your calendar right now. WhatsApp us on ${PHONE_DISPLAY} if you have any questions.`],
  ['My team has only 10 people. Is this still relevant?', 'Yes. The MAP49™ framework is designed for teams of all sizes. Whether you have 10 or 1000 employees, the accountability and productivity systems are applicable. The earlier you install this, the faster your business grows without you.'],
  ['Will there be a recording after the session?', 'There will be NO recording of this session. This is intentional. The live format creates better learning, better questions and better transformation. Attend live or miss it entirely. Register now to make sure you show up.'],
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
  track('Lead', { content_name: EVENT_NAME, placement });

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

// Seconds left until the live session starts.
function useCountdownToEvent() {
  const calc = () => Math.max(0, Math.floor((new Date(EVENT.startsAt) - Date.now()) / 1000));
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
      </defs>
    </svg>
  );
}

function CtaButton({ children, className = '', placement }) {
  return (
    <a
      href={REGISTER_URL}
      className={`btn ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta(placement)}
    >
      {children}
    </a>
  );
}

function Trust() {
  return (
    <div className="trust">
      <span><i className="ph ph-gift" />100% Free</span>
      <span><i className="ph ph-video-camera" />Live on Zoom</span>
      <span><i className="ph ph-clipboard-text" />Templates Included</span>
      <span><i className="ph ph-question" />Live Q&amp;A With Rupak</span>
    </div>
  );
}

function Proof() {
  return (
    <span className="proof">
      <i className="ph-fill ph-users-three" />
      {SEATS_TAKEN} of {SEATS_TOTAL} seats taken
    </span>
  );
}

function Seats() {
  const taken = Math.round((SEATS_TAKEN / SEATS_TOTAL) * SEAT_ICONS);
  return (
    <div className="seats">
      <span className="seat-row" aria-hidden="true">
        {Array.from({ length: SEAT_ICONS }, (_, i) => (
          <i key={i} className={`ph-fill ph-armchair${i >= taken ? ' off' : ''}`} />
        ))}
      </span>
      <span className="left">Only {SEATS_LEFT} seats left · No replay</span>
    </div>
  );
}

/* CTA block: one action, repeated with the same promise every time. */
function CtaBlock({ label = 'Register Now, It\'s Free', placement, id, trustFirst = false, full = false, extraClass = 'rv' }) {
  return (
    <div className={`cta-block ${extraClass}`} id={id}>
      <CtaButton className={full ? 'full' : 'wide'} placement={placement}>
        🔥 {label}
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

function Photo({ src, alt, eager = false, width = 900, height = 1125 }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
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
  const s = useCountdownToEvent();
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <span className="timer" role="timer" aria-label="Time until the live session starts">
      <span>{pad(Math.floor(s / 86400))}d</span>
      <span>{pad(Math.floor((s % 86400) / 3600))}h</span>
      <span>{pad(Math.floor((s % 3600) / 60))}m</span>
      <span>{pad(s % 60)}s</span>
    </span>
  );
}

/* Mobile-only ambient background: drifting purple light, a faint grid that
   shifts as you scroll, and a few twinkling points. Pure transforms/opacity,
   so it stays smooth on phones. Hidden on desktop by CSS. */
const MBG_DOTS = [
  [8, 6, 0], [86, 11, 1.4], [22, 24, 2.6], [70, 33, .8], [12, 47, 3.2],
  [92, 55, 2], [40, 63, .4], [78, 74, 3.6], [18, 86, 1.8], [58, 94, 2.9],
];

function MobileBackdrop() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia?.('(max-width: 767px)').matches || prefersReducedMotion()) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => el.style.setProperty('--sy', String(window.scrollY)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="mbg" ref={ref} aria-hidden="true">
      <span className="o o1" /><span className="o o2" /><span className="o o3" />
      <span className="mgrid" />
      {MBG_DOTS.map(([x, y, d]) => (
        <i key={`${x}-${y}`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }} />
      ))}
    </div>
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

/* ---------- Hero intro video (Vimeo) ----------
   Autoplays muted and loops. Hovering the card (mouse) unmutes it; leaving
   mutes it again. Click / tap / Enter pins the sound on or off, which is also
   the only route on touch screens, and it is what browsers require anyway:
   unmuted audio needs a user gesture, and hover alone is not one. If a
   browser blocks hover-unmute, we fall back to muted playback and the pill
   asks for a click. Playback pauses while the card is off screen. */

let vimeoApi;
const loadVimeoApi = () => {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.Vimeo) return Promise.resolve(window.Vimeo);
  vimeoApi ||= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://player.vimeo.com/api/player.js';
    s.async = true;
    s.onload = () => resolve(window.Vimeo);
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return vimeoApi;
};

const introSrc = (reduced) => {
  const p = new URLSearchParams({
    autoplay: reduced ? '0' : '1', muted: '1', loop: '1', controls: '0', playsinline: '1',
    title: '0', byline: '0', portrait: '0', dnt: '1', autopause: '0', color: 'A970FF',
  });
  if (INTRO_VIDEO.hash) p.set('h', INTRO_VIDEO.hash);
  return `https://player.vimeo.com/video/${INTRO_VIDEO.vimeoId}?${p}`;
};

function IntroVideo() {
  const frameRef = useRef(null);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const startedRef = useRef(false);
  const [reduced] = useState(prefersReducedMotion);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [thumb, setThumb] = useState(null);
  const wantSound = hover || pinned;

  // Poster from Vimeo's public oEmbed API, then mount the player shortly after first paint.
  useEffect(() => {
    let alive = true;
    const page = `https://vimeo.com/${INTRO_VIDEO.vimeoId}${INTRO_VIDEO.hash ? `/${INTRO_VIDEO.hash}` : ''}`;
    fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(page)}&width=1280`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d?.thumbnail_url) setThumb(d.thumbnail_url); })
      .catch(() => {});
    const t = setTimeout(() => setMount(true), 300);
    return () => { alive = false; clearTimeout(t); };
  }, []);

  useEffect(() => {
    if (!mount) return undefined;
    let dead = false;
    loadVimeoApi()
      .then((V) => {
        if (dead || !iframeRef.current) return;
        const p = new V.Player(iframeRef.current);
        playerRef.current = p;
        p.ready().then(() => !dead && setReady(true)).catch(() => {});
        p.on('timeupdate', (d) => setProgress(d.percent || 0));
      })
      .catch(() => {});
    return () => { dead = true; };
  }, [mount]);

  // Sound follows hover / pin.
  useEffect(() => {
    const p = playerRef.current;
    if (!p || !ready) return;
    const setSound = (on) =>
      (p.setMuted ? p.setMuted(!on) : Promise.resolve()).then(() => p.setVolume(on ? 1 : 0));
    if (!wantSound) { setSound(false).catch(() => {}); return; }
    let cancelled = false;
    setSound(true)
      .then(() => new Promise((r) => setTimeout(r, 300)))
      .then(() => p.getPaused())
      .then((paused) => { if (paused && !cancelled) { startedRef.current = true; return p.play(); } return null; })
      .then(() => { if (!cancelled) setBlocked(false); })
      .catch(() => {
        // Browser refused unmuted playback without a gesture: stay muted and ask for a click.
        setSound(false).then(() => p.play()).catch(() => {});
        if (!cancelled && !pinned) setBlocked(true);
      });
    return () => { cancelled = true; };
  }, [wantSound, ready, pinned]);

  // Pause while off screen to save battery and data.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !ready || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => {
      const p = playerRef.current;
      if (!p) return;
      if (!e.isIntersecting) p.pause().catch(() => {});
      else if (!reduced || startedRef.current) p.play().catch(() => {});
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [ready, reduced]);

  const toggle = () => {
    startedRef.current = true;
    setBlocked(false);
    setPinned((v) => !v);
  };
  const showPlay = reduced && !startedRef.current && !pinned;

  return (
    <div className="intro rv" style={{ '--i': 1 }}>
      <div
        ref={frameRef}
        className={`intro-card${wantSound ? ' sound' : ''}${ready ? ' ready' : ''}`}
        role="button"
        tabIndex={0}
        aria-pressed={pinned}
        aria-label={`Intro video from ${MENTOR.name}. ${pinned ? 'Press to mute' : 'Press to play with sound'}`}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHover(true); }}
        onPointerLeave={() => setHover(false)}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
      >
        <div className="intro-frame" style={thumb ? { backgroundImage: `url(${thumb})` } : undefined}>
          {mount && (
            <iframe
              ref={iframeRef}
              src={introSrc(reduced)}
              title={`Intro video from ${MENTOR.name}`}
              allow="autoplay; fullscreen; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
          <span className="intro-badge"><i className="intro-dot" />Meet your host</span>
          {showPlay && <span className="intro-play" aria-hidden="true"><i className="ph-fill ph-play" /></span>}
          <div className="intro-bar">
            <span className="intro-sound" aria-live="polite">
              <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
              <i className={`ph-fill ${wantSound ? 'ph-speaker-high' : 'ph-speaker-slash'}`} aria-hidden="true" />
              {wantSound ? 'Sound on' : blocked ? 'Click for sound' : (<><span className="hov-only">Hover for sound</span><span className="touch-only">Tap for sound</span></>)}
            </span>
          </div>
          <span className="intro-progress" aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></span>
        </div>
        {/* caption sits below the video so it never covers anything baked into the footage */}
        <div className="intro-foot">
          <span className="intro-cap">
            <b>A quick hello from {MENTOR.name}</b>
            <small>{MENTOR.title}</small>
          </span>
          <span className="intro-when"><i className="ph ph-calendar-blank" aria-hidden="true" />{EVENT.dateShort} · 09:00 AM IST</span>
        </div>
      </div>
    </div>
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
            {EVENT_NAME} · {EVENT.dateShort} · Free
          </span>
          <h1 className="display h1">
            Can Your Business Run For <span className="hl">30 Days Without You?</span>
          </h1>
          <p className="tag">If not, the system is not working.</p>
          <p className="sub">Team Productivity on Speed</p>
          <p className="hero-proof">
            {HEADLINE_STATS.map(([icon, text]) => (
              <span key={text}><i className={icon} />{text}</span>
            ))}
          </p>
        </div>

        <IntroVideo />

        <div className="hero-grid">
          <div className="horizon" aria-hidden="true" />
          <div className="portrait rv" style={{ '--i': 1 }}>
            <div className="portrait-frame photo-fill">
              <Photo src={MENTOR.photo} alt={`Portrait of ${MENTOR.name}`} eager />
            </div>
            <div className="nameplate">
              <b>{MENTOR.name.toUpperCase()}</b>
              <span>{MENTOR.title}</span>
            </div>
            <p className="bio">
              <strong>{MENTOR.name}</strong> has spent 20+ years inside real Indian businesses and built the MAP49™ framework from <strong>342+ MSMEs</strong> and <strong>32,000+ employees</strong>.
            </p>
          </div>

          <div className="details rv" style={{ '--i': 2 }}>
            <h2 className="details-title">SESSION DETAILS</h2>
            <div className="drow"><span className="k"><i className="ph ph-calendar-blank" />Date</span><span className="v">{EVENT.date}</span></div>
            <div className="drow"><span className="k"><i className="ph ph-clock" />Time</span><span className="v">{EVENT.time}</span></div>
            <div className="drow"><span className="k"><i className="ph ph-video-camera" />Live on</span><span className="v">{EVENT.platform}</span></div>
            <div className="drow"><span className="k"><i className="ph ph-gift" />Price</span><span className="v">{EVENT.price}</span></div>
            <CtaBlock placement="hero" trustFirst full extraClass="" />
            <p className="ask">
              Having trouble?{' '}
              <WhatsAppLink placement="hero">WhatsApp {PHONE_DISPLAY}</WhatsAppLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  const names = (hidden) =>
    CLIENTS.map((s) => (
      <figure className="txt" key={`${s}-${hidden ? 'b' : 'a'}`} aria-hidden={hidden || undefined}>{s}</figure>
    ));
  return (
    <section className="tools">
      <h2 className="tools-title rv">Founders From These Businesses Have Implemented MAP49™</h2>
      <div className="marquee rv" style={{ '--i': 1 }}>
        {/* duplicated once so the -50% loop is seamless */}
        <div className="marquee-track">{names(false)}{names(true)}</div>
      </div>
    </section>
  );
}

function Pains() {
  return (
    <section className="pains light">
      <div className="wrap">
        <span className="pill rv">The Real Problem</span>
        <h2 className="display h2 rv">You're Working 12 Hours. <span className="hl">Your Business Feels Like It's Falling Apart.</span></h2>
        <p className="lead rv">The problem isn't your team. It isn't the economy. It's a missing system, and you're about to see exactly what it is.</p>
        <div className="pain-grid">
          {PAINS.map(([icon, title, text, stat], i) => (
            <div className="pain rv" style={{ '--i': i }} key={icon}>
              <div className="ico"><i className={`ph ${icon}`} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="stat">{stat}</span>
            </div>
          ))}
        </div>
        <p className="lead rv">If even ONE of these resonates, this session was built for you.</p>
        <CtaBlock label="Join on Zoom, It's Free" placement="pains" />
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

function Journey() {
  return (
    <section className="audience" id="journey">
      <div className="wrap">
        <div className="aud-inner">
          <div className="aud-copy rv">
            <small>From Dependent Team To Self-Driven Team</small>
            <h2 className="display">Build A Team<br />That <span className="hl">Owns</span> The Outcome</h2>
          </div>
          <svg className="curve" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Journey from follow-up culture to automatic accountability to a self-driven team">
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
            <CurveLabel cls="l1" x={290} dotY={503} lineTop={400} titleY={356} title={['Follow-Up', 'Culture']} body={['Owner chases', 'every task.']} />
            <CurveLabel cls="l2" x={600} dotY={347} lineTop={250} titleY={206} title={['Automatic', 'Accountability']} body={['Systems, not', 'supervision.']} />
            <CurveLabel cls="l3" x={930} dotY={162} lineTop={96} titleY={52} title={['Self-Driven', 'Team']} body={['Delivery without', 'being pushed.']} />
          </svg>
          <ul className="aud-list">
            {JOURNEY.map(([b, s]) => (
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
    <section className="modules light">
      <div className="wrap">
        <span className="pill rv">What You'll Discover</span>
        <h2 className="display h2 rv">In 2 Hours Live On Zoom, You'll Walk Away <span className="hl">With A System</span></h2>
        <p className="lead rv">Not theory. Not slides you'll forget. A working framework you implement on Monday morning.</p>
        <div className="mod-grid">
          {MODULES.map((m, i) => (
            <article className="mod rv" style={{ '--i': i % 3 }} key={m.n}>
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
        <CtaBlock placement="modules" />
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
            <span className="pill">Your Host</span>
            <h2 className="display h2">The Man Behind <span className="hl">MAP49™</span></h2>
          </div>
          <div className="mentor-photo">
            <Photo src={MENTOR.photo} alt={`${MENTOR.name} speaking`} />
            <a className="in-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label={`${MENTOR.name} on LinkedIn`}>
              <i className="ph-fill ph-linkedin-logo" />LinkedIn
            </a>
          </div>
          <div className="mentor-copy">
            <p className="roles">{MENTOR.title} · Founder, {COMPANY}</p>
            <div className="stats">
              {MENTOR_STATS.map(([end, suffix, label]) => (
                <div key={label}><CountUp end={end} suffix={suffix} /><span>{label}</span></div>
              ))}
            </div>
            <p>{MENTOR.name} is not a motivational speaker. He is a practitioner, someone who has spent over 20 years inside real Indian businesses, diagnosing exactly why teams underperform and fixing it with <strong>systems, not slogans</strong>.</p>
            <p>He developed the MAP49™ framework after studying 342+ MSMEs and analyzing over 32,000 employees across manufacturing, retail, services, distribution and healthcare.</p>
            <p>His consulting engagements typically cost between <strong>₹3 Lakh to ₹14 Lakh</strong> per business. In this live session, you get the same system, free.</p>
            <ul className="wins">
              {WINS.map((w) => (<li key={w}><i className="ph ph-check-circle" />{w}</li>))}
            </ul>
            <p className="mission"><strong>My Mission:</strong> Enhancing MSMEs' profitability for a stronger, faster-growing India.</p>
          </div>
        </div>

        <div className="gallery">
          {GALLERY.map(([src, alt, cap], i) => (
            <figure className="rv" style={{ '--i': i }} key={src}>
              <img src={src} alt={alt} width="1600" height="900" loading="lazy" />
              <figcaption>{cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="numbers light">
      <div className="wrap">
        <span className="pill rv">Proven Results</span>
        <h2 className="display h2 rv">Real Numbers. <span className="hl">Real Businesses. Real India.</span></h2>
        <p className="lead rv">Results from MSME founders who implemented MAP49™. Results may vary; individual outcomes depend on implementation.</p>
        <div className="stat-grid">
          {RESULT_STATS.map(([icon, big, label, sub], i) => (
            <div className="stat-card rv" style={{ '--i': i }} key={label}>
              <i className={`ph ${icon}`} />
              <b>{big}</b>
              <strong>{label}</strong>
              <span>{sub}</span>
            </div>
          ))}
        </div>

        <div className="case rv">
          <span className="pill">Real Case Study · Retail Industry</span>
          <h3>From 100% Owner-Dependent to Fully Self-Running in 90 Days</h3>
          <p>A retail business owner with 100% owner-dependent operations. Here's what happened in 90 days after implementing MAP49™.</p>
          <div className="case-grid">
            {CASE_STUDY.map(([label, before, after]) => (
              <div className="case-row" key={label}>
                <span className="lbl">{label}</span>
                <span className="ba"><small>Before</small><b>{before}</b></span>
                <i className="ph ph-arrow-right" aria-hidden="true" />
                <span className="ba after"><small>After</small><b>{after}</b></span>
              </div>
            ))}
          </div>
          <blockquote>"Now my team owns the outcome. I finally run a business, not a circus."</blockquote>
        </div>
      </div>
    </section>
  );
}

/* ---------- Video testimonials (YouTube) ----------
   "Lite" embeds: each card shows YouTube's thumbnail and a play button, and
   the iframe only loads on tap, which keeps the page fast for ad traffic.
   Only one video plays at a time. */

// maxresdefault is 16:9 with no baked-in black bars; fall back to hqdefault if a video has no HD thumbnail.
const ytThumb = (id, hd = true) => `https://i.ytimg.com/vi/${id}/${hd ? 'maxresdefault' : 'hqdefault'}.jpg`;
const ytSrc = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

function VideoCard({ video, featured = false, playing, onPlay }) {
  const [hd, setHd] = useState(true);
  return (
    <article className={`vcard${featured ? ' featured' : ''}${playing ? ' playing' : ''}`}>
      <div className="vframe">
        {playing ? (
          <iframe
            src={ytSrc(video.id)}
            title={`${video.who}: video testimonial`}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="vposter" onClick={onPlay} aria-label={`Play ${video.who}'s testimonial`}>
            <img src={ytThumb(video.id, hd)} alt="" loading="lazy" decoding="async" onError={() => setHd(false)} />
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
  const [playing, setPlaying] = useState(null);
  const play = (i) => {
    setPlaying(i);
    track('ViewContent', { content_type: 'video_testimonial', content_name: VIDEOS[i].who });
  };
  const [first, ...rest] = VIDEOS;

  return (
    <section className="results-shell light">
      <div className="wrap">
        <div className="results-head rv">
          <span className="pill">Founder Stories</span>
          <h2 className="display h2">Founders Who <span className="hl">Transformed Their Teams</span></h2>
          <p>Hear it from founders themselves</p>
          <span className="rating"><span className="stars" aria-hidden="true">★★★★★</span>5-Star Rated by Founders</span>
        </div>
        <div className="vlayout">
          <div className="rv">
            <VideoCard video={first} featured playing={playing === 0} onPlay={() => play(0)} />
          </div>
          {/* On phones this becomes a swipeable row */}
          <div className="vrail rv" style={{ '--i': 1 }} aria-label="More video stories">
            {rest.map((v, k) => (
              <VideoCard key={v.id} video={v} playing={playing === k + 1} onPlay={() => play(k + 1)} />
            ))}
          </div>
        </div>
        <p className="vhint" aria-hidden="true"><i className="ph ph-hand-swipe-left" />Swipe for more stories</p>

        <div className="tgrid">
          {TESTIMONIALS.map(([init, name, biz, quote], i) => (
            <figure className="tcard rv" style={{ '--i': i % 3 }} key={name + biz}>
              <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
              <blockquote>"{quote}"</blockquote>
              <figcaption>
                <span className="av" aria-hidden="true">{init}</span>
                <span><b>{name}</b><small>{biz}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <CtaBlock placement="results" />
      </div>
    </section>
  );
}

function Fit() {
  return (
    <section className="fit">
      <div className="wrap">
        <span className="pill rv">Is This For You?</span>
        <h2 className="display h2 rv">This Session Is Strictly For <span className="hl">The Right People</span></h2>
        <div className="fit-grid">
          <div className="fit-card yes rv">
            <h3><i className="ph-fill ph-check-circle" />You Should Attend If...</h3>
            <ul>{ATTEND.map((t) => (<li key={t}><i className="ph ph-check" />{t}</li>))}</ul>
          </div>
          <div className="fit-card no rv" style={{ '--i': 1 }}>
            <h3><i className="ph-fill ph-x-circle" />Skip This If...</h3>
            <ul>{SKIP.map((t) => (<li key={t}><i className="ph ph-x" />{t}</li>))}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gifts() {
  return (
    <section className="value">
      <div className="wrap">
        <div className="gifts-head rv">
          <span className="pill">Exclusive Gifts</span>
          <h2 className="display h2">You Also Get These <span className="hl">Gifts Free</span></h2>
          <p className="lead">Every registered live attendee walks out with these high-value resources to keep and implement immediately.</p>
        </div>
        <div className="gift-grid">
          {GIFTS.map(([icon, title, text], i) => (
            <div className="gift rv" style={{ '--i': i % 3 }} key={title}>
              <div className="ico"><i className={`ph ${icon}`} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="stack rv">
          <span className="pill">Most Popular · Founders Are Registering Fast</span>
          <h2 className="display h2">{EVENT_NAME}</h2>
          <p className="when">{EVENT.date} · {EVENT.time}</p>
          <ul>
            {VALUE_STACK.map((label) => (
              <li key={label}><i className="ph ph-check-circle" /><span>{label}</span></li>
            ))}
          </ul>
          <p className="invest">Your Investment<br />Today : <span className="hl">FREE</span></p>
          <p className="total">100% Free. No credit card. Just show up live on Zoom.</p>
        </div>
        <CtaBlock placement="value" />
        <p className="support rv">
          Having trouble? <a className="wa-link" href={PHONE_TEL} onClick={() => trackWhatsApp('value-call')}>Call {PHONE_DISPLAY}</a>
        </p>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq light">
      <div className="wrap">
        <h2 className="display h2 rv">Everything You Need <span className="hl">To Know</span></h2>
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
          <WhatsAppLink placement="faq" className="wa-link strong">Chat on WhatsApp · {PHONE_DISPLAY}</WhatsAppLink>
        </div>
        <div className="horizon-band" aria-hidden="true"><div className="horizon" /></div>
        <h2 className="display h2 final-title rv">Your Team Is Ready. <span className="hl">Are You?</span></h2>
        <p className="lead rv">100 serious founders. One live session on Zoom. The system that changes how your business runs, forever.</p>
        <CtaBlock placement="final" id="enrol" />
        <p className="lead rv">{EVENT.date} · {EVENT.time} · Online, Zoom. No late entry. No replay.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <span><b>{COMPANY}</b> | {MENTOR.title}, {MENTOR.name}</span>
          <span className="foot-links">
            <a href={PHONE_TEL}><i className="ph ph-phone" /> {PHONE_DISPLAY}</a>
            <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer"><i className="ph ph-globe" /> {WEBSITE_LABEL}</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><i className="ph ph-linkedin-logo" /> LinkedIn</a>
            <WhatsAppLink placement="footer">WhatsApp</WhatsAppLink>
          </span>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {COMPANY}. All rights reserved. | {TAGLINE}</span>
          <span className="foot-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></span>
        </div>
        <p className="disclaimer">
          This page is not affiliated with or endorsed by Google LLC or Zoom Video Communications Inc. Results may vary. Individual outcomes depend on implementation.
        </p>
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
          <div><b>Only {SEATS_LEFT} seats left</b> · Free · No replay</div>
          <small>Session starts in <Timer /></small>
        </div>
        <CtaButton placement="sticky" className="">
          Register Now · Free
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
      <MobileBackdrop />
      <div className="topbar">
        <b>{EVENT_NAME}</b> · {EVENT.dateShort} · Free · Limited to {SEATS_TOTAL} seats · No replay
      </div>
      <main>
        <Hero heroRef={heroRef} />
        <Results />
        <Clients />
        <Pains />
        <Journey />
        <Modules />
        <Mentor />
        <Numbers />
        <Fit />
        <Gifts />
        <Faq />
      </main>
      <Footer />
      <StickyBar show={showSticky} />
    </div>
  );
}
