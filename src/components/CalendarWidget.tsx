import React, { useState, useEffect } from 'react';
import { 
  Holiday,
  CalendarEvent,
  getKoreanHolidays, 
  getEvents, 
  getHolidayForDate, 
  getEventsForDate,
  addEvent
} from '../services/calendarService';

const CalendarWidget: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'event' as 'appointment' | 'reminder' | 'event',
    description: '',
  });
  
  // Get current month name and year
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  
  // Load holidays and events
  useEffect(() => {
    // Get Korean holidays for current year
    setHolidays(getKoreanHolidays(currentMonth.getFullYear()));
    
    // Get events (would be fetched from a database in a real application)
    setEvents(getEvents());
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
    setShowAddEventForm(false);
  };
  
  // Handle next month
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
    setShowEventDetails(false);
    setShowAddEventForm(false);
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selectedDate);
    setShowEventDetails(true);
    setShowAddEventForm(false);
  };

  // Handle adding new event
  const handleAddEvent = () => {
    if (selectedDate && newEvent.title) {
      const eventToAdd = {
        ...newEvent,
        date: selectedDate
      };
      
      const createdEvent = addEvent(eventToAdd);
      setEvents([...events, createdEvent]);
      
      // Reset form
      setNewEvent({
        title: '',
        type: 'event',
        description: '',
      });
      
      setShowAddEventForm(false);
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    
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
          >
            &lt;
          </button>
          <span className="text-sm font-medium">{monthName} {year}</span>
          <button 
            onClick={handleNextMonth} 
            className="text-gray-600 hover:text-gray-900 w-6 h-6 flex items-center justify-center"
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
        {showEventDetails && selectedDate && !showAddEventForm && (
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-1">
              <div className="text-xs font-medium text-gray-700">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
              <button 
                onClick={() => setShowAddEventForm(true)} 
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Add Event
              </button>
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
        
        {/* Add Event Form */}
        {showAddEventForm && selectedDate && (
          <div className="mt-auto bg-white rounded p-2">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs font-medium">
                Add Event for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <button 
                onClick={() => setShowAddEventForm(false)}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
            
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Event Title"
                className="w-full px-2 py-1 text-xs border rounded"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
              
              <select
                aria-label="Event Type"
                className="w-full px-2 py-1 text-xs border rounded"
                value={newEvent.type}
                onChange={(e) => setNewEvent({...newEvent, type: e.target.value as 'appointment' | 'reminder' | 'event'})}
              >
                <option value="event">Event</option>
                <option value="appointment">Appointment</option>
                <option value="reminder">Reminder</option>
              </select>
              
              <textarea
                placeholder="Description (optional)"
                className="w-full px-2 py-1 text-xs border rounded"
                rows={2}
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              ></textarea>
              
              <button
                onClick={handleAddEvent}
                disabled={!newEvent.title}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 rounded disabled:opacity-50"
              >
                Add Event
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarWidget; 