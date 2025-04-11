import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ActivityTable = ({
  activities,
  isEditing,
  withRemarks = false,
  onAdd,
  onRemove,
  onUpdate,
  onUpdateRemarks,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">वार्षिक उपक्रम</h3>
        {isEditing && (
          <button
            onClick={onAdd}
            className="flex items-center text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded"
          >
            <Plus size={14} className="mr-1" /> उपक्रम जोडा
          </button>
        )}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">उपक्रम</th>
            {withRemarks && <th className="border p-2">मूल्यमापन</th>}
            {isEditing && <th className="border p-2">क्रिया</th>}
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={activity.id} className="border-b">
              <td className="border p-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={activity.name}
                    onChange={(e) => onUpdate(index, e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  <span className="font-medium">{activity.name}</span>
                )}
              </td>

              {withRemarks && (
                <td className="border p-2">
                  <textarea
                    value={activity.defaultValue}
                    onChange={(e) => onUpdateRemarks(index, e.target.value)}
                    className="w-full p-1 border rounded"
                    rows={2}
                    readOnly={!isEditing}
                  />
                </td>
              )}

              {isEditing && (
                <td className="border p-2 text-center">
                  <button
                    onClick={() => onRemove(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
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

export default ActivityTable;
