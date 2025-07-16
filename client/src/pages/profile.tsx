import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Award, 
  TrendingUp,
  Settings,
  Edit,
  Eye,
  Shield,
  Users
} from "lucide-react";

export default function Profile() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#F28C13] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <Card className="glass-card border-white/10">
          <CardContent className="p-8 text-center">
            <p className="text-gray-400">Please log in to view your profile</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-gray-500';
      case 'pro': return 'bg-blue-500';
      case 'business': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'free': return <User className="w-3 h-3" />;
      case 'pro': return <Award className="w-3 h-3" />;
      case 'business': return <Shield className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="glass-card border-white/10">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="w-32 h-32 bg-gradient-to-br from-[#F28C13] to-[#0B67AE] rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <span className="text-white text-4xl font-bold">
                    {user.firstName?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-white">{user.firstName} {user.lastName}</h1>
                  <p className="text-gray-400">{user.email}</p>
                  <Badge className={`${getTierColor(user.tier || 'free')} text-white px-3 py-1`}>
                    {getTierIcon(user.tier || 'free')}
                    <span className="ml-1 capitalize">{user.tier} Member</span>
                  </Badge>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">127</div>
                    <div className="text-sm text-gray-400">Profile Views</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">43</div>
                    <div className="text-sm text-gray-400">Connections</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-sm text-gray-400">Referrals</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">8</div>
                    <div className="text-sm text-gray-400">Applications</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" className="flex-1 lg:flex-none">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" className="flex-1 lg:flex-none">
                    <Eye className="w-4 h-4 mr-2" />
                    View Public Profile
                  </Button>
                  <Button variant="ghost" className="flex-1 lg:flex-none">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Professional Information */}
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-[#F28C13]" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Briefcase className="w-5 h-5 text-[#F28C13]" />
                  <div>
                    <div className="text-sm font-medium text-white">Software Engineer</div>
                    <div className="text-xs text-gray-400">Meta • 3 years experience</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <MapPin className="w-5 h-5 text-[#0B67AE]" />
                  <div>
                    <div className="text-sm font-medium text-white">New York, NY</div>
                    <div className="text-xs text-gray-400">Manhattan area</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Users className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm font-medium text-white">St. Mark NYC</div>
                    <div className="text-xs text-gray-400">Church community</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-white mb-2">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs bg-white/5 border-white/10 text-gray-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-[#F28C13] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Applied to Software Engineer position</div>
                    <div className="text-xs text-gray-400">at Google • 2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-[#0B67AE] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">New connection request</div>
                    <div className="text-xs text-gray-400">from John Doe • 5 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Joined IT Professionals group</div>
                    <div className="text-xs text-gray-400">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Resume updated</div>
                    <div className="text-xs text-gray-400">2 days ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Information */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <Settings className="w-5 h-5 text-gray-400" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Mail className="w-5 h-5 text-[#F28C13]" />
                  <div>
                    <div className="text-sm font-medium text-white">Email</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#0B67AE]" />
                  <div>
                    <div className="text-sm font-medium text-white">Member Since</div>
                    <div className="text-xs text-gray-400">January 2024</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-sm font-medium text-white">Account Type</div>
                    <div className="text-xs text-gray-400 capitalize">{user.tier} membership</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm font-medium text-white">Profile Status</div>
                    <div className="text-xs text-gray-400">Active and verified</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}