import { motion } from 'framer-motion';

export default function EnvelopeScreen({ onNext }) {
  return (
    <div className="screen-wrapper">
      <motion.div 
        className="envelope-card"
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: -20 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      >
        <div style={{ position: 'absolute', top: '15px', right: '20px', fontSize: '1.2rem' }}>✨</div>
        <div style={{ position: 'absolute', bottom: '15px', left: '20px', fontSize: '1.2rem' }}>💖</div>
        
        <p className="font-handwritten" style={{ fontSize: '1.6rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          A special surprise for you...
        </p>

        <motion.button 
          className="heart-seal-btn" 
          onClick={onNext}
          whileHover={{ scale: 1.12, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.92 }}
          animate={{ boxShadow: ["0 8px 20px rgba(216,27,96,0.3)", "0 12px 28px rgba(216,27,96,0.6)", "0 8px 20px rgba(216,27,96,0.3)"] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Open me! 💌
        </motion.button>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
          Tap the heart to open
        </p>
      </motion.div>
    </div>
  );
}
