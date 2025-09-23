import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from './language/language-context';
import { 
  ArrowLeft, 
  Package, 
  Thermometer, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Factory,
  Truck,
  Scale
} from 'lucide-react';

interface ProcessingDashboardProps {
  onBack: () => void;
}

export function ProcessingDashboard({ onBack }: ProcessingDashboardProps) {
  const { t } = useLanguage();
  const [selectedBatch, setSelectedBatch] = useState('BATCH_ASH_2024_003');

  const batches = [
    {
      id: 'BATCH_ASH_2024_003',
      species: 'Ashwagandha',
      quantity: '250 kg',
      status: 'In Progress',
      stage: 'Drying',
      progress: 65,
      startDate: '2024-01-15',
      expectedCompletion: '2024-01-22'
    },
    {
      id: 'BATCH_TUL_2024_011',
      species: 'Tulsi',
      quantity: '180 kg',
      status: 'Quality Control',
      stage: 'Testing',
      progress: 85,
      startDate: '2024-01-12',
      expectedCompletion: '2024-01-19'
    },
    {
      id: 'BATCH_BRA_2024_007',
      species: 'Brahmi',
      quantity: '120 kg',
      status: 'Complete',
      stage: 'Packaging',
      progress: 100,
      startDate: '2024-01-08',
      expectedCompletion: '2024-01-15'
    }
  ];

  const processingSteps = [
    { name: 'Cleaning', status: 'completed', timestamp: '2024-01-15 09:00' },
    { name: 'Sorting', status: 'completed', timestamp: '2024-01-15 11:30' },
    { name: 'Drying', status: 'in-progress', timestamp: '2024-01-15 14:00' },
    { name: 'Grinding', status: 'pending', timestamp: null },
    { name: 'Sieving', status: 'pending', timestamp: null },
    { name: 'Packaging', status: 'pending', timestamp: null }
  ];

  const qualityMetrics = [
    { label: 'Moisture Content', value: '8.2%', target: '< 10%', status: 'good' },
    { label: 'Particle Size', value: '0.5mm', target: '0.3-0.8mm', status: 'good' },
    { label: 'Color Index', value: '85', target: '> 80', status: 'good' },
    { label: 'Bulk Density', value: '0.45g/ml', target: '0.4-0.6g/ml', status: 'good' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Live</Badge>
            <span className="text-sm text-gray-600">Processing Facility #001</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('features.processing.title')}</h1>
          <p className="text-gray-600">{t('features.processing.description')}</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('processing.overview')}</TabsTrigger>
            <TabsTrigger value="batches">{t('processing.batches')}</TabsTrigger>
            <TabsTrigger value="quality">{t('processing.quality')}</TabsTrigger>
            <TabsTrigger value="compliance">{t('processing.compliance')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{t('processing.batches')}</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{t('processing.volume')}</p>
                      <p className="text-2xl font-bold">1.2T</p>
                    </div>
                    <Scale className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{t('processing.pass_rate')}</p>
                      <p className="text-2xl font-bold">98.5%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{t('processing.efficiency')}</p>
                      <p className="text-2xl font-bold">94%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Operations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Processing Operations</CardTitle>
                  <CardDescription>Real-time status of active processing lines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {batches.filter(b => b.status !== 'Complete').map((batch) => (
                      <div key={batch.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{batch.id}</h4>
                            <p className="text-sm text-gray-600">{batch.species} - {batch.quantity}</p>
                          </div>
                          <Badge variant={batch.status === 'In Progress' ? 'default' : 'secondary'}>
                            {batch.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Stage: {batch.stage}</span>
                            <span>{batch.progress}%</span>
                          </div>
                          <Progress value={batch.progress} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Conditions</CardTitle>
                  <CardDescription>Facility monitoring and control systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800">Temperature</span>
                        <Thermometer className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-blue-800">22°C</p>
                      <p className="text-xs text-blue-600">Optimal range: 20-25°C</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800">Humidity</span>
                        <Clock className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-green-800">45%</p>
                      <p className="text-xs text-green-600">Optimal range: 40-50%</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-800">Air Quality</span>
                        <Factory className="h-4 w-4 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-purple-800">Good</p>
                      <p className="text-xs text-purple-600">Particulate levels normal</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-orange-800">Pressure</span>
                        <CheckCircle className="h-4 w-4 text-orange-600" />
                      </div>
                      <p className="text-2xl font-bold text-orange-800">1.02</p>
                      <p className="text-xs text-orange-600">Bar (within range)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="batches" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Batch List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Active Batches</CardTitle>
                  <CardDescription>Select a batch to view details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {batches.map((batch) => (
                      <div
                        key={batch.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedBatch === batch.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedBatch(batch.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{batch.id}</p>
                            <p className="text-sm text-gray-600">{batch.species}</p>
                          </div>
                          <Badge variant={batch.status === 'Complete' ? 'default' : 'secondary'}>
                            {batch.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Batch Details */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{selectedBatch} - Processing Details</CardTitle>
                  <CardDescription>Step-by-step processing workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {processingSteps.map((step, index) => (
                      <div key={step.name} className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-100' :
                          step.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : step.status === 'in-progress' ? (
                            <Clock className="h-5 w-5 text-blue-600" />
                          ) : (
                            <span className="text-sm font-medium text-gray-400">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{step.name}</h4>
                          {step.timestamp && (
                            <p className="text-sm text-gray-600">{step.timestamp}</p>
                          )}
                        </div>
                        <Badge variant={
                          step.status === 'completed' ? 'default' :
                          step.status === 'in-progress' ? 'secondary' : 'outline'
                        }>
                          {step.status === 'completed' ? 'Complete' :
                           step.status === 'in-progress' ? 'In Progress' : 'Pending'}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Smart Contract Validation</h4>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-blue-700">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Processing parameters within approved limits
                      </div>
                      <div className="flex items-center text-sm text-blue-700">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Temperature and humidity logs recorded
                      </div>
                      <div className="flex items-center text-sm text-blue-700">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Chain of custody maintained
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics - {selectedBatch}</CardTitle>
                  <CardDescription>Real-time quality control measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {qualityMetrics.map((metric) => (
                      <div key={metric.label} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{metric.label}</h4>
                            <p className="text-sm text-gray-600">Target: {metric.target}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{metric.value}</p>
                            <Badge variant={metric.status === 'good' ? 'default' : 'destructive'}>
                              {metric.status === 'good' ? 'Within Spec' : 'Out of Spec'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Alerts</CardTitle>
                  <CardDescription>Recent quality control notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Batch Quality Approved</p>
                        <p className="text-sm text-green-700">BATCH_BRA_2024_007 passed all quality tests</p>
                        <p className="text-xs text-green-600">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">Moisture Check Required</p>
                        <p className="text-sm text-yellow-700">BATCH_ASH_2024_003 approaching moisture threshold</p>
                        <p className="text-xs text-yellow-600">4 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Scheduled Quality Test</p>
                        <p className="text-sm text-blue-700">BATCH_TUL_2024_011 due for final quality assessment</p>
                        <p className="text-xs text-blue-600">Tomorrow at 10:00 AM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Compliance</CardTitle>
                  <CardDescription>AYUSH Ministry and export compliance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Good Manufacturing Practices (GMP)</h4>
                        <Badge variant="default">Compliant</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Last audit: January 10, 2024</p>
                      <p className="text-sm text-gray-600">Next audit: July 10, 2024</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">AYUSH Export Certification</h4>
                        <Badge variant="default">Valid</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Certificate: AYUSH/EXP/2024/001</p>
                      <p className="text-sm text-gray-600">Expires: December 31, 2024</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Environmental Compliance</h4>
                        <Badge variant="default">Green Certified</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Waste management: Compliant</p>
                      <p className="text-sm text-gray-600">Energy efficiency: 89%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Transactions</CardTitle>
                  <CardDescription>Recent processing events recorded on blockchain</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Processing Step Completed</p>
                        <span className="text-xs text-gray-500">15:30</span>
                      </div>
                      <p className="text-sm text-gray-600">BATCH_ASH_2024_003 - Drying stage completed</p>
                      <p className="text-xs text-gray-500">Block: 0x7f8a...9b2c</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Quality Test Recorded</p>
                        <span className="text-xs text-gray-500">14:15</span>
                      </div>
                      <p className="text-sm text-gray-600">BATCH_TUL_2024_011 - Moisture content: 7.8%</p>
                      <p className="text-xs text-gray-500">Block: 0x6e7d...8a1b</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Batch Status Update</p>
                        <span className="text-xs text-gray-500">13:45</span>
                      </div>
                      <p className="text-sm text-gray-600">BATCH_BRA_2024_007 - Moved to packaging</p>
                      <p className="text-xs text-gray-500">Block: 0x5d6c...7a0b</p>
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