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
import { 
  ArrowLeft, 
  MapPin, 
  Camera, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  Clock,
  Leaf,
  Users,
  Calendar
} from 'lucide-react';

interface CollectorInterfaceProps {
  onBack: () => void;
}

export function CollectorInterface({ onBack }: CollectorInterfaceProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [formData, setFormData] = useState({
    collectorId: 'COL_2024_001',
    species: '',
    quantity: '',
    location: t('collector.location_placeholder'),
    coordinates: '19.0760°N, 72.8777°E',
    notes: ''
  });

  const steps = [
    t('collector.steps.location'),
    t('collector.steps.species'),
    t('collector.steps.quality'),
    t('collector.steps.blockchain')
  ];

  const herbSpecies = [
    { key: 'ashwagandha', value: 'Ashwagandha (Withania somnifera)', label: t('herb.ashwagandha') },
    { key: 'brahmi', value: 'Brahmi (Bacopa monnieri)', label: t('herb.brahmi') },
    { key: 'tulsi', value: 'Tulsi (Ocimum sanctum)', label: t('herb.tulsi') },
    { key: 'neem', value: 'Neem (Azadirachta indica)', label: t('herb.neem') },
    { key: 'turmeric', value: 'Turmeric (Curcuma longa)', label: t('herb.turmeric') },
    { key: 'amla', value: 'Amla (Phyllanthus emblica)', label: t('herb.amla') }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    // Simulate blockchain submission
    setTimeout(() => {
      setIsOnline(true);
      alert(t('collector.success_message'));
      onBack();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="h-5 w-5 text-green-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-600" />
            )}
            <span className="text-sm font-medium">
              {isOnline ? t('collector.online') : t('collector.offline')}
            </span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('collector.title')}</h1>
          <p className="text-gray-600">{t('collector.subtitle')}</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{t('collector.step')} {currentStep + 1} {t('collector.of')} {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-2" />
          <p className="text-sm font-medium text-center">{steps[currentStep]}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto">
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-green-600" />
                {t('collector.location_capture')}
              </CardTitle>
              <CardDescription>
                {t('collector.location_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-800">{t('collector.gps_status')}</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-green-700">{formData.coordinates}</p>
                <p className="text-xs text-green-600 mt-1">{t('collector.accuracy')}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t('collector.location_name')}</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={t('collector.location_placeholder')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-blue-600">{t('collector.temperature')}</p>
                  <p className="font-semibold text-blue-800">24°C</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-purple-600">{t('collector.humidity')}</p>
                  <p className="font-semibold text-purple-800">65%</p>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full">
                {t('collector.confirm_location')}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-green-600" />
                {t('collector.species_id')}
              </CardTitle>
              <CardDescription>
                {t('collector.species_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="species">{t('collector.herb_species')}</Label>
                <Select value={formData.species} onValueChange={(value) => setFormData({ ...formData, species: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('collector.select_species')} />
                  </SelectTrigger>
                  <SelectContent>
                    {herbSpecies.map((species) => (
                      <SelectItem key={species.key} value={species.value}>
                        {species.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">{t('collector.quantity')}</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder={t('collector.quantity_placeholder')}
                />
              </div>

              <div className="space-y-2">
                <Label>{t('collector.photo_doc')}</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">{t('collector.photo_capture')}</p>
                  <p className="text-xs text-gray-500">{t('collector.photo_desc')}</p>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full" disabled={!formData.species || !formData.quantity}>
                {t('collector.continue_quality')}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                {t('collector.quality_title')}
              </CardTitle>
              <CardDescription>
                {t('collector.quality_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <Badge variant="outline" className="mb-1">{t('collector.maturity')}</Badge>
                  <p className="text-xs">{t('collector.optimal')}</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-1">{t('collector.color')}</Badge>
                  <p className="text-xs">{t('collector.good')}</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-1">{t('collector.moisture')}</Badge>
                  <p className="text-xs">{t('collector.normal')}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t('collector.collection_notes')}</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t('collector.notes_placeholder')}
                  rows={4}
                />
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-1">{t('collector.sustainability')}</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-700">{t('collector.approved_zone')}</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-700">{t('collector.seasonal_met')}</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-700">{t('collector.sustainable_qty')}</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full">
                {t('collector.record_event')}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-600" />
                {t('collector.blockchain_title')}
              </CardTitle>
              <CardDescription>
                {t('collector.blockchain_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{t('collector.collector_id')}</span>
                  <span className="text-sm text-gray-600">{formData.collectorId}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{t('collector.species')}</span>
                  <span className="text-sm text-gray-600">{formData.species.split('(')[0].trim()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{t('collector.quantity')}</span>
                  <span className="text-sm text-gray-600">{formData.quantity} kg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{t('collector.gps_location')}</span>
                  <span className="text-sm text-gray-600">{formData.coordinates}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">{t('collector.smart_contract')}</h4>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-blue-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    {t('collector.boundaries_verified')}
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    {t('collector.limits_quota')}
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    {t('collector.restrictions_complied')}
                  </div>
                </div>
              </div>

              <Button onClick={handleSubmit} className="w-full">
                {t('collector.submit_blockchain')}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                {t('collector.sync_message')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Collector Info */}
      <div className="max-w-md mx-auto mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Ramesh Kumar</p>
                  <p className="text-sm text-gray-600">{t('collector.certified')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formData.collectorId}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {t('collector.today')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}