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
import logoImage from "@assets/Neumorphism style (4)_1752532238190.png";
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
      <div className="min-h-screen flex items-center justify-center px-6 bg-background">
        <Card className="w-full max-w-md glass-card text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Request Submitted!</h2>
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
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <Card className="w-full max-w-2xl glass-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={logoImage} 
              alt="Coptic Pro Network Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <CardTitle className="text-3xl font-bold">Request Invitation</CardTitle>
          <p className="text-gray-300">
            Coptic Pro Network is an exclusive, invite-only platform for Coptic Orthodox professionals.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...form.register("fullName")}
                />
                {form.formState.errors.fullName && (
                  <p className="text-sm text-red-400">{form.formState.errors.fullName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-400">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="church">Church or Parish *</Label>
              <Select onValueChange={(value) => form.setValue("church", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your church" />
                </SelectTrigger>
                <SelectContent>
                  {churches.map((church) => (
                    <SelectItem key={church} value={church}>
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
              <Label htmlFor="profession">Profession or Industry *</Label>
              <Select onValueChange={(value) => form.setValue("profession", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your profession" />
                </SelectTrigger>
                <SelectContent>
                  {professions.map((profession) => (
                    <SelectItem key={profession} value={profession}>
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
              <Label htmlFor="referral">How did you hear about us? (Optional)</Label>
              <Textarea
                id="referral"
                placeholder="Tell us who referred you or how you found out about Coptic Pro Network"
                {...form.register("referral")}
              />
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Your request will be reviewed by our team</li>
                <li>• We'll verify your church and professional background</li>
                <li>• You'll receive an invitation email within 2-3 business days</li>
                <li>• Once approved, you'll get full access to the platform</li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full btn-primary"
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