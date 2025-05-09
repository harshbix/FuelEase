import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiSettings, FiLogOut, FiLogIn } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState("profile");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const defaultUserProfile = {
    name: "Guest User",
    email: "guest@example.com",
    position: "Visitor",
    contacts: "",
    profileImage: null
  };

  const [userProfile, setUserProfile] = useState({
    name: "John Smith",
    email: "john@fuelease.com",
    position: "Manager",
    contacts: "+1234567890",
    profileImage: null
  });

  const [editProfile, setEditProfile] = useState({ ...userProfile });

  useEffect(() => {
    setEditProfile({ ...userProfile });
  }, [userProfile]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }

      if (
        isProfileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isProfileOpen]);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = (e) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
    setActiveProfileTab("profile");
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e) => {
    e.stopPropagation();
    setUserProfile({ ...editProfile });
    setActiveProfileTab("profile");
  };

  const handleProfileAction = (e, action) => {
    e.stopPropagation();
    if (action === "logout") {
      setUserProfile(defaultUserProfile);
      setIsLoggedIn(false);
      setIsProfileOpen(false);
      navigate("/login");
      return;
    }
    if (action === "login") {
      navigate("/login");
      return;
    }
    setActiveProfileTab(action);
  };

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Pump", to: "/Pump" },
    { name: "Inventory", to: "/Inventory" },
    { name: "Fuel Price", to: "/Prices" },
    { name: "Staff", to: "/Staff" },
    { name: "Report", to: "/Report" }
  ];

  return (
    <nav className="bg-gray-200 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-900">FuelEase</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium text-gray-900 ${
                    isActive ? "bg-gray-400" : "hover:bg-gray-300"
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
              className="md:hidden text-gray-900 hover:text-gray-700 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <div className="relative">
              <button onClick={toggleProfile} className="flex items-center focus:outline-none">
                {isLoggedIn ? (
                  userProfile.profileImage ? (
                    <img
                      src={userProfile.profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                      {getInitials(userProfile.name)}
                    </div>
                  )
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-medium">
                    <FiUser size={16} />
                  </div>
                )}
              </button>

              {isProfileOpen && (
                <div
                  ref={profileRef}
                  className="absolute right-0 mt-2 w-64 bg-gray-200 rounded-md shadow-lg py-1 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isLoggedIn ? (
                    <>
                      {activeProfileTab === "profile" ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-300">
                            <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                            <p className="text-xs text-gray-600">{userProfile.position}</p>
                          </div>
                          <div className="px-4 py-2 text-sm text-gray-900">
                            Email: {userProfile.email}
                          </div>
                          <div className="px-4 py-2 text-sm text-gray-900">
                            Contact: {userProfile.contacts || "N/A"}
                          </div>
                          <button
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => handleProfileAction(e, "settings")}
                          >
                            <FiSettings className="mr-2" /> Settings
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Settings / Edit Mode */}
                          <div className="p-4 space-y-3">
                            <input
                              type="text"
                              name="name"
                              value={editProfile.name}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              placeholder="Name"
                            />
                            <input
                              type="email"
                              name="email"
                              value={editProfile.email}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              placeholder="Email"
                            />
                            <input
                              type="text"
                              name="position"
                              value={editProfile.position}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              placeholder="Position"
                            />
                            <input
                              type="text"
                              name="contacts"
                              value={editProfile.contacts}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              placeholder="Contacts"
                            />
                            <div className="flex justify-between">
                              <button
                                onClick={() => setActiveProfileTab("profile")}
                                className="text-sm px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleSaveProfile}
                                className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      <button
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-300"
                        onClick={(e) => handleProfileAction(e, "logout")}
                      >
                        <FiLogOut className="mr-2" /> Sign out
                      </button>
                    </>
                  ) : (
                    <button
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => handleProfileAction(e, "login")}
                    >
                      <FiLogIn className="mr-2" /> Login
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed right-4 top-16 w-48 bg-gray-200 rounded-md shadow-lg py-1 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm font-medium ${
                  isActive ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
