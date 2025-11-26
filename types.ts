
export interface Doctor {
  id: string;
  name: string;
  designation: string;
  specialization: string;
  degrees: string;
  experience: number;
  image: string;
  languages: string[];
  availability: string;
  certifications: string[];
  reviews: Review[];
  bio: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string; // Lucide icon name mapping
  description: string;
  shortDescription: string;
  priceRange: string;
  faqs: FAQ[];
  benefits: string[];
  image: string;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  service?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Appointment {
  doctorId: string;
  serviceId: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
}
