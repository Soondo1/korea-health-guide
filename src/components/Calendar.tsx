import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getKoreanHolidays, 
  getSystemEvents, 
  getHolidayForDate, 
  getEventsForDate,
  generateCalendarMonth,
  CalendarState,
  initCalendarState,
  navigateToNextMonth,
  navigateToPreviousMonth,
  selectDate,
  toggleHolidayVisibility,
  toggleInfoPanel,
  endAnimation
} from '@/services/calendarService';
import { format, isToday, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, EyeIcon, EyeOffIcon, InfoIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC = () => {
  const [state, setState] = useState<CalendarState>(initCalendarState());
  const [calendarDays, setCalendarDays] = useState<Array<{date: Date, isCurrentMonth: boolean}>>([]);
  const [holidays, setHolidays] = useState(getKoreanHolidays());
  const [events, setEvents] = useState(getSystemEvents());
  
  useEffect(() => {
    // Generate calendar days when month changes
    const days = generateCalendarMonth(
      state.currentMonth.getFullYear(),
      state.currentMonth.getMonth()
    );
    setCalendarDays(days);
    
    // End animation after a delay
    if (state.isAnimating) {
      const timer = setTimeout(() => {
        setState(endAnimation(state));
      }, 300); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [state.currentMonth, state.isAnimating]);

  // Handler functions
  const handlePreviousMonth = useCallback(() => {
    setState(navigateToPreviousMonth(state));
  }, [state]);

  const handleNextMonth = useCallback(() => {
    setState(navigateToNextMonth(state));
  }, [state]);

  const handleDateSelect = useCallback((date: Date) => {
    setState(selectDate(state, date));
  }, [state]);

  const handleToggleHolidays = useCallback(() => {
    setState(toggleHolidayVisibility(state));
  }, [state]);

  const handleToggleInfo = useCallback(() => {
    setState(toggleInfoPanel(state));
  }, [state]);

  // Animations
  const calendarVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.2 }
    })
  };

  const dayVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    selected: { scale: 1.1, boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.5)' }
  };

  const infoVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: 'auto', opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg shadow-lg bg-white p-4 md:p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-kare-600" />
          <span>Calendar</span>
        </h2>
        
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            onClick={handleToggleHolidays}
            aria-label={state.holidaysVisible ? "Hide holidays" : "Show holidays"}
          >
            {state.holidaysVisible ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeOffIcon className="h-5 w-5" />
            )}
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            onClick={handleToggleInfo}
            aria-label="Toggle information panel"
          >
            <InfoIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          disabled={state.isAnimating}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 text-gray-600"
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        
        <h3 className="text-xl font-medium text-gray-700">
          {format(state.currentMonth, 'MMMM yyyy')}
        </h3>
        
        <button
          onClick={handleNextMonth}
          disabled={state.isAnimating}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 text-gray-600"
          aria-label="Next month"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Information Panel */}
      <AnimatePresence>
        {state.infoExpanded && (
          <motion.div
            className="bg-blue-50 rounded-md p-4 mb-4 text-sm text-blue-800 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={infoVariants}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Korean Holidays</h4>
              <button 
                onClick={handleToggleInfo}
                className="text-blue-600 hover:text-blue-800"
                aria-label="Close information panel"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <p>
              This calendar displays Korean public and traditional holidays. 
              Public holidays are official days off, while traditional holidays are cultural celebrations.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">Public</span>
              <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-800 text-xs">Traditional</span>
              <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs">Special</span>
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">Cultural</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Day of Week Headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={day}
            className={cn(
              "text-center py-2 text-sm font-medium",
              index === 0 ? "text-red-500" : "text-gray-700" // Sunday in red
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid with Animation */}
      <AnimatePresence mode="wait" initial={false} custom={state.animationState === 'month-entering' ? 1 : -1}>
        <motion.div
          key={state.currentMonth.toISOString()}
          className="grid grid-cols-7 gap-1"
          custom={state.animationState === 'month-entering' ? 1 : -1}
          variants={calendarVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {calendarDays.map((day, index) => {
            const isSelected = state.selectedDate ? isSameDay(day.date, state.selectedDate) : false;
            const holiday = getHolidayForDate(day.date, holidays);
            const dayEvents = getEventsForDate(day.date, events);
            const isToday_ = isToday(day.date);
            
            return (
              <motion.div
                key={day.date.toISOString()}
                variants={dayVariants}
                initial="initial"
                animate={isSelected ? "selected" : "animate"}
                className={cn(
                  "p-1 relative min-h-[80px] border rounded-md flex flex-col",
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  isSelected ? "ring-2 ring-kare-500" : "",
                  !day.isCurrentMonth ? "text-gray-400" : "",
                  isToday_ ? "border-kare-500" : "border-gray-200"
                )}
                onClick={() => handleDateSelect(day.date)}
              >
                <div className="flex justify-between items-start">
                  <span className={cn(
                    "text-sm font-medium",
                    isToday_ ? "bg-kare-500 text-white rounded-full w-6 h-6 flex items-center justify-center" : "",
                    day.date.getDay() === 0 && !isToday_ ? "text-red-500" : ""
                  )}>
                    {format(day.date, 'd')}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1 mt-1 text-xs overflow-hidden">
                  {/* Holiday Indicator */}
                  {holiday && state.holidaysVisible && (
                    <div 
                      className="px-1 py-0.5 rounded truncate text-xs font-medium"
                      style={{ backgroundColor: `${holiday.color}20`, color: holiday.color }}
                    >
                      {holiday.name}
                    </div>
                  )}
                  
                  {/* Events */}
                  {dayEvents.length > 0 && (
                    <>
                      {dayEvents.map(event => (
                        <div 
                          key={event.id}
                          className={cn(
                            "px-1 py-0.5 rounded truncate text-xs font-medium",
                            event.type === "medical" ? "bg-green-100 text-green-800" : 
                            event.type === "info" ? "bg-blue-100 text-blue-800" : 
                            "bg-gray-100 text-gray-800"
                          )}
                        >
                          {event.title}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Event Details Panel */}
      {state.selectedDate && (
        <div className="mt-6 p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-gray-800 mb-2">
            {format(state.selectedDate, 'MMMM d, yyyy')}
          </h3>
          
          {/* Holiday information */}
          {state.holidaysVisible && getHolidayForDate(state.selectedDate, holidays) && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700">Holiday</h4>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                <p className="font-medium">{getHolidayForDate(state.selectedDate, holidays)?.name}</p>
                {getHolidayForDate(state.selectedDate, holidays)?.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {getHolidayForDate(state.selectedDate, holidays)?.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Type: {getHolidayForDate(state.selectedDate, holidays)?.type}
                </p>
              </div>
            </div>
          )}
          
          {/* Events information */}
          {getEventsForDate(state.selectedDate, events).length > 0 ? (
            <div>
              <h4 className="text-sm font-medium text-gray-700">Events</h4>
              <div className="mt-1 space-y-2">
                {getEventsForDate(state.selectedDate, events).map(event => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-md">
                    <p className="font-medium">{event.title}</p>
                    {event.description && (
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Type: {event.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No events for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar; 