import { useState, useEffect } from 'react';
import { FolderOpen, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InvoiceData } from '@/types/invoice';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TemplateLoadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoadTemplate: (data: InvoiceData) => void;
}

interface SavedTemplate {
  id: string;
  name: string;
  invoice_data: InvoiceData;
  created_at: string;
}

const TemplateLoadDialog = ({ open, onOpenChange, onLoadTemplate }: TemplateLoadDialogProps) => {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('invoice_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedData = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        invoice_data: item.invoice_data as unknown as InvoiceData,
        created_at: item.created_at,
      }));
      setTemplates(mappedData);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast.error('Gagal memuat template');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('invoice_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Template berhasil dihapus');
      loadTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Gagal menghapus template');
    }
  };

  const handleLoad = (template: SavedTemplate) => {
    onLoadTemplate(template.invoice_data);
    onOpenChange(false);
    toast.success(`Template "${template.name}" berhasil dimuat`);
  };

  useEffect(() => {
    if (open) {
      loadTemplates();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[#ccff00]" />
            Muat Template
          </DialogTitle>
          <DialogDescription>
            Pilih template yang tersimpan untuk dimuat ke editor.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[400px] pr-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-950"></div>
            </div>
          ) : templates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">Belum ada template tersimpan</p>
              <p className="text-sm text-slate-400">Simpan invoice Anda sebagai template untuk digunakan kembali</p>
            </div>
          ) : (
            <div className="space-y-2">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{template.name}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(template.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLoad(template)}
                      className="h-8"
                    >
                      Muat
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(template.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateLoadDialog;
