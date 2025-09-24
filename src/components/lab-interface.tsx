import { useState } from 'react';
import { Button } from './ui/button';
import { useLanguage } from './language/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  FlaskConical, 
  Microscope, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Download,
  Upload,
  FileText,
  Award,
  Database,
  Zap
} from 'lucide-react';

interface LabInterfaceProps {
  onBack: () => void;
}

export function LabInterface({ onBack }: LabInterfaceProps) {
  const { t } = useLanguage();
  const [selectedSample, setSelectedSample] = useState('LAB_ASH_001');
  const [testResults, setTestResults] = useState({
    moisture: '8.2',
    pesticides: 'Not Detected',
    heavyMetals: 'Within Limits',
    microbial: 'Passed',
    dna: 'Confirmed'
  });

  const samples = [
    {
      id: 'LAB_ASH_001',
      batchId: 'BATCH_ASH_2024_003',
      species: 'Ashwagandha',
      status: 'Testing',
      priority: 'High',
      received: '2024-01-16',
      testProgress: 75
    },
    {
      id: 'LAB_TUL_005',
      batchId: 'BATCH_TUL_2024_011',
      species: 'Tulsi',
      status: 'Complete',
      priority: 'Medium',
      received: '2024-01-15',
      testProgress: 100
    },
    {
      id: 'LAB_BRA_003',
      batchId: 'BATCH_BRA_2024_007',
      species: 'Brahmi',
      status: 'Pending',
      priority: 'Low',
      received: '2024-01-17',
      testProgress: 25
    }
  ];

  const testTypes = [
    {
      name: 'Moisture Content',
      method: 'Karl Fischer',
      status: 'completed',
      result: '8.2%',
      limit: '< 10%',
      pass: true
    },
    {
      name: 'Pesticide Screening',
      method: 'GC-MS/LC-MS',
      status: 'completed',
      result: 'Not Detected',
      limit: '< 0.01 ppm',
      pass: true
    },
    {
      name: 'Heavy Metals',
      method: 'ICP-MS',
      status: 'completed',
      result: 'Within Limits',
      limit: 'WHO Standards',
      pass: true
    },
    {
      name: 'Microbial Testing',
      method: 'Culture Method',
      status: 'in-progress',
      result: 'Pending',
      limit: '< 10³ CFU/g',
      pass: null
    },
    {
      name: 'DNA Barcoding',
      method: 'PCR Sequencing',
      status: 'completed',
      result: 'Species Confirmed',
      limit: '> 95% Match',
      pass: true
    },
    {
      name: 'Aflatoxin B1',
      method: 'HPLC',
      status: 'pending',
      result: 'Not Started',
      limit: '< 5 ppb',
      pass: null
    }
  ];

  const certificates = [
    {
      id: 'COA_ASH_2024_003',
      type: 'Certificate of Analysis',
      batchId: 'BATCH_ASH_2024_003',
      issueDate: '2024-01-18',
      status: 'Draft'
    },
    {
      id: 'COA_TUL_2024_011',
      type: 'Certificate of Analysis',
      batchId: 'BATCH_TUL_2024_011',
      issueDate: '2024-01-17',
      status: 'Issued'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Certified Lab</Badge>
            <span className="text-sm text-gray-600">NABL Accredited</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('lab.title')}</h1>
          <p className="text-gray-600">{t('lab.subtitle')}</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="samples" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="samples">Active Samples</TabsTrigger>
            <TabsTrigger value="testing">Test Results</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
          </TabsList>

          <TabsContent value="samples" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sample Queue */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Sample Queue</CardTitle>
                  <CardDescription>Samples awaiting or undergoing testing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {samples.map((sample) => (
                      <div
                        key={sample.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedSample === sample.id ? 'bg-purple-50 border-purple-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedSample(sample.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{sample.id}</p>
                            <p className="text-sm text-gray-600">{sample.species}</p>
                          </div>
                          <Badge variant={
                            sample.priority === 'High' ? 'destructive' :
                            sample.priority === 'Medium' ? 'default' : 'secondary'
                          }>
                            {sample.priority}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{sample.testProgress}%</span>
                          </div>
                          <Progress value={sample.testProgress} className="h-2" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Received: {sample.received}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sample Details */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{selectedSample} - Sample Information</CardTitle>
                  <CardDescription>Detailed testing workflow and chain of custody</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Sample ID</Label>
                        <Input value={selectedSample} readOnly />
                      </div>
                      <div>
                        <Label>Batch ID</Label>
                        <Input value="BATCH_ASH_2024_003" readOnly />
                      </div>
                      <div>
                        <Label>Species</Label>
                        <Input value="Withania somnifera (Ashwagandha)" readOnly />
                      </div>
                      <div>
                        <Label>Sample Weight</Label>
                        <Input value="500g" readOnly />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Received Date</Label>
                        <Input value="2024-01-16 09:30" readOnly />
                      </div>
                      <div>
                        <Label>Source Location</Label>
                        <Input value="19.0760°N, 72.8777°E" readOnly />
                      </div>
                      <div>
                        <Label>Collection Date</Label>
                        <Input value="2024-01-15 14:00" readOnly />
                      </div>
                      <div>
                        <Label>Collector ID</Label>
                        <Input value="COL_2024_001" readOnly />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Chain of Custody</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-700">Collected by Ramesh Kumar</span>
                        <span className="text-purple-600">2024-01-15 14:00</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-700">Processed at Facility #001</span>
                        <span className="text-purple-600">2024-01-15 16:30</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-700">Received at Lab #NABL-001</span>
                        <span className="text-purple-600">2024-01-16 09:30</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="testing" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Protocol - {selectedSample}</CardTitle>
                  <CardDescription>Comprehensive testing battery for quality assurance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testTypes.map((test) => (
                      <div key={test.name} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{test.name}</h4>
                            <p className="text-sm text-gray-600">Method: {test.method}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {test.status === 'completed' ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : test.status === 'in-progress' ? (
                              <Clock className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                            <Badge variant={
                              test.status === 'completed' ? 'default' :
                              test.status === 'in-progress' ? 'secondary' : 'outline'
                            }>
                              {test.status === 'completed' ? 'Complete' :
                               test.status === 'in-progress' ? 'Testing' : 'Pending'}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Result:</p>
                            <p className="font-medium">{test.result}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Limit:</p>
                            <p className="font-medium">{test.limit}</p>
                          </div>
                        </div>
                        {test.pass !== null && (
                          <div className="mt-2 flex items-center">
                            {test.pass ? (
                              <Badge variant="default" className="bg-green-600">
                                Pass
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                Fail
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Data Entry</CardTitle>
                  <CardDescription>Record and verify test results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="moisture">Moisture Content (%)</Label>
                        <Input
                          id="moisture"
                          type="number"
                          value={testResults.moisture}
                          onChange={(e) => setTestResults({ ...testResults, moisture: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="pesticides">Pesticide Screen</Label>
                        <Select value={testResults.pesticides} onValueChange={(value) => setTestResults({ ...testResults, pesticides: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Not Detected">Not Detected</SelectItem>
                            <SelectItem value="Detected - Within Limits">Detected - Within Limits</SelectItem>
                            <SelectItem value="Detected - Exceeds Limits">Detected - Exceeds Limits</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Test Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Enter any observations, anomalies, or additional test notes..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Analytical Reports</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload chromatograms and raw data</p>
                        <Button variant="outline" className="mt-2">
                          Browse Files
                        </Button>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Database className="mr-2 h-4 w-4" />
                        Save Results
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Zap className="mr-2 h-4 w-4" />
                        Submit to Blockchain
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Quality Status</h4>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-green-700">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        All critical tests passed
                      </div>
                      <div className="flex items-center text-sm text-green-700">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Ready for certificate generation
                      </div>
                      <div className="flex items-center text-sm text-green-700">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Meets export quality standards
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="certificates" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Generation</CardTitle>
                  <CardDescription>Digital certificates for quality assurance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{cert.id}</h4>
                            <p className="text-sm text-gray-600">{cert.type}</p>
                          </div>
                          <Badge variant={cert.status === 'Issued' ? 'default' : 'secondary'}>
                            {cert.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600">Batch ID:</p>
                            <p className="font-medium">{cert.batchId}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Issue Date:</p>
                            <p className="font-medium">{cert.issueDate}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button className="w-full">
                      <Award className="mr-2 h-4 w-4" />
                      Generate New Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certificate Template</CardTitle>
                  <CardDescription>Preview of digital certificate format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-6 bg-white">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Certificate of Analysis</h3>
                      <p className="text-sm text-gray-600">NABL Accredited Laboratory</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">Certificate No:</p>
                          <p className="font-medium">COA_ASH_2024_003</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Issue Date:</p>
                          <p className="font-medium">January 18, 2024</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">Sample ID:</p>
                          <p className="font-medium">LAB_ASH_001</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Batch ID:</p>
                          <p className="font-medium">BATCH_ASH_2024_003</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-600">Species:</p>
                        <p className="font-medium">Withania somnifera (Ashwagandha)</p>
                      </div>

                      <div className="border-t pt-3 mt-4">
                        <h4 className="font-medium mb-2">Test Results Summary</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span>Moisture:</span>
                            <span className="font-medium">8.2% ✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pesticides:</span>
                            <span className="font-medium">ND ✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Heavy Metals:</span>
                            <span className="font-medium">Pass ✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>DNA Verified:</span>
                            <span className="font-medium">Yes ✓</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-3 mt-4 text-center">
                        <p className="text-xs text-gray-500">
                          Digitally signed and verified on blockchain
                        </p>
                        <p className="text-xs text-gray-500 font-mono">
                          Hash: 0x8f9e2d3c4b5a6789...
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="equipment" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <FlaskConical className="h-8 w-8 text-blue-600" />
                    <Badge variant="default">Online</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">HPLC System</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    High Performance Liquid Chromatography for active compound analysis
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-600">Operational</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Calibration:</span>
                      <span>Jan 10, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Service:</span>
                      <span>Apr 10, 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Microscope className="h-8 w-8 text-purple-600" />
                    <Badge variant="default">Online</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">GC-MS System</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Gas Chromatography-Mass Spectrometry for pesticide analysis
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-600">Operational</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Calibration:</span>
                      <span>Jan 12, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Service:</span>
                      <span>Apr 12, 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Database className="h-8 w-8 text-green-600" />
                    <Badge variant="secondary">Maintenance</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">ICP-MS System</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Inductively Coupled Plasma-Mass Spectrometry for heavy metals
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-orange-600">Maintenance</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Online:</span>
                      <span>Jan 20, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Service:</span>
                      <span>May 15, 2024</span>
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