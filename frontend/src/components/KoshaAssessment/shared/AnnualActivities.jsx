import React from "react";
import { Plus } from "lucide-react";

const AnnualActivities = ({ isEditing, activities, onChange, year }) => {
  const handleNameChange = (index, value) => {
    const updated = activities.map((activity, i) =>
      i === index ? { ...activity, name: value } : activity
    );
    onChange(updated);
  };

  const handleValueChange = (index, value) => {
    const updated = activities.map((activity, i) =>
      i === index ? { ...activity, value: value } : activity
    );
    onChange(updated);
  };

  const handleDeleteActivity = (index) => {
    const updated = activities.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleAddActivity = () => {
    onChange([
      ...activities,
      {
        id: Date.now().toString(),
        name: "नवीन उपक्रम",
        value: "",
      },
    ]);
  };

  return (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        वार्षिक आनंद उपक्रम {year}
      </h2>

      {isEditing && (
        <button
          onClick={handleAddActivity}
          className="flex items-center mb-4 bg-blue-600 text-white border-none py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
        >
          <Plus size={16} className="mr-2" /> नवीन उपक्रम
        </button>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-center">उपक्रम</th>
            <th className="border border-gray-300 p-2 text-center">विवरण</th>
            {isEditing && (
              <th className="border border-gray-300 p-2 text-center">क्रिया</th>
            )}
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={activity.id}>
              <td className="border border-gray-300 p-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={activity.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                ) : (
                  activity.name
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {isEditing ? (
                  <textarea
                    value={activity.value || ""}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                    rows={3}
                  />
                ) : (
                  <div>
                    {(activity.value || "").split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                )}
              </td>
              {isEditing && (
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => handleDeleteActivity(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
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
