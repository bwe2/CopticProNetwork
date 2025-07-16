import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import logoImage from "@assets/Neumorphism style (5)_1752532338127.png";

interface LoginForm {
  username: string;
  password: string;
}

export default function Auth() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await apiRequest("POST", "/api/auth/test-login", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "Welcome to Coptic Pro Network!",
      });
      // Redirect to home page
      window.location.href = "/";
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0D0D0D]">
      <div className="w-full max-w-md">
        <Card className="glass-card border-white/10">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-6">
              <img 
                src={logoImage} 
                alt="Coptic Pro Network Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">Welcome Back</CardTitle>
            <p className="text-gray-300 text-sm">
              Sign in to your Coptic Pro Network account
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white text-sm font-medium">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#F28C13]/50 focus:ring-[#F28C13]/20"
                  {...form.register("username", { required: true })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#F28C13]/50 focus:ring-[#F28C13]/20"
                  {...form.register("password", { required: true })}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-primary text-white font-semibold py-3 mt-6"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400 mb-3 font-medium">Development Test Accounts:</p>
              <div className="text-xs text-gray-300 space-y-2">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span><strong className="text-[#F28C13]">admin</strong> / admin</span>
                  <span className="text-purple-400 text-xs">Business</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span><strong className="text-[#F28C13]">free_test</strong> / CopticTest#2025</span>
                  <span className="text-gray-400 text-xs">Free</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span><strong className="text-[#F28C13]">pro_test</strong> / CopticTest#2025</span>
                  <span className="text-blue-400 text-xs">Pro</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span><strong className="text-[#F28C13]">biz_test</strong> / CopticTest#2025</span>
                  <span className="text-purple-400 text-xs">Business</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}