import { useState } from 'react';
import { Button } from './ui/button';
import { useLanguage } from './language/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  QrCode, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle,
  Award,
  Leaf,
  Factory,
  FlaskConical,
  Package,
  Camera,
  Map,
  Phone,
  Mail,
  Globe,
  Shield,
  Star
} from 'lucide-react';

interface ConsumerPortalProps {
  onBack: () => void;
}

export function ConsumerPortal({ onBack }: ConsumerPortalProps) {
  const { t } = useLanguage();
  const [scannedCode, setScannedCode] = useState('');
  const [showResults, setShowResults] = useState(false);

  const productData = {
    qrCode: 'AYR_ASH_2024_003_PKG_001',
    productName: 'Premium Ashwagandha Powder',
    brand: 'AyurVital',
    batchId: 'BATCH_ASH_2024_003',
    manufacturingDate: '2024-01-18',
    expiryDate: '2025-01-18',
    netWeight: '100g',
    mrp: '₹450'
  };

  const supplyChainSteps = [
    {
      stage: 'Collection',
      location: 'Village Rampur, Rajasthan',
      date: '2024-01-15',
      details: 'Organic farm collection by certified farmer',
      actor: 'Ramesh Kumar (COL_2024_001)',
      coordinates: '19.0760°N, 72.8777°E',
      icon: Leaf,
      status: 'verified'
    },
    {
      stage: 'Processing',
      location: 'Ayur Processing Facility #001',
      date: '2024-01-16',
      details: 'Cleaned, dried, and powdered under GMP conditions',
      actor: 'Facility Manager',
      coordinates: '19.0760°N, 72.8777°E',
      icon: Factory,
      status: 'verified'
    },
    {
      stage: 'Testing',
      location: 'NABL Certified Laboratory',
      date: '2024-01-17',
      details: 'Quality tests for purity, pesticides, and authenticity',
      actor: 'Lab Technician',
      coordinates: '19.0760°N, 72.8777°E',
      icon: FlaskConical,
      status: 'verified'
    },
    {
      stage: 'Packaging',
      location: 'AyurVital Manufacturing Unit',
      date: '2024-01-18',
      details: 'Sealed and labeled with QR code',
      actor: 'Production Team',
      coordinates: '19.0760°N, 72.8777°E',
      icon: Package,
      status: 'verified'
    }
  ];

  const qualityTests = [
    { test: 'Species Authenticity', result: 'Confirmed', method: 'DNA Barcoding', status: 'pass' },
    { test: 'Moisture Content', result: '8.2%', method: 'Karl Fischer', status: 'pass' },
    { test: 'Pesticide Screening', result: 'Not Detected', method: 'GC-MS', status: 'pass' },
    { test: 'Heavy Metals', result: 'Within Limits', method: 'ICP-MS', status: 'pass' },
    { test: 'Microbial Count', result: 'Safe', method: 'Culture Method', status: 'pass' },
    { test: 'Active Compounds', result: '2.8% Withanolides', method: 'HPLC', status: 'pass' }
  ];

  const certifications = [
    { name: 'Organic Certified', authority: 'NPOP India', valid: '2024-12-31' },
    { name: 'GMP Certified', authority: 'WHO-GMP', valid: '2024-10-15' },
    { name: 'AYUSH Approved', authority: 'Ministry of AYUSH', valid: '2024-11-30' },
    { name: 'Fair Trade', authority: 'FairTrade India', valid: '2024-09-20' }
  ];

  const farmerProfile = {
    name: 'Ramesh Kumar',
    experience: '15 years',
    farmSize: '5 acres',
    location: 'Village Rampur, Rajasthan',
    certification: 'Organic Certified',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@ayurfarm.in',
    bio: 'Third-generation farmer specializing in medicinal plants. Committed to sustainable and organic farming practices.',
    achievements: [
      'Best Organic Farmer Award 2023',
      'Sustainable Agriculture Champion',
      'Community Leader in Medicinal Plant Cultivation'
    ]
  };

  const handleScan = () => {
    setScannedCode('AYR_ASH_2024_003_PKG_001');
    setShowResults(true);
  };

  const handleManualEntry = () => {
    if (scannedCode.trim()) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Badge variant="outline">Consumer Portal</Badge>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Authenticity Portal</h1>
          <p className="text-gray-600">Scan QR code to verify your Ayurvedic product's complete journey</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {!showResults ? (
          /* QR Scanner Interface */
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <QrCode className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                <CardTitle>Scan Product QR Code</CardTitle>
                <CardDescription>
                  Point your camera at the QR code on your Ayurvedic product package
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Camera Scanner */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">Position QR code within the frame</p>
                  <Button onClick={handleScan} className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Start Camera Scanner
                  </Button>
                </div>

                <div className="text-center text-gray-500">
                  <p className="text-sm">or</p>
                </div>

                {/* Manual Entry */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter QR Code Manually
                    </label>
                    <input
                      type="text"
                      value={scannedCode}
                      onChange={(e) => setScannedCode(e.target.value)}
                      placeholder="e.g., AYR_ASH_2024_003_PKG_001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <Button onClick={handleManualEntry} variant="outline" className="w-full">
                    Verify Product
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Demo QR Code</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Try with this sample code: <code className="bg-white px-2 py-1 rounded">AYR_ASH_2024_003_PKG_001</code>
                  </p>
                  <Button size="sm" onClick={() => {
                    setScannedCode('AYR_ASH_2024_003_PKG_001');
                    setShowResults(true);
                  }}>
                    Use Demo Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Product Verification Results */
          <div className="space-y-6">
            {/* Product Header */}
            <Card>
              <CardHeader className="bg-green-50 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <CardTitle className="text-green-800">Product Verified</CardTitle>
                      <CardDescription className="text-green-700">
                        Authentic product with complete traceability
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    100% Authentic
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">{productData.productName}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">{productData.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Batch ID:</span>
                        <span className="font-medium">{productData.batchId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Manufacturing Date:</span>
                        <span className="font-medium">{productData.manufacturingDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expiry Date:</span>
                        <span className="font-medium">{productData.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-medium text-orange-800 mb-2">Blockchain Verified</h4>
                      <p className="text-sm text-orange-700">
                        This product's entire journey is recorded on an immutable blockchain ledger.
                      </p>
                      <p className="text-xs text-orange-600 mt-2 font-mono">
                        Hash: 0x8f9e2d3c4b5a6789abcdef123456...
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supply Chain Journey */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="mr-2 h-5 w-5" />
                  Supply Chain Journey
                </CardTitle>
                <CardDescription>
                  Complete traceability from farm to your hands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {supplyChainSteps.map((step, index) => (
                    <div key={step.stage} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <step.icon className="h-5 w-5 text-green-600" />
                        </div>
                        {index < supplyChainSteps.length - 1 && (
                          <div className="w-0.5 h-16 bg-green-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{step.stage}</h4>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <Badge variant="outline">Verified</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{step.details}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-600">{step.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-600">{step.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-600">{step.actor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quality Test Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FlaskConical className="mr-2 h-5 w-5" />
                  Quality Test Results
                </CardTitle>
                <CardDescription>
                  Comprehensive laboratory testing for safety and authenticity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {qualityTests.map((test) => (
                    <div key={test.test} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{test.test}</h4>
                        <Badge variant="default" className="bg-green-600">
                          Pass
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Result:</span>
                          <span className="font-medium">{test.result}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Method:</span>
                          <span className="text-gray-600">{test.method}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Certifications & Compliance
                </CardTitle>
                <CardDescription>
                  Regulatory approvals and quality certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{cert.name}</h4>
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Authority:</span>
                          <span className="font-medium">{cert.authority}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Valid Until:</span>
                          <span className="font-medium">{cert.valid}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Farmer Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Meet Your Farmer
                </CardTitle>
                <CardDescription>
                  Connect with the farmer who grew your herbs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{farmerProfile.name}</h3>
                        <p className="text-sm text-gray-600">{farmerProfile.location}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{farmerProfile.certification}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{farmerProfile.bio}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Experience:</p>
                        <p className="font-medium">{farmerProfile.experience}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Farm Size:</p>
                        <p className="font-medium">{farmerProfile.farmSize}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Achievements</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {farmerProfile.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-center">
                            <Award className="h-3 w-3 text-yellow-500 mr-2" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Globe className="mr-2 h-4 w-4" />
                        Farm Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => setShowResults(false)} variant="outline" className="flex-1">
                <QrCode className="mr-2 h-4 w-4" />
                Scan Another Product
              </Button>
              <Button className="flex-1">
                <Star className="mr-2 h-4 w-4" />
                Rate This Product
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}