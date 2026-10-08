import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../data/config';
import { ArrowRight, X } from 'lucide-react';

export default function Memories({ onNext }) {
  const [selectedId, setSelectedId] = useState(null);
  
  const selectedMemory = config.memories.find(m => m.id === selectedId);

  return (
    <motion.div 
      className="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ padding: '4rem 1rem' }}
    >
      <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-red)', marginBottom: '0.5rem' }}>Our Little Moments</h2>
      <p style={{ fontStyle: 'italic', marginBottom: '2rem', opacity: 0.8 }}>Some moments I never want to forget.</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '900px',
        padding: '0 1rem'
      }}>
        {config.memories.map(memory => (
          <motion.div
            key={memory.id}
            layoutId={`memory-${memory.id}`}
            onClick={() => setSelectedId(memory.id)}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              height: '250px'
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(244, 143, 177, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img 
              src={memory.image} 
              alt="Memory" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100,
              padding: '2rem'
            }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`memory-${selectedId}`}
              style={{
                width: '100%',
                maxWidth: '500px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                backgroundColor: 'white'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedMemory.image} 
                alt="Memory" 
                style={{ width: '100%', maxHeight: '60vh', objectFit: 'cover' }} 
              />
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '1.1rem', fontFamily: 'Outfit' }}>{selectedMemory.caption}</p>
              </div>
            </motion.div>
            <button 
              onClick={() => setSelectedId(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'rgba(0,0,0,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="btn-continue"
        onClick={onNext}
        style={{ marginTop: '3rem' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue <ArrowRight size={18} />
      </motion.button>
    </motion.div>
  );
}
