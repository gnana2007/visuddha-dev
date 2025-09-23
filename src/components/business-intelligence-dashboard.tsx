import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Globe,
  BarChart3,
  PieChart,
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Leaf,
  Factory,
  Truck,
  Store,
  MapPin,
  Zap,
  Brain,
  Shield
} from 'lucide-react';
import { useLanguage } from './language/language-context';

interface BusinessIntelligenceDashboardProps {
  onBack: () => void;
}

export function BusinessIntelligenceDashboard({ onBack }: BusinessIntelligenceDashboardProps) {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);
  
  // Simulate real-time data updates
  const [metrics, setMetrics] = useState({
    totalRevenue: 2845000,
    totalBatches: 1247,
    activeSuppliers: 156,
    qualityScore: 94.8,
    onTimeDelivery: 92.3,
    carbonFootprint: 15.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 10000),
        qualityScore: prev.qualityScore + (Math.random() - 0.5) * 0.2,
        onTimeDelivery: prev.onTimeDelivery + (Math.random() - 0.5) * 0.5
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const kpiMetrics = [
    {
      title: 'Total Revenue',
      value: `₹${(metrics.totalRevenue / 100000).toFixed(1)}L`,
      change: '+18.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      description: 'Monthly revenue growth'
    },
    {
      title: 'Total Batches Processed',
      value: metrics.totalBatches.toLocaleString(),
      change: '+12.3%',
      trend: 'up',
      icon: Package,
      color: 'blue',
      description: 'Production efficiency'
    },
    {
      title: 'Active Suppliers',
      value: metrics.activeSuppliers.toString(),
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      color: 'purple',
      description: 'Network expansion'
    },
    {
      title: 'Quality Score',
      value: `${metrics.qualityScore.toFixed(1)}%`,
      change: '+2.1%',
      trend: 'up',
      icon: Shield,
      color: 'emerald',
      description: 'Quality improvement'
    },
    {
      title: 'On-Time Delivery',
      value: `${metrics.onTimeDelivery.toFixed(1)}%`,
      change: '-1.2%',
      trend: 'down',
      icon: Clock,
      color: 'orange',
      description: 'Logistics performance'
    },
    {
      title: 'Carbon Footprint',
      value: `${metrics.carbonFootprint.toFixed(1)}%`,
      change: '-5.3%',
      trend: 'up',
      icon: Leaf,
      color: 'green',
      description: 'Sustainability target'
    }
  ];

  const supplyChainMetrics = [
    {
      stage: 'Collection',
      volume: '2,340 kg',
      efficiency: 94,
      issues: 3,
      locations: 45,
      icon: Leaf,
      color: 'green'
    },
    {
      stage: 'Processing',
      volume: '2,180 kg',
      efficiency: 92,
      issues: 1,
      locations: 12,
      icon: Factory,
      color: 'blue'
    },
    {
      stage: 'Transportation',
      volume: '2,150 kg',
      efficiency: 88,
      issues: 5,
      locations: 8,
      icon: Truck,
      color: 'purple'
    },
    {
      stage: 'Distribution',
      volume: '2,120 kg',
      efficiency: 91,
      issues: 2,
      locations: 25,
      icon: Store,
      color: 'orange'
    }
  ];

  const herbPerformance = [
    {
      name: 'Ashwagandha',
      volume: '1,240 kg',
      revenue: '₹18.6L',
      growth: '+25%',
      quality: 96.2,
      suppliers: 23,
      trend: 'up'
    },
    {
      name: 'Tulsi',
      volume: '890 kg',
      revenue: '₹8.9L',
      growth: '+5%',
      quality: 94.8,
      suppliers: 18,
      trend: 'up'
    },
    {
      name: 'Brahmi',
      volume: '650 kg',
      revenue: '₹9.8L',
      growth: '-10%',
      quality: 92.3,
      suppliers: 15,
      trend: 'down'
    },
    {
      name: 'Neem',
      volume: '1,450 kg',
      revenue: '₹7.2L',
      growth: '+15%',
      quality: 89.7,
      suppliers: 31,
      trend: 'up'
    },
    {
      name: 'Turmeric',
      volume: '2,100 kg',
      revenue: '₹15.4L',
      growth: '+22%',
      quality: 91.5,
      suppliers: 28,
      trend: 'up'
    }
  ];

  const regionalData = [
    {
      region: 'Rajasthan',
      suppliers: 42,
      volume: '1,680 kg',
      quality: 95.2,
      revenue: '₹12.4L',
      growth: '+18%'
    },
    {
      region: 'Karnataka',
      suppliers: 38,
      volume: '1,420 kg',
      quality: 93.8,
      revenue: '₹10.8L',
      growth: '+15%'
    },
    {
      region: 'Gujarat',
      suppliers: 29,
      volume: '1,120 kg',
      quality: 94.5,
      revenue: '₹8.6L',
      growth: '+12%'
    },
    {
      region: 'Tamil Nadu',
      suppliers: 35,
      volume: '1,340 kg',
      quality: 92.1,
      revenue: '₹9.2L',
      growth: '+8%'
    },
    {
      region: 'Madhya Pradesh',
      suppliers: 12,
      volume: '580 kg',
      quality: 91.7,
      revenue: '₹4.1L',
      growth: '+5%'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Quality Alert',
      message: 'Brahmi batches showing 15% below optimal quality standards',
      timestamp: '2 hours ago',
      action: 'Review suppliers in Gujarat region'
    },
    {
      id: 2,
      type: 'success',
      title: 'Revenue Milestone',
      message: 'Monthly revenue target achieved 5 days early',
      timestamp: '4 hours ago',
      action: 'Adjust targets for next quarter'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Supplier',
      message: '3 new certified suppliers onboarded in Karnataka',
      timestamp: '1 day ago',
      action: 'Schedule initial quality audits'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Logistics Delay',
      message: 'Transportation delays affecting 8% of shipments',
      timestamp: '1 day ago',
      action: 'Optimize route planning'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Badge variant="outline">Live Dashboard</Badge>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Intelligence Dashboard</h1>
          <p className="text-gray-600">Advanced analytics and insights for AyurTrace supply chain network</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
            <TabsTrigger value="products">Product Analytics</TabsTrigger>
            <TabsTrigger value="regional">Regional Performance</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* KPI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {kpiMetrics.map((metric) => {
                const TrendIcon = getTrendIcon(metric.trend);
                return (
                  <Card key={metric.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <metric.icon className={`h-8 w-8 text-${metric.color}-600`} />
                        <div className="flex items-center space-x-1">
                          <TrendIcon className={`h-4 w-4 ${getTrendColor(metric.trend)}`} />
                          <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                      <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
                      <p className="text-xs text-gray-500">{metric.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Revenue Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue analysis and projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Revenue trend visualization</p>
                      <p className="text-xs text-gray-500">Interactive charts showing growth patterns</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">₹28.4L</p>
                      <p className="text-gray-600">This Month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">₹24.1L</p>
                      <p className="text-gray-600">Last Month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">₹32.8L</p>
                      <p className="text-gray-600">Projected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Real-time Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Alerts</CardTitle>
                  <CardDescription>Important notifications and system alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="border rounded-lg p-3">
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            alert.type === 'warning' ? 'bg-yellow-100' :
                            alert.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {alert.type === 'warning' ? (
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            ) : alert.type === 'success' ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{alert.title}</h4>
                            <p className="text-sm text-gray-600">{alert.message}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-500">{alert.timestamp}</span>
                              <Button size="sm" variant="outline" className="text-xs">
                                {alert.action}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Executive Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
                <CardDescription>Key insights and strategic recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Growth Opportunities</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Ashwagandha demand up 25% - expand suppliers</li>
                      <li>• Karnataka region showing strong growth</li>
                      <li>• Export opportunities in 12 new markets</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Areas for Improvement</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Brahmi quality scores below targets</li>
                      <li>• Transportation delays affecting delivery</li>
                      <li>• 3 suppliers need quality support</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Strategic Initiatives</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Implement AI quality prediction</li>
                      <li>• Expand IoT sensor network coverage</li>
                      <li>• Launch farmer training programs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supply-chain" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Supply Chain Flow */}
              <Card>
                <CardHeader>
                  <CardTitle>Supply Chain Performance</CardTitle>
                  <CardDescription>End-to-end efficiency metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplyChainMetrics.map((stage) => (
                      <div key={stage.stage} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <stage.icon className={`h-6 w-6 text-${stage.color}-600`} />
                            <h4 className="font-semibold">{stage.stage}</h4>
                          </div>
                          <Badge variant={stage.issues === 0 ? 'default' : stage.issues <= 2 ? 'secondary' : 'destructive'}>
                            {stage.issues} issues
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Volume</p>
                            <p className="font-medium">{stage.volume}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Efficiency</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={stage.efficiency} className="flex-1" />
                              <span className="font-medium">{stage.efficiency}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600">Locations</p>
                            <p className="font-medium">{stage.locations}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Efficiency Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Trends</CardTitle>
                  <CardDescription>Supply chain optimization over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Efficiency breakdown analysis</p>
                      <p className="text-xs text-gray-500">Interactive charts and trends</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Efficiency</span>
                      <span className="font-medium text-green-600">91.3% ↑</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cost Optimization</span>
                      <span className="font-medium text-blue-600">15.7% ↑</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Time Reduction</span>
                      <span className="font-medium text-purple-600">22.1% ↑</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance Analytics</CardTitle>
                <CardDescription>Detailed analysis of herb categories and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {herbPerformance.map((herb) => {
                    const TrendIcon = getTrendIcon(herb.trend);
                    return (
                      <div key={herb.name} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Leaf className="h-6 w-6 text-green-600" />
                            <h4 className="font-semibold text-lg">{herb.name}</h4>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendIcon className={`h-4 w-4 ${getTrendColor(herb.trend)}`} />
                            <span className={`font-medium ${getTrendColor(herb.trend)}`}>
                              {herb.growth}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Volume</p>
                            <p className="font-medium text-lg">{herb.volume}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Revenue</p>
                            <p className="font-medium text-lg">{herb.revenue}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Quality Score</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={herb.quality} className="flex-1" />
                              <span className="font-medium">{herb.quality}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600">Suppliers</p>
                            <p className="font-medium text-lg">{herb.suppliers}</p>
                          </div>
                          <div>
                            <Button size="sm" variant="outline">View Details</Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Regional Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                  <CardDescription>State-wise supply chain metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionalData.map((region) => (
                      <div key={region.region} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            <h4 className="font-semibold">{region.region}</h4>
                          </div>
                          <span className="text-sm font-medium text-green-600">{region.growth}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Suppliers</p>
                            <p className="font-medium">{region.suppliers}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Volume</p>
                            <p className="font-medium">{region.volume}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Quality</p>
                            <p className="font-medium">{region.quality}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Revenue</p>
                            <p className="font-medium">{region.revenue}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Supply chain coverage across India</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Interactive India map</p>
                      <p className="text-xs text-gray-500">Regional performance visualization</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-green-600">Active States</p>
                      <p className="text-2xl font-bold text-green-800">12</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-blue-600">Total Districts</p>
                      <p className="text-2xl font-bold text-blue-800">78</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictive" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Predictions */}
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Predictions</CardTitle>
                  <CardDescription>Machine learning insights and forecasts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <h4 className="font-semibold">Demand Forecast</h4>
                        <Badge variant="outline">95% Accuracy</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Next 30 days prediction:</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Ashwagandha demand</span>
                          <span className="font-medium text-green-600">↗ +28%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tulsi demand</span>
                          <span className="font-medium text-blue-600">→ Stable</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Brahmi demand</span>
                          <span className="font-medium text-red-600">↘ -12%</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Target className="h-5 w-5 text-orange-600" />
                        <h4 className="font-semibold">Quality Prediction</h4>
                        <Badge variant="outline">92% Accuracy</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Risk assessment for current batches:</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>High Risk Batches</span>
                          <span className="font-medium text-red-600">2</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Medium Risk</span>
                          <span className="font-medium text-yellow-600">5</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Low Risk</span>
                          <span className="font-medium text-green-600">38</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Zap className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold">Optimization Recommendations</h4>
                      </div>
                      <ul className="text-sm space-y-1">
                        <li>• Increase Ashwagandha collection by 30%</li>
                        <li>• Focus quality support on 3 suppliers</li>
                        <li>• Optimize routes to reduce delivery time</li>
                        <li>• Expand testing capacity in Karnataka</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Intelligence */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Intelligence</CardTitle>
                  <CardDescription>External market data and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Market trend analysis</p>
                        <p className="text-xs text-gray-500">Price movements and demand patterns</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-600">Market Growth</p>
                        <p className="text-xl font-bold text-green-800">+24%</p>
                        <p className="text-xs text-green-600">Year over year</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-600">Export Potential</p>
                        <p className="text-xl font-bold text-blue-800">High</p>
                        <p className="text-xs text-blue-600">42 countries</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">Price Optimization</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Ashwagandha optimal price:</span>
                          <span className="font-medium text-green-600">₹2,400/kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue optimization:</span>
                          <span className="font-medium text-blue-600">+12%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}