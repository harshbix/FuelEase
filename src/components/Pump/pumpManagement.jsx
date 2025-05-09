import React, { useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  { name: "Pump Number", selector: row => row.pumpNumber, sortable: true },
  { name: "Location", selector: row => row.location, sortable: true },
  {
    name: "Fuel Types",
    cell: row => (
      <div className="flex gap-1 flex-wrap">
        {row.fuelTypes.map((type, idx) => (
          <button
            key={idx}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold"
          >
            {type}
          </button>
        ))}
      </div>
    ),
  },
  { name: "Flow Rate", selector: row => row.flowRate },
  { name: "Assignment", selector: row => row.assignment },
  {
    name: "Status",
    cell: row => (
      <span className={`font-semibold ${statusColor[row.status]}`}>
        {row.status}
      </span>
    ),
  },
  {
    name: "Health",
    cell: row => (
      <div className="flex items-center gap-1">
        <span className={`${dotColor[row.health]} w-2 h-2 rounded-full inline-block`}></span>
        <span className={`font-semibold ${healthColor[row.health]}`}>
          {row.health}
        </span>
      </div>
    ),
  },
  { name: "Last Maintenance", selector: row => row.lastMaintenance },
  {
    name: "Actions",
    cell: () => (
      <div className="w-full flex flex-col sm:flex-row gap-2">
        <button className="flex-1 min-w-[100px] px-3 py-2 border rounded bg-blue-500 text-white text-sm">
          Edit
        </button>
        <button className="flex-1 min-w-[100px] px-3 py-2 border rounded bg-gray-500 text-white text-sm">
          Maintenance
        </button>
      </div>
    ),
    grow: 2,
    wrap: true,
  },
];

const initialPumpsData = [
  {
    pumpNumber: "P001",
    location: "North Bay",
    fuelTypes: ["Petrol", "Diesel"],
    flowRate: "40 L/min",
    assignment: "Bay 1",
    status: "Active",
    health: "OK",
    lastMaintenance: "2024-01-15",
  },
  {
    pumpNumber: "P002",
    location: "South Bay",
    fuelTypes: ["Premium"],
    flowRate: "35 L/min",
    assignment: "Bay 2",
    status: "Maintenance",
    health: "Warning",
    lastMaintenance: "2023-12-20",
  },
  {
    pumpNumber: "P003",
    location: "East Wing",
    fuelTypes: ["Petrol", "Premium"],
    flowRate: "0 L/min",
    assignment: "Bay 3",
    status: "Disabled",
    health: "Faulty",
    lastMaintenance: "2023-11-30",
  },
];

const statusColor = {
  Active: "text-green-600",
  Maintenance: "text-yellow-600",
  Disabled: "text-red-600",
};

const healthColor = {
  OK: "text-green-600",
  Warning: "text-yellow-600",
  Faulty: "text-red-600",
};

const dotColor = {
  OK: "bg-green-500",
  Warning: "bg-yellow-500",
  Faulty: "bg-red-500",
};

function PumpManagement() {
  const [pumpList, setPumpList] = useState(initialPumpsData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [pumpForm, setPumpForm] = useState({
    pumpNumber: "",
    location: "",
    fuelTypes: "",
    flowRate: "",
    assignment: "",
    status: "Active",
    health: "OK",
    lastMaintenance: "",
  });

  const filteredData = pumpList.filter(pump => {
    const searchLower = search.toLowerCase();
    const matchesLocation = pump.location.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === "All" || pump.status === statusFilter;
    const matchesLocationFilter = locationFilter === "All" || pump.location === locationFilter;
    return matchesLocation && matchesStatus && matchesLocationFilter;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPumpForm(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!pumpForm.pumpNumber.trim()) newErrors.pumpNumber = "Pump number is required";
    if (!pumpForm.location.trim()) newErrors.location = "Location is required";
    if (!pumpForm.fuelTypes.trim()) newErrors.fuelTypes = "At least one fuel type is required";
    if (!/^\d+(\.\d+)?( L\/min)?$/.test(pumpForm.flowRate.trim())) newErrors.flowRate = "Invalid flow rate";
    if (!pumpForm.assignment.trim()) newErrors.assignment = "Assignment is required";
    if (!pumpForm.lastMaintenance.trim()) newErrors.lastMaintenance = "Maintenance date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePump = () => {
    if (!validateForm()) return;

    const newPumpEntry = {
      ...pumpForm,
      fuelTypes: pumpForm.fuelTypes.split(",").map(type => type.trim()),
    };

    setPumpList(prev => [...prev, newPumpEntry]);
    setIsModalOpen(false);
    setPumpForm({
      pumpNumber: "",
      location: "",
      fuelTypes: "",
      flowRate: "",
      assignment: "",
      status: "Active",
      health: "OK",
      lastMaintenance: "",
    });
    setErrors({});
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Pump Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add New Pump
        </button>
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by location..."
          className="flex-1 min-w-[200px] px-3 py-2 border rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-2 border rounded"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Disabled">Disabled</option>
        </select>
        <select
          className="px-3 py-2 border rounded"
          value={locationFilter}
          onChange={e => setLocationFilter(e.target.value)}
        >
          <option value="All">All Locations</option>
          <option value="North Bay">North Bay</option>
          <option value="South Bay">South Bay</option>
          <option value="East Wing">East Wing</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white/90 p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Add New Pump</h2>
            <form className="space-y-3">
              {Object.entries(pumpForm).map(([key, value]) => (
                key !== 'status' && key !== 'health' && (
                  <div key={key}>
                    <input
                      type={key === 'lastMaintenance' ? 'date' : 'text'}
                      name={key}
                      placeholder={
                        key === 'fuelTypes'
                          ? 'Fuel Types (comma separated)'
                          : key.charAt(0).toUpperCase() + key.slice(1)
                      }
                      className={`w-full px-3 py-2 border rounded ${errors[key] ? 'border-red-500' : ''}`}
                      value={value}
                      onChange={handleInputChange}
                    />
                    {errors[key] && (
                      <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
                    )}
                  </div>
                )
              ))}
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <button
              onClick={handleSavePump}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded"
            >
              Save Pump
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PumpManagement;