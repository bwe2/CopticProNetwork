import { Button } from "@/components/ui/button";
import { Rocket, Play } from "lucide-react";

export function HeroSection() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToPricing}
              className="btn-primary text-lg"
              size="lg"
            >
              <Rocket className="w-5 h-5" />
              Join Now
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="btn-ghost text-lg"
              onClick={scrollToPricing}
            >
              <Play className="w-5 h-5" />
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
