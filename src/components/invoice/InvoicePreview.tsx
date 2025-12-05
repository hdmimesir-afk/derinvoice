import { forwardRef } from 'react';
import { InvoiceData, Language } from '@/types/invoice';

interface InvoicePreviewProps {
  data: InvoiceData;
}

const translations = {
  id: {
    billTo: 'TAGIH KEPADA',
    date: 'Tanggal',
    itemDescription: 'DESKRIPSI ITEM',
    quantity: 'JUMLAH',
    price: 'HARGA',
    total: 'TOTAL',
    packageIncludes: 'Paket Include :',
    notes: 'CATATAN :',
    paymentTo: 'SILAKAN MELAKUKAN PEMBAYARAN KE :',
    termsConditions: 'Syarat & Ketentuan :',
  },
  en: {
    billTo: 'BILL TO',
    date: 'Date',
    itemDescription: 'ITEM DESCRIPTION',
    quantity: 'QUANTITY',
    price: 'PRICE',
    total: 'TOTAL',
    packageIncludes: 'Package Includes :',
    notes: 'NOTES :',
    paymentTo: 'PLEASE MAKE PAYMENT TO :',
    termsConditions: 'Terms & Conditions :',
  },
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string, language: Language) => {
  if (!dateString) return '-';
  const locale = language === 'id' ? 'id-ID' : 'en-US';
  return new Date(dateString).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ data }, ref) => {
    const total = data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const { primaryColor, secondaryColor, language } = data;
    const t = translations[language];

    return (
      <div
        ref={ref}
        className="invoice-preview bg-white text-gray-900 shadow-medium overflow-hidden"
        style={{
          width: '210mm',
          minHeight: '297mm',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Custom Header Image - No INVOICE text */}
        {data.headerImage ? (
          <div className="w-full">
            <img
              src={data.headerImage}
              alt="Invoice Header"
              className="w-full h-auto object-cover"
            />
          </div>
        ) : (
          /* Default Header with wave pattern */
          <div
            className="relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              minHeight: '180px',
            }}
          >
            {/* Decorative wave pattern */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              viewBox="0 0 800 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 C150,150 350,50 500,100 C650,150 750,50 800,100 L800,200 L0,200 Z"
                fill="rgba(255,255,255,0.1)"
              />
              <path
                d="M0,120 C200,80 400,160 600,100 C750,60 800,120 800,120 L800,200 L0,200 Z"
                fill="rgba(255,255,255,0.15)"
              />
              <path
                d="M0,150 C100,130 300,180 500,140 C700,100 800,160 800,160 L800,200 L0,200 Z"
                fill="rgba(255,255,255,0.1)"
              />
            </svg>

            {/* Header content */}
            <div className="relative z-10 p-6">
              {/* Company Logo */}
              {data.companyLogo && (
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={data.companyLogo}
                    alt="Company Logo"
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-white text-sm font-medium">{data.companyName}</span>
                </div>
              )}
              
              {/* INVOICE Title - Only show when no custom header */}
              <h1 
                className="text-6xl md:text-7xl font-black text-white tracking-tight"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
              >
                INVOICE
              </h1>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-8 py-6">
          {/* Bill To & Date */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p 
                className="text-sm font-semibold uppercase tracking-wider mb-1"
                style={{ color: primaryColor }}
              >
                {t.billTo}
              </p>
              <p className="text-lg font-bold text-gray-900">{data.clientName}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500 font-medium">{t.date} : </span>
              <span className="text-sm text-gray-700">{formatDate(data.invoiceDate, language)}</span>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            {/* Table Header */}
            <div 
              className="grid grid-cols-12 gap-4 py-3 px-4 text-sm font-semibold uppercase tracking-wider"
              style={{ 
                background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                color: 'white'
              }}
            >
              <div className="col-span-5">{t.itemDescription}</div>
              <div className="col-span-2 text-center">{t.quantity}</div>
              <div className="col-span-2 text-center">{t.price}</div>
              <div className="col-span-3 text-right">{t.total}</div>
            </div>

            {/* Table Body */}
            {data.items.map((item) => (
              <div key={item.id} className="border-b border-gray-100">
                {/* Item Row */}
                <div className="grid grid-cols-12 gap-4 py-4 px-4 items-start">
                  <div className="col-span-5">
                    <p className="font-bold text-gray-900 uppercase">{item.description || '-'}</p>
                    {item.subDescription && (
                      <p className="text-sm text-gray-500 mt-1">{item.subDescription}</p>
                    )}
                  </div>
                  <div className="col-span-2 text-center text-gray-700">{item.quantity}</div>
                  <div className="col-span-2 text-center text-gray-700">{formatCurrency(item.price)}</div>
                  <div className="col-span-3 text-right font-medium text-gray-900">
                    {formatCurrency(item.quantity * item.price)}
                  </div>
                </div>

                {/* Item Details */}
                {item.details && (
                  <div className="px-4 pb-4">
                    <p className="font-semibold text-gray-800 mb-2">{t.packageIncludes}</p>
                    <div className="text-sm text-gray-600 whitespace-pre-line">
                      {item.details}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Separator Line */}
          <div 
            className="h-1 w-full mb-6"
            style={{ background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }}
          />

          {/* Total */}
          <div className="flex justify-end mb-8">
            <div className="flex items-center gap-8">
              <span className="text-lg font-bold text-gray-700">{t.total} :</span>
              <span className="text-lg font-medium text-gray-900">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Notes & Payment Info */}
          <div className="mt-auto">
            {data.notes && (
              <div className="mb-4">
                <p className="font-bold text-gray-800 uppercase text-sm mb-2">{t.notes}</p>
                <p className="text-sm text-gray-600">{data.notes}</p>
              </div>
            )}

            {/* Bank Account Info */}
            {(data.bankName || data.bankAccountNumber || data.bankAccountName) && (
              <div className="mb-6">
                <p 
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: primaryColor }}
                >
                  {t.paymentTo}
                </p>
                <div className="text-sm text-gray-800">
                  {data.bankAccountName && <p className="font-bold">{data.bankAccountName}</p>}
                  {data.bankName && <p>{data.bankName}</p>}
                  {data.bankAccountNumber && <p>{data.bankAccountNumber}</p>}
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            {data.termsAndConditions && (
              <div className="mb-6">
                <p className="font-bold text-gray-800 uppercase text-sm mb-2">{t.termsConditions}</p>
                <p className="text-sm text-gray-600 whitespace-pre-line">{data.termsAndConditions}</p>
              </div>
            )}

            {/* Footer with company logo */}
            <div className="flex justify-between items-end pt-4 border-t border-gray-100">
              {/* Signature */}
              {data.signature && (
                <div className="text-center">
                  <img
                    src={data.signature}
                    alt="Tanda Tangan"
                    className="h-16 object-contain"
                  />
                  <div className="border-t border-gray-300 mt-2 pt-1 px-4">
                    <p className="text-xs text-gray-500">{data.companyName}</p>
                  </div>
                </div>
              )}
              
              {/* Company Logo Footer */}
              {data.companyLogo && (
                <div className="flex items-center gap-2">
                  <img
                    src={data.companyLogo}
                    alt="Company Logo"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-700">{data.companyName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;
