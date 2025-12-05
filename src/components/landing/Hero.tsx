import { FileText, Sparkles, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onScrollToEditor: () => void;
}

const Hero = ({ onScrollToEditor }: HeroProps) => {
  return (
    <section className="relative min-h-screen pt-24 md:pt-0 md:min-h-screen flex items-center justify-center overflow-hidden bg-[#ccff00] text-slate-950 selection:bg-slate-950 selection:text-[#ccff00]">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
      />

      {/* Floating Cards */}
      <div className="absolute top-10 left-4 md:top-20 md:left-20 hidden md:block animate-float">
        <div className="bg-slate-950 text-white p-4 rounded-xl shadow-2xl transform -rotate-6 max-w-[160px] border border-slate-900">
          <div className="h-2 w-8 bg-[#ccff00] rounded-full mb-2" />
          <p className="font-bold text-lg leading-tight">Professional Templates</p>
        </div>
      </div>

      <div className="absolute top-10 right-4 md:top-16 md:right-20 hidden md:block animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="bg-slate-950 text-white p-4 rounded-xl shadow-2xl transform rotate-12 max-w-[180px] border border-slate-900">
          <p className="font-bold text-xl leading-tight mb-1">PDF & PNG</p>
          <div className="text-xs text-slate-400">Download Instan</div>
        </div>
      </div>

      <div className="absolute bottom-20 left-10 hidden lg:block animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="relative bg-white text-slate-900 p-6 pt-8 rounded-xl shadow-xl transform -rotate-12 max-w-[200px] border-2 border-slate-900">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 shadow-md z-10" />
          <div className="flex gap-2 items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-[#ccff00] border border-slate-900" />
            <div className="w-full h-2 bg-slate-200 rounded-full" />
          </div>
          <div className="w-3/4 h-2 bg-slate-200 rounded-full mb-4" />
          <p className="text-sm font-bold text-slate-700">Auto-Calculate</p>
        </div>
      </div>

      <div className="absolute bottom-32 right-12 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
        <div className="relative bg-slate-950 text-white p-6 pt-8 rounded-xl shadow-2xl transform rotate-6 max-w-[180px] border border-slate-800">
          <div className="absolute -top-3 right-4 w-6 h-6 rounded-full bg-[#ccff00] shadow-md z-10 border-2 border-slate-900" />
          <div className="w-10 h-10 rounded-lg bg-[#ccff00] flex items-center justify-center mb-2 text-slate-950 font-black">
            Rp
          </div>
          <p className="text-sm font-bold">100% Gratis</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-2 pl-2 pr-4 py-1.5 rounded-full bg-slate-950 text-white shadow-xl mb-8 hover:scale-105 transition-transform cursor-default animate-fade-in">
            <div className="bg-[#ccff00] text-slate-950 p-1 rounded-full">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="text-sm font-bold tracking-wide">Invoice Generator Gratis</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-8 md:mb-10 tracking-tighter drop-shadow-sm text-slate-950 animate-fade-in-up px-2" style={{ animationDelay: '0.1s' }}>
            Buat Invoice <br />
            <span className="text-slate-950/80">Profesional.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-800 font-semibold max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
            Simple Invoice Studio membantu Anda membuat tagihan cantik dalam hitungan detik.
            Tanpa daftar, langsung jadi PDF atau PNG.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-in-up w-full px-4" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-slate-950 text-white hover:bg-slate-800 border-2 border-transparent px-6 md:px-8 py-5 md:py-7 text-base md:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={onScrollToEditor}
            >
              <FileText className="w-4 h-4 md:w-5 md:h-5 mr-2 text-[#ccff00]" />
              Mulai Sekarang
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent border-2 border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-[#ccff00] px-6 md:px-8 py-5 md:py-7 text-base md:text-lg font-bold rounded-xl transition-all duration-300"
              onClick={onScrollToEditor}
            >
              <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Lihat Editor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
