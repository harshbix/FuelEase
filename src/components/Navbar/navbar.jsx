import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserCircle2, Bell, Settings, LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (location.pathname === "/login") return null;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Pump", path: "/pump" },
    { name: "Transactions", path: "/transactions" },
    { name: "Inventory", path: "/inventory" },
    { name: "Fuel Price", path: "/Prices" },
    { name: "Staff", path: "/staff" },
    { name: "Report", path: "/report" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white shadow z-40 fixed top-0 left-0 px-6 py-3 flex justify-between items-center"
    >
      {/* Logo or Brand */}
      <div className="text-xl font-bold text-blue-800 tracking-tight">
        FuelEase
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Profile + Dropdown */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <UserCircle2 className="w-8 h-8 text-blue-800" />
        </button>

        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 shadow-lg rounded-lg z-50"
          >
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-800">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.position}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
              <p className="text-xs text-gray-400">{user?.contacts}</p>
            </div>

            <ul className="text-sm divide-y divide-gray-100">
              <li>
                <button className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
              </li>
              <li>
                <button className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
