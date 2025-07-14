import { Card, CardContent } from "@/components/ui/card";
import { 
  Briefcase, 
  Users, 
  Handshake, 
  Building, 
  TrendingUp, 
  Brain 
} from "lucide-react";

const problems = [
  {
    icon: Briefcase,
    title: "Find a Job Inside the Coptic Network",
    description: "Discover opportunities shared by trusted church members and Coptic-owned businesses.",
    color: "orange"
  },
  {
    icon: Users,
    title: "Hire Talented, Trustworthy Professionals",
    description: "Post jobs, search by church or skill, and invite qualified members into your projects.",
    color: "blue"
  },
  {
    icon: Handshake,
    title: "Get Referrals or Mentorship Privately",
    description: "Ask for help in confidence. Build trust-based referrals and connect with seasoned mentors.",
    color: "orange"
  },
  {
    icon: Building,
    title: "Create Church & Career Communities",
    description: "Join group chats organized by church and topic. Network by faith, region, or profession.",
    color: "blue"
  },
  {
    icon: TrendingUp,
    title: "Grow Your Professional Visibility",
    description: "Appear in searches, get featured in top results, and earn credibility through badges and activity.",
    color: "orange"
  },
  {
    icon: Brain,
    title: "All-in-One Faith-Based Career Hub",
    description: "No more LinkedIn or GroupMe juggling — everything lives inside one secure, purpose-built space.",
    color: "blue"
  }
];

export function ProblemsSection() {
  return (
    <section id="problems" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Coptic Pro Network Solves</h2>
          <p className="text-xl text-gray-300">
            We built this platform to solve the real problems Coptic professionals face every day
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="glass-card fade-in">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${
                  problem.color === 'orange' ? 'bg-[#F28C13]/20' : 'bg-[#0B67AE]/20'
                } rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce`}>
                  <problem.icon className={`${
                    problem.color === 'orange' ? 'text-[#F28C13]' : 'text-[#0B67AE]'
                  } text-2xl w-8 h-8`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                <p className="text-gray-300">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
