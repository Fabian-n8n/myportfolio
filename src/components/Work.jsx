import { motion } from 'framer-motion';

const PROJECTS = [
  {
    num: '01',
    name: 'Kelick',
    type: 'Product Design · Product Management',
    year: 'Sep 2024 — Oct 2025',
    description:
      "Built Singapore's HR SaaS from 0 to 1 — concept, UX, frontend, and go-to-market. Covers CPF automation, payroll, and employee onboarding for local SMEs.",
    metrics: ['$10K MRR', '5+ B2B Customers', '0 → 1 Build'],
    tags: ['Figma', 'React', 'NeonDB', 'Clerk', 'Railway'],
    status: 'kelick.io →',
    href: 'https://kelick.io',
  },
  {
    num: '02',
    name: 'ION Mobility',
    type: 'UI/UX Design · Research',
    year: 'Apr — Oct 2023',
    description:
      "UX research and design system for Indonesia's leading EV motorcycle brand. Customer journey mapping at BSD and mobile app API framework proposals.",
    metrics: ['Design System', 'Customer Research', 'Mobile UX'],
    tags: ['Figma', 'UX Research', 'Design Systems', 'Mobile'],
    status: 'Completed',
    href: null,
  },
  {
    num: '03',
    name: 'Nodemation',
    type: 'AI Engineering · Agency',
    year: 'Oct 2025 — Now',
    description:
      'Founded Nodemation — a Singapore-registered AI automation agency. We Automate What\'s Stealing Your Time. Builds n8n workflows, LLM integrations, and voice AI agents for SMEs.',
    metrics: ['n8n Workflows', 'LLM Integrations', 'Voice AI Agents'],
    tags: ['n8n', 'Claude', 'Retell AI', 'Airtable', 'Twilio', 'OpenRouter'],
    status: 'nodemation.pro →',
    href: 'https://www.nodemation.pro',
  },
];

function ProjectRow({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full h-px bg-ink/10" />
      <motion.a
        href={project.href || undefined}
        target={project.href ? '_blank' : undefined}
        rel={project.href ? 'noopener noreferrer' : undefined}
        className={`py-12 grid grid-cols-12 gap-8 ${project.href ? 'cursor-pointer' : 'cursor-default'}`}
        whileHover={project.href ? { x: 6 } : {}}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="col-span-1 pt-1">
          <span className="text-[11px] tracking-[0.2em] uppercase text-ink/25 font-medium">{project.num}</span>
        </div>

        <div className="col-span-4">
          <h3
            className="text-ink font-bold mb-2"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            {project.name}
          </h3>
          <p className="text-[11px] tracking-[0.2em] uppercase text-ink/40 font-medium mt-3">{project.type}</p>
        </div>

        <div className="col-span-5">
          <p className="text-ink/62 leading-relaxed mb-5" style={{ fontSize: '14px' }}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metrics.map((m) => (
              <span key={m} className="border border-ink/15 text-ink/50 rounded-full px-3 py-1 text-[10px] tracking-[0.18em] uppercase font-medium">{m}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {project.tags.map((t) => (
              <span key={t} className="text-[10px] tracking-[0.15em] uppercase text-ink/28 font-medium">{t}</span>
            ))}
          </div>
        </div>

        <div className="col-span-2 flex flex-col items-end justify-between">
          <span className="text-[11px] tracking-[0.18em] uppercase text-ink/35 font-medium text-right">{project.year}</span>
          <span className={`text-[11px] tracking-[0.2em] uppercase font-semibold ${project.href ? 'text-ink underline underline-offset-4 decoration-ink/25' : 'text-ink/28'}`}>
            {project.status}
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="bg-cream px-10 pt-32 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <div className="flex items-end justify-between">
          <h2 className="text-ink font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(42px, 7vw, 100px)', letterSpacing: '-0.04em', lineHeight: 0.9, fontWeight: 800 }}>
            Work<br />Experience
          </h2>
        </div>
      </motion.div>

      {PROJECTS.map((p, i) => <ProjectRow key={p.num} project={p} index={i} />)}
      <div className="w-full h-px bg-ink/10 mt-0" />
    </section>
  );
}
