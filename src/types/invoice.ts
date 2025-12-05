export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

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
    { id: '1', description: 'Layanan Konsultasi', quantity: 1, price: 500000 },
    { id: '2', description: 'Desain Logo', quantity: 1, price: 1500000 },
  ],
  notes: 'Terima kasih atas kepercayaan Anda.',
  signature: '',
  bankName: '',
  bankAccountNumber: '',
  bankAccountName: '',
  termsAndConditions: '',
  primaryColor: '#5A8F7B',
  secondaryColor: '#7AB89D',
  accentColor: '#3D6B5C',
};
