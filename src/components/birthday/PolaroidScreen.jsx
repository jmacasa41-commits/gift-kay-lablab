import { motion } from 'framer-motion';
import { config } from '../../data/config';
import { Sparkles, Calendar } from 'lucide-react';
import { resolvePhotoUrl } from '../../utils/imageHelper';

export default function PolaroidScreen({ onNext }) {
  return (
    <div className="screen-wrapper">
      <motion.div
        className="pink-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <div className="polaroid-frame">
          <div className="polaroid-tape"></div>
          <img src={resolvePhotoUrl("/photos/12.jpg")} alt="Us" className="polaroid-img" />
          <div style={{ marginTop: '9px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
            <Calendar size={18} color="var(--accent-pink)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{config.birthdayDate}</span>
          </div>
        </div>

        <motion.h2
          className="font-serif"
          style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >

        </motion.h2>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          I made a little digital space just for our special day.
        </p>

        <motion.button
          className="pink-btn"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Open Calendar <Sparkles size={16} />
        </motion.button>
      </motion.div>
    </div>
  );
}
