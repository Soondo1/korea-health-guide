
import { NewsItem, Category } from '@/lib/sanity';

// Mock news items
const mockNewsItems: NewsItem[] = [
  {
    _id: '1',
    title: 'New Medical Translation Service Launched'
  },
  {
    _id: '2',
    title: 'Free Vaccination Days in Seoul'
  },
  {
    _id: '3',
    title: 'Top Hospitals Accepting Foreigners'
  },
  {
    _id: '4',
    title: 'Updated Health Insurance Guidelines for Expatriates'
  },
  {
    _id: '5',
    title: 'Mental Health Resources for International Residents'
  }
];

// Mock categories with items
const mockCategories: Category[] = [
  {
    _id: 'cat1',
    name: 'Hospital Guide',
    icon: 'hospital',
    description: 'Find information about hospitals and medical centers in Korea',
    items: [
      { _id: 'item1', title: 'International Hospitals Directory' },
      { _id: 'item2', title: 'Hospital Appointment Guide' }
    ]
  },
  {
    _id: 'cat2',
    name: 'Insurance',
    icon: 'shield',
    description: 'Everything you need to know about health insurance in Korea',
    items: [
      { _id: 'item3', title: 'National Health Insurance System' },
      { _id: 'item4', title: 'Private Insurance Options' }
    ]
  },
  {
    _id: 'cat3',
    name: 'Medical Terms',
    icon: 'book',
    description: 'Common medical terms in Korean and English',
    items: [
      { _id: 'item5', title: 'Medical Vocabulary Guide' },
      { _id: 'item6', title: 'Symptom Translation Chart' }
    ]
  },
  {
    _id: 'cat4',
    name: 'Health Checkups',
    icon: 'fileText',
    description: 'Information about health checkups and screenings',
    items: [
      { _id: 'item7', title: 'Annual Checkup Guide' },
      { _id: 'item8', title: 'Specialized Screening Programs' }
    ]
  },
  {
    _id: 'cat5',
    name: 'Appointments',
    icon: 'calendar',
    description: 'How to book and manage medical appointments',
    items: [
      { _id: 'item9', title: 'Booking System Guide' },
      { _id: 'item10', title: 'Interpreter Services' }
    ]
  }
];

export async function fetchNewsItems(): Promise<NewsItem[]> {
  // Return mock data instead of fetching from Sanity
  return Promise.resolve(mockNewsItems);
}

export async function fetchCategories(): Promise<Category[]> {
  // Return mock data instead of fetching from Sanity
  return Promise.resolve(mockCategories);
}
