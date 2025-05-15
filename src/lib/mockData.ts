import { Post, NewsItem, Category } from '@/lib/sanity';
import { TypedObject } from '@portabletext/types';

// Mock blog posts for fallback when Sanity API is unavailable
export const mockPosts: Post[] = [
  {
    _id: 'mock-1',
    title: 'Healthcare in Korea: A Comprehensive Guide for Foreigners',
    slug: { current: 'healthcare-korea-guide' },
    publishedAt: new Date().toISOString(),
    summary: 'Everything you need to know about navigating the Korean healthcare system as a foreigner.',
    readingTime: '8 min read',
    categories: [{ name: 'Healthcare' }, { name: 'Guides' }],
    body: [] as TypedObject[],
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
        _type: 'reference'
      },
      alt: 'Korean hospital entrance'
    }
  },
  {
    _id: 'mock-2',
    title: 'Finding English-Speaking Doctors in Seoul',
    slug: { current: 'english-speaking-doctors-seoul' },
    publishedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    summary: 'A comprehensive directory of clinics and hospitals with English-speaking medical staff in Seoul.',
    readingTime: '5 min read',
    categories: [{ name: 'Healthcare' }, { name: 'Seoul' }],
    body: [] as TypedObject[],
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
        _type: 'reference'
      },
      alt: 'Doctor with patient'
    }
  },
  {
    _id: 'mock-3',
    title: 'Korean National Health Insurance: A Guide for Expats',
    slug: { current: 'korean-health-insurance-guide' },
    publishedAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    summary: 'How to navigate the Korean National Health Insurance system as a foreign resident.',
    readingTime: '10 min read',
    categories: [{ name: 'Insurance' }],
    body: [] as TypedObject[],
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
        _type: 'reference'
      },
      alt: 'Health insurance card'
    }
  },
  {
    _id: 'mock-4',
    title: 'Common Medications in Korea: What to Know',
    slug: { current: 'common-medications-korea' },
    publishedAt: new Date(Date.now() - 3600000 * 24 * 14).toISOString(),
    summary: 'Understanding Korean medication names, availability, and how to get prescriptions filled.',
    readingTime: '7 min read',
    categories: [{ name: 'Medications' }, { name: 'Pharmacy' }],
    body: [] as TypedObject[],
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
        _type: 'reference'
      },
      alt: 'Korean pharmacy medications'
    }
  },
  {
    _id: 'mock-5',
    title: 'Mental Health Resources for Expats in Korea',
    slug: { current: 'mental-health-resources-korea' },
    publishedAt: new Date(Date.now() - 3600000 * 24 * 21).toISOString(),
    summary: 'Finding mental health support and counseling services in Korea as a foreign resident.',
    readingTime: '9 min read',
    categories: [{ name: 'Mental Health' }, { name: 'Wellness' }],
    body: [] as TypedObject[],
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
        _type: 'reference'
      },
      alt: 'Therapy session'
    }
  }
];

// Mock news items
export const mockNewsItems: NewsItem[] = [
  {
    _id: 'news-1',
    title: 'Korea Expands Vaccination Program to Include Foreign Residents',
    publishedAt: new Date().toISOString()
  },
  {
    _id: 'news-2',
    title: 'New Multilingual Healthcare App Launched for Foreigners',
    publishedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  },
  {
    _id: 'news-3',
    title: 'Government Announces Improved Health Insurance Coverage for International Students',
    publishedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString()
  }
];

// Mock categories for bulletin board
export const mockCategories: Category[] = [
  {
    _id: 'cat-1',
    name: 'Hospitals & Clinics',
    icon: 'hospital',
    description: 'Information about hospitals and clinics in Korea',
    items: [
      {
        _id: 'item-1',
        title: 'Recommended hospitals with English-speaking staff',
        description: 'A list of hospitals where English is spoken',
        tags: ['Seoul', 'English', 'International']
      },
      {
        _id: 'item-2',
        title: 'Finding specialists in Korea',
        description: 'How to locate specialized doctors for specific conditions',
        tags: ['Specialists', 'Referrals']
      }
    ]
  },
  {
    _id: 'cat-2',
    name: 'Medication & Pharmacy',
    icon: 'pill',
    description: 'Information about medications and pharmacies',
    items: [
      {
        _id: 'item-3',
        title: 'Common medication translations',
        description: 'Korean names for common over-the-counter medications',
        tags: ['Translations', 'OTC']
      },
      {
        _id: 'item-4',
        title: '24-hour pharmacies in major cities',
        description: 'Where to find pharmacies that are open all night',
        tags: ['Emergency', '24-hour']
      }
    ]
  }
]; 