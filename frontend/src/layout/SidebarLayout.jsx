import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Users,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Simple cn (classnames) utility replacement
const cn = (...classes) => classes.filter(Boolean).join(" ");

const SidebarLayout = ({ children, activeTab, onTabChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Mobile Hamburger Button - Positioned absolutely */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden top-4 left-4 z-50 p-2 absolute rounded-md bg-white shadow-md text-gray-600 hover:text-gray-800"
      >
        <Menu size={24} /> {/* Increased icon size */}
      </button>

      {/* Sidebar - Increased width */}
      <div
        className={cn(
          "h-full bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-10 shadow-md",
          "fixed md:relative",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          collapsed ? "w-24" : "w-72" // Increased from w-20/w-64 to w-24/w-72
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {!collapsed && (
            <div className="flex items-center gap-3">
              {" "}
              {/* Increased gap */}
              <div className="h-10 w-10 rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                ह
              </div>
              <span className="font-semibold text-gray-800 text-lg">
                {" "}
                {/* Increased font size */}
                हिंदवी विद्या
              </span>
            </div>
          )}
          {collapsed && (
            <div className="h-10 w-10 mx-auto rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              ह
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden md:block text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}{" "}
            {/* Increased icon size */}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-3">
            {" "}
            {/* Increased spacing */}
            <li>
              <button
                onClick={() => {
                  onTabChange("analysis");
                  setMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg transition-all duration-200 group",
                  activeTab === "analysis"
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <BarChart2
                  className={cn(
                    "flex-shrink-0 h-6 w-6", // Increased icon size
                    collapsed ? "mx-auto" : "mr-3",
                    activeTab === "analysis"
                      ? "text-purple-700"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                {!collapsed && <span className="text-base">निरीक्षण</span>}{" "}
                {/* Increased font size */}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onTabChange("students");
                  setMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg transition-all duration-200 group",
                  activeTab === "students"
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Users
                  className={cn(
                    "flex-shrink-0 h-6 w-6", // Increased icon size
                    collapsed ? "mx-auto" : "mr-3",
                    activeTab === "students"
                      ? "text-purple-700"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                {!collapsed && <span className="text-base">विद्यार्थी</span>}{" "}
                {/* Increased font size */}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onTabChange("format");
                  setMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg transition-all duration-200 group",
                  activeTab === "format"
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <FileText
                  className={cn(
                    "flex-shrink-0 h-6 w-6", // Increased icon size
                    collapsed ? "mx-auto" : "mr-3",
                    activeTab === "format"
                      ? "text-purple-700"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                {!collapsed && <span className="text-base">स्वरूप</span>}{" "}
                {/* Increased font size */}
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="w-full flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 group"
          >
            <LogOut
              className={cn(
                "flex-shrink-0 h-6 w-6", // Increased icon size
                collapsed ? "mx-auto" : "mr-3",
                "text-gray-500 group-hover:text-gray-700"
              )}
            />
            {!collapsed && <span className="text-base">बाहेर पडा</span>}{" "}
            {/* Increased font size */}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto md:ml-0 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
