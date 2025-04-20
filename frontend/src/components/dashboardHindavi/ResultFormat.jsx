import React, { useState, useEffect } from "react";
import {
  createHindaviResultFormat,
  fetchHindaviResultFormatById,
  updateHindaviResultFormat,
} from "../../services/api";

const ResultFormat = ({ formatId, onBack }) => {
  const [formatData, setFormatData] = useState({
    standard: "",
    academicYear: "",
    createdBy: "",
    subjects: [],
    grades: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formatId) {
      fetchExistingFormat(formatId);
    }
  }, [formatId]);

  const fetchExistingFormat = async (id) => {
    try {
      setLoading(true);
      const format = await fetchHindaviResultFormatById(id);
      setFormatData(format);
    } catch (error) {
      console.error("Error fetching result format:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubject = () => {
    setFormatData((prevData) => ({
      ...prevData,
      subjects: [...prevData.subjects, { name: "" }],
    }));
  };

  const handleRemoveSubject = (index) => {
    setFormatData((prevData) => ({
      ...prevData,
      subjects: prevData.subjects.filter((_, i) => i !== index),
    }));
  };

  const handleAddGrade = () => {
    setFormatData((prevData) => ({
      ...prevData,
      grades: [...prevData.grades, { grade: "", options: [] }],
    }));
  };

  const handleRemoveGrade = (index) => {
    setFormatData((prevData) => ({
      ...prevData,
      grades: prevData.grades.filter((_, i) => i !== index),
    }));
  };

  const handleAddOptionToGrade = (gradeIndex) => {
    setFormatData((prevData) => ({
      ...prevData,
      grades: prevData.grades.map((grade, i) =>
        i === gradeIndex ? { ...grade, options: [...grade.options, ""] } : grade
      ),
    }));
  };

  const handleRemoveOptionFromGrade = (gradeIndex, optionIndex) => {
    setFormatData((prevData) => ({
      ...prevData,
      grades: prevData.grades.map((grade, i) =>
        i === gradeIndex
          ? {
              ...grade,
              options: grade.options.filter((_, j) => j !== optionIndex),
            }
          : grade
      ),
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (formatId) {
        await updateHindaviResultFormat(formatId, formatData);
        alert("Result Format updated successfully!");
      } else {
        await createHindaviResultFormat(formatData);
        alert("Result Format created successfully!");
      }
      onBack();
    } catch (error) {
      console.error("Error saving result format:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {formatId ? "Edit Result Format" : "Create Result Format"}
        </h2>
        <button
          onClick={onBack}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Standard:</label>
            <input
              type="text"
              value={formatData.standard}
              onChange={(e) =>
                setFormatData((prev) => ({ ...prev, standard: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Academic Year:</label>
            <input
              type="text"
              value={formatData.academicYear}
              onChange={(e) =>
                setFormatData((prev) => ({
                  ...prev,
                  academicYear: e.target.value,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Created By:</label>
            <input
              type="text"
              value={formatData.createdBy}
              onChange={(e) =>
                setFormatData((prev) => ({
                  ...prev,
                  createdBy: e.target.value,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Subjects Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            Subjects
          </h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">
                  Subject Name
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {formatData.subjects.map((subject, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) =>
                        setFormatData((prev) => ({
                          ...prev,
                          subjects: prev.subjects.map((s, i) =>
                            i === index ? { ...s, name: e.target.value } : s
                          ),
                        }))
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleRemoveSubject(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="p-2 text-center">
                  <button
                    onClick={handleAddSubject}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    + Add Subject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grades Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            Grades
          </h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Grade</th>
                <th className="border border-gray-300 p-2 text-left">
                  Options
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {formatData.grades.map((grade, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={grade.grade}
                      onChange={(e) =>
                        setFormatData((prev) => ({
                          ...prev,
                          grades: prev.grades.map((g, i) =>
                            i === index ? { ...g, grade: e.target.value } : g
                          ),
                        }))
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="space-y-2">
                      {grade.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              setFormatData((prev) => ({
                                ...prev,
                                grades: prev.grades.map((g, i) =>
                                  i === index
                                    ? {
                                        ...g,
                                        options: g.options.map((o, j) =>
                                          j === optionIndex ? e.target.value : o
                                        ),
                                      }
                                    : g
                                ),
                              }))
                            }
                            className="flex-grow p-1 border border-gray-300 rounded mr-2"
                          />
                          <button
                            onClick={() =>
                              handleRemoveOptionFromGrade(index, optionIndex)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddOptionToGrade(index)}
                        className="flex items-center text-blue-600 hover:text-blue-800 mt-1"
                      >
                        + Add Option
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleRemoveGrade(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="p-2 text-center">
                  <button
                    onClick={handleAddGrade}
                    className="text-green-600 hover:text-green-800"
                  >
                    + Add Grade
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded"
          >
            {loading ? "Saving..." : "Save Format"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultFormat;
