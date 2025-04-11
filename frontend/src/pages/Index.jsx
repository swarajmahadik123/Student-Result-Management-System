import React, { useState, useEffect } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import AnalyticsTab from "../components/dashboard/AnalyticsTab";
import StudentListTab from "../components/dashboard/StudentListTab";
import ResultFormatTab from "../components/dashboard/ResultFormatTab";
import ListOfResultFormat from "../components/dashboard/ListOfResultFormat";
import StudentList from "../components/dashboard/StudentList";
import StudentResult from "../components/dashboard/StudentResult";
import KoshaTabs from "../components/KoshaAssessment/KoshaTabs";
import { fetchResultFormatById, fetchResultFormatByStandard, getStudentById } from "../services/api";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("analysis");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [resultFormat, setResultFormat] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStudentSelect = async (student) => {
    try {
      setLoading(true);
      const fullStudentData = await getStudentById(student._id);
      const format = await fetchResultFormatByStandard(
        fullStudentData.standard,
        fullStudentData.academicYear
      );
      setSelectedStudent(fullStudentData);
      setResultFormat(format);
    } catch (error) {
      console.error("Error fetching student details or format:", error);
      toast.error("विद्यार्थी माहिती आणण्यात त्रुटी आली");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setResultFormat(null);
  };

  const handleFormatSelect = async (format) => {
    try {
      setLoading(true);
      const completeFormat = await fetchResultFormatById(format._id);
      setResultFormat(completeFormat);
    } catch (error) {
      console.error("Error fetching format details:", error);
      toast.error("परिणाम स्वरूप आणण्यात त्रुटी आली");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToFormatList = () => {
    setResultFormat(null);
  };

  const handleFormatUpdated = async () => {
    if (resultFormat && resultFormat._id) {
      try {
        setLoading(true);
        const updatedFormat = await fetchResultFormatById(resultFormat._id);
        setResultFormat(updatedFormat);
        toast.success("परिणाम स्वरूप यशस्वीरित्या अपडेट केले");
      } catch (error) {
        console.error("Error refreshing format data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "analysis":
        return <AnalyticsTab />;
      case "students":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : !selectedStudent ? (
              <StudentList onSelectStudent={handleStudentSelect} />
            ) : (
              <StudentResult
                student={selectedStudent}
                format={resultFormat}
                onBack={handleBackToList}
              />
            )}
          </>
        );
      case "format":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : !resultFormat ? (
              <ListOfResultFormat onSelectFormat={handleFormatSelect} />
            ) : (
              <KoshaTabs
                format={resultFormat}
                onBack={handleBackToFormatList}
                onUpdate={handleFormatUpdated}
              />
            )}
          </>
        );
      default:
        return <AnalyticsTab />;
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (selectedStudent || resultFormat) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectedStudent, resultFormat]);

  return (
    <SidebarLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="animate-fade-in">{renderContent()}</div>
    </SidebarLayout>
  );
};

export default Index;
