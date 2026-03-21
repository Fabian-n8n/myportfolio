import { motion } from 'framer-motion';

const SKILLS = [
  { label: 'Product Design', sub: 'Figma · Design Systems · UX Research' },
  { label: 'Product Management', sub: 'Sprint Planning · PRDs · Roadmaps' },
  { label: 'AI Automation', sub: 'n8n · LLM · Prompt Engineering' },
  { label: 'Voice AI', sub: 'Retell AI · Agent Design · Deployment' },
  { label: 'Frontend', sub: 'React · Shadcn/ui · Tailwind CSS' },
  { label: 'Infrastructure', sub: 'NeonDB · Railway · REST APIs · Clerk' },
];

const EXPERIENCE = [
  {
    company: 'AI Automation',
    role: 'Freelance AI Engineer',
    period: 'Oct 2025 — Now',
    desc: 'Building n8n workflows, LLM integrations, voice AI agents, and automation systems for Singapore SMEs. Content at @fabian.n8n.',
  },
  {
    company: 'Kelick',
    role: 'Product Designer & Manager',
    period: 'Sep 2024 — Oct 2025',
    desc: 'Led 0→1 product build for Singapore HR SaaS. Designed UI/UX, managed engineering, onboarded 5+ B2B customers. Generated $10K MRR.',
  },
  {
    company: 'ION Mobility',
    role: 'UI/UX Designer / Researcher',
    period: 'Apr 2023 — Oct 2023',
    desc: "UX research and design system implementation for Indonesia's EV motorcycle brand. API framework proposals for mobile app.",
  },
  {
    company: 'Aureus Group',
    role: 'UI/UX Designer',
    period: 'Feb 2022 — Apr 2023',
    desc: 'Product research, user story development, and feature logic across customer-facing SaaS products.',
  },
];

function fadeInUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

export default function About() {
  return (
    <section id="about" className="bg-cream px-10 pt-32 pb-24">

      <motion.h2 {...fadeInUp()} className="text-ink font-bold mb-20"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(42px, 7vw, 100px)', letterSpacing: '-0.04em', lineHeight: 0.9, fontWeight: 800 }}>
        About
      </motion.h2>

      <div className="grid grid-cols-12 gap-12 mb-24">

        {/* Bio */}
        <motion.div {...fadeInUp(0.1)} className="col-span-5">
          <p className="text-ink/75 leading-relaxed mb-5" style={{ fontSize: '17px', lineHeight: 1.8 }}>
            Product Designer and AI Automation Engineer who builds products end-to-end.
            I think in systems, not just screens — from user research and UI design to
            shipping features and automating workflows.
          </p>
          <p className="text-ink/50 leading-relaxed" style={{ fontSize: '15px', lineHeight: 1.8 }}>
            Previously built{' '}
            <a href="https://kelick.io" target="_blank" rel="noopener noreferrer"
              className="text-ink underline underline-offset-4 decoration-ink/25 hover:decoration-ink transition-all">
              Kelick
            </a>{' '}
            — an HR SaaS for Singapore SMEs — from concept to $10K MRR as sole designer and PM.
            Now focused on freelance AI automation, building{' '}
            <a href="https://www.tiktok.com/@fabian.n8n" target="_blank" rel="noopener noreferrer"
              className="text-ink underline underline-offset-4 decoration-ink/25 hover:decoration-ink transition-all">
              @fabian.n8n
            </a>{' '}
            and shipping AI-powered workflows for clients.
          </p>

          <div className="mt-10 pt-8 border-t border-ink/10 space-y-4">
            {[
              ['B. Business Marketing', 'SIM University · RMIT'],
              ['Certified ScrumMaster®', 'Scrum Alliance'],
              ['UX Design Certificate', 'Vertical Institute'],
            ].map(([title, institution]) => (
              <div key={title} className="flex items-baseline justify-between">
                <span className="text-[13px] text-ink/75 font-medium">{title}</span>
                <span className="text-[11px] tracking-[0.12em] text-ink/35 font-medium">{institution}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience timeline */}
        <div className="col-span-7">
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={exp.company} {...fadeInUp(0.1 + i * 0.09)}
              className="grid grid-cols-12 gap-6 pb-9 mb-9 border-b border-ink/8 last:border-0 last:mb-0 last:pb-0">
              <div className="col-span-4">
                <p className="text-ink font-bold text-[15px] mb-0.5" style={{ letterSpacing: '-0.01em' }}>{exp.company}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-ink/40 font-medium">{exp.period}</p>
              </div>
              <div className="col-span-8">
                <p className="text-ink/65 font-medium text-[13px] mb-2">{exp.role}</p>
                <p className="text-ink/45 leading-relaxed text-[13px]">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills with proper padding */}
      <div className="w-full h-px bg-ink/10 mb-14" />
      <motion.p {...fadeInUp()} className="text-[11px] tracking-[0.28em] uppercase text-ink/35 font-medium mb-10">Key Competencies</motion.p>
      <div className="grid grid-cols-3 gap-0 border border-ink/10 rounded-2xl overflow-hidden">
        {SKILLS.map((skill, i) => (
          <motion.div key={skill.label} {...fadeInUp(i * 0.06)}
            className="p-8 border-b border-r border-ink/10"
            style={{
              borderRight: (i + 1) % 3 === 0 ? 'none' : undefined,
              borderBottom: i >= 3 ? 'none' : undefined,
            }}>
            <p className="text-ink font-bold text-[15px] mb-2" style={{ letterSpacing: '-0.01em' }}>{skill.label}</p>
            <p className="text-[11px] tracking-[0.1em] text-ink/40 font-medium leading-relaxed">{skill.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
