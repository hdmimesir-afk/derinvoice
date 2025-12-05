import { useState, useRef } from 'react';
import { Download, Eye, FileEdit, ImageIcon, Save, FolderOpen, LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import HeaderUploader from './HeaderUploader';
import ColorPicker from './ColorPicker';
import TemplateSaveDialog from './TemplateSaveDialog';
import TemplateLoadDialog from './TemplateLoadDialog';
import { InvoiceData, defaultInvoiceData } from '@/types/invoice';
import { usePrint } from '@/hooks/use-print';
import { useExportImage } from '@/hooks/use-export-image';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const InvoiceEditor = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const { handlePrint } = usePrint(previewRef);
  const { handleExportPNG } = useExportImage(previewRef);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleTemplateAction = (action: 'save' | 'load') => {
    if (!user) {
      toast.error('Silakan login untuk menyimpan/memuat template');
      navigate('/auth');
      return;
    }
    if (action === 'save') setSaveDialogOpen(true);
    else setLoadDialogOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Berhasil keluar');
  };

  const handleHeaderChange = (headerImage: string | undefined) => {
    setInvoiceData({ ...invoiceData, headerImage });
  };

  const handleColorChange = (colors: { primaryColor: string; secondaryColor: string; accentColor: string }) => {
    setInvoiceData({ ...invoiceData, ...colors });
  };

  const handleLoadTemplate = (data: InvoiceData) => {
    setInvoiceData(data);
  };

  return (
    <section id="editor" className="py-8 md:py-20 bg-white relative overflow-hidden font-poppins">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem'
        }}
      />

      <div className="container mx-auto px-3 md:px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-4 md:mb-12">
          <div className="inline-block mb-2 md:mb-4">
            <span className="bg-slate-950 text-[#ccff00] px-2 md:px-4 py-0.5 md:py-1.5 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-wider border border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Editor
            </span>
          </div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-4 text-slate-950">
            Buat Invoice{' '}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-lime-600">Sekarang</span>
              <span className="absolute bottom-0 left-0 w-full h-1.5 md:h-3 bg-[#ccff00]/50 -z-0 -rotate-1"></span>
            </span>
          </h2>
          <p className="text-slate-600 text-xs md:text-base lg:text-lg max-w-2xl mx-auto hidden md:block">
            Isi form di bawah dan download invoice Anda dalam format PDF atau PNG
          </p>
        </div>

        {/* Auth & Template Actions - Mobile */}
        <div className="flex md:hidden gap-2 mb-3">
          {user ? (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleTemplateAction('load')}
                className="flex-1 h-9 text-xs"
              >
                <FolderOpen className="w-3.5 h-3.5 mr-1" />
                Muat
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleTemplateAction('save')}
                className="flex-1 h-9 text-xs"
              >
                <Save className="w-3.5 h-3.5 mr-1" />
                Simpan
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSignOut}
                className="h-9 text-xs px-2"
              >
                <LogOut className="w-3.5 h-3.5" />
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/auth')}
              className="flex-1 h-9 text-xs"
            >
              <LogIn className="w-3.5 h-3.5 mr-1" />
              Login untuk Simpan Template
            </Button>
          )}
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden gap-2 mb-3 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setMobileTab('form')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'form'
                ? 'bg-slate-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            Form
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'preview'
                ? 'bg-slate-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
        </div>

        {/* Mobile Download Buttons - Fixed at bottom */}
        <div className="fixed md:hidden bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-200 z-50 shadow-lg">
          <div className="flex gap-2">
            <Button
              size="lg"
              className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] py-3 text-sm"
              onClick={handlePrint}
            >
              <Download className="w-4 h-4 mr-2 text-[#ccff00]" />
              PDF
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 font-bold rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] py-3 text-sm"
              onClick={handleExportPNG}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              PNG
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 pb-20 md:pb-0">
          {/* Left side - Form */}
          <div className={`space-y-3 md:space-y-6 ${mobileTab === 'preview' ? 'hidden md:block' : ''}`}>
            {/* Header uploader */}
            <Card className="p-3 md:p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border-2 border-slate-200 rounded-xl md:rounded-2xl">
              <HeaderUploader
                headerImage={invoiceData.headerImage}
                onHeaderChange={handleHeaderChange}
              />
            </Card>

            {/* Color Picker */}
            <Card className="p-3 md:p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border-2 border-slate-200 rounded-xl md:rounded-2xl">
              <ColorPicker
                primaryColor={invoiceData.primaryColor}
                secondaryColor={invoiceData.secondaryColor}
                accentColor={invoiceData.accentColor}
                onColorChange={handleColorChange}
              />
            </Card>

            {/* Form */}
            <ScrollArea className="h-[calc(100vh-500px)] md:h-[400px] pr-1 md:pr-4">
              <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
            </ScrollArea>
          </div>

          {/* Right side - Preview */}
          <div className={`space-y-2 md:space-y-4 ${mobileTab === 'form' ? 'hidden md:block' : ''}`}>
            {/* Actions - Desktop only */}
            <div className="hidden md:flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Eye className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">Preview Invoice</span>
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                {user ? (
                  <>
                    <span className="text-xs text-slate-500 mr-2">{user.email}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTemplateAction('load')}
                      className="h-9"
                    >
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Muat Template
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTemplateAction('save')}
                      className="h-9"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Template
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleSignOut}
                      className="h-9"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/auth')}
                    className="h-9"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login untuk Simpan Template
                  </Button>
                )}
                <Button
                  size="lg"
                  className="bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
                  onClick={handlePrint}
                >
                  <Download className="w-4 h-4 md:w-5 md:h-5 mr-2 text-[#ccff00]" />
                  PDF
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
                  onClick={handleExportPNG}
                >
                  <ImageIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  PNG
                </Button>
              </div>
            </div>

            {/* Preview container - Optimized for mobile */}
            <div 
              className="relative bg-slate-100 rounded-xl md:rounded-2xl p-2 md:p-4 overflow-auto border-2 border-slate-200" 
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
              <div className="flex justify-center w-full">
                <div className="transform scale-[0.35] sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.55] origin-top w-full flex justify-center">
                  <InvoicePreview
                    ref={previewRef}
                    data={invoiceData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <TemplateSaveDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        invoiceData={invoiceData}
      />
      <TemplateLoadDialog
        open={loadDialogOpen}
        onOpenChange={setLoadDialogOpen}
        onLoadTemplate={handleLoadTemplate}
      />
    </section>
  );
};

export default InvoiceEditor;
