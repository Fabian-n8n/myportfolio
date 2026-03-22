import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYLIST_IDS = [
  'j61QtWB1zj0',
  'dyzoRZY5MEg',
  '9-Bg2smOmPk',
  'MHCsrKA9gh8',
];

function fmt(s) {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

const glass = {
  background: 'rgba(240, 235, 225, 0.45)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(22, 18, 14, 0.09)',
  borderRadius: 10,
};

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const hasAutoPlayed = useRef(false);
  const wantsToPlay = useRef(false);
  const hideTimer = useRef(null);
  const autoHideTimer = useRef(null);

  /* ── Load YouTube IFrame API ── */
  useEffect(() => {
    const init = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: PLAYLIST_IDS[0],
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: PLAYLIST_IDS.join(','),
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          rel: 0,
        },
        events: {
          onReady: (e) => {
            setReady(true);
            const d = e.target.getVideoData();
            if (d?.title) setTitle(d.title);
          },
          onStateChange: (e) => {
            const YT = window.YT.PlayerState;
            const isPlaying = e.data === YT.PLAYING;
            setPlaying(isPlaying);
            const data = playerRef.current?.getVideoData();
            if (data?.title) setTitle(data.title);
            if (isPlaying) {
              clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                setCurrentTime(playerRef.current?.getCurrentTime() ?? 0);
                setDuration(playerRef.current?.getDuration() ?? 0);
              }, 500);
            } else {
              clearInterval(intervalRef.current);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      init();
    } else {
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = init;
    }

    return () => {
      clearInterval(intervalRef.current);
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  /* ── Auto-play on first user interaction ── */
  /* Listen immediately on mount — don't wait for ready */
  useEffect(() => {
    const EVENTS = ['click', 'scroll', 'touchstart', 'pointerdown', 'keydown', 'mousemove'];
    const tryPlay = () => {
      if (hasAutoPlayed.current) return;
      hasAutoPlayed.current = true;
      if (playerRef.current) {
        playerRef.current.playVideo();
      } else {
        wantsToPlay.current = true;
      }
    };
    // Keep all listeners alive — hasAutoPlayed guards against double-play
    EVENTS.forEach(e => window.addEventListener(e, tryPlay, { passive: true }));
    return () => EVENTS.forEach(e => window.removeEventListener(e, tryPlay));
  }, []);

  /* If user interacted before player was ready, play now */
  useEffect(() => {
    if (ready && wantsToPlay.current && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      playerRef.current?.playVideo();
    }
  }, [ready]);

  /* ── Auto-hide after 5s of playing ── */
  useEffect(() => {
    if (playing) {
      autoHideTimer.current = setTimeout(() => setExpanded(false), 5000);
    } else {
      clearTimeout(autoHideTimer.current);
    }
    return () => clearTimeout(autoHideTimer.current);
  }, [playing]);

  const onMouseEnter = () => {
    clearTimeout(hideTimer.current);
    clearTimeout(autoHideTimer.current);
    setExpanded(true);
  };
  const onMouseLeave = () => {
    hideTimer.current = setTimeout(() => setExpanded(false), 900);
  };

  const toggle = () => {
    if (!ready || !playerRef.current) return;
    playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };
  const next = () => ready && playerRef.current?.nextVideo();
  const prev = () => ready && playerRef.current?.previousVideo();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Hidden YouTube player */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', bottom: 0, right: 0, width: 1, height: 1, overflow: 'hidden', opacity: 0.01, pointerEvents: 'none', zIndex: -1 }}
      >
        <div ref={containerRef} />
      </div>

      {/* ── Unified — fixed bottom-right, above Download CV button ── */}
      <div
        className="fixed z-50 flex flex-col items-end"
        style={{ right: 24, bottom: 108 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            /* Full player */
            <motion.div
              key="player"
              style={{ ...glass, width: 164, padding: '10px 12px' }}
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Title row */}
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="block w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: playing ? 'rgba(22,18,14,0.5)' : 'rgba(22,18,14,0.2)' }}
                  animate={playing ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                  transition={{ duration: 1.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
                />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={title}
                    className="text-[8px] tracking-[0.15em] uppercase font-medium text-ink/45 truncate flex-1 min-w-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {title || (ready ? '—' : 'Loading…')}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress bar */}
              <div className="w-full rounded-full overflow-hidden" style={{ height: 1, background: 'rgba(22,18,14,0.1)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, background: 'rgba(22,18,14,0.4)', transition: 'width 0.5s linear' }}
                />
              </div>

              {/* Controls + time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={prev} aria-label="Previous" className="cursor-pointer" style={{ color: 'rgba(22,18,14,0.35)', lineHeight: 0 }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
                  </button>
                  <button
                    onClick={toggle}
                    aria-label={playing ? 'Pause' : 'Play'}
                    className="cursor-pointer flex items-center justify-center rounded-full"
                    style={{ width: 18, height: 18, border: '1px solid rgba(22,18,14,0.22)', color: 'rgba(22,18,14,0.6)', lineHeight: 0 }}
                  >
                    {playing ? (
                      <svg width="6" height="6" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z" /></svg>
                    ) : (
                      <svg width="6" height="6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    )}
                  </button>
                  <button onClick={next} aria-label="Next" className="cursor-pointer" style={{ color: 'rgba(22,18,14,0.35)', lineHeight: 0 }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6zm2.5 0V6l8.5 6z" /></svg>
                  </button>
                </div>
                <span style={{ fontSize: 7, letterSpacing: '0.08em', color: 'rgba(22,18,14,0.28)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                  {fmt(currentTime)} / {fmt(duration)}
                </span>
              </div>
            </motion.div>
          ) : (
            /* Collapsed label */
            <motion.div
              key="label"
              className="flex items-center gap-1.5 cursor-default"
              style={{ ...glass, padding: '6px 10px' }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="block w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: playing ? 'rgba(22,18,14,0.45)' : 'rgba(22,18,14,0.2)' }}
                animate={playing ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
                transition={{ duration: 1.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              />
              <span style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(22,18,14,0.4)', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>
                {playing ? 'Now Playing' : 'Music Player'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
