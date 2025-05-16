import React, { useState, useEffect } from 'react';
import { 
  Holiday,
  CalendarEvent,
  getKoreanHolidays, 
  getSystemEvents, 
  getHolidayForDate, 
  getEventsForDate
} from '../services/calendarService';

const CalendarWidget: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEventDetails, setShowEventDetails] = useState(false);
  
  // Get current month name and year
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  
  // Load holidays and events
  useEffect(() => {
    // Get Korean holidays for current year
    setHolidays(getKoreanHolidays(currentMonth.getFullYear()));
    
    // Get events (system events from our service)
    setEvents(getSystemEvents());
  }, [currentMonth.getFullYear()]);
  
  // Get days in month
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  // Get day of week of first day (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  // Handle previous month
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
    setShowEventDetails(false);
  };
  
  // Handle next month
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
    setShowEventDetails(false);
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selectedDate);
    setShowEventDetails(true);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days: React.ReactNode[] = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-7 w-7"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = 
        new Date().getDate() === day && 
        new Date().getMonth() === currentMonth.getMonth() &&
        new Date().getFullYear() === currentMonth.getFullYear();
      
      const holiday = getHolidayForDate(date, holidays);
      const dayEvents = getEventsForDate(date, events);
      
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth.getMonth() && 
        selectedDate.getFullYear() === currentMonth.getFullYear();
      
      days.push(
        <div 
          key={day} 
          className={`h-7 w-7 flex items-center justify-center text-sm rounded-full relative
            ${isToday ? 'bg-gray-700 text-white' : ''}
            ${isSelected ? 'ring-2 ring-blue-500' : ''}
            ${holiday ? 'text-red-600 font-medium' : ''}
            hover:bg-gray-300 cursor-pointer
          `}
          onClick={() => handleDateSelect(day)}
        >
          {day}
          {holiday && <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></span>}
          {dayEvents.length > 0 && <span className="absolute -bottom-1 right-0 w-1 h-1 bg-blue-500 rounded-full"></span>}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="bg-gray-200 rounded h-full overflow-hidden flex flex-col">
      <div className="p-3 font-medium text-center text-gray-700 border-b border-gray-300">
        Calendar
      </div>
      
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <button 
            onClick={handlePrevMonth} 
            className="text-gray-600 hover:text-gray-900 w-6 h-6 flex items-center justify-center"
            aria-label="Previous month"
          >
            &lt;
          </button>
          <span className="text-sm font-medium">{monthName} {year}</span>
          <button 
            onClick={handleNextMonth} 
            className="text-gray-600 hover:text-gray-900 w-6 h-6 flex items-center justify-center"
            aria-label="Next month"
          >
            &gt;
          </button>
        </div>
        
        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {generateCalendarDays()}
        </div>
        
        {/* Event details section */}
        {showEventDetails && selectedDate && (
          <div className="mt-auto">
            <div className="text-xs font-medium text-gray-700 mb-1">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            
            {/* Holiday information */}
            {getHolidayForDate(selectedDate, holidays) && (
              <div className="bg-red-100 text-red-800 text-xs p-1 rounded mb-1">
                <div className="font-medium">{getHolidayForDate(selectedDate, holidays)?.name}</div>
                {getHolidayForDate(selectedDate, holidays)?.description && (
                  <div className="text-red-700 text-xs">{getHolidayForDate(selectedDate, holidays)?.description}</div>
                )}
              </div>
            )}
            
            {/* Events information */}
            {getEventsForDate(selectedDate, events).length > 0 ? (
              <div className="space-y-1">
                {getEventsForDate(selectedDate, events).map(event => (
                  <div key={event.id} className="bg-blue-100 text-blue-800 text-xs p-1 rounded">
                    <div className="font-medium">{event.title}</div>
                    {event.description && <div className="text-blue-700 text-xs">{event.description}</div>}
                  </div>
                ))}
              </div>
            ) : (!getHolidayForDate(selectedDate, holidays) && (
              <div className="text-xs text-gray-500 italic">No events scheduled</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarWidget; 