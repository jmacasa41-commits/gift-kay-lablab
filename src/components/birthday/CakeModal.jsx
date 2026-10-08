import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft } from 'lucide-react';

export default function CakeModal({ onBack }) {
  const [blown, setBlown] = useState(false);

  const handleBlow = () => {
    setBlown(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="screen-wrapper">
      <motion.div 
        className="pink-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-handwritten" style={{ fontSize: '1.5rem', color: 'var(--accent-pink)' }}>
          Make a Wish! 🎂
        </span>
        <h2 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--text-main)', margin: '0.3rem 0 1.2rem' }}>
          Birthday Cake
        </h2>

        <div style={{ fontSize: '5rem', margin: '1rem 0', position: 'relative' }}>
          {!blown ? (
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              🎂
              <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', fontSize: '1.5rem' }}>
                🔥
              </span>
            </motion.div>
          ) : (
            <div>🎂✨</div>
          )}
        </div>

        {!blown ? (
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Tap the button below to blow out your candles! 🕯️
          </p>
        ) : (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-handwritten" 
            style={{ fontSize: '1.6rem', color: 'var(--accent-pink)', marginBottom: '1.5rem' }}
          >
            May all your sweet birthday wishes come true! 🎉💖
          </motion.p>
        )}

        {!blown && (
          <motion.button 
            className="pink-btn" 
            onClick={handleBlow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginBottom: '1rem' }}
          >
            Blow Candle 💨
          </motion.button>
        )}

        <div>
          <button 
            className="pink-btn" 
            onClick={onBack}
            style={{ background: 'transparent', color: 'var(--text-main)', boxShadow: 'none', border: '1px solid #f8bbd0', padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={14} /> Back to Menu
          </button>
        </div>
      </motion.div>
    </div>
  );
}
