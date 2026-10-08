import { motion } from 'framer-motion';
import { config } from '../../data/config';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function MessageScreen({ onBack }) {
  useEffect(() => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="screen-wrapper">
      <motion.div 
        className="pink-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-handwritten" style={{ fontSize: '1.4rem', color: 'var(--accent-pink)' }}>
          From My Heart 💌
        </span>
        <h2 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
          Love Letter
        </h2>

        <div style={{ 
          fontSize: '0.95rem', 
          lineHeight: '1.7', 
          color: 'var(--text-main)', 
          whiteSpace: 'pre-wrap', 
          marginBottom: '1.5rem',
          background: 'rgba(253, 240, 244, 0.6)',
          padding: '1.2rem',
          borderRadius: '16px',
          border: '1px solid #f8bbd0',
          textAlign: 'left'
        }}>
          {config.loveLetter}
        </div>

        <button 
          className="pink-btn" 
          onClick={onBack}
          style={{ padding: '10px 20px', fontSize: '0.9rem' }}
        >
          <ArrowLeft size={16} /> Back to Menu
        </button>
      </motion.div>
    </div>
  );
}
