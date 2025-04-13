// components/dashboard/NewFormatModal.jsx
import React, { useState } from "react";
import { X, ChevronDown, User, Calendar, GraduationCap } from "lucide-react";
import { createResultFormat } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const NewFormatModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    standard: "",
    academicYear: "२०२४-२५",
    createdBy: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.standard || !formData.createdBy) {
      setError("कृपया सर्व आवश्यक माहिती भरा");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const newFormat = {
        ...formData,
        annamayaKosha: {
          physicalMeasurements: [],
          dailyObservations: [],
          annualActivities: [],
        },
        pranamayaKosha: {
          chhandavarga: {
            music: [],
            computer: [],
            art: [],
          },
          yogabhyas: {
            asanas: [],
            pranayam: [],
          },
          pathantar: {
            sanskrit: [],
            marathi: [],
          },
          dailyObservations: [],
          annualActivities: [],
        },
        manomayaKosha: {
          dailyObservations: [],
          annualActivities: [],
        },
        vidnyanmayaKosha: {
          marks: [],
          maunAbhyasActivities: {
            mukhyaVishay: [],
            anubhavLekhan: [],
            charitryaAbhyas: [],
            prakatVachan: [],
            rasGrahan: [],
          },
          dailyObservations: [],
          annualActivities: [],
        },
        anandmayaKosha: {
          dailyObservations: [],
          annualActivities: [],
        },
      };

      await createResultFormat(newFormat);
      toast.success("परिणाम स्वरूप यशस्वीरित्या तयार केले");
      onSuccess();
    } catch (error) {
      console.error("Error creating format:", error);
      setError("स्वरूप तयार करण्यात त्रुटी आली");
      toast.error("स्वरूप तयार करण्यात त्रुटी आली");
    } finally {
      setLoading(false);
    }
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
              नवीन परिणाम स्वरूप
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
            <form onSubmit={handleSubmit}>
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
                    value={formData.standard}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                    required
                  >
                    <option value="">इयत्ता निवडा</option>

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
                    value={formData.academicYear}
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
                  className="col-span-2"
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <label
                    className="block text-gray-700 mb-2 marathi-text"
                    htmlFor="createdBy"
                  >
                    <User size={16} className="inline mr-2" />
                    निर्माता
                  </label>
                  <input
                    type="text"
                    id="createdBy"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
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

              <div className="flex justify-end space-x-4 mt-8">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-violet-600 text-violet-600 rounded-full shadow-sm flex items-center bg-white"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                >
                  <span className="marathi-text">रद्द करा</span>
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
                      <span className="marathi-text">
                        प्रक्रिया सुरू आहे...
                      </span>
                    </>
                  ) : (
                    <span className="marathi-text">तयार करा</span>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewFormatModal;
