import { useState, useRef, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '../data/config';

function getYouTubeDetails(url, configStartTime = 0) {
  if (!url) return { videoId: null, startTime: 0 };
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;

  let startTime = configStartTime || 0;
  const tMatch = url.match(/[?&](t|start)=([^&]+)/);
  if (tMatch) {
    const tVal = tMatch[2];
    if (/^\d+$/.test(tVal)) {
      startTime = parseInt(tVal, 10);
    } else if (tVal.includes('m') || tVal.includes('s')) {
      const mins = tVal.match(/(\d+)m/);
      const secs = tVal.match(/(\d+)s/);
      let total = 0;
      if (mins) total += parseInt(mins[1], 10) * 60;
      if (secs) total += parseInt(secs[1], 10);
      if (total > 0) startTime = total;
    }
  }

  return { videoId, startTime };
}

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const iframeRef = useRef(null);

  const { videoId, startTime } = getYouTubeDetails(config.youtubeUrl, config.musicStartTime);

  useEffect(() => {
    if (!videoId && config.musicFile) {
      audioRef.current = new Audio(config.musicFile);
      audioRef.current.loop = true;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [videoId]);

  const toggleMusic = () => {
    if (videoId) {
      if (iframeRef.current) {
        const command = isPlaying ? 'pauseVideo' : 'playVideo';
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: command, args: '' }),
          '*'
        );
        setIsPlaying(!isPlaying);
      }
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = startTime;
        audioRef.current.play().catch(e => console.log("Audio playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {videoId && (
        <iframe
          ref={iframeRef}
          title="Background Music"
          style={{ position: 'fixed', top: '-9999px', left: '-9999px', width: '1px', height: '1px', border: 0 }}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&loop=1&playlist=${videoId}&start=${startTime}`}
          allow="autoplay"
        />
      )}

      <motion.button
        className="music-toggle-btn"
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid #f8bbd0',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(233, 30, 99, 0.15)'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? { scale: [1, 1.08, 1], transition: { repeat: Infinity, duration: 2 } } : {}}
      >
        {isPlaying ? <Music size={22} color="var(--accent-pink)" /> : <VolumeX size={22} color="var(--text-muted)" />}
      </motion.button>
    </>
  );
}
