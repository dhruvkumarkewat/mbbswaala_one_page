export const PHONE = '+91 78801 19983';
export const PHONE_TEL = 'tel:+917880119983';
export const WA_LINK = 'https://wa.me/917880119983';
export const EMAIL = 'info@mbbswala.in';
export const SUBSCRIPTION_URL =
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    ? 'http://localhost:5173/dashboard/subscription'
    : 'https://mbbswaala.io/dashboard/subscription';
export const APP_BASE = 'https://mbbswaala.io';
export const SUPABASE_URL = 'https://hbzzamezfhzsdupdhcin.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_5D517PLNdF92v3Q1s6Dp_w_WaZtsrPo';
export const API_URL = (path: string) => `${APP_BASE}${path}`;

export const NAV_LINKS = [
  { label: 'Tools', href: '#tools' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQs', href: '#faq' },
];

export const HERO_WORDS = ['NEET UG', 'NEET PG', 'State seats'];

export const STATS = [
  { value: '10+', label: 'Years Consultancy' },
  { value: '8,000+', label: 'Successful Admissions' },
  { value: '200+', label: 'College Tie-ups' },
  { value: '25+', label: 'Indian States Covered' },
];

export const PAIN_POINTS = [
  'Counselling stress', 'Which college for my rank?', 'Hidden fees & bonds', 'Confusing cut-offs',
  'Wrong choice filling', 'State seat confusion', 'Missed last dates', 'Document hassle',
];

export const FEATURES = [
  {
    img: '/images/mbbswala/feat-01-notify.jpg', short: 'Round alerts', title: 'Notifications',
    desc: 'Stay ahead with timely updates on counselling rounds, deadlines, seat matrix changes, and critical announcements — so you never miss a window.',
    points: ['Round-wise deadline reminders', 'Seat matrix & notice alerts', 'WhatsApp & call support on critical days'],
    cta: 'Get alerts',
  },
  {
    img: '/images/mbbswala/feat-02-data.jpg', short: 'Cut-off data', title: 'Round-wise Cutoffs',
    desc: 'Explore multi-year closing ranks across quotas and categories. Know which government and private colleges are realistic for your AIR.',
    points: ['AIQ + state rank bands', 'Category-wise closing ranks', 'MP & major state coverage'],
    cta: 'View cut-offs',
  },
  {
    img: '/images/india/college-2.jpg', short: 'India directory', title: 'College Finder',
    desc: 'Browse institute profiles with location, type, and counselling participation — India medical colleges in one directory.',
    points: ['State-wise India directory', 'Govt & private filters', 'Fee transparency guidance'],
    cta: 'Explore colleges',
  },
  {
    img: '/images/mbbswala/feat-04-docs.jpg', short: 'True cost', title: 'Fee, Stipend & Bonds',
    desc: 'Compare tuition, stipends, and service bond conditions before you lock a choice — so families plan finances without last-minute shocks.',
    points: ['Fee transparency guidance', 'Bond & service terms explained', 'Budget-fit shortlists'],
    cta: 'Talk to expert',
  },
  {
    img: '/images/mbbswala/feat-05-map.jpg', short: 'Seat chances', title: 'Allotment Mapping',
    desc: 'Simulate likely allotments using historical patterns mapped against your rank and category — plan AIQ vs state strategy with confidence.',
    points: ['Rank-band seat simulation', 'AIQ vs state comparison', 'Upgrade-round strategy tips'],
    cta: 'Seat matrix',
  },
  {
    img: '/images/mbbswala/feat-06-video.jpg', short: 'Process explainers', title: 'Video Guides',
    desc: 'Watch clear explainers on registration, choice filling, upgrades, and round strategy — so every family member is on the same page.',
    points: ['Choice-filling walkthroughs', 'Document checklist videos', 'Round strategy sessions'],
    cta: 'Book a session',
  },
  {
    img: '/images/mbbswala/feat-07-list.jpg', short: 'Smart preferences', title: 'Smart Choice Filling',
    desc: 'Build, prioritise, and refine your choice list with data-backed suggestions — reduce filling mistakes that cost a better seat.',
    points: ['Preference order guidance', 'Safety / target / dream mix', 'Expert review before lock'],
    cta: 'Book counselling',
  },
];

export const TOOLS = [
  { title: 'AI College Predictor', desc: 'Predict rank and get Safe / Moderate / Reach shortlists.', img: '/images/india/doctor.jpg', tag: 'AI Powered' },
  { title: 'College Comparison', desc: 'Seats, AIQ cutoffs and category bands side-by-side.', img: '/images/india/college-1.jpg', tag: 'Compare' },
  { title: 'Seat Matrix', desc: 'Government & private seat counts you can filter fast.', img: '/images/india/gmc.jpg', tag: 'MCC + State' },
  { title: 'Round-wise Cutoffs', desc: 'Past closing ranks by category for planning choices.', img: '/images/india/students.jpg', tag: '2020–2026' },
];

export const COUNSELLORS = [
  { title: 'Answers for your case', desc: 'We look at your rank, category, budget and home state — not one common list for everyone.', img: '/images/india/counsel-meet.jpg' },
  { title: 'Talk to real counsellors', desc: 'People who handle All India and state counselling every year, including Madhya Pradesh.', img: '/images/india/doctors-group.jpg' },
  { title: 'Ask as much as you need', desc: 'Call or message until you and your family feel clear about the next step.', img: '/images/india/family-consult.jpg' },
];

export const TESTIMONIALS = [
  { name: 'Riya Sharma', detail: 'AIR 4,218 · MBBS, GMC Bhopal', text: 'MBBSWala guided us from rank to college. The choice filling strategy was spot on — I got my dream government seat in Round 1 itself!' },
  { name: 'Aman Verma', detail: 'AIR 11,540 · MBBS, Govt. Medical College, Kota', text: 'The cutoff data and seat matrix saved us months of confusion. Their counsellor picked up the phone at 10 PM during counselling week.' },
  { name: 'Sneha Patel', detail: 'AIR 27,301 · BDS, Govt. Dental College, Indore', text: 'We were completely lost between AIQ and state quota. They explained everything patiently and helped us fill 40+ choices perfectly.' },
  { name: 'Rohit Meena', detail: 'NEET PG · MD Radio-Diagnosis, BJ Medical College', text: 'For NEET PG counselling their allotment mapping is unmatched. Got MD Radio in Round 2 — worth every rupee of the premium plan.' },
  { name: 'Pooja Yadav', detail: 'AIR 8,912 · MBBS, NSCB Medical College, Jabalpur', text: 'From document checklist to final admission letter, the team stood with us. My parents trust them completely.' },
  { name: 'Karan Singh', detail: 'AIR 15,670 · MBBS, RIMS, Raipur', text: 'The ₹99 NEET UG plan is a steal. AI predictor + cutoff bands + 24×7 support — honest advice, no false promises.' },
];

export const FAQS = [
  { q: 'How do I start with MBBS WAALA?', a: 'Call or WhatsApp +91 78801 19983, email info@mbbswala.in, or fill the contact form. Share your NEET details and preferred states — we will guide the next steps.' },
  { q: 'What kind of help do you give?', a: 'We help with college shortlisting, choice filling, document preparation, and counselling strategy for NEET UG and NEET PG. Our team stays with you from rank to final allotment.' },
  { q: 'Can I ask doubts about my rank and colleges?', a: 'Yes! You can call or WhatsApp us anytime during counselling season. We answer questions on cut-offs, seat availability, quota eligibility, and which colleges to prefer for your rank.' },
  { q: 'Do you conduct mock tests for NEET?', a: 'We focus on counselling support, not test preparation. However, we can connect you with trusted coaching partners in Bhopal if you need NEET preparation guidance.' },
  { q: 'Which states do you cover?', a: 'We cover all major states including Madhya Pradesh, Maharashtra, Rajasthan, UP, Delhi, Karnataka, Tamil Nadu, and 20+ more. We also support All India Quota (AIQ) and deemed university admissions.' },
  { q: 'How are your plans different?', a: 'Free gives you basic predictions to get started. The ₹99 NEET UG plan unlocks the full AI suite — 1000+ college predictions, cutoff trends 2020–2026, seat matrix, and 24/7 AI counselling. NEET PG and Premium Bundle add dedicated human counsellors and end-to-end admission handling.' },
  { q: 'How can I contact MBBSWALA?', a: 'Call/WhatsApp: +91 78801 19983. Email: info@mbbswala.in. Office: Bhopal, Madhya Pradesh. We are available 7 days a week during counselling season.' },
];

export interface Plan {
  id: string;
  name: string;
  exam: string;
  price: string;
  originalPrice?: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
  ribbon?: string;
}

export const PLANS: Plan[] = [
  {
    id: 'free', name: 'Free', exam: 'Explore MBBS Waala', price: '₹0', tagline: 'Get started, no card required',
    features: ['Basic rank → college prediction', 'Top 50 colleges preview', 'Limited cutoff access', 'Community Q&A access', '1 counselling round alert'],
    cta: 'Start for Free',
  },
  {
    id: 'neet-ug', name: 'NEET UG', exam: 'Most popular', price: '₹99', originalPrice: '₹999', tagline: 'The complete NEET UG toolkit',
    features: ['Unlimited AI college predictions', 'Admission probability scores', 'Round 1, 2, 3 & Mop-up cutoffs (2020–2026)', 'MCC & AACCC official seat matrix', 'Smart choice filling order & strategy', 'State-wise quota & domicile analytics', '24/7 AI medical counselling assistant', 'Document checklist & alerts'],
    cta: 'Unlock NEET UG — ₹99', featured: true, badge: '90% OFF · LIMITED TIME', ribbon: 'Best Value',
  },
  {
    id: 'neet-pg', name: 'NEET PG', exam: 'For MD / MS / DNB', price: '₹4,999', tagline: 'Complete PG admission support',
    features: ['Everything in NEET UG plan', 'PG specialty & branch mapping', 'Round-wise PG cutoffs (MD/MS/DNB)', 'INI-CET & state PG counselling support', 'Allotment mapping: AIQ vs state', 'Dedicated PG counsellor on call', 'Stipend & bond comparison'],
    cta: 'Get NEET PG Plan',
  },
  {
    id: 'premium', name: 'Premium Bundle', exam: 'UG + PG, end-to-end', price: '₹9,999', originalPrice: '₹14,998', tagline: 'White-glove admission handling',
    features: ['Everything in NEET UG + PG plans', '1-on-1 personal counsellor assigned', 'End-to-end admission: shortlist → papers → seat', 'Choice locking expert review', 'Mop-up & stray vacancy strategy', 'Unlimited priority call support', 'Refund if no guidance received'],
    cta: 'Go Premium',
  },
];

export const AVATARS = [
  '/images/india/students.jpg', '/images/india/family-consult.jpg', '/images/india/doctors-group.jpg',
  '/images/india/doctor.jpg', '/images/india/counsel-meet.jpg', '/images/india/college-1.jpg',
];
