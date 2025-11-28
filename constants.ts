
import { Doctor, Service, Review, FAQ } from './types';
import { 
  Stethoscope, Smile, ShieldCheck, Zap, Activity, Heart, Clock, User
} from 'lucide-react';

export const CLINIC_ADDRESS = "123 Galaxy Tower, Stardust Lane, Cyber City, Hyderabad, 500081";
export const CLINIC_PHONE = "+91 7993051031";
export const CLINIC_EMAIL = "infinitesai3@gmail.com";

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-sharma',
    name: 'Dr. Ananya Sharma',
    designation: 'Senior Orthodontist',
    specialization: 'Orthodontics & Dentofacial Orthopedics',
    degrees: 'BDS, MDS (Osmania University)',
    experience: 12,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    languages: ['English', 'Telugu', 'Hindi'],
    availability: 'Mon-Sat: 10AM - 2PM',
    certifications: ['Invisalign Certified Provider', 'Member of Indian Orthodontic Society'],
    bio: 'Dr. Ananya Sharma is a highly skilled Orthodontist with over a decade of experience in creating beautiful smiles. Specializing in both traditional braces and modern clear aligners, she is dedicated to providing personalized care that boosts patient confidence. Her gentle approach makes her a favorite among teenagers and adults alike.',
    reviews: [
      { id: 'r1', patientName: 'Rajesh K.', rating: 5, comment: 'Dr. Ananya is amazing with braces. My son loves coming here.', date: '2023-10-12' },
      { id: 'r2', patientName: 'Sneha P.', rating: 5, comment: 'Very professional and explains everything clearly.', date: '2023-11-05' }
    ]
  },
  {
    id: 'dr-reddy',
    name: 'Dr. Arjun Reddy',
    designation: 'Chief Implantologist',
    specialization: 'Oral Implantology',
    degrees: 'BDS, MDS, FICOI (USA)',
    experience: 15,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
    languages: ['English', 'Telugu', 'Kannada'],
    availability: 'Tue-Sun: 11AM - 8PM',
    certifications: ['Fellow of Intl Congress of Oral Implantologists', 'Nobel Biocare Certified'],
    bio: 'Dr. Arjun Reddy is a renowned Implantologist known for his precision and expertise in complex full-mouth rehabilitation. Having trained in the USA, he brings international standards of implant dentistry to Hyderabad. He uses the latest 3D guided surgery techniques for painless and accurate results.',
    reviews: [
      { id: 'r3', patientName: 'Vikram S.', rating: 5, comment: 'Painless implant surgery. Highly recommended.', date: '2023-09-20' }
    ]
  },
  {
    id: 'dr-priya',
    name: 'Dr. Priya Desai',
    designation: 'Pediatric Dentist',
    specialization: 'Pedodontics',
    degrees: 'BDS, MDS',
    experience: 8,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop',
    languages: ['English', 'Hindi', 'Tamil'],
    availability: 'Mon-Sat: 4PM - 9PM',
    certifications: ['Child Psychology in Dentistry', 'Sedation Dentistry Certified'],
    bio: 'Dr. Priya Desai specializes in oral health care for infants, children, and adolescents. With a warm and friendly demeanor, she ensures that every child has a positive dental experience. She focuses on preventive care, habit breaking, and painless treatment modalities for kids.',
    reviews: [
      { id: 'r4', patientName: 'Meena L.', rating: 5, comment: 'Best doctor for kids in Kondapur!', date: '2023-12-01' }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'root-canal',
    title: 'Root Canal Treatment',
    icon: 'Activity',
    shortDescription: 'Save your natural tooth with painless advanced RCT.',
    description: 'Our Root Canal Treatment is performed using rotary endodontics and microscopic magnification for precision. We focus on saving the natural tooth structure while ensuring a pain-free experience.',
    priceRange: '₹3,500 - ₹7,000',
    benefits: ['Relieves tooth pain immediately', 'Saves natural tooth', 'Prevents spread of infection'],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop', // Dentist working with microscope/tools
    faqs: [
      { question: 'Is it painful?', answer: 'We use local anesthesia, making the procedure virtually painless.' },
      { question: 'How many visits?', answer: 'Most cases are completed in a single sitting.' }
    ]
  },
  {
    id: 'aligners',
    title: 'Aligners & Braces',
    icon: 'Smile',
    shortDescription: 'Invisible aligners and metal/ceramic braces for a perfect smile.',
    description: 'Straighten your teeth with the world\'s best clear aligners or traditional braces. We offer Invisalign, Flash, and customized orthodontic solutions.',
    priceRange: '₹30,000 - ₹2,50,000',
    benefits: ['Improved confidence', 'Better oral hygiene', 'Corrects bite issues'],
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop', // Smile/Braces
    faqs: [
      { question: 'Are aligners visible?', answer: 'They are virtually invisible.' },
      { question: 'Duration of treatment?', answer: 'Varies from 6 to 18 months depending on complexity.' }
    ]
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    icon: 'ShieldCheck',
    shortDescription: 'Permanent solution for missing teeth.',
    description: 'Replace missing teeth with titanium implants that look and feel like natural teeth. We use premium international brands.',
    priceRange: '₹25,000 - ₹45,000 per unit',
    benefits: ['Lifetime durability', 'Prevents bone loss', 'Natural look and feel'],
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=800&auto=format&fit=crop', // Dental Model
    faqs: [
      { question: 'Is surgery safe?', answer: 'Yes, it is a minor surgical procedure with high success rates.' }
    ]
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    icon: 'Zap',
    shortDescription: 'Brighten your smile in just 45 minutes.',
    description: 'Professional laser teeth whitening to remove stains from coffee, tea, or smoking.',
    priceRange: '₹8,000 - ₹15,000',
    benefits: ['Instant results', 'Safe for enamel', 'Boosts confidence'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop', // Bright Smile
    faqs: [
      { question: 'Does it damage enamel?', answer: 'No, professional whitening is safe for enamel.' }
    ]
  }
];

export const GENERAL_FAQS: FAQ[] = [
  { question: "Do you accept insurance?", answer: "Yes, we are empanelled with most major insurance providers." },
  { question: "Is parking available?", answer: "Yes, we have ample parking space in front of Harsha Toyota." },
  { question: "Do you handle emergencies?", answer: "We have a dedicated team for dental emergencies available during working hours." }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Suresh Reddy",
    location: "Kondapur",
    comment: "The best dental experience I've ever had. Dr. Sharma was incredibly gentle and the results of my Invisalign treatment are fantastic.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    name: "Priya Malhotra",
    location: "Gachibowli",
    comment: "I took my 5-year-old for a checkup. The staff made him feel so comfortable that he actually enjoyed the dentist visit!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Ahmed Khan",
    location: "Miyapur",
    comment: "State of the art facility. I got two implants done by Dr. Reddy and the recovery was smooth. Highly recommend Galaxy Dental.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=33"
  },
  {
    id: 4,
    name: "Emily Clark",
    location: "Hitech City",
    comment: "Very transparent pricing and excellent hygiene standards. I felt very safe during my root canal treatment.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=29"
  }
];
