// Define holiday types
export interface Holiday {
  date: Date;
  name: string;
  type: 'public' | 'cultural' | 'traditional' | 'special';
  description?: string;
  color?: string; // Color for visual representation
}

// Define fixed calendar events
export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: 'medical' | 'info' | 'system';
  description?: string;
}

// Animation states for calendar interactions
export type CalendarAnimationState = 
  | 'idle' 
  | 'month-entering' 
  | 'month-leaving'
  | 'day-selecting'
  | 'info-expanding'
  | 'info-collapsing';

export interface CalendarState {
  currentMonth: Date;
  selectedDate: Date | null;
  animationState: CalendarAnimationState;
  isAnimating: boolean;
  holidaysVisible: boolean;
  infoExpanded: boolean;
}

// Korean holidays for the current year with enhanced styling data
export const getKoreanHolidays = (year: number = new Date().getFullYear()): Holiday[] => {
  // Using zero-based month index (0 = January, 11 = December)
  const holidays: Holiday[] = [
    { date: new Date(year, 0, 1), name: "New Year's Day", type: "public", color: "#e53e3e" },
    { date: new Date(year, 2, 1), name: "Independence Movement Day", type: "public", description: "Commemorates the March 1st Movement of 1919", color: "#3182ce" },
    { date: new Date(year, 4, 5), name: "Children's Day", type: "public", color: "#38a169" },
    { date: new Date(year, 5, 6), name: "Memorial Day", type: "public", color: "#718096" },
    { date: new Date(year, 7, 15), name: "Liberation Day", type: "public", description: "National Liberation Day of Korea", color: "#3182ce" },
    { date: new Date(year, 9, 3), name: "National Foundation Day", type: "public", color: "#3182ce" },
    { date: new Date(year, 9, 9), name: "Hangeul Day", type: "public", description: "Korean Alphabet Day", color: "#38a169" },
    { date: new Date(year, 11, 25), name: "Christmas Day", type: "public", color: "#e53e3e" },
  ];

  // 2024-specific lunar holidays
  if (year === 2024) {
    holidays.push(
      { date: new Date(2024, 1, 9), name: "Seollal Holiday", type: "traditional", description: "Korean Lunar New Year", color: "#dd6b20" },
      { date: new Date(2024, 1, 10), name: "Seollal", type: "traditional", description: "Korean Lunar New Year's Day", color: "#dd6b20" },
      { date: new Date(2024, 1, 11), name: "Seollal Holiday", type: "traditional", color: "#dd6b20" },
      { date: new Date(2024, 1, 12), name: "Seollal Holiday", type: "traditional", color: "#dd6b20" },
      { date: new Date(2024, 4, 15), name: "Buddha's Birthday", type: "public", color: "#805ad5" },
      { date: new Date(2024, 8, 17), name: "Chuseok", type: "traditional", description: "Korean Thanksgiving", color: "#dd6b20" },
      { date: new Date(2024, 8, 18), name: "Chuseok Holiday", type: "traditional", color: "#dd6b20" }
    );
  }

  // 2025-specific lunar holidays - these dates would be updated with correct lunar calendar conversions
  if (year === 2025) {
    holidays.push(
      { date: new Date(2025, 1, 28), name: "Seollal Holiday", type: "traditional", color: "#dd6b20" },
      { date: new Date(2025, 1, 29), name: "Seollal", type: "traditional", description: "Korean Lunar New Year's Day", color: "#dd6b20" },
      { date: new Date(2025, 1, 30), name: "Seollal Holiday", type: "traditional", color: "#dd6b20" },
      { date: new Date(2025, 4, 5), name: "Buddha's Birthday", type: "public", color: "#805ad5" },
      { date: new Date(2025, 9, 6), name: "Chuseok", type: "traditional", description: "Korean Thanksgiving", color: "#dd6b20" },
      { date: new Date(2025, 9, 7), name: "Chuseok Holiday", type: "traditional", color: "#dd6b20" },
      { date: new Date(2025, 9, 8), name: "Chuseok Holiday", type: "traditional", color: "#dd6b20" }
    );
  }

  return holidays;
};

// Pre-defined system events - in a real application, these would be fetched from a database
export const getSystemEvents = (): CalendarEvent[] => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  return [
    { 
      id: "sys-1", 
      date: new Date(currentYear, currentMonth, 15), 
      title: "National Health Screening Day", 
      type: "medical",
      description: "Free health screenings available at major hospitals" 
    },
    { 
      id: "sys-2", 
      date: new Date(currentYear, currentMonth, 20), 
      title: "Medical Insurance Workshop", 
      type: "info",
      description: "Learn about health insurance options for foreigners in Korea" 
    },
    {
      id: "sys-3",
      date: new Date(currentYear, currentMonth + 1, 5),
      title: "Seasonal Flu Vaccination Starts",
      type: "medical",
      description: "Flu vaccinations available at local health centers"
    }
  ];
};

// Helper function to check if a date has a holiday
export const getHolidayForDate = (date: Date, holidays: Holiday[]): Holiday | undefined => {
  return holidays.find(holiday => 
    holiday.date.getDate() === date.getDate() && 
    holiday.date.getMonth() === date.getMonth() && 
    holiday.date.getFullYear() === date.getFullYear()
  );
};

// Helper function to check if a date has events
export const getEventsForDate = (date: Date, events: CalendarEvent[]): CalendarEvent[] => {
  return events.filter(event => 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );
};

// Generate calendar month data with calculation for weeks
export const generateCalendarMonth = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Calculate previous month's days to show
  const previousMonthDays: Array<{date: Date, isCurrentMonth: boolean}> = [];
  if (startingDayOfWeek > 0) {
    const prevLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      previousMonthDays.push({
        date: new Date(year, month - 1, prevLastDay - i),
        isCurrentMonth: false
      });
    }
  }
  
  // Current month's days
  const currentMonthDays: Array<{date: Date, isCurrentMonth: boolean}> = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  // Calculate next month's days to show
  const nextMonthDays: Array<{date: Date, isCurrentMonth: boolean}> = [];
  const totalDaysShown = previousMonthDays.length + currentMonthDays.length;
  const remainingDays = 42 - totalDaysShown; // 6 rows of 7 days
  
  for (let i = 1; i <= remainingDays; i++) {
    nextMonthDays.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }
  
  // Combine all days
  return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
};

// Initialize default calendar state
export const initCalendarState = (): CalendarState => {
  const today = new Date();
  return {
    currentMonth: new Date(today.getFullYear(), today.getMonth(), 1),
    selectedDate: today,
    animationState: 'idle',
    isAnimating: false,
    holidaysVisible: true,
    infoExpanded: false
  };
};

// Animation transition helpers
export const startAnimation = (state: CalendarState, newState: CalendarAnimationState): CalendarState => {
  return {
    ...state,
    animationState: newState,
    isAnimating: true
  };
};

export const endAnimation = (state: CalendarState): CalendarState => {
  return {
    ...state,
    animationState: 'idle',
    isAnimating: false
  };
};

// Calendar navigation
export const navigateToNextMonth = (state: CalendarState): CalendarState => {
  const newMonth = new Date(state.currentMonth);
  newMonth.setMonth(newMonth.getMonth() + 1);
  
  return {
    ...state,
    currentMonth: newMonth,
    animationState: 'month-entering',
    isAnimating: true
  };
};

export const navigateToPreviousMonth = (state: CalendarState): CalendarState => {
  const newMonth = new Date(state.currentMonth);
  newMonth.setMonth(newMonth.getMonth() - 1);
  
  return {
    ...state,
    currentMonth: newMonth,
    animationState: 'month-leaving',
    isAnimating: true
  };
};

export const selectDate = (state: CalendarState, date: Date): CalendarState => {
  return {
    ...state,
    selectedDate: date,
    animationState: 'day-selecting',
    isAnimating: true
  };
};

export const toggleHolidayVisibility = (state: CalendarState): CalendarState => {
  return {
    ...state,
    holidaysVisible: !state.holidaysVisible
  };
};

export const toggleInfoPanel = (state: CalendarState): CalendarState => {
  return {
    ...state,
    infoExpanded: !state.infoExpanded,
    animationState: state.infoExpanded ? 'info-collapsing' : 'info-expanding',
    isAnimating: true
  };
}; 