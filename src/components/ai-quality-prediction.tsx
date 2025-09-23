import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useLanguage } from './language/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Brain, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Zap,
  Target,
  Eye,
  Cpu,
  Database,
  Activity,
  PieChart,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  Beaker,
  Leaf,
  ChevronRight,
  Download,
  Play,
  Pause,
  Settings
} from 'lucide-react';

interface AIQualityPredictionProps {
  onBack: () => void;
}

export function AIQualityPrediction({ onBack }: AIQualityPredictionProps) {
  const { t } = useLanguage();
  const [modelAccuracy, setModelAccuracy] = useState(94.7);
  const [predictionsToday, setPredictionsToday] = useState(247);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setModelAccuracy(prev => prev + (Math.random() - 0.5) * 0.2);
      setPredictionsToday(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const qualityModels = [
    {
      name: 'Ashwagandha Quality Predictor',
      accuracy: 96.2,
      status: 'Active',
      lastTrained: '2024-01-15',
      predictions: 1247,
      features: 23,
      type: 'Random Forest',
      confidence: 'High'
    },
    {
      name: 'Tulsi Purity Analyzer',
      accuracy: 94.8,
      status: 'Active',
      lastTrained: '2024-01-12',
      predictions: 856,
      features: 19,
      type: 'Neural Network',
      confidence: 'High'
    },
    {
      name: 'Brahmi Contamination Detector',
      accuracy: 92.3,
      status: 'Training',
      lastTrained: '2024-01-10',
      predictions: 634,
      features: 21,
      type: 'SVM',
      confidence: 'Medium'
    },
    {
      name: 'Universal Herb Classifier',
      accuracy: 89.7,
      status: 'Active',
      lastTrained: '2024-01-08',
      predictions: 2134,
      features: 31,
      type: 'Ensemble',
      confidence: 'Medium'
    }
  ];

  const qualityPredictions = [
    {
      batchId: 'BATCH_ASH_2024_003',
      species: 'Ashwagandha',
      predictedQuality: 94.5,
      confidence: 92,
      riskFactors: ['Moisture content trending up', 'Collection timing optimal'],
      recommendation: 'Process within 24 hours',
      priority: 'High',
      expectedGrade: 'Premium'
    },
    {
      batchId: 'BATCH_TUL_2024_011',
      species: 'Tulsi',
      predictedQuality: 87.2,
      confidence: 89,
      riskFactors: ['Partial contamination risk', 'Weather impact moderate'],
      recommendation: 'Additional testing required',
      priority: 'Medium',
      expectedGrade: 'Standard'
    },
    {
      batchId: 'BATCH_BRA_2024_007',
      species: 'Brahmi',
      predictedQuality: 91.8,
      confidence: 95,
      riskFactors: ['All parameters optimal', 'Collection zone verified'],
      recommendation: 'Fast-track processing',
      priority: 'Low',
      expectedGrade: 'Premium'
    },
    {
      batchId: 'BATCH_NEE_2024_001',
      species: 'Neem',
      predictedQuality: 76.3,
      confidence: 87,
      riskFactors: ['High pesticide probability', 'Off-season collection'],
      recommendation: 'Enhanced quality control',
      priority: 'Critical',
      expectedGrade: 'Substandard'
    }
  ];

  const demandForecasts = [
    {
      species: 'Ashwagandha',
      currentDemand: 'High',
      predictedChange: '+25%',
      timeframe: '30 days',
      confidence: 94,
      factors: ['Seasonal demand peak', 'Export orders increase'],
      trend: 'up'
    },
    {
      species: 'Tulsi',
      currentDemand: 'Medium',
      predictedChange: '+5%',
      timeframe: '30 days',
      confidence: 87,
      factors: ['Stable domestic market', 'New product launches'],
      trend: 'up'
    },
    {
      species: 'Brahmi',
      currentDemand: 'Medium',
      predictedChange: '-10%',
      timeframe: '30 days',
      confidence: 82,
      factors: ['Inventory surplus', 'Seasonal decline'],
      trend: 'down'
    },
    {
      species: 'Turmeric',
      currentDemand: 'High',
      predictedChange: '+15%',
      timeframe: '30 days',
      confidence: 91,
      factors: ['Health trend continuation', 'International demand'],
      trend: 'up'
    }
  ];

  const riskAssessments = [
    {
      category: 'Quality Risk',
      level: 'Low',
      score: 15,
      factors: [
        'Weather conditions favorable',
        'Collection practices compliant',
        'Processing parameters optimal'
      ],
      mitigation: 'Continue standard monitoring'
    },
    {
      category: 'Supply Risk',
      level: 'Medium',
      score: 45,
      factors: [
        'Seasonal variations expected',
        'Some collector capacity constraints',
        'Transportation delays possible'
      ],
      mitigation: 'Increase buffer stock, diversify suppliers'
    },
    {
      category: 'Contamination Risk',
      level: 'Low',
      score: 22,
      factors: [
        'Clean collection zones verified',
        'No recent contamination events',
        'Testing protocols effective'
      ],
      mitigation: 'Maintain current protocols'
    },
    {
      category: 'Compliance Risk',
      level: 'Very Low',
      score: 8,
      factors: [
        'All certifications current',
        'Audit results positive',
        'Documentation complete'
      ],
      mitigation: 'Standard compliance monitoring'
    }
  ];

  const modelPerformance = [
    { metric: 'Overall Accuracy', value: modelAccuracy.toFixed(1) + '%', target: '95%' },
    { metric: 'Precision', value: '93.2%', target: '90%' },
    { metric: 'Recall', value: '91.8%', target: '90%' },
    { metric: 'F1 Score', value: '92.5%', target: '90%' },
    { metric: 'False Positive Rate', value: '4.3%', target: '<5%' },
    { metric: 'Processing Time', value: '0.8s', target: '<2s' }
  ];

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'text-green-600';
    if (quality >= 80) return 'text-blue-600';
    if (quality >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Very Low':
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">AI-Powered Analytics</Badge>
            <span className="text-sm text-gray-600">ML Engine v4.2</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Quality Prediction & Analytics</h1>
          <p className="text-gray-600">Machine learning-powered quality assessment and demand forecasting</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="predictions" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="predictions">Quality Predictions</TabsTrigger>
            <TabsTrigger value="demand">Demand Forecast</TabsTrigger>
            <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
            <TabsTrigger value="models">ML Models</TabsTrigger>
            <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="mt-6">
            {/* AI Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Model Accuracy</p>
                      <p className="text-2xl font-bold">{modelAccuracy.toFixed(1)}%</p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Predictions Today</p>
                      <p className="text-2xl font-bold">{predictionsToday}</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">High Quality Predicted</p>
                      <p className="text-2xl font-bold">89%</p>
                    </div>
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Risk Alerts</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quality Predictions */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Quality Predictions</CardTitle>
                <CardDescription>AI-powered quality assessment for current batches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityPredictions.map((prediction) => (
                    <div key={prediction.batchId} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{prediction.batchId}</h4>
                          <p className="text-sm text-gray-600">{prediction.species}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            prediction.priority === 'Critical' ? 'destructive' :
                            prediction.priority === 'High' ? 'default' :
                            prediction.priority === 'Medium' ? 'secondary' : 'outline'
                          }>
                            {prediction.priority} Priority
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Predicted Quality</p>
                          <p className={`text-xl font-bold ${getQualityColor(prediction.predictedQuality)}`}>
                            {prediction.predictedQuality}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Confidence</p>
                          <p className="text-xl font-bold">{prediction.confidence}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Expected Grade</p>
                          <p className="text-xl font-bold">{prediction.expectedGrade}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Recommendation</p>
                          <p className="font-medium text-blue-600">{prediction.recommendation}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Risk Factors:</p>
                        <div className="flex flex-wrap gap-2">
                          {prediction.riskFactors.map((factor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demand" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Demand Forecasts */}
              <Card>
                <CardHeader>
                  <CardTitle>Demand Forecasting</CardTitle>
                  <CardDescription>AI-powered demand predictions for next 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {demandForecasts.map((forecast) => (
                      <div key={forecast.species} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{forecast.species}</h4>
                            <p className="text-sm text-gray-600">Current: {forecast.currentDemand} Demand</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              {forecast.trend === 'up' ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                              <span className={`font-bold ${
                                forecast.trend === 'up' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {forecast.predictedChange}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600">Timeframe</p>
                            <p className="font-medium">{forecast.timeframe}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Confidence</p>
                            <p className="font-medium">{forecast.confidence}%</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Key Factors:</p>
                          <div className="flex flex-wrap gap-2">
                            {forecast.factors.map((factor, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Intelligence</CardTitle>
                  <CardDescription>Advanced market trends and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Demand trend visualization</p>
                        <p className="text-xs text-gray-500">Historical and predicted demand patterns</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-600">Market Growth</p>
                        <p className="text-xl font-bold text-blue-800">+18%</p>
                        <p className="text-xs text-blue-600">Year over year</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-600">Export Potential</p>
                        <p className="text-xl font-bold text-green-800">High</p>
                        <p className="text-xs text-green-600">42 countries</p>
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
                          <span>Demand elasticity:</span>
                          <span className="font-medium">-0.85</span>
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

          <TabsContent value="risk" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Risk Assessment</CardTitle>
                  <CardDescription>Automated risk detection and mitigation strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskAssessments.map((risk) => (
                      <div key={risk.category} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold">{risk.category}</h4>
                          <div className="text-right">
                            <Badge variant={
                              risk.level === 'Very Low' || risk.level === 'Low' ? 'default' :
                              risk.level === 'Medium' ? 'secondary' : 'destructive'
                            }>
                              {risk.level} Risk
                            </Badge>
                            <p className={`text-sm font-bold ${getRiskColor(risk.level)}`}>
                              Score: {risk.score}/100
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <Progress 
                            value={risk.score} 
                            className={`h-2 ${
                              risk.level === 'Very Low' || risk.level === 'Low' ? 'bg-green-100' :
                              risk.level === 'Medium' ? 'bg-yellow-100' : 'bg-red-100'
                            }`}
                          />
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">Contributing Factors:</p>
                          <ul className="text-sm space-y-1">
                            {risk.factors.map((factor, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 rounded p-3">
                          <p className="text-sm text-gray-600 mb-1">Recommended Action:</p>
                          <p className="text-sm font-medium">{risk.mitigation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Predictive Alerts</CardTitle>
                  <CardDescription>AI-generated early warning system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-yellow-800">Weather Impact Alert</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            75% probability of quality degradation in Rajasthan region due to predicted monsoon conditions.
                          </p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Confidence: 87%</span>
                            <span>2 days ahead</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-800">Quality Optimization</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            Optimal harvesting window detected for BATCH_ASH_2024_005. Process within 18 hours for premium grade.
                          </p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Confidence: 94%</span>
                            <span>Real-time</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-red-800">Contamination Risk</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            Elevated contamination probability detected near collection zone ZONE_GUJ_07. Recommend additional testing.
                          </p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Confidence: 91%</span>
                            <span>1 hour ago</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">System Performance</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm text-green-600">Alert Accuracy</p>
                          <p className="text-lg font-bold text-green-800">96.3%</p>
                        </div>
                        <div>
                          <p className="text-sm text-green-600">Early Detection</p>
                          <p className="text-lg font-bold text-green-800">4.2 hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="models" className="mt-6">
            <div className="space-y-6">
              {/* Model Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Model Performance Metrics</CardTitle>
                  <CardDescription>Real-time performance statistics for all ML models</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {modelPerformance.map((metric) => (
                      <div key={metric.metric} className="border rounded-lg p-3">
                        <p className="text-sm text-gray-600">{metric.metric}</p>
                        <p className="text-lg font-bold">{metric.value}</p>
                        <p className="text-xs text-gray-500">Target: {metric.target}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Individual Models */}
              <div className="space-y-4">
                {qualityModels.map((model) => (
                  <Card key={model.name}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{model.name}</h3>
                          <p className="text-sm text-gray-600">{model.type} Model</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={model.status === 'Active' ? 'default' : 'secondary'}>
                            {model.status}
                          </Badge>
                          <Badge variant="outline">{model.confidence} Confidence</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Accuracy</p>
                          <p className="text-xl font-bold text-green-600">{model.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Predictions</p>
                          <p className="text-xl font-bold">{model.predictions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Features</p>
                          <p className="text-xl font-bold">{model.features}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Trained</p>
                          <p className="font-medium">{model.lastTrained}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="mr-2 h-4 w-4" />
                            Test
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Model Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <span>• GPS coordinates</span>
                          <span>• Environmental conditions</span>
                          <span>• Collection timing</span>
                          <span>• Collector history</span>
                          <span>• Processing parameters</span>
                          <span>• Historical quality data</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Advanced Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analytics Dashboard</CardTitle>
                  <CardDescription>Deep insights and pattern recognition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Interactive analytics visualization</p>
                        <p className="text-xs text-gray-500">Quality trends, correlations, and insights</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm text-purple-600">Pattern Detection</p>
                        <p className="text-xl font-bold text-purple-800">23</p>
                        <p className="text-xs text-purple-600">Quality patterns identified</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-600">Correlation Analysis</p>
                        <p className="text-xl font-bold text-blue-800">0.87</p>
                        <p className="text-xs text-blue-600">Weather-quality correlation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Insights</CardTitle>
                  <CardDescription>Automated discovery of actionable insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Quality Optimization Insight</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Collections performed between 6-8 AM show 15% higher quality scores compared to afternoon collections.
                      </p>
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-600">Confidence: 92%</span>
                        <span className="text-gray-500">Based on 1,247 samples</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Regional Performance</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Rajasthan region consistently produces 12% higher withanolide content in Ashwagandha compared to other regions.
                      </p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-600">Confidence: 89%</span>
                        <span className="text-gray-500">3-month analysis</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Seasonal Optimization</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Post-monsoon collections (Oct-Nov) show optimal moisture balance and compound concentration.
                      </p>
                      <div className="flex justify-between text-xs">
                        <span className="text-yellow-600">Confidence: 95%</span>
                        <span className="text-gray-500">Historical data</span>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Full Analytics Report
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