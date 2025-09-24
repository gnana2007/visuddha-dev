import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  MapPin, 
  Leaf, 
  Factory,
  Truck,
  Store,
  Globe,
  Navigation,
  Filter,
  Search,
  Eye,
  Layers,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Route,
  Satellite,
  BarChart3,
  TrendingUp,
  Target,
  Users,
  Package,
  Shield
} from 'lucide-react';
import { useLanguage } from './language/language-context';

interface SupplyChainVisualizationProps {
  onBack: () => void;
}

export function SupplyChainVisualization({ onBack }: SupplyChainVisualizationProps) {
  const { t } = useLanguage();
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapView, setMapView] = useState('satellite');
  const [trackingBatch, setTrackingBatch] = useState('BATCH_ASH_2024_003');

  // Simulated supply chain nodes
  const supplyChainNodes = [
    {
      id: 'farm_001',
      type: 'collection',
      name: 'Ramesh Kumar Farm',
      location: 'Rampur Village, Rajasthan',
      coordinates: { lat: 27.0238, lng: 74.2179 },
      status: 'active',
      capacity: '150 kg/month',
      quality: 96.2,
      herbs: ['Ashwagandha', 'Neem'],
      certifications: ['Organic', 'AYUSH'],
      lastActivity: '2 hours ago'
    },
    {
      id: 'farm_002',
      type: 'collection',
      name: 'Priya Sharma Farm',
      location: 'Mysore, Karnataka',
      coordinates: { lat: 12.2958, lng: 76.6394 },
      status: 'active',
      capacity: '200 kg/month',
      quality: 94.8,
      herbs: ['Tulsi', 'Brahmi'],
      certifications: ['Organic'],
      lastActivity: '1 hour ago'
    },
    {
      id: 'processing_001',
      type: 'processing',
      name: 'AyurLife Processing Facility',
      location: 'Jaipur, Rajasthan',
      coordinates: { lat: 26.9124, lng: 75.7873 },
      status: 'active',
      capacity: '2000 kg/month',
      efficiency: 92.5,
      batches: 23,
      certifications: ['GMP', 'ISO 22000'],
      lastActivity: '30 minutes ago'
    },
    {
      id: 'lab_001',
      type: 'laboratory',
      name: 'Central Ayurveda Lab',
      location: 'Delhi, India',
      coordinates: { lat: 28.7041, lng: 77.1025 },
      status: 'active',
      capacity: '100 samples/day',
      accuracy: 98.7,
      pending: 12,
      certifications: ['NABL', 'AYUSH'],
      lastActivity: '15 minutes ago'
    },
    {
      id: 'warehouse_001',
      type: 'warehouse',
      name: 'Regional Distribution Center',
      location: 'Mumbai, Maharashtra',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      status: 'active',
      capacity: '10000 kg',
      utilization: 78,
      orders: 45,
      certifications: ['FSSAI'],
      lastActivity: '5 minutes ago'
    }
  ];

  // Simulated batch tracking data
  const batchJourney = [
    {
      stage: 'Collection',
      location: 'Rampur Village, Rajasthan',
      timestamp: '2024-01-15 08:30',
      status: 'completed',
      details: 'Ashwagandha roots collected - 25kg',
      operator: 'Ramesh Kumar',
      verification: 'GPS + Photos + Quality Check'
    },
    {
      stage: 'Transportation',
      location: 'En route to Jaipur',
      timestamp: '2024-01-15 14:20',
      status: 'completed',
      details: 'Cold chain transport initiated',
      operator: 'LogiTrans Services',
      verification: 'Temperature monitoring'
    },
    {
      stage: 'Processing',
      location: 'AyurLife Facility, Jaipur',
      timestamp: '2024-01-16 09:15',
      status: 'completed',
      details: 'Cleaning, drying, and powder processing',
      operator: 'Processing Team Alpha',
      verification: 'Batch documentation + QC'
    },
    {
      stage: 'Quality Testing',
      location: 'Central Ayurveda Lab, Delhi',
      timestamp: '2024-01-17 11:45',
      status: 'completed',
      details: 'Moisture, purity, and contamination tests',
      operator: 'Lab Technician Sharma',
      verification: 'Digital certificates'
    },
    {
      stage: 'Packaging',
      location: 'AyurLife Facility, Jaipur',
      timestamp: '2024-01-18 10:30',
      status: 'in_progress',
      details: 'Final packaging with QR codes',
      operator: 'Packaging Team Beta',
      verification: 'Blockchain record update'
    },
    {
      stage: 'Distribution',
      location: 'Regional Center, Mumbai',
      timestamp: '2024-01-19 08:00',
      status: 'pending',
      details: 'Awaiting distribution to retailers',
      operator: 'Distribution Manager',
      verification: 'Final quality seal'
    }
  ];

  const routeData = [
    {
      id: 'route_001',
      name: 'Rajasthan Collection Route',
      type: 'collection',
      efficiency: 94.2,
      distance: '245 km',
      time: '4.5 hours',
      cost: '₹2,340',
      nodes: 8,
      status: 'optimal'
    },
    {
      id: 'route_002',
      name: 'Processing Transport Route',
      type: 'transport',
      efficiency: 88.7,
      distance: '180 km',
      time: '3.2 hours',
      cost: '₹1,890',
      nodes: 3,
      status: 'suboptimal'
    },
    {
      id: 'route_003',
      name: 'Distribution Network',
      type: 'distribution',
      efficiency: 91.5,
      distance: '1,250 km',
      time: '18 hours',
      cost: '₹8,500',
      nodes: 15,
      status: 'optimal'
    }
  ];

  const regionalStats = [
    {
      region: 'North India',
      states: ['Rajasthan', 'Punjab', 'Haryana'],
      suppliers: 67,
      volume: '2,340 kg',
      quality: 94.8,
      growth: '+18%'
    },
    {
      region: 'South India',
      states: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh'],
      suppliers: 54,
      volume: '1,890 kg',
      quality: 92.3,
      growth: '+15%'
    },
    {
      region: 'West India',
      states: ['Gujarat', 'Maharashtra'],
      suppliers: 42,
      volume: '1,560 kg',
      quality: 95.1,
      growth: '+12%'
    },
    {
      region: 'East India',
      states: ['West Bengal', 'Odisha'],
      suppliers: 23,
      volume: '890 kg',
      quality: 91.7,
      growth: '+8%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'inactive': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'collection': return Leaf;
      case 'processing': return Factory;
      case 'laboratory': return Shield;
      case 'warehouse': return Store;
      case 'transport': return Truck;
      default: return MapPin;
    }
  };

  const getStageStatus = (status: string) => {
    switch (status) {
      case 'completed': return { icon: CheckCircle, color: 'text-green-600' };
      case 'in_progress': return { icon: Clock, color: 'text-blue-600' };
      case 'pending': return { icon: AlertTriangle, color: 'text-yellow-600' };
      default: return { icon: Clock, color: 'text-gray-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
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
                value={selectedLayer}
                onChange={(e) => setSelectedLayer(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Nodes</option>
                <option value="collection">Collection Points</option>
                <option value="processing">Processing Facilities</option>
                <option value="laboratory">Testing Labs</option>
                <option value="warehouse">Warehouses</option>
              </select>
            </div>
            <Badge variant="outline">Live Tracking</Badge>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supply Chain Visualization</h1>
          <p className="text-gray-600">Interactive mapping and real-time tracking of the Ayurvedic herb supply chain</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="map">Interactive Map</TabsTrigger>
            <TabsTrigger value="tracking">Batch Tracking</TabsTrigger>
            <TabsTrigger value="routes">Route Optimization</TabsTrigger>
            <TabsTrigger value="analytics">Regional Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Map View */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Supply Chain Network Map</CardTitle>
                        <CardDescription>Real-time visualization of all supply chain nodes</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant={mapView === 'satellite' ? 'default' : 'outline'}
                          onClick={() => setMapView('satellite')}
                        >
                          <Satellite className="h-4 w-4 mr-1" />
                          Satellite
                        </Button>
                        <Button 
                          size="sm" 
                          variant={mapView === 'terrain' ? 'default' : 'outline'}
                          onClick={() => setMapView('terrain')}
                        >
                          <Layers className="h-4 w-4 mr-1" />
                          Terrain
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-green-100 to-blue-100 h-96 rounded-lg relative overflow-hidden">
                      {/* Simulated Map Interface */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Interactive India Map</p>
                          <p className="text-sm text-gray-500">
                            Showing {supplyChainNodes.length} active nodes across the supply chain
                          </p>
                        </div>
                      </div>

                      {/* Simulated Node Markers */}
                      <div className="absolute top-20 left-24">
                        <div className="bg-green-500 w-4 h-4 rounded-full animate-pulse"></div>
                        <div className="text-xs bg-white px-2 py-1 rounded shadow-sm mt-1">Rajasthan</div>
                      </div>
                      <div className="absolute top-32 right-32">
                        <div className="bg-blue-500 w-4 h-4 rounded-full animate-pulse"></div>
                        <div className="text-xs bg-white px-2 py-1 rounded shadow-sm mt-1">Karnataka</div>
                      </div>
                      <div className="absolute bottom-32 left-1/3">
                        <div className="bg-purple-500 w-4 h-4 rounded-full animate-pulse"></div>
                        <div className="text-xs bg-white px-2 py-1 rounded shadow-sm mt-1">Delhi</div>
                      </div>
                      <div className="absolute bottom-20 right-24">
                        <div className="bg-orange-500 w-4 h-4 rounded-full animate-pulse"></div>
                        <div className="text-xs bg-white px-2 py-1 rounded shadow-sm mt-1">Mumbai</div>
                      </div>

                      {/* Legend */}
                      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-sm">
                        <h4 className="font-medium text-sm mb-2">Legend</h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Collection Points</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>Processing Facilities</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span>Testing Labs</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span>Distribution Centers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Node Details Panel */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Network Nodes</CardTitle>
                    <CardDescription>Active supply chain participants</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {supplyChainNodes.map((node) => {
                        const NodeIcon = getNodeIcon(node.type);
                        return (
                          <div key={node.id} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-start space-x-3">
                              <NodeIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{node.name}</h4>
                                <p className="text-xs text-gray-600">{node.location}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {node.type}
                                  </Badge>
                                  <span className={`text-xs ${getStatusColor(node.status)}`}>
                                    {node.status}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{node.lastActivity}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Batch Journey Timeline */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Batch Journey Tracking</CardTitle>
                        <CardDescription>Complete traceability of batch {trackingBatch}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-gray-500" />
                        <input 
                          type="text" 
                          placeholder="Enter batch ID"
                          value={trackingBatch}
                          onChange={(e) => setTrackingBatch(e.target.value)}
                          className="text-sm border rounded px-2 py-1 w-40"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {batchJourney.map((stage, index) => {
                        const { icon: StatusIcon, color } = getStageStatus(stage.status);
                        return (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                stage.status === 'completed' ? 'bg-green-100' :
                                stage.status === 'in_progress' ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                <StatusIcon className={`h-4 w-4 ${color}`} />
                              </div>
                              {index < batchJourney.length - 1 && (
                                <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{stage.stage}</h4>
                                <Badge variant={
                                  stage.status === 'completed' ? 'default' :
                                  stage.status === 'in_progress' ? 'secondary' : 'outline'
                                }>
                                  {stage.status.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{stage.details}</p>
                              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                                <div>
                                  <span className="font-medium">Location:</span> {stage.location}
                                </div>
                                <div>
                                  <span className="font-medium">Time:</span> {stage.timestamp}
                                </div>
                                <div>
                                  <span className="font-medium">Operator:</span> {stage.operator}
                                </div>
                                <div>
                                  <span className="font-medium">Verification:</span> {stage.verification}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Batch Information */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Batch Information</CardTitle>
                    <CardDescription>Details for {trackingBatch}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium mb-2">Product Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Species:</span>
                            <span className="font-medium">Ashwagandha</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quantity:</span>
                            <span className="font-medium">25 kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quality Grade:</span>
                            <span className="font-medium text-green-600">Premium</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Origin:</span>
                            <span className="font-medium">Rajasthan</span>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium mb-2">Quality Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Moisture Content:</span>
                            <span className="font-medium">8.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Purity:</span>
                            <span className="font-medium text-green-600">98.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Contamination:</span>
                            <span className="font-medium text-green-600">None</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Overall Score:</span>
                            <span className="font-medium text-green-600">96.2/100</span>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium mb-2">Certifications</h4>
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs mr-1">Organic</Badge>
                          <Badge variant="outline" className="text-xs mr-1">AYUSH</Badge>
                          <Badge variant="outline" className="text-xs mr-1">GMP</Badge>
                          <Badge variant="outline" className="text-xs">FSSAI</Badge>
                        </div>
                      </div>

                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium mb-2">Blockchain Verification</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Block Height:</span>
                            <span className="font-medium">2,341</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Transaction ID:</span>
                            <span className="font-medium font-mono text-xs">0x8f9e...abc</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Verified:</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="routes" className="mt-6">
            <div className="space-y-6">
              {/* Route Optimization */}
              <Card>
                <CardHeader>
                  <CardTitle>Route Optimization</CardTitle>
                  <CardDescription>AI-powered route planning and optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {routeData.map((route) => (
                      <div key={route.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-3">
                            <Route className="h-6 w-6 text-blue-600" />
                            <div>
                              <h4 className="font-semibold">{route.name}</h4>
                              <p className="text-sm text-gray-600">{route.type} route</p>
                            </div>
                          </div>
                          <Badge variant={route.status === 'optimal' ? 'default' : 'secondary'}>
                            {route.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Efficiency</p>
                            <p className="font-medium text-lg">{route.efficiency}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Distance</p>
                            <p className="font-medium">{route.distance}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Time</p>
                            <p className="font-medium">{route.time}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Cost</p>
                            <p className="font-medium">{route.cost}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Nodes</p>
                            <p className="font-medium">{route.nodes}</p>
                          </div>
                        </div>

                        {route.status === 'suboptimal' && (
                          <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Zap className="h-4 w-4 text-yellow-600" />
                              <p className="text-sm text-yellow-800">
                                AI suggests 15% efficiency improvement by adjusting pickup schedule
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Route Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Route Visualization</CardTitle>
                    <CardDescription>Geographic route mapping</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Interactive route visualization</p>
                        <p className="text-xs text-gray-500">Optimized paths and waypoints</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Route Analytics</CardTitle>
                    <CardDescription>Performance metrics and optimization suggestions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-green-600">Fuel Savings</p>
                          <p className="text-xl font-bold text-green-800">18%</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-blue-600">Time Reduction</p>
                          <p className="text-xl font-bold text-blue-800">22%</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium mb-2">Optimization Recommendations</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Consolidate pickups in Rajasthan region</li>
                          <li>• Use alternative route during monsoon</li>
                          <li>• Add waypoint in Gujarat for efficiency</li>
                          <li>• Schedule maintenance during low seasons</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Regional Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance Analysis</CardTitle>
                  <CardDescription>State-wise supply chain metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionalStats.map((region) => (
                      <div key={region.region} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{region.region}</h4>
                            <p className="text-sm text-gray-600">{region.states.join(', ')}</p>
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
                            <Button size="sm" variant="outline">Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle>Supply Chain Analytics</CardTitle>
                  <CardDescription>Key performance indicators and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Regional performance charts</p>
                        <p className="text-xs text-gray-500">Interactive analytics and trends</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-blue-600">Network Coverage</p>
                        <p className="text-xl font-bold text-blue-800">78%</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-purple-600">Efficiency Score</p>
                        <p className="text-xl font-bold text-purple-800">92.4%</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">Growth Opportunities</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Expand collection network in East India</li>
                        <li>• Add processing facility in South India</li>
                        <li>• Improve logistics in remote areas</li>
                        <li>• Increase quality support programs</li>
                      </ul>
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