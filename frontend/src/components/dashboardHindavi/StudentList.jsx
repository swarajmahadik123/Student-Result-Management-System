import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";

const StudentList = ({ onSelectStudent, onAddStudent }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy student data for demonstration
  const dummyStudents = [
    {
      _id: "1",
      name: "Student 1",
      standard: "1",
    },
    {
      _id: "2",
      name: "Student 2",
      standard: "2",
    },
    {
      _id: "3",
      name: "Student 3",
      standard: "3",
    },
    {
      _id: "4",
      name: "Student 4",
      standard: "4",
    },
    {
      _id: "5",
      name: "Student 5",
      standard: "5",
    },
    {
      _id: "6",
      name: "Student 6",
      standard: "6",
    },
    {
      _id: "7",
      name: "Student 7",
      standard: "7",
    },
    {
      _id: "8",
      name: "Student 8",
      standard: "8",
    },
    {
      _id: "9",
      name: "Student 9",
      standard: "9",
    },
    {
      _id: "10",
      name: "Student 10",
      standard: "10",
    },
  ];

  const filteredStudents = dummyStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search student..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-2 right-3 text-gray-500" size={20} />
        </div>
        <motion.button
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={onAddStudent}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="mr-2" size={20} />
          Add Student
        </motion.button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Standard</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 border-b">{student.name}</td>
                <td className="px-4 py-2 border-b">{student.standard}</td>
                <td className="px-4 py-2 border-b">
                  <motion.button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => onSelectStudent(student)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
