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
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={logoImage} 
              alt="Coptic Pro Network Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <p className="text-gray-300 text-sm">
            Development Login - Use test credentials
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                {...form.register("username", { required: true })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...form.register("password", { required: true })}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full btn-primary"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
            <p className="text-xs text-gray-400 mb-2">Test Credentials:</p>
            <div className="text-xs text-gray-300 space-y-1">
              <div><strong>admin</strong> / admin (Business)</div>
              <div><strong>free_test</strong> / CopticTest#2025 (Free)</div>
              <div><strong>pro_test</strong> / CopticTest#2025 (Pro)</div>
              <div><strong>biz_test</strong> / CopticTest#2025 (Business)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}