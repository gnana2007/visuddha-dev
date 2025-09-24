import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  User, 
  Lock, 
  Mail, 
  Phone,
  Building,
  MapPin,
  Shield,
  Leaf,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../language/language-context';

interface LoginPortalProps {
  onBack: () => void;
  onLogin: (userType: string) => void;
}

export function LoginPortal({ onBack, onLogin }: LoginPortalProps) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('farmer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    organization: '',
    location: '',
    role: 'farmer'
  });

  const userTypes = [
    {
      id: 'farmer',
      name: 'Farmer/Collector',
      icon: Leaf,
      description: 'Field collection and herb harvesting',
      permissions: ['collection', 'gps_tracking', 'quality_input'],
      demo: { email: 'ramesh.farmer@visuddha.com', password: 'demo123' }
    },
    {
      id: 'processor',
      name: 'Processing Facility',
      icon: Building,
      description: 'Herb processing and manufacturing',
      permissions: ['processing', 'batch_management', 'quality_control'],
      demo: { email: 'facility@visuddha.com', password: 'demo123' }
    },
    {
      id: 'lab',
      name: 'Testing Laboratory',
      icon: Shield,
      description: 'Quality testing and certification',
      permissions: ['testing', 'certification', 'quality_analysis'],
      demo: { email: 'lab@visuddha.com', password: 'demo123' }
    },
    {
      id: 'consumer',
      name: 'Consumer',
      icon: User,
      description: 'Product verification and traceability',
      permissions: ['product_scan', 'traceability_view'],
      demo: { email: 'consumer@visuddha.com', password: 'demo123' }
    },
    {
      id: 'admin',
      name: 'System Administrator',
      icon: Shield,
      description: 'Full system access and management',
      permissions: ['full_access', 'user_management', 'system_config'],
      demo: { email: 'admin@visuddha.com', password: 'admin123' }
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userType);
  };

  const handleDemoLogin = (type: string) => {
    setUserType(type);
    // Automatically login with demo credentials
    onLogin(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Badge variant="outline">Secure Authentication</Badge>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-12 w-12 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">{t('app.title')} Portal</h1>
          </div>
          <p className="text-gray-600">Access your role-based dashboard in the Ayurvedic supply chain network</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Type Selection */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Your Role</CardTitle>
                    <CardDescription>Choose your role in the supply chain</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                            userType === type.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setUserType(type.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <type.icon className={`h-5 w-5 mt-0.5 ${
                              userType === type.id ? 'text-green-600' : 'text-gray-500'
                            }`} />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{type.name}</h4>
                              <p className="text-xs text-gray-600">{type.description}</p>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-2 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDemoLogin(type.id);
                                }}
                              >
                                Demo Login
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Login Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                      Enter your credentials to access your {userTypes.find(t => t.id === userType)?.name} dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Sign In as {userTypes.find(t => t.id === userType)?.name}
                      </Button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Demo Credentials</h4>
                      <p className="text-sm text-blue-700 mb-2">
                        Try the platform with these demo accounts:
                      </p>
                      <div className="space-y-1 text-xs">
                        {userTypes.slice(0, 3).map((type) => (
                          <div key={type.id} className="flex justify-between">
                            <span>{type.name}:</span>
                            <span className="font-mono">{type.demo.email} / {type.demo.password}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register" className="mt-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Register New Account</CardTitle>
                <CardDescription>
                  Create a new account for the Viśuddha supply chain network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="reg-name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="reg-phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-organization">Organization</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="reg-organization"
                          placeholder="Organization/Farm name"
                          value={formData.organization}
                          onChange={(e) => setFormData({...formData, organization: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="reg-location"
                          placeholder="City, State"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {userTypes.slice(0, 4).map((type) => (
                        <div
                          key={type.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors text-center ${
                            formData.role === type.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                          }`}
                          onClick={() => setFormData({...formData, role: type.id})}
                        >
                          <type.icon className="h-5 w-5 mx-auto mb-1" />
                          <p className="text-sm font-medium">{type.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Account Verification Required</h4>
                        <p className="text-sm text-yellow-700">
                          New accounts require verification by Viśuddha administrators before access is granted. 
                          This ensures supply chain integrity and compliance.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Registration Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Secure Access</h3>
              <p className="text-sm text-gray-600">Role-based authentication with blockchain verification</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Verified Network</h3>
              <p className="text-sm text-gray-600">All participants verified for supply chain integrity</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Leaf className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Complete Traceability</h3>
              <p className="text-sm text-gray-600">Track your role in the Ayurvedic herb journey</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}