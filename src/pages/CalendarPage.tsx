import React from 'react';
import Calendar from '@/components/Calendar';

const CalendarPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-kare-800 mb-2">Korean Health Calendar</h1>
        <p className="text-gray-600">
          Track Korean holidays and health-related events throughout the year.
        </p>
      </div>
      
      <Calendar />
      
      <div className="mt-10 bg-kare-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-kare-800 mb-3">About Korean Holidays</h2>
        <p className="text-gray-700 mb-4">
          Korea observes both public holidays and traditional holidays. Public holidays are mandated by law, 
          while traditional holidays are based on the lunar calendar and have cultural significance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-kare-700 mb-2">Major Public Holidays</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>New Year's Day (January 1)</li>
              <li>Independence Movement Day (March 1)</li>
              <li>Children's Day (May 5)</li>
              <li>Memorial Day (June 6)</li>
              <li>Liberation Day (August 15)</li>
              <li>National Foundation Day (October 3)</li>
              <li>Hangeul Day (October 9)</li>
              <li>Christmas Day (December 25)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-kare-700 mb-2">Traditional Holidays</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Seollal (Lunar New Year) - three days</li>
              <li>Buddha's Birthday</li>
              <li>Chuseok (Korean Thanksgiving) - three days</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">
              Note: Traditional holiday dates vary each year as they follow the lunar calendar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage; 