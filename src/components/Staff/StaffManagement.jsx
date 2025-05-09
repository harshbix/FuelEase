import React, { useState } from "react";
import DataTable from "react-data-table-component";

const initialStaffData = [
  {
    name: "John Smith",
    email: "john@fuelelease.com",
    role: "Station Manager",
    department: "Management",
    status: "Active",
    contact: "(555) 123-4567",
    shift: "Morning",
  },
  {
    name: "Sarah Johnson",
    email: "sarah@fuelelease.com",
    role: "Shift Supervisor",
    department: "Operations",
    status: "Active",
    contact: "(555) 234-5678",
    shift: "Evening",
  },
  {
    name: "Mike Brown",
    email: "mike@fuelelease.com",
    role: "Pump Attendant",
    department: "Operations",
    status: "On Leave",
    contact: "(555) 345-6789",
    shift: "Night",
  },
  {
    name: "Emma Davis",
    email: "emma@fuelelease.com",
    role: "Cashier",
    department: "Operations",
    status: "Active",
    contact: "(555) 456-7890",
    shift: "Morning",
  },
  {
    name: "James Wilson",
    email: "james@fuelelease.com",
    role: "Maintenance",
    department: "Maintenance",
    status: "Active",
    contact: "(555) 567-8901",
    shift: "Day",
  },
];

const StaffManagement = () => {
  const [staffData, setStaffData] = useState(initialStaffData);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "Active",
    contact: "",
    shift: "Morning",
  });

  const departments = ["All", ...new Set(staffData.map((d) => d.department))];

  const filteredStaff = staffData.filter((staff) => {
    return (
      (department === "All" || staff.department === department) &&
      (staff.name.toLowerCase().includes(search.toLowerCase()) ||
        staff.email.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const handleAddEmployee = () => {
    setStaffData([...staffData, newEmployee]);
    setNewEmployee({
      name: "",
      email: "",
      role: "",
      department: "",
      status: "Active",
      contact: "",
      shift: "Morning",
    });
    setShowModal(false);
  };

  const columns = [
    {
      name: "Employee",
      selector: (row) => (
        <div className="flex items-center space-x-3">
          <div>
            <p className="font-semibold">{row.name}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
    },
    {
      name: "Shift",
      selector: (row) => row.shift,
      sortable: true,
    },
  ];

  const totalStaff = staffData.length;
  const activeStaff = staffData.filter((s) => s.status === "Active").length;
  const onLeave = staffData.filter((s) => s.status === "On Leave").length;
  const totalDepartments = new Set(staffData.map((s) => s.department)).size;

  return (
    <div
      className={`p-8 bg-gray-50 min-h-screen transition-all duration-300 ${
        showModal ? "bg-opacity-50" : ""
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Staff Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Total Staff</p>
          <p className="text-2xl font-bold">{totalStaff}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Active Staff</p>
          <p className="text-2xl font-bold">{activeStaff}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">On Leave</p>
          <p className="text-2xl font-bold">{onLeave}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Departments</p>
          <p className="text-2xl font-bold">{totalDepartments}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search staff..."
            className="border rounded px-4 py-2 w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-4 py-2"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <DataTable
          columns={columns}
          data={filteredStaff}
          pagination
          highlightOnHover
          responsive
          striped
          noDataComponent="No matching staff found"
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white p-6 rounded-lg w-full sm:max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Role"
                className="w-full border px-3 py-2 rounded"
                value={newEmployee.role}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, role: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Department"
                className="w-full border px-3 py-2 rounded"
                value={newEmployee.department}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, department: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Contact"
                className="w-full border px-3 py-2 rounded"
                value={newEmployee.contact}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, contact: e.target.value })
                }
              />
              <select
                className="w-full border px-3 py-2 rounded"
                value={newEmployee.shift}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, shift: e.target.value })
                }
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
                <option value="Day">Day</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEmployee}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
