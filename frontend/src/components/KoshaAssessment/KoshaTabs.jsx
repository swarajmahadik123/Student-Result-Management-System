import React, { useState, useEffect } from "react";
import { Save, Edit, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import AnnamayaKosha from "./AnnamayaKosha";
import PranamayaKosha from "./PranamayaKosha";
import ManomayaKosha from "./ManomayaKosha";
import VidnyanmayaKosha from "./VidnyanmayaKosha";
import AnandmayaKosha from "./AnandmayaKosha";
import { updateResultFormat } from "../../services/api";

const KoshaTabs = ({ format, onBack }) => {
  const [activeTab, setActiveTab] = useState("अन्नमयकोश");
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(format);
  const [isSaving, setIsSaving] = useState(false);
  const [academicYear, setAcademicYear] = useState(format.academicYear);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateResultFormat(format._id, data);
      toast.success(`${activeTab} स्वरूप जतन केले`);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating format:", error);
      toast.error("स्वरूप अपडेट करण्यात त्रुटी आली");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDataChange = (koshaType, newData) => {
    setData((prev) => ({
      ...prev,
      [koshaType]: newData,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft size={18} className="mr-1" />
        परत यादीकडे
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <h1 className="text-xl font-bold">
            इयत्ता {format.standard} - {format.academicYear}
          </h1>
          <p className="text-sm text-gray-600">
            निर्माता: {format.createdBy} | अद्यतनित:{" "}
            {new Date(format.updatedAt).toLocaleDateString("en-IN")}
          </p>
        </div>

        <div className="flex border-b">
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

        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{activeTab} मूल्यांकन</h2>

            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className={`flex items-center px-4 py-2 rounded text-white ${
                isEditing ? "bg-green-600" : "bg-blue-600"
              } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isSaving}
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
              isEditing={isEditing}
              annaData={data?.annamayaKosha || {}}
              academicYear={academicYear}
              onDataChange={(newData) =>
                handleDataChange("annamayaKosha", newData)
              }
            />
          )}
          {activeTab === "प्राणमयकोश" && (
            <PranamayaKosha
              isEditing={isEditing}
              PranData={data?.pranamayaKosha || {}}
              academicYear={academicYear}
              onDataChange={(newData) =>
                handleDataChange("pranamayaKosha", newData)
              }
            />
          )}
          {activeTab === "मनोमयकोश" && (
            <ManomayaKosha
              isEditing={isEditing}
              ManoData={data?.manomayaKosha || {}}
              academicYear={academicYear}
              onDataChange={(newData) =>
                handleDataChange("manomayaKosha", newData)
              }
            />
          )}
          {activeTab === "विज्ञानमयकोश" && (
            <VidnyanmayaKosha
              isEditing={isEditing}
              VidData={data?.vidnyanmayaKosha || {}}
              academicYear={academicYear}
              onDataChange={(newData) =>
                handleDataChange("vidnyanmayaKosha", newData)
              }
            />
          )}
          {activeTab === "आनंदमयकोश" && (
            <AnandmayaKosha
              isEditing={isEditing}
              AnandData={data?.anandmayaKosha || {}}
              academicYear={academicYear}
              onDataChange={(newData) =>
                handleDataChange("anandmayaKosha", newData)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default KoshaTabs;
