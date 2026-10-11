import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import RetroIntroScreen from './components/birthday/RetroIntroScreen';
import EnvelopeScreen from './components/birthday/EnvelopeScreen';
import PolaroidScreen from './components/birthday/PolaroidScreen';
import CalendarScreen from './components/birthday/CalendarScreen';
import MenuScreen from './components/birthday/MenuScreen';
import MessageScreen from './components/birthday/MessageScreen';
import PhotosBoxModal from './components/birthday/PhotosBoxModal';
import CakeModal from './components/birthday/CakeModal';
import NetflixMemoryPlayer from './components/birthday/NetflixMemoryPlayer';
import MemoryVaultModal from './components/birthday/MemoryVaultModal';
import SongStoryScreen from './components/birthday/SongStoryScreen';
import FlowersModal from './components/birthday/FlowersModal';
import MusicButton from './components/MusicButton';
import FloatingHearts from './components/FloatingHearts';
import './index.css';

function App() {
  const [screen, setScreen] = useState('retro-intro');

  const startWithMusic = () => {
    // Trigger music auto-play on user gesture
    const musicBtn = document.querySelector('.music-toggle-btn');
    if (musicBtn) musicBtn.click();
    
    setScreen('envelope');
  };

  return (
    <div className="app-container">
      <FloatingHearts />
      <MusicButton />

      <AnimatePresence mode="wait">
        {screen === 'retro-intro' && (
          <RetroIntroScreen key="retro-intro" onStart={startWithMusic} />
        )}

        {screen === 'envelope' && (
          <EnvelopeScreen key="envelope" onNext={() => setScreen('polaroid')} />
        )}

        {screen === 'polaroid' && (
          <PolaroidScreen key="polaroid" onNext={() => setScreen('calendar')} />
        )}

        {screen === 'calendar' && (
          <CalendarScreen key="calendar" onNext={() => setScreen('menu')} />
        )}

        {screen === 'menu' && (
          <MenuScreen 
            key="menu" 
            onSelect={(item) => {
              if (item === 'song') {
                setScreen('song');
              } else if (item === 'photos') {
                setScreen('netflix');
              } else {
                setScreen(item);
              }
            }} 
          />
        )}

        {screen === 'message' && (
          <MessageScreen key="message" onBack={() => setScreen('menu')} />
        )}

        {screen === 'photos' && (
          <PhotosBoxModal 
            key="photos" 
            onBack={() => setScreen('menu')} 
            onPlayNetflix={() => setScreen('netflix')}
          />
        )}

        {screen === 'netflix' && (
          <NetflixMemoryPlayer 
            key="netflix" 
            onClose={() => setScreen('menu')} 
          />
        )}

        {screen === 'cake' && (
          <CakeModal key="cake" onBack={() => setScreen('menu')} />
        )}

        {screen === 'vault' && (
          <MemoryVaultModal key="vault" onBack={() => setScreen('menu')} />
        )}

        {screen === 'song' && (
          <SongStoryScreen key="song" onBack={() => setScreen('menu')} />
        )}

        {screen === 'flowers' && (
          <FlowersModal key="flowers" onBack={() => setScreen('menu')} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
