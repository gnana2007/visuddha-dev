import { useState } from 'react';
import { Button } from './ui/button';
import { useLanguage } from './language/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  MapPin,
  Calendar,
  Leaf,
  Award,
  Globe,
  FileText,
  Download,
  Eye,
  Clock,
  Users,
  Factory,
  Zap
} from 'lucide-react';

interface ComplianceTrackerProps {
  onBack: () => void;
}

export function ComplianceTracker({ onBack }: ComplianceTrackerProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('geographic');

  const complianceOverview = [
    {
      category: 'Geographic Compliance',
      score: 98,
      status: 'excellent',
      violations: 2,
      lastCheck: '2024-01-18 14:30'
    },
    {
      category: 'Seasonal Restrictions',
      score: 96,
      status: 'good',
      violations: 1,
      lastCheck: '2024-01-18 12:15'
    },
    {
      category: 'Sustainability Quotas',
      score: 94,
      status: 'good',
      violations: 3,
      lastCheck: '2024-01-18 16:45'
    },
    {
      category: 'Quality Standards',
      score: 99,
      status: 'excellent',
      violations: 0,
      lastCheck: '2024-01-18 11:20'
    }
  ];

  const violations = [
    {
      id: 'VIO_2024_001',
      type: 'Geographic Boundary',
      severity: 'Medium',
      location: 'Collector COL_2024_023',
      description: 'Collection 50m outside approved boundary in Rajasthan',
      date: '2024-01-17 15:30',
      status: 'Resolved',
      action: 'Collector retrained on boundary limits'
    },
    {
      id: 'VIO_2024_002',
      type: 'Seasonal Restriction',
      severity: 'Low',
      location: 'Processing Facility #003',
      description: 'Off-season collection processed without proper documentation',
      date: '2024-01-16 09:15',
      status: 'Under Review',
      action: 'Documentation being verified'
    },
    {
      id: 'VIO_2024_003',
      type: 'Sustainability Quota',
      severity: 'High',
      location: 'Region: Gujarat North',
      description: 'Monthly collection quota exceeded by 12%',
      date: '2024-01-15 18:45',
      status: 'Active',
      action: 'Collection suspended pending quota reset'
    }
  ];

  const certifications = [
    {
      name: 'AYUSH Ministry Approval',
      authority: 'Ministry of AYUSH, Government of India',
      certNumber: 'AYUSH/CERT/2024/001',
      issueDate: '2024-01-01',
      expiryDate: '2024-12-31',
      status: 'Valid',
      scope: 'Medicinal plant processing and export'
    },
    {
      name: 'WHO-GMP Certification',
      authority: 'World Health Organization',
      certNumber: 'WHO-GMP/IND/2024/078',
      issueDate: '2023-10-15',
      expiryDate: '2024-10-15',
      status: 'Valid',
      scope: 'Good Manufacturing Practices'
    },
    {
      name: 'Organic Certification',
      authority: 'National Programme for Organic Production',
      certNumber: 'NPOP/ORG/2024/156',
      issueDate: '2024-02-01',
      expiryDate: '2025-01-31',
      status: 'Valid',
      scope: 'Organic medicinal plant sourcing'
    },
    {
      name: 'Fair Trade Certification',
      authority: 'FairTrade India',
      certNumber: 'FT/IND/2024/089',
      issueDate: '2023-09-20',
      expiryDate: '2024-09-20',
      status: 'Expiring Soon',
      scope: 'Ethical sourcing and farmer welfare'
    }
  ];

  const smartContractRules = [
    {
      rule: 'Geographic Boundary Validation',
      description: 'Validates GPS coordinates against approved collection zones',
      status: 'Active',
      triggers: 1247,
      violations: 2,
      lastTrigger: '2024-01-18 14:30'
    },
    {
      rule: 'Seasonal Collection Restrictions',
      description: 'Enforces species-specific collection seasons',
      status: 'Active',
      triggers: 856,
      violations: 1,
      lastTrigger: '2024-01-18 12:15'
    },
    {
      rule: 'Quality Gate Validation',
      description: 'Ensures minimum quality thresholds are met',
      status: 'Active',
      triggers: 2341,
      violations: 0,
      lastTrigger: '2024-01-18 16:45'
    },
    {
      rule: 'Sustainability Quota Management',
      description: 'Monitors and enforces collection limits per region',
      status: 'Active',
      triggers: 456,
      violations: 3,
      lastTrigger: '2024-01-18 11:20'
    },
    {
      rule: 'Chain of Custody Verification',
      description: 'Validates proper handoffs between supply chain actors',
      status: 'Active',
      triggers: 3892,
      violations: 0,
      lastTrigger: '2024-01-18 16:00'
    }
  ];

  const auditTrail = [
    {
      timestamp: '2024-01-18 16:45',
      event: 'Compliance Check Executed',
      details: 'Automated smart contract validation for BATCH_ASH_2024_003',
      result: 'Passed',
      actor: 'Smart Contract Engine'
    },
    {
      timestamp: '2024-01-18 15:30',
      event: 'Violation Resolved',
      details: 'Geographic boundary violation VIO_2024_001 marked as resolved',
      result: 'Resolved',
      actor: 'Compliance Officer'
    },
    {
      timestamp: '2024-01-18 14:30',
      event: 'Geographic Boundary Alert',
      details: 'Collection point 50m outside approved zone detected',
      result: 'Violation',
      actor: 'GPS Monitoring System'
    },
    {
      timestamp: '2024-01-18 12:15',
      event: 'Seasonal Restriction Check',
      details: 'Brahmi collection validated against seasonal calendar',
      result: 'Passed',
      actor: 'Smart Contract Engine'
    },
    {
      timestamp: '2024-01-18 11:20',
      event: 'Quality Gate Validation',
      details: 'LAB_TUL_005 test results validated against standards',
      result: 'Passed',
      actor: 'Quality Management System'
    }
  ];

  const sustainabilityMetrics = [
    {
      metric: 'Carbon Footprint Reduction',
      value: '15%',
      target: '20%',
      progress: 75,
      unit: 'vs previous year'
    },
    {
      metric: 'Biodiversity Conservation',
      value: '23',
      target: '25',
      progress: 92,
      unit: 'species protected'
    },
    {
      metric: 'Farmer Income Improvement',
      value: '28%',
      target: '30%',
      progress: 93,
      unit: 'average increase'
    },
    {
      metric: 'Sustainable Collection Areas',
      value: '89%',
      target: '95%',
      progress: 94,
      unit: 'of total area'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Badge variant="outline">Real-time Compliance Monitoring</Badge>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance & Sustainability Tracker</h1>
          <p className="text-gray-600">Automated monitoring and enforcement of regulations and sustainability standards</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="violations">Violations</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="smart-contracts">Smart Contracts</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Compliance Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {complianceOverview.map((item) => (
                <Card key={item.category}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Shield className={`h-8 w-8 ${
                        item.status === 'excellent' ? 'text-green-600' :
                        item.status === 'good' ? 'text-blue-600' : 'text-yellow-600'
                      }`} />
                      <Badge variant={item.status === 'excellent' ? 'default' : 'secondary'}>
                        {item.score}%
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{item.category}</h3>
                    <Progress value={item.score} className="mb-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{item.violations} violations</span>
                      <span>Last check: {item.lastCheck.split(' ')[1]}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Compliance Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Compliance Activities</CardTitle>
                  <CardDescription>Latest automated checks and validations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditTrail.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.result === 'Passed' ? 'bg-green-100' :
                          activity.result === 'Resolved' ? 'bg-blue-100' :
                          activity.result === 'Violation' ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          {activity.result === 'Passed' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : activity.result === 'Resolved' ? (
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          ) : activity.result === 'Violation' ? (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.event}</p>
                          <p className="text-sm text-gray-600">{activity.details}</p>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{activity.actor}</span>
                            <span>{activity.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Health Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Overall Compliance Health</CardTitle>
                  <CardDescription>Weighted compliance score across all categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                      <div className="absolute inset-0 rounded-full bg-green-100"></div>
                      <div className="relative text-center">
                        <span className="text-3xl font-bold text-green-600">97%</span>
                        <p className="text-sm text-green-700">Excellent</p>
                      </div>
                    </div>
                    <p className="text-gray-600">Your supply chain is highly compliant with all regulations</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-800">Regulatory Compliance</span>
                      <span className="text-sm text-green-600">98%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-800">Quality Standards</span>
                      <span className="text-sm text-blue-600">99%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-purple-800">Sustainability Goals</span>
                      <span className="text-sm text-purple-600">94%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium text-orange-800">Operational Efficiency</span>
                      <span className="text-sm text-orange-600">96%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="violations" className="mt-6">
            <div className="space-y-6">
              {/* Violations Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600">6</p>
                    <p className="text-sm text-gray-600">Total Violations</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">1</p>
                    <p className="text-sm text-gray-600">High Severity</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">3</p>
                    <p className="text-sm text-gray-600">Resolved</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">2</p>
                    <p className="text-sm text-gray-600">Under Review</p>
                  </CardContent>
                </Card>
              </div>

              {/* Violations List */}
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Violations</CardTitle>
                  <CardDescription>Detailed list of all compliance violations and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {violations.map((violation) => (
                      <div key={violation.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{violation.id}</h4>
                            <p className="text-sm text-gray-600">{violation.type}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              violation.severity === 'High' ? 'destructive' :
                              violation.severity === 'Medium' ? 'default' : 'secondary'
                            }>
                              {violation.severity}
                            </Badge>
                            <Badge variant={
                              violation.status === 'Resolved' ? 'default' :
                              violation.status === 'Under Review' ? 'secondary' : 'destructive'
                            }>
                              {violation.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2">{violation.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Location:</p>
                            <p className="font-medium">{violation.location}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Date:</p>
                            <p className="font-medium">{violation.date}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Action Taken:</p>
                            <p className="font-medium">{violation.action}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.certNumber}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{cert.name}</CardTitle>
                        <CardDescription>{cert.authority}</CardDescription>
                      </div>
                      <Badge variant={
                        cert.status === 'Valid' ? 'default' :
                        cert.status === 'Expiring Soon' ? 'secondary' : 'destructive'
                      }>
                        {cert.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Certificate Number:</p>
                          <p className="font-medium">{cert.certNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Issue Date:</p>
                          <p className="font-medium">{cert.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Expiry Date:</p>
                          <p className="font-medium">{cert.expiryDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Status:</p>
                          <p className={`font-medium ${
                            cert.status === 'Valid' ? 'text-green-600' :
                            cert.status === 'Expiring Soon' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {cert.status}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-gray-600 text-sm">Scope:</p>
                        <p className="font-medium text-sm">{cert.scope}</p>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Certificate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="smart-contracts" className="mt-6">
            <div className="space-y-6">
              {/* Smart Contract Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-gray-600">Active Smart Contracts</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">8,792</p>
                    <p className="text-sm text-gray-600">Successful Validations</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">6</p>
                    <p className="text-sm text-gray-600">Violations Detected</p>
                  </CardContent>
                </Card>
              </div>

              {/* Smart Contract Rules */}
              <Card>
                <CardHeader>
                  <CardTitle>Smart Contract Rules & Enforcement</CardTitle>
                  <CardDescription>Automated compliance rules running on the blockchain</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {smartContractRules.map((rule) => (
                      <div key={rule.rule} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{rule.rule}</h4>
                            <p className="text-sm text-gray-600">{rule.description}</p>
                          </div>
                          <Badge variant="default">Active</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Total Triggers:</p>
                            <p className="font-medium">{rule.triggers.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Violations:</p>
                            <p className="font-medium text-red-600">{rule.violations}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Success Rate:</p>
                            <p className="font-medium text-green-600">
                              {((rule.triggers - rule.violations) / rule.triggers * 100).toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Last Trigger:</p>
                            <p className="font-medium">{rule.lastTrigger}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sustainability" className="mt-6">
            <div className="space-y-6">
              {/* Sustainability Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sustainabilityMetrics.map((metric) => (
                  <Card key={metric.metric}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Leaf className="h-8 w-8 text-green-600" />
                        <Badge variant="outline">{metric.progress}%</Badge>
                      </div>
                      <h3 className="font-semibold mb-2">{metric.metric}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current: {metric.value}</span>
                          <span>Target: {metric.target}</span>
                        </div>
                        <Progress value={metric.progress} />
                        <p className="text-xs text-gray-600">{metric.unit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sustainability Initiatives */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conservation Impact</CardTitle>
                    <CardDescription>Environmental and biodiversity conservation efforts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Protected Species Program</h4>
                        <p className="text-sm text-gray-600 mb-2">23 endangered medicinal plant species under protection</p>
                        <div className="flex justify-between text-sm">
                          <span>Areas Protected:</span>
                          <span className="font-medium">450 hectares</span>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Reforestation Initiative</h4>
                        <p className="text-sm text-gray-600 mb-2">Native medicinal plants replanting program</p>
                        <div className="flex justify-between text-sm">
                          <span>Trees Planted:</span>
                          <span className="font-medium">12,450</span>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Soil Health Program</h4>
                        <p className="text-sm text-gray-600 mb-2">Organic farming and soil conservation practices</p>
                        <div className="flex justify-between text-sm">
                          <span>Farms Converted:</span>
                          <span className="font-medium">89 farms</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Impact</CardTitle>
                    <CardDescription>Community development and farmer welfare programs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Farmer Training Program</h4>
                        <p className="text-sm text-gray-600 mb-2">Sustainable cultivation and quality practices</p>
                        <div className="flex justify-between text-sm">
                          <span>Farmers Trained:</span>
                          <span className="font-medium">156 farmers</span>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Fair Trade Initiative</h4>
                        <p className="text-sm text-gray-600 mb-2">Premium pricing for quality and sustainable practices</p>
                        <div className="flex justify-between text-sm">
                          <span>Average Premium:</span>
                          <span className="font-medium">28% above market</span>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Community Development</h4>
                        <p className="text-sm text-gray-600 mb-2">Healthcare and education support in farming communities</p>
                        <div className="flex justify-between text-sm">
                          <span>Communities Supported:</span>
                          <span className="font-medium">23 villages</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Export Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Reports</CardTitle>
                  <CardDescription>Generate and download sustainability and compliance reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Download className="h-6 w-6 mb-2" />
                      <span>Sustainability Report</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Download className="h-6 w-6 mb-2" />
                      <span>Carbon Footprint Report</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Download className="h-6 w-6 mb-2" />
                      <span>Social Impact Report</span>
                    </Button>
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