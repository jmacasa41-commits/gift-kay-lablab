import { motion } from 'framer-motion';

export default function Intro({ onNext }) {
  return (
    <motion.div 
      className="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--accent-red)' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Hi, love. ❤️
      </motion.h1>
      
      <motion.p
        style={{ fontSize: '1.2rem', marginBottom: '3rem', fontStyle: 'italic' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        I made something special for you.
      </motion.p>
      
      <motion.button
        className="btn-primary"
        onClick={onNext}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Open My Message
      </motion.button>
      
      <motion.p
        style={{ position: 'absolute', bottom: '2rem', fontSize: '0.8rem', opacity: 0.6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 4, duration: 1 }}
      >
        Made with love, just for you.
      </motion.p>
    </motion.div>
  );
}
