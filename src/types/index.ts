// Загальні типи для проекту

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  language: string;
  category: string;
  startDate: string;
  image?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  photo?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type Locale = 'uk' | 'en';

