import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logoImage from "@assets/Neumorphism style (4)_1752532238190.png";

export function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/10 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoImage} 
                alt="Coptic Pro Network Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-white">Coptic Pro Network</h3>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Professional networking for Coptic Orthodox Christians worldwide.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Groups
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Referrals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Jobs
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="mailto:support@organizedgreatness.com" className="hover:text-[#F28C13] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Donate
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Code of Conduct
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F28C13] transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Coptic Pro Network. A project of <strong>Organized Greatness LLC</strong>. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
