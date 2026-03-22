import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import AboutPage from './pages/AboutPage';
import ProjectPage from './pages/ProjectPage';

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Projects />
      <About />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
        </Routes>
      </main>
      <Analytics />
    </BrowserRouter>
  );
}
