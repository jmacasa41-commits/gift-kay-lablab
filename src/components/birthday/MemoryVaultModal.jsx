import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Cloud, MoreVertical, Download } from 'lucide-react';

export default function MemoryVaultModal({ onBack }) {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const IMGBB_API_KEY = '960cd393165aca6ff24c9b73f8d001d3';

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem('memory_vault_images') || '[]');
    setImages(savedImages);
  }, []);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    let uploadedUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.success) {
          uploadedUrls.push(data.data.url);
        }
      } catch (error) {
        console.error("Error uploading to ImgBB:", error);
      }
    }

    if (uploadedUrls.length > 0) {
      const updatedImages = [...images, ...uploadedUrls];
      setImages(updatedImages);
      localStorage.setItem('memory_vault_images', JSON.stringify(updatedImages));
    }
    
    setIsUploading(false);
  };

  const downloadImage = async (img, idx) => {
    try {
      setActiveMenu(null);
      const response = await fetch(img);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `memory-${idx}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(img, '_blank');
    }
  };

  return (
    <div className="screen-wrapper" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)' }} onClick={() => setActiveMenu(null)}>
      <motion.div 
        className="pink-card vault-card"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ width: '90%', maxWidth: '400px', padding: '1.5rem', maxHeight: '80vh', overflowY: 'auto' }}
      >
        <button 
          onClick={onBack}
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Cloud size={40} color="var(--accent-pink)" style={{ marginBottom: '10px' }} />
          <h2 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Memory Vault</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Your memories are safely stored here in the cloud. You can delete them from your phone and they will stay here forever!
          </p>
        </div>

        <div className="vault-upload-box" style={{ 
          border: '2px dashed var(--accent-pink)', 
          borderRadius: '15px', 
          padding: '2rem 1rem', 
          textAlign: 'center',
          marginBottom: '1.5rem',
          position: 'relative',
          background: 'rgba(255, 182, 193, 0.1)'
        }}>
          <input 
            type="file" 
            multiple 
            accept="image/*"
            onChange={handleFileUpload}
            style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
              opacity: 0, cursor: 'pointer' 
            }} 
            disabled={isUploading}
          />
          <Upload size={30} color="var(--accent-pink)" style={{ marginBottom: '10px' }} />
          <p style={{ fontWeight: 'bold', color: 'var(--text-main)', fontSize: '0.9rem' }}>
            {isUploading ? "Saving to Cloud..." : "Tap here to upload photos"}
          </p>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px', textAlign: 'center' }}>
          Tap any photo for options.
        </p>

        <div className="vault-gallery" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '10px' 
        }}>
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ 
                aspectRatio: '1/1', 
                borderRadius: '10px', 
                overflow: 'visible',
                position: 'relative',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <img 
                src={img} 
                alt="memory" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === idx ? null : idx);
                }}
              />

              <div 
                style={{ 
                  position: 'absolute', 
                  top: '5px', 
                  right: '5px', 
                  background: 'rgba(0,0,0,0.5)', 
                  borderRadius: '50%', 
                  padding: '2px',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === idx ? null : idx);
                }}
              >
                <MoreVertical size={16} color="white" />
              </div>

              <AnimatePresence>
                {activeMenu === idx && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    style={{
                      position: 'absolute',
                      top: '30px',
                      right: '5px',
                      background: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      zIndex: 10,
                      overflow: 'hidden'
                    }}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(img, idx);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 15px',
                        background: 'none',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: 'var(--text-main)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Download size={14} /> Save Photo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          {images.length === 0 && !isUploading && (
            <div style={{ gridColumn: 'span 3', textAlign: 'center', color: '#999', fontSize: '0.8rem', padding: '1rem' }}>
              Your vault is empty. Upload some photos!
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
