import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import InvoiceEditor from '@/components/invoice/InvoiceEditor';
import Footer from '@/components/landing/Footer';
import { FileText } from 'lucide-react';

const Index = () => {
  const scrollToEditor = () => {
    const editorSection = document.getElementById('editor');
    if (editorSection) {
      editorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Floating Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
        <div className="bg-slate-950/95 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#ccff00] flex items-center justify-center">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-slate-950" />
              </div>
              <span className="font-bold text-sm md:text-lg text-white hidden sm:block">Simple Invoice Studio</span>
            </div>
            <button
              onClick={scrollToEditor}
              className="px-3 md:px-5 py-2 rounded-xl bg-[#ccff00] text-slate-950 font-bold text-xs md:text-sm hover:bg-[#d4ff33] transition-all duration-300 hover:scale-105"
            >
              Buat Invoice
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero onScrollToEditor={scrollToEditor} />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Invoice Editor Section */}
      <InvoiceEditor />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
