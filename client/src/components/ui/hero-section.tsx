import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto text-center">
        <div className="fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Networking <br />
            <span className="text-[#F28C13]">for Coptic</span>{" "}
            <span className="text-[#0B67AE]">Christians</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with trusted professionals in your church community. Find jobs, 
            mentors, and opportunities through faith-based networking powered by AI.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => window.location.href = '/request-invite'}
              className="btn-primary text-lg"
              size="lg"
            >
              <Rocket className="w-5 h-5" />
              Request Invitation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
