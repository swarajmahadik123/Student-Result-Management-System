import React, { useState } from "react";
import HindaviDashboardSidebar from "../components/dashboardHindavi/HindaviDashboardSidebar";
import Analytics from "../components/dashboardHindavi/Analytics";
import StudentList from "../components/dashboardHindavi/StudentList";
import StudentResult from "../components/dashboardHindavi/StudentResult";
import ResultFormatList from "../components/dashboardHindavi/ResultFormatList";
import ResultFormat from "../components/dashboardHindavi/ResultFormat";
import AddEditStudentForm from "../components/dashboardHindavi/AddEditStudentForm";

const IndexHindavi = () => {
  const [activeTab, setActiveTab] = useState("analysis");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [initialStudentData, setInitialStudentData] = useState(null);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setInitialStudentData(student); // Set initial data when viewing a student
  };

  const handleBackToStudentList = () => {
    setSelectedStudent(null);
    setInitialStudentData(null);
  };

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
  };

  const handleBackToFormatList = () => {
    setSelectedFormat(null);
  };

  const handleAddStudent = () => {
    setInitialStudentData(null); // Clear initial data for add mode
    setIsFormOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setInitialStudentData(student); // Set initial data for edit mode
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setInitialStudentData(null);
  };

  const handleSaveStudent = (studentData) => {
    // Update the student list or perform any necessary actions
    console.log("Saved student data:", studentData);
    setSelectedStudent(studentData); // Optionally select the newly added student
    setIsFormOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "analysis":
        return <Analytics />;
      case "students":
        return selectedStudent ? (
          <StudentResult
            student={selectedStudent}
            format={selectedFormat} // Pass format to StudentResult
            onBack={handleBackToStudentList}
          />
        ) : (
          <StudentList
            onSelectStudent={handleStudentSelect}
            onAddStudent={handleAddStudent}
          />
        );
      case "format":
        return selectedFormat ? (
          <ResultFormat
            formatId={selectedFormat._id}
            onBack={handleBackToFormatList}
          />
        ) : (
          <ResultFormatList onSelectFormat={handleFormatSelect} />
        );
      default:
        return <Analytics />;
    }
  };

  return (
    <HindaviDashboardSidebar activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="animate-fade-in">
        {renderContent()}
        {isFormOpen && (
          <AddEditStudentForm
            onClose={handleCloseForm}
            onSaveStudent={handleSaveStudent}
            initialData={initialStudentData}
          />
        )}
      </div>
    </HindaviDashboardSidebar>
  );
};

export default IndexHindavi;
