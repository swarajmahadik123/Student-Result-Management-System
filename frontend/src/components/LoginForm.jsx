import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const [loginType, setLoginType] = useState("hindavi");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "hindavi",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await authAPI.login({
        ...credentials,
        role: loginType,
      });

      if (!data?.token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", data?.token);
      toast.success("यशस्वीरित्या लॉगिन केले");
      navigate(`/dashboard-${loginType}`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "लॉगिन अयशस्वी");
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
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-purple-100/30"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex justify-between items-center p-6 border-b border-purple-100/30 bg-gradient-to-r from-slate-50 to-purple-50">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 marathi-text">
              लॉगिन करा
            </h2>
          </div>

          <div className="p-6">
            <div className="flex mb-6 rounded-xl overflow-hidden shadow-sm">
              <motion.button
                className={`flex-1 py-3 text-sm font-medium ${
                  loginType === "hindavi"
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setLoginType("hindavi")}
                whileTap={{ scale: 0.98 }}
              >
                <span className="marathi-text">हिंदवी</span>
              </motion.button>
              <motion.button
                className={`flex-1 py-3 text-sm font-medium ${
                  loginType === "gurukul"
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setLoginType("gurukul")}
                whileTap={{ scale: 0.98 }}
              >
                <span className="marathi-text">गुरुकुल</span>
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                variants={formFieldVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <label
                  className="block text-gray-700 mb-2 marathi-text"
                  htmlFor="username"
                >
                  <User size={16} className="inline mr-2" />
                  वापरकर्तानाव
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="वापरकर्तानाव प्रविष्ट करा"
                  className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
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
                  htmlFor="password"
                >
                  <Lock size={16} className="inline mr-2" />
                  पासवर्ड
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="पासवर्ड प्रविष्ट करा"
                  className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-white/80"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full shadow-md flex items-center justify-center"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    <span className="marathi-text">प्रवेश करत आहे...</span>
                  </>
                ) : (
                  <span className="marathi-text">लॉगिन करा</span>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginForm;
