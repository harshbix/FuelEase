import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiUser, FiSettings, FiLogOut, FiLogIn } from "react-icons/fi";

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const profileRef = useRef(null);
  
  // Default user data for logged out state
  const defaultUserProfile = {
    name: "Guest User",
    email: "guest@example.com",
    position: "Visitor",
    contacts: "",
    profileImage: null
  };

  // Current user data
  const [userProfile, setUserProfile] = useState({
    name: "John Smith",
    email: "john@fuelease.com",
    position: "Manager",
    contacts: "+1234567890",
    profileImage: null
  });

  const [editProfile, setEditProfile] = useState({ ...userProfile });

  useEffect(() => {
    // Initialize edit form with current profile data
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isProfileOpen]);

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map(n => n[0]).join("").toUpperCase();
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = (e) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
    setActiveProfileTab('profile');
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e) => {
    e.stopPropagation();
    // Update profile in state
    setUserProfile({ ...editProfile });
    // Switch back to profile view
    setActiveProfileTab('profile');
    // In a real app: API call to update database would go here
    console.log("Saving to database:", editProfile);
  };

  const handleProfileAction = (e, action) => {
    e.stopPropagation();
    
    if (action === 'logout') {
      // Reset to default state
      setUserProfile(defaultUserProfile);
      setIsLoggedIn(false);
      setIsProfileOpen(false);
      // Notify parent component to reset page content
      if (onLogout) onLogout();
      return;
    }
    
    if (action === 'login') {
      window.location.href = '/login';
      return;
    }
    
    setActiveProfileTab(action);
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Pump", href: "#" },
    { name: "Transactions", href: "#" },
    { name: "Inventory", href: "#", isActive: true },
    { name: "Fuel Price", href: "#" },
    { name: "Staff", href: "#" },
    { name: "Report", href: "#" }
  ];

  return (
    <nav className="bg-gray-200 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-900">FuelEase</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium text-gray-900 ${
                    link.isActive ? 'bg-gray-400' : 'hover:bg-gray-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Profile and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              className="md:hidden text-gray-900 hover:text-gray-700 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Profile */}
            <div className="relative">
              <button 
                onClick={toggleProfile}
                className="flex items-center focus:outline-none"
              >
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
                {isLoggedIn && (
                  <div className="hidden md:block ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                    <p className="text-xs text-gray-900">{userProfile.position}</p>
                  </div>
                )}
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div 
                  ref={profileRef}
                  className="absolute right-0 mt-2 w-64 bg-gray-200 rounded-md shadow-lg py-1 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isLoggedIn ? (
                    <>
                      {activeProfileTab === 'profile' ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-300">
                            <div className="flex items-center">
                              {userProfile.profileImage ? (
                                <img
                                  src={userProfile.profileImage}
                                  alt="Profile"
                                  className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium mr-3">
                                  {getInitials(userProfile.name)}
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                                <p className="text-xs text-gray-600">{userProfile.position}</p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-2 border-b border-gray-300">
                            <p className="text-xs text-gray-500 mb-1">Email</p>
                            <p className="text-sm text-gray-900">{userProfile.email}</p>
                          </div>
                          <div className="px-4 py-2 border-b border-gray-300">
                            <p className="text-xs text-gray-500 mb-1">Contacts</p>
                            <p className="text-sm text-gray-900">{userProfile.contacts || 'Not provided'}</p>
                          </div>
                          <button
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => handleProfileAction(e, 'settings')}
                          >
                            <FiSettings className="mr-2" /> Settings
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="px-4 py-3 border-b border-gray-300">
                            <h3 className="text-sm font-medium text-gray-900">Edit Profile</h3>
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Name</label>
                              <input
                                type="text"
                                name="name"
                                value={editProfile.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Email</label>
                              <input
                                type="email"
                                name="email"
                                value={editProfile.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Position</label>
                              <input
                                type="text"
                                name="position"
                                value={editProfile.position}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Contacts</label>
                              <input
                                type="text"
                                name="contacts"
                                value={editProfile.contacts}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              />
                            </div>
                            <div className="flex justify-between pt-2">
                              <button
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveProfileTab('profile');
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleSaveProfile}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      <button
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-300"
                        onClick={(e) => handleProfileAction(e, 'logout')}
                      >
                        <FiLogOut className="mr-2" /> Sign out
                      </button>
                    </>
                  ) : (
                    <button
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => handleProfileAction(e, 'login')}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed right-4 top-16 w-48 bg-gray-200 rounded-md shadow-lg py-1 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-4 py-2 text-sm font-medium ${
                  link.isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;