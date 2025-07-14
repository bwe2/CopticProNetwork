
import { 
  Brain, 
  Users, 
  MessageCircle, 
  ShieldCheck, 
  Search, 
  CreditCard, 
  Lock, 
  Zap 
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-powered resume help",
    color: "orange"
  },
  {
    icon: Users,
    title: "Group chats by church + topic",
    color: "blue"
  },
  {
    icon: MessageCircle,
    title: "Referral messaging system",
    color: "orange"
  },
  {
    icon: ShieldCheck,
    title: "Mentorship access",
    color: "blue"
  },
  {
    icon: Search,
    title: "Professional directory",
    color: "orange"
  },
  {
    icon: CreditCard,
    title: "Stripe-secured membership",
    color: "blue"
  },
  {
    icon: Lock,
    title: "Invite-only privacy",
    color: "orange"
  },
  {
    icon: Zap,
    title: "Admin-monitored & GPT-moderated for safety",
    color: "blue"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-gray-300">
            Comprehensive tools and features to accelerate your professional growth
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="industry-card">
              <div className={`w-12 h-12 ${
                feature.color === 'orange' ? 'bg-[#F28C13]/20' : 'bg-[#0B67AE]/20'
              } rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce`}>
                <feature.icon className={`${
                  feature.color === 'orange' ? 'text-[#F28C13]' : 'text-[#0B67AE]'
                } w-6 h-6`} />
              </div>
              <h3 className="font-semibold text-sm">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}