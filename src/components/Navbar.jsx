import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Reset scroll state on route change
    setScrolled(window.scrollY > 60);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate home then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const isAboutPage = location.pathname === '/about';

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 transition-all duration-500"
      style={{
        background: scrolled || isAboutPage ? 'rgba(240,235,225,0.9)' : 'transparent',
        backdropFilter: scrolled || isAboutPage ? 'blur(12px)' : 'none',
        borderBottom: scrolled || isAboutPage ? '1px solid rgba(22,18,14,0.07)' : '1px solid transparent',
      }}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo — always goes home */}
      <Link
        to="/"
        onClick={() => location.pathname === '/' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-[13px] font-bold tracking-[0.22em] uppercase text-ink hover:opacity-55 transition-opacity"
      >
        FW
      </Link>

      <div className="flex items-center gap-9">
        <button
          onClick={() => scrollToSection('work')}
          className="text-[11px] tracking-[0.22em] uppercase text-ink font-medium opacity-50 hover:opacity-100 transition-opacity"
        >
          Work
        </button>

        {/* About → dedicated page */}
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
          download="Fabian Wong - Resume.pdf"
          className="flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 hover:bg-ink hover:text-cream hover:border-ink transition-all duration-300 group"
        >
          <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-ink group-hover:text-cream">
            Download CV
          </span>
          <span className="text-ink/50 group-hover:text-cream transition-colors text-[11px]">↓</span>
        </a>
      </div>
    </motion.nav>
  );
}
