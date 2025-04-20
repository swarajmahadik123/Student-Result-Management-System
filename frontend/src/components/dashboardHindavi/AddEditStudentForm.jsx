"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Calendar,
  Phone,
  MapPin,
  UserCircle,
  Users,
  Hash,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";

const AddEditStudentForm = ({ onClose, onSaveStudent, initialData }) => {
  const [studentData, setStudentData] = useState(
    initialData || {
      name: "",
      motherName: "",
      fatherName: "",
      gender: "",
      dob: "",
      address: "",
      phoneNo: "",
      rollNumber: "",
      admissionNumber: "",
      standard: "",
      division: "",
      academicYear: "2024-25", // Default academic year
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (initialData) {
        // Update existing student
        console.log("Updating student:", studentData);
        toast.success("Student successfully updated!");
      } else {
        // Add new student
        console.log("Adding new student:", studentData);
        toast.success("Student successfully added!");
      }

      onSaveStudent(studentData);
    } catch (err) {
      setError(err.message || "Error saving student");
      toast.error("Error saving student");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 },
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.05, duration: 0.3 },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-purple-100/30"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex justify-between items-center p-6 border-b border-purple-100/30 bg-gradient-to-r from-slate-50 to-purple-50">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
              {initialData ? "Edit Student" : "Add New Student"}
            </h2>
            <motion.button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 bg-white/80 p-2 rounded-full"
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>
          <div className="p-6">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <React.Fragment key={index}>
                    <motion.div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        currentStep > index
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                          : currentStep === index + 1
                          ? "bg-white border-2 border-violet-600 text-violet-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                      animate={{
                        scale: currentStep === index + 1 ? 1.1 : 1,
                        boxShadow:
                          currentStep === index + 1
                            ? "0 0 0 4px rgba(139, 92, 246, 0.2)"
                            : "none",
                      }}
                    >
                      {currentStep > index ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                          }}
                        >
                          ✓
                        </motion.div>
                      ) : (
                        index + 1
                      )}
                    </motion.div>
                    {index < totalSteps - 1 && (
                      <div className="flex-1 h-1 mx-2 bg-gray-200 relative">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-600 to-indigo-600"
                          initial={{ width: "0%" }}
                          animate={{
                            width:
                              currentStep > index + 1
                                ? "100%"
                                : currentStep === index + 1
                                ? "50%"
                                : "0%",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">Personal Info</span>
                <span className="text-sm text-gray-500">Academic Info</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        className="col-span-2"
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="name"
                        >
                          <User size={16} className="inline mr-2" />
                          Student Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={studentData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        />
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="fatherName"
                        >
                          <UserCircle size={16} className="inline mr-2" />
                          Father's Name
                        </label>
                        <input
                          type="text"
                          id="fatherName"
                          name="fatherName"
                          value={studentData.fatherName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        />
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="motherName"
                        >
                          <UserCircle size={16} className="inline mr-2" />
                          Mother's Name
                        </label>
                        <input
                          type="text"
                          id="motherName"
                          name="motherName"
                          value={studentData.motherName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        />
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="gender"
                        >
                          <Users size={16} className="inline mr-2" />
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={studentData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={4}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="dob"
                        >
                          <Calendar size={16} className="inline mr-2" />
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={studentData.dob}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        />
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={5}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="phoneNo"
                        >
                          <Phone size={16} className="inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phoneNo"
                          name="phoneNo"
                          value={studentData.phoneNo}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                        />
                      </motion.div>

                      <motion.div
                        className="col-span-2"
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={6}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="address"
                        >
                          <MapPin size={16} className="inline mr-2" />
                          Address
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={studentData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          rows="2"
                          required
                        ></textarea>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="rollNumber"
                        >
                          <Hash size={16} className="inline mr-2" />
                          Roll Number
                        </label>
                        <input
                          type="text"
                          id="rollNumber"
                          name="rollNumber"
                          value={studentData.rollNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        />
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="admissionNumber"
                        >
                          <Hash size={16} className="inline mr-2" />
                          Admission Number
                        </label>
                        <input
                          type="text"
                          id="admissionNumber"
                          name="admissionNumber"
                          value={studentData.admissionNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        />
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="standard"
                        >
                          <GraduationCap size={16} className="inline mr-2" />
                          Standard
                        </label>
                        <select
                          id="standard"
                          name="standard"
                          value={studentData.standard}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        >
                          <option value="">Select Standard</option>
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (num) => (
                              <option key={num} value={num.toString()}>
                                {num}
                              </option>
                            )
                          )}
                        </select>
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="division"
                        >
                          <Users size={16} className="inline mr-2" />
                          Division
                        </label>
                        <select
                          id="division"
                          name="division"
                          value={studentData.division}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        >
                          <option value="">Select Division</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                        </select>
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={4}
                      >
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="academicYear"
                        >
                          <Calendar size={16} className="inline mr-2" />
                          Academic Year
                        </label>
                        <select
                          id="academicYear"
                          name="academicYear"
                          value={studentData.academicYear}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        >
                          <option value="2024-25">2024-25</option>
                          <option value="2025-26">2025-26</option>
                        </select>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                <motion.button
                  type="button"
                  onClick={currentStep > 1 ? prevStep : onClose}
                  className="px-6 py-3 rounded-xl transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep > 1 ? "Previous" : "Cancel"}
                </motion.button>

                {currentStep < totalSteps ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 rounded-xl transition-colors duration-200 bg-violet-600 hover:bg-violet-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl transition-colors duration-200 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? "Saving..." : "Save"}
                  </motion.button>
                )}
              </div>
              {error && <div className="mt-4 text-red-500">{error}</div>}
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddEditStudentForm;
