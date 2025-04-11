import React from "react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const ManomayaKosha = ({
  isEditing = false,
  ManoData,
  onDataChange,
  academicYear,
}) => {
  const [data, setData] = React.useState(
    ManoData || {
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
    <div className="space-y-6 p-4 mx-auto">
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

export default ManomayaKosha;
