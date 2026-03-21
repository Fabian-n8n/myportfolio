import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    setScrolled(window.scrollY > 60);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const isAboutPage = location.pathname === '/about';
  const navBg = scrolled || isAboutPage || menuOpen;

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500"
        style={{
          background: navBg ? 'rgba(240,235,225,0.92)' : 'transparent',
          backdropFilter: navBg ? 'blur(12px)' : 'none',
          borderBottom: navBg ? '1px solid rgba(22,18,14,0.07)' : '1px solid transparent',
        }}
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => location.pathname === '/' && window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative z-50 text-[13px] font-bold tracking-[0.22em] uppercase text-ink hover:opacity-55 transition-opacity"
        >
          FW
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
          <button
            onClick={() => scrollToSection('work')}
            className="text-[11px] tracking-[0.22em] uppercase text-ink font-medium opacity-50 hover:opacity-100 transition-opacity"
          >
            Work
          </button>
          <Link
            to="/about"
            className="text-[11px] tracking-[0.22em] uppercase text-ink font-medium opacity-50 hover:opacity-100 transition-opacity"
            style={{ opacity: isAboutPage ? 1 : undefined }}
          >
            About
          </Link>
          <button
            data-cal-link="fabian-wong/quick-chat"
            data-cal-namespace="quick-chat"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="text-[11px] tracking-[0.22em] uppercase text-ink font-medium opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          >
            Contact
          </button>
          <a
            href="/fabian-wong-resume.pdf"
            download="Fabian Wong - Resume - PD updated.pdf"
            className="flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 hover:bg-ink hover:text-cream hover:border-ink transition-all duration-300 group"
          >
            <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-ink group-hover:text-cream">
              Download CV
            </span>
            <span className="text-ink/50 group-hover:text-cream transition-colors text-[11px]">↓</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative z-50 md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-5 h-px bg-ink origin-center"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className="block w-4 h-px bg-ink"
            animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 6 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-px bg-ink origin-center"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </button>
      </motion.nav>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-8 pb-16"
            style={{ background: '#F0EBE1' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-1 mb-12">
              {[
                { label: 'Work', action: () => scrollToSection('work') },
                { label: 'About', action: () => { setMenuOpen(false); navigate('/about'); } },
              ].map(({ label, action }, i) => (
                <motion.button
                  key={label}
                  onClick={action}
                  className="block w-full text-left text-ink font-bold hover:opacity-40 transition-opacity"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(48px, 14vw, 80px)', letterSpacing: '-0.04em', lineHeight: 1.0, fontWeight: 800 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {label}
                </motion.button>
              ))}
              <motion.button
                data-cal-link="fabian-wong/quick-chat"
                data-cal-namespace="quick-chat"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left text-ink font-bold hover:opacity-40 transition-opacity cursor-pointer"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(48px, 14vw, 80px)', letterSpacing: '-0.04em', lineHeight: 1.0, fontWeight: 800 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Contact
              </motion.button>
            </div>
            <motion.div
              className="border-t border-ink/10 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.4 }}
            >
              <a
                href="/fabian-wong-resume.pdf"
                download="Fabian Wong - Resume - PD updated.pdf"
                className="inline-flex items-center gap-2 border border-ink/25 text-ink px-6 py-3 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-ink hover:text-cream hover:border-ink transition-all"
              >
                Download CV <span>↓</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
