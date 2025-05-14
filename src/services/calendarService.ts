// Define holiday types
export interface Holiday {
  date: Date;
  name: string;
  type: 'public' | 'cultural' | 'traditional' | 'special' | 'custom';
  description?: string;
}

// Define event interface for custom events
export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: 'appointment' | 'reminder' | 'event';
  description?: string;
}

// Korean holidays for the current year
export const getKoreanHolidays = (year: number = new Date().getFullYear()): Holiday[] => {
  // Using zero-based month index (0 = January, 11 = December)
  const holidays: Holiday[] = [
    { date: new Date(year, 0, 1), name: "New Year's Day", type: "public" },
    { date: new Date(year, 2, 1), name: "Independence Movement Day", type: "public", description: "Commemorates the March 1st Movement of 1919" },
    { date: new Date(year, 4, 5), name: "Children's Day", type: "public" },
    { date: new Date(year, 5, 6), name: "Memorial Day", type: "public" },
    { date: new Date(year, 7, 15), name: "Liberation Day", type: "public", description: "National Liberation Day of Korea" },
    { date: new Date(year, 9, 3), name: "National Foundation Day", type: "public" },
    { date: new Date(year, 9, 9), name: "Hangeul Day", type: "public", description: "Korean Alphabet Day" },
    { date: new Date(year, 11, 25), name: "Christmas Day", type: "public" },
  ];

  // 2024-specific lunar holidays
  if (year === 2024) {
    holidays.push(
      { date: new Date(2024, 1, 9), name: "Seollal Holiday", type: "traditional", description: "Korean Lunar New Year" },
      { date: new Date(2024, 1, 10), name: "Seollal", type: "traditional", description: "Korean Lunar New Year's Day" },
      { date: new Date(2024, 1, 11), name: "Seollal Holiday", type: "traditional" },
      { date: new Date(2024, 1, 12), name: "Seollal Holiday", type: "traditional" },
      { date: new Date(2024, 4, 15), name: "Buddha's Birthday", type: "public" },
      { date: new Date(2024, 8, 17), name: "Chuseok", type: "traditional", description: "Korean Thanksgiving" },
      { date: new Date(2024, 8, 18), name: "Chuseok Holiday", type: "traditional" }
    );
  }

  // 2025-specific lunar holidays - these dates would be updated with correct lunar calendar conversions
  if (year === 2025) {
    holidays.push(
      { date: new Date(2025, 1, 28), name: "Seollal Holiday", type: "traditional" },
      { date: new Date(2025, 1, 29), name: "Seollal", type: "traditional", description: "Korean Lunar New Year's Day" },
      { date: new Date(2025, 1, 30), name: "Seollal Holiday", type: "traditional" },
      { date: new Date(2025, 4, 5), name: "Buddha's Birthday", type: "public" },
      { date: new Date(2025, 9, 6), name: "Chuseok", type: "traditional", description: "Korean Thanksgiving" },
      { date: new Date(2025, 9, 7), name: "Chuseok Holiday", type: "traditional" },
      { date: new Date(2025, 9, 8), name: "Chuseok Holiday", type: "traditional" }
    );
  }

  return holidays;
};

// Mock function to get events - in a real application, these would be fetched from a database
export const getEvents = (): CalendarEvent[] => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  return [
    { 
      id: "1", 
      date: new Date(currentYear, currentMonth, 15), 
      title: "Health Checkup", 
      type: "appointment",
      description: "Annual health checkup at Seoul Medical Center" 
    },
    { 
      id: "2", 
      date: new Date(currentYear, currentMonth, 20), 
      title: "Medical Workshop", 
      type: "event",
      description: "Workshop on healthcare navigation for expatriates" 
    },
    {
      id: "3",
      date: new Date(currentYear, currentMonth, 25),
      title: "Medication Reminder",
      type: "reminder",
      description: "Refill prescription at Yongsan Pharmacy"
    },
    {
      id: "4",
      date: new Date(currentYear, currentMonth + 1, 5),
      title: "Dental Appointment",
      type: "appointment",
      description: "Regular checkup at Korea Dental Clinic"
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

// Function to add a new event (mock implementation)
export const addEvent = (event: Omit<CalendarEvent, 'id'>): CalendarEvent => {
  // In a real application, this would save to a database and return the saved event
  const newEvent: CalendarEvent = {
    ...event,
    id: Math.random().toString(36).substring(2, 9) // Generate random ID
  };
  
  return newEvent;
}; 