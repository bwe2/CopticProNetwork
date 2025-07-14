import { 
  Calculator, 
  Laptop, 
  Briefcase, 
  Megaphone, 
  HardHat, 
  Palette, 
  Stethoscope, 
  Scale 
} from "lucide-react";

const industries = [
  {
    icon: Calculator,
    title: "Accounting & Tax Services",
    description: "CPAs, Tax Advisors, Financial Consultants",
    color: "orange"
  },
  {
    icon: Laptop,
    title: "Computers & Information Technology",
    description: "Software Engineers, Data Scientists, IT Managers",
    color: "blue"
  },
  {
    icon: Briefcase,
    title: "Business & Professional Services",
    description: "Consultants, HR Professionals, Administrators",
    color: "orange"
  },
  {
    icon: Megaphone,
    title: "Advertising, Media & Public Relations",
    description: "Marketing, PR, Content Creators",
    color: "blue"
  },
  {
    icon: HardHat,
    title: "Engineering & Construction",
    description: "Civil, Mechanical, Construction",
    color: "orange"
  },
  {
    icon: Palette,
    title: "Arts, Entertainment & Event Management",
    description: "Artists, Event Planners, Entertainment",
    color: "blue"
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Medical",
    description: "Doctors, Therapists, Coptic Medical Assoc.",
    color: "orange"
  },
  {
    icon: Scale,
    title: "Legal & Law",
    description: "Attorneys, Legal Advisors, Paralegals",
    color: "blue"
  }
];

export function IndustriesSection() {
  return (
    <section id="industries" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Coptic American Professional Industries</h2>
          <p className="text-xl text-gray-300">
            The Coptic Pro Network is serving a growing range of professional fields. Here's where our community is most active:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <div key={index} className="industry-card">
              <industry.icon className={`${
                industry.color === 'orange' ? 'text-[#F28C13]' : 'text-[#0B67AE]'
              } text-3xl mb-3 w-8 h-8 mx-auto`} />
              <h3 className="font-semibold mb-2">{industry.title}</h3>
              <p className="text-gray-400 text-sm">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
