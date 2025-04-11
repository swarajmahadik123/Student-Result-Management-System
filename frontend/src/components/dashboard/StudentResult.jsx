import React, { useState, useEffect } from "react";
import { Save, Edit, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { updateStudentResult } from "../../services/api"; // You'll need to implement this API call
import AnnamayaKosha from "../KoshResult/AnnamayaKosha";
import PranamayaKosha from "../KoshResult/PranamayaKosha";
import ManomayaKosha from "../KoshResult/ManomayaKosha";
import VidnyanmayaKosha from "../KoshResult/VidnyanmayaKosha";
import AnandmayaKosha from "../KoshResult/AnandmayaKosha";

const StudentResult = ({ student, format, onBack }) => {
  const [activeTab, setActiveTab] = useState("अन्नमयकोश");
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState(student);
  const [isSaving, setIsSaving] = useState(false);

  // Handle updates from kosha components
  const handleKoshaUpdate = (koshaType, data) => {
    setStudentData((prev) => ({
      ...prev,
      result: {
        ...prev.result,
        [koshaType]: data,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Call API to save the student result
      await updateStudentResult(studentData._id, studentData.result);
      toast.success(`${activeTab} स्वरूप जतन केले`);
      setIsEditing(false);
    } catch (error) {
      toast.error("परिणाम जतन करताना त्रुटी आली");
      console.error("Error saving result:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const koshaTypeMap = {
    अन्नमयकोश: "annamayaKosha",
    प्राणमयकोश: "pranamayaKosha",
    मनोमयकोश: "manomayaKosha",
    विज्ञानमयकोश: "vidnyanmayaKosha",
    आनंदमयकोश: "anandmayaKosha",
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
      >
        <ChevronLeft className="mr-2" size={18} />
        मागे जा
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Student Info Header */}
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">{student.name} चा परिणाम</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
            <div>
              <p className="text-gray-600">वर्ग</p>
              <p className="font-medium">{student.standard}</p>
            </div>
            <div>
              <p className="text-gray-600">रोल नंबर</p>
              <p className="font-medium">{student.rollNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">प्रवेश क्रमांक</p>
              <p className="font-medium">{student.admissionNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">जन्मतारीख</p>
              <p className="font-medium">{student.dob}</p>
            </div>
          </div>
        </div>

        {/* Kosha Tabs Navigation */}
        <div className="flex border-b overflow-x-auto">
          {[
            "अन्नमयकोश",
            "प्राणमयकोश",
            "मनोमयकोश",
            "विज्ञानमयकोश",
            "आनंदमयकोश",
          ].map((kosha) => (
            <button
              key={kosha}
              className={`px-4 py-3 font-medium ${
                activeTab === kosha
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(kosha)}
            >
              {kosha}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{activeTab} मूल्यांकन</h2>

            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={isSaving}
              className={`flex items-center px-4 py-2 rounded text-white ${
                isEditing ? "bg-green-600" : "bg-blue-600"
              } ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isEditing ? (
                <>
                  <Save className="mr-2" size={18} />
                  {isSaving ? "जतन करत आहे..." : "जतन करा"}
                </>
              ) : (
                <>
                  <Edit className="mr-2" size={18} /> संपादित करा
                </>
              )}
            </button>
          </div>

          {activeTab === "अन्नमयकोश" && (
            <AnnamayaKosha
              studentData={studentData}
              rformat={format.annamayaKosha}
              isEditing={isEditing}
              onUpdate={(data) => handleKoshaUpdate("annamayaKosha", data)}
            />
          )}

          {activeTab === "प्राणमयकोश" && (
            <PranamayaKosha
              studentData={studentData}
              rformat={format.pranamayaKosha}
              isEditing={isEditing}
              onUpdate={(data) => handleKoshaUpdate("pranamayaKosha", data)}
            />
          )}

          {activeTab === "मनोमयकोश" && (
            <ManomayaKosha
              studentData={studentData}
              rformat={format.manomayaKosha}
              isEditing={isEditing}
              onUpdate={(data) => handleKoshaUpdate("manomayaKosha", data)}
            />
          )}

          {activeTab === "विज्ञानमयकोश" && (
            <VidnyanmayaKosha
              studentData={studentData}
              rformat={format.vidnyanmayaKosha}
              isEditing={isEditing}
              onUpdate={(data) => handleKoshaUpdate("vidnyanmayaKosha", data)}
            />
          )}

          {activeTab === "आनंदमयकोश" && (
            <AnandmayaKosha
              studentData={studentData}
              rformat={format.anandmayaKosha}
              isEditing={isEditing}
              onUpdate={(data) => handleKoshaUpdate("anandmayaKosha", data)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentResult;
