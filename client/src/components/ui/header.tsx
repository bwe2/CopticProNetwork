import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/Neumorphism style (5)_1752532338127.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="Coptic Pro Network Logo" 
              className="w-20 h-20 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Coptic Pro Network</h1>
              <p className="text-xs text-gray-400">Professional Networking</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('problems')}
              className="text-gray-300 hover:text-[#F28C13] transition-colors"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection('industries')}
              className="text-gray-300 hover:text-[#F28C13] transition-colors"
            >
              Industries
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-300 hover:text-[#F28C13] transition-colors"
            >
              Pricing
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = "/api/login"}
              className="btn-ghost text-sm"
            >
              Sign In
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection('problems')}
                className="text-gray-300 hover:text-orange-500 transition-colors text-left"
              >
                Solutions
              </button>
              <button
                onClick={() => scrollToSection('industries')}
                className="text-gray-300 hover:text-orange-500 transition-colors text-left"
              >
                Industries
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-300 hover:text-orange-500 transition-colors text-left"
              >
                Pricing
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = "/api/login"}
                className="btn-ghost text-sm justify-start"
              >
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
