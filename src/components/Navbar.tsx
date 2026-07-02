"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active link calculation based on scroll offset
      const sections = ["hero", "statistics", "features", "about", "products", "services", "testimonials", "advisor"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Vision", target: "about" },
    { label: "Features", target: "features" },
    { label: "Curation", target: "products" },
    { label: "Testimonials", target: "testimonials" },
    { label: "Advisor", target: "advisor" },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 glass-panel border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleScrollTo("hero")}
            className="flex items-center gap-2 text-white font-display text-2xl font-bold tracking-[0.2em] hover:opacity-85 transition-opacity"
          >
            SUJHAAV
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <button
                  key={item.target}
                  onClick={() => handleScrollTo(item.target)}
                  className="relative text-sm text-gray-400 font-medium hover:text-white transition-colors cursor-pointer py-1"
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-500 to-pink-500"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleScrollTo("advisor")}
              className="relative px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase overflow-hidden hover:scale-105 transition-transform active:scale-95 duration-300"
            >
              Get Advisor
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-end gap-1.5 w-6 h-6 z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-6 h-[1.5px] bg-white transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-[5.25px]" : ""
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-white transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-white transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[5.25px]" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-screen bg-[#030303]/98 z-40 flex flex-col justify-center px-12 md:hidden"
          >
            <div className="flex flex-col gap-8 text-left">
              {navItems.map((item, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  key={item.target}
                  onClick={() => handleScrollTo(item.target)}
                  className="font-display text-4xl font-bold tracking-wide text-gray-500 hover:text-white transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.4 }}
                onClick={() => handleScrollTo("advisor")}
                className="mt-4 w-fit px-8 py-3 rounded-full bg-white text-black font-semibold tracking-wider uppercase"
              >
                Get Advisor
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
