"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gurukulLogo, hindaviLogo, logo } from "../assets/images";
import { authAPI } from "../services/api";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  const [userRole, setUserRole] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authAPI.verify();
        setUserRole(data.role);
      } catch (error) {
        console.log("User not logged in or error verifying auth");
        setUserRole(null);
      }
    };

    checkAuth();

    // Load custom Marathi font
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);

    // Add custom styles for Marathi text
    const style = document.createElement("style");
    style.textContent = `
      .marathi-text {
        font-family: 'Mukta', sans-serif;
        letter-spacing: 0.02em;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  const handleDashboardClick = () => {
    if (userRole === "hindavi") {
      navigate("/dashboard-hindavi");
    } else if (userRole === "gurukul") {
      navigate("/dashboard-gurukul");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-purple-50 overflow-x-hidden font-['Poppins']">
      {/* Navigation - Responsive */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/70 backdrop-blur-xl shadow-sm border-b border-purple-100/30 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src={hindaviLogo || "/placeholder.svg"}
                alt="Hindavi Logo"
                className="h-10 sm:h-12 w-auto"
              />
              <span className="text-lg sm:text-xl p-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 marathi-text">
                हिंदवी पब्लिक स्कूल
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {["मुख्यपृष्ठ", "आमच्याबद्दल", "पंचकोश", "गॅलरी", "संपर्क"].map(
                (item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Link
                      to="/"
                      className="text-purple-800 hover:text-purple-600 px-2 lg:px-3 py-2 text-sm font-medium marathi-text"
                    >
                      {item}
                    </Link>
                  </motion.div>
                )
              )}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={handleDashboardClick}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 marathi-text"
                >
                  डॅशबोर्ड
                </button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-purple-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
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
              <div className="px-4 pt-2 pb-6 space-y-2">
                {["मुख्यपृष्ठ", "आमच्याबद्दल", "पंचकोश", "गॅलरी", "संपर्क"].map(
                  (item) => (
                    <Link
                      key={item}
                      to="/"
                      className="block px-3 py-2 rounded-md text-base font-medium text-purple-800 hover:text-purple-600 hover:bg-purple-50 marathi-text"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  )
                )}
                <motion.button
                  onClick={() => {
                    handleDashboardClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-full text-base font-medium mt-2 marathi-text"
                  whileTap={{ scale: 0.95 }}
                >
                  डॅशबोर्ड
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 -z-10"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 -z-5">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-300/20 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-300/20 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                className="flex items-center bg-transparent"
                variants={fadeIn}
              >
                <img
                  src={hindaviLogo || "/placeholder.svg"}
                  alt="Hindavi Logo"
                  className="h-10 sm:h-14 w-auto mr-3 sm:mr-4"
                />
                <div className="h-8 sm:h-10 w-0.5 bg-gradient-to-b from-purple-300 to-blue-300 mr-3 sm:mr-4"></div>
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-medium text-base sm:text-lg marathi-text">
                  श्रीनिधी एज्युकेशन सोसायटी, सातारा
                </h3>
              </motion.div>

              <motion.h3
                className="text-2xl sm:text-3xl md:text-3xl text-gray-900 leading-tight marathi-text"
                variants={fadeIn}
              >
                हिंदवी पब्लिक स्कूल
              </motion.h3>

              <motion.h2
                className="text-3xl sm:text-4xl md:text-4xl bg-clip-text font-bold bg-gradient-to-r from-violet-500 to-blue-500 marathi-text"
                variants={fadeIn}
              >
                हिंदवी पंचकोशाधारित गुरुकुल
              </motion.h2>

              <motion.p
                className="text-gray-600 text-base sm:text-lg max-w-2xl marathi-text"
                variants={fadeIn}
              >
                आमचे गुरुकुल पंचकोश तत्त्वज्ञानावर आधारित आहे - अन्नमयकोश,
                प्राणमयकोश, मनोमयकोश, विज्ञानमयकोश आणि आनंदमयकोश या पाच घटकांचा
                समतोल विकास करणारी अभिनव शिक्षण पद्धती.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 pt-4"
                variants={fadeIn}
              >
                <motion.button
                  onClick={handleDashboardClick}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-medium marathi-text"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  डॅशबोर्ड
                </motion.button>
                <motion.button
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center space-x-2 marathi-text"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>डेमो पहा</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative flex justify-center items-center mt-8 md:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-violet-400 to-blue-500 rounded-3xl opacity-20 blur-3xl"></div>
              <motion.div
                className="relative z-10"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 6,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Student Meditation"
                  className="relative z-20 w-full max-w-xs sm:max-w-md lg:max-w-lg"
                />

                {/* Animated glow effect */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-500/30 to-blue-500/30 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-transparent p-2 bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-12 sm:mb-16 marathi-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            पंचकोशाधारित शिक्षण
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 items-center">
            <motion.div
              className="col-span-1 flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl blur opacity-75"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
                <img
                  src={hindaviLogo || "/placeholder.svg"}
                  alt="School Logo"
                  className="relative z-10 max-h-[200px] sm:max-h-[280px]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="col-span-1 flex justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 marathi-text">
                  ॥ स्वयमेव मृगेंद्रता ॥
                </h3>
                <p className="text-gray-600 text-base sm:text-lg marathi-text">
                  पंचकोश पद्धतीने विद्यार्थ्यांचा सर्वांगीण विकास हेच आमचे
                  उद्दिष्ट
                </p>

                <motion.div
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-purple-600 rounded-full text-purple-600 bg-white marathi-text"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(245, 243, 255, 1)",
                    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium text-sm sm:text-base">
                    श्रीनिधी एज्युकेशन सोसायटी, सातारा
                  </span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="col-span-1 flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl blur opacity-75"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
                <img
                  src={gurukulLogo || "/placeholder.svg"}
                  alt="Panchakosha Chart"
                  className="relative z-10 max-h-[200px] sm:max-h-[280px]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-purple-50/50 to-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent p-2 bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-2 sm:mb-4 marathi-text">
              पंचकोश शिक्षणाचे पैलू
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto marathi-text">
              आमच्या अभिनव शिक्षण पद्धतीचे मूलभूत स्तंभ
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {[
              {
                title: "अन्नमयकोश",
                desc: "शारीरिक शिक्षण आणि आरोग्यावर लक्ष केंद्रित करते. यामध्ये योग्य आहार, व्यायाम, योगासने आणि क्रीडा समाविष्ट आहेत.",
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "प्राणमयकोश",
                desc: "प्राणायाम आणि श्वासोच्छवास व्यायामांद्वारे ऊर्जेचे व्यवस्थापन आणि निर्णय क्षमता विकसित करण्यावर भर देते.",
                color: "from-green-500 to-green-600",
              },
              {
                title: "मनोमयकोश",
                desc: "मनाचे प्रशिक्षण, एकाग्रता वाढवणे आणि भावनिक बुद्धिमत्ता विकसित करण्यासाठी मार्गदर्शन करते.",
                color: "from-yellow-500 to-yellow-600",
              },
              {
                title: "विज्ञानमयकोश",
                desc: "बौद्धिक क्षमता, विवेक आणि निर्णय क्षमता विकसित करण्यावर भर देते.",
                color: "from-violet-500 to-violet-600",
              },
              {
                title: "आनंदमयकोश",
                desc: "आंतरिक आनंद, शांती आणि स्वतःच्या सर्वोच्च क्षमतेचा शोध घेण्यास मदत करते.",
                color: "from-red-500 to-red-600",
              },
              {
                title: "एकात्मिक विकास",
                desc: "सर्व पाच कोशांचा एकत्रित विकास करून विद्यार्थ्यांचे संपूर्ण व्यक्तिमत्व घडवणे.",
                color: "from-pink-500 to-pink-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <motion.div
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full"
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <motion.div
                    className={`h-2 bg-gradient-to-r ${item.color}`}
                    whileHover={{ height: "0.75rem" }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 transition-all duration-300 bg-clip-text marathi-text">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base marathi-text">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 -z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full -z-5 opacity-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/30 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 12,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-white/20 blur-3xl"
            animate={{
              x: [0, -60, 0],
              y: [0, -40, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-10 px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white marathi-text"
              variants={fadeIn}
            >
              आमच्या गुरुकुल पद्धतीचा अनुभव घ्या
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-purple-100 mb-8 sm:mb-10 marathi-text"
              variants={fadeIn}
            >
              पंचकोश पद्धतीवर आधारित आमच्या अभिनव शिक्षण पद्धतीद्वारे आपल्या
              मुलांना संपूर्ण विकासाची संधी द्या.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              variants={fadeIn}
            >
              <motion.button
                className="bg-white text-violet-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium marathi-text"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                प्रवेश प्रक्रिया
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium marathi-text"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                भेट द्या
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-lg border-t border-purple-100/30 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6 md:mb-0">
              <motion.img
                src={hindaviLogo}
                alt="Hindavi Public School Logo"
                className="h-10 sm:h-12 w-auto mr-3 sm:mr-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 marathi-text">
                  हिंदवी पब्लिक स्कूल
                </h3>
                <p className="text-gray-600 text-sm sm:text-base marathi-text">
                  श्रीनिधी एज्युकेशन सोसायटी, सातारा
                </p>
              </div>
            </div>

            <div className="text-center md:text-right space-y-1 sm:space-y-2">
              <p className="text-gray-600 text-sm sm:text-base marathi-text">
                संपर्क: info@hindavipublicschool.in
              </p>
              <p className="text-gray-500 text-xs sm:text-sm marathi-text">
                © {new Date().getFullYear()} हिंदवी पब्लिक स्कूल. सर्व हक्क
                राखीव.
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
