import { Badge } from './ui/badge';
import { 
  Users, 
  Factory, 
  Shield, 
  Eye, 
  Settings,
  Leaf
} from 'lucide-react';

interface RoleBadgeProps {
  userType: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function RoleBadge({ userType, size = 'md', showIcon = true }: RoleBadgeProps) {
  const roleConfig = {
    farmer: {
      label: 'Farmer/Collector',
      icon: Leaf,
      color: 'bg-green-100 text-green-800 border-green-200',
      variant: 'secondary' as const
    },
    processor: {
      label: 'Processing Facility',
      icon: Factory,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      variant: 'secondary' as const
    },
    lab: {
      label: 'Testing Laboratory',
      icon: Shield,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      variant: 'secondary' as const
    },
    consumer: {
      label: 'Consumer',
      icon: Eye,
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      variant: 'secondary' as const
    },
    admin: {
      label: 'System Administrator',
      icon: Settings,
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      variant: 'default' as const
    }
  };

  const config = roleConfig[userType as keyof typeof roleConfig] || roleConfig.consumer;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <Badge 
      variant={config.variant}
      className={`${config.color} ${sizeClasses[size]} flex items-center space-x-1`}
    >
      {showIcon && <IconComponent className="h-3 w-3" />}
      <span>{config.label}</span>
    </Badge>
  );
}