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

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const hasAutoPlayed = useRef(false);

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

            // Update title on track change
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
  useEffect(() => {
    if (!ready || hasAutoPlayed.current) return;
    const tryPlay = () => {
      if (hasAutoPlayed.current) return;
      hasAutoPlayed.current = true;
      playerRef.current?.playVideo();
    };
    const events = ['click', 'scroll', 'touchstart', 'keydown'];
    events.forEach(e => window.addEventListener(e, tryPlay, { once: true, passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, tryPlay));
  }, [ready]);

  const toggle = () => {
    if (!ready || !playerRef.current) return;
    playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };
  const next = () => ready && playerRef.current?.nextVideo();
  const prev = () => ready && playerRef.current?.previousVideo();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Hidden YouTube player — 1×1 to satisfy embed ToS */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', bottom: 0, right: 0, width: 1, height: 1, overflow: 'hidden', opacity: 0.01, pointerEvents: 'none', zIndex: -1 }}
      >
        <div ref={containerRef} />
      </div>

      {/* ── Desktop player — right side, below hero annotations ── */}
      <div className="hidden md:block fixed z-40" style={{ right: 24, top: '58%' }}>
        <div style={{ width: 176 }} className="flex flex-col gap-2.5">

          {/* Song title */}
          <AnimatePresence mode="wait">
            <motion.p
              key={title}
              className="text-right text-[8px] tracking-[0.2em] uppercase font-medium text-ink/40 truncate"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.25 }}
            >
              {title || (ready ? '—' : 'Loading…')}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="w-full h-px bg-ink/12 rounded-full overflow-hidden">
            <div
              className="h-full bg-ink/35 rounded-full"
              style={{ width: `${progress}%`, transition: 'width 0.5s linear' }}
            />
          </div>

          {/* Controls + time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Prev */}
              <button onClick={prev} aria-label="Previous" className="text-ink/35 hover:text-ink/65 transition-colors cursor-pointer">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                </svg>
              </button>

              {/* Play / Pause */}
              <button
                onClick={toggle}
                aria-label={playing ? 'Pause' : 'Play'}
                className="w-5 h-5 rounded-full border border-ink/25 flex items-center justify-center hover:border-ink/50 transition-colors cursor-pointer"
              >
                {playing ? (
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="currentColor" className="text-ink/60">
                    <path d="M6 19h4V5H6zm8-14v14h4V5z" />
                  </svg>
                ) : (
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="currentColor" className="text-ink/60">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button onClick={next} aria-label="Next" className="text-ink/35 hover:text-ink/65 transition-colors cursor-pointer">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6zm2.5 0V6l8.5 6z" />
                </svg>
              </button>
            </div>

            {/* Time */}
            <span className="text-[7px] tracking-[0.1em] font-medium text-ink/30 tabular-nums">
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>

          {/* Equaliser bars when playing */}
          <div className="flex justify-end gap-0.5 items-end" style={{ height: 8 }}>
            {[0, 0.18, 0.36].map((delay, i) => (
              <motion.span
                key={i}
                className="block w-[2px] rounded-full"
                style={{ height: 6, background: playing ? 'rgba(22,18,14,0.25)' : 'transparent' }}
                animate={playing ? { scaleY: [0.35, 1, 0.35] } : { scaleY: 0.35 }}
                transition={{ duration: 0.85, repeat: playing ? Infinity : 0, delay, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile — small floating button bottom-right ── */}
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="md:hidden fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full border border-ink/20 bg-cream flex items-center justify-center shadow-sm cursor-pointer hover:border-ink/50 transition-colors"
      >
        {playing ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-ink/60">
            <path d="M6 19h4V5H6zm8-14v14h4V5z" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink/60">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>
    </>
  );
}
