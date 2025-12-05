import { FileEdit, Palette, Download } from 'lucide-react';

const steps = [
  {
    icon: FileEdit,
    number: '1',
    title: 'Isi Data',
    description: 'Masukkan informasi perusahaan dan klien.',
  },
  {
    icon: Palette,
    number: '2',
    title: 'Custom Warna',
    description: 'Pilih warna yang sesuai dengan brand Anda.',
  },
  {
    icon: Download,
    number: '3',
    title: 'Download',
    description: 'Download invoice PDF atau PNG berkualitas tinggi.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 md:py-24 bg-[#ccff00] relative overflow-hidden font-poppins">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-slate-950 text-[#ccff00] px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider border border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              Cara Kerja
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-4 text-slate-950 px-4">
            Hanya{' '}
            <span className="relative inline-block">
              <span className="relative z-10 italic">3 Langkah</span>
              <span className="absolute bottom-0 md:bottom-1 left-0 w-full h-2 md:h-3 bg-white/50 -z-0 -rotate-1"></span>
            </span>
          </h2>
          <p className="text-slate-800 text-sm md:text-lg font-medium max-w-2xl mx-auto px-4">
            Buat invoice profesional dalam hitungan detik
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Mobile View */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2">
            {steps.map((step) => (
              <div key={step.number} className="flex-shrink-0 w-[calc(33.33%-8px)] min-w-[100px]">
                <div className="bg-slate-950 p-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] h-full flex flex-col items-center text-center">
                  <div className="relative mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#ccff00] flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-slate-950 flex items-center justify-center font-black text-xs border border-slate-950">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xs font-bold text-white mb-0.5">{step.title}</h3>
                  <p className="text-[9px] text-slate-400 leading-tight">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-slate-950 p-6 lg:p-8 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-200">
                  <div className="relative mb-4 lg:mb-6 flex justify-center">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl bg-[#ccff00] flex items-center justify-center shadow-lg">
                      <step.icon className="w-8 h-8 lg:w-10 lg:h-10 text-slate-950 stroke-[2.5]" />
                    </div>
                    <div className="absolute -top-2 -right-2 lg:-top-3 lg:-right-3 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white text-slate-950 flex items-center justify-center font-black text-base lg:text-lg border-2 border-slate-950">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold mb-2 text-white text-center">{step.title}</h3>
                  <p className="text-slate-400 text-sm lg:text-base font-medium text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
