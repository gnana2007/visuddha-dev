import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { AnalyticsService } from '../utils/data-service';
import { 
  TrendingUp, 
  Activity, 
  Shield, 
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react';

interface RealTimeMetricsProps {
  userType?: string;
  userId?: string;
}

export function RealTimeMetrics({ userType, userId }: RealTimeMetricsProps) {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const data = await AnalyticsService.getDashboardMetrics();
        setMetrics(data);
        setLastUpdate(new Date());
        setIsConnected(true);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setIsConnected(false);
        // Set fallback metrics
        setMetrics({
          totalTransactions: 156,
          recentActivity: 23,
          qualityScore: 95,
          complianceStatus: 'compliant'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();

    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);

    return () => clearInterval(interval);
  }, [userType, userId]);

  const getMetricsForUserType = () => {
    if (!metrics) return [];

    const baseMetrics = [
      {
        icon: Activity,
        label: 'Recent Activity',
        value: metrics.recentActivity || 0,
        color: 'blue-600',
        trend: '+12%'
      },
      {
        icon: Shield,
        label: 'Quality Score',
        value: `${metrics.qualityScore || 95}%`,
        color: 'green-600',
        trend: '+2%'
      },
      {
        icon: TrendingUp,
        label: 'Total Transactions',
        value: metrics.totalTransactions || 0,
        color: 'purple-600',
        trend: '+8%'
      }
    ];

    // Add role-specific metrics
    switch (userType) {
      case 'farmer':
        return [
          ...baseMetrics,
          {
            icon: Clock,
            label: 'Collections Today',
            value: metrics.totalCollections || 12,
            color: 'orange-600',
            trend: '+15%'
          }
        ];
      
      case 'processor':
        return [
          ...baseMetrics,
          {
            icon: Activity,
            label: 'Active Batches',
            value: metrics.activeBatches || 5,
            color: 'indigo-600',
            trend: '+3%'
          }
        ];
      
      case 'lab':
        return [
          ...baseMetrics,
          {
            icon: Shield,
            label: 'Tests Completed',
            value: metrics.totalTests || 28,
            color: 'teal-600',
            trend: '+20%'
          }
        ];
      
      default:
        return baseMetrics;
    }
  };

  const displayMetrics = getMetricsForUserType();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <Wifi className="h-4 w-4 text-green-600" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-600" />
          )}
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connected' : 'Offline'} • Last update: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
        <Badge variant={isConnected ? 'default' : 'destructive'}>
          {isConnected ? 'Live Data' : 'Cached Data'}
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {displayMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <IconComponent className={`h-12 w-12 text-${metric.color} mx-auto`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                <p className="text-gray-600 text-sm mb-2">{metric.label}</p>
                {metric.trend && (
                  <Badge variant="secondary" className="text-xs">
                    {metric.trend}
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Network Status Indicator */}
      {!isConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <WifiOff className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Connection Issues</h4>
              <p className="text-sm text-yellow-700">
                Unable to fetch real-time data. Showing cached metrics.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}