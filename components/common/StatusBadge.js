import { FaCircle, FaCheck, FaClock, FaBan, FaTools } from 'react-icons/fa';

export default function StatusBadge({ status = 'available', size = 'md' }) {
  const statusConfig = {
    available: {
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      textColor: 'text-white',
      icon: <FaCheck className="w-3 h-3" />,
      text: 'Available'
    },
    booked: {
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      textColor: 'text-white',
      icon: <FaBan className="w-3 h-3" />,
      text: 'Booked'
    },
    pending: {
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
      textColor: 'text-white',
      icon: <FaClock className="w-3 h-3" />,
      text: 'Pending'
    },
    maintenance: {
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      textColor: 'text-white',
      icon: <FaTools className="w-3 h-3" />,
      text: 'Maintenance'
    },
    inactive: {
      color: 'bg-gray-300',
      hoverColor: 'hover:bg-gray-400',
      textColor: 'text-gray-700',
      icon: <FaCircle className="w-3 h-3" />,
      text: 'Inactive'
    }
  };

  // Size variants
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  // Safely convert status to lowercase and get config
  const normalizedStatus = status?.toLowerCase?.() || 'available';
  const config = statusConfig[normalizedStatus] || statusConfig.available;
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <span 
      className={`${config.color} ${config.hoverColor} ${sizeClass} font-medium rounded-full ${config.textColor} 
        flex items-center gap-1.5 transition-colors duration-200 shadow-sm`}
    >
      {config.icon}
      {config.text}
    </span>
  );
}