import { useState } from 'react';
import { Button } from './ui/button';
import { useLanguage } from './language/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  MapPin, 
  Package,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Globe,
  Leaf,
  Factory,
  FlaskConical,
  Download,
  Filter,
  Calendar
} from 'lucide-react';

interface StakeholderDashboardProps {
  onBack: () => void;
}

export function StakeholderDashboard({ onBack }: StakeholderDashboardProps) {
  const { t } = useLanguage();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  const overviewMetrics = [
    {
      title: 'Total Batches Tracked',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Active Collectors',
      value: '89',
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Quality Pass Rate',
      value: '98.5%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Supply Chain Violations',
      value: '3',
      change: '-50%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const recentActivities = [
    {
      type: 'collection',
      message: 'New collection event recorded in Rajasthan',
      details: 'BATCH_ASH_2024_004 - 150kg Ashwagandha',
      timestamp: '2 hours ago',
      icon: Leaf,
      status: 'success'
    },
    {
      type: 'processing',
      message: 'Processing completed for BATCH_TUL_2024_011',
      details: 'Moved to quality testing phase',
      timestamp: '4 hours ago',
      icon: Factory,
      status: 'info'
    },
    {
      type: 'quality',
      message: 'Quality test results uploaded',
      details: 'BATCH_BRA_2024_007 - All tests passed',
      timestamp: '6 hours ago',
      icon: FlaskConical,
      status: 'success'
    },
    {
      type: 'alert',
      message: 'Moisture level alert for BATCH_ASH_2024_003',
      details: 'Requires immediate attention',
      timestamp: '8 hours ago',
      icon: AlertTriangle,
      status: 'warning'
    },
    {
      type: 'compliance',
      message: 'Smart contract validation completed',
      details: 'All geo-fencing rules verified',
      timestamp: '10 hours ago',
      icon: Shield,
      status: 'success'
    }
  ];

  const supplyChainNodes = [
    {
      name: 'Collectors',
      active: 89,
      total: 95,
      efficiency: 94,
      location: 'Various Villages',
      status: 'operational'
    },
    {
      name: 'Processing Facilities',
      active: 12,
      total: 15,
      efficiency: 92,
      location: 'Regional Centers',
      status: 'operational'
    },
    {
      name: 'Testing Labs',
      active: 5,
      total: 6,
      efficiency: 96,
      location: 'Certified Labs',
      status: 'operational'
    },
    {
      name: 'Distribution Centers',
      active: 8,
      total: 10,
      efficiency: 88,
      location: 'Urban Hubs',
      status: 'operational'
    }
  ];

  const topCollectors = [
    {
      name: 'Ramesh Kumar',
      id: 'COL_2024_001',
      location: 'Rajasthan',
      collections: 45,
      quality: 98,
      sustainability: 95
    },
    {
      name: 'Priya Sharma',
      id: 'COL_2024_015',
      location: 'Karnataka',
      collections: 38,
      quality: 97,
      sustainability: 92
    },
    {
      name: 'Amit Patel',
      id: 'COL_2024_007',
      location: 'Gujarat',
      collections: 42,
      quality: 96,
      sustainability: 94
    },
    {
      name: 'Sunita Devi',
      id: 'COL_2024_023',
      location: 'Madhya Pradesh',
      collections: 35,
      quality: 99,
      sustainability: 97
    }
  ];

  const complianceMetrics = [
    {
      category: 'Geographic Compliance',
      score: 98,
      violations: 2,
      details: 'All collections within approved zones'
    },
    {
      category: 'Seasonal Restrictions',
      score: 96,
      violations: 1,
      details: 'One off-season collection reported'
    },
    {
      category: 'Quality Standards',
      score: 99,
      violations: 0,
      details: 'All batches meet quality requirements'
    },
    {
      category: 'Sustainability Limits',
      score: 94,
      violations: 3,
      details: 'Minor quota exceedances in 3 regions'
    }
  ];

  const blockchainStats = [
    { metric: 'Total Transactions', value: '15,847' },
    { metric: 'Blocks Generated', value: '2,341' },
    { metric: 'Network Nodes', value: '127' },
    { metric: 'Average Block Time', value: '4.2s' },
    { metric: 'Network Uptime', value: '99.97%' },
    { metric: 'Data Integrity', value: '100%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 p-4">
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
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            <Badge variant="outline">Live Dashboard</Badge>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stakeholder Dashboard</h1>
          <p className="text-gray-600">Real-time insights into the Ayurvedic supply chain network</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {overviewMetrics.map((metric) => (
                <Card key={metric.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{metric.title}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <div className="flex items-center mt-1">
                          {metric.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span className={`text-sm ${
                            metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                      <metric.icon className={`h-8 w-8 text-${metric.color}-600`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest events across the supply chain</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.status === 'success' ? 'bg-green-100' :
                          activity.status === 'warning' ? 'bg-yellow-100' :
                          activity.status === 'info' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <activity.icon className={`h-4 w-4 ${
                            activity.status === 'success' ? 'text-green-600' :
                            activity.status === 'warning' ? 'text-yellow-600' :
                            activity.status === 'info' ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.message}</p>
                          <p className="text-sm text-gray-600">{activity.details}</p>
                          <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Network Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Network Status</CardTitle>
                  <CardDescription>Real-time status of supply chain nodes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplyChainNodes.map((node) => (
                      <div key={node.name} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{node.name}</h4>
                          <Badge variant="default">Online</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Active</p>
                            <p className="font-medium">{node.active}/{node.total}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Efficiency</p>
                            <p className="font-medium">{node.efficiency}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Status</p>
                            <p className="font-medium text-green-600 capitalize">{node.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="supply-chain" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performing Collectors */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Collectors</CardTitle>
                  <CardDescription>Collectors ranked by performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCollectors.map((collector, index) => (
                      <div key={collector.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{collector.name}</h4>
                            <p className="text-sm text-gray-600">{collector.id}</p>
                          </div>
                          <div className="text-right">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Collections</p>
                            <p className="font-medium">{collector.collections}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Quality Score</p>
                            <p className="font-medium">{collector.quality}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Sustainability</p>
                            <p className="font-medium">{collector.sustainability}%</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center">
                          <MapPin className="h-3 w-3 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">{collector.location}</span>
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
                  <CardDescription>Collection activities by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Collection Heatmap</h4>
                      <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Interactive map showing collection density</p>
                          <p className="text-xs text-gray-500">Real-time GPS coordinates from collectors</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-600">High Activity Zones</p>
                        <p className="font-semibold text-green-800">15 Regions</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm text-yellow-600">Moderate Activity</p>
                        <p className="font-semibold text-yellow-800">8 Regions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compliance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Monitoring</CardTitle>
                  <CardDescription>Real-time compliance status across all parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceMetrics.map((metric) => (
                      <div key={metric.category} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{metric.category}</h4>
                          <Badge variant={metric.score >= 95 ? 'default' : metric.score >= 90 ? 'secondary' : 'destructive'}>
                            {metric.score}%
                          </Badge>
                        </div>
                        <Progress value={metric.score} className="mb-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{metric.details}</span>
                          <span className={`font-medium ${metric.violations === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.violations} violations
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Regulatory Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Status</CardTitle>
                  <CardDescription>Compliance with government regulations and standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">AYUSH Ministry Guidelines</h4>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Fully compliant with medicinal plant board regulations</p>
                      <p className="text-xs text-gray-500 mt-1">Last audit: January 15, 2024</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">WHO-GMP Standards</h4>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Good Manufacturing Practices certification valid</p>
                      <p className="text-xs text-gray-500 mt-1">Expires: December 31, 2024</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Export Compliance</h4>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Meeting international export requirements</p>
                      <p className="text-xs text-gray-500 mt-1">142 countries approved</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Environmental Standards</h4>
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      </div>
                      <p className="text-sm text-gray-600">Minor sustainability targets pending</p>
                      <p className="text-xs text-gray-500 mt-1">3 regions require attention</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Collection Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Collection Trends</CardTitle>
                  <CardDescription>Volume and quality trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Interactive collection volume chart</p>
                        <p className="text-xs text-gray-500">Showing trends for selected time period</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Total Volume</p>
                        <p className="text-xl font-bold">2.4T</p>
                        <p className="text-xs text-green-600">+15% vs last period</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Avg Quality</p>
                        <p className="text-xl font-bold">96.8%</p>
                        <p className="text-xs text-green-600">+2.1% vs last period</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Species Count</p>
                        <p className="text-xl font-bold">24</p>
                        <p className="text-xs text-blue-600">3 new species</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Predictive Analytics</CardTitle>
                  <CardDescription>AI-powered insights and forecasting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Demand Forecast</h4>
                      <p className="text-sm text-gray-600 mb-2">Next 30 days prediction</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Ashwagandha</span>
                          <span className="font-medium">↗ +25% demand</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tulsi</span>
                          <span className="font-medium">→ Stable demand</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Brahmi</span>
                          <span className="font-medium">↘ -10% demand</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Quality Predictions</h4>
                      <p className="text-sm text-gray-600 mb-2">Risk assessment for current batches</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>High Risk Batches</span>
                          <span className="font-medium text-red-600">2</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Medium Risk</span>
                          <span className="font-medium text-yellow-600">5</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Low Risk</span>
                          <span className="font-medium text-green-600">38</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Sustainability Alerts</h4>
                      <p className="text-sm text-gray-600 mb-2">Environmental monitoring insights</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                          <span>Collection quota 80% reached in 3 regions</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>Seasonal restrictions automatically enforced</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blockchain" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Blockchain Network Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Network Statistics</CardTitle>
                  <CardDescription>Real-time blockchain performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {blockchainStats.map((stat) => (
                      <div key={stat.metric} className="border rounded-lg p-3">
                        <p className="text-sm text-gray-600">{stat.metric}</p>
                        <p className="text-lg font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Blockchain Transactions</CardTitle>
                  <CardDescription>Latest supply chain events on the blockchain</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Collection Event</p>
                        <span className="text-xs text-gray-500">Block #2341</span>
                      </div>
                      <p className="text-sm text-gray-600">BATCH_ASH_2024_004 recorded</p>
                      <p className="text-xs text-gray-500 font-mono">Hash: 0x9f8e7d6c...</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Quality Test</p>
                        <span className="text-xs text-gray-500">Block #2340</span>
                      </div>
                      <p className="text-sm text-gray-600">Lab results for LAB_TUL_005</p>
                      <p className="text-xs text-gray-500 font-mono">Hash: 0x8e7d6c5b...</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Smart Contract</p>
                        <span className="text-xs text-gray-500">Block #2339</span>
                      </div>
                      <p className="text-sm text-gray-600">Compliance validation executed</p>
                      <p className="text-xs text-gray-500 font-mono">Hash: 0x7d6c5b4a...</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Processing Step</p>
                        <span className="text-xs text-gray-500">Block #2338</span>
                      </div>
                      <p className="text-sm text-gray-600">Drying completed for BATCH_BRA_2024_007</p>
                      <p className="text-xs text-gray-500 font-mono">Hash: 0x6c5b4a39...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export Options */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Data Export & Reporting</CardTitle>
                <CardDescription>Generate reports and export data for stakeholders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Download className="h-6 w-6 mb-2" />
                    <span>Supply Chain Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Download className="h-6 w-6 mb-2" />
                    <span>Compliance Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Download className="h-6 w-6 mb-2" />
                    <span>Blockchain Audit Trail</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}