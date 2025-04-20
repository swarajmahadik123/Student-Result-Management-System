import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X, ClipboardList, Stethoscope } from "lucide-react";
import { toast } from "sonner";

const StudentResult = ({ student, format, onBack, onSave }) => {
  const [resultData, setResultData] = useState({
    subjects: format.subjects.map((subject) => ({
      subject: subject._id,
      grade: "",
      remarks: "",
    })),
    healthSummary: format.healthSummary.map((item) => ({
      name: item.name,
      value: item.type === "select" ? item.options[0] : "",
      remarks: "",
    })),
    systemicExamination: format.systemicExamination.map((item) => ({
      name: item.name,
      value: item.options[0],
      remarks: "",
    })),
    overallRemarks: "",
  });

  const handleGradeChange = (subjectIndex, value) => {
    const updatedSubjects = [...resultData.subjects];
    updatedSubjects[subjectIndex].grade = value;
    setResultData({ ...resultData, subjects: updatedSubjects });
  };

  const handleHealthChange = (index, value) => {
    const updatedHealth = [...resultData.healthSummary];
    updatedHealth[index].value = value;
    setResultData({ ...resultData, healthSummary: updatedHealth });
  };

  const handleSystemicChange = (index, value) => {
    const updatedSystemic = [...resultData.systemicExamination];
    updatedSystemic[index].value = value;
    setResultData({ ...resultData, systemicExamination: updatedSystemic });
  };

  const handleSubmit = () => {
    onSave(resultData);
    toast.success("Result saved successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden border border-purple-100/30 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Student Assessment: {student.name}
            </motion.h2>
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-violet-600"
              whileHover={{ x: -2 }}
            >
              <ArrowLeft size={20} /> Back
            </motion.button>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-purple-50 rounded-xl">
            <div>
              <p className="text-sm text-gray-500">Standard</p>
              <p className="font-medium">{student.standard}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Academic Year</p>
              <p className="font-medium">{student.academicYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Roll Number</p>
              <p className="font-medium">{student.rollNumber}</p>
            </div>
          </div>

          {/* Subjects Assessment */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <ClipboardList className="text-violet-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                Subjects Assessment
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resultData.subjects.map((subject, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-gray-700 mb-2 font-medium">
                    {format.subjects[index].name}
                  </label>
                  <select
                    value={subject.grade}
                    onChange={(e) => handleGradeChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Select Grade</option>
                    {format.grades.map((grade, i) => (
                      <option key={i} value={grade.grade}>
                        {grade.grade}
                      </option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Remarks"
                    value={subject.remarks}
                    onChange={(e) => {
                      const updated = [...resultData.subjects];
                      updated[index].remarks = e.target.value;
                      setResultData({ ...resultData, subjects: updated });
                    }}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                    rows="2"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Health Summary */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Stethoscope className="text-violet-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                Health Summary
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resultData.healthSummary.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-gray-700 mb-2 font-medium">
                    {item.name}
                  </label>
                  {format.healthSummary[index].type === "select" ? (
                    <select
                      value={item.value}
                      onChange={(e) =>
                        handleHealthChange(index, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                    >
                      {format.healthSummary[index].options.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) =>
                        handleHealthChange(index, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                    />
                  )}
                  <textarea
                    placeholder="Remarks"
                    value={item.remarks}
                    onChange={(e) => {
                      const updated = [...resultData.healthSummary];
                      updated[index].remarks = e.target.value;
                      setResultData({ ...resultData, healthSummary: updated });
                    }}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                    rows="2"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Systemic Examination */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Stethoscope className="text-violet-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                Systemic Examination
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resultData.systemicExamination.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-gray-700 mb-2 font-medium">
                    {item.name}
                  </label>
                  <select
                    value={item.value}
                    onChange={(e) =>
                      handleSystemicChange(index, e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                  >
                    {format.systemicExamination[index].options.map(
                      (option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      )
                    )}
                  </select>
                  <textarea
                    placeholder="Remarks"
                    value={item.remarks}
                    onChange={(e) => {
                      const updated = [...resultData.systemicExamination];
                      updated[index].remarks = e.target.value;
                      setResultData({
                        ...resultData,
                        systemicExamination: updated,
                      });
                    }}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                    rows="2"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Overall Remarks */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Overall Remarks
            </h3>
            <textarea
              value={resultData.overallRemarks}
              onChange={(e) =>
                setResultData({ ...resultData, overallRemarks: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
              rows="4"
              placeholder="Enter overall remarks about the student's performance..."
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <motion.button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Save Assessment
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentResult;
