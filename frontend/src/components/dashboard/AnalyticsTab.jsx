import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { gurukulLogo } from "../../assets/images";

const AnalyticsTab = () => {
  const [selectedStandard, setSelectedStandard] = useState("५ वी");

  // Dummy data for all standards (5th to 10th)
  const standards = ["५ वी", "६ वी", "७ वी", "८ वी", "९ वी", "१० वी"];

  // Generate dummy data for all standards
  const allStudentsData = standards.map((standard) => ({
    standard,
    students: Array(Math.floor(Math.random() * 30) + 20) // Random number of students (20-50)
      .fill()
      .map((_, i) => ({
        id: i,
        name: `Student ${i}`,
        gender: ["मुलगा", "मुलगी"][Math.floor(Math.random() * 2)],
      })),
  }));

  // Filter data for selected standard
  const currentStandardData = allStudentsData.find(
    (s) => s.standard === selectedStandard
  );
  const students = currentStandardData?.students || [];

  const genderDistribution = [
    {
      name: "मुलगा",
      value: students.filter((s) => s.gender === "मुलगा").length,
    },
    {
      name: "मुलगी",
      value: students.filter((s) => s.gender === "मुलगी").length,
    },
  ];

  const COLORS = ["#8B5CF6", "#EC4899"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-bold"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block h-20 w-20 mb-4 relative">
          <img
            src={gurukulLogo}
            alt="Logo"
            className="h-full w-full object-contain relative z-10"
          />
        </div>
        <h3 className="text-xl font-bold pt-1 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          श्रीनिधी एज्युकेशन सोसायटी
        </h3>
        <h2 className="text-3xl text-gray-700 mt-1">
          हिंदवी पब्लिक स्कूल सातारा
        </h2>
        <h2 className="text-3xl text-gray-600 mt-1">
          हिंदवी पंचकोशाधारित गुकुल
        </h2>
      </div>

      {/* Standard Selection Dropdown */}
      <div className="max-w-md mx-auto mb-10 bg-white rounded-xl shadow-lg p-6">
        <label
          htmlFor="standard-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          इयत्ता निवडा
        </label>
        <select
          id="standard-select"
          value={selectedStandard}
          onChange={(e) => setSelectedStandard(e.target.value)}
          className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
        >
          {standards.map((standard) => (
            <option key={standard} value={standard}>
              {standard}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
          <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">एकूण विद्यार्थी</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white flex items-center justify-center">
                👥
              </div>
            </div>
            <div className="mt-3 text-3xl font-bold text-gray-800">
              {students.length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">मुलगे</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center">
                👦
              </div>
            </div>
            <div className="mt-3 text-3xl font-bold text-gray-800">
              {genderDistribution[0].value}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
          <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">मुली</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white flex items-center justify-center">
                👧
              </div>
            </div>
            <div className="mt-3 text-3xl font-bold text-gray-800">
              {genderDistribution[1].value}
            </div>
          </div>
        </div>
      </div>

      {/* Gender Distribution Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {selectedStandard} मधील लिंगानुसार वितरण
        </h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                innerRadius={70}
                dataKey="value"
              >
                <Cell fill="#8B5CF6" />
                <Cell fill="#EC4899" />
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} विद्यार्थी`, "संख्या"]}
                contentStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                  padding: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">मुलगे</div>
            <div className="text-2xl font-semibold text-purple-600">
              {genderDistribution[0].value}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">मुली</div>
            <div className="text-2xl font-semibold text-pink-600">
              {genderDistribution[1].value}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">एकूण</div>
            <div className="text-2xl font-semibold text-indigo-600">
              {students.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
