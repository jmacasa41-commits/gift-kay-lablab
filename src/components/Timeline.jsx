import { motion } from 'framer-motion';
import { config } from '../data/config';
import { Heart, ArrowRight } from 'lucide-react';

export default function Timeline({ onNext }) {
  return (
    <div className="section" style={{ padding: '4rem 1rem' }}>
      <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-red)', marginBottom: '3rem' }}>How We Got Here ❤️</h2>
      
      <div style={{ position: 'relative', maxWidth: '600px', width: '100%', margin: '0 auto' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'var(--soft-pink)',
          zIndex: 0
        }} />
        
        {config.timelineEvents.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            style={{ 
              display: 'flex', 
              marginBottom: '2.5rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'var(--bg-color)',
              border: '2px solid var(--accent-red)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '1.5rem',
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(211, 47, 47, 0.2)'
            }}>
              <Heart size={18} color="var(--accent-red)" fill="var(--soft-pink)" />
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-red)', marginBottom: '0.5rem' }}>{event.title}</h3>
              <p style={{ opacity: 0.8, fontSize: '1rem' }}>{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        className="btn-continue"
        onClick={onNext}
        style={{ marginTop: '2rem' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue <ArrowRight size={18} />
      </motion.button>
    </div>
  );
}
