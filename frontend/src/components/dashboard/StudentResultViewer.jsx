import React from "react";
import StudentList from "./StudentList";
import ResultTab from "./ResultTab";

const StudentResultViewer = () => {
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [selectedKosha, setSelectedKosha] = React.useState("AnnamayaKosha");

  const students = [
    { id: 1, name: "राजेश पाटील" },
    { id: 2, name: "सुमन देशमुख" },
    { id: 3, name: "अमित जाधव" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          विद्यार्थी निकाल प्रणाली
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <StudentList
            students={students}
            selectedStudent={selectedStudent}
            onSelectStudent={setSelectedStudent}
          />
          <ResultTab
            selectedStudent={selectedStudent}
            selectedKosha={selectedKosha}
            onKoshaChange={setSelectedKosha}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentResultViewer;
