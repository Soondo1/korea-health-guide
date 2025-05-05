import React, { useState } from 'react';

const CalendarWidget: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Get current month name and year
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  
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
  
  // Generate calendar days
  const days = [];
  
  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-7 w-7"></div>);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = 
      new Date().getDate() === day && 
      new Date().getMonth() === currentMonth.getMonth() &&
      new Date().getFullYear() === currentMonth.getFullYear();
    
    days.push(
      <div 
        key={day} 
        className={`h-7 w-7 flex items-center justify-center text-sm rounded-full
          ${isToday ? 'bg-gray-700 text-white' : 'hover:bg-gray-300 cursor-pointer'}`}
      >
        {day}
      </div>
    );
  }
  
  // Handle previous month
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Handle next month
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  return (
    <div className="bg-gray-200 rounded h-full overflow-hidden flex flex-col">
      <div className="p-3 font-medium text-center text-gray-700 border-b border-gray-300">
        Calendar
      </div>
      
      <div className="p-3 flex-1">
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
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget; 