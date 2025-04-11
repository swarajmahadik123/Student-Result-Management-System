// AnnualActivities.jsx
import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

const AnnualActivities = ({
  activities,
  academicYear,
  onActivityChange,
  isEditing,
  rformat, // Added to access default values from format
}) => {
  // Initialize activities with default values from format
  const [localActivities, setLocalActivities] = useState(activities);
  useEffect(() => {
    // This ensures we have the latest activities from props
    setLocalActivities(activities);
  }, [activities]);

  const handleActivityValueChange = (activityId, value) => {
    if (!isEditing) return;

    const updatedActivities = localActivities.map((activity) =>
      activity.id === activityId ? { ...activity, value } : activity
    );

    setLocalActivities(updatedActivities);
    if (onActivityChange) {
      onActivityChange(updatedActivities);
    }
  };

  // Function to set default value from format
  const setDefaultValue = (activityId) => {
    if (!isEditing || !rformat) return;

    // Find the default value from the format
    const formatActivity = rformat.annualActivities.find(
      (item) => item.id === activityId
    );

    if (formatActivity && formatActivity.value) {
      const updatedActivities = localActivities.map((activity) =>
        activity.id === activityId
          ? { ...activity, value: formatActivity.value }
          : activity
      );

      setLocalActivities(updatedActivities);
      if (onActivityChange) {
        onActivityChange(updatedActivities);
      }
    }
  };

  return (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        वार्षिक उपक्रम {academicYear || "२०२४-२५"}
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-center">उपक्रम</th>
            <th className="border border-gray-300 p-2 text-center">विवरण</th>
            {isEditing && (
              <th className="border border-gray-300 p-2 text-center w-24">
                क्रिया
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {localActivities.map((activity) => (
            <tr key={activity.id}>
              <td className="border border-gray-300 p-2 font-semibold">
                {activity.name}
              </td>
              <td className="border border-gray-300 p-2">
                <textarea
                  value={activity.value || ""}
                  onChange={(e) =>
                    handleActivityValueChange(activity.id, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={3}
                  disabled={!isEditing}
                  placeholder="विवरण लिहा..."
                />
              </td>
              {isEditing && (
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    type="button"
                    onClick={() => setDefaultValue(activity.id)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                    title="डीफॉल्ट मूल्य वापरा"
                  >
                    <RefreshCw size={16} className="text-blue-600" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnualActivities;
