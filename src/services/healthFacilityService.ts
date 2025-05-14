import * as XLSX from 'xlsx';

export interface Hospital {
  id: string;
  name: string;
  nameEn?: string;
  address: string;
  addressEn?: string;
  phone: string;
  specialties?: string[];
  englishAvailable?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  openingHours?: {
    weekdays?: string;
    saturday?: string;
    sunday?: string;
    holidays?: string;
  };
  website?: string;
  description?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  nameEn?: string;
  address: string;
  addressEn?: string;
  phone: string;
  englishAvailable?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  openingHours?: {
    weekdays?: string;
    saturday?: string;
    sunday?: string;
    holidays?: string;
  };
  website?: string;
  description?: string;
}

// Simulated data - in production, this would be replaced with actual data processing from Excel files
const hospitals: Hospital[] = [
  {
    id: '1',
    name: '서울대학교병원',
    nameEn: 'Seoul National University Hospital',
    address: '서울특별시 종로구 대학로 101',
    addressEn: '101 Daehak-ro, Jongno-gu, Seoul',
    phone: '1588-5700',
    specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Neurology'],
    englishAvailable: true,
    coordinates: {
      lat: 37.579617,
      lng: 126.998655
    },
    openingHours: {
      weekdays: '9:00-17:30',
      saturday: '9:00-13:00',
      sunday: 'Closed',
      holidays: 'Closed'
    },
    website: 'https://www.snuh.org/global/en/main.do',
    description: 'One of Korea\'s leading hospitals with English-speaking staff available.'
  },
  {
    id: '2',
    name: '연세대학교 세브란스병원',
    nameEn: 'Yonsei University Severance Hospital',
    address: '서울특별시 서대문구 연세로 50-1',
    addressEn: '50-1 Yonsei-ro, Seodaemun-gu, Seoul',
    phone: '1599-1004',
    specialties: ['General Medicine', 'Surgery', 'Cardiology', 'Oncology'],
    englishAvailable: true,
    coordinates: {
      lat: 37.562360,
      lng: 126.939770
    },
    openingHours: {
      weekdays: '8:30-17:30',
      saturday: '8:30-12:30',
      sunday: 'Closed',
      holidays: 'Closed'
    },
    website: 'https://www.yuhs.or.kr/en/',
    description: 'International Health Care Center available with English-speaking staff.'
  },
  {
    id: '3',
    name: '삼성서울병원',
    nameEn: 'Samsung Medical Center',
    address: '서울특별시 강남구 일원로 81',
    addressEn: '81 Irwon-ro, Gangnam-gu, Seoul',
    phone: '02-3410-2114',
    specialties: ['General Medicine', 'Surgery', 'Oncology', 'Cardiology'],
    englishAvailable: true,
    coordinates: {
      lat: 37.488325,
      lng: 127.085552
    },
    openingHours: {
      weekdays: '8:30-17:30',
      saturday: '8:30-12:30',
      sunday: 'Closed',
      holidays: 'Closed'
    },
    website: 'https://www.samsunghospital.com/gb/language/english/main/index.do',
    description: 'International Health Services available with English-speaking staff.'
  }
];

const pharmacies: Pharmacy[] = [
  {
    id: '1',
    name: '종로약국',
    nameEn: 'Jongno Pharmacy',
    address: '서울특별시 종로구 종로 123',
    addressEn: '123 Jongno, Jongno-gu, Seoul',
    phone: '02-123-4567',
    englishAvailable: true,
    openingHours: {
      weekdays: '9:00-21:00',
      saturday: '9:00-18:00',
      sunday: '10:00-17:00',
      holidays: '10:00-17:00'
    }
  },
  {
    id: '2',
    name: '명동약국',
    nameEn: 'Myeongdong Pharmacy',
    address: '서울특별시 중구 명동길 50',
    addressEn: '50 Myeongdong-gil, Jung-gu, Seoul',
    phone: '02-555-6789',
    englishAvailable: true,
    openingHours: {
      weekdays: '8:30-22:00',
      saturday: '9:00-20:00',
      sunday: '10:00-18:00',
      holidays: '10:00-18:00'
    }
  },
  {
    id: '3',
    name: '강남약국',
    nameEn: 'Gangnam Pharmacy',
    address: '서울특별시 강남구 강남대로 390',
    addressEn: '390 Gangnam-daero, Gangnam-gu, Seoul',
    phone: '02-888-9999',
    englishAvailable: true,
    openingHours: {
      weekdays: '9:00-23:00',
      saturday: '9:00-22:00',
      sunday: '10:00-20:00',
      holidays: '10:00-18:00'
    }
  }
];

export const getHospitals = (): Promise<Hospital[]> => {
  // In a real implementation, this would read and parse the Excel files
  return Promise.resolve(hospitals);
};

export const getPharmacies = (): Promise<Pharmacy[]> => {
  // In a real implementation, this would read and parse the Excel files
  return Promise.resolve(pharmacies);
};

export const getHospitalById = (id: string): Promise<Hospital | undefined> => {
  const hospital = hospitals.find(h => h.id === id);
  return Promise.resolve(hospital);
};

export const getPharmacyById = (id: string): Promise<Pharmacy | undefined> => {
  const pharmacy = pharmacies.find(p => p.id === id);
  return Promise.resolve(pharmacy);
};

// In a production environment, these functions would parse the Excel files
// For now, we're using the sample data above
export const loadExcelData = () => {
  // Implementation would load and parse Excel files from the clinics and pharmacies directory
  // For demonstration purposes, we're using the sample data
  console.log('Loading Excel data...');
}; 