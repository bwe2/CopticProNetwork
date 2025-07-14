import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Users, MessageCircle, Briefcase, Award } from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {user?.firstName || "Professional"}!
            </h1>
            <p className="text-gray-300 mt-2">
              Your Coptic Pro Network dashboard
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => window.location.href = "/api/logout"}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Groups */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Active Groups
                <div className="live-dot ml-auto"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">St. Mark NYC</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">IT Professionals</span>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-3">
                  View All Groups
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Referrals */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                Referrals
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded ml-auto">
                  3 New
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="text-sm font-medium">Software Engineer</div>
                  <div className="text-xs text-gray-400">Amazon · 2 days ago</div>
                </div>
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="text-sm font-medium">Marketing Manager</div>
                  <div className="text-xs text-gray-400">Google · 1 week ago</div>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-3">
                  View All Referrals
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Resume */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                AI Resume
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded ml-auto">
                  {user?.tier === 'free' ? 'Upgrade' : 'Pro'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user?.tier === 'free' ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-400 mb-3">
                    Upgrade to Pro to unlock AI resume tools
                  </p>
                  <Button size="sm" className="btn-primary">
                    Upgrade Now
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Resume optimized for 12 jobs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>AI analysis complete</span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3">
                    View Resume
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Jobs */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-orange-500" />
                Recent Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="text-sm font-medium">Senior Developer</div>
                  <div className="text-xs text-gray-400">Tech Startup · Remote</div>
                </div>
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="text-sm font-medium">Project Manager</div>
                  <div className="text-xs text-gray-400">Consulting Firm · NYC</div>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-3">
                  Browse Jobs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Stats */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Profile Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Profile Views</span>
                  <span className="text-sm font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Network Size</span>
                  <span className="text-sm font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tier</span>
                  <span className="text-sm font-medium capitalize">{user?.tier}</span>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-3">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Post Job
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Find Connections
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
