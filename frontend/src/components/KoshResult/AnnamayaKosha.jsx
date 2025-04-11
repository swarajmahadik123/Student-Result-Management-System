import React, { useState } from "react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const AnnamayaKoshaAssessment = ({
  isEditing,
  studentData,
  rformat,
  onUpdate,
}) => {
  const [localData, setLocalData] = useState(() => ({
    prakruti: studentData.result?.annamayaKosha?.prakruti || "",
    physicalMeasurements:
      studentData.result?.annamayaKosha?.physicalMeasurements?.map((m) => ({
        ...m,
        session1:
          studentData.result?.annamayaKosha?.physicalMeasurements?.find(
            (pm) => pm.id === m.id
          )?.session1 || "",
        session2:
          studentData.result?.annamayaKosha?.physicalMeasurements?.find(
            (pm) => pm.id === m.id
          )?.session2 || "",
      })) || [],
    dailyObservations:
      studentData.result?.annamayaKosha?.dailyObservations || [],
    annualActivities: studentData.result?.annamayaKosha?.annualActivities || [],
  }));
  const handleMeasurementChange = (id, session, value) => {
    const updated = localData.physicalMeasurements.map((m) =>
      m.id === id ? { ...m, [session]: value } : m
    );
    setLocalData((prev) => ({ ...prev, physicalMeasurements: updated }));
    onUpdate({ ...localData, physicalMeasurements: updated });
  };
  // Add handler for prakruti changes
  const handlePrakrutiChange = (value) => {
    const updatedData = { ...localData, prakruti: value };
    setLocalData(updatedData);
    onUpdate(updatedData);
  };
  return (
    <div className="space-y-6">
      {/* Add Prakruti Input */}
      <div className="p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          प्रकृति
        </h2>
        <div className="max-w-md mx-auto">
          <input
            value={localData.prakruti}
            onChange={(e) => handlePrakrutiChange(e.target.value)}
            className="w-full p-2 border rounded text-center"
            placeholder="प्रकृति प्रकार लिहा"
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          शारीरिक मापन
        </h2>
        <div className="flex flex-wrap gap-4">
          {localData.physicalMeasurements.map((measurement) => (
            <div
              key={measurement.id}
              className="border border-gray-300 rounded-lg overflow-hidden flex-1 min-w-[150px]"
            >
              <div className="border-b border-gray-300 p-3 text-center font-bold bg-gray-50 h-[50px] flex items-center justify-center">
                {measurement.name}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-300">
                <div className="flex flex-col">
                  <div className="border-b border-gray-300 p-2 text-center font-semibold">
                    सत्र १
                  </div>
                  <div className="p-3 text-center">
                    <input
                      value={measurement.session1}
                      onChange={(e) =>
                        handleMeasurementChange(
                          measurement.id,
                          "session1",
                          e.target.value
                        )
                      }
                      className="w-full text-center p-1 border rounded"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="border-b border-gray-300 p-2 text-center font-semibold">
                    सत्र २
                  </div>
                  <div className="p-3 text-center">
                    <input
                      value={measurement.session2}
                      onChange={(e) =>
                        handleMeasurementChange(
                          measurement.id,
                          "session2",
                          e.target.value
                        )
                      }
                      className="w-full text-center p-1 border rounded"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {/* Similar for session2 */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <DailyObservations
        isEditing={isEditing}
        observations={localData.dailyObservations}
        rformat={rformat}
        onUpdate={(updated) => {
          setLocalData((prev) => ({ ...prev, dailyObservations: updated }));
          onUpdate({ ...localData, dailyObservations: updated });
        }}
      />

      <AnnualActivities
        isEditing={isEditing}
        rformat={rformat}
        activities={localData.annualActivities}
        academicYear={studentData.academicYear}
        onActivityChange={(updated) => {
          setLocalData((prev) => ({ ...prev, annualActivities: updated }));
          onUpdate({ ...localData, annualActivities: updated });
        }}
      />
    </div>
  );
};

export default AnnamayaKoshaAssessment;
