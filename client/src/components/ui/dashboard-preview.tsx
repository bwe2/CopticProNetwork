
import { Button } from "@/components/ui/button";
import { Building, Code, CheckCircle } from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Dashboard Preview</h2>
          <p className="text-xl text-gray-300">
            A sleek, AI-powered hub to grow your Coptic career
          </p>
        </div>
        
        <div className="dashboard-preview max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Active Groups Card */}
            <div className="industry-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Active Groups</h4>
                <div className="live-dot"></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-[#F28C13]" />
                  <span className="text-sm">St. Mark NYC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-[#0B67AE]" />
                  <span className="text-sm">IT Professionals</span>
                </div>
              </div>
            </div>

            {/* Referrals Card */}
            <div className="industry-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Referrals</h4>
                <span className="bg-[#F28C13] text-white text-xs px-2 py-1 rounded">
                  3 New
                </span>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Software Engineer @ Amazon</div>
                <div className="text-sm text-gray-300">Marketing Manager @ Google</div>
              </div>
            </div>

            {/* AI Resume Card */}
            <div className="industry-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">AI Resume</h4>
                <span className="bg-[#0B67AE] text-white text-xs px-2 py-1 rounded">
                  Pro
                </span>
              </div>
              <div className="text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Resume optimized for 12 jobs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
