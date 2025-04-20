import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import {
  fetchHindaviResultFormatById,
  fetchAllResultFormats,
  createHindaviResultFormat,
  updateHindaviResultFormat,
  deleteHindaviResultFormat,
} from "../../services/api";
import { toast } from "sonner";

const ResultFormatList = ({ onSelectFormat }) => {
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFormatData, setNewFormatData] = useState({
    standard: "",
    academicYear: "",
    createdBy: "",
    subjects: [],
    grades: [],
  });

  useEffect(() => {
    const fetchFormats = async () => {
      try {
        setLoading(true);
        const result = await fetchAllResultFormats();
        setFormats(result);
      } catch (error) {
        console.error("Error fetching result formats:", error);
        toast.error("Error fetching result formats");
      } finally {
        setLoading(false);
      }
    };
    fetchFormats();
  }, []);

  const handleCreateFormat = async (e) => {
    e.preventDefault();
    try {
      const createdFormat = await createHindaviResultFormat(newFormatData);
      setFormats([...formats, createdFormat]);
      setShowCreateModal(false);
      setNewFormatData({
        standard: "",
        academicYear: "",
        createdBy: "",
        subjects: [],
        grades: [],
      });
      toast.success("Format created successfully");
    } catch (error) {
      console.error("Error creating result format:", error);
      toast.error("Error creating result format");
    }
  };

  const handleDeleteFormat = async (id) => {
    if (window.confirm("Are you sure you want to delete this format?")) {
      try {
        await deleteHindaviResultFormat(id);
        setFormats(formats.filter((format) => format._id !== id));
        toast.success("Format deleted successfully");
      } catch (error) {
        console.error("Error deleting format:", error);
        toast.error("Error deleting format");
      }
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

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-6 px-4 sm:px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-8xl mx-auto">
        <motion.div
          className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden border border-purple-100/30 p-6"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <motion.h1
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Result Formats List
            </motion.h1>
            <motion.button
              onClick={() => setShowCreateModal(true)}
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
              <span>Create New Format</span>
            </motion.button>
          </div>

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
              <p className="mt-4 text-gray-600">Loading result formats...</p>
            </motion.div>
          ) : formats.length === 0 ? (
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
                <FileText size={64} className="mx-auto text-gray-300 mb-4" />
              </motion.div>
              <p className="text-gray-600 text-lg">No result formats found</p>
              <p className="text-gray-500 mt-2">
                Please create a new result format
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="overflow-x-auto"
              variants={containerVariants}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Standard
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Academic Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formats.map((format) => (
                    <motion.tr
                      key={format._id}
                      variants={itemVariants}
                      className="hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format.standard}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format.academicYear}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format.createdBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectFormat(format);
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
                              handleDeleteFormat(format._id);
                            }}
                            className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 p-2 rounded-full transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Create New Result Format
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateFormat}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Standard
                      </label>
                      <input
                        type="text"
                        value={newFormatData.standard}
                        onChange={(e) =>
                          setNewFormatData({
                            ...newFormatData,
                            standard: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Academic Year
                      </label>
                      <input
                        type="text"
                        value={newFormatData.academicYear}
                        onChange={(e) =>
                          setNewFormatData({
                            ...newFormatData,
                            academicYear: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">
                        Created By
                      </label>
                      <input
                        type="text"
                        value={newFormatData.createdBy}
                        onChange={(e) =>
                          setNewFormatData({
                            ...newFormatData,
                            createdBy: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
                    >
                      Create Format
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResultFormatList;
