import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Users, 
  Leaf, 
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  TrendingDown,
  Star,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock,
  Target,
  BarChart3,
  DollarSign,
  Package,
  Shield,
  Book,
  VideoIcon
} from 'lucide-react';
import { useLanguage } from './language/language-context';

interface FarmerManagementPortalProps {
  onBack: () => void;
}

export function FarmerManagementPortal({ onBack }: FarmerManagementPortalProps) {
  const { t } = useLanguage();
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');

  const farmers = [
    {
      id: 'F001',
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      email: 'ramesh.farmer@gmail.com',
      location: 'Rampur Village, Rajasthan',
      farmSize: '5.2 hectares',
      experience: '15 years',
      joinDate: '2019-03-15',
      status: 'active',
      rating: 4.8,
      totalCollections: 145,
      totalVolume: '2,340 kg',
      totalEarnings: '₹1,45,600',
      qualityScore: 96.2,
      certifications: ['Organic', 'AYUSH Certified'],
      specialties: ['Ashwagandha', 'Neem'],
      lastCollection: '2024-01-18',
      achievements: ['Quality Excellence 2023', 'Top Performer Q4'],
      bankAccount: 'ICICI Bank ****1234',
      profileImage: '/api/placeholder/150/150'
    },
    {
      id: 'F002',
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya.herbs@gmail.com',
      location: 'Mysore, Karnataka',
      farmSize: '3.8 hectares',
      experience: '12 years',
      joinDate: '2020-07-22',
      status: 'active',
      rating: 4.6,
      totalCollections: 98,
      totalVolume: '1,890 kg',
      totalEarnings: '₹1,12,400',
      qualityScore: 94.8,
      certifications: ['Organic'],
      specialties: ['Tulsi', 'Brahmi'],
      lastCollection: '2024-01-17',
      achievements: ['Sustainability Champion'],
      bankAccount: 'SBI Bank ****5678',
      profileImage: '/api/placeholder/150/150'
    },
    {
      id: 'F003',
      name: 'Amit Patel',
      phone: '+91 76543 21098',
      email: 'amit.medicinal@gmail.com',
      location: 'Bhavnagar, Gujarat',
      farmSize: '7.1 hectares',
      experience: '20 years',
      joinDate: '2018-11-08',
      status: 'active',
      rating: 4.9,
      totalCollections: 203,
      totalVolume: '3,450 kg',
      totalEarnings: '₹2,08,700',
      qualityScore: 97.5,
      certifications: ['Organic', 'AYUSH Certified', 'FairTrade'],
      specialties: ['Ashwagandha', 'Brahmi', 'Turmeric'],
      lastCollection: '2024-01-19',
      achievements: ['Master Collector 2023', 'Innovation Award'],
      bankAccount: 'HDFC Bank ****9012',
      profileImage: '/api/placeholder/150/150'
    },
    {
      id: 'F004',
      name: 'Sunita Devi',
      phone: '+91 65432 10987',
      email: 'sunita.organic@gmail.com',
      location: 'Indore, Madhya Pradesh',
      farmSize: '4.3 hectares',
      experience: '8 years',
      joinDate: '2021-01-12',
      status: 'active',
      rating: 4.4,
      totalCollections: 67,
      totalVolume: '1,230 kg',
      totalEarnings: '₹89,500',
      qualityScore: 92.1,
      certifications: ['Organic'],
      specialties: ['Neem', 'Amla'],
      lastCollection: '2024-01-16',
      achievements: ['Rising Star 2023'],
      bankAccount: 'PNB Bank ****3456',
      profileImage: '/api/placeholder/150/150'
    },
    {
      id: 'F005',
      name: 'Rajesh Singh',
      phone: '+91 54321 09876',
      email: 'rajesh.herbs@gmail.com',
      location: 'Jodhpur, Rajasthan',
      farmSize: '6.7 hectares',
      experience: '18 years',
      joinDate: '2019-09-03',
      status: 'inactive',
      rating: 4.2,
      totalCollections: 89,
      totalVolume: '1,670 kg',
      totalEarnings: '₹98,200',
      qualityScore: 88.7,
      certifications: ['AYUSH Certified'],
      specialties: ['Ashwagandha'],
      lastCollection: '2023-12-15',
      achievements: [],
      bankAccount: 'BOI Bank ****7890',
      profileImage: '/api/placeholder/150/150'
    }
  ];

  const performanceMetrics = [
    {
      title: 'Total Farmers',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active This Month',
      value: '1,089',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Average Quality Score',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Star,
      color: 'purple'
    },
    {
      title: 'Total Collections',
      value: '8,456',
      change: '+15%',
      trend: 'up',
      icon: Package,
      color: 'orange'
    }
  ];

  const trainingPrograms = [
    {
      id: 'T001',
      title: 'Organic Farming Practices',
      description: 'Learn sustainable and organic farming methods for medicinal plants',
      duration: '2 weeks',
      enrolled: 145,
      completed: 128,
      rating: 4.7,
      status: 'active',
      language: 'Hindi'
    },
    {
      id: 'T002',
      title: 'Quality Assessment Techniques',
      description: 'Understand quality parameters and assessment methods',
      duration: '1 week',
      enrolled: 89,
      completed: 67,
      rating: 4.5,
      status: 'active',
      language: 'Multiple'
    },
    {
      id: 'T003',
      title: 'Blockchain & Digital Tools',
      description: 'Introduction to blockchain technology and digital tools',
      duration: '3 days',
      enrolled: 234,
      completed: 189,
      rating: 4.3,
      status: 'active',
      language: 'Telugu'
    },
    {
      id: 'T004',
      title: 'Seasonal Collection Practices',
      description: 'Optimal timing and methods for seasonal herb collection',
      duration: '1 week',
      enrolled: 156,
      completed: 134,
      rating: 4.8,
      status: 'upcoming',
      language: 'Hindi'
    }
  ];

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'rajasthan', name: 'Rajasthan' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'gujarat', name: 'Gujarat' },
    { id: 'madhya_pradesh', name: 'Madhya Pradesh' },
    { id: 'tamil_nadu', name: 'Tamil Nadu' }
  ];

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = filterRegion === 'all' || 
                         farmer.location.toLowerCase().includes(filterRegion.replace('_', ' '));
    
    return matchesSearch && matchesRegion;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'inactive': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Farmer
            </Button>
            <Badge variant="outline">Live Data</Badge>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer & Collector Management</h1>
          <p className="text-gray-600">Comprehensive management portal for farmers and herb collectors in the Visuddha network</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="farmers" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="farmers">Farmer Directory</TabsTrigger>
            <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
            <TabsTrigger value="training">Training Programs</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          </TabsList>

          <TabsContent value="farmers" className="mt-6">
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {performanceMetrics.map((metric) => {
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
                      <p className="text-sm text-gray-600">{metric.title}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Farmer List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Farmer Directory</CardTitle>
                        <CardDescription>Manage farmers and collectors in your network</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search farmers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-64"
                          />
                        </div>
                        <select 
                          value={filterRegion}
                          onChange={(e) => setFilterRegion(e.target.value)}
                          className="text-sm border rounded px-3 py-2"
                        >
                          {regions.map(region => (
                            <option key={region.id} value={region.id}>{region.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {filteredFarmers.map((farmer) => (
                        <div 
                          key={farmer.id} 
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedFarmer?.id === farmer.id ? 'border-green-500 bg-green-50' : 'hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedFarmer(farmer)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{farmer.name}</h4>
                                <p className="text-sm text-gray-600">{farmer.id}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                  <MapPin className="h-3 w-3 text-gray-500" />
                                  <span className="text-xs text-gray-500">{farmer.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={getStatusBadge(farmer.status)}>
                                {farmer.status}
                              </Badge>
                              <div className="flex items-center mt-1">
                                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                <span className="text-sm">{farmer.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Collections</p>
                              <p className="font-medium">{farmer.totalCollections}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Quality Score</p>
                              <p className="font-medium">{farmer.qualityScore}%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Earnings</p>
                              <p className="font-medium">{farmer.totalEarnings}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Farmer Details */}
              <div className="lg:col-span-1">
                {selectedFarmer ? (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedFarmer.name}</CardTitle>
                          <CardDescription>{selectedFarmer.id}</CardDescription>
                        </div>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Profile Image Placeholder */}
                        <div className="text-center">
                          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-2">
                            <Users className="h-10 w-10 text-green-600" />
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{selectedFarmer.rating}</span>
                            <span className="text-sm text-gray-500">rating</span>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="border rounded-lg p-3">
                          <h4 className="font-medium mb-2">Contact Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span>{selectedFarmer.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span className="truncate">{selectedFarmer.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-xs">{selectedFarmer.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Farm Details */}
                        <div className="border rounded-lg p-3">
                          <h4 className="font-medium mb-2">Farm Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Farm Size:</span>
                              <span className="font-medium">{selectedFarmer.farmSize}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Experience:</span>
                              <span className="font-medium">{selectedFarmer.experience}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Join Date:</span>
                              <span className="font-medium">{selectedFarmer.joinDate}</span>
                            </div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="border rounded-lg p-3">
                          <h4 className="font-medium mb-2">Performance</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Total Volume:</span>
                              <span className="font-medium">{selectedFarmer.totalVolume}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quality Score:</span>
                              <span className="font-medium text-green-600">{selectedFarmer.qualityScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Earnings:</span>
                              <span className="font-medium text-blue-600">{selectedFarmer.totalEarnings}</span>
                            </div>
                          </div>
                        </div>

                        {/* Specialties */}
                        <div className="border rounded-lg p-3">
                          <h4 className="font-medium mb-2">Specialties</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedFarmer.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Certifications */}
                        <div className="border rounded-lg p-3">
                          <h4 className="font-medium mb-2">Certifications</h4>
                          <div className="space-y-1">
                            {selectedFarmer.certifications.map((cert, index) => (
                              <Badge key={index} variant="outline" className="text-xs mr-1">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        {selectedFarmer.achievements.length > 0 && (
                          <div className="border rounded-lg p-3">
                            <h4 className="font-medium mb-2">Achievements</h4>
                            <div className="space-y-1">
                              {selectedFarmer.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Award className="h-3 w-3 text-yellow-500" />
                                  <span className="text-xs">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Phone className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Select a farmer to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Charts */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Farmer performance trends and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Performance trend visualization</p>
                      <p className="text-xs text-gray-500">Quality scores, collections, and earnings</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">Avg Quality</p>
                      <p className="text-xl font-bold text-green-600">94.2%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Total Volume</p>
                      <p className="text-xl font-bold text-blue-600">9.8T</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Total Earnings</p>
                      <p className="text-xl font-bold text-purple-600">₹6.5L</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Leading farmers this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {farmers.slice(0, 5).map((farmer, index) => (
                      <div key={farmer.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{farmer.name}</h4>
                            <p className="text-xs text-gray-600">{farmer.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-sm font-medium">{farmer.rating}</span>
                          </div>
                          <p className="text-xs text-gray-500">{farmer.qualityScore}% quality</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Regional Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                  <CardDescription>State-wise farmer performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Rajasthan</span>
                      <div className="text-right">
                        <p className="font-medium text-green-600">95.2%</p>
                        <p className="text-xs text-gray-500">42 farmers</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Karnataka</span>
                      <div className="text-right">
                        <p className="font-medium text-blue-600">93.8%</p>
                        <p className="text-xs text-gray-500">38 farmers</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Gujarat</span>
                      <div className="text-right">
                        <p className="font-medium text-purple-600">94.5%</p>
                        <p className="text-xs text-gray-500">29 farmers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quality Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Quality Improvement Trends</CardTitle>
                  <CardDescription>Month-over-month quality improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">Quality Initiatives Impact</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Training Program Completion:</span>
                          <span className="font-medium text-green-600">87%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quality Score Improvement:</span>
                          <span className="font-medium text-blue-600">+3.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Certification Adoption:</span>
                          <span className="font-medium text-purple-600">+15%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">Support Needed</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 12 farmers need quality training</li>
                        <li>• 8 farmers require certification support</li>
                        <li>• 5 farmers need equipment upgrades</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="training" className="mt-6">
            <div className="space-y-6">
              {/* Training Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Book className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-600">Active Programs</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">624</p>
                    <p className="text-sm text-gray-600">Total Enrolled</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">518</p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">4.6</p>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                  </CardContent>
                </Card>
              </div>

              {/* Training Programs */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Training Programs</CardTitle>
                      <CardDescription>Skill development and education programs for farmers</CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Program
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trainingPrograms.map((program) => (
                      <div key={program.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{program.title}</h4>
                            <p className="text-sm text-gray-600">{program.description}</p>
                          </div>
                          <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                            {program.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Duration</p>
                            <p className="font-medium">{program.duration}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Enrolled</p>
                            <p className="font-medium">{program.enrolled}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Completed</p>
                            <p className="font-medium text-green-600">{program.completed}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Rating</p>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="font-medium">{program.rating}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600">Language</p>
                            <p className="font-medium">{program.language}</p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Completion Rate</span>
                            <span className="text-sm font-medium">{Math.round((program.completed / program.enrolled) * 100)}%</span>
                          </div>
                          <Progress value={(program.completed / program.enrolled) * 100} />
                        </div>

                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <VideoIcon className="h-4 w-4 mr-1" />
                            Content
                          </Button>
                          <Button size="sm" variant="outline">
                            <Users className="h-4 w-4 mr-1" />
                            Participants
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="onboarding" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* New Farmer Registration Form */}
              <Card>
                <CardHeader>
                  <CardTitle>New Farmer Registration</CardTitle>
                  <CardDescription>Onboard new farmers to the Visuddha network</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farmer-name">Full Name</Label>
                        <Input id="farmer-name" placeholder="Enter farmer's name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmer-phone">Phone Number</Label>
                        <Input id="farmer-phone" placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmer-email">Email Address</Label>
                        <Input id="farmer-email" type="email" placeholder="farmer@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmer-location">Location</Label>
                        <Input id="farmer-location" placeholder="Village, District, State" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farm-size">Farm Size (hectares)</Label>
                        <Input id="farm-size" type="number" placeholder="0.0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience (years)</Label>
                        <Input id="experience" type="number" placeholder="0" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialties">Herb Specialties</Label>
                      <Input id="specialties" placeholder="e.g., Ashwagandha, Tulsi, Neem" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bank-details">Bank Account Details</Label>
                      <Input id="bank-details" placeholder="Bank name and account number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea id="notes" placeholder="Any additional information..." />
                    </div>

                    <div className="space-y-2">
                      <Label>Document Upload</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload ID proof, land documents, and certificates</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Register Farmer
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Onboarding Process */}
              <Card>
                <CardHeader>
                  <CardTitle>Onboarding Process</CardTitle>
                  <CardDescription>Step-by-step farmer onboarding workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Registration</h4>
                        <p className="text-sm text-gray-600">Basic information and document collection</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Verification</h4>
                        <p className="text-sm text-gray-600">Document verification and background check</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Book className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Training</h4>
                        <p className="text-sm text-gray-600">Mandatory training programs and certification</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <Target className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Assessment</h4>
                        <p className="text-sm text-gray-600">Field assessment and quality evaluation</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Activation</h4>
                        <p className="text-sm text-gray-600">Network activation and first collection</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Pending Applications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Awaiting Verification:</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Training:</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ready for Activation:</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4">
                    View All Applications
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}