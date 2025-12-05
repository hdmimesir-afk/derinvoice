import { useCallback, RefObject } from 'react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

export function useExportImage(contentRef: RefObject<HTMLElement>) {
  const handleExportPNG = useCallback(async () => {
    if (!contentRef.current) return;

    try {
      toast.loading('Mengexport gambar...');
      
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `invoice-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast.dismiss();
      toast.success('Invoice berhasil diexport sebagai PNG!');
    } catch (error) {
      console.error('Export error:', error);
      toast.dismiss();
      toast.error('Gagal mengexport gambar');
    }
  }, [contentRef]);

  return { handleExportPNG };
}
