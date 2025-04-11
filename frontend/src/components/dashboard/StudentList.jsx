import React, { useState, useEffect } from "react";
import { Search, Plus, X, Download, Edit, Trash } from "lucide-react";
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
      academicYear: "2024-25", // Default academic year
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">
            {initialData ? "विद्यार्थी संपादित करा" : "नवीन विद्यार्थी जोडा"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                विद्यार्थ्याचे नाव
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={studentData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="fatherName">
                वडिलांचे नाव
              </label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={studentData.fatherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="motherName">
                आईचे नाव
              </label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                value={studentData.motherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="gender">
                लिंग
              </label>
              <select
                id="gender"
                name="gender"
                value={studentData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">निवडा</option>
                <option value="मुलगा">मुलगा</option>
                <option value="मुलगी">मुलगी</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="dob">
                जन्मतारीख
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={studentData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 mb-2" htmlFor="address">
                पत्ता
              </label>
              <textarea
                id="address"
                name="address"
                value={studentData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="2"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="phoneNo">
                फोन नंबर
              </label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                value={studentData.phoneNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="standard">
                इयत्ता
              </label>
              <select
                id="standard"
                name="standard"
                value={studentData.standard}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">निवडा</option>
                <option value="5">इयत्ता ५ वी</option>
                <option value="6">इयत्ता ६ वी</option>
                <option value="7">इयत्ता ७ वी</option>
                <option value="8">इयत्ता ८ वी</option>
                <option value="9">इयत्ता ९ वी</option>
                <option value="10">इयत्ता १० वी</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="rollNumber">
                हजेरी क्रमांक
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={studentData.rollNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="admissionNumber"
              >
                प्रवेश क्रमांक
              </label>
              <input
                type="text"
                id="admissionNumber"
                name="admissionNumber"
                value={studentData.admissionNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700"
              disabled={loading}
            >
              रद्द करा
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "जतन करत आहे..." : "जतन करा"}
            </button>
          </div>
        </form>
      </div>
    </div>
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
  const standards = ["5", "6", "7", "8", "9", "10"];

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

  const handleDownloadResult = async (studentId, e) => {
    e.stopPropagation();
    setDownloadingId(studentId);

    try {
      await downloadStudentResult(studentId);
      toast.success("परिणाम डाउनलोड यशस्वी");
    } catch (error) {
      toast.error("परिणाम डाउनलोड करताना त्रुटी आली");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">विद्यार्थी यादी</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={20} className="mr-2" />
          नवीन विद्यार्थी जोडा
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">शोधा</label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 pl-10 border rounded"
              placeholder="नाव किंवा रोल नंबर"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-2">वर्ग निवडा</label>
          <select
            className="w-full p-2 border rounded"
            value={filterStandard}
            onChange={(e) => setFilterStandard(e.target.value)}
          >
            <option value="">निवडा</option>
            {standards.map((standard) => (
              <option key={standard} value={standard}>
                इयत्ता {standard}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">विद्यार्थी शोधत आहे...</p>
        </div>
      ) : !hasSearched ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            विद्यार्थी शोधण्यासाठी वरील फिल्टर वापरा
          </p>
          <p className="text-gray-500 mt-2">नाव, रोल नंबर किंवा इयत्ता निवडा</p>
        </div>
      ) : students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <div
              key={student._id}
              className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelectStudent(student)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-lg">{student.name}</p>
                  <p className="text-gray-600">इयत्ता {student.standard}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingStudent(student);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
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
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  हजेरी क्रमांक: {student.rollNumber}
                </p>
                <button
                  onClick={(e) => handleDownloadResult(student._id, e)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  disabled={downloadingId === student._id}
                >
                  {downloadingId === student._id ? (
                    <span className="text-sm">डाउनलोड करत आहे...</span>
                  ) : (
                    <>
                      <Download size={16} className="mr-1" />
                      <span className="text-sm">परिणाम डाउनलोड</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">कोणतेही विद्यार्थी सापडले नाहीत</p>
          <p className="text-gray-500 mt-2">
            कृपया शोध निकष बदला किंवा नवीन विद्यार्थी जोडा
          </p>
        </div>
      )}

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
    </div>
  );
};

export default StudentList;
