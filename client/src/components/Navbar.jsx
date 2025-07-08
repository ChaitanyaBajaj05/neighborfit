import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

export default function Navbar({ user }) {
  const [showAbout, setShowAbout] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("neighborfit-user");
    window.location.href = "/";
  };

  const menuItems = [
    { label: "Home", link: "/" },
    ...(user?.role === "admin" ? [
      { label: "Add Neighborhood", link: "/add" },
      { label: "Admin Dashboard", link: "/dashboard" },
    ] : []),
    { label: "View Neighborhoods", link: "/neighborhoods" },
    { label: "About", action: () => setShowAbout(true) },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-md shadow text-white fixed top-0 z-50">
        
        <h1
          className="text-2xl font-extrabold cursor-pointer bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
          onClick={() => window.location.href = "/"}
        >
          NeighborFit
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 font-medium">
          {menuItems.map((item, idx) => (
            item.link ? (
              <button
                key={idx}
                onClick={() => window.location.href = item.link}
                className="relative group transition"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ) : (
              <button
                key={idx}
                onClick={item.action}
                className="relative group transition"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            )
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded-lg hover:scale-105 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {sidebarOpen ? (
            <HiX size={28} onClick={() => setSidebarOpen(false)} className="cursor-pointer" />
          ) : (
            <HiMenu size={28} onClick={() => setSidebarOpen(true)} className="cursor-pointer" />
          )}
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-white to-gray-100 text-gray-800 shadow-lg z-50 flex flex-col p-6 animate-slideIn">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-purple-600">Menu</h2>
            <HiX size={24} onClick={() => setSidebarOpen(false)} className="cursor-pointer" />
          </div>

          <div className="flex flex-col space-y-4">
            {menuItems.map((item, idx) => (
              item.link ? (
                <button
                  key={idx}
                  onClick={() => {
                    window.location.href = item.link;
                    setSidebarOpen(false);
                  }}
                  className="text-left hover:text-pink-500 transition border-b border-gray-200 pb-2"
                >
                  {item.label}
                </button>
              ) : (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    setSidebarOpen(false);
                  }}
                  className="text-left hover:text-pink-500 transition border-b border-gray-200 pb-2"
                >
                  {item.label}
                </button>
              )
            ))}
            <button
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
              className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* About Popup */}
      {showAbout && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowAbout(false)}
          />

          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 p-6 rounded-xl shadow max-w-md z-50">
            <h2 className="text-xl font-bold mb-2 text-purple-700">About NeighborFit</h2>
            <p className="mb-4 text-gray-600">
              NeighborFit helps you discover ideal neighborhoods based on your preferences. Built with MERN Stack & Tailwind CSS.
            </p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={() => setShowAbout(false)}
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
}
