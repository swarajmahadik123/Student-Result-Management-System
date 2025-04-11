import React from "react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const AnandmayaKosha = ({
  isEditing,
  AnandData,
  onDataChange,
  academicYear,
}) => {
  const [data, setData] = React.useState(
    AnandData || {
      dailyObservations: [],
      annualActivities: [],
    }
  );

  // Helper function to update data and notify parent
  const updateData = (newData) => {
    setData(newData);
    if (onDataChange) {
      onDataChange(newData);
    }
  };

  const handleDailyObservationsChange = (updatedObservations) => {
    const newData = {
      ...data,
      dailyObservations: updatedObservations,
    };
    updateData(newData);
  };

  const handleAnnualActivitiesChange = (updatedActivities) => {
    const newData = {
      ...data,
      annualActivities: updatedActivities,
    };
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <DailyObservations
        isEditing={isEditing}
        observations={data.dailyObservations || []}
        onChange={handleDailyObservationsChange}
      />

      <AnnualActivities
        isEditing={isEditing}
        activities={data.annualActivities || []}
        onChange={handleAnnualActivitiesChange}
        year={academicYear}
      />
    </div>
  );
};

export default AnandmayaKosha;
