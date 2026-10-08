import { motion } from 'framer-motion';
import { config } from '../data/config';
import { ArrowRight } from 'lucide-react';

export default function LoveLetter({ onNext }) {
  const letters = config.loveLetter.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.5 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <motion.div 
      className="section"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="glass-panel" style={{ padding: '2rem', maxWidth: '90%', width: '400px', textAlign: 'left' }}>
        <h2 style={{ color: 'var(--accent-red)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '2rem' }}>
          Happy 1st Monthsary, Love ❤️
        </h2>
        
        <motion.div
          style={{ 
            fontSize: '1.1rem', 
            lineHeight: '1.8', 
            whiteSpace: 'pre-wrap',
            fontFamily: 'Outfit, sans-serif'
          }}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {letters.map((char, index) => (
            <motion.span variants={child} key={index}>
              {char}
            </motion.span>
          ))}
        </motion.div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <motion.button
            className="btn-continue"
            onClick={onNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 10, duration: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
