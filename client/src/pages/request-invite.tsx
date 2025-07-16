import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Cross, Check } from "lucide-react";
import logoImage from "@assets/Neumorphism style (5)_1752532338127.png";
import { insertPendingInviteSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const requestInviteSchema = insertPendingInviteSchema.omit({ id: true, status: true, createdAt: true });

type RequestInviteForm = z.infer<typeof requestInviteSchema>;

const churches = [
  "St. Mark Coptic Orthodox Church NYC",
  "St. Mary & St. Moses Abbey - Corpus Christi, TX",
  "St. Mina Coptic Orthodox Church - Holmdel, NJ",
  "St. George Coptic Orthodox Church - Bellflower, CA",
  "St. Mary Coptic Orthodox Church - Los Angeles, CA",
  "St. Mark Coptic Orthodox Church - Cleveland, OH",
  "St. Stephen Coptic Orthodox Church - Phoenix, AZ",
  "St. John Coptic Orthodox Church - Covina, CA",
  "St. Abraam Coptic Orthodox Church - Woodbury, NY",
  "St. Mary Coptic Orthodox Church - Palatine, IL",
  "Other"
];

const professions = [
  "Healthcare & Medical",
  "Engineering & Technology",
  "Finance & Banking",
  "Education & Academia",
  "Legal & Law",
  "Business & Management",
  "Sales & Marketing",
  "Design & Creative",
  "Other"
];

export default function RequestInvite() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<RequestInviteForm>({
    resolver: zodResolver(requestInviteSchema),
    defaultValues: {
      fullName: "",
      email: "",
      church: "",
      profession: "",
      referral: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: RequestInviteForm) => {
      await apiRequest("POST", "/api/pending-invites", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Invitation Request Submitted",
        description: "Thank you! We'll review your request and get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RequestInviteForm) => {
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#0D0D0D]">
        <Card className="w-full max-w-md glass-card text-center border-white/10">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Request Submitted!</h2>
            <p className="text-gray-300 mb-6">
              Thank you for your interest in joining Coptic Pro Network. We'll review your request and send you an invitation if approved.
            </p>
            <p className="text-sm text-gray-400">
              You'll receive an email within 2-3 business days with further instructions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0D0D0D]">
      <Card className="w-full max-w-2xl glass-card border-white/10">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <img 
              src={logoImage} 
              alt="Coptic Pro Network Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-white mb-3">Request Invitation</CardTitle>
          <p className="text-gray-300 text-sm">
            Coptic Pro Network is an exclusive, invite-only platform for Coptic Orthodox professionals.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white text-sm font-medium">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#F28C13]/50 focus:ring-[#F28C13]/20"
                  {...form.register("fullName")}
                />
                {form.formState.errors.fullName && (
                  <p className="text-sm text-red-400">{form.formState.errors.fullName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white text-sm font-medium">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#F28C13]/50 focus:ring-[#F28C13]/20"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-400">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="church" className="text-white text-sm font-medium">Church or Parish *</Label>
              <Select onValueChange={(value) => form.setValue("church", value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select your church" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                  {churches.map((church) => (
                    <SelectItem key={church} value={church} className="hover:bg-white/10 focus:bg-white/10">
                      {church}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.church && (
                <p className="text-sm text-red-400">{form.formState.errors.church.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profession" className="text-white text-sm font-medium">Profession or Industry *</Label>
              <Select onValueChange={(value) => form.setValue("profession", value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select your profession" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                  {professions.map((profession) => (
                    <SelectItem key={profession} value={profession} className="hover:bg-white/10 focus:bg-white/10">
                      {profession}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.profession && (
                <p className="text-sm text-red-400">{form.formState.errors.profession.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="referral" className="text-white text-sm font-medium">How did you hear about us? (Optional)</Label>
              <Textarea
                id="referral"
                placeholder="Tell us who referred you or how you found out about Coptic Pro Network"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#F28C13]/50 focus:ring-[#F28C13]/20"
                {...form.register("referral")}
              />
            </div>

            <div className="bg-[#0B67AE]/20 border border-[#0B67AE]/30 rounded-lg p-4">
              <h4 className="font-semibold text-[#0B67AE] mb-2">What happens next?</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Your request will be reviewed by our team</li>
                <li>• We'll verify your church and professional background</li>
                <li>• You'll receive an invitation email within 2-3 business days</li>
                <li>• Once approved, you'll get full access to the platform</li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full btn-primary text-white font-semibold py-3"
              size="lg"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}