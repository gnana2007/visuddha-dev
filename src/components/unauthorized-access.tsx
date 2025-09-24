import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Shield, ArrowLeft, Lock } from 'lucide-react';

interface UnauthorizedAccessProps {
  onBack: () => void;
  userType?: string;
  requiredPermissions?: string[];
}

export function UnauthorizedAccess({ onBack, userType, requiredPermissions }: UnauthorizedAccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-10 w-10 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          
          <p className="text-gray-600 mb-6">
            Your current role ({userType || 'Unknown'}) doesn't have permission to access this feature.
          </p>

          {requiredPermissions && requiredPermissions.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Required Permissions:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {requiredPermissions.map((permission, index) => (
                  <li key={index} className="flex items-center">
                    <Shield className="h-3 w-3 text-gray-400 mr-2" />
                    {permission.replace('_', ' ').toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3">
            <Button onClick={onBack} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back to Dashboard
            </Button>
            
            <p className="text-sm text-gray-500">
              Contact your system administrator to request additional permissions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}