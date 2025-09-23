import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Network, 
  Zap, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface BlockchainStatusProps {
  isVisible?: boolean;
}

export function BlockchainStatus({ isVisible = true }: BlockchainStatusProps) {
  const [status, setStatus] = useState({
    isOnline: true,
    lastBlockTime: new Date(),
    transactionCount: 156,
    networkNodes: 12,
    consensusHealth: 98,
    avgBlockTime: 2.3
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const updateStatus = () => {
      // Simulate real blockchain metrics
      setStatus(prev => ({
        isOnline: Math.random() > 0.05, // 95% uptime
        lastBlockTime: new Date(Date.now() - Math.random() * 30000), // Within last 30 seconds
        transactionCount: prev.transactionCount + Math.floor(Math.random() * 5),
        networkNodes: 12 + Math.floor(Math.random() * 8),
        consensusHealth: 95 + Math.random() * 5,
        avgBlockTime: 2 + Math.random() * 2
      }));
    };

    // Update every 10 seconds
    const interval = setInterval(updateStatus, 10000);
    updateStatus(); // Initial update

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStatus(prev => ({
      ...prev,
      lastBlockTime: new Date(),
      transactionCount: prev.transactionCount + Math.floor(Math.random() * 3)
    }));
    
    setIsRefreshing(false);
  };

  if (!isVisible) return null;

  const getStatusColor = () => {
    if (!status.isOnline) return 'red';
    if (status.consensusHealth < 90) return 'yellow';
    return 'green';
  };

  const statusColor = getStatusColor();

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Network className={`h-8 w-8 text-${statusColor}-600`} />
              {status.isOnline && (
                <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${statusColor}-500 rounded-full animate-pulse`}></div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Blockchain Network</h3>
              <p className="text-sm text-gray-600">Hyperledger Fabric</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={status.isOnline ? 'default' : 'destructive'}>
              {status.isOnline ? 'Online' : 'Offline'}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Network Status */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              {status.isOnline ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-600" />
              )}
            </div>
            <div className="text-sm font-medium text-gray-900">Network Status</div>
            <div className="text-xs text-gray-600">
              {status.isOnline ? 'Operational' : 'Degraded'}
            </div>
          </div>

          {/* Transaction Count */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">Transactions</div>
            <div className="text-xs text-gray-600">
              {status.transactionCount.toLocaleString()}
            </div>
          </div>

          {/* Network Nodes */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Network className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">Active Nodes</div>
            <div className="text-xs text-gray-600">
              {status.networkNodes}
            </div>
          </div>

          {/* Consensus Health */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">Consensus</div>
            <div className="text-xs text-gray-600">
              {status.consensusHealth.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Network Performance */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Performance Metrics</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Live Data
            </Badge>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Avg Block Time:</span>
              <span className="ml-2 font-medium">{status.avgBlockTime.toFixed(1)}s</span>
            </div>
            <div>
              <span className="text-gray-600">Last Block:</span>
              <span className="ml-2 font-medium">
                {Math.floor((Date.now() - status.lastBlockTime.getTime()) / 1000)}s ago
              </span>
            </div>
          </div>
        </div>

        {/* Health Indicator */}
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 bg-${statusColor}-500 rounded-full animate-pulse`}></div>
            <span className="text-gray-600">
              Network Health: 
              <span className={`ml-1 font-medium text-${statusColor}-600`}>
                {status.consensusHealth.toFixed(1)}%
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}