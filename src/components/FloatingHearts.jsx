import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now() + Math.random();
      const newHeart = {
        id,
        left: Math.random() * 100, // percentage
        size: Math.random() * 15 + 10, // 10 to 25px
        duration: Math.random() * 10 + 10, // 10 to 20s
        delay: Math.random() * 5,
      };

      setHearts(prev => [...prev.slice(-15), newHeart]); // Keep max 15 hearts at a time
    };

    const interval = setInterval(createHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0, x: `${heart.left}vw` }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.5, 0],
            x: [`${heart.left}vw`, `${heart.left + (Math.random() * 10 - 5)}vw`]
          }}
          transition={{ 
            duration: heart.duration, 
            ease: "linear",
            delay: heart.delay
          }}
          style={{ position: 'absolute' }}
        >
          <Heart size={heart.size} color="var(--soft-pink)" fill="rgba(248, 187, 208, 0.3)" />
        </motion.div>
      ))}
    </div>
  );
}
