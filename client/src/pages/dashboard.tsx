import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Users, 
  MessageCircle, 
  Briefcase, 
  Award, 
  TrendingUp, 
  Bell,
  Calendar,
  FileText,
  Settings,
  Crown,
  Lock,
  Star,
  Building,
  UserCheck,
  MessageSquare,
  Target,
  BarChart3,
  Shield,
  Zap
} from "lucide-react";
import logoImage from "@assets/Neumorphism style (5)_1752532338127.png";

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
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
        <div className="animate-spin w-8 h-8 border-4 border-[#F28C13] border-t-transparent rounded-full" />
      </div>
    );
  }

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'free': return 'bg-gray-500';
      case 'pro': return 'bg-blue-500';
      case 'business': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTierIcon = (tier: string) => {
    switch(tier) {
      case 'free': return <Star className="w-3 h-3" />;
      case 'pro': return <Crown className="w-3 h-3" />;
      case 'business': return <Building className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  const canPostJobs = user?.tier === 'business' || user?.tier === 'admin';
  const hasAIFeatures = user?.tier !== 'free';
  const hasAnalytics = user?.tier === 'business' || user?.tier === 'admin';

  return (
    <div className="min-h-screen bg-[#0D0D0D] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img 
              src={logoImage} 
              alt="Coptic Pro Network" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {user?.firstName || "Professional"}!
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-gray-300">
                  Your Coptic Pro Network dashboard
                </p>
                <Badge className={`${getTierColor(user?.tier || 'free')} text-white text-xs px-2 py-1`}>
                  {getTierIcon(user?.tier || 'free')}
                  <span className="ml-1 capitalize">{user?.tier}</span>
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F28C13] rounded-full"></span>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = "/api/logout"}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Tier-based Welcome Message */}
        {user?.tier === 'free' && (
          <div className="glass-card mb-8 p-6 border border-yellow-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Unlock Your Full Potential</h3>
                <p className="text-gray-300 text-sm">
                  Upgrade to Pro for AI resume tools, unlimited groups, and advanced networking features.
                </p>
              </div>
              <Button className="btn-primary">
                Upgrade Now
              </Button>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Profile Overview */}
          <Card className="glass-card col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <UserCheck className="w-5 h-5 text-[#F28C13]" />
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F28C13] to-[#0B67AE] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl font-bold">
                    {user?.firstName?.charAt(0) || 'U'}
                  </span>
                </div>
                <h3 className="font-semibold text-white">{user?.firstName} {user?.lastName}</h3>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Profile Views</span>
                  <span className="text-white font-medium">127</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Network Size</span>
                  <span className="text-white font-medium">43</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Referrals Sent</span>
                  <span className="text-white font-medium">12</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Active Groups */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-[#0B67AE]" />
                Active Groups
                <div className="w-2 h-2 bg-green-500 rounded-full ml-auto animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 bg-[#F28C13] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">SM</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">St. Mark NYC</div>
                    <div className="text-xs text-gray-400">24 members • 5 new posts</div>
                  </div>
                </div>
                {user?.tier !== 'free' && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 bg-[#0B67AE] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">IT</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">IT Professionals</div>
                      <div className="text-xs text-gray-400">156 members • Active</div>
                    </div>
                  </div>
                )}
                {user?.tier === 'free' && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 opacity-50">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <div className="text-sm text-gray-400">
                      Upgrade to join more groups
                    </div>
                  </div>
                )}
                <Button variant="ghost" size="sm" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  {user?.tier === 'free' ? 'Upgrade for More' : 'Browse Groups'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#F28C13] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">New referral request</div>
                    <div className="text-xs text-gray-400">Software Engineer at Meta</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0B67AE] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Profile view</div>
                    <div className="text-xs text-gray-400">Anonymous recruiter</div>
                    <div className="text-xs text-gray-500">5 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Message received</div>
                    <div className="text-xs text-gray-400">From St. Mark NYC group</div>
                    <div className="text-xs text-gray-500">1 day ago</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Opportunities */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-[#F28C13]" />
                Job Opportunities
                <Badge className="bg-[#F28C13] text-white text-xs px-2 py-1 ml-auto">
                  8 New
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-sm font-medium text-white">Senior Software Engineer</div>
                  <div className="text-xs text-gray-400">Meta • Remote • $180k-220k</div>
                  <div className="text-xs text-[#F28C13] mt-1">2 mutual connections</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-sm font-medium text-white">Product Manager</div>
                  <div className="text-xs text-gray-400">Google • NYC • $160k-200k</div>
                  <div className="text-xs text-[#0B67AE] mt-1">Referral available</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-sm font-medium text-white">Marketing Director</div>
                  <div className="text-xs text-gray-400">Apple • Cupertino • $140k-180k</div>
                  <div className="text-xs text-green-500 mt-1">Perfect match</div>
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Browse All Jobs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Resume Tools */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Brain className="w-5 h-5 text-purple-500" />
                AI Resume Tools
                {hasAIFeatures ? (
                  <Badge className="bg-purple-500 text-white text-xs px-2 py-1 ml-auto">
                    Active
                  </Badge>
                ) : (
                  <Lock className="w-4 h-4 text-gray-400 ml-auto" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hasAIFeatures ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">Resume Score</div>
                      <div className="text-xs text-gray-400">87/100 • Excellent</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">ATS Optimized</div>
                      <div className="text-xs text-gray-400">15 keywords added</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Brain className="w-4 h-4 mr-2" />
                    Optimize Resume
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-purple-500" />
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Unlock AI-powered resume optimization and job matching
                  </p>
                  <Button size="sm" className="btn-primary">
                    Upgrade to Pro
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Referral Network */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageSquare className="w-5 h-5 text-green-500" />
                Referral Network
                <Badge className="bg-green-500 text-white text-xs px-2 py-1 ml-auto">
                  5 Pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg font-bold text-white">12</div>
                    <div className="text-xs text-gray-400">Sent</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg font-bold text-white">8</div>
                    <div className="text-xs text-gray-400">Received</div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-sm font-medium text-white">Latest Request</div>
                  <div className="text-xs text-gray-400">Data Scientist at Netflix</div>
                  <div className="text-xs text-[#F28C13] mt-1">Awaiting response</div>
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Manage Referrals
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calendar & Events */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-[#0B67AE]" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <div className="w-8 h-8 bg-[#F28C13]/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#F28C13]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Networking Mixer</div>
                    <div className="text-xs text-gray-400">St. Mark Church • Tomorrow 7PM</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <div className="w-8 h-8 bg-[#0B67AE]/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#0B67AE]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Tech Talk</div>
                    <div className="text-xs text-gray-400">Virtual • Friday 6PM</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Calendar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Business Tier Features */}
          {canPostJobs && (
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Building className="w-5 h-5 text-purple-500" />
                  Business Tools
                  <Badge className="bg-purple-500 text-white text-xs px-2 py-1 ml-auto">
                    Business
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Post New Job
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Candidates
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm font-medium text-white">Active Jobs</div>
                    <div className="text-xs text-gray-400">3 positions • 47 applicants</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analytics (Business/Admin only) */}
          {hasAnalytics && (
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  Analytics
                  <Badge className="bg-green-500 text-white text-xs px-2 py-1 ml-auto">
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-lg font-bold text-white">2.4k</div>
                      <div className="text-xs text-gray-400">Profile Views</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-lg font-bold text-white">156</div>
                      <div className="text-xs text-gray-400">Connections</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm font-medium text-white">Growth This Month</div>
                    <div className="text-xs text-green-500">+23% engagement</div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions Bar */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <Button size="sm" className="btn-primary shadow-lg">
            <MessageCircle className="w-4 h-4 mr-2" />
            New Message
          </Button>
          {canPostJobs && (
            <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg">
              <Briefcase className="w-4 h-4 mr-2" />
              Post Job
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}