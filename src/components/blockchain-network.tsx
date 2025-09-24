import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useLanguage } from './language/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Server, 
  Network, 
  Cpu, 
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  Database,
  Shield,
  Zap,
  Globe,
  Link,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface BlockchainNetworkProps {
  onBack: () => void;
}

export function BlockchainNetwork({ onBack }: BlockchainNetworkProps) {
  const { t } = useLanguage();
  const [networkStatus, setNetworkStatus] = useState('connected');
  const [blockHeight, setBlockHeight] = useState(2341);
  const [transactionThroughput, setTransactionThroughput] = useState(245);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight(prev => prev + Math.floor(Math.random() * 3));
      setTransactionThroughput(prev => prev + Math.floor(Math.random() * 20 - 10));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const networkNodes = [
    {
      id: 'peer0.org1.visuddha.com',
      type: 'Peer',
      organization: 'Collectors Org',
      status: 'Running',
      location: 'Mumbai, India',
      uptime: '99.97%',
      lastBlock: blockHeight,
      endorsements: 1247
    },
    {
      id: 'peer0.org2.visuddha.com',
      type: 'Peer',
      organization: 'Processors Org',
      status: 'Running',
      location: 'Delhi, India',
      uptime: '99.95%',
      lastBlock: blockHeight,
      endorsements: 1189
    },
    {
      id: 'peer0.org3.visuddha.com',
      type: 'Peer',
      organization: 'Labs Org',
      status: 'Running',
      location: 'Bangalore, India',
      uptime: '99.98%',
      lastBlock: blockHeight,
      endorsements: 856
    },
    {
      id: 'orderer.visuddha.com',
      type: 'Orderer',
      organization: 'Orderer Org',
      status: 'Running',
      location: 'Hyderabad, India',
      uptime: '99.99%',
      lastBlock: blockHeight,
      endorsements: 0
    }
  ];

  const smartContracts = [
    {
      name: 'CollectionContract',
      version: 'v2.1.3',
      status: 'Active',
      calls: 8792,
      gasUsed: '2.3M',
      lastUpdate: '2024-01-15',
      description: 'Manages herb collection events and GPS validation'
    },
    {
      name: 'QualityContract',
      version: 'v1.8.7',
      status: 'Active',
      calls: 3456,
      gasUsed: '1.2M',
      lastUpdate: '2024-01-12',
      description: 'Handles quality test results and certification'
    },
    {
      name: 'ComplianceContract',
      version: 'v1.5.2',
      status: 'Active',
      calls: 5634,
      gasUsed: '1.8M',
      lastUpdate: '2024-01-10',
      description: 'Enforces regulatory compliance and sustainability rules'
    },
    {
      name: 'SupplyChainContract',
      version: 'v3.0.1',
      status: 'Active',
      calls: 12456,
      gasUsed: '4.1M',
      lastUpdate: '2024-01-18',
      description: 'Manages supply chain provenance and tracking'
    }
  ];

  const recentTransactions = [
    {
      txId: '0x8f9e2d3c4b5a6789abcdef123456789abcdef123456789abcdef123456789abc',
      type: 'Collection Event',
      timestamp: '2024-01-18 16:45:23',
      status: 'Confirmed',
      block: blockHeight,
      gasUsed: 21000,
      endorsements: 3
    },
    {
      txId: '0x7e8d1c2b3a4567890bcdef123456789abcdef123456789abcdef123456789abc',
      type: 'Quality Test',
      timestamp: '2024-01-18 16:43:15',
      status: 'Confirmed',
      block: blockHeight - 1,
      gasUsed: 18500,
      endorsements: 3
    },
    {
      txId: '0x6d7c0b1a23456789abcdef123456789abcdef123456789abcdef123456789abc',
      type: 'Processing Step',
      timestamp: '2024-01-18 16:41:07',
      status: 'Confirmed',
      block: blockHeight - 2,
      gasUsed: 19200,
      endorsements: 3
    },
    {
      txId: '0x5c6b9a012345678abcdef123456789abcdef123456789abcdef123456789abc',
      type: 'Compliance Check',
      timestamp: '2024-01-18 16:38:42',
      status: 'Pending',
      block: null,
      gasUsed: 0,
      endorsements: 2
    }
  ];

  const networkMetrics = [
    { label: 'Total Transactions', value: transactionThroughput.toLocaleString(), change: '+5.2%' },
    { label: 'Average Block Time', value: '4.2s', change: '-0.3s' },
    { label: 'Network Throughput', value: '58 TPS', change: '+12%' },
    { label: 'Consensus Time', value: '2.1s', change: '-0.1s' },
    { label: 'Network Latency', value: '45ms', change: '-5ms' },
    { label: 'Active Channels', value: '4', change: '0' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <div className="flex items-center space-x-2">
            <Badge variant={networkStatus === 'connected' ? 'default' : 'destructive'}>
              {networkStatus === 'connected' ? 'Network Online' : 'Network Issues'}
            </Badge>
            <span className="text-sm text-gray-600">Hyperledger Fabric v2.5</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blockchain Network Management</h1>
          <p className="text-gray-600">Real-time monitoring and management of Hyperledger Fabric network</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Network Overview</TabsTrigger>
            <TabsTrigger value="nodes">Network Nodes</TabsTrigger>
            <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Network Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Block Height</p>
                      <p className="text-2xl font-bold">{blockHeight.toLocaleString()}</p>
                    </div>
                    <Database className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Nodes</p>
                      <p className="text-2xl font-bold">4</p>
                    </div>
                    <Server className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">TPS</p>
                      <p className="text-2xl font-bold">58</p>
                    </div>
                    <Activity className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Network Health</p>
                      <p className="text-2xl font-bold">99.7%</p>
                    </div>
                    <Shield className="h-8 w-8 text-emerald-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Network Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Network Performance Metrics</CardTitle>
                  <CardDescription>Real-time blockchain network statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {networkMetrics.map((metric) => (
                      <div key={metric.label} className="border rounded-lg p-3">
                        <p className="text-sm text-gray-600">{metric.label}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold">{metric.value}</p>
                          <span className={`text-sm ${
                            metric.change.startsWith('+') ? 'text-green-600' : 
                            metric.change.startsWith('-') && metric.change !== '-0.3s' && metric.change !== '-0.1s' && metric.change !== '-5ms' ? 'text-red-600' : 
                            'text-green-600'
                          }`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Network Topology</CardTitle>
                  <CardDescription>Current network configuration and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Network className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Interactive network topology visualization</p>
                        <p className="text-xs text-gray-500">4 organizations, 8 peers, 1 orderer</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-blue-600">Organizations</p>
                        <p className="text-xl font-bold text-blue-800">4</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-green-600">Channels</p>
                        <p className="text-xl font-bold text-green-800">4</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Network Operations</CardTitle>
                <CardDescription>Common network management operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-16 flex flex-col items-center justify-center">
                    <Play className="h-6 w-6 mb-2" />
                    <span>Deploy Contract</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                    <RefreshCw className="h-6 w-6 mb-2" />
                    <span>Sync Network</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                    <Settings className="h-6 w-6 mb-2" />
                    <span>Network Config</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nodes" className="mt-6">
            <div className="space-y-6">
              {networkNodes.map((node) => (
                <Card key={node.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{node.id}</h3>
                        <p className="text-sm text-gray-600">{node.organization}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={node.status === 'Running' ? 'default' : 'destructive'}>
                          {node.status}
                        </Badge>
                        <Badge variant="outline">{node.type}</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{node.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Uptime</p>
                        <p className="font-medium text-green-600">{node.uptime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Block</p>
                        <p className="font-medium">{node.lastBlock}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Endorsements</p>
                        <p className="font-medium">{node.endorsements.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Monitor</Button>
                        <Button size="sm" variant="outline">Logs</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="mt-6">
            <div className="space-y-6">
              {smartContracts.map((contract) => (
                <Card key={contract.name}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{contract.name}</h3>
                        <p className="text-sm text-gray-600">{contract.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">{contract.status}</Badge>
                        <Badge variant="outline">{contract.version}</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Total Calls</p>
                        <p className="font-medium">{contract.calls.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Gas Used</p>
                        <p className="font-medium">{contract.gasUsed}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Update</p>
                        <p className="font-medium">{contract.lastUpdate}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Zap className="mr-2 h-4 w-4" />
                          Invoke
                        </Button>
                        <Button size="sm" variant="outline">Query</Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Recent Function Calls</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>recordCollection()</span>
                          <span className="text-gray-600">45 calls</span>
                        </div>
                        <div className="flex justify-between">
                          <span>validateGPS()</span>
                          <span className="text-gray-600">38 calls</span>
                        </div>
                        <div className="flex justify-between">
                          <span>updateQuality()</span>
                          <span className="text-gray-600">29 calls</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest blockchain transactions across the network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div key={tx.txId} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{tx.type}</h4>
                          <p className="text-xs text-gray-500 font-mono">{tx.txId}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={tx.status === 'Confirmed' ? 'default' : 'secondary'}>
                            {tx.status}
                          </Badge>
                          {tx.status === 'Confirmed' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-600" />
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Timestamp</p>
                          <p className="font-medium">{tx.timestamp}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Block</p>
                          <p className="font-medium">{tx.block || 'Pending'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Gas Used</p>
                          <p className="font-medium">{tx.gasUsed.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Endorsements</p>
                          <p className="font-medium">{tx.endorsements}/3</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}