import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { InvoiceData } from '@/types/invoice';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TemplateSaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceData: InvoiceData;
}

const TemplateSaveDialog = ({ open, onOpenChange, invoiceData }: TemplateSaveDialogProps) => {
  const [templateName, setTemplateName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!templateName.trim()) {
      toast.error('Masukkan nama template');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('invoice_templates')
        .insert([{
          name: templateName.trim(),
          invoice_data: JSON.parse(JSON.stringify(invoiceData)),
        }]);

      if (error) throw error;

      toast.success('Template berhasil disimpan!');
      setTemplateName('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Gagal menyimpan template');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5 text-[#ccff00]" />
            Simpan Template
          </DialogTitle>
          <DialogDescription>
            Simpan data invoice sebagai template untuk digunakan kembali nanti.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">Nama Template</Label>
            <Input
              id="templateName"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Contoh: Template Klien A"
              className="h-10"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-slate-950 hover:bg-slate-800"
          >
            {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSaveDialog;
