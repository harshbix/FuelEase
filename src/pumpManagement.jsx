import React, { useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  { name: "Pump Number", selector: row => row.pumpNumber, sortable: true },
  { name: "Location", selector: row => row.location, sortable: true },
  { name: "Fuel Types", cell: row => row.fuelTypes.join(", ") },
  { name: "Flow Rate", selector: row => row.flowRate },
  { name: "Assignment", selector: row => row.assignment },
  {
    name: "Status",
    cell: row => <span className={`font-semibold ${statusColor[row.status]}`}>{row.status}</span>,
  },
  {
    name: "Health",
    cell: row => <span className={`font-semibold ${healthColor[row.health]}`}>{row.health}</span>,
  },
  { name: "Last Maintenance", selector: row => row.lastMaintenance },
  {
    name: "Actions",
    cell: () => (
      <div className="flex gap-2 overflow-hidden">
        <button className="px-1 py-1 border rounded bg-blue-500 text-white text-sm leading-tight">
          Edit
        </button>
        <button className="px-1 py-1 border rounded bg-gray-500 text-white text-sm leading-tight">
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

export default function PumpManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const filteredData = pumpsData.filter(pump => {
    const matchesSearch =
      pump.pumpNumber.toLowerCase().includes(search.toLowerCase()) ||
      pump.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || pump.status === statusFilter;

    const matchesLocation =
      locationFilter === "All" || pump.location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
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
          placeholder="Search pumps..."
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

