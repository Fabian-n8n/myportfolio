import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function fadeInUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.05 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

/* ─── Abstract network diagram — animated ────────────────── */
const NODES = [
  { label: 'DESIGN',  x: 250, y: 92  },
  { label: 'PRODUCT', x: 397, y: 200 },
  { label: 'AI',      x: 338, y: 378 },
  { label: 'CODE',    x: 162, y: 378 },
  { label: 'PM',      x: 103, y: 200 },
];

function AbstractDrawing() {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

      {/* Outer guide ring — dashed, slowly rotating */}
      <motion.circle
        cx="250" cy="250" r="188"
        stroke="#16120E" strokeOpacity="0.13" strokeWidth="1"
        strokeDasharray="6 14"
        style={{ transformOrigin: '250px 250px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Counter-rotating inner dashed ring */}
      <motion.circle
        cx="250" cy="250" r="148"
        stroke="#16120E" strokeOpacity="0.08" strokeWidth="1"
        strokeDasharray="3 10"
        style={{ transformOrigin: '250px 250px' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />

      {/* Tick marks on outer ring */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line key={deg}
            x1={250 + 184 * Math.cos(rad)} y1={250 + 184 * Math.sin(rad)}
            x2={250 + 194 * Math.cos(rad)} y2={250 + 194 * Math.sin(rad)}
            stroke="#16120E" strokeOpacity="0.22" strokeWidth="1.5" strokeLinecap="round"
          />
        );
      })}

      {/* Spoke lines — draw in on mount */}
      {NODES.map((node, i) => (
        <motion.path
          key={node.label}
          d={`M 250 250 L ${node.x} ${node.y}`}
          stroke="#16120E" strokeOpacity="0.18" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Pulse rings radiating from center */}
      {[0, 0.8, 1.6].map((delay) => (
        <motion.circle
          key={delay}
          cx="250" cy="250" r="26"
          stroke="#16120E" strokeOpacity="0.2" strokeWidth="1.5" fill="none"
          style={{ transformOrigin: '250px 250px' }}
          animate={{ scale: [1, 3.5], opacity: [0.3, 0] }}
          transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* Center node — filled bold circle */}
      <motion.circle
        cx="250" cy="250" r="26"
        fill="#16120E"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: '250px 250px' }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Center ring halo */}
      <motion.circle
        cx="250" cy="250" r="36"
        stroke="#16120E" strokeOpacity="0.25" strokeWidth="1.5" fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: '250px 250px' }}
        transition={{ duration: 0.7, delay: 0.35 }}
      />
      {/* Center label */}
      <motion.text
        x="250" y="254" textAnchor="middle" dominantBaseline="middle"
        fontFamily="Space Grotesk, sans-serif" fontSize="9" fontWeight="800"
        fill="#F0EBE1" letterSpacing="0.16em"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >FW</motion.text>

      {/* Satellite nodes + labels */}
      {NODES.map((node, i) => {
        const above = node.y < 250;
        const labelY = above ? node.y - 26 : node.y + 30;
        return (
          <motion.g
            key={node.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer halo */}
            <circle cx={node.x} cy={node.y} r="18" stroke="#16120E" strokeOpacity="0.12" strokeWidth="1" fill="none" />
            {/* Filled node */}
            <circle cx={node.x} cy={node.y} r="11" fill="#16120E" fillOpacity="0.85" />
            {/* Label */}
            <text
              x={node.x} y={labelY}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="Space Grotesk, sans-serif" fontSize="9" fontWeight="700"
              fill="#16120E" fillOpacity="0.55" letterSpacing="0.18em"
            >{node.label}</text>
          </motion.g>
        );
      })}

      {/* Corner bracket — top-left */}
      <motion.path
        d="M 22 22 L 22 60 M 22 22 L 60 22"
        stroke="#16120E" strokeOpacity="0.3" strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      />
      {/* Corner bracket — bottom-right */}
      <motion.path
        d="M 478 478 L 478 440 M 478 478 L 440 478"
        stroke="#16120E" strokeOpacity="0.3" strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
      />

      {/* Dot grid — top right */}
      {[0, 1, 2, 3].flatMap((r) =>
        [0, 1, 2, 3].map((c) => (
          <motion.circle
            key={`${r}-${c}`}
            cx={340 + c * 16} cy={30 + r * 16} r="1.4"
            fill="#16120E" fillOpacity={0.1 + c * 0.04}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 + (r + c) * 0.04 }}
          />
        ))
      )}
    </svg>
  );
}

/* ─── Belief statements ─────────────────────────────────── */
const BELIEFS = [
  {
    num: '01',
    headline: "Don't stay in one lane.",
    body: "The best products are built by people who can design, manage, and build. I started as a web designer, became a product designer, expanded into PM, and now I build AI-powered systems end-to-end. Each transition wasn't a pivot — it was an accumulation.",
  },
  {
    num: '02',
    headline: "Ship, don't just plan.",
    body: "Strategy is meaningless without execution. I run lean — research fast, prototype early, ship often, measure ruthlessly. Kelick went from concept to paying customers without a full engineering team because I refused to separate designing from building.",
  },
  {
    num: '03',
    headline: 'Automate everything repeatable.',
    body: "If a human is doing something a workflow can handle, that's waste. I build automation layers into every product — not as an add-on, but as a core architectural decision. AI doesn't replace thinking; it eliminates friction so you can think better.",
  },
];

/* ─── Career timeline ───────────────────────────────────── */
const TIMELINE = [
  {
    year: '2020',
    era: 'Web Design',
    desc: 'Started building client websites. Learned HTML/CSS, visual hierarchy, and the fundamentals of how the web works. Design as craft.',
    tag: 'Where it began',
  },
  {
    year: '2021',
    era: 'Product Design',
    desc: 'Discovered Figma and UX. Moved from visual aesthetics into understanding user behaviour, design systems, and product thinking. Joined Aureus Group.',
    tag: 'Figma · UX · Systems',
  },
  {
    year: '2022',
    era: 'Product Management',
    desc: 'Expanded from design into product strategy. Sprints, PRDs, roadmaps, stakeholder alignment. Became UI/UX + PM at ION Mobility. Got CSM certified.',
    tag: 'Strategy · Sprints · Research',
  },
  {
    year: '2024',
    era: 'SaaS Builder',
    desc: 'Built Kelick from 0 to 1 as sole designer and PM. Handled UX, React frontend, PostgreSQL backend, and go-to-market. $10K MRR, 5+ paying customers.',
    tag: '0 → 1 · $10K MRR',
  },
  {
    year: '2025+',
    era: 'Founder & AI Engineer',
    desc: 'Founded Nodemation — a Singapore-registered AI automation agency. Builds n8n workflows, LLM integrations, and voice AI agents that make SMEs run leaner. Growing @fabian.n8n.',
    tag: 'Nodemation · n8n · Voice AI',
  },
];

/* ─── Tools — all monochrome black on cream ──────────────── */
const TOOLS = [
  { name: 'GitHub',     url: 'https://cdn.simpleicons.org/github/16120E' },
  { name: 'VS Code',    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', filter: true },
  { name: 'Figma',      url: 'https://cdn.simpleicons.org/figma/16120E' },
  { name: 'Notion',     url: 'https://cdn.simpleicons.org/notion/16120E' },
  { name: 'Slack',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg', filter: true },
  { name: 'Supabase',   url: 'https://cdn.simpleicons.org/supabase/16120E' },
  { name: 'n8n',        url: 'https://cdn.simpleicons.org/n8n/16120E' },
  { name: 'Airtable',   url: 'https://cdn.simpleicons.org/airtable/16120E' },
  { name: 'Twilio',     url: 'https://www.vectorlogo.zone/logos/twilio/twilio-icon.svg', filter: true },
  { name: 'Claude',     url: 'https://cdn.simpleicons.org/anthropic/16120E' },
  { name: 'NeonDB',     url: 'https://avatars.githubusercontent.com/u/77690634?s=80&v=4', filter: true },
  { name: 'Retell AI',  url: '/retell-logo.svg' },
  { name: 'OpenRouter', url: 'https://cdn.simpleicons.org/openrouter/16120E' },
];

/* ─── Credentials — single unified grid ─────────────────── */
const CREDENTIALS = [
  {
    title: 'Certified ScrumMaster®',
    issuer: 'Scrum Alliance',
    year: '2023',
    accentColor: '#009FDA',
    type: 'cert',
  },
  {
    title: 'Product Management Basics',
    issuer: 'Pendo',
    year: '2024',
    accentColor: '#FF4F00',
    type: 'cert',
    href: 'https://www.pendo.io/product-management-basics-certification/',
  },
  {
    title: 'Product-Led Certification',
    issuer: 'Pendo',
    year: '2024',
    accentColor: '#FF4F00',
    type: 'cert',
    href: 'https://www.pendo.io/product-led/certification-course/',
  },
  {
    title: 'UX Design Certificate',
    issuer: 'Vertical Institute',
    year: '2022',
    accentColor: '#16120E',
    type: 'cert',
  },
  {
    title: 'Bachelor of Business Marketing',
    issuer: 'SIM University · RMIT',
    year: '2018–2021',
    accentColor: '#6B6358',
    type: 'edu',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pt-28 md:pt-36 pb-20 md:pb-28 border-b border-ink/8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          {/* Left: text */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-ink/40 font-medium mb-6 flex items-center gap-3">
              <Link to="/" className="hover:text-ink/70 transition-colors">← Home</Link>
              <span className="text-ink/20">/</span>
              <span>About</span>
            </p>
            <h1 className="text-ink font-bold mb-8"
              style={{ fontSize: 'clamp(52px, 9vw, 130px)', letterSpacing: '-0.04em', lineHeight: 0.88, fontWeight: 800 }}>
              I build what<br />I design.
            </h1>
            <p className="text-ink/55 max-w-lg leading-relaxed mb-10" style={{ fontSize: '17px', lineHeight: 1.8 }}>
              Product Designer, Product Manager, and AI Automation Engineer based in Singapore.
              I design products from concept, manage them to market, and build the automation
              systems that make them run.
            </p>
            <div className="flex items-center gap-4">
              <button
                data-cal-link="fabian-wong/quick-chat"
                data-cal-namespace="quick-chat"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="bg-ink text-cream px-7 py-3.5 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-ink/75 transition-colors cursor-pointer">
                Get in Touch
              </button>
            </div>
          </motion.div>

          {/* Right: abstract drawing */}
          <motion.div
            className="hidden md:flex md:col-span-5 items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '420px' }}
          >
            <AbstractDrawing />
          </motion.div>
        </div>
      </section>

      {/* ── Belief system ───────────────────────────────── */}
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24 border-b border-ink/8">
        <motion.p {...fadeInUp()} className="text-[11px] tracking-[0.3em] uppercase text-ink/35 font-medium mb-14">
          Belief System
        </motion.p>
        <div className="space-y-0">
          {BELIEFS.map((b, i) => (
            <motion.div key={b.num} {...fadeInUp(i * 0.1)}
              className="py-8 md:py-10 border-b border-ink/8 last:border-0">
              <div className="flex items-start gap-5 md:gap-8 mb-3">
                <span className="flex-none text-[11px] tracking-[0.2em] text-ink/25 font-medium pt-1">{b.num}</span>
                <h3 className="text-ink font-bold flex-1"
                  style={{ fontSize: 'clamp(20px, 3vw, 38px)', letterSpacing: '-0.02em', lineHeight: 1.1, fontWeight: 700 }}>
                  {b.headline}
                </h3>
              </div>
              <p className="text-ink/55 leading-relaxed pl-9 md:pl-12" style={{ fontSize: '15px', lineHeight: 1.8 }}>{b.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Career timeline ─────────────────────────────── */}
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24 border-b border-ink/8">
        <motion.p {...fadeInUp()} className="text-[11px] tracking-[0.3em] uppercase text-ink/35 font-medium mb-14">
          Career Journey
        </motion.p>
        <div className="relative">
          {/* Static faint guide line */}
          <div className="absolute top-0 bottom-0 w-px bg-ink/8" style={{ left: '104px' }} />
          {/* Animated draw-down line — slow, obvious loop */}
          <motion.div
            className="absolute top-0 bottom-0"
            style={{
              left: '104px',
              width: '2px',
              transformOrigin: 'top center',
              background: 'linear-gradient(to bottom, rgba(22,18,14,0.85), rgba(22,18,14,0.1))',
            }}
            animate={{ scaleY: [0, 1] }}
            transition={{ duration: 5, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
          />

          {TIMELINE.map((item, i) => (
            <motion.div key={item.year} {...fadeInUp(i * 0.09)}
              className="flex items-start py-10 border-b border-ink/8 last:border-0">

              {/* Year: 96px right-aligned — ends right before the line */}
              <div className="flex-none text-right pt-0.5" style={{ width: '96px' }}>
                <span className="text-ink font-bold text-[15px]" style={{ letterSpacing: '-0.01em', fontWeight: 700 }}>
                  {item.year}
                </span>
              </div>

              {/* Dot: 16px wide, center at 96+8=104px — exactly on the line */}
              <div className="flex-none flex justify-center pt-1.5" style={{ width: '16px' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-ink/55 flex-none"
                  style={{ boxShadow: '0 0 0 3px #F0EBE1' }} />
              </div>

              {/* Content */}
              <div className="flex-1 pl-8 pt-0.5">
                <div className="flex flex-wrap items-baseline gap-3 mb-2.5">
                  <p className="text-ink font-bold text-[22px]" style={{ letterSpacing: '-0.02em' }}>{item.era}</p>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-ink/40 font-medium">{item.tag}</span>
                </div>
                <p className="text-ink/50 leading-relaxed" style={{ fontSize: '14px', lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Tools ───────────────────────────────────────── */}
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24 border-b border-ink/8">
        <motion.p {...fadeInUp()} className="text-[11px] tracking-[0.3em] uppercase text-ink/35 font-medium mb-5">Daily Tools</motion.p>
        <motion.h2 {...fadeInUp(0.08)} className="text-ink font-bold mb-14"
          style={{ fontSize: 'clamp(28px, 4.5vw, 60px)', letterSpacing: '-0.03em', lineHeight: 0.95, fontWeight: 800 }}>
          The stack I ship with.
        </motion.h2>
        <div className="flex flex-wrap gap-6">
          {TOOLS.map((tool, i) => (
            <motion.div key={tool.name} {...fadeInUp(i * 0.035)} className="flex flex-col items-center gap-2.5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden border border-ink/8"
                style={{ backgroundColor: '#F0EBE1' }}
              >
                {tool.url ? (
                  <img
                    src={tool.url}
                    alt={tool.name}
                    className="w-8 h-8 object-contain"
                    style={tool.filter ? { filter: 'brightness(0)' } : undefined}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: '#16120E' }}>
                    <span style={{ color: '#F0EBE1', fontWeight: 700, fontSize: '10px', letterSpacing: '0.1em' }}>
                      {tool.initials}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-[10px] tracking-[0.1em] text-ink/45 font-medium text-center">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Credentials (certs + education unified) ─────── */}
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24 border-b border-ink/8">
        <motion.p {...fadeInUp()} className="text-[11px] tracking-[0.3em] uppercase text-ink/35 font-medium mb-6">
          Credentials
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {CREDENTIALS.map((item, i) => (
            <motion.div key={item.title} {...fadeInUp(i * 0.07)}>
              <div className="h-full border border-ink/10 rounded-2xl p-6 hover:border-ink/25 hover:bg-ink/[0.02] transition-all duration-200">
                <CredentialCard item={item} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ──────────────────────────────────── */}
      <section className="px-6 md:px-10 pt-14 md:pt-20 pb-14 md:pb-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <motion.div {...fadeInUp()}>
          <p className="text-ink font-bold text-[22px] mb-1" style={{ letterSpacing: '-0.02em' }}>Let's build something.</p>
          <p className="text-ink/40 text-[13px]">Open to PM, Product Design, and AI Engineering roles.</p>
        </motion.div>
        <motion.div {...fadeInUp(0.1)} className="flex items-center gap-4">
          <button
            data-cal-link="fabian-wong/quick-chat"
            data-cal-namespace="quick-chat"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="bg-ink text-cream px-7 py-3.5 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-ink/75 transition-colors cursor-pointer">
            Get in Touch
          </button>
          <a href="/fabian-wong-resume.pdf" download="Fabian Wong - Resume - PD updated.pdf"
            className="inline-flex items-center gap-2 border border-ink/25 text-ink px-7 py-3.5 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold hover:border-ink transition-colors">
            Download CV <span className="text-ink/50 text-[11px]">↓</span>
          </a>
        </motion.div>
      </section>

    </div>
  );
}

function CredentialCard({ item }) {
  return (
    <>
      <div className="w-8 h-1 rounded-full mb-5" style={{ backgroundColor: item.accentColor }} />
      <div className="mb-1.5">
        <span className="text-[10px] tracking-[0.18em] uppercase font-semibold px-2 py-0.5 rounded-full"
          style={{ background: item.type === 'edu' ? 'rgba(22,18,14,0.06)' : 'rgba(22,18,14,0.06)', color: 'rgba(22,18,14,0.5)' }}>
          {item.type === 'edu' ? 'Education' : 'Certification'}
        </span>
      </div>
      <p className="text-ink font-bold text-[14px] mb-1.5 leading-snug mt-3" style={{ letterSpacing: '-0.01em' }}>{item.title}</p>
      <p className="text-[11px] tracking-[0.12em] uppercase text-ink/40 font-medium mb-1">{item.issuer}</p>
      <p className="text-[11px] text-ink/22 font-medium">{item.year}</p>
    </>
  );
}
