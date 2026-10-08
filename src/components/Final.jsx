import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Final() {
  return (
    <div className="section" style={{ padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', fontStyle: 'italic' }}>
          Thank you for being my person.
        </p>
        
        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Here's to our first month...</p>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>...and hopefully to many more.</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '2rem', color: 'var(--accent-red)', fontWeight: '600', fontFamily: 'Playfair Display, serif' }}>
          <Heart size={32} fill="var(--accent-red)" className="pulse" />
          I love you.
          <Heart size={32} fill="var(--accent-red)" className="pulse" />
        </div>
      </motion.div>
      
      <div style={{ position: 'absolute', bottom: '2rem', opacity: 0.6, fontSize: '0.9rem' }}>
        Made especially for you.
      </div>
    </div>
  );
}
