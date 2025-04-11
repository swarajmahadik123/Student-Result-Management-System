// ManomayaKoshaAssessment.jsx
import React, { useState } from "react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const ManomayaKoshaAssessment = ({
  isEditing,
  studentData,
  rformat,
  onUpdate,
}) => {
  const [localData, setLocalData] = useState(() => ({
    dailyObservations:
      studentData.result?.manomayaKosha?.dailyObservations || [],
    annualActivities: studentData.result?.manomayaKosha?.annualActivities || [],
  }));

  return (
    <div className="space-y-6 p-4 mx-auto">
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
        activities={localData.annualActivities}
        academicYear={studentData.academicYear}
        rformat={rformat}
        onActivityChange={(updated) => {
          setLocalData((prev) => ({ ...prev, annualActivities: updated }));
          onUpdate({ ...localData, annualActivities: updated });
        }}
      />
    </div>
  );
};

export default ManomayaKoshaAssessment;
