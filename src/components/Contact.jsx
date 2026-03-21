import { motion } from 'framer-motion';

const LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/fabian-wong/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@fabian.n8n' },
];

function fadeInUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.05 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-10 pt-32 pb-24"
      style={{ background: '#16120E' }}
    >
      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden style={{ lineHeight: 0.78 }}>
        <span className="block text-center font-bold"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(100px, 18vw, 280px)', fontWeight: 800, letterSpacing: '-0.05em', color: 'rgba(240,235,225,0.04)' }}>
          CONTACT
        </span>
      </div>

      <div className="relative z-10">
        <motion.div {...fadeInUp()} className="flex items-center gap-3 mb-8">
          <div className="w-6 h-px bg-cream/25" />
          <span className="text-[11px] tracking-[0.28em] uppercase text-cream/45 font-medium">Let's Connect</span>
        </motion.div>

        <motion.h2 {...fadeInUp(0.1)} className="text-cream font-bold mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(40px, 7.5vw, 110px)', letterSpacing: '-0.04em', lineHeight: 0.88, fontWeight: 800 }}>
          Available for<br />new roles.
        </motion.h2>

        <motion.p {...fadeInUp(0.18)} className="text-cream/45 mb-14"
          style={{ fontSize: '15px', maxWidth: '460px', lineHeight: 1.75 }}>
          Actively looking for PM, Product Design, and AI Engineering
          opportunities. Open to full-time roles or freelance projects
          based in Singapore or remote.
        </motion.p>

        <motion.div {...fadeInUp(0.25)} className="mb-20">
          <a href="mailto:uifabiannn@gmail.com"
            className="inline-flex items-center gap-4 group"
            onClick={(e) => { e.preventDefault(); window.location.href = 'mailto:uifabiannn@gmail.com'; }}>
            <span className="text-cream font-bold underline underline-offset-4 decoration-cream/25 group-hover:decoration-cream transition-all duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(22px, 3.5vw, 46px)', letterSpacing: '-0.02em', fontWeight: 700 }}>
              uifabiannn@gmail.com
            </span>
            <span className="text-cream/40 group-hover:text-cream group-hover:translate-x-1 transition-all duration-300"
              style={{ fontSize: 'clamp(20px, 2.5vw, 36px)' }}>
              →
            </span>
          </a>
        </motion.div>

        <motion.div {...fadeInUp(0.3)} className="flex items-end justify-between border-t border-cream/10 pt-8">
          <span className="text-cream font-bold text-[14px]" style={{ letterSpacing: '-0.01em', fontWeight: 700 }}>FW</span>
          <div className="flex items-center gap-8">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="text-[11px] tracking-[0.2em] uppercase text-cream/40 font-medium hover:text-cream/80 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-cream/25 font-medium">Singapore · 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
