import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ObservationTable = ({
  observations,
  isEditing,
  isSingleOption = false,
  onAddCategory,
  onRemoveCategory,
  onUpdateCategory,
  onAddOption,
  onRemoveOption,
  onUpdateOption,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">दैनंदिन निरीक्षण</h3>
        {isEditing && (
          <button
            onClick={onAddCategory}
            className="flex items-center text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded"
          >
            <Plus size={14} className="mr-1" /> श्रेणी जोडा
          </button>
        )}
      </div>

      {observations.map((obs, obsIndex) => (
        <div key={obs.id} className="mb-4 last:mb-0 border-b pb-4">
          <div className="mb-2">
            {isEditing ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={obs.category}
                  onChange={(e) => onUpdateCategory(obsIndex, e.target.value)}
                  className="flex-grow p-1 border rounded"
                  placeholder="श्रेणी नाव"
                />
                <button
                  onClick={() => onRemoveCategory(obsIndex)}
                  className="ml-2 text-red-500 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <h4 className="font-medium">{obs.category}</h4>
            )}
          </div>

          <div className="ml-4 space-y-2">
            {obs.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        onUpdateOption(obsIndex, optionIndex, e.target.value)
                      }
                      className="flex-grow p-1 border rounded text-sm"
                    />
                    {!isSingleOption && (
                      <button
                        onClick={() => onRemoveOption(obsIndex, optionIndex)}
                        className="ml-2 text-red-400 p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </>
                ) : (
                  <span className="text-sm">{option}</span>
                )}
              </div>
            ))}

            {isEditing && !isSingleOption && (
              <button
                onClick={() => onAddOption(obsIndex)}
                className="flex items-center text-xs text-blue-600 mt-1"
              >
                <Plus size={12} className="mr-1" /> पर्याय जोडा
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ObservationTable;
