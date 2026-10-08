import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../../data/config';
import { X, Play, Pause, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { resolvePhotoUrl } from '../../utils/imageHelper';

export default function NetflixMemoryPlayer({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [showEnding, setShowEnding] = useState(false);

  const photos = config.photos;
  const rawPhoto = photos[currentIndex] || {};
  const currentPhoto = {
    ...rawPhoto,
    url: resolvePhotoUrl(rawPhoto.url)
  };

  // Auto-play interval (4 seconds per photo)
  useEffect(() => {
    if (showIntro || showEnding || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= photos.length - 1) {
          setShowEnding(true);
          confetti({
            particleCount: 90,
            spread: 90,
            origin: { y: 0.6 }
          });
          return prev;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, showIntro, showEnding, photos.length]);

  // Dismiss intro after 2 seconds
  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(introTimer);
  }, []);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex >= photos.length - 1) {
      setShowEnding(true);
      confetti({ particleCount: 90, spread: 90, origin: { y: 0.6 } });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (showEnding) {
      setShowEnding(false);
      setCurrentIndex(photos.length - 1);
    } else {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const togglePause = (e) => {
    if (e) e.stopPropagation();
    setIsPlaying(prev => !prev);
  };

  return (
    <motion.div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0508',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        color: '#ffffff'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="netflix-intro"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', padding: '2rem' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
              transition={{ duration: 1.2 }}
              style={{
                fontSize: '3.8rem',
                fontWeight: '900',
                color: '#ec407a',
                letterSpacing: '4px',
                fontFamily: 'Playfair Display, serif',
                textShadow: '0 0 20px rgba(236, 64, 122, 0.6)'
              }}
            >
              OUR STORY
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.8 }}
              style={{ fontSize: '0.95rem', letterSpacing: '3px', marginTop: '1rem', color: '#f48fb1', textTransform: 'uppercase' }}
            >
              Now Streaming Memories
            </motion.p>
          </motion.div>
        ) : showEnding ? (
          /* Clean Ending Screen without Hearts */
          <motion.div
            key="netflix-ending"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', padding: '2rem', maxWidth: '400px' }}
          >
            <h2 className="font-serif" style={{ fontSize: '2.8rem', color: '#ffffff', marginBottom: '2.5rem', letterSpacing: '2px', textShadow: '0 0 15px rgba(236, 64, 122, 0.5)' }}>
              THE END
            </h2>

            <motion.button 
              className="pink-btn" 
              onClick={onClose}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              <ArrowLeft size={18} /> Back to Menu 🎁
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="slideshow-player"
            style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top Story Progress Bars */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '0',
              width: '100%',
              padding: '0 16px',
              display: 'flex',
              gap: '6px',
              zIndex: 40
            }}>
              {photos.map((_, index) => (
                <div 
                  key={index}
                  style={{
                    flex: 1,
                    height: '3px',
                    background: 'rgba(255, 255, 255, 0.35)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    style={{
                      height: '100%',
                      background: '#ec407a'
                    }}
                    initial={{ width: index < currentIndex ? '100%' : '0%' }}
                    animate={{ 
                      width: index === currentIndex ? (isPlaying ? '100%' : '50%') : index < currentIndex ? '100%' : '0%' 
                    }}
                    transition={{ 
                      duration: index === currentIndex && isPlaying ? 4 : 0, 
                      ease: "linear" 
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Top Header Controls */}
            <div style={{
              position: 'absolute',
              top: '28px',
              left: '0',
              right: '0',
              padding: '0 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 40
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ec407a', fontFamily: 'Playfair Display' }}>N</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', opacity: 0.9 }}>
                  MEMORY {currentIndex + 1} OF {photos.length}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  onClick={togglePause}
                  style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button 
                  onClick={onClose}
                  style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* PAUSED Badge Indicator */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  style={{
                    position: 'absolute',
                    top: '70px',
                    zIndex: 45,
                    background: 'rgba(236, 64, 122, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Pause size={14} /> PAUSED (TAP TO RESUME)
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background & Main Photo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '70px 20px 90px 20px'
                }}
              >
                {/* 1. Blurred Background Image */}
                <img 
                  src={currentPhoto.url} 
                  alt="Background Blur"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'blur(30px) brightness(0.35)',
                    transform: 'scale(1.15)'
                  }}
                />

                {/* 2. Main Full Portrait Photo */}
                <motion.img 
                  src={currentPhoto.url} 
                  alt={currentPhoto.caption}
                  onClick={togglePause}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: isPlaying ? [0.98, 1.02, 0.98] : 1, opacity: 1 }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                    opacity: { duration: 0.5 }
                  }}
                  style={{
                    maxHeight: '70vh',
                    maxWidth: '92vw',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '16px',
                    boxShadow: '0 15px 45px rgba(0, 0, 0, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    zIndex: 10,
                    cursor: 'pointer'
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Left / Right Tap Navigation Zones */}
            <div 
              onClick={handlePrev} 
              style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '25%', zIndex: 25, cursor: 'pointer' }}
            />
            <div 
              onClick={handleNext} 
              style={{ position: 'absolute', right: 0, top: '20%', bottom: '20%', width: '25%', zIndex: 25, cursor: 'pointer' }}
            />

            {/* Clean Bottom Caption */}
            <motion.div
              key={`caption-${currentIndex}`}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                position: 'absolute',
                bottom: '35px',
                left: '20px',
                right: '20px',
                zIndex: 35,
                textAlign: 'center',
                padding: '0 10px'
              }}
            >
              <p 
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '1.2rem', 
                  fontWeight: 500,
                  color: '#ffffff',
                  letterSpacing: '0.4px',
                  margin: 0,
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7)'
                }}
              >
                {currentPhoto.caption}
              </p>
            </motion.div>

            {/* Arrow Navigation Buttons */}
            <button
              onClick={handlePrev}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '50%', padding: '10px', zIndex: 30, cursor: 'pointer' }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={handleNext}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '50%', padding: '10px', zIndex: 30, cursor: 'pointer' }}
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
