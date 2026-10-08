import { motion } from 'framer-motion';
import { Heart, Play } from 'lucide-react';

export default function RetroIntroScreen({ onStart }) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #18080c 0%, #2e0f18 50%, #4a1424 100%)',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
        color: '#ffffff',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
      transition={{ duration: 0.6 }}
    >
      {/* Background ambient glowing circle */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(236, 64, 122, 0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Spinning Vinyl Record */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        style={{
          marginBottom: '2rem',
          color: '#ec407a',
          filter: 'drop-shadow(0 0 18px rgba(236, 64, 122, 0.5))'
        }}
      >
        <Heart size={110} strokeWidth={1.2} fill="#ec407a" />
      </motion.div>



      <h1 className="font-serif" style={{ fontSize: '2.4rem', color: '#ffffff', margin: '0.3rem 0 1rem', textShadow: '0 0 15px rgba(244,143,177,0.6)' }}>
        HAPPY MONTHSARRY!
      </h1>

      <p style={{ fontSize: '0.95rem', color: '#e0a3b0', marginBottom: '2.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
        🔊 Turn up your sound for the best experience
      </p>

      <motion.button
        className="pink-btn"
        onClick={onStart}
        whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(236, 64, 122, 0.8)' }}
        whileTap={{ scale: 0.92 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={{
          background: 'linear-gradient(135deg, #ec407a 0%, #c2185b 100%)',
          fontSize: '1.2rem',
          padding: '16px 36px',
          borderRadius: '40px',
          boxShadow: '0 8px 25px rgba(236, 64, 122, 0.5)'
        }}
      >
        PLAY <Play size={20} fill="white" />
      </motion.button>
    </motion.div>
  );
}
