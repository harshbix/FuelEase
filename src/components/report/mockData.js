export const reportData = [
    {
      id: 'pump-management',
      title: 'Pump Management',
      description: 'Summary of pumps added, maintained, or removed from operation.',
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      items: [
        {
          name: 'Pump #5 Maintenance',
          date: '2023-03-15',
          status: 'maintenance',
          details: 'Regular maintenance check scheduled'
        },
        {
          name: 'New Pump #8 Installation',
          date: new Date().toISOString().split('T')[0], // Today
          status: 'active',
          details: 'New diesel pump installed and activated'
        },
        {
          name: 'Pump #2 Repair',
          date: '2023-03-10',
          status: 'active',
          details: 'Fixed flow rate issues, now operating normally'
        },
        {
          name: 'Pump #3 Decommissioned',
          date: '2023-02-28',
          status: 'removed',
          details: 'Outdated model removed from service'
        },
        {
          name: 'Pump #7 Software Update',
          date: '2023-03-05',
          status: 'active',
          details: 'Payment system software updated to version 4.2'
        }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory Report',
      description: 'Fuel deliveries, usage trends, and supplier records.',
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      items: [
        {
          name: 'Regular Unleaded Delivery',
          date: new Date().toISOString().split('T')[0], // Today
          status: 'active',
          details: '5000 gallons delivered by Petro Suppliers Inc.'
        },
        {
          name: 'Premium Fuel Stock Low',
          date: '2023-03-14',
          status: 'maintenance',
          details: 'Premium fuel stock below 20%, order placed'
        },
        {
          name: 'Diesel Inventory Check',
          date: '2023-03-12',
          status: 'active',
          details: 'Monthly inventory verification completed'
        },
        {
          name: 'Lubricant Supply Expired',
          date: '2023-03-01',
          status: 'removed',
          details: 'Removed expired oil products from inventory'
        },
        {
          name: 'New Supplier Contract',
          date: '2023-02-25',
          status: 'active',
          details: 'Signed new contract with GreenFuel Distributors'
        }
      ]
    },
    {
      id: 'fuel-price',
      title: 'Fuel Price Report',
      description: 'History of price changes by fuel type over time.',
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      items: [
        {
          name: 'Regular Unleaded Price Update',
          date: '2023-03-14',
          status: 'active',
          details: 'Price increased from $3.45 to $3.59 per gallon'
        },
        {
          name: 'Diesel Price Adjustment',
          date: new Date().toISOString().split('T')[0], // Today
          status: 'active',
          details: 'Price decreased from $4.15 to $3.99 per gallon'
        },
        {
          name: 'Premium Fuel Price Change',
          date: '2023-03-10',
          status: 'active',
          details: 'Price adjusted from $3.89 to $3.99 per gallon'
        },
        {
          name: 'Temporary Discount Ended',
          date: '2023-03-01',
          status: 'removed',
          details: 'Weekend promotion discount period ended'
        },
        {
          name: 'E85 Price Audit',
          date: '2023-02-28',
          status: 'maintenance',
          details: 'Price verification underway due to supplier changes'
        }
      ]
    },
    {
      id: 'staff',
      title: 'Staff Report',
      description: 'Active staff, staff on leave, and user account changes.',
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      items: [
        {
          name: 'James Wilson',
          date: '2023-03-15',
          status: 'active',
          details: 'Shift manager, 40hrs/week'
        },
        {
          name: 'Sarah Johnson',
          date: '2023-03-14',
          status: 'maintenance',
          details: 'On vacation until March 21'
        },
        {
          name: 'Michael Brown',
          date: new Date().toISOString().split('T')[0], // Today
          status: 'active',
          details: 'New hire, cashier position'
        },
        {
          name: 'Emily Davis',
          date: '2023-03-01',
          status: 'removed',
          details: 'Employment terminated'
        },
        {
          name: 'Robert Martinez',
          date: '2023-02-25',
          status: 'active',
          details: 'Completed safety training certification'
        }
      ]
    }
  ];
  