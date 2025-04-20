"use client";
import React from "react";
import { useState, useEffect } from "react";
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
  AreaChart,
  Area,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { gurukulLogo } from "../../assets/images";

// Icons
import {
  Users,
  UserCircle,
  GraduationCap,
  ChevronDown,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  Clock,
  Menu,
  X,
} from "lucide-react";

const Analytics = () => {
  const [selectedStandard, setSelectedStandard] = useState("५ वी");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeChart, setActiveChart] = useState("pie");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        attendance: Math.floor(Math.random() * 30) + 70, // 70-100%
        performance: Math.floor(Math.random() * 40) + 60, // 60-100%
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

  // Monthly attendance data
  const monthlyData = [
    { name: "एप्रिल", attendance: 92, performance: 85 },
    { name: "मे", attendance: 88, performance: 82 },
    { name: "जून", attendance: 95, performance: 88 },
    { name: "जुलै", attendance: 90, performance: 84 },
    { name: "ऑगस्ट", attendance: 93, performance: 87 },
    { name: "सप्टेंबर", attendance: 91, performance: 86 },
    { name: "ऑक्टोबर", attendance: 94, performance: 89 },
    { name: "नोव्हेंबर", attendance: 96, performance: 90 },
  ];

  // Performance distribution
  const performanceData = [
    {
      name: "उत्कृष्ट (90-100%)",
      value: students.filter((s) => s.performance >= 90).length,
    },
    {
      name: "चांगले (80-89%)",
      value: students.filter((s) => s.performance >= 80 && s.performance < 90)
        .length,
    },
    {
      name: "समाधानकारक (70-79%)",
      value: students.filter((s) => s.performance >= 70 && s.performance < 80)
        .length,
    },
    {
      name: "सुधारणे आवश्यक (<70%)",
      value: students.filter((s) => s.performance < 70).length,
    },
  ];

  const COLORS = ["#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];
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
        className="text-xs font-bold marathi-text"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <div className="w-full h-full rounded-full border-4 border-purple-200 border-t-violet-600"></div>
          </motion.div>
          <h3 className="text-xl font-medium text-violet-800 marathi-text">
            डॅशबोर्ड लोड होत आहे...
          </h3>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 overflow-x-hidden font-['Poppins']">
      {/* Header - Responsive */}
      <motion.div
        className=" backdrop-blur-xl shadow-sm border-b border-purple-100/30 sticky top-0 z-[1] py-3 sm:py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="flex items-center justify-between">
            {/* Added left padding on mobile to avoid overlapping with hamburger */}
            <div className="flex items-center space-x-3 sm:space-x-4 pl-12 md:pl-0">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <img
                  src={gurukulLogo || "/placeholder.svg"}
                  alt="Logo"
                  className="h-10 sm:h-12 w-10 sm:w-12 object-contain relative z-10"
                />
              </motion.div>
              <motion.h1
                className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 marathi-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                हिंदवी पंचकोशाधारित गुकुल
              </motion.h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white/80 px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-sm">
                <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-violet-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  {new Date().toLocaleDateString("mr-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <motion.button
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-2 sm:p-2 rounded-full text-sm font-medium shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="h-4 sm:h-5 w-4 sm:w-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-lg"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  <Calendar className="h-5 w-5 text-violet-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {new Date().toLocaleDateString("mr-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Standard Selection */}
        <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
          <div className="relative w-full max-w-xs mx-auto sm:mx-0">
            <motion.button
              className="flex items-center justify-between w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-purple-200 rounded-xl shadow-sm focus:outline-none bg-white/80 backdrop-blur-sm text-gray-700 font-medium"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 sm:h-5 w-4 sm:w-5 text-violet-600" />
                <span className="marathi-text">इयत्ता: {selectedStandard}</span>
              </div>
              <ChevronDown
                className={`h-4 sm:h-5 w-4 sm:w-5 text-violet-600 transition-transform duration-300 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-purple-100 max-h-60 overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-1">
                    {standards.map((standard) => (
                      <motion.button
                        key={standard}
                        className={`block w-full text-left px-4 py-2 sm:py-3 text-sm marathi-text ${
                          selectedStandard === standard
                            ? "bg-violet-50 text-violet-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setSelectedStandard(standard);
                          setIsDropdownOpen(false);
                        }}
                        whileHover={{
                          backgroundColor:
                            selectedStandard === standard
                              ? "#ede9fe"
                              : "#f9fafb",
                        }}
                      >
                        {standard}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Summary Cards - Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-1.5 bg-gradient-to-r from-violet-500 to-indigo-600"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs sm:text-sm marathi-text">
                  एकूण विद्यार्थी
                </span>
                <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
                  <Users className="h-4 sm:h-5 w-4 sm:w-5" />
                </div>
              </div>
              <motion.div
                className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-gray-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                {students.length}
              </motion.div>
              <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-green-600">
                <TrendingUp className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                <span>+{Math.floor(Math.random() * 10) + 1}%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs sm:text-sm marathi-text">
                  मुलगे
                </span>
                <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <UserCircle className="h-4 sm:h-5 w-4 sm:w-5" />
                </div>
              </div>
              <motion.div
                className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-gray-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.3,
                }}
              >
                {genderDistribution[0].value}
              </motion.div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 marathi-text">
                {(
                  (genderDistribution[0].value / students.length) *
                  100
                ).toFixed(1)}
                % एकूण विद्यार्थ्यांपैकी
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-1.5 bg-gradient-to-r from-pink-500 to-rose-600"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs sm:text-sm marathi-text">
                  मुली
                </span>
                <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                  <UserCircle className="h-4 sm:h-5 w-4 sm:w-5" />
                </div>
              </div>
              <motion.div
                className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-gray-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.4,
                }}
              >
                {genderDistribution[1].value}
              </motion.div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 marathi-text">
                {(
                  (genderDistribution[1].value / students.length) *
                  100
                ).toFixed(1)}
                % एकूण विद्यार्थ्यांपैकी
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-600"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs sm:text-sm marathi-text">
                  सरासरी उपस्थिती
                </span>
                <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Clock className="h-4 sm:h-5 w-4 sm:w-5" />
                </div>
              </div>
              <motion.div
                className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-gray-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.5,
                }}
              >
                {Math.floor(
                  students.reduce(
                    (acc, student) => acc + student.attendance,
                    0
                  ) / students.length
                )}
                %
              </motion.div>
              <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-green-600">
                <TrendingUp className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                <span>
                  +{Math.floor(Math.random() * 5) + 1}% मागील महिन्यापेक्षा
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Chart Selection Tabs - Responsive */}
        <motion.div
          className="mb-4 sm:mb-6 flex justify-center"
          variants={itemVariants}
        >
          <div className="bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-sm inline-flex flex-wrap justify-center gap-1 sm:gap-0 sm:flex-nowrap">
            <motion.button
              className={`flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${
                activeChart === "pie"
                  ? "bg-violet-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveChart("pie")}
              whileHover={
                activeChart !== "pie"
                  ? { backgroundColor: "rgba(243, 244, 246, 1)" }
                  : {}
              }
              whileTap={{ scale: 0.95 }}
            >
              <PieChartIcon className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
              <span className="marathi-text">लिंग वितरण</span>
            </motion.button>

            <motion.button
              className={`flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${
                activeChart === "bar"
                  ? "bg-violet-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveChart("bar")}
              whileHover={
                activeChart !== "bar"
                  ? { backgroundColor: "rgba(243, 244, 246, 1)" }
                  : {}
              }
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
              <span className="marathi-text">कामगिरी</span>
            </motion.button>

            <motion.button
              className={`flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${
                activeChart === "line"
                  ? "bg-violet-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveChart("line")}
              whileHover={
                activeChart !== "line"
                  ? { backgroundColor: "rgba(243, 244, 246, 1)" }
                  : {}
              }
              whileTap={{ scale: 0.95 }}
            >
              <LineChartIcon className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
              <span className="marathi-text">मासिक प्रगती</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Charts - Responsive Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Chart - Full width on mobile, 2/3 on larger screens */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 overflow-hidden"
            variants={itemVariants}
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 marathi-text">
              {activeChart === "pie"
                ? `${selectedStandard} मधील लिंगानुसार वितरण`
                : activeChart === "bar"
                ? `${selectedStandard} मधील कामगिरी वितरण`
                : `${selectedStandard} मासिक प्रगती`}
            </h3>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeChart}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="h-64 sm:h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  {activeChart === "pie" ? (
                    <PieChart>
                      <Pie
                        data={genderDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        innerRadius={40}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1500}
                      >
                        {genderDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
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
                      <Legend
                        formatter={(value) => (
                          <span className="marathi-text">{value}</span>
                        )}
                        iconType="circle"
                      />
                    </PieChart>
                  ) : activeChart === "bar" ? (
                    <BarChart data={performanceData} barSize={30}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.3}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => value.split(" ")[0]}
                        axisLine={false}
                      />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(value) => [`${value} विद्यार्थी`, "संख्या"]}
                        contentStyle={{
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          border: "none",
                          padding: "8px",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1500}
                        radius={[4, 4, 0, 0]}
                      >
                        {performanceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient
                          id="colorAttendance"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8B5CF6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8B5CF6"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorPerformance"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#EC4899"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#EC4899"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.3}
                      />
                      <XAxis dataKey="name" axisLine={false} />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        domain={[60, 100]}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, ""]}
                        contentStyle={{
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          border: "none",
                          padding: "8px",
                        }}
                      />
                      <Legend
                        formatter={(value) => (
                          <span className="marathi-text">
                            {value === "attendance" ? "उपस्थिती" : "कामगिरी"}
                          </span>
                        )}
                      />
                      <Area
                        type="monotone"
                        dataKey="attendance"
                        stroke="#8B5CF6"
                        fillOpacity={1}
                        fill="url(#colorAttendance)"
                        animationBegin={0}
                        animationDuration={1500}
                      />
                      <Area
                        type="monotone"
                        dataKey="performance"
                        stroke="#EC4899"
                        fillOpacity={1}
                        fill="url(#colorPerformance)"
                        animationBegin={300}
                        animationDuration={1500}
                      />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap justify-around gap-2 sm:gap-4 mt-4 sm:mt-6 p-2 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
              {activeChart === "pie" ? (
                <>
                  <div className="text-center min-w-[80px]">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1 marathi-text">
                      मुलगे
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-violet-600">
                      {genderDistribution[0].value}
                    </div>
                  </div>
                  <div className="text-center min-w-[80px]">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1 marathi-text">
                      मुली
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-pink-600">
                      {genderDistribution[1].value}
                    </div>
                  </div>
                  <div className="text-center min-w-[80px]">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1 marathi-text">
                      एकूण
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-indigo-600">
                      {students.length}
                    </div>
                  </div>
                </>
              ) : activeChart === "bar" ? (
                <>
                  <div className="text-center min-w-[80px]">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1 marathi-text">
                      उत्कृष्ट
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-violet-600">
                      {performanceData[0].value} (
                      {(
                        (performanceData[0].value / students.length) *
                        100
                      ).toFixed(0)}
                      %)
                    </div>
                  </div>
                  <div className="text-center min-w-[80px]">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1 marathi-text">
                      चांगले
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-blue-600">
                      {performanceData[1].value} (
                      {(
                        (performanceData[1].value / students.length) *
                        100
                      ).toFixed(0)}
                      %)
                    </div>
                  </div>
                  <div className="text-center min-w-[80px]">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1 marathi-text">
                      सुधारणे आवश्यक
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-amber-600">
                      {performanceData[3].value} (
                      {(
                        (performanceData[3].value / students.length) *
                        100
                      ).toFixed(0)}
                      %)
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center min-w-[100px]">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1 marathi-text">
                      सरासरी उपस्थिती
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-violet-600">
                      {(
                        monthlyData.reduce(
                          (acc, month) => acc + month.attendance,
                          0
                        ) / monthlyData.length
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1 marathi-text">
                      सरासरी कामगिरी
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-pink-600">
                      {(
                        monthlyData.reduce(
                          (acc, month) => acc + month.performance,
                          0
                        ) / monthlyData.length
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Side Stats - Full width on mobile, 1/3 on larger screens */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            variants={containerVariants}
          >
            {/* Top Performers */}
            <motion.div
              className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6"
              variants={itemVariants}
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 marathi-text">
                  उत्कृष्ट विद्यार्थी
                </h3>
                <div className="h-7 sm:h-8 w-7 sm:w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Award className="h-3 sm:h-4 w-3 sm:w-4" />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {students
                  .sort((a, b) => b.performance - a.performance)
                  .slice(0, 5)
                  .map((student, index) => (
                    <motion.div
                      key={student.id}
                      className="flex items-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <div className="flex-shrink-0 h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                        {index + 1}
                      </div>
                      <div className="ml-3 sm:ml-4 flex-1">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-xs text-gray-500 marathi-text">
                          {student.gender}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="text-base sm:text-lg font-bold text-violet-600">
                          {student.performance}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Attendance Stats */}
            <motion.div
              className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6"
              variants={itemVariants}
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 marathi-text">
                  उपस्थिती स्थिती
                </h3>
                <div className="h-7 sm:h-8 w-7 sm:w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <BookOpen className="h-3 sm:h-4 w-3 sm:w-4" />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {[
                  "उत्कृष्ट (>95%)",
                  "चांगले (85-95%)",
                  "समाधानकारक (75-85%)",
                  "सुधारणे आवश्यक (<75%)",
                ].map((category, index) => {
                  const min =
                    index === 0 ? 95 : index === 1 ? 85 : index === 2 ? 75 : 0;
                  const max =
                    index === 0
                      ? 100
                      : index === 1
                      ? 95
                      : index === 2
                      ? 85
                      : 75;
                  const count = students.filter(
                    (s) => s.attendance >= min && s.attendance < max
                  ).length;
                  const percentage = ((count / students.length) * 100).toFixed(
                    1
                  );

                  return (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-600 marathi-text">
                          {category}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-900">
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                        <motion.div
                          className="h-2 sm:h-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              index === 0
                                ? "#10B981"
                                : index === 1
                                ? "#6366F1"
                                : index === 2
                                ? "#F59E0B"
                                : "#EF4444",
                            width: `${percentage}%`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 * index }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics;
