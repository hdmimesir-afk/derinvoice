import { FileText, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-8 md:py-12 font-poppins">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#ccff00] flex items-center justify-center">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-slate-950" />
            </div>
            <span className="font-bold text-base md:text-xl">Simple Invoice Studio</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 text-xs md:text-sm">
            <span>Dibuat dengan</span>
            <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 fill-red-500" />
            <span>di Indonesia • {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <a href="#" className="text-slate-400 hover:text-[#ccff00] transition-colors text-xs md:text-sm">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-slate-400 hover:text-[#ccff00] transition-colors text-xs md:text-sm">
              Syarat Penggunaan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
