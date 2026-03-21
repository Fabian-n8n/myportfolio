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

const MONO_FILTER = 'grayscale(1) sepia(0.08) brightness(0.96) contrast(1.02)';

function ProjectCard({ project, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      {...fadeInUp(index * 0.1)}
      className="cursor-pointer group flex flex-col"
      onClick={() => navigate(`/work/${project.slug}`)}
    >
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-2xl mb-5 flex-none" style={{ aspectRatio: '4/3' }}>
        {project.coverImg ? (
          <img
            src={project.coverImg}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            style={{ filter: MONO_FILTER }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.style.backgroundColor = project.accentColor;
            }}
          />
        ) : (
          <motion.div
            className="w-full h-full flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: project.accentColor }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="font-bold select-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(80px, 12vw, 160px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                color: 'rgba(240,235,225,0.07)',
                lineHeight: 1,
              }}
            >
              {project.num}
            </span>
            <span
              className="absolute bottom-5 left-5 text-cream/20 font-medium"
              style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase' }}
            >
              {project.type.split(' · ')[0]}
            </span>
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-ink/25 font-medium">{project.num}</span>
          <span className="text-[10px] tracking-[0.18em] uppercase text-ink/30 font-medium">{project.year}</span>
        </div>

        <h3
          className="text-ink font-bold mb-1.5 group-hover:opacity-60 transition-opacity duration-300"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(22px, 2.2vw, 34px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            fontWeight: 800,
          }}
        >
          {project.name}
        </h3>

        <p className="text-[11px] tracking-[0.15em] uppercase text-ink/35 font-medium mb-3">{project.type}</p>

        <p className="text-ink/50 text-[13px] leading-relaxed mb-5 flex-1" style={{ lineHeight: 1.75 }}>
          {project.tagline}
        </p>

        <div className="flex items-center gap-2 mt-auto">
          <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-ink/70 group-hover:text-ink transition-colors">
            View Case Study
          </span>
          <span className="text-ink/30 group-hover:translate-x-1 group-hover:text-ink/60 transition-all duration-300 text-xs">→</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-cream px-6 md:px-10 pt-24 md:pt-32 pb-24">
      <motion.div {...fadeInUp()} className="flex items-end justify-between mb-12 md:mb-16">
        <h2
          className="text-ink font-bold"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(42px, 7vw, 100px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            fontWeight: 800,
          }}
        >
          Case<br />Studies
        </h2>
        <motion.p {...fadeInUp(0.1)} className="text-[11px] tracking-[0.25em] uppercase text-ink/35 font-medium pb-2 hidden sm:block">
          Selected Work
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8">
        {PROJECTS_DATA.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
