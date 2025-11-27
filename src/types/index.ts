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
  phone?: string;
  email?: string;
  message: string;
}

export type Locale = 'ru' | 'en';

