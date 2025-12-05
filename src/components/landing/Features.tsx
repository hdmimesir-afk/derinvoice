import { Palette, Zap, Download, Shield, Layout, Users } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Warna Custom',
    description: 'Sesuaikan warna invoice dengan brand bisnis Anda.',
  },
  {
    icon: Zap,
    title: 'Super Cepat',
    description: 'Isi form dan invoice Anda siap dalam hitungan detik.',
  },
  {
    icon: Download,
    title: 'PDF & PNG',
    description: 'Export invoice ke format PDF atau PNG berkualitas tinggi.',
  },
  {
    icon: Shield,
    title: 'Aman & Privat',
    description: 'Data diproses lokal di browser. Tidak ada data ke server.',
  },
  {
    icon: Layout,
    title: 'Preview Real-time',
    description: 'Lihat perubahan invoice secara langsung saat mengetik.',
  },
  {
    icon: Users,
    title: 'Untuk Semua Bisnis',
    description: 'Cocok untuk freelancer, UMKM, hingga perusahaan.',
  },
];

const Features = () => {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden font-poppins">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <span className="bg-slate-950 text-[#ccff00] px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider border border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              Kenapa Kami?
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-6 leading-tight text-slate-950 px-4">
            Fitur Lengkap untuk{' '}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-lime-600">Professional</span>
              <span className="absolute bottom-0 md:bottom-1 left-0 w-full h-2 md:h-3 bg-[#ccff00]/50 -z-0 -rotate-1"></span>
            </span>
          </h2>
          <p className="text-slate-600 font-medium text-sm md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Didesain khusus untuk freelancer dan pemilik bisnis yang butuh kecepatan tanpa ribet.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="group relative">
              <div className="h-full bg-slate-950 p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-start relative overflow-hidden">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl bg-[#ccff00] flex items-center justify-center mb-3 md:mb-4 shadow-md">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-slate-950 stroke-[2.5]" />
                </div>
                <h3 className="text-xs md:text-base lg:text-lg font-bold mb-1 md:mb-2 text-white leading-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-[10px] md:text-sm font-medium leading-relaxed line-clamp-3 md:line-clamp-none">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
