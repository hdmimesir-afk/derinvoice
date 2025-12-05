import { Plus, Trash2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { InvoiceData, InvoiceItem } from '@/types/invoice';
import { toast } from 'sonner';
import { useRef, useState } from 'react';

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

const InvoiceForm = ({ data, onChange }: InvoiceFormProps) => {
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingSignature, setUploadingSignature] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof InvoiceData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = data.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, items: updatedItems });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      price: 0,
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    if (data.items.length > 1) {
      onChange({ ...data, items: data.items.filter((item) => item.id !== id) });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'signature') => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Hanya file gambar yang diizinkan');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') {
          onChange({ ...data, companyLogo: reader.result as string });
        } else {
          onChange({ ...data, signature: reader.result as string });
        }
        toast.success(`${type === 'logo' ? 'Logo' : 'Tanda tangan'} berhasil diupload!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (type: 'logo' | 'signature') => {
    if (type === 'logo') {
      onChange({ ...data, companyLogo: '' });
    } else {
      onChange({ ...data, signature: '' });
    }
  };

  return (
    <div className="space-y-3 md:space-y-6">
      {/* Company Info */}
      <Card className="shadow-soft border border-slate-200">
        <CardHeader className="pb-2 md:pb-4 px-3 md:px-6 pt-3 md:pt-6">
          <CardTitle className="text-sm md:text-lg font-semibold flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ccff00]" />
            Data Perusahaan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 px-3 md:px-6 pb-3 md:pb-6">
          {/* Logo Upload */}
          <div className="flex items-center gap-3">
            {data.companyLogo ? (
              <div className="relative group">
                <img
                  src={data.companyLogo}
                  alt="Logo"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-lg border border-border bg-muted p-1"
                />
                <button
                  onClick={() => removeFile('logo')}
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => logoInputRef.current?.click()}
                className="w-12 h-12 md:w-16 md:h-16 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#ccff00] hover:bg-[#ccff00]/5 transition-all"
              >
                <Image className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
              </div>
            )}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'logo')}
              className="hidden"
            />
            <div className="flex-1">
              <Label className="text-xs md:text-sm text-slate-600">Logo Perusahaan</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoInputRef.current?.click()}
                disabled={uploadingLogo}
                className="mt-1 h-7 md:h-8 text-xs"
              >
                {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
              </Button>
            </div>
          </div>

          <div className="space-y-2 md:space-y-3">
            <div>
              <Label htmlFor="companyName" className="text-xs md:text-sm">Nama Perusahaan</Label>
              <Input
                id="companyName"
                value={data.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="PT. Nama Perusahaan"
                className="h-8 md:h-10 text-xs md:text-sm mt-1"
              />
            </div>
            <div>
              <Label htmlFor="companyAddress" className="text-xs md:text-sm">Alamat</Label>
              <Input
                id="companyAddress"
                value={data.companyAddress}
                onChange={(e) => handleChange('companyAddress', e.target.value)}
                placeholder="Alamat lengkap"
                className="h-8 md:h-10 text-xs md:text-sm mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="companyPhone" className="text-xs md:text-sm">Telepon</Label>
                <Input
                  id="companyPhone"
                  value={data.companyPhone}
                  onChange={(e) => handleChange('companyPhone', e.target.value)}
                  placeholder="+62 xxx"
                  className="h-8 md:h-10 text-xs md:text-sm mt-1"
                />
              </div>
              <div>
                <Label htmlFor="companyEmail" className="text-xs md:text-sm">Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={data.companyEmail}
                  onChange={(e) => handleChange('companyEmail', e.target.value)}
                  placeholder="email@company.com"
                  className="h-8 md:h-10 text-xs md:text-sm mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Info */}
      <Card className="shadow-soft border border-slate-200">
        <CardHeader className="pb-2 md:pb-4 px-3 md:px-6 pt-3 md:pt-6">
          <CardTitle className="text-sm md:text-lg font-semibold flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-lime-600" />
            Data Klien
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 md:space-y-3 px-3 md:px-6 pb-3 md:pb-6">
          <div>
            <Label htmlFor="clientName" className="text-xs md:text-sm">Nama Klien</Label>
            <Input
              id="clientName"
              value={data.clientName}
              onChange={(e) => handleChange('clientName', e.target.value)}
              placeholder="Nama klien"
              className="h-8 md:h-10 text-xs md:text-sm mt-1"
            />
          </div>
          <div>
            <Label htmlFor="clientAddress" className="text-xs md:text-sm">Alamat</Label>
            <Input
              id="clientAddress"
              value={data.clientAddress}
              onChange={(e) => handleChange('clientAddress', e.target.value)}
              placeholder="Alamat klien"
              className="h-8 md:h-10 text-xs md:text-sm mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="clientPhone" className="text-xs md:text-sm">Telepon</Label>
              <Input
                id="clientPhone"
                value={data.clientPhone}
                onChange={(e) => handleChange('clientPhone', e.target.value)}
                placeholder="+62 xxx"
                className="h-8 md:h-10 text-xs md:text-sm mt-1"
              />
            </div>
            <div>
              <Label htmlFor="clientEmail" className="text-xs md:text-sm">Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={data.clientEmail}
                onChange={(e) => handleChange('clientEmail', e.target.value)}
                placeholder="klien@email.com"
                className="h-8 md:h-10 text-xs md:text-sm mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card className="shadow-soft border border-slate-200">
        <CardHeader className="pb-2 md:pb-4 px-3 md:px-6 pt-3 md:pt-6">
          <CardTitle className="text-sm md:text-lg font-semibold flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ccff00]" />
            Detail Invoice
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="invoiceNumber" className="text-xs md:text-sm">No. Invoice</Label>
              <Input
                id="invoiceNumber"
                value={data.invoiceNumber}
                onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                placeholder="INV-001"
                className="h-8 md:h-10 text-xs md:text-sm mt-1"
              />
            </div>
            <div>
              <Label htmlFor="invoiceDate" className="text-xs md:text-sm">Tanggal</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={data.invoiceDate}
                onChange={(e) => handleChange('invoiceDate', e.target.value)}
                className="h-8 md:h-10 text-xs md:text-sm mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dueDate" className="text-xs md:text-sm">Jatuh Tempo</Label>
              <Input
                id="dueDate"
                type="date"
                value={data.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                className="h-8 md:h-10 text-xs md:text-sm mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card className="shadow-soft border border-slate-200">
        <CardHeader className="pb-2 md:pb-4 px-3 md:px-6 pt-3 md:pt-6">
          <CardTitle className="text-sm md:text-lg font-semibold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-lime-600" />
              Item Invoice
            </span>
            <Button
              size="sm"
              onClick={addItem}
              className="h-7 md:h-8 px-2 md:px-3 text-xs bg-slate-950 hover:bg-slate-800 text-white"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              Tambah
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-3 md:px-6 pb-3 md:pb-6">
          {data.items.map((item, index) => (
            <div key={item.id}>
              {index > 0 && <Separator className="my-2 md:my-3" />}
              {/* Mobile Layout */}
              <div className="md:hidden space-y-2">
                <Input
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  placeholder="Deskripsi item"
                  className="h-8 text-xs"
                />
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      placeholder="Qty"
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="flex-[2]">
                    <Input
                      type="number"
                      min="0"
                      value={item.price}
                      onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                      placeholder="Harga (Rp)"
                      className="h-8 text-xs"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    disabled={data.items.length === 1}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-12 gap-3 items-end">
                <div className="col-span-5 space-y-1">
                  <Label className="text-xs">Deskripsi</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    placeholder="Nama layanan atau produk"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <Label className="text-xs">Jumlah</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="col-span-3 space-y-1">
                  <Label className="text-xs">Harga (Rp)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    disabled={data.items.length === 1}
                    className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notes & Signature */}
      <Card className="shadow-soft border border-slate-200">
        <CardHeader className="pb-2 md:pb-4 px-3 md:px-6 pt-3 md:pt-6">
          <CardTitle className="text-sm md:text-lg font-semibold flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ccff00]" />
            Catatan & TTD
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-3 md:px-6 pb-3 md:pb-6">
          <div>
            <Label className="text-xs md:text-sm">Catatan</Label>
            <Textarea
              value={data.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Catatan tambahan (opsional)"
              rows={2}
              className="text-xs md:text-sm mt-1 resize-none"
            />
          </div>

          {/* Signature Upload */}
          <div className="flex items-center gap-3">
            {data.signature ? (
              <div className="relative group">
                <img
                  src={data.signature}
                  alt="Signature"
                  className="h-12 md:h-16 object-contain rounded-lg border border-border bg-muted p-1"
                />
                <button
                  onClick={() => removeFile('signature')}
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => signatureInputRef.current?.click()}
                className="h-12 md:h-16 px-4 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#ccff00] hover:bg-[#ccff00]/5 transition-all"
              >
                <span className="text-xs text-slate-400">Upload TTD</span>
              </div>
            )}
            <input
              ref={signatureInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'signature')}
              className="hidden"
            />
            <div className="flex-1">
              <Label className="text-xs md:text-sm text-slate-600">Tanda Tangan</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signatureInputRef.current?.click()}
                disabled={uploadingSignature}
                className="mt-1 h-7 md:h-8 text-xs"
              >
                {uploadingSignature ? 'Uploading...' : 'Upload TTD'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;
