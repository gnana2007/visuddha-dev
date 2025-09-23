import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useLanguage } from './language/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Wifi, 
  WifiOff,
  Thermometer, 
  Droplets,
  Wind,
  Sun,
  Battery,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  Satellite,
  Radio,
  Smartphone,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Signal,
  Zap
} from 'lucide-react';

interface IoTSensorNetworkProps {
  onBack: () => void;
}

export function IoTSensorNetwork({ onBack }: IoTSensorNetworkProps) {
  const { t } = useLanguage();
  const [sensorData, setSensorData] = useState({
    temperature: 24.5,
    humidity: 65,
    soilMoisture: 45,
    lightIntensity: 78,
    windSpeed: 12,
    rainfall: 0.5
  });

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        soilMoisture: Math.max(20, Math.min(80, prev.soilMoisture + (Math.random() - 0.5) * 3)),
        lightIntensity: Math.max(0, Math.min(100, prev.lightIntensity + (Math.random() - 0.5) * 10)),
        windSpeed: Math.max(0, Math.min(25, prev.windSpeed + (Math.random() - 0.5) * 3)),
        rainfall: Math.max(0, prev.rainfall + (Math.random() - 0.8) * 0.2)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const sensorNodes = [
    {
      id: 'SENS_RAJ_001',
      name: 'Ashwagandha Field Sensor',
      location: 'Village Rampur, Rajasthan',
      coordinates: '19.0760°N, 72.8777°E',
      status: 'Online',
      battery: 85,
      lastUpdate: '30 seconds ago',
      dataPoints: 1247,
      connectivity: 'LoRaWAN',
      signalStrength: 78
    },
    {
      id: 'SENS_KAR_003',
      name: 'Tulsi Farm Monitor',
      location: 'Mysore, Karnataka',
      coordinates: '12.2958°N, 76.6394°E',
      status: 'Online',
      battery: 92,
      lastUpdate: '45 seconds ago',
      dataPoints: 956,
      connectivity: 'NB-IoT',
      signalStrength: 85
    },
    {
      id: 'SENS_GUJ_007',
      name: 'Brahmi Cultivation Sensor',
      location: 'Bhavnagar, Gujarat',
      coordinates: '21.7645°N, 72.1519°E',
      status: 'Warning',
      battery: 23,
      lastUpdate: '5 minutes ago',
      dataPoints: 743,
      connectivity: 'GSM',
      signalStrength: 45
    },
    {
      id: 'SENS_MP_012',
      name: 'Neem Grove Monitor',
      location: 'Indore, Madhya Pradesh',
      coordinates: '22.7196°N, 75.8577°E',
      status: 'Offline',
      battery: 0,
      lastUpdate: '2 hours ago',
      dataPoints: 0,
      connectivity: 'Offline',
      signalStrength: 0
    },
    {
      id: 'SENS_TN_018',
      name: 'Turmeric Field Sensor',
      location: 'Erode, Tamil Nadu',
      coordinates: '11.3410°N, 77.7172°E',
      status: 'Online',
      battery: 67,
      lastUpdate: '1 minute ago',
      dataPoints: 834,
      connectivity: 'WiFi',
      signalStrength: 92
    },
    {
      id: 'SENS_WB_023',
      name: 'Amla Orchard Monitor',
      location: 'Bolpur, West Bengal',
      coordinates: '23.6629°N, 87.7193°E',
      status: 'Online',
      battery: 78,
      lastUpdate: '2 minutes ago',
      dataPoints: 1089,
      connectivity: 'Satellite',
      signalStrength: 65
    }
  ];

  const environmentalData = [
    {
      parameter: 'Temperature',
      value: sensorData.temperature.toFixed(1),
      unit: '°C',
      status: 'optimal',
      threshold: '20-30°C',
      icon: Thermometer,
      trend: 'stable'
    },
    {
      parameter: 'Humidity',
      value: sensorData.humidity.toFixed(0),
      unit: '%',
      status: 'optimal',
      threshold: '60-80%',
      icon: Droplets,
      trend: 'increasing'
    },
    {
      parameter: 'Soil Moisture',
      value: sensorData.soilMoisture.toFixed(0),
      unit: '%',
      status: 'optimal',
      threshold: '40-70%',
      icon: Droplets,
      trend: 'stable'
    },
    {
      parameter: 'Light Intensity',
      value: sensorData.lightIntensity.toFixed(0),
      unit: '%',
      status: 'optimal',
      threshold: '70-90%',
      icon: Sun,
      trend: 'decreasing'
    },
    {
      parameter: 'Wind Speed',
      value: sensorData.windSpeed.toFixed(1),
      unit: 'km/h',
      status: 'optimal',
      threshold: '5-20 km/h',
      icon: Wind,
      trend: 'stable'
    },
    {
      parameter: 'Rainfall',
      value: sensorData.rainfall.toFixed(1),
      unit: 'mm',
      status: 'optimal',
      threshold: '0-5 mm/day',
      icon: Droplets,
      trend: 'stable'
    }
  ];

  const networkStats = [
    { metric: 'Active Sensors', value: '156', change: '+3' },
    { metric: 'Data Points/Hour', value: '9,847', change: '+12%' },
    { metric: 'Network Uptime', value: '99.2%', change: '+0.3%' },
    { metric: 'Avg Battery Level', value: '74%', change: '-2%' },
    { metric: 'Coverage Area', value: '2,340 km²', change: '+45 km²' },
    { metric: 'Alert Response', value: '2.3 min', change: '-30s' }
  ];

  const recentAlerts = [
    {
      id: 'ALT_001',
      sensor: 'SENS_GUJ_007',
      type: 'Low Battery',
      severity: 'Warning',
      message: 'Battery level below 25%',
      timestamp: '2024-01-18 16:42:00',
      status: 'Active'
    },
    {
      id: 'ALT_002',
      sensor: 'SENS_MP_012',
      type: 'Connection Lost',
      severity: 'Critical',
      message: 'Sensor offline for 2 hours',
      timestamp: '2024-01-18 14:30:00',
      status: 'Active'
    },
    {
      id: 'ALT_003',
      sensor: 'SENS_RAJ_001',
      type: 'Temperature Alert',
      severity: 'Medium',
      message: 'Temperature exceeded optimal range',
      timestamp: '2024-01-18 13:15:00',
      status: 'Resolved'
    },
    {
      id: 'ALT_004',
      sensor: 'SENS_TN_018',
      type: 'Soil Moisture',
      severity: 'Low',
      message: 'Soil moisture below threshold',
      timestamp: '2024-01-18 12:30:00',
      status: 'Resolved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'text-green-600';
      case 'Warning': return 'text-yellow-600';
      case 'Offline': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Online': return 'default';
      case 'Warning': return 'secondary';
      case 'Offline': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">156 Active Sensors</Badge>
            <span className="text-sm text-gray-600">IoT Network v3.2</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IoT Sensor Network</h1>
          <p className="text-gray-600">Real-time environmental monitoring and automated data collection</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Network Overview</TabsTrigger>
            <TabsTrigger value="sensors">Sensor Nodes</TabsTrigger>
            <TabsTrigger value="data">Environmental Data</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Network Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {networkStats.map((stat) => (
                <Card key={stat.metric}>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600">{stat.metric}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${
                      stat.change.startsWith('+') ? 'text-green-600' : 
                      stat.change.startsWith('-') && !stat.change.includes('%') ? 'text-red-600' : 
                      'text-blue-600'
                    }`}>
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Real-time Environmental Data */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Environmental Conditions</CardTitle>
                  <CardDescription>Aggregated data from all active sensors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {environmentalData.slice(0, 4).map((data) => (
                      <div key={data.parameter} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <data.icon className="h-5 w-5 text-blue-600" />
                          <Badge variant="outline" className="text-xs">
                            {data.trend}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{data.parameter}</p>
                        <p className="text-xl font-bold">{data.value}{data.unit}</p>
                        <p className="text-xs text-gray-500">Target: {data.threshold}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Network Coverage Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Sensor Network Coverage</CardTitle>
                  <CardDescription>Geographic distribution of IoT sensors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Interactive sensor coverage map</p>
                      <p className="text-xs text-gray-500">156 sensors across 5 states</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-50 p-2 rounded text-center">
                      <p className="text-xs text-green-600">Online</p>
                      <p className="font-bold text-green-800">142</p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded text-center">
                      <p className="text-xs text-yellow-600">Warning</p>
                      <p className="font-bold text-yellow-800">11</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded text-center">
                      <p className="text-xs text-red-600">Offline</p>
                      <p className="font-bold text-red-800">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Network Management</CardTitle>
                <CardDescription>Common sensor network operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="h-16 flex flex-col items-center justify-center">
                    <RefreshCw className="h-6 w-6 mb-2" />
                    <span>Sync All Sensors</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                    <Download className="h-6 w-6 mb-2" />
                    <span>Export Data</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                    <Upload className="h-6 w-6 mb-2" />
                    <span>Update Firmware</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                    <Settings className="h-6 w-6 mb-2" />
                    <span>Configure Network</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sensors" className="mt-6">
            <div className="space-y-4">
              {sensorNodes.map((sensor) => (
                <Card key={sensor.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{sensor.name}</h3>
                        <p className="text-sm text-gray-600">{sensor.id}</p>
                        <p className="text-sm text-gray-500">{sensor.location}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusBadge(sensor.status)}>
                          {sensor.status}
                        </Badge>
                        {sensor.status === 'Online' ? (
                          <Wifi className="h-4 w-4 text-green-600" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Battery</p>
                        <div className="flex items-center space-x-2">
                          <Battery className={`h-4 w-4 ${
                            sensor.battery > 50 ? 'text-green-600' :
                            sensor.battery > 25 ? 'text-yellow-600' : 'text-red-600'
                          }`} />
                          <span className="font-medium">{sensor.battery}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Update</p>
                        <p className="font-medium">{sensor.lastUpdate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Data Points</p>
                        <p className="font-medium">{sensor.dataPoints.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Connectivity</p>
                        <p className="font-medium">{sensor.connectivity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Signal</p>
                        <div className="flex items-center space-x-2">
                          <Signal className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{sensor.signalStrength}%</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Monitor</Button>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600 mb-1">GPS Coordinates</p>
                      <p className="font-mono text-sm">{sensor.coordinates}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Environmental Parameters */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Environmental Readings</CardTitle>
                  <CardDescription>Real-time data from sensor network</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {environmentalData.map((data) => (
                      <div key={data.parameter} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <data.icon className="h-5 w-5 text-blue-600" />
                            <h4 className="font-medium">{data.parameter}</h4>
                          </div>
                          <Badge variant="outline">{data.status}</Badge>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-2xl font-bold">{data.value}{data.unit}</p>
                            <p className="text-sm text-gray-600">Target: {data.threshold}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Trend</p>
                            <p className={`text-sm font-medium ${
                              data.trend === 'increasing' ? 'text-green-600' :
                              data.trend === 'decreasing' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {data.trend}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Data Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Analytics</CardTitle>
                  <CardDescription>Historical trends and predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Environmental data charts</p>
                        <p className="text-xs text-gray-500">Temperature, humidity, and soil conditions</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-600">Data Quality</p>
                        <p className="text-xl font-bold text-blue-800">97.3%</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-600">Collection Rate</p>
                        <p className="text-xl font-bold text-green-800">98.7%</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">AI Predictions</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Optimal harvest conditions:</span>
                          <span className="text-green-600">3-5 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Weather impact risk:</span>
                          <span className="text-yellow-600">Low</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Irrigation requirement:</span>
                          <span className="text-blue-600">2 days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                  <CardDescription>Current sensor alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            {alert.severity === 'Critical' ? (
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            ) : alert.severity === 'Warning' ? (
                              <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-blue-600" />
                            )}
                            <h4 className="font-medium">{alert.type}</h4>
                          </div>
                          <Badge variant={
                            alert.severity === 'Critical' ? 'destructive' :
                            alert.severity === 'Warning' ? 'secondary' : 'outline'
                          }>
                            {alert.severity}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Sensor: {alert.sensor}</span>
                          <span className="text-gray-500">{alert.timestamp}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <Badge variant={alert.status === 'Active' ? 'destructive' : 'default'}>
                            {alert.status}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Acknowledge</Button>
                            <Button size="sm" variant="outline">Resolve</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance & Calibration</CardTitle>
                  <CardDescription>Scheduled maintenance and sensor calibration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Upcoming Maintenance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Battery Replacement</p>
                            <p className="text-sm text-gray-600">SENS_GUJ_007</p>
                          </div>
                          <Badge variant="secondary">Tomorrow</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Calibration Check</p>
                            <p className="text-sm text-gray-600">SENS_TN_018</p>
                          </div>
                          <Badge variant="outline">3 days</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Firmware Update</p>
                            <p className="text-sm text-gray-600">All sensors</p>
                          </div>
                          <Badge variant="outline">1 week</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Sensor Health Status</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Excellent</span>
                          <span className="text-sm font-medium text-green-600">128 sensors</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Good</span>
                          <span className="text-sm font-medium text-blue-600">24 sensors</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Needs Attention</span>
                          <span className="text-sm font-medium text-yellow-600">4 sensors</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                        <Zap className="h-6 w-6 mb-1" />
                        <span className="text-sm">Run Diagnostics</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                        <Settings className="h-6 w-6 mb-1" />
                        <span className="text-sm">Schedule Maintenance</span>
                      </Button>
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