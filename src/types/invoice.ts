export interface InvoiceItem {
  id: string;
  description: string;
  subDescription: string; // Date range or additional info
  details: string; // Package includes or item details (bullet points)
  quantity: number;
  price: number;
}

export type Language = 'id' | 'en';

export interface InvoiceData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyLogo?: string;
  headerImage?: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  notes: string;
  signature?: string;
  // Bank account info
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  // Terms and conditions
  termsAndConditions: string;
  // Custom color settings
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  // Language
  language: Language;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  style: 'modern' | 'classic' | 'creative' | 'custom';
}

export const defaultInvoiceData: InvoiceData = {
  companyName: 'PT. Perusahaan Anda',
  companyAddress: 'Jl. Contoh No. 123, Jakarta',
  companyPhone: '+62 812 3456 7890',
  companyEmail: 'info@perusahaan.com',
  companyLogo: '',
  clientName: 'Nama Klien',
  clientAddress: 'Alamat Klien',
  clientPhone: '+62 821 9876 5432',
  clientEmail: 'klien@email.com',
  invoiceNumber: 'INV-001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  items: [
    { 
      id: '1', 
      description: 'Layanan Konsultasi', 
      subDescription: '1 - 7 Desember 2024',
      details: '- Konsultasi bisnis\n- Analisis kebutuhan\n- Rekomendasi solusi',
      quantity: 1, 
      price: 500000 
    },
  ],
  notes: 'Terima kasih atas kepercayaan Anda.',
  signature: '',
  bankName: '',
  bankAccountNumber: '',
  bankAccountName: '',
  termsAndConditions: '',
  primaryColor: '#8B1E3F',
  secondaryColor: '#D4A5A5',
  accentColor: '#6B1530',
  language: 'id',
};
