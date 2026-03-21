import { motion } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';

function fadeInUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.05 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS_DATA.find((p) => p.slug === slug);
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="bg-cream" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="px-10 pt-36 pb-0 border-b border-ink/8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Link to="/" className="text-[11px] tracking-[0.28em] uppercase text-ink/40 font-medium hover:text-ink/70 transition-colors">← Home</Link>
            <span className="text-ink/20">/</span>
            <Link to="/#projects" className="text-[11px] tracking-[0.28em] uppercase text-ink/40 font-medium hover:text-ink/70 transition-colors">Projects</Link>
            <span className="text-ink/20">/</span>
            <span className="text-[11px] tracking-[0.28em] uppercase text-ink/60 font-medium">{project.name}</span>
          </div>

          <div className="grid grid-cols-12 gap-8 items-end mb-0">
            <div className="col-span-8 pb-16">
              <p className="text-[11px] tracking-[0.28em] uppercase text-ink/35 font-medium mb-4 flex items-center gap-3">
                <span>{project.num}</span>
                <span className="text-ink/15">/</span>
                <span>{project.type}</span>
              </p>
              <h1 className="text-ink font-bold mb-6"
                style={{ fontSize: 'clamp(52px, 9vw, 130px)', letterSpacing: '-0.04em', lineHeight: 0.88, fontWeight: 800 }}>
                {project.name}
              </h1>
              <p className="text-ink/45 text-[15px] mb-10" style={{ letterSpacing: '0.02em' }}>{project.year}</p>
              <p className="text-ink/65 text-[18px] leading-relaxed max-w-xl" style={{ lineHeight: 1.75 }}>
                {project.tagline}
              </p>
            </div>
            <div className="col-span-4 pb-16">
              <div className="space-y-4">
                {project.metrics.map((m) => (
                  <div key={m} className="border-t border-ink/10 pt-4">
                    <p className="text-ink font-bold text-[18px]" style={{ letterSpacing: '-0.01em' }}>{m}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cover image */}
        {project.coverImg ? (
          <motion.div
            className="w-full overflow-hidden rounded-t-2xl"
            style={{ aspectRatio: '16/7', marginTop: 0 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={project.coverImg} alt={project.name} className="w-full h-full object-cover" />
          </motion.div>
        ) : (
          <motion.div
            className="w-full rounded-t-2xl flex items-center justify-center"
            style={{ aspectRatio: '16/7', backgroundColor: project.accentColor }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <span className="font-bold text-cream/10"
              style={{ fontSize: 'clamp(80px, 20vw, 240px)', fontWeight: 800, letterSpacing: '-0.05em' }}>
              {project.num}
            </span>
          </motion.div>
        )}
      </section>

      {/* ── Overview ─────────────────────────────────────── */}
      <section className="px-10 pt-24 pb-24 border-b border-ink/8">
        <div className="grid grid-cols-12 gap-8">
          <motion.div {...fadeInUp()} className="col-span-7">
            <p className="text-[11px] tracking-[0.3em] uppercase text-ink/35 font-medium mb-8">Overview</p>
            <p className="text-ink/70 leading-relaxed" style={{ fontSize: '17px', lineHeight: 1.85 }}>
              {project.description}
            </p>
          </motion.div>
          <motion.div {...fadeInUp(0.1)} className="col-span-5 pl-8">
            <p className="text-[11px] tracking-[0.3em] uppercase text-ink/35 font-medium mb-8">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="border border-ink/15 text-ink/60 rounded-full px-3 py-1.5 text-[11px] tracking-[0.12em] font-medium">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Contributions ─────────────────────────────── */}
      <section className="px-10 pt-24 pb-24 border-b border-ink/8">
        <motion.p {...fadeInUp()} className="text-[11px] tracking-[0.3em] uppercase text-ink/35 font-medium mb-14">
          Key Contributions
        </motion.p>
        <div className="space-y-0">
          {project.contributions.map((item, i) => (
            <motion.div key={i} {...fadeInUp(i * 0.07)}
              className="flex items-start gap-8 py-7 border-b border-ink/8 last:border-0">
              <span className="flex-none text-[11px] tracking-[0.2em] uppercase text-ink/20 font-medium pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-ink/70 text-[15px] leading-relaxed flex-1" style={{ lineHeight: 1.8 }}>{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="px-10 pt-20 pb-20 flex items-center justify-between">
        <motion.div {...fadeInUp()}>
          {project.externalHref ? (
            <a href={project.externalHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-ink/75 transition-colors">
              Visit {project.name} →
            </a>
          ) : (
            <span className="inline-flex items-center gap-3 border border-ink/20 text-ink/40 px-8 py-4 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold">
              Project Complete
            </span>
          )}
        </motion.div>

        {/* Next project */}
        <motion.div {...fadeInUp(0.1)} className="text-right">
          <p className="text-[10px] tracking-[0.25em] uppercase text-ink/30 font-medium mb-1">Next Project</p>
          <Link to={`/work/${nextProject.slug}`}
            className="text-ink font-bold hover:opacity-60 transition-opacity"
            style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '-0.02em', fontWeight: 700 }}>
            {nextProject.name} →
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
