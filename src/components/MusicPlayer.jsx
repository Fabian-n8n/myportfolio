import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEO_ID = 'j61QtWB1zj0';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API once
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    if (!document.getElementById('yt-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = initPlayer;

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  const initPlayer = () => {
    if (!containerRef.current) return;
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: VIDEO_ID,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        rel: 0,
      },
      events: {
        onReady: () => setReady(true),
        onStateChange: (e) => {
          setPlaying(e.data === window.YT.PlayerState.PLAYING);
        },
      },
    });
  };

  const toggle = () => {
    if (!ready || !playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Hidden YouTube player — 1×1px so ToS is respected */}
      <div
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0.01, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <div ref={containerRef} />
      </div>

      {/* Label tooltip */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            className="pointer-events-none"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-[9px] tracking-[0.22em] uppercase text-ink/50 font-medium whitespace-nowrap">
              {playing ? 'Now Playing' : ready ? 'Play Music' : 'Loading…'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={toggle}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full border border-ink/20 bg-cream flex items-center justify-center cursor-pointer hover:border-ink/50 transition-colors shadow-sm"
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? (
          /* Pause icon */
          <span className="flex gap-0.5 items-center">
            <motion.span
              className="block w-[2px] bg-ink/70 rounded-full"
              style={{ height: 12 }}
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
            />
            <motion.span
              className="block w-[2px] bg-ink/70 rounded-full"
              style={{ height: 12 }}
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.span
              className="block w-[2px] bg-ink/70 rounded-full"
              style={{ height: 12 }}
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
          </span>
        ) : (
          /* Music note icon */
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink/60">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
