import React, { useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  { name: "Pump Number", selector: row => row.pumpNumber, sortable: true },
  { name: "Location", selector: row => row.location, sortable: true },
  {
    name: "Fuel Types",
    cell: row => (
      <div className="flex gap-1">
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
    cell: row => <span className={`font-semibold ${statusColor[row.status]}`}>{row.status}</span>,
  },
  {
    name: "Health",
    cell: row => (
      <div className="flex items-center gap-1">
        <span className={`${dotColor[row.health]} w-2 h-2 rounded-full inline-block`}></span>
        <span className={`font-semibold ${healthColor[row.health]}`}>{row.health}</span>
      </div>
    ),
  },
  { name: "Last Maintenance", selector: row => row.lastMaintenance },
  {
    name: "Actions",
    cell: () => (
      <div className="flex flex-col gap-2 w-full">
        <button className="edit-btn px-3 py-2 border rounded bg-blue-500 text-white text-sm w-full">
          Edit
        </button>
        <button className="maint-btn px-3 py-2 border rounded bg-gray-500 text-white text-sm w-full">
          Maintenance
        </button>
      </div>
    ),
  },
];

const pumpsData = [
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

export default function PumpManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const filteredData = pumpsData.filter(pump => {
    const searchLower = search.toLowerCase();
    const matchesLocation = pump.location.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === "All" || pump.status === statusFilter;
    const matchesLocationFilter = locationFilter === "All" || pump.location === locationFilter;

    return matchesLocation && matchesStatus && matchesLocationFilter;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pump Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add New Pump</button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by location..."
          className="w-1/3 px-3 py-2 border rounded"
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

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}
