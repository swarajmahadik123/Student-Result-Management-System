"use client";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Edit, ChevronLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { updateStudentResult } from "../../services/api";
import AnnamayaKosha from "../KoshResult/AnnamayaKosha";
import PranamayaKosha from "../KoshResult/PranamayaKosha";
import ManomayaKosha from "../KoshResult/ManomayaKosha";
import VidnyanmayaKosha from "../KoshResult/VidnyanmayaKosha";
import AnandmayaKosha from "../KoshResult/AnandmayaKosha";

const StudentResult = ({ student, format, onBack }) => {
  const [activeTab, setActiveTab] = useState("अन्नमयकोश");
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState(student);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Kosha images mapping
  const koshaImages = {
    अन्नमयकोश:
      "https://res.cloudinary.com/dloe8x9e4/image/upload/v1744560276/ann_qcmics.jpg",
    प्राणमयकोश:
      "https://res.cloudinary.com/dloe8x9e4/image/upload/v1744560277/pran_ccjrr8.jpg",
    मनोमयकोश:
      "https://res.cloudinary.com/dloe8x9e4/image/upload/v1744560276/mano_ogjmag.jpg",
    विज्ञानमयकोश:
      "https://res.cloudinary.com/dloe8x9e4/image/upload/v1744560276/vidn_kmu5tk.jpg",
    आनंदमयकोश:
      "https://res.cloudinary.com/dloe8x9e4/image/upload/v1744560276/anand_eso59e.jpg",
  };

  // Handle updates from kosha components
  const handleKoshaUpdate = (koshaType, data) => {
    setStudentData((prev) => ({
      ...prev,
      result: {
        ...prev.result,
        [koshaType]: data,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateStudentResult(studentData._id, studentData.result);
      setShowSuccessAnimation(true);
      setTimeout(() => {
        setShowSuccessAnimation(false);
        toast.success(`${activeTab} स्वरूप जतन केले`);
        setIsEditing(false);
      }, 1500);
    } catch (error) {
      toast.error("परिणाम जतन करताना त्रुटी आली");
      console.error("Error saving result:", error);
    } finally {
      setTimeout(() => {
        setIsSaving(false);
      }, 1500);
    }
  };

  const koshaTypeMap = {
    अन्नमयकोश: "annamayaKosha",
    प्राणमयकोश: "pranamayaKosha",
    मनोमयकोश: "manomayaKosha",
    विज्ञानमयकोश: "vidnyanmayaKosha",
    आनंदमयकोश: "anandmayaKosha",
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

  // Color mapping for koshas
  const koshaColors = {
    अन्नमयकोश: {
      from: "from-blue-500",
      to: "to-blue-600",
      text: "text-blue-600",
      bg: "bg-blue-50",
    },
    प्राणमयकोश: {
      from: "from-green-500",
      to: "to-green-600",
      text: "text-green-600",
      bg: "bg-green-50",
    },
    मनोमयकोश: {
      from: "from-yellow-500",
      to: "to-yellow-600",
      text: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    विज्ञानमयकोश: {
      from: "from-violet-500",
      to: "to-violet-600",
      text: "text-violet-600",
      bg: "bg-violet-50",
    },
    आनंदमयकोश: {
      from: "from-pink-500",
      to: "to-pink-600",
      text: "text-pink-600",
      bg: "bg-pink-50",
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-6 px-4 sm:px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-8xl mx-auto">
        <motion.button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white/90 transition-all flex items-center group"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          <ChevronLeft
            className="mr-2 group-hover:mr-3 transition-all"
            size={18}
          />
          <span className="marathi-text font-medium">मागे जा</span>
        </motion.button>

        <motion.div
          className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden border border-purple-100/30"
          variants={itemVariants}
        >
          {/* Student Info Header */}
          <motion.div className="p-6 border-b border-purple-100/30 bg-gradient-to-r from-slate-50 to-purple-50">
            <motion.h2
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 marathi-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {student.name} चा परिणाम
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4"
              variants={containerVariants}
            >
              <motion.div
                className="bg-white/90 p-4 rounded-xl shadow-sm"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <p className="text-gray-500 text-sm marathi-text">वर्ग</p>
                <p className="font-medium text-lg marathi-text">
                  इयत्ता {student.standard}
                </p>
              </motion.div>
              <motion.div
                className="bg-white/90 p-4 rounded-xl shadow-sm"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <p className="text-gray-500 text-sm marathi-text">
                  हजेरी क्रमांक
                </p>
                <p className="font-medium text-lg marathi-text">
                  {student.rollNumber}
                </p>
              </motion.div>
              <motion.div
                className="bg-white/90 p-4 rounded-xl shadow-sm"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <p className="text-gray-500 text-sm marathi-text">
                  प्रवेश क्रमांक
                </p>
                <p className="font-medium text-lg marathi-text">
                  {student.admissionNumber}
                </p>
              </motion.div>
              <motion.div
                className="bg-white/90 p-4 rounded-xl shadow-sm"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <p className="text-gray-500 text-sm marathi-text">जन्मतारीख</p>
                <p className="font-medium text-lg marathi-text">
                  {student.dob}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Kosha Tabs Navigation with Images */}
          <div className="flex flex-wrap border-b border-purple-100/30 overflow-x-auto bg-white/90">
            {Object.keys(koshaTypeMap).map((kosha, index) => (
              <motion.button
                key={kosha}
                className={`px-4 py-3 font-medium marathi-text relative flex items-center ${
                  activeTab === kosha
                    ? `${koshaColors[kosha].text} font-semibold`
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(kosha)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {/* Kosha Logo Image */}
                <div className="w-8 h-8 mr-2 flex-shrink-0">
                  <img
                    src={koshaImages[kosha]}
                    alt={kosha}
                    className="w-full h-full object-contain"
                  />
                </div>
                {kosha}
                {activeTab === kosha && (
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${koshaColors[kosha].from} ${koshaColors[kosha].to}`}
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <motion.h2
                className={`text-xl font-bold marathi-text ${koshaColors[activeTab].text}`}
                layoutId="tabTitle"
                key={activeTab}
              >
                {activeTab} मूल्यांकन
              </motion.h2>

              <motion.button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={isSaving}
                className={`flex items-center px-5 py-2.5 rounded-full text-white shadow-md ${
                  isEditing
                    ? `bg-gradient-to-r ${koshaColors[activeTab].from} ${koshaColors[activeTab].to}`
                    : "bg-gradient-to-r from-violet-600 to-indigo-600"
                } ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isEditing ? (
                  <>
                    {isSaving ? (
                      <>
                        <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                        <span className="marathi-text">जतन करत आहे...</span>
                      </>
                    ) : (
                      <>
                        <Save className="mr-2" size={18} />
                        <span className="marathi-text">जतन करा</span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Edit className="mr-2" size={18} />
                    <span className="marathi-text">संपादित करा</span>
                  </>
                )}
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-xl ${koshaColors[activeTab].bg}`}
              >
                {activeTab === "अन्नमयकोश" && (
                  <AnnamayaKosha
                    studentData={studentData}
                    rformat={format.annamayaKosha}
                    isEditing={isEditing}
                    onUpdate={(data) =>
                      handleKoshaUpdate("annamayaKosha", data)
                    }
                  />
                )}

                {activeTab === "प्राणमयकोश" && (
                  <PranamayaKosha
                    studentData={studentData}
                    rformat={format.pranamayaKosha}
                    isEditing={isEditing}
                    onUpdate={(data) =>
                      handleKoshaUpdate("pranamayaKosha", data)
                    }
                  />
                )}

                {activeTab === "मनोमयकोश" && (
                  <ManomayaKosha
                    studentData={studentData}
                    rformat={format.manomayaKosha}
                    isEditing={isEditing}
                    onUpdate={(data) =>
                      handleKoshaUpdate("manomayaKosha", data)
                    }
                  />
                )}

                {activeTab === "विज्ञानमयकोश" && (
                  <VidnyanmayaKosha
                    studentData={studentData}
                    rformat={format.vidnyanmayaKosha}
                    isEditing={isEditing}
                    onUpdate={(data) =>
                      handleKoshaUpdate("vidnyanmayaKosha", data)
                    }
                  />
                )}

                {activeTab === "आनंदमयकोश" && (
                  <AnandmayaKosha
                    studentData={studentData}
                    rformat={format.anandmayaKosha}
                    isEditing={isEditing}
                    onUpdate={(data) =>
                      handleKoshaUpdate("anandmayaKosha", data)
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-full p-8 flex items-center justify-center"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CheckCircle size={60} className="text-green-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentResult;
