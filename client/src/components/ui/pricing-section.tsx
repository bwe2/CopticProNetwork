import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      { text: "Join 1 church group", included: true },
      { text: "Join 1 topic group", included: true },
      { text: "Build professional profile", included: true },
      { text: "Chat in group discussions", included: true },
      { text: "No AI resume tools", included: false }
    ],
    buttonText: "Get Started",
    buttonVariant: "ghost" as const,
    popular: false
  },
  {
    name: "Pro",
    price: "$5",
    period: "per month",
    description: "Best for job seekers",
    yearlyDiscount: "or $50/year (save 17%)",
    features: [
      { text: "All Free features", included: true },
      { text: "Unlimited group access", included: true },
      { text: "GPT resume analysis", included: true },
      { text: "Coptic referrals & mentors", included: true },
      { text: "Priority search visibility", included: true }
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Business",
    price: "$15",
    period: "per month",
    description: "Ideal for hiring managers",
    yearlyDiscount: "or $150/year (save 17%)",
    features: [
      { text: "All Pro features", included: true },
      { text: "Post unlimited jobs", included: true },
      { text: "Full talent directory", included: true },
      { text: "Branded company page", included: true },
      { text: "Analytics & insights", included: true }
    ],
    buttonText: "Start Business Plan",
    buttonVariant: "ghost" as const,
    popular: false
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Become a Member</h2>
          <p className="text-xl text-gray-300">
            Join thousands of Coptic professionals building their careers through faith and community
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`glass-card bg-[#1a1a1a] relative ${
              plan.popular ? 'ring-2 ring-[#F28C13]' : ''
            }`}>
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400">{plan.description}</p>
                  <div className="text-4xl font-bold text-[#F28C13] mt-4">
                    {plan.price}
                  </div>
                  <div className="text-gray-400">{plan.period}</div>
                  {plan.yearlyDiscount && (
                    <div className="text-sm text-green-400 mt-1">
                      {plan.yearlyDiscount}
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                      <span className={feature.included ? '' : 'text-gray-500'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full ${
                    plan.buttonVariant === 'default' ? 'btn-primary' : 'btn-ghost'
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
