import { motion } from 'framer-motion';

export default function MenuScreen({ onSelect }) {
  return (
    <div className="screen-wrapper">
      <motion.div
        className="pink-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-handwritten" style={{ fontSize: '1.5rem', color: 'var(--accent-pink)' }}>
          Made with love for you ❤️
        </span>
        <h2 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--text-main)', margin: '0.3rem 0 1.2rem' }}>
          Your Gift Box 🎁
        </h2>

        <div className="gift-grid">
          <motion.div
            className="gift-card-btn"
            onClick={() => onSelect('message')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gift-icon">💌</span>
            <span className="gift-label">Love Letter</span>
          </motion.div>

          <motion.div
            className="gift-card-btn"
            onClick={() => onSelect('photos')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gift-icon">📸</span>
            <span className="gift-label">Our Photo Box</span>
          </motion.div>

          <motion.div
            className="gift-card-btn"
            onClick={() => onSelect('song')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gift-icon">🎵</span>
            <span className="gift-label">Our Song</span>
          </motion.div>
        </div>

      </motion.div>

      {/* Memory Vault Floating Button */}
      <motion.button
        onClick={() => onSelect('vault')}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'var(--card-bg)',
          backdropFilter: 'blur(8px)',
          border: '2px solid var(--accent-pink)',
          borderRadius: '50px',
          padding: '0.6rem 1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--accent-rose)',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          cursor: 'pointer',
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(236, 64, 122, 0.25)',
          zIndex: 100
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>☁️</span>
        Vault
      </motion.button>
    </div>
  );
}
