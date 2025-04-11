import React, { useState } from "react";

const AddStudentForm = ({ onClose, onAddStudent }) => {
  const [studentData, setStudentData] = useState({
    name: "",
    motherName: "",
    fatherName: "",
    address: "",
    phoneNo: "",
    rollNumber: "",
    admissionNumber: "",
    standard: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent(studentData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          नवीन विद्यार्थी जोडा
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Add form fields here */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              नाव
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={studentData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Add more fields similarly */}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              जोडा
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              रद्द करा
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
