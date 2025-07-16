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
      case 'free': return 'bg-gray-500/80';
      case 'pro': return 'tier-badge-pro';
      case 'business': return 'tier-badge-business';
      case 'admin': return 'tier-badge-admin';
      default: return 'bg-gray-500/80';
    }
  };

  const getTierIcon = (tier: string) => {
    switch(tier) {
      case 'free': return <Star className="w-3 h-3" />;
      case 'pro': return <Crown className="w-3 h-3" />;
      case 'business': return <Building className="w-3 h-3" />;
      case 'admin': return <Shield className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  const getTierWelcomeMessage = (tier: string, firstName: string) => {
    const name = firstName || 'there';
    switch(tier) {
      case 'free': return `Welcome back, ${name}! You're part of the Coptic network.`;
      case 'pro': return `Welcome back, Pro member ${name}! You're leading in the Coptic network.`;
      case 'business': return `Welcome back, Business leader ${name}! Time to expand your network.`;
      case 'admin': return `Welcome back, Admin ${name}! Your network management dashboard awaits.`;
      default: return `Welcome back, ${name}!`;
    }
  };

  const getFeatureProgress = (tier: string) => {
    switch(tier) {
      case 'free': return { unlocked: 3, total: 10, percentage: 30 };
      case 'pro': return { unlocked: 7, total: 10, percentage: 70 };
      case 'business': return { unlocked: 10, total: 10, percentage: 100 };
      case 'admin': return { unlocked: 10, total: 10, percentage: 100 };
      default: return { unlocked: 1, total: 10, percentage: 10 };
    }
  };

  const canPostJobs = user?.tier === 'business' || user?.tier === 'admin';
  const hasAIFeatures = user?.tier !== 'free';
  const hasAnalytics = user?.tier === 'business' || user?.tier === 'admin';

  return (
    <div className="min-h-screen bg-[#0D0D0D] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Tier Badge */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img 
              src={logoImage} 
              alt="Coptic Pro Network" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {getTierWelcomeMessage(user?.tier || 'free', user?.firstName || '')}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-gray-300">
                  Your Coptic Pro Network dashboard
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={`${getTierColor(user?.tier || 'free')} text-white text-xs px-3 py-1.5 font-semibold uppercase tracking-wide shadow-lg`}>
              {getTierIcon(user?.tier || 'free')}
              <span className="ml-1">{user?.tier || 'free'}</span>
            </Badge>
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

        {/* Feature Progress Bar for Free Users */}
        {user?.tier === 'free' && (
          <div className="glass-card mb-8 p-6 border border-yellow-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Unlock Your Full Potential</h3>
                <p className="text-gray-300 text-sm">
                  You've unlocked {getFeatureProgress(user?.tier || 'free').unlocked} of {getFeatureProgress(user?.tier || 'free').total} features
                </p>
              </div>
              <Button className="btn-primary">
                Unlock More
              </Button>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#F28C13] to-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getFeatureProgress(user?.tier || 'free').percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Pro User Motivation */}
        {user?.tier === 'pro' && (
          <div className="glass-card mb-8 p-6 border border-green-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">You're Leading in the Coptic Network</h3>
                <p className="text-gray-300 text-sm">
                  Time to connect more. Access AI resume optimizer, referral hub, and unlimited groups.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Business User Dashboard */}
        {user?.tier === 'business' && (
          <div className="glass-card mb-8 p-6 border border-purple-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Business Dashboard</h3>
                <p className="text-gray-300 text-sm">
                  You have 2 live projects, 5 applicants. Manage your hiring panel and collaboration tools.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Admin Controls */}
        {user?.tier === 'admin' && (
          <div className="glass-card mb-8 p-6 border border-yellow-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Admin Overview</h3>
                <p className="text-gray-300 text-sm">
                  10 resumes uploaded this week. Manage users, church groups, and system monitoring.
                </p>
              </div>
              <Button variant="outline" className="text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/10">
                Admin Panel
              </Button>
            </div>
          </div>
        )}



        {/* Dashboard Grid - Single Column Layout */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Overview - Full Width */}
          <Card className="glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <UserCheck className="w-5 h-5 text-[#F28C13]" />
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F28C13] to-[#0B67AE] rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3">
                    <span className="text-white text-2xl font-bold">
                      {user?.firstName?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-lg">{user?.firstName} {user?.lastName}</h3>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                  <Badge className={`${getTierColor(user?.tier || 'free')} text-white text-xs px-2 py-1 mt-2`}>
                    {getTierIcon(user?.tier || 'free')}
                    <span className="ml-1 capitalize">{user?.tier}</span>
                  </Badge>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">127</div>
                      <div className="text-xs text-gray-400">Profile Views</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">43</div>
                      <div className="text-xs text-gray-400">Network Size</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-xs text-gray-400">Referrals Sent</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">8</div>
                      <div className="text-xs text-gray-400">Jobs Applied</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Award className="w-4 h-4 mr-2" />
                      View Public Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Priority Notifications */}
          <Card className="glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <Bell className="w-5 h-5 text-[#F28C13]" />
                Important Notifications
                <Badge className="bg-red-500 text-white text-xs px-2 py-1 ml-auto">
                  3 New
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border-l-4 border-[#F28C13]">
                  <div className="w-8 h-8 bg-[#F28C13]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#F28C13]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">New referral opportunity</div>
                    <div className="text-xs text-gray-400">Senior Software Engineer at Meta - 2 mutual connections</div>
                    <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border-l-4 border-[#0B67AE]">
                  <div className="w-8 h-8 bg-[#0B67AE]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-[#0B67AE]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">St. Mark NYC group activity</div>
                    <div className="text-xs text-gray-400">5 new posts in networking discussion</div>
                    <div className="text-xs text-gray-500 mt-1">4 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border-l-4 border-green-500">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Profile view spike</div>
                    <div className="text-xs text-gray-400">Your profile was viewed 23 times today</div>
                    <div className="text-xs text-gray-500 mt-1">6 hours ago</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  <Bell className="w-4 h-4 mr-2" />
                  View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Groups & Communities */}
          <Card className="glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-[#0B67AE]" />
                Active Groups
                <div className="w-2 h-2 bg-green-500 rounded-full ml-auto animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-[#F28C13] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">SM</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">St. Mark NYC</div>
                      <div className="text-xs text-gray-400">24 members • 5 new posts</div>
                      <div className="text-xs text-[#F28C13] mt-1">Church Group</div>
                    </div>
                  </div>
                  {user?.tier !== 'free' && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-[#0B67AE] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">IT</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">IT Professionals</div>
                        <div className="text-xs text-gray-400">156 members • Active</div>
                        <div className="text-xs text-[#0B67AE] mt-1">Professional Group</div>
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
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-sm font-medium text-white mb-2">Group Activity</div>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">• New job posting in IT Professionals</div>
                      <div className="text-xs text-gray-400">• 3 new members joined St. Mark NYC</div>
                      <div className="text-xs text-gray-400">• Networking event scheduled</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    {user?.tier === 'free' ? 'Upgrade for More Groups' : 'Browse All Groups'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Opportunities */}
          <Card className="glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-[#F28C13]" />
                Job Opportunities
                <Badge className="bg-[#F28C13] text-white text-xs px-2 py-1 ml-auto">
                  8 New
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border-l-4 border-[#F28C13]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-sm font-medium text-white">Senior Software Engineer</div>
                      <Badge className="bg-[#F28C13] text-white text-xs px-2 py-1">Hot</Badge>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">Meta • Remote • $180k-220k</div>
                    <div className="text-xs text-[#F28C13]">2 mutual connections</div>
                    <div className="text-xs text-gray-500 mt-1">Posted 2 hours ago</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border-l-4 border-[#0B67AE]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-sm font-medium text-white">Product Manager</div>
                      <Badge className="bg-[#0B67AE] text-white text-xs px-2 py-1">Referral</Badge>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">Google • NYC • $160k-200k</div>
                    <div className="text-xs text-[#0B67AE]">Referral available</div>
                    <div className="text-xs text-gray-500 mt-1">Posted 1 day ago</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border-l-4 border-green-500">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-sm font-medium text-white">Marketing Director</div>
                      <Badge className="bg-green-500 text-white text-xs px-2 py-1">Match</Badge>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">Apple • Cupertino • $140k-180k</div>
                    <div className="text-xs text-green-500">Perfect match</div>
                    <div className="text-xs text-gray-500 mt-1">Posted 3 days ago</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-sm font-medium text-white mb-2">Job Stats</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Applications Sent</span>
                        <span className="text-white">12</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Interviews</span>
                        <span className="text-white">3</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Saved Jobs</span>
                        <span className="text-white">7</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Target className="w-4 h-4 mr-2" />
                      Browse All
                    </Button>
                    {canPostJobs && (
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Post Job
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Resume Tools */}
          <Card className="glass-card">
            <CardHeader className="pb-4">
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
                <div className="grid md:grid-cols-2 gap-4">
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
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">AI Analysis</div>
                        <div className="text-xs text-gray-400">Last updated 2 days ago</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <div className="text-sm font-medium text-white mb-2">AI Insights</div>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-400">• Strong technical skills section</div>
                        <div className="text-xs text-gray-400">• Missing leadership keywords</div>
                        <div className="text-xs text-gray-400">• Great project descriptions</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Brain className="w-4 h-4 mr-2" />
                        Optimize
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        View Resume
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Resume Tools</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Unlock AI-powered resume optimization, job matching, and career insights
                  </p>
                  <Button size="sm" className="btn-primary">
                    Upgrade to Pro
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Referral Network & Events */}
          <Card className="glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageSquare className="w-5 h-5 text-green-500" />
                Referrals & Events
                <Badge className="bg-green-500 text-white text-xs px-2 py-1 ml-auto">
                  5 Pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-white mb-2">Referral Network</div>
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
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-white mb-2">Upcoming Events</div>
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
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="ghost" size="sm" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Manage Referrals
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
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