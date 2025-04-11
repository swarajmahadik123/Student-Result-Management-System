import React from "react";

const DailyObservations = ({ isEditing, observations, onChange }) => {
  const handleCategoryChange = (categoryIndex, value) => {
    const updated = observations.map((item, idx) =>
      idx === categoryIndex ? { ...item, category: value } : item
    );
    onChange(updated);
  };

  const handleDeleteCategory = (categoryIndex) => {
    const updated = observations.filter((_, idx) => idx !== categoryIndex);
    onChange(updated);
  };

  const handleOptionChange = (categoryIndex, optionIndex, value) => {
    const updated = observations.map((item, idx) =>
      idx === categoryIndex
        ? {
            ...item,
            options: item.options.map((opt, i) =>
              i === optionIndex ? value : opt
            ),
          }
        : item
    );
    onChange(updated);
  };

  const handleDeleteOption = (categoryIndex, optionIndex) => {
    const updated = observations.map((item, idx) =>
      idx === categoryIndex
        ? {
            ...item,
            options: item.options.filter((_, i) => i !== optionIndex),
          }
        : item
    );
    onChange(updated);
  };

  const handleAddOption = (categoryIndex) => {
    const updated = observations.map((item, idx) =>
      idx === categoryIndex
        ? {
            ...item,
            options: [...item.options, "नवीन पर्याय"],
          }
        : item
    );
    onChange(updated);
  };

  const handleAddCategory = () => {
    onChange([
      ...observations,
      {
        id: Date.now().toString(),
        category: "नवीन श्रेणी",
        options: [],
      },
    ]);
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
            <th className="border border-gray-300 p-2 text-center">
              निरीक्षण पर्याय
            </th>
          </tr>
        </thead>
        <tbody>
          {observations.map((obs, categoryIndex) => (
            <tr key={obs.id}>
              {/* Category Name */}
              <td className="border border-gray-300 p-2 text-center font-semibold">
                {isEditing ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={obs.category}
                      onChange={(e) =>
                        handleCategoryChange(categoryIndex, e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleDeleteCategory(categoryIndex)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  obs.category
                )}
              </td>

              {/* Options */}
              <td className="border border-gray-300 p-2">
                {isEditing ? (
                  <div className="space-y-2">
                    {obs.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              categoryIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                          className="flex-grow p-1 border border-gray-300 rounded mr-2"
                        />
                        <button
                          onClick={() =>
                            handleDeleteOption(categoryIndex, optionIndex)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {/* Add New Option Button */}
                    <button
                      onClick={() => handleAddOption(categoryIndex)}
                      className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
                    >
                      + नवीन पर्याय
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5">
                    {obs.options.length > 0 ? (
                      obs.options.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))
                    ) : (
                      <span className="text-gray-500">
                        No options available
                      </span>
                    )}
                  </ul>
                )}
              </td>
            </tr>
          ))}

          {/* Add New Category Row */}
          {isEditing && (
            <tr>
              <td colSpan="2" className="p-2 text-center">
                <button
                  onClick={handleAddCategory}
                  className="text-green-600 hover:text-green-800"
                >
                  + नवीन श्रेणी
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DailyObservations;
