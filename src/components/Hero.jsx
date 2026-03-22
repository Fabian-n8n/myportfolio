import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/* ─── Per-letter: mount-in + scroll-out ─────────────────── */
function AnimLetter({ ch, mountDelay, scrollYProgress, scrollStart }) {
  /* Each letter fades out at its own scroll threshold */
  const fadeEnd = scrollStart + 0.065;
  const outerOpacity = useTransform(scrollYProgress, [scrollStart, fadeEnd], [1, 0], { clamp: true });
  const outerY = useTransform(scrollYProgress, [scrollStart, fadeEnd], [0, -28], { clamp: true });
  const outerSkew = useTransform(scrollYProgress, [scrollStart, fadeEnd], [0, -8], { clamp: true });

  return (
    /* Scroll-out shell */
    <motion.span style={{ display: 'inline-block', opacity: outerOpacity, y: outerY, skewX: outerSkew }}>
      {/* Mount-in inner — opacity driven by animate, not style, so no conflict */}
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ opacity: 0, y: 80, skewX: 14 }}
        animate={{ opacity: 1, y: 0, skewX: 0 }}
        transition={{ duration: 0.72, delay: mountDelay, ease: [0.16, 1, 0.3, 1] }}
      >
        {ch === ' ' ? '\u00A0' : ch}
      </motion.span>
    </motion.span>
  );
}

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.play().catch(() => {});
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Video: plays normally — scroll drives scale + opacity only */
  const rawVideoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const videoScale = useSpring(rawVideoScale, { stiffness: 40, damping: 22 });
  const videoOpacity = useTransform(scrollYProgress, [0.08, 0.82], [1, 0]);

  /* Surrounding elements (role tag, CTAs, metadata) */
  const uiOpacity = useTransform(scrollYProgress, [0.28, 0.46], [1, 0]);
  const uiY = useTransform(scrollYProgress, [0.28, 0.46], [0, -45]);

  return (
    <section ref={sectionRef} className="relative" style={{ minHeight: '300vh' }}>

      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#F0EBE1' }}>

        {/* ── Video — autoplay, loop, NO seeking ──────── */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: videoScale, opacity: videoOpacity }}
        >
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            disablePictureInPicture
            x-webkit-airplay="deny"
            src="/hero-portrait-10s.mp4"
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'cover', objectPosition: '58% center' }}
          />
        </motion.div>

        {/* ── Gradient blends ─────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to right, #F0EBE1 18%, rgba(240,235,225,0.76) 40%, rgba(240,235,225,0.22) 62%, transparent 80%)',
        }} />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: '52%',
          background: 'linear-gradient(to top, #F0EBE1 0%, rgba(240,235,225,0.5) 55%, transparent 100%)',
        }} />
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
          height: '140px',
          background: 'linear-gradient(to bottom, rgba(240,235,225,0.65) 0%, transparent 100%)',
        }} />

        {/* ── Content ─────────────────────────────────── */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-8 md:pb-12 px-6 md:px-10">

          {/* Name label — small, mounts first */}
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: uiOpacity, y: uiY }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-ink/40" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-ink/55 font-medium">
                Fabian Wong · Singapore
              </span>
            </div>
          </motion.div>

          {/* ── Role: the dominant headline, per-letter animated ── */}
          <h1
            aria-label="Product Designer PM AI Engineer"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(44px, 8vw, 112px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.88,
              marginBottom: '1.75rem',
            }}
          >
            {/* PRODUCT DESIGNER */}
            <span style={{ display: 'block' }}>
              {'PRODUCT DESIGNER'.split('').map((ch, i) => (
                <AnimLetter
                  key={i} ch={ch}
                  mountDelay={0.28 + i * 0.032}
                  scrollYProgress={scrollYProgress}
                  scrollStart={0.07 + i * 0.013}
                />
              ))}
            </span>
            {/* PM × AI ENGINEER */}
            <span style={{ display: 'block' }}>
              {'PM \u00D7 AI ENGINEER'.split('').map((ch, i) => (
                <AnimLetter
                  key={i} ch={ch}
                  mountDelay={0.56 + i * 0.032}
                  scrollYProgress={scrollYProgress}
                  scrollStart={0.14 + i * 0.013}
                />
              ))}
            </span>
          </h1>

          {/* Bottom row — mount + scroll fade together */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: uiOpacity, y: uiY }}
          >
            <div className="hidden sm:flex items-center gap-7">
              {['Building 0→1 products', 'AI-powered workflows', 'Open to Opportunities'].map((t) => (
                <span key={t} className="text-[10px] tracking-[0.25em] uppercase text-ink/45 font-medium">{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                data-cal-link="fabian-wong/quick-chat"
                data-cal-namespace="quick-chat"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="bg-ink text-cream px-7 py-3.5 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-ink/75 transition-colors cursor-pointer"
              >
                Let's Talk
              </button>
              <a
                href="/fabian-wong-resume.pdf"
                download="Fabian Wong - Resume - PD updated.pdf"
                className="inline-flex items-center gap-2 border border-ink/30 text-ink px-7 py-3.5 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold hover:border-ink transition-colors"
              >
                Download CV <span className="text-ink/50 text-[11px]">↓</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Right editorial annotations ─────────────── */}
        <motion.div
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-end gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ opacity: uiOpacity }}
        >
          {['KELICK · $10K MRR', 'NODEMATION · AI AGENCY', 'DESIGN × PRODUCT × CODE'].map((t) => (
            <span key={t} className="text-[9px] tracking-[0.28em] uppercase text-ink/30 font-medium">{t}</span>
          ))}
        </motion.div>

        {/* ── Scroll cue ────────────────────────────── */}
        <motion.div
          className="absolute bottom-8 left-10 z-30 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          style={{ opacity: uiOpacity }}
        >
          <motion.div
            className="w-8 h-px bg-ink/35 origin-left"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[9px] tracking-[0.32em] uppercase text-ink/40 font-medium">Scroll</span>
        </motion.div>

      </div>
    </section>
  );
}
