import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMAIL = 'uifabiannn@gmail.com';

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
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 md:px-10 pt-24 md:pt-32 pb-24"
      style={{ background: '#16120E' }}
    >
      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2.5 bg-cream text-ink px-5 py-3 rounded-full shadow-lg"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase">Email copied</span>
            <span className="text-ink/40 text-[13px]">✓</span>
          </motion.div>
        )}
      </AnimatePresence>

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

        {/* Email — click to copy */}
        <motion.div {...fadeInUp(0.25)} className="mb-10">
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-4 group cursor-pointer bg-transparent border-0 p-0 text-left"
          >
            <span
              className="text-cream font-bold underline underline-offset-4 decoration-cream/25 group-hover:decoration-cream transition-all duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(18px, 3.5vw, 46px)', letterSpacing: '-0.02em', fontWeight: 700 }}
            >
              {EMAIL}
            </span>
            <span className="text-cream/40 group-hover:text-cream transition-all duration-300 text-[13px] tracking-[0.15em] uppercase font-medium">
              {copied ? '✓' : 'Copy'}
            </span>
          </button>
        </motion.div>

        <motion.div {...fadeInUp(0.3)} className="mb-16 flex items-center gap-4">
          <button
            data-cal-link="fabian-wong/quick-chat"
            data-cal-namespace="quick-chat"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="bg-cream text-ink px-7 py-3.5 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-cream/80 transition-colors cursor-pointer"
          >
            Book a Call
          </button>
          <a href="mailto:uifabiannn@gmail.com"
            className="inline-flex items-center gap-2 border border-cream/25 text-cream/70 px-7 py-3.5 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold hover:border-cream/50 hover:text-cream transition-colors">
            Send Email
          </a>
        </motion.div>

        <motion.div {...fadeInUp(0.35)} className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-t border-cream/10 pt-8">
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
