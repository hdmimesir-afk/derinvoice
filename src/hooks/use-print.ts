import { useCallback, RefObject } from 'react';

export function usePrint(contentRef: RefObject<HTMLElement>) {
  const handlePrint = useCallback(() => {
    if (!contentRef.current) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Popup diblokir. Silakan izinkan popup untuk mencetak invoice.');
      return;
    }

    const content = contentRef.current.innerHTML;
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
        } catch {
          return '';
        }
      })
      .join('\n');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            ${styles}
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: 'Poppins', system-ui, sans-serif;
            }
            .invoice-preview {
              width: 210mm;
              min-height: 297mm;
              padding: 20mm;
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  }, [contentRef]);

  return { handlePrint };
}
