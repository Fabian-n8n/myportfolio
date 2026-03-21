import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';

function fadeInUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.05 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

function ProjectCard({ project, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full h-px bg-ink/10" />
      <motion.div
        className="py-14 grid grid-cols-12 gap-8 cursor-pointer group"
        onClick={() => navigate(`/work/${project.slug}`)}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Number */}
        <div className="col-span-1 pt-1">
          <span className="text-[11px] tracking-[0.2em] uppercase text-ink/25 font-medium">{project.num}</span>
        </div>

        {/* Info */}
        <div className="col-span-5 flex flex-col justify-between">
          <div>
            <h3 className="text-ink font-bold mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px, 3.5vw, 46px)', letterSpacing: '-0.03em', lineHeight: 1.05, fontWeight: 800 }}>
              {project.name}
            </h3>
            <p className="text-[11px] tracking-[0.2em] uppercase text-ink/40 font-medium mb-6">{project.type}</p>
            <p className="text-ink/55 leading-relaxed text-[14px] mb-6" style={{ lineHeight: 1.75 }}>{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.metrics.map((m) => (
                <span key={m} className="border border-ink/15 text-ink/50 rounded-full px-3 py-1 text-[10px] tracking-[0.18em] uppercase font-medium">{m}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] tracking-[0.22em] uppercase font-semibold text-ink group-hover:opacity-70 transition-opacity">
              View Case Study
            </span>
            <span className="text-ink/40 group-hover:translate-x-1 transition-transform duration-300 text-sm">→</span>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="col-span-6 overflow-hidden rounded-2xl" style={{ aspectRatio: '16/10' }}>
          {project.coverImg ? (
            <img
              src={project.coverImg}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: project.accentColor }}
            >
              <div className="text-center">
                <span className="block font-bold text-cream/10"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '96px', fontWeight: 800, letterSpacing: '-0.05em' }}>
                  {project.num}
                </span>
                <span className="block text-cream/25 text-[11px] tracking-[0.3em] uppercase font-medium mt-2">{project.type}</span>
              </div>
            </div>
          )}
        </div>

        {/* Year — top right */}
        <div className="col-span-0 absolute right-10 pt-1">
          <span className="text-[11px] tracking-[0.18em] uppercase text-ink/30 font-medium">{project.year}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-cream px-10 pt-32 pb-24">
      <motion.div {...fadeInUp()} className="flex items-end justify-between mb-16">
        <h2 className="text-ink font-bold"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(42px, 7vw, 100px)', letterSpacing: '-0.04em', lineHeight: 0.9, fontWeight: 800 }}>
          Case<br />Studies
        </h2>
        <motion.p {...fadeInUp(0.1)} className="text-[11px] tracking-[0.25em] uppercase text-ink/35 font-medium pb-2">
          Selected Projects
        </motion.p>
      </motion.div>

      {PROJECTS_DATA.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
      <div className="w-full h-px bg-ink/10" />
    </section>
  );
}
