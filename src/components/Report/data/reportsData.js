import { 
  Droplet, 
  Package, 
  DollarSign, 
  Users,
  Check,
  AlertTriangle,
  XCircle
} from 'lucide-react';

export const reportsData = [
  {
    id: 1,
    title: 'Pump Management',
    description: 'Status of fuel pumps across all stations',
    icon: Droplet,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
    lastUpdated: 'Today',
    stats: [
      { label: 'Active Pumps', value: '32' },
      { label: 'Maintenance', value: '5' },
      { label: 'Offline', value: '3' }
    ],
    tags: [
      { label: 'Active', color: 'bg-green-100 text-green-800' },
      { label: 'Maintenance', color: 'bg-yellow-100 text-yellow-800' }
    ],
    tableData: {
      columns: ['Pump ID', 'Station', 'Status', 'Last Maintenance', 'Fuel Type'],
      rows: [
        { id: 'P-001', station: 'Station A', status: 'Active', lastMaintenance: '2023-12-15', fuelType: 'Regular' },
        { id: 'P-002', station: 'Station A', status: 'Active', lastMaintenance: '2023-11-20', fuelType: 'Premium' },
        { id: 'P-003', station: 'Station B', status: 'Maintenance', lastMaintenance: '2024-01-05', fuelType: 'Diesel' },
        { id: 'P-004', station: 'Station B', status: 'Active', lastMaintenance: '2023-10-10', fuelType: 'Regular' },
        { id: 'P-005', station: 'Station C', status: 'Offline', lastMaintenance: '2023-09-28', fuelType: 'Premium' },
        { id: 'P-006', station: 'Station C', status: 'Active', lastMaintenance: '2023-12-05', fuelType: 'Diesel' },
        { id: 'P-007', station: 'Station D', status: 'Active', lastMaintenance: '2023-11-15', fuelType: 'Regular' },
        { id: 'P-008', station: 'Station D', status: 'Maintenance', lastMaintenance: '2024-01-10', fuelType: 'Premium' }
      ]
    }
  },
  {
    id: 2,
    title: 'Inventory Report',
    description: 'Fuel inventory levels and delivery records',
    icon: Package,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    lastUpdated: 'Yesterday',
    stats: [
      { label: 'Regular', value: '45k L' },
      { label: 'Premium', value: '32k L' },
      { label: 'Diesel', value: '28k L' }
    ],
    tags: [
      { label: 'Deliveries', color: 'bg-blue-100 text-blue-800' },
      { label: 'Stock Level', color: 'bg-green-100 text-green-800' }
    ],
    tableData: {
      columns: ['Fuel Type', 'Current Level', 'Capacity', 'Last Delivery', 'Supplier', 'Status'],
      rows: [
        { fuelType: 'Regular', currentLevel: '45,000 L', capacity: '60,000 L', lastDelivery: '2023-12-28', supplier: 'FuelCo Inc.', status: 'Good' },
        { fuelType: 'Premium', currentLevel: '32,000 L', capacity: '40,000 L', lastDelivery: '2023-12-20', supplier: 'PetroMax', status: 'Good' },
        { fuelType: 'Diesel', currentLevel: '28,000 L', capacity: '50,000 L', lastDelivery: '2024-01-05', supplier: 'DieselPro', status: 'Warning' },
        { fuelType: 'Regular', currentLevel: '15,000 L', capacity: '30,000 L', lastDelivery: '2023-12-15', supplier: 'FuelCo Inc.', status: 'Low' },
        { fuelType: 'Premium', currentLevel: '12,000 L', capacity: '20,000 L', lastDelivery: '2023-12-18', supplier: 'PetroMax', status: 'Good' },
        { fuelType: 'Diesel', currentLevel: '8,000 L', capacity: '25,000 L', lastDelivery: '2023-12-25', supplier: 'DieselPro', status: 'Critical' }
      ]
    }
  },
  {
    id: 3,
    title: 'Fuel Price Report',
    description: 'Historical price changes by fuel type',
    icon: DollarSign,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
    lastUpdated: '3 days ago',
    stats: [
      { label: 'Regular', value: 'Tsh 3900' },
      { label: 'Premium', value: 'Tsh 3892' },
      { label: 'Diesel', value: 'Tsh 3993' }
    ],
    tags: [
      { label: 'Price History', color: 'bg-purple-100 text-purple-800' },
      { label: 'Market Trends', color: 'bg-gray-100 text-gray-800' }
    ],
    tableData: {
      columns: ['Date', 'Fuel Type', 'Old Price', 'New Price', 'Change', 'Approved By'],
      rows: [
        { date: '2023-12-20', fuelType: 'Regular', oldPrice: '$3.29', newPrice: '$3.45', change: '+$0.16', approvedBy: 'John Smith' },
        { date: '2023-12-20', fuelType: 'Premium', oldPrice: '$3.75', newPrice: '$3.89', change: '+$0.14', approvedBy: 'John Smith' },
        { date: '2023-12-20', fuelType: 'Diesel', oldPrice: '$3.65', newPrice: '$3.75', change: '+$0.10', approvedBy: 'John Smith' },
        { date: '2023-11-15', fuelType: 'Regular', oldPrice: '$3.35', newPrice: '$3.29', change: '-$0.06', approvedBy: 'Sarah Johnson' },
        { date: '2023-11-15', fuelType: 'Premium', oldPrice: '$3.85', newPrice: '$3.75', change: '-$0.10', approvedBy: 'Sarah Johnson' },
        { date: '2023-11-15', fuelType: 'Diesel', oldPrice: '$3.70', newPrice: '$3.65', change: '-$0.05', approvedBy: 'Sarah Johnson' },
        { date: '2023-10-10', fuelType: 'Regular', oldPrice: '$3.25', newPrice: '$3.35', change: '+$0.10', approvedBy: 'Michael Brown' },
        { date: '2023-10-10', fuelType: 'Premium', oldPrice: '$3.75', newPrice: '$3.85', change: '+$0.10', approvedBy: 'Michael Brown' }
      ]
    }
  },
  {
    id: 4,
    title: 'Staff Report',
    description: 'Active staff, leave records, and access management',
    icon: Users,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
    lastUpdated: 'Today',
    stats: [
      { label: 'Active', value: '24' },
      { label: 'On Leave', value: '3' },
      { label: 'New Hires', value: '2' }
    ],
    tags: [
      { label: 'Active Staff', color: 'bg-green-100 text-green-800' },
      { label: 'Leave Records', color: 'bg-orange-100 text-orange-800' }
    ],
    tableData: {
      columns: ['Employee ID', 'Name', 'Role', 'Station', 'Status', 'Last Login'],
      rows: [
        { employeeId: 'E-001', name: 'John Smith', role: 'Manager', station: 'Station A', status: 'Active', lastLogin: '2024-01-10 09:15' },
        { employeeId: 'E-002', name: 'Sarah Johnson', role: 'Assistant Manager', station: 'Station B', status: 'Active', lastLogin: '2024-01-10 10:30' },
        { employeeId: 'E-003', name: 'Michael Brown', role: 'Cashier', station: 'Station A', status: 'On Leave', lastLogin: '2023-12-28 14:45' },
        { employeeId: 'E-004', name: 'Emily Davis', role: 'Cashier', station: 'Station C', status: 'Active', lastLogin: '2024-01-10 08:00' },
        { employeeId: 'E-005', name: 'Robert Wilson', role: 'Maintenance', station: 'Station B', status: 'Active', lastLogin: '2024-01-09 16:20' },
        { employeeId: 'E-006', name: 'Jennifer Lee', role: 'Cashier', station: 'Station D', status: 'New Hire', lastLogin: '2024-01-10 13:10' },
        { employeeId: 'E-007', name: 'Thomas Moore', role: 'Cashier', station: 'Station C', status: 'Active', lastLogin: '2024-01-10 11:45' },
        { employeeId: 'E-008', name: 'Amanda Garcia', role: 'Assistant Manager', station: 'Station D', status: 'On Leave', lastLogin: '2023-12-30 09:30' }
      ]
    }
  }
];

// Helper functions to get status icon and color
export const getStatusIcon = (status) => {
  const statusMap = {
    'Active': Check,
    'Maintenance': AlertTriangle,
    'Offline': XCircle,
    'Good': Check,
    'Warning': AlertTriangle,
    'Low': AlertTriangle,
    'Critical': XCircle,
    'On Leave': AlertTriangle,
    'New Hire': Check
  };
  
  return statusMap[status] || Check;
};

export const getStatusColor = (status) => {
  const colorMap = {
    'Active': 'text-green-500',
    'Maintenance': 'text-yellow-500',
    'Offline': 'text-red-500',
    'Good': 'text-green-500',
    'Warning': 'text-yellow-500',
    'Low': 'text-yellow-500',
    'Critical': 'text-red-500',
    'On Leave': 'text-yellow-500',
    'New Hire': 'text-blue-500'
  };
  
  return colorMap[status] || 'text-gray-500';
};