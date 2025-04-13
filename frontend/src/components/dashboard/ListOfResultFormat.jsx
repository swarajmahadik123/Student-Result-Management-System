"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash, FileText, User } from "lucide-react";
import { toast } from "sonner";
import { fetchAllResultFormats, deleteResultFormat } from "../../services/api";
import NewFormatModal from "./NewFormatModal";

const ListOfResultFormat = ({ onSelectFormat }) => {
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchFormats();
  }, []);

  const fetchFormats = async () => {
    try {
      setLoading(true);
      const data = await fetchAllResultFormats();
      setFormats(data);
    } catch (error) {
      console.error("Error fetching result formats:", error);
      toast.error("परिणाम स्वरूप आणण्यात त्रुटी आली");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFormat = async (id) => {
    if (window.confirm("तुम्हाला खात्री आहे की हे स्वरूप हटवायचे आहे?")) {
      try {
        await deleteResultFormat(id);
        toast.success("स्वरूप यशस्वीरित्या हटवले");
        fetchFormats(); // Refresh the list
      } catch (error) {
        console.error("Error deleting format:", error);
        toast.error("स्वरूप हटवण्यात त्रुटी आली");
      }
    }
  };

  const handleCreateSuccess = () => {
    setShowModal(false);
    fetchFormats(); // Refresh the list after creating
    toast.success("नवीन स्वरूप यशस्वीरित्या तयार केले");
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
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden border border-purple-100/30 p-6"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <motion.h1
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 marathi-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              परिणाम स्वरूप यादी
            </motion.h1>
            <motion.button
              onClick={() => setShowModal(true)}
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
              <span className="marathi-text">नवीन स्वरूप</span>
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
              <p className="mt-4 text-gray-600 marathi-text">
                परिणाम स्वरूप शोधत आहे...
              </p>
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
              <p className="text-gray-600 marathi-text text-lg">
                कोणतेही परिणाम स्वरूप सापडले नाही
              </p>
              <p className="text-gray-500 mt-2 marathi-text">
                कृपया नवीन स्वरूप तयार करा
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="overflow-x-auto" // Enable horizontal scrolling
              variants={containerVariants}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider marathi-text">
                      इयत्ता
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider marathi-text">
                      शैक्षणिक वर्ष
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider marathi-text">
                      निर्माता
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider marathi-text">
                      अद्यतनित
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="sr-only">कृती</span>
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
                      <td className="px-6 py-4 whitespace-nowrap marathi-text">
                        {format.standard}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap marathi-text">
                        {format.academicYear}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap marathi-text">
                        {format.createdBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap marathi-text">
                        {new Date(format.updatedAt).toLocaleDateString("en-IN")}
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
                            <Trash size={16} />
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

      {showModal && (
        <NewFormatModal
          onClose={() => setShowModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </motion.div>
  );
};

export default ListOfResultFormat;
