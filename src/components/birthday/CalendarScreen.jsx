import { motion } from 'framer-motion';
import { config } from '../../data/config';
import { Gift } from 'lucide-react';

export default function CalendarScreen({ onNext }) {
  const daysInMonth = 30; // Sept 2026
  const startOffset = 1;  // Starts on Tuesday (1 offset if Mon start)

  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="screen-wrapper">
      <motion.div
        className="pink-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-handwritten" style={{ fontSize: '1.4rem', color: 'var(--accent-pink)' }}>
          {config.calendar.eventLabel}
        </span>

        <h2 className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
          {config.calendar.month} {config.calendar.year}
        </h2>

        <div className="calendar-card-grid">
          <div className="cal-header">MON</div>
          <div className="cal-header">TUE</div>
          <div className="cal-header">WED</div>
          <div className="cal-header">THU</div>
          <div className="cal-header">FRI</div>
          <div className="cal-header">SAT</div>
          <div className="cal-header">SUN</div>

          {days.map((day, idx) => (
            <div
              key={idx}
              className={`cal-day ${day === config.calendar.highlightDay ? 'active-highlight' : ''}`}
            >
              {day || ''}
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
          Every 9 is marked as our special day! 🎉
        </p>

        <motion.button
          className="pink-btn"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See Your Surprise Gifts <Gift size={16} />
        </motion.button>
      </motion.div>
    </div>
  );
}
