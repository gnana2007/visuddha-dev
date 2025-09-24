import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Settings, 
  Users, 
  Shield,
  Database,
  Bell,
  Globe,
  Key,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Plus,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Save,
  Lock,
  Unlock,
  Mail,
  Smartphone,
  Wifi,
  HardDrive,
  Cpu,
  Activity,
  BarChart3,
  Zap,
  Network,
  FileText,
  Calendar,
  Search
} from 'lucide-react';
import { useLanguage } from './language/language-context';

interface SettingsAdministrationProps {
  onBack: () => void;
}

export function SettingsAdministration({ onBack }: SettingsAdministrationProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('system');

  // System Configuration
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    dataRetention: 365,
    sessionTimeout: 30,
    maxConcurrentUsers: 1000,
    enableTwoFactor: true,
    allowDataExport: true,
    enableAuditLog: true
  });

  // User Management Data
  const users = [
    {
      id: 'U001',
      name: 'Admin User',
      email: 'admin@visuddha.com',
      role: 'System Administrator',
      status: 'active',
      lastLogin: '2024-01-19 14:30',
      permissions: ['full_access', 'user_management', 'system_config'],
      twoFactorEnabled: true
    },
    {
      id: 'U002',
      name: 'Quality Manager',
      email: 'quality@visuddha.com',
      role: 'Quality Controller',
      status: 'active',
      lastLogin: '2024-01-19 13:45',
      permissions: ['quality_management', 'lab_access', 'reports'],
      twoFactorEnabled: false
    },
    {
      id: 'U003',
      name: 'Operations Manager',
      email: 'ops@visuddha.com',
      role: 'Operations',
      status: 'active',
      lastLogin: '2024-01-19 12:20',
      permissions: ['operations', 'processing', 'blockchain'],
      twoFactorEnabled: true
    },
    {
      id: 'U004',
      name: 'Support Staff',
      email: 'support@visuddha.com',
      role: 'Support',
      status: 'inactive',
      lastLogin: '2024-01-15 16:10',
      permissions: ['basic_access', 'farmer_support'],
      twoFactorEnabled: false
    }
  ];

  // System Status
  const systemStatus = {
    uptime: '99.97%',
    responseTime: '145ms',
    activeUsers: 247,
    totalTransactions: 15847,
    storageUsed: 67,
    cpuUsage: 34,
    memoryUsage: 52,
    networkTraffic: 'Normal'
  };

  // Audit Logs
  const auditLogs = [
    {
      id: 'A001',
      timestamp: '2024-01-19 14:30:15',
      user: 'admin@visuddha.com',
      action: 'User Role Modified',
      details: 'Changed role for quality@visuddha.com from Viewer to Quality Controller',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: 'A002',
      timestamp: '2024-01-19 13:45:22',
      user: 'quality@visuddha.com',
      action: 'Quality Report Generated',
      details: 'Generated monthly quality report for December 2023',
      ipAddress: '192.168.1.105',
      status: 'success'
    },
    {
      id: 'A003',
      timestamp: '2024-01-19 12:20:33',
      user: 'ops@visuddha.com',
      action: 'System Configuration Changed',
      details: 'Modified blockchain network parameters',
      ipAddress: '192.168.1.110',
      status: 'warning'
    },
    {
      id: 'A004',
      timestamp: '2024-01-19 11:15:44',
      user: 'system',
      action: 'Automated Backup',
      details: 'Daily backup completed successfully - 2.3GB',
      ipAddress: 'localhost',
      status: 'success'
    },
    {
      id: 'A005',
      timestamp: '2024-01-19 10:30:55',
      user: 'unknown',
      action: 'Login Attempt Failed',
      details: 'Multiple failed login attempts for admin account',
      ipAddress: '203.192.24.55',
      status: 'error'
    }
  ];

  // Blockchain Configuration
  const blockchainConfig = {
    networkName: 'Visuddha Hyperledger Fabric',
    consensus: 'PBFT',
    blockTime: '4.2s',
    peers: 8,
    orderers: 3,
    channels: 4,
    chaincodes: 5,
    tlsEnabled: true,
    encryptionLevel: 'AES-256'
  };

  // API Configuration
  const apiConfig = [
    {
      name: 'Collection API',
      endpoint: '/api/v1/collection',
      status: 'active',
      requests: 1247,
      latency: '120ms',
      errorRate: 0.2
    },
    {
      name: 'Quality API',
      endpoint: '/api/v1/quality',
      status: 'active',
      requests: 856,
      latency: '95ms',
      errorRate: 0.1
    },
    {
      name: 'Blockchain API',
      endpoint: '/api/v1/blockchain',
      status: 'active',
      requests: 2341,
      latency: '180ms',
      errorRate: 0.3
    },
    {
      name: 'Analytics API',
      endpoint: '/api/v1/analytics',
      status: 'maintenance',
      requests: 456,
      latency: '250ms',
      errorRate: 1.2
    }
  ];

  const handleSettingChange = (setting: string, value: any) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'inactive': return 'text-red-600';
      case 'maintenance': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'destructive';
      case 'maintenance': return 'secondary';
      default: return 'outline';
    }
  };

  const getLogStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getLogStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 p-4">
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
              Export Config
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Badge variant="outline">Admin Access</Badge>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Administration</h1>
          <p className="text-gray-600">Comprehensive system settings and configuration management</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Core system settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance">Maintenance Mode</Label>
                        <p className="text-sm text-gray-600">Put system in maintenance mode</p>
                      </div>
                      <Switch
                        id="maintenance"
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="backup">Auto Backup</Label>
                        <p className="text-sm text-gray-600">Enable automatic daily backups</p>
                      </div>
                      <Switch
                        id="backup"
                        checked={systemSettings.autoBackup}
                        onCheckedChange={(checked: boolean) => handleSettingChange('autoBackup', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notif">Email Notifications</Label>
                        <p className="text-sm text-gray-600">Send system notifications via email</p>
                      </div>
                      <Switch
                        id="email-notif"
                        checked={systemSettings.emailNotifications}
                        onCheckedChange={(checked: boolean) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notif">SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Send critical alerts via SMS</p>
                      </div>
                      <Switch
                        id="sms-notif"
                        checked={systemSettings.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="retention">Data Retention (days)</Label>
                      <Input
                        id="retention"
                        type="number"
                        value={systemSettings.dataRetention}
                        onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session">Session Timeout (minutes)</Label>
                      <Input
                        id="session"
                        type="number"
                        value={systemSettings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="users">Max Concurrent Users</Label>
                      <Input
                        id="users"
                        type="number"
                        value={systemSettings.maxConcurrentUsers}
                        onChange={(e) => handleSettingChange('maxConcurrentUsers', parseInt(e.target.value))}
                      />
                    </div>

                    <Button className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Real-time system health and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-600">Uptime</span>
                          <Activity className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-lg font-bold text-green-800">{systemStatus.uptime}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-600">Response Time</span>
                          <Zap className="h-4 w-4 text-blue-600" />
                        </div>
                        <p className="text-lg font-bold text-blue-800">{systemStatus.responseTime}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPU Usage</span>
                          <span>{systemStatus.cpuUsage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${systemStatus.cpuUsage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Memory Usage</span>
                          <span>{systemStatus.memoryUsage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${systemStatus.memoryUsage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Storage Used</span>
                          <span>{systemStatus.storageUsed}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${systemStatus.storageUsed}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Active Users:</span>
                        <span className="font-medium ml-1">{systemStatus.activeUsers}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Transactions:</span>
                        <span className="font-medium ml-1">{systemStatus.totalTransactions.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <Button variant="outline" className="w-full">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Detailed Metrics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API Status */}
              <Card>
                <CardHeader>
                  <CardTitle>API Status</CardTitle>
                  <CardDescription>External API endpoints and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {apiConfig.map((api) => (
                      <div key={api.name} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{api.name}</h4>
                            <p className="text-xs text-gray-600 font-mono">{api.endpoint}</p>
                          </div>
                          <Badge variant={getStatusBadge(api.status)}>
                            {api.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-gray-600">Requests:</span>
                            <span className="font-medium ml-1">{api.requests}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Latency:</span>
                            <span className="font-medium ml-1">{api.latency}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Error Rate:</span>
                            <span className={`font-medium ml-1 ${api.errorRate > 1 ? 'text-red-600' : 'text-green-600'}`}>
                              {api.errorRate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Backup & Maintenance */}
              <Card>
                <CardHeader>
                  <CardTitle>Backup & Maintenance</CardTitle>
                  <CardDescription>Data backup and system maintenance operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">Last Backup</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span className="font-medium">2024-01-19 02:00:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span className="font-medium">2.3 GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="font-medium text-green-600">Success</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Create Manual Backup
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Backup
                      </Button>
                      <Button variant="outline" className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        System Maintenance
                      </Button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800 text-sm">Scheduled Maintenance</h4>
                          <p className="text-sm text-yellow-700">
                            Next scheduled maintenance: Sunday, Jan 21, 2024 at 02:00 AM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>Manage system users and their permissions</CardDescription>
                      </div>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">{user.name}</h4>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <p className="text-sm text-gray-500">{user.role}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={getStatusBadge(user.status)}>
                                {user.status}
                              </Badge>
                              {user.twoFactorEnabled && (
                                <Badge variant="outline" className="text-xs">
                                  2FA
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-gray-600">Last Login:</span>
                              <span className="font-medium ml-1">{user.lastLogin}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">User ID:</span>
                              <span className="font-medium ml-1">{user.id}</span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-1">Permissions:</p>
                            <div className="flex flex-wrap gap-1">
                              {user.permissions.map((permission) => (
                                <Badge key={permission} variant="outline" className="text-xs">
                                  {permission.replace('_', ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              {user.status === 'active' ? (
                                <>
                                  <Lock className="h-4 w-4 mr-1" />
                                  Disable
                                </>
                              ) : (
                                <>
                                  <Unlock className="h-4 w-4 mr-1" />
                                  Enable
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Actions */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common user management tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New User
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Invitations
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Key className="mr-2 h-4 w-4" />
                        Reset Passwords
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        Manage Roles
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Export User List
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>User Statistics</CardTitle>
                    <CardDescription>Current user metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-blue-600">Total Users</p>
                          <p className="text-lg font-bold text-blue-800">247</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-green-600">Active Users</p>
                          <p className="text-lg font-bold text-green-800">189</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Administrators:</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quality Controllers:</span>
                          <span className="font-medium">23</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Operations:</span>
                          <span className="font-medium">45</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Farmers:</span>
                          <span className="font-medium">156</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Support Staff:</span>
                          <span className="font-medium">11</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Configuration</CardTitle>
                  <CardDescription>System security settings and policies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor">Enforce Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">Require 2FA for all users</p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={systemSettings.enableTwoFactor}
                        onCheckedChange={(checked) => handleSettingChange('enableTwoFactor', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="audit-log">Enable Audit Logging</Label>
                        <p className="text-sm text-gray-600">Log all system activities</p>
                      </div>
                      <Switch
                        id="audit-log"
                        checked={systemSettings.enableAuditLog}
                        onCheckedChange={(checked) => handleSettingChange('enableAuditLog', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-export">Allow Data Export</Label>
                        <p className="text-sm text-gray-600">Enable data export functionality</p>
                      </div>
                      <Switch
                        id="data-export"
                        checked={systemSettings.allowDataExport}
                        onCheckedChange={(checked) => handleSettingChange('allowDataExport', checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password-policy">Password Policy</Label>
                      <select className="w-full border rounded px-3 py-2 text-sm">
                        <option>Strong (12+ chars, mixed case, numbers, symbols)</option>
                        <option>Medium (8+ chars, mixed case, numbers)</option>
                        <option>Basic (6+ chars, mixed case)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session-policy">Session Policy</Label>
                      <select className="w-full border rounded px-3 py-2 text-sm">
                        <option>Auto-logout after 30 minutes</option>
                        <option>Auto-logout after 1 hour</option>
                        <option>Auto-logout after 4 hours</option>
                        <option>Never auto-logout</option>
                      </select>
                    </div>

                    <Button className="w-full">
                      <Shield className="mr-2 h-4 w-4" />
                      Update Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Security Monitoring */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Monitoring</CardTitle>
                  <CardDescription>Real-time security alerts and threats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-green-600">Blocked Attacks</p>
                        <p className="text-lg font-bold text-green-800">0</p>
                        <p className="text-xs text-green-600">Last 24 hours</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-yellow-600">Failed Logins</p>
                        <p className="text-lg font-bold text-yellow-800">3</p>
                        <p className="text-xs text-yellow-600">Last 24 hours</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">Recent Security Events</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Failed login attempt (admin)</span>
                          <span className="text-red-600">10:30 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Password changed (user123)</span>
                          <span className="text-green-600">09:15 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>2FA enabled (quality@visuddha.com)</span>
                          <span className="text-blue-600">08:45 AM</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">Security Recommendations</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Enable 2FA for all administrative accounts</li>
                        <li>• Review and update password policies</li>
                        <li>• Configure automatic security updates</li>
                        <li>• Set up intrusion detection alerts</li>
                      </ul>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      View Security Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* API Keys */}
              <Card>
                <CardHeader>
                  <CardTitle>API Key Management</CardTitle>
                  <CardDescription>Manage external API access keys</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-sm">Production API Key</h4>
                          <p className="text-xs text-gray-600 font-mono">ak_prod_xxxxxxxxxxxx</p>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Created: 2024-01-01 | Last used: 2024-01-19
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-sm">Testing API Key</h4>
                          <p className="text-xs text-gray-600 font-mono">ak_test_xxxxxxxxxxxx</p>
                        </div>
                        <Badge variant="secondary">Test</Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Created: 2024-01-10 | Last used: 2024-01-18
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Generate New API Key
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Key className="mr-2 h-4 w-4" />
                        Regenerate Keys
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SSL/TLS Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>SSL/TLS Configuration</CardTitle>
                  <CardDescription>Certificate management and encryption settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3 bg-green-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <h4 className="font-medium text-green-800">SSL Certificate Active</h4>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Issuer:</span>
                          <span className="font-medium">Let's Encrypt</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Valid Until:</span>
                          <span className="font-medium">2024-04-19</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Encryption:</span>
                          <span className="font-medium">TLS 1.3</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Renew Certificate
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Custom Certificate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blockchain" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Blockchain Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Network Configuration</CardTitle>
                  <CardDescription>Hyperledger Fabric network settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Network Name:</span>
                        <p className="font-medium">{blockchainConfig.networkName}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Consensus:</span>
                        <p className="font-medium">{blockchainConfig.consensus}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Block Time:</span>
                        <p className="font-medium">{blockchainConfig.blockTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Peers:</span>
                        <p className="font-medium">{blockchainConfig.peers}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Orderers:</span>
                        <p className="font-medium">{blockchainConfig.orderers}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Channels:</span>
                        <p className="font-medium">{blockchainConfig.channels}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Chaincodes:</span>
                        <p className="font-medium">{blockchainConfig.chaincodes}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Encryption:</span>
                        <p className="font-medium">{blockchainConfig.encryptionLevel}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div>
                        <Label>TLS Enabled</Label>
                        <p className="text-sm text-gray-600">Secure communications</p>
                      </div>
                      <Badge variant={blockchainConfig.tlsEnabled ? 'default' : 'destructive'}>
                        {blockchainConfig.tlsEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Network className="mr-2 h-4 w-4" />
                        View Network Topology
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure Network
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chaincode Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Chaincode Management</CardTitle>
                  <CardDescription>Smart contract deployment and management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-sm">CollectionContract</h4>
                          <p className="text-xs text-gray-600">Herb collection management</p>
                        </div>
                        <Badge variant="default">v2.1.3</Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Deployed: 2024-01-15 | Last updated: 2024-01-18
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-sm">QualityContract</h4>
                          <p className="text-xs text-gray-600">Quality assurance tracking</p>
                        </div>
                        <Badge variant="default">v1.8.7</Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Deployed: 2024-01-12 | Last updated: 2024-01-16
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-sm">ComplianceContract</h4>
                          <p className="text-xs text-gray-600">Regulatory compliance</p>
                        </div>
                        <Badge variant="secondary">v1.5.2</Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Deployed: 2024-01-10 | Last updated: 2024-01-14
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Deploy New Chaincode
                      </Button>
                      <Button variant="outline" className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Update Existing
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Network Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Network Health</CardTitle>
                  <CardDescription>Blockchain network performance and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-green-600">Block Height</p>
                        <p className="text-lg font-bold text-green-800">2,341</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-blue-600">TPS</p>
                        <p className="text-lg font-bold text-blue-800">58</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-purple-600">Peers Online</p>
                        <p className="text-lg font-bold text-purple-800">8/8</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">Network Status</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Network Latency:</span>
                          <span className="font-medium text-green-600">45ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Consensus Time:</span>
                          <span className="font-medium">2.1s</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Failed Transactions:</span>
                          <span className="font-medium text-green-600">0</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Activity className="mr-2 h-4 w-4" />
                      View Network Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Backup & Recovery */}
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Backup & Recovery</CardTitle>
                  <CardDescription>Ledger backup and disaster recovery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">Last Ledger Backup</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span className="font-medium">2024-01-19 01:00:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span className="font-medium">890 MB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Blocks:</span>
                          <span className="font-medium">2,341</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="font-medium text-green-600">Success</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Database className="mr-2 h-4 w-4" />
                        Create Ledger Backup
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Backup
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Restore from Backup
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Monitoring */}
              <Card>
                <CardHeader>
                  <CardTitle>System Performance Monitoring</CardTitle>
                  <CardDescription>Real-time system health and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Real-time monitoring charts</p>
                      <p className="text-xs text-gray-500">CPU, Memory, Network, and Disk usage</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">CPU Usage:</span>
                      <span className="font-medium ml-1">{systemStatus.cpuUsage}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Memory:</span>
                      <span className="font-medium ml-1">{systemStatus.memoryUsage}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Storage:</span>
                      <span className="font-medium ml-1">{systemStatus.storageUsed}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Network:</span>
                      <span className="font-medium ml-1">{systemStatus.networkTraffic}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alert Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Alert Configuration</CardTitle>
                  <CardDescription>Configure system alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">CPU Usage Alert</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-gray-600">Alert when CPU usage exceeds 80%</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">Memory Usage Alert</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-gray-600">Alert when memory usage exceeds 85%</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">Disk Space Alert</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-gray-600">Alert when disk usage exceeds 90%</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">Failed Login Alert</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-gray-600">Alert on multiple failed login attempts</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">Blockchain Network Alert</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-gray-600">Alert on blockchain network issues</p>
                    </div>

                    <Button className="w-full">
                      <Bell className="mr-2 h-4 w-4" />
                      Save Alert Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Log Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Log Management</CardTitle>
                  <CardDescription>System logs and error tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-green-50 p-2 rounded text-center">
                        <p className="text-green-600">Info Logs</p>
                        <p className="font-bold text-green-800">2,347</p>
                      </div>
                      <div className="bg-yellow-50 p-2 rounded text-center">
                        <p className="text-yellow-600">Warnings</p>
                        <p className="font-bold text-yellow-800">12</p>
                      </div>
                      <div className="bg-red-50 p-2 rounded text-center">
                        <p className="text-red-600">Errors</p>
                        <p className="font-bold text-red-800">3</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        View System Logs
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Logs
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear Old Logs
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Historical performance data and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">24 Hour Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Average Response Time:</span>
                          <span className="font-medium">145ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Peak CPU Usage:</span>
                          <span className="font-medium">67%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Requests:</span>
                          <span className="font-medium">15,847</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Error Rate:</span>
                          <span className="font-medium text-green-600">0.02%</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Detailed Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Audit Logs</CardTitle>
                    <CardDescription>Complete audit trail of system activities</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search logs..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditLogs.map((log) => {
                    const StatusIcon = getLogStatusIcon(log.status);
                    return (
                      <div key={log.id} className="border rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            log.status === 'success' ? 'bg-green-100' :
                            log.status === 'warning' ? 'bg-yellow-100' :
                            log.status === 'error' ? 'bg-red-100' : 'bg-gray-100'
                          }`}>
                            <StatusIcon className={`h-4 w-4 ${getLogStatusColor(log.status)}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{log.action}</h4>
                              <Badge variant={
                                log.status === 'success' ? 'default' :
                                log.status === 'warning' ? 'secondary' : 'destructive'
                              }>
                                {log.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                            <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
                              <div>
                                <span className="font-medium">User:</span> {log.user}
                              </div>
                              <div>
                                <span className="font-medium">IP:</span> {log.ipAddress}
                              </div>
                              <div>
                                <span className="font-medium">Time:</span> {log.timestamp}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center mt-6">
                  <Button variant="outline">
                    Load More Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}