import { InvoiceTemplate } from '@/types/invoice';

export const defaultTemplates: InvoiceTemplate[] = [
  {
    id: 'modern-green',
    name: 'Modern Green',
    primaryColor: '#5A8F7B',
    secondaryColor: '#7AB89D',
    accentColor: '#3D6B5C',
    fontFamily: 'Poppins, sans-serif',
    style: 'modern',
  },
  {
    id: 'classic-blue',
    name: 'Classic Blue',
    primaryColor: '#3B82F6',
    secondaryColor: '#60A5FA',
    accentColor: '#1D4ED8',
    fontFamily: 'Poppins, sans-serif',
    style: 'classic',
  },
  {
    id: 'creative-purple',
    name: 'Creative Purple',
    primaryColor: '#8B5CF6',
    secondaryColor: '#A78BFA',
    accentColor: '#6D28D9',
    fontFamily: 'Poppins, sans-serif',
    style: 'creative',
  },
  {
    id: 'warm-orange',
    name: 'Warm Orange',
    primaryColor: '#F97316',
    secondaryColor: '#FB923C',
    accentColor: '#EA580C',
    fontFamily: 'Poppins, sans-serif',
    style: 'modern',
  },
];
