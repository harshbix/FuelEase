import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);

  const navigate = useNavigate();
  const menuButtonRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Pump", to: "/Pump" },
    { name: "Inventory", to: "/Inventory" },
    { name: "Fuel Price", to: "/Prices" },
    { name: "Staff", to: "/Staff" },
    { name: "Report", to: "/Report" },
  ];

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const profile = JSON.parse(localStorage.getItem("userProfile"));

    if (loggedIn && profile?.email) {
      fetch("/users.json")
        .then(res => res.json())
        .then(users => {
          const matchedUser = users.find(u => u.email === profile.email);
          if (matchedUser) {
            setUserProfile(matchedUser);
            setEditProfile({ ...matchedUser });
          } else {
            setUserProfile(profile); // fallback if not found in file
            setEditProfile({ ...profile });
          }
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen, isMenuOpen]);

  const handleSave = () => {
    setUserProfile({ ...editProfile });
    setActiveTab("profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userProfile");
    navigate("/login");
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const ProfileDropdown = () => (
    <AnimatePresence>
      {isProfileOpen && userProfile && (
        <motion.div
          ref={profileRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-4 top-16 w-72 bg-white shadow-xl rounded-lg z-50 overflow-hidden"
        >
          <div className="flex border-b">
            {["profile", "settings", "notifications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-sm font-semibold py-2 ${
                  activeTab === tab ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                {tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-4 text-sm space-y-2">
            {activeTab === "profile" && (
              <>
                <p className="font-semibold">{userProfile.name}</p>
                <p className="text-gray-600">{userProfile.position}</p>
                <p>Email: {userProfile.email}</p>
                <p>Contact: {userProfile.contacts || "N/A"}</p>
              </>
            )}

            {activeTab === "settings" && (
              <div className="space-y-2">
                {["name", "email", "position", "contacts"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={editProfile[field]}
                    onChange={(e) =>
                      setEditProfile({ ...editProfile, [field]: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                    placeholder={field}
                  />
                ))}
                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <p className="text-gray-600">No new notifications.</p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
          >
            <FiLogOut className="inline mr-2" /> Sign Out
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const MobileMenu = () => (
    <div
      ref={mobileMenuRef}
      className="md:hidden fixed top-16 right-4 w-48 bg-white rounded-lg shadow-lg z-40"
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.to}
          className={({ isActive }) =>
            `block px-4 py-2 text-sm ${
              isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );

  if (!userProfile) return null;

  return (
    <nav className="bg-white text-gray-800 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold text-blue-700">FuelEase</div>

          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-medium transition duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-700 hover:bg-blue-100"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              ref={menuButtonRef}
              className="md:hidden text-gray-700 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setActiveTab("profile");
              }}
              className="relative"
            >
              {userProfile.profileImage ? (
                <img
                  src={userProfile.profileImage}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(userProfile.name)}
                </div>
              )}
            </button>

            <ProfileDropdown />
          </div>
        </div>
      </div>

      {isMenuOpen && <MobileMenu />}
    </nav>
  );
};

export default Navbar;
