import { forwardRef } from 'react';
import { InvoiceData } from '@/types/invoice';

interface InvoicePreviewProps {
  data: InvoiceData;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ data }, ref) => {
    const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const { primaryColor, secondaryColor, accentColor } = data;

    return (
      <div
        ref={ref}
        className="invoice-preview bg-white text-gray-900 shadow-medium rounded-lg overflow-hidden"
        style={{
          width: '210mm',
          minHeight: '297mm',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Custom Header Image */}
        {data.headerImage && (
          <div className="w-full">
            <img
              src={data.headerImage}
              alt="Invoice Header"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Header - Only show if no custom header image */}
        {!data.headerImage && (
          <div
            className="p-8"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              color: 'white',
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                {data.companyLogo && (
                  <img
                    src={data.companyLogo}
                    alt="Company Logo"
                    className="w-16 h-16 object-contain rounded"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-bold mb-2">{data.companyName}</h1>
                  <p className="text-sm opacity-90">{data.companyAddress}</p>
                  <p className="text-sm opacity-90">{data.companyPhone}</p>
                  <p className="text-sm opacity-90">{data.companyEmail}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold mb-2">INVOICE</div>
              </div>
            </div>
          </div>
        )}

        {/* Invoice Title - Show only if custom header exists */}
        {data.headerImage && (
          <div className="px-8 pt-6 pb-2">
            <div className="text-right">
              <div
                className="text-4xl font-bold"
                style={{ color: primaryColor }}
              >
                INVOICE
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-8 bg-white">
          {/* Invoice Details & Client */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 
                className="text-sm font-semibold uppercase tracking-wider mb-3"
                style={{ color: accentColor }}
              >
                Tagih Kepada
              </h3>
              <p className="font-semibold text-lg">{data.clientName}</p>
              <p className="text-gray-600 text-sm">{data.clientAddress}</p>
              <p className="text-gray-600 text-sm">{data.clientPhone}</p>
              <p className="text-gray-600 text-sm">{data.clientEmail}</p>
            </div>
            <div className="text-right">
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500">No. Invoice:</span>
                  <span className="ml-2 font-semibold">{data.invoiceNumber}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Tanggal:</span>
                  <span className="ml-2">{formatDate(data.invoiceDate)}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Jatuh Tempo:</span>
                  <span className="ml-2">{formatDate(data.dueDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: primaryColor }}>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Deskripsi</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-white">Jumlah</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-white">Harga</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-white">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    style={{ borderBottom: `1px solid ${primaryColor}20` }}
                  >
                    <td className="px-4 py-3 text-sm">{item.description || '-'}</td>
                    <td className="px-4 py-3 text-sm text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-right">{formatCurrency(item.price)}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium">
                      {formatCurrency(item.quantity * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div
                className="flex justify-between py-3 text-lg font-bold"
                style={{ color: primaryColor }}
              >
                <span>TOTAL</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {data.notes && (
            <div
              className="p-4 rounded-lg mb-8"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <h3 className="text-sm font-semibold mb-2" style={{ color: primaryColor }}>
                Catatan
              </h3>
              <p className="text-sm text-gray-600">{data.notes}</p>
            </div>
          )}

          {/* Signature */}
          {data.signature && (
            <div className="flex justify-end">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Tanda Tangan</p>
                <img
                  src={data.signature}
                  alt="Tanda Tangan"
                  className="h-20 object-contain mx-auto"
                />
                <div className="border-t border-gray-300 mt-2 pt-2 px-8">
                  <p className="text-sm font-medium">{data.companyName}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-8 py-4 text-center text-sm"
          style={{
            backgroundColor: `${primaryColor}10`,
            color: primaryColor,
          }}
        >
          Terima kasih atas kepercayaan Anda • {data.companyName}
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;
