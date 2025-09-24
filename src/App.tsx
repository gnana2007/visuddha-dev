import { useState, useEffect } from 'react';
import { UserService, AnalyticsService } from './utils/data-service';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  MapPin, 
  Leaf, 
  Shield, 
  QrCode, 
  Smartphone, 
  BarChart3, 
  ChevronRight,
  CheckCircle,
  Clock,
  Users,
  Globe,
  Eye,
  Download,
  Camera,
  Network,
  Cpu,
  Brain,
  Zap,
  Settings
} from 'lucide-react';
import { LanguageProvider, useLanguage } from './components/language/language-context';
import { LanguageToggle } from './components/language/language-toggle';
import { CollectorInterface } from './components/collector-interface';
import { ProcessingDashboard } from './components/processing-dashboard';
import { LabInterface } from './components/lab-interface';
import { ConsumerPortal } from './components/consumer-portal';
import { StakeholderDashboard } from './components/stakeholder-dashboard';
import { ComplianceTracker } from './components/compliance-tracker';
import { BlockchainNetwork } from './components/blockchain-network';
import { IoTSensorNetwork } from './components/iot-sensor-network';
import { AIQualityPrediction } from './components/ai-quality-prediction';
import { LoginPortal } from './components/auth/login-portal';
import { BusinessIntelligenceDashboard } from './components/business-intelligence-dashboard';
import { SupplyChainVisualization } from './components/supply-chain-visualization';
import { FarmerManagementPortal } from './components/farmer-management-portal';
import { SettingsAdministration } from './components/settings-administration';
import { UnauthorizedAccess } from './components/unauthorized-access';
import { RoleBadge } from './components/role-badge';
import { RealTimeMetrics } from './components/real-time-metrics';
import { BlockchainStatus } from './components/blockchain-status';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const [activeView, setActiveView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session on app load
    const checkUserSession = async () => {
      try {
        const user = await UserService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const handleLogin = async (userType: string) => {
    try {
      setIsLoading(true);
      const userData = await UserService.login(userType);
      setCurrentUser(userData);
      setActiveView('home');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await UserService.logout();
      setCurrentUser(null);
      setActiveView('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const hasPermission = (requiredPermissions: string[]) => {
    if (!currentUser) return true; // Allow demo access for non-logged-in users
    if (currentUser.permissions?.includes('full_access')) return true;
    return requiredPermissions.some(permission => 
      currentUser.permissions?.includes(permission)
    );
  };

  const renderView = () => {
    // Check permissions for protected routes
    const routePermissions: { [key: string]: string[] } = {
      'collector': ['collection', 'gps_tracking'],
      'processing': ['processing', 'batch_management'],
      'lab': ['testing', 'certification', 'quality_analysis'],
      'consumer': ['product_scan', 'traceability_view'],
      'dashboard': ['full_access', 'user_management', 'operations'],
      'compliance': ['full_access', 'testing', 'certification'],
      'blockchain': ['full_access', 'operations', 'system_config'],
      'iot': ['full_access', 'operations', 'processing'],
      'ai': ['full_access', 'operations', 'quality_analysis'],
      'business-intelligence': ['full_access', 'user_management'],
      'supply-chain-map': ['full_access', 'operations', 'processing'],
      'farmer-management': ['full_access', 'user_management'],
      'settings': ['full_access', 'system_config']
    };

    // If trying to access a protected route without permission, redirect to home
    if (activeView !== 'home' && activeView !== 'login' && routePermissions[activeView]) {
      if (!hasPermission(routePermissions[activeView])) {
        setActiveView('home');
        return <HomePage onNavigate={setActiveView} currentUser={currentUser} onLogout={handleLogout} />;
      }
    }

    switch (activeView) {
      case 'login':
        return <LoginPortal onBack={() => setActiveView('home')} onLogin={handleLogin} />;
      case 'collector':
        return hasPermission(['collection', 'gps_tracking']) ? 
          <CollectorInterface onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['collection', 'gps_tracking']} />;
      case 'processing':
        return hasPermission(['processing', 'batch_management']) ? 
          <ProcessingDashboard onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['processing', 'batch_management']} />;
      case 'lab':
        return hasPermission(['testing', 'certification', 'quality_analysis']) ? 
          <LabInterface onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['testing', 'certification', 'quality_analysis']} />;
      case 'consumer':
        return hasPermission(['product_scan', 'traceability_view']) ? 
          <ConsumerPortal onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['product_scan', 'traceability_view']} />;
      case 'dashboard':
        return hasPermission(['full_access', 'user_management', 'operations']) ? 
          <StakeholderDashboard onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['full_access', 'user_management', 'operations']} />;
      case 'compliance':
        return hasPermission(['full_access', 'testing', 'certification']) ? 
          <ComplianceTracker onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['full_access', 'testing', 'certification']} />;
      case 'blockchain':
        return hasPermission(['full_access', 'operations', 'system_config']) ? 
          <BlockchainNetwork onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['full_access', 'operations', 'system_config']} />;
      case 'iot':
        return hasPermission(['full_access', 'operations', 'processing']) ? 
          <IoTSensorNetwork onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['full_access', 'operations', 'processing']} />;
      case 'ai':
        return hasPermission(['full_access', 'operations', 'quality_analysis']) ? 
          <AIQualityPrediction onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['full_access', 'operations', 'quality_analysis']} />;
      case 'business-intelligence':
        return hasPermission(['full_access', 'user_management']) ? 
          <BusinessIntelligenceDashboard onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['full_access', 'user_management']} />;
      case 'supply-chain-map':
        return hasPermission(['full_access', 'operations', 'processing']) ? 
          <SupplyChainVisualization onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['full_access', 'operations', 'processing']} />;
      case 'farmer-management':
        return hasPermission(['full_access', 'user_management']) ? 
          <FarmerManagementPortal onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['full_access', 'user_management']} />;
      case 'settings':
        return hasPermission(['full_access', 'system_config']) ? 
          <SettingsAdministration onBack={() => setActiveView('home')} /> : 
          <UnauthorizedAccess onBack={() => setActiveView('home')} userType={currentUser?.type} requiredPermissions={['full_access', 'system_config']} />;
      default:
        return <HomePage onNavigate={setActiveView} currentUser={currentUser} onLogout={handleLogout} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Viśuddha Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {renderView()}
    </div>
  );
}

function HomePage({ onNavigate, currentUser, onLogout }: { onNavigate: (view: string) => void; currentUser: any; onLogout: () => void }) {
  const { t } = useLanguage();

  const hasPermission = (requiredPermissions: string[]) => {
    if (!currentUser) return true; // Show all demos if not logged in
    if (currentUser.permissions?.includes('full_access')) return true;
    return requiredPermissions.some(permission => 
      currentUser.permissions?.includes(permission)
    );
  };

  // Define role-specific features
  const allFeatures = [
    {
      id: 'collector',
      title: t('features.collector.title'),
      description: t('features.collector.description'),
      icon: Smartphone,
      color: 'green-600',
      features: [
        t('features.collector.feature1'),
        t('features.collector.feature2'),
        t('features.collector.feature3')
      ],
      button: t('features.collector.button'),
      permissions: ['collection', 'gps_tracking']
    },
    {
      id: 'processing',
      title: t('features.processing.title'),
      description: t('features.processing.description'),
      icon: BarChart3,
      color: 'blue-600',
      features: [
        t('features.processing.feature1'),
        t('features.processing.feature2'),
        t('features.processing.feature3')
      ],
      button: t('features.processing.button'),
      permissions: ['processing', 'batch_management']
    },
    {
      id: 'lab',
      title: t('features.lab.title'),
      description: t('features.lab.description'),
      icon: Shield,
      color: 'purple-600',
      features: [
        t('features.lab.feature1'),
        t('features.lab.feature2'),
        t('features.lab.feature3')
      ],
      button: t('features.lab.button'),
      permissions: ['testing', 'certification', 'quality_analysis']
    },
    {
      id: 'consumer',
      title: t('features.consumer.title'),
      description: t('features.consumer.description'),
      icon: QrCode,
      color: 'orange-600',
      features: [
        t('features.consumer.feature1'),
        t('features.consumer.feature2'),
        t('features.consumer.feature3')
      ],
      button: t('features.consumer.button'),
      permissions: ['product_scan', 'traceability_view']
    }
  ];

  // Filter features based on user permissions
  const accessibleFeatures = allFeatures.filter(feature => hasPermission(feature.permissions));

  // Define role-specific metrics
  const getRoleSpecificMetrics = () => {
    if (!currentUser) {
      return [
        { icon: Shield, value: "100%", label: t('metrics.traceable'), color: "green-600" },
        { icon: MapPin, value: "GPS", label: t('metrics.gps'), color: "blue-600" },
        { icon: CheckCircle, value: "Smart", label: t('metrics.smart'), color: "purple-600" },
        { icon: Eye, value: "Real-time", label: t('metrics.realtime'), color: "orange-600" }
      ];
    }

    const roleMetrics = {
      farmer: [
        { icon: MapPin, value: "GPS", label: "Location Tracking", color: "green-600" },
        { icon: Smartphone, value: "Mobile", label: "Collection App", color: "blue-600" },
        { icon: Clock, value: "24/7", label: "Data Sync", color: "purple-600" },
        { icon: CheckCircle, value: "Verified", label: "Quality Checks", color: "orange-600" }
      ],
      processor: [
        { icon: BarChart3, value: "Live", label: "Processing Data", color: "blue-600" },
        { icon: Cpu, value: "IoT", label: "Sensor Network", color: "green-600" },
        { icon: Shield, value: "100%", label: "Batch Tracking", color: "purple-600" },
        { icon: Zap, value: "Auto", label: "Smart Contracts", color: "orange-600" }
      ],
      lab: [
        { icon: Shield, value: "ISO", label: "Certified Labs", color: "purple-600" },
        { icon: Brain, value: "AI", label: "Quality Prediction", color: "green-600" },
        { icon: CheckCircle, value: "100%", label: "Test Coverage", color: "blue-600" },
        { icon: Clock, value: "Real-time", label: "Results", color: "orange-600" }
      ],
      consumer: [
        { icon: QrCode, value: "QR", label: "Product Scanning", color: "purple-600" },
        { icon: Eye, value: "Full", label: "Transparency", color: "green-600" },
        { icon: Shield, value: "Verified", label: "Authenticity", color: "blue-600" },
        { icon: MapPin, value: "Origin", label: "Source Tracking", color: "orange-600" }
      ],
      admin: [
        { icon: Network, value: "Blockchain", label: "Network Status", color: "indigo-600" },
        { icon: Users, value: "Multi-role", label: "User Management", color: "green-600" },
        { icon: BarChart3, value: "Analytics", label: "Business Intelligence", color: "blue-600" },
        { icon: Settings, value: "Config", label: "System Admin", color: "gray-600" }
      ]
    };

    return roleMetrics[currentUser.type] || roleMetrics.admin;
  };

  // Define which demo cards each role can access
  const demoCards = [
    {
      id: 'dashboard',
      title: t('demo.stakeholder'),
      description: t('demo.stakeholder_desc'),
      icon: BarChart3,
      color: 'blue-600',
      badge: t('badge.analytics'),
      permissions: ['full_access', 'user_management', 'operations']
    },
    {
      id: 'compliance',
      title: t('demo.compliance'),
      description: t('demo.compliance_desc'),
      icon: Shield,
      color: 'green-600',
      badge: t('badge.compliance'),
      permissions: ['full_access', 'testing', 'certification']
    },
    {
      id: 'consumer',
      title: t('demo.qr_scanner'),
      description: t('demo.qr_scanner_desc'),
      icon: Camera,
      color: 'purple-600',
      badge: t('badge.consumer'),
      permissions: ['product_scan', 'traceability_view']
    },
    {
      id: 'collector',
      title: t('features.collector.title'),
      description: t('features.collector.description'),
      icon: Smartphone,
      color: 'green-600',
      badge: 'Collection',
      permissions: ['collection', 'gps_tracking']
    },
    {
      id: 'processing',
      title: t('features.processing.title'),
      description: t('features.processing.description'),
      icon: BarChart3,
      color: 'blue-600',
      badge: 'Processing',
      permissions: ['processing', 'batch_management']
    },
    {
      id: 'lab',
      title: t('features.lab.title'),
      description: t('features.lab.description'),
      icon: Shield,
      color: 'purple-600',
      badge: 'Laboratory',
      permissions: ['testing', 'certification', 'quality_analysis']
    },
    {
      id: 'blockchain',
      title: t('demo.blockchain'),
      description: t('demo.blockchain_desc'),
      icon: Network,
      color: 'indigo-600',
      badge: t('badge.blockchain'),
      permissions: ['full_access', 'operations', 'system_config']
    },
    {
      id: 'iot',
      title: t('demo.iot'),
      description: t('demo.iot_desc'),
      icon: Cpu,
      color: 'emerald-600',
      badge: t('badge.iot'),
      permissions: ['full_access', 'operations', 'processing']
    },
    {
      id: 'ai',
      title: t('demo.ai'),
      description: t('demo.ai_desc'),
      icon: Brain,
      color: 'violet-600',
      badge: t('badge.aiml'),
      permissions: ['full_access', 'operations', 'quality_analysis']
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence',
      description: 'Advanced analytics and business insights',
      icon: BarChart3,
      color: 'indigo-600',
      badge: 'Enterprise',
      permissions: ['full_access', 'user_management']
    },
    {
      id: 'supply-chain-map',
      title: 'Supply Chain Map',
      description: 'Interactive visualization and tracking',
      icon: Globe,
      color: 'teal-600',
      badge: 'Visualization',
      permissions: ['full_access', 'operations', 'processing']
    },
    {
      id: 'farmer-management',
      title: 'Farmer Management',
      description: 'Comprehensive farmer and collector portal',
      icon: Users,
      color: 'orange-600',
      badge: 'Management',
      permissions: ['full_access', 'user_management']
    },
    {
      id: 'settings',
      title: 'System Administration',
      description: 'Settings and system configuration',
      icon: Settings,
      color: 'gray-600',
      badge: 'Admin Only',
      permissions: ['full_access', 'system_config']
    }
  ];

  const accessibleDemoCards = demoCards.filter(card => hasPermission(card.permissions));
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">{t('app.title')}</span>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                {/* Only show features nav if user has accessible features or not logged in */}
                {(accessibleFeatures.length > 0 || !currentUser) && (
                  <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">{t('nav.features')}</a>
                )}
                <a href="#demo" className="text-gray-700 hover:text-green-600 transition-colors">{t('nav.demo')}</a>
                {/* Only show technology for admin users or non-logged users */}
                {(!currentUser || hasPermission(['full_access', 'system_config', 'operations'])) && (
                  <a href="#technology" className="text-gray-700 hover:text-green-600 transition-colors">{t('nav.technology')}</a>
                )}
              </nav>
              <div className="flex items-center space-x-4">
                {currentUser ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg border shadow-sm">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
                        <RoleBadge userType={currentUser.type} size="sm" showIcon={false} />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={onLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => onNavigate('login')}>
                    <Users className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                )}
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section for Logged-in Users OR Hero Section for Visitors */}
      {currentUser ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      Welcome back, {currentUser.name}!
                    </h1>
                    <div className="flex items-center space-x-4 mb-3">
                      <RoleBadge userType={currentUser.type} size="md" />
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600">{currentUser.organization}</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      You have access to {accessibleDemoCards.length} interface{accessibleDemoCards.length !== 1 ? 's' : ''} and specialized {currentUser.type} tools.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.permissions?.slice(0, 4).map((permission, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                      {currentUser.permissions?.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{currentUser.permissions.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Primary role-based action */}
                  {currentUser.type === 'farmer' && hasPermission(['collection', 'gps_tracking']) && (
                    <Button size="lg" onClick={() => onNavigate('collector')} className="bg-green-600 hover:bg-green-700 transition-colors">
                      <Smartphone className="mr-2 h-5 w-5" />
                      Start Collection
                    </Button>
                  )}
                  {currentUser.type === 'processor' && hasPermission(['processing', 'batch_management']) && (
                    <Button size="lg" onClick={() => onNavigate('processing')} className="bg-blue-600 hover:bg-blue-700 transition-colors">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Processing Dashboard
                    </Button>
                  )}
                  {currentUser.type === 'lab' && hasPermission(['testing', 'certification', 'quality_analysis']) && (
                    <Button size="lg" onClick={() => onNavigate('lab')} className="bg-purple-600 hover:bg-purple-700 transition-colors">
                      <Shield className="mr-2 h-5 w-5" />
                      Quality Testing
                    </Button>
                  )}
                  {currentUser.type === 'consumer' && hasPermission(['product_scan', 'traceability_view']) && (
                    <Button size="lg" onClick={() => onNavigate('consumer')} className="bg-green-600 hover:bg-green-700 transition-colors">
                      <QrCode className="mr-2 h-5 w-5" />
                      Scan Product
                    </Button>
                  )}
                  {currentUser.type === 'admin' && hasPermission(['full_access']) && (
                    <Button size="lg" onClick={() => onNavigate('dashboard')} className="bg-indigo-600 hover:bg-indigo-700 transition-colors">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Admin Dashboard
                    </Button>
                  )}
                  
                  {/* Secondary quick access */}
                  {hasPermission(['product_scan', 'traceability_view']) && currentUser.type !== 'consumer' && (
                    <Button size="lg" variant="outline" onClick={() => onNavigate('consumer')} className="hover:bg-green-50 transition-colors">
                      <QrCode className="mr-2 h-5 w-5" />
                      Quick Scan
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
              <span className="text-green-600 block">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => onNavigate('consumer')} className="bg-green-600 hover:bg-green-700 transition-colors">
                <QrCode className="mr-2 h-5 w-5" />
                {t('hero.scan_qr')}
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('login')} className="hover:bg-blue-50 transition-colors">
                <Users className="mr-2 h-5 w-5" />
                Login to Access Features
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Role-Specific Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentUser && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your {currentUser.type?.charAt(0).toUpperCase() + currentUser.type?.slice(1)} Overview
            </h2>
            <p className="text-gray-600">
              Real-time metrics and status indicators for your role
            </p>
          </div>
        )}
        
        {/* Use real-time metrics component */}
        <RealTimeMetrics userType={currentUser?.type} userId={currentUser?.id} />
        
        {/* Fallback to static metrics for non-logged users */}
        {!currentUser && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {getRoleSpecificMetrics().map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <IconComponent className={`h-12 w-12 text-${metric.color} mx-auto mb-4`} />
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                    <p className="text-gray-600">{metric.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Role-Specific Features Section */}
      {accessibleFeatures.length > 0 && (
        <section id="features" className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {currentUser ? `${currentUser.type?.charAt(0).toUpperCase() + currentUser.type?.slice(1)} Tools & Features` : t('features.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {currentUser ? `Core functionality designed for your workflow` : t('features.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {accessibleFeatures.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={feature.id} className="hover:shadow-lg transition-shadow bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <IconComponent className={`mr-3 h-6 w-6 text-${feature.color}`} />
                        {feature.title}
                      </CardTitle>
                      <CardDescription>
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {feature.features.map((featureItem, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-700">{featureItem}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full" 
                        onClick={() => onNavigate(feature.id)}
                      >
                        {feature.button}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Blockchain Status - Only for admin/operations users */}
      {currentUser && hasPermission(['full_access', 'system_config', 'operations']) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Network Status</h2>
            <p className="text-gray-600">Real-time blockchain network monitoring</p>
          </div>
          <BlockchainStatus isVisible={true} />
        </section>
      )}

      {/* Technology Section - Only show for admin/operations users or non-logged users */}
      {(!currentUser || hasPermission(['full_access', 'system_config', 'operations'])) && (
        <section id="technology" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('tech.title')}</h2>
            <p className="text-xl text-gray-600">{t('tech.subtitle')}</p>
          </div>

          <Tabs defaultValue="blockchain" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="blockchain">{t('tech.blockchain')}</TabsTrigger>
              <TabsTrigger value="iot">{t('tech.iot')}</TabsTrigger>
              <TabsTrigger value="smart">{t('tech.smart')}</TabsTrigger>
              <TabsTrigger value="integration">{t('tech.integration')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blockchain" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('tech.blockchain.title')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('tech.blockchain.description')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800">{t('tech.blockchain.immutable')}</h4>
                      <p className="text-sm text-green-600">{t('tech.blockchain.immutable_desc')}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800">{t('tech.blockchain.distributed')}</h4>
                      <p className="text-sm text-blue-600">{t('tech.blockchain.distributed_desc')}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800">{t('tech.blockchain.consensus')}</h4>
                      <p className="text-sm text-purple-600">{t('tech.blockchain.consensus_desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="iot" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('tech.iot.title')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('tech.iot.description')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800">{t('tech.iot.gps')}</h4>
                      <p className="text-sm text-orange-600">{t('tech.iot.gps_desc')}</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-teal-800">{t('tech.iot.sensors')}</h4>
                      <p className="text-sm text-teal-600">{t('tech.iot.sensors_desc')}</p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-indigo-800">{t('tech.iot.offline')}</h4>
                      <p className="text-sm text-indigo-600">{t('tech.iot.offline_desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="smart" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('tech.smart.title')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('tech.smart.description')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800">{t('tech.smart.geofencing')}</h4>
                      <p className="text-sm text-red-600">{t('tech.smart.geofencing_desc')}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800">{t('tech.smart.quality')}</h4>
                      <p className="text-sm text-yellow-600">{t('tech.smart.quality_desc')}</p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-pink-800">{t('tech.smart.compliance')}</h4>
                      <p className="text-sm text-pink-600">{t('tech.smart.compliance_desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integration" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('tech.integration.title')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('tech.integration.description')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-cyan-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-cyan-800">{t('tech.integration.apis')}</h4>
                      <p className="text-sm text-cyan-600">{t('tech.integration.apis_desc')}</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-emerald-800">{t('tech.integration.fhir')}</h4>
                      <p className="text-sm text-emerald-600">{t('tech.integration.fhir_desc')}</p>
                    </div>
                    <div className="bg-violet-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-violet-800">{t('tech.integration.erp')}</h4>
                      <p className="text-sm text-violet-600">{t('tech.integration.erp_desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      )}



      {/* Available Interfaces Section */}
      <section id="demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {currentUser ? 
              `Your Available Interfaces` : 
              t('demo.title')
            }
          </h2>
          <p className="text-xl text-gray-600">
            {currentUser ? 
              `Access all interfaces and tools authorized for your ${currentUser.type} role` : 
              t('demo.subtitle')
            }
          </p>
          {!currentUser && (
            <div className="mt-6">
              <Button onClick={() => onNavigate('login')} className="bg-green-600 hover:bg-green-700">
                <Users className="mr-2 h-4 w-4" />
                Login to Access Role-Based Features
              </Button>
            </div>
          )}
        </div>

        {accessibleDemoCards.length > 0 ? (
          <>
            {/* Quick Actions for logged-in users */}
            {currentUser && (
              <div className="bg-white p-6 rounded-lg border mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                  <Badge variant="secondary">{accessibleDemoCards.length} Available</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {accessibleDemoCards.slice(0, 4).map((card) => {
                    const IconComponent = card.icon;
                    return (
                      <Button
                        key={`quick-${card.id}`}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gray-50"
                        onClick={() => onNavigate(card.id)}
                      >
                        <IconComponent className={`h-6 w-6 text-${card.color}`} />
                        <span className="text-xs text-center">{card.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* All Available Interfaces */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessibleDemoCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <Card 
                    key={card.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow group" 
                    onClick={() => onNavigate(card.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <IconComponent className={`h-12 w-12 text-${card.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                      <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{card.description}</p>
                      <Badge variant="outline">{card.badge}</Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          currentUser && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Access Permissions</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Your current role ({currentUser.type}) doesn't have access to any interfaces. 
                Please contact your administrator to request additional permissions.
              </p>
            </div>
          )
        )}

        {/* Demo for non-logged in users */}
        {!currentUser && (
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Experience Role-Based Access</h3>
              <p className="text-blue-700 mb-4">
                Login with different demo accounts to see how the interface adapts to your role:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-green-700">👨‍🌾 Farmer</div>
                  <div className="text-xs text-gray-600">Collection tools & tracking</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-blue-700">🏭 Processor</div>
                  <div className="text-xs text-gray-600">Processing & batch management</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-purple-700">🧪 Lab</div>
                  <div className="text-xs text-gray-600">Quality testing & certification</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-700">👤 Admin</div>
                  <div className="text-xs text-gray-600">Full system access</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-green-400" />
                <span className="text-xl font-bold">{t('app.title')}</span>
              </div>
              <p className="text-gray-400">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.technology')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{t('tech.blockchain')}</li>
                <li>{t('tech.smart')}</li>
                <li>IoT {t('tech.integration')}</li>
                <li>GPS {t('tech.iot.gps')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.features')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{t('metrics.traceable')}</li>
                <li>{t('features.lab.description')}</li>
                <li>{t('features.consumer.title')}</li>
                <li>{t('demo.compliance')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
              <p className="text-gray-400">
                {t('footer.built_for')}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {t('app.title')}. {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}