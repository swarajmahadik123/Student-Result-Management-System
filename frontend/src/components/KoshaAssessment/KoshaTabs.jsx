"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Edit, ChevronLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import AnnamayaKosha from "./AnnamayaKosha";
import PranamayaKosha from "./PranamayaKosha";
import ManomayaKosha from "./ManomayaKosha";
import VidnyanmayaKosha from "./VidnyanmayaKosha";
import AnandmayaKosha from "./AnandmayaKosha";
import { updateResultFormat } from "../../services/api";

const KoshaTabs = ({ format, onBack }) => {
  const [activeTab, setActiveTab] = useState("अन्नमयकोश");
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(format);
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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateResultFormat(format._id, data);
      setShowSuccessAnimation(true);
      setTimeout(() => {
        setShowSuccessAnimation(false);
        toast.success(`${activeTab} स्वरूप जतन केले`);
        setIsEditing(false);
      }, 1500);
    } catch (error) {
      toast.error("स्वरूप जतन करताना त्रुटी आली");
      console.error("Error saving format:", error);
    } finally {
      setTimeout(() => {
        setIsSaving(false);
      }, 1500);
    }
  };

  const handleDataChange = (koshaType, newData) => {
    setData((prev) => ({
      ...prev,
      [koshaType]: newData,
    }));
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
          {/* Format Info Header */}
          <motion.div className="p-6 border-b border-purple-100/30 bg-gradient-to-r from-slate-50 to-purple-50">
            <motion.h2
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 marathi-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              इयत्ता {format.standard} - {format.academicYear} स्वरूप
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4"
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
                <p className="text-gray-500 text-sm marathi-text">निर्माता</p>
                <p className="font-medium text-lg marathi-text">
                  {format.createdBy}
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
                <p className="text-gray-500 text-sm marathi-text">अद्यतनित</p>
                <p className="font-medium text-lg marathi-text">
                  {new Date(format.updatedAt).toLocaleDateString("en-IN")}
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
                <p className="text-gray-500 text-sm marathi-text">स्थिती</p>
                <p className="font-medium text-lg marathi-text">
                  {format.isActive ? "सक्रिय" : "निष्क्रिय"}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Kosha Tabs Navigation */}
          <div className="flex flex-wrap border-b border-purple-100/30 overflow-x-auto bg-white/90">
            {[
              "अन्नमयकोश",
              "प्राणमयकोश",
              "मनोमयकोश",
              "विज्ञानमयकोश",
              "आनंदमयकोश",
            ].map((kosha, index) => (
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
                {activeTab} मूल्यांकन स्वरूप
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
                    isEditing={isEditing}
                    annaData={data?.annamayaKosha || {}}
                    academicYear={format.academicYear}
                    onDataChange={(newData) =>
                      handleDataChange("annamayaKosha", newData)
                    }
                  />
                )}
                {activeTab === "प्राणमयकोश" && (
                  <PranamayaKosha
                    isEditing={isEditing}
                    PranData={data?.pranamayaKosha || {}}
                    academicYear={format.academicYear}
                    onDataChange={(newData) =>
                      handleDataChange("pranamayaKosha", newData)
                    }
                  />
                )}
                {activeTab === "मनोमयकोश" && (
                  <ManomayaKosha
                    isEditing={isEditing}
                    ManoData={data?.manomayaKosha || {}}
                    academicYear={format.academicYear}
                    onDataChange={(newData) =>
                      handleDataChange("manomayaKosha", newData)
                    }
                  />
                )}
                {activeTab === "विज्ञानमयकोश" && (
                  <VidnyanmayaKosha
                    isEditing={isEditing}
                    VidData={data?.vidnyanmayaKosha || {}}
                    academicYear={format.academicYear}
                    onDataChange={(newData) =>
                      handleDataChange("vidnyanmayaKosha", newData)
                    }
                  />
                )}
                {activeTab === "आनंदमयकोश" && (
                  <AnandmayaKosha
                    isEditing={isEditing}
                    AnandData={data?.anandmayaKosha || {}}
                    academicYear={format.academicYear}
                    onDataChange={(newData) =>
                      handleDataChange("anandmayaKosha", newData)
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

export default KoshaTabs;
