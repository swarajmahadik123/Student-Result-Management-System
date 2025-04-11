import React from "react";
import { Plus } from "lucide-react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const AnnamayaKosha = ({
  isEditing = false,
  annaData,
  onDataChange,
  academicYear,
}) => {
  const [data, setData] = React.useState(
    annaData || {
      physicalMeasurements: [],
      dailyObservations: [],
      annualActivities: [],
    }
  );

  console.log("AnnamayaKosha data:", data);

  // Helper function to update data and notify parent
  const updateData = (newData) => {
    setData(newData);
    if (onDataChange) {
      onDataChange(newData);
    }
  };

  // Physical measurements handlers
  const handleAddMeasurement = () => {
    const newId = Date.now().toString();
    const newData = {
      ...data,
      physicalMeasurements: [
        ...data.physicalMeasurements,
        { id: newId, name: "नवीन निकष" },
      ],
    };
    updateData(newData);
  };

  const handleRemoveMeasurement = (index) => {
    const updatedMeasurements = data.physicalMeasurements.filter(
      (_, i) => i !== index
    );

    const newData = {
      ...data,
      physicalMeasurements: updatedMeasurements,
    };
    updateData(newData);
  };

  const handleUpdateMeasurement = (index, value) => {
    const updated = {
      ...data,
      physicalMeasurements: data.physicalMeasurements.map((measurement, i) =>
        i === index ? { ...measurement, name: value } : measurement
      ),
    };
    updateData(updated);
  };

  // Handlers for DailyObservations and AnnualActivities components
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

  const renderPhysicalMeasurements = () => (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        शारीरिक मापन
      </h2>

      {isEditing && (
        <button
          className="flex items-center mb-4 bg-blue-600 text-white border-none py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
          onClick={handleAddMeasurement}
        >
          <Plus size={16} className="mr-2" /> नवीन निकष
        </button>
      )}

      <div className="flex flex-wrap gap-4">
        {data.physicalMeasurements.map((measurement, index) => (
          <div
            key={measurement.id}
            className="border border-gray-300 rounded-lg overflow-hidden flex-1 min-w-[150px]"
          >
            <div className="p-3 text-center font-bold bg-gray-50 flex items-center justify-center">
              {isEditing ? (
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    value={measurement.name}
                    onChange={(e) =>
                      handleUpdateMeasurement(index, e.target.value)
                    }
                    className="w-full text-center p-1 border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => handleRemoveMeasurement(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ) : (
                measurement.name
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderPhysicalMeasurements()}
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

export default AnnamayaKosha;
