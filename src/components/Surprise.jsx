import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../data/config';
import { ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Surprise({ onNext }) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    // Fire heart confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  return (
    <div className="section" style={{ backgroundColor: revealed ? 'var(--bg-color)' : 'rgba(0,0,0,0.05)', transition: 'background-color 1s ease' }}>
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="pre-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem', fontStyle: 'italic' }}>Wait... there's one more thing.</p>
            <p style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>I saved something here just for you.</p>
            
            <motion.button
              className="btn-primary"
              onClick={handleReveal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reveal It ❤️
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="post-reveal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.h2 
              style={{ fontSize: '3rem', color: 'var(--accent-red)', marginBottom: '2rem' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {config.finalMessage.reveal}
            </motion.h2>
            
            <motion.p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>{config.finalMessage.line1}</motion.p>
            <motion.p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}>{config.finalMessage.line2}</motion.p>
            <motion.p style={{ fontSize: '1.5rem', marginBottom: '2rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1 }}>{config.finalMessage.line3}</motion.p>
            
            <motion.h3 
              style={{ fontSize: '2rem', color: 'var(--accent-red)', marginTop: '1rem' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 5, duration: 1, type: 'spring' }}
            >
              {config.finalMessage.closing}
            </motion.h3>

            <motion.button
              className="btn-continue"
              onClick={onNext}
              style={{ marginTop: '4rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 7, duration: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
