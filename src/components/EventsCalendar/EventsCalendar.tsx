import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import type { Event } from '@/types/events';
import styles from './EventsCalendar.module.css';

function toDateOnly(dateLike: string | Date): Date {
  const d = new Date(dateLike);
  d.setHours(0, 0, 0, 0);
  return d;
}

interface EventsCalendarProps {
  events: Event[];
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
}

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const WEEKDAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type CalendarCell = 
  | { key: string; day?: never; date?: never; events?: never }
  | { key: string; day: number; date: Date; events: Event[] };

const EventsCalendar: React.FC<EventsCalendarProps> = ({ events, selectedDate, onDateSelect }) => {
  const router = useRouter();
  const { locale } = router;
  const weekdays = locale === 'ru' ? WEEKDAYS : WEEKDAYS_EN;

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const monthLabel = useMemo(() => {
    const date = new Date(viewYear, viewMonth);
    if (locale === 'ru') {
      return date.toLocaleDateString('ru-RU', {
        month: 'long',
        year: 'numeric',
      });
    }
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [viewMonth, viewYear, locale]);

  const daysGrid = useMemo<CalendarCell[]>(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();
    const weekday = (first.getDay() + 6) % 7; // 0..6, де 0 — Пн
    const leading: CalendarCell[] = Array.from({ length: weekday }).map((_, i) => ({ key: `e-${i}` }));
    const days: CalendarCell[] = Array.from({ length: lastDay }).map((_, i) => {
      const day = i + 1;
      const date = new Date(viewYear, viewMonth, day);
      date.setHours(0, 0, 0, 0);
      const dayEvents = events.filter((ev) => {
        if (!ev.date) return false;
        try {
          const eventDate = toDateOnly(ev.date);
          return date.getTime() === eventDate.getTime();
        } catch {
          return false;
        }
      });
      return { key: `d-${day}`, day, date, events: dayEvents };
    });
    return [...leading, ...days];
  }, [viewMonth, viewYear, events]);

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (date: Date, hasEvents: boolean) => {
    if (hasEvents) {
      onDateSelect(date);
    } else {
      onDateSelect(null);
    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calHeader}>
        <button type="button" className={styles.nav} onClick={goPrev}>
          ←
        </button>
        <div className={styles.month}>{monthLabel}</div>
        <button type="button" className={styles.nav} onClick={goNext}>
          →
        </button>
      </div>
      <div className={styles.weekdays}>
        {weekdays.map((w) => (
          <div key={w} className={styles.weekday}>
            {w}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {daysGrid.map((cell) => {
          if (!cell.day) {
            return <div key={cell.key} className={styles.empty} />;
          }
          const hasEvents = cell.events && cell.events.length > 0;
          const isToday = cell.date.getTime() === today.getTime();
          const isSelected = selectedDate && cell.date.getTime() === selectedDate.getTime();
          return (
            <button
              key={cell.key}
              type="button"
              className={[
                styles.day,
                hasEvents ? styles.events : '',
                isToday ? styles.today : '',
                isSelected ? styles.selected : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleDayClick(cell.date, hasEvents)}
            >
              <span>{cell.day}</span>
              {hasEvents && <span className={styles.dot} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EventsCalendar;

