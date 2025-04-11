import React, { useState } from "react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const AnandmayaKoshaAssessment = ({
  isEditing,
  studentData,
  rformat,
  onUpdate,
}) => {
  // Initialize local state with student data or defaults
  const [localData, setLocalData] = useState(() => ({
    dailyObservations:
      studentData.result?.anandmayaKosha?.dailyObservations || [],
    annualActivities:
      studentData.result?.anandmayaKosha?.annualActivities || [],
  }));

  // Unified update handler
  const handleUpdate = (updatedData) => {
    const newData = { ...localData, ...updatedData };
    setLocalData(newData);
    if (onUpdate) onUpdate(newData);
  };

  return (
    <div className="space-y-6 p-4 mx-auto">
      <DailyObservations
        isEditing={isEditing}
        observations={localData.dailyObservations}
        rformat={rformat} 
        onUpdate={(updatedObservations) =>
          handleUpdate({ dailyObservations: updatedObservations })
        }
      />

      <AnnualActivities
        isEditing={isEditing}
        activities={localData.annualActivities}
        academicYear={studentData.academicYear}
        rformat={rformat}
        onActivityChange={(updatedActivities) =>
          handleUpdate({ annualActivities: updatedActivities })
        }
      />
    </div>
  );
};

export default AnandmayaKoshaAssessment;
