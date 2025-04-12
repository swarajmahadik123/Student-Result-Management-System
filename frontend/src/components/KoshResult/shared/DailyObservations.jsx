// DailyObservations.jsx
import React, { useState, useEffect } from "react";

const DailyObservations = ({ observations, rformat, onUpdate, isEditing }) => {
  // Use local state to track selections
  const [localObservations, setLocalObservations] = useState(observations);

  // Update local state when props change
  useEffect(() => {
    setLocalObservations(observations);
  }, [observations]);
  

  const handleObservationSelect = (observationId, selectedOption) => {
    if (!isEditing) return;

    // Update local state first
    const updatedObservations = localObservations.map((obs) =>
      obs.id === observationId ? { ...obs, selectedOption } : obs
    );
    console.log("Updated Observations:", updatedObservations);

    setLocalObservations(updatedObservations);

    // Then notify parent component
    if (onUpdate) {
      onUpdate(updatedObservations);
    }
  };

  // Get options from format for each observation
  const getOptionsForObservation = (observationId) => {
    if (!rformat || !rformat.dailyObservations) return [];

    const formatObservation = rformat.dailyObservations.find(
      (obs) => obs.id === observationId
    );

    return formatObservation?.options || [];
  };

  return (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        दैनंदिन निरीक्षण
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-center">श्रेणी</th>
            <th className="border border-gray-300 p-2 text-center">निरीक्षण</th>
          </tr>
        </thead>
        <tbody>
          {localObservations.map((obs) => (
            <tr key={obs.id}>
              <td className="border border-gray-300 p-2 text-center font-semibold">
                {obs.category}
              </td>
              <td className="border border-gray-300 p-2">
                <select
                  value={obs.selectedOption || ""}
                  onChange={(e) =>
                    handleObservationSelect(obs.id, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={!isEditing}
                >
                  <option value="">निवडा</option>
                  {getOptionsForObservation(obs.id).map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyObservations;
