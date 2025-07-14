import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Cross, Chrome } from "lucide-react";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { toast } = useToast();

  const handleTestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/auth/test-login", credentials);
      const user = await response.json();
      
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Cross className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-gray-400">Sign in to your Coptic Pro Network account</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Google OAuth */}
          <Button
            onClick={() => window.location.href = "/api/login"}
            className="w-full btn-primary"
            size="lg"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-900 px-2 text-gray-400">Or for testing</span>
            </div>
          </div>

          {/* Test Login Form */}
          <form onSubmit={handleTestLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="admin, free_test, pro_test, biz_test, mentor_test"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full btn-ghost"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in (Test)"}
            </Button>
          </form>

          <div className="text-xs text-gray-500 text-center">
            <p>Test credentials:</p>
            <p>admin/admin • free_test/CopticTest#2025</p>
            <p>pro_test/CopticTest#2025 • biz_test/CopticTest#2025</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
