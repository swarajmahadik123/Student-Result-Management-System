import React, { useContext, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Users,
  FileText,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


// Simple cn (classnames) utility replacement
const cn = (...classes) => classes.filter(Boolean).join(" ");



const SidebarLayout = ({ children, activeTab, onTabChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "h-full bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-10 shadow-md",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                ह
              </div>
              <span className="font-semibold text-gray-800">हिंदवी विद्या</span>
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 mx-auto rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              ह
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-3">
            <li>
              <button
                onClick={() => onTabChange("analysis")}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg transition-all duration-200 group",
                  activeTab === "analysis"
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <BarChart2
                  className={cn(
                    "flex-shrink-0 h-5 w-5 mr-3",
                    collapsed ? "mx-auto" : "",
                    activeTab === "analysis"
                      ? "text-purple-700"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                {!collapsed && <span>निरीक्षण</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange("students")}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg transition-all duration-200 group",
                  activeTab === "students"
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Users
                  className={cn(
                    "flex-shrink-0 h-5 w-5 mr-3",
                    collapsed ? "mx-auto" : "",
                    activeTab === "students"
                      ? "text-purple-700"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                {!collapsed && <span>विद्यार्थी</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange("format")}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg transition-all duration-200 group",
                  activeTab === "format"
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <FileText
                  className={cn(
                    "flex-shrink-0 h-5 w-5 mr-3",
                    collapsed ? "mx-auto" : "",
                    activeTab === "format"
                      ? "text-purple-700"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                {!collapsed && <span>स्वरूप</span>}
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
                "flex-shrink-0 h-5 w-5 mr-3",
                collapsed ? "mx-auto" : "",
                "text-gray-500 group-hover:text-gray-700"
              )}
            />
            {!collapsed && <span>बाहेर पडा</span>}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default SidebarLayout;
