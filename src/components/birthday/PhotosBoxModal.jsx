import { motion } from 'framer-motion';
import { config } from '../../data/config';
import { ArrowLeft, Play } from 'lucide-react';
import { resolvePhotoUrl } from '../../utils/imageHelper';

export default function PhotosBoxModal({ onBack, onPlayNetflix }) {
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
          Our Precious Memories 📸
        </span>
        <h2 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Photo Box
        </h2>

        <button 
          className="pink-btn" 
          onClick={onPlayNetflix}
          style={{ marginBottom: '1.2rem', width: '100%', justifyContent: 'center' }}
        >
          Play Story Mode (Netflix Style) <Play size={16} fill="white" />
        </button>

        <div className="photos-box-grid">
          {config.photos.map((item) => (
            <motion.div 
              key={item.id} 
              className="photo-box-item"
              onClick={onPlayNetflix}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ cursor: 'pointer' }}
            >
              <img src={resolvePhotoUrl(item.url)} alt={item.caption} />
              <p className="photo-box-caption">{item.caption}</p>
            </motion.div>
          ))}
        </div>

        <button 
          className="pink-btn" 
          onClick={onBack}
          style={{ marginTop: '0.8rem', padding: '10px 20px', fontSize: '0.9rem', background: 'transparent', color: 'var(--text-main)', boxShadow: 'none', border: '1px solid #f8bbd0' }}
        >
          <ArrowLeft size={16} /> Back to Menu
        </button>
      </motion.div>
    </div>
  );
}
