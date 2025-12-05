import { useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderUploaderProps {
  headerImage?: string;
  onHeaderChange: (image: string | undefined) => void;
}

const HeaderUploader = ({ headerImage, onHeaderChange }: HeaderUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onHeaderChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onHeaderChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2 md:space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs md:text-base font-bold text-slate-950">Header Invoice</h3>
        {headerImage && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-6 md:h-8 px-2 text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Hapus
          </Button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {headerImage ? (
        <div className="relative rounded-lg overflow-hidden border-2 border-slate-200">
          <img
            src={headerImage}
            alt="Header Preview"
            className="w-full h-auto object-cover"
          />
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-lg p-4 md:p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#ccff00] hover:bg-[#ccff00]/5 transition-all"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2 md:mb-3">
            <Image className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
          </div>
          <p className="text-xs md:text-sm font-medium text-slate-600 text-center">
            Klik untuk upload header
          </p>
          <p className="text-[10px] md:text-xs text-slate-400 mt-1">
            PNG, JPG hingga 5MB
          </p>
        </div>
      )}
    </div>
  );
};

export default HeaderUploader;
