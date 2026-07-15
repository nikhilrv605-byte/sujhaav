

"use client";

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#030303] border-t border-white/[0.04] pt-24 pb-12 relative overflow-hidden">
      {/* Background glow shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[150px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <span className="font-display text-3xl font-bold tracking-[0.2em] text-white">
              SUJHAAV
            </span>
            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
              An independent, AI-powered tech advisor offering bespoke recommendations without vendor bias or commercial sponsors.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Navigation
            </span>
            <div className="flex flex-col gap-2.5">
              <button onClick={() => handleScrollTo("hero")} className="text-gray-400 hover:text-white transition-colors text-left text-sm cursor-pointer">Home</button>
              <button onClick={() => handleScrollTo("advisor")} className="text-gray-400 hover:text-white transition-colors text-left text-sm cursor-pointer">AI Advisor</button>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Legal
            </span>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Use</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Contact
            </span>
            <div className="flex flex-col gap-2.5 text-sm text-gray-400 font-light">
              <p>Email: nikhilrv605@gmail.com</p>
              <p>Location: Mumbai, India</p>
              <div className="flex items-center gap-4 mt-3">
                <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.02] transition-all">
                  TW
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.02] transition-all">
                  IG
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.02] transition-all">
                  LI
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Brand Logo Big */}
        <div className="border-t border-white/[0.06] pt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-xs text-gray-600 font-light font-mono">
            &copy; {new Date().getFullYear()} SUJHAAV AI. ALL RIGHTS RESERVED.
          </p>
          <span className="text-xs text-gray-600 font-light font-mono">
            DESIGN INSPIRED BY CRAFTSMANSHIP
          </span>
        </div>
      </div>
    </footer>
  );
}
