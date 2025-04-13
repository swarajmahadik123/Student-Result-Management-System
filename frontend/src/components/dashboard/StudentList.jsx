"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  X,
  Download,
  Edit,
  Trash,
  ChevronDown,
  GraduationCap,
  User,
  Calendar,
  Phone,
  MapPin,
  Hash,
  UserCircle,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  downloadStudentResult,
} from "../../services/api";

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
      academicYear: "२०२४-२५", // Default academic year
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
      if (initialData) {
        // Update existing student
        const updatedStudent = await updateStudent(
          studentData._id,
          studentData
        );
        toast.success("विद्यार्थी यशस्वीरित्या अद्यतनित केला गेला");
        onSaveStudent(updatedStudent);
      } else {
        // Add new student
        const newStudent = await createStudent(studentData);
        toast.success("विद्यार्थी यशस्वीरित्या जोडला गेला");
        onSaveStudent(newStudent);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "विद्यार्थी जतन करण्यात त्रुटी आली"
      );
      toast.error("विद्यार्थी जतन करण्यात त्रुटी आली");
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
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 marathi-text">
              {initialData ? "विद्यार्थी संपादित करा" : "नवीन विद्यार्थी जोडा"}
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
                <span className="text-sm text-gray-500 marathi-text">
                  वैयक्तिक माहिती
                </span>
                <span className="text-sm text-gray-500 marathi-text">
                  शैक्षणिक माहिती
                </span>
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
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="name"
                        >
                          <User size={16} className="inline mr-2" />
                          विद्यार्थ्याचे नाव
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
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="fatherName"
                        >
                          <UserCircle size={16} className="inline mr-2" />
                          वडिलांचे नाव
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
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="motherName"
                        >
                          <UserCircle size={16} className="inline mr-2" />
                          आईचे नाव
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
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="gender"
                        >
                          <Users size={16} className="inline mr-2" />
                          लिंग
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={studentData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        >
                          <option value="">निवडा</option>
                          <option value="मुलगा">मुलगा</option>
                          <option value="मुलगी">मुलगी</option>
                        </select>
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={4}
                      >
                        <label
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="dob"
                        >
                          <Calendar size={16} className="inline mr-2" />
                          जन्मतारीख
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
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="phoneNo"
                        >
                          <Phone size={16} className="inline mr-2" />
                          फोन नंबर
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
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="address"
                        >
                          <MapPin size={16} className="inline mr-2" />
                          पत्ता
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

                    <div className="flex justify-end mt-8">
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full shadow-md flex items-center"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="marathi-text">पुढे जा</span>
                        <ChevronDown className="ml-2 rotate-270" size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
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
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="standard"
                        >
                          <GraduationCap size={16} className="inline mr-2" />
                          इयत्ता
                        </label>
                        <select
                          id="standard"
                          name="standard"
                          value={studentData.standard}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        >
                          <option value="">निवडा</option>
                          <option value="५">इयत्ता ५ वी</option>
                          <option value="६">इयत्ता ६ वी</option>
                          <option value="७">इयत्ता ७ वी</option>
                          <option value="८">इयत्ता ८ वी</option>
                          <option value="९">इयत्ता ९ वी</option>
                          <option value="१०">इयत्ता १० वी</option>
                        </select>
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                      >
                        <label
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="academicYear"
                        >
                          <Calendar size={16} className="inline mr-2" />
                          शैक्षणिक वर्ष
                        </label>
                        <select
                          id="academicYear"
                          name="academicYear"
                          value={studentData.academicYear}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          required
                        >
                          <option value="२०२४-२५">२०२४-२५</option>
                          <option value="२०२५-२६">२०२५-२६</option>
                          <option value="२०२६-२७">२०२६-२७</option>
                        </select>
                      </motion.div>

                      <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                      >
                        <label
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="rollNumber"
                        >
                          <Hash size={16} className="inline mr-2" />
                          हजेरी क्रमांक
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
                        custom={3}
                      >
                        <label
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="admissionNumber"
                        >
                          <Hash size={16} className="inline mr-2" />
                          प्रवेश क्रमांक
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
                        custom={7} // Adjust this number based on its order in the form
                      >
                        <label
                          className="block text-gray-700 mb-2 marathi-text"
                          htmlFor="division"
                        >
                          <Users size={16} className="inline mr-2" />
                          तुकडी (Division)
                        </label>
                        <input
                          type="text"
                          id="division"
                          name="division"
                          value={studentData.division}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                          placeholder="विभाग प्रविष्ट करा (Enter Division)"
                          required
                        />
                      </motion.div>
                    </div>

                    {error && (
                      <motion.div
                        className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {error}
                      </motion.div>
                    )}

                    <div className="flex justify-between mt-8">
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-violet-600 text-violet-600 rounded-full shadow-sm flex items-center bg-white"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChevronDown className="mr-2 rotate-90" size={18} />
                        <span className="marathi-text">मागे जा</span>
                      </motion.button>
                      <motion.button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full shadow-md flex items-center"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                            <span className="marathi-text">जतन करत आहे...</span>
                          </>
                        ) : (
                          <span className="marathi-text">जतन करा</span>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


const StudentList = ({ onSelectStudent }) => {
  const [students, setStudents] = useState([]);
  
  const [filterStandard, setFilterStandard] = useState(
    () => sessionStorage.getItem("filterStandard") || ""
  );
  const [searchTerm, setSearchTerm] = useState(
    () => sessionStorage.getItem("searchTerm") || ""
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const standards = ["५", "६", "७", "८", "९", "१०"];

  useEffect(() => {
    sessionStorage.setItem("filterStandard", filterStandard);
    sessionStorage.setItem("searchTerm", searchTerm);
  }, [filterStandard, searchTerm]);

  const fetchStudents = async () => {
    if (!searchTerm && !filterStandard) {
      setStudents([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    try {
      const data = await getStudents({
        search: searchTerm,
        standard: filterStandard,
      });
      setStudents(data);
      setHasSearched(true);
    } catch (error) {
      toast.error("विद्यार्थी माहिती आणण्यात त्रुटी आली");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filterStandard]);

  useEffect(() => {
    if (searchTerm || filterStandard) {
      fetchStudents();
    }
  }, []);

  const handleAddStudent = (newStudent) => {
    setShowAddForm(false);
    if (hasSearched) {
      fetchStudents();
    }
  };

  const handleEditStudent = (updatedStudent) => {
    setEditingStudent(null);
    setStudents((prev) =>
      prev.map((s) => (s._id === updatedStudent._id ? updatedStudent : s))
    );
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      toast.success("विद्यार्थी यशस्वीरित्या हटवला गेला");
      setStudents((prev) => prev.filter((s) => s._id !== studentId));
    } catch (error) {
      toast.error("विद्यार्थी हटवण्यात त्रुटी आली");
    }
  };

  const handleDownloadResult = async (studentId,name, e) => {
    e.stopPropagation();
    setDownloadingId(studentId);

    try {
      await downloadStudentResult(studentId, name);
      toast.success("परिणाम डाउनलोड यशस्वी");
    } catch (error) {
      toast.error("परिणाम डाउनलोड करताना त्रुटी आली");
    } finally {
      setDownloadingId(null);
    }
  };

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

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-6 px-4 sm:px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-8xl mx-auto ">
        <motion.div
          className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl h-[95vh] overflow-hidden border border-purple-100/30 p-6"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <motion.h2
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 marathi-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              विद्यार्थी यादी
            </motion.h2>
            <motion.button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-full shadow-md flex items-center"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Plus size={20} className="mr-2" />
              <span className="marathi-text">नवीन विद्यार्थी जोडा</span>
            </motion.button>
          </div>

          <motion.div
            className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={itemVariants}
          >
            <div className="relative">
              <label className="block text-sm font-medium mb-2 marathi-text">
                शोधा
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 pl-12 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                  placeholder="नाव किंवा रोल नंबर"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute left-4 top-3.5 text-violet-500"
                  size={20}
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-2 marathi-text">
                वर्ग निवडा
              </label>
              <div className="relative">
                <button
                  className="w-full p-3 pl-12 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80 flex items-center justify-between text-left"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="marathi-text">
                    {filterStandard ? `इयत्ता ${filterStandard}` : "निवडा"}
                  </span>
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                <GraduationCap
                  className="absolute left-4 top-3.5 text-violet-500"
                  size={20}
                />

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="py-1">
                        <button
                          className={`block w-full text-left px-4 py-3 text-sm marathi-text ${
                            filterStandard === ""
                              ? "bg-violet-50 text-violet-700 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setFilterStandard("");
                            setIsDropdownOpen(false);
                          }}
                        >
                          सर्व इयत्ता
                        </button>
                        {standards.map((standard) => (
                          <button
                            key={standard}
                            className={`block w-full text-left px-4 py-3 text-sm marathi-text ${
                              filterStandard === standard
                                ? "bg-violet-50 text-violet-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() => {
                              setFilterStandard(standard);
                              setIsDropdownOpen(false);
                            }}
                          >
                            इयत्ता {standard}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="inline-block h-12 w-12 rounded-full border-4 border-violet-200 border-t-violet-600"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <p className="mt-4 text-gray-600 marathi-text">
                विद्यार्थी शोधत आहे...
              </p>
            </motion.div>
          ) : !hasSearched ? (
            <motion.div
              className="text-center py-16 bg-white/50 rounded-2xl border border-purple-100/30"
              variants={itemVariants}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Search size={64} className="mx-auto text-violet-300 mb-4" />
              </motion.div>
              <p className="text-gray-600 marathi-text text-lg">
                विद्यार्थी शोधण्यासाठी वरील फिल्टर वापरा
              </p>
              <p className="text-gray-500 mt-2 marathi-text">
                नाव, रोल नंबर किंवा इयत्ता निवडा
              </p>
            </motion.div>
          ) : students.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {students.map((student, index) => (
                <motion.div
                  key={student._id}
                  className="bg-white/90 backdrop-blur-sm border border-purple-100/30 p-5 rounded-2xl hover:bg-white transition-colors cursor-pointer relative overflow-hidden group"
                  variants={cardVariants}
                  whileHover="hover"
                  custom={index}
                  onClick={() => onSelectStudent(student)}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-lg marathi-text">
                        {student.name}
                      </p>
                      <p className="text-gray-600 marathi-text">
                        इयत्ता {student.standard}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingStudent(student);
                        }}
                        className="text-violet-600 hover:text-violet-800 bg-violet-50 hover:bg-violet-100 p-2 rounded-full transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            window.confirm(
                              "तुम्हाला हा विद्यार्थी खरोखर हटवायचा आहे?"
                            )
                          ) {
                            handleDeleteStudent(student._id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 p-2 rounded-full transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash size={16} />
                      </motion.button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <p className="text-sm text-gray-500 marathi-text">
                      हजेरी क्रमांक: {student.rollNumber}
                    </p>
                    <motion.button
                      onClick={(e) => handleDownloadResult(student._id,student.name, e)}
                      className="flex items-center text-violet-600 hover:text-violet-800 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-full transition-colors"
                      disabled={downloadingId === student._id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {downloadingId === student._id ? (
                        <>
                          <div className="mr-2 h-3 w-3 rounded-full border-2 border-violet-600 border-t-transparent animate-spin"></div>
                          <span className="text-sm marathi-text">
                            डाउनलोड करत आहे...
                          </span>
                        </>
                      ) : (
                        <>
                          <Download size={14} className="mr-1.5" />
                          <span className="text-sm marathi-text">
                            परिणाम डाउनलोड
                          </span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16 bg-white/50 rounded-2xl border border-purple-100/30"
              variants={itemVariants}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: [0, 10, 0, -10, 0] }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  rotate: { repeat: 0, duration: 0.5 },
                }}
              >
                <X size={64} className="mx-auto text-gray-300 mb-4" />
              </motion.div>
              <p className="text-gray-600 marathi-text text-lg">
                कोणतेही विद्यार्थी सापडले नाहीत
              </p>
              <p className="text-gray-500 mt-2 marathi-text">
                कृपया शोध निकष बदला किंवा नवीन विद्यार्थी जोडा
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {showAddForm && (
        <AddEditStudentForm
          onClose={() => setShowAddForm(false)}
          onSaveStudent={handleAddStudent}
        />
      )}

      {editingStudent && (
        <AddEditStudentForm
          initialData={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSaveStudent={handleEditStudent}
        />
      )}
    </motion.div>
  );
};

export default StudentList;
