import { FaCircle } from 'react-icons/fa';

export default function StatusBadge({ status = 'available' }) {
  const statusConfig = {
    available: {
      color: 'bg-green-500',
      text: 'Available'
    },
    booked: {
      color: 'bg-red-500',
      text: 'Booked'
    },
    pending: {
      color: 'bg-yellow-500',
      text: 'Pending'
    }
  };

  // Safely convert status to lowercase and get config
  const normalizedStatus = status?.toLowerCase?.() || 'available';
  const config = statusConfig[normalizedStatus] || statusConfig.available;

  return (
    <span className={`${config.color} px-3 py-1 text-sm font-bold rounded-full text-white flex items-center gap-2`}>
      <FaCircle className="w-2 h-2" />
      {config.text}
    </span>
  );
} 