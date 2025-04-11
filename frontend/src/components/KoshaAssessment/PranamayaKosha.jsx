import React from "react";
import { Plus, Trash2 } from "lucide-react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const PranamayaKosha = ({
  isEditing = false,
  PranData,
  onDataChange,
  academicYear,
}) => {
  const [data, setData] = React.useState(
    PranData || {
      chhandavarga: {
        music: [],
        computer: [],
        art: [],
      },
      yogabhyas: {
        asanas: [],
        pranayam: [],
      },
      pathantar: {
        sanskrit: [],
        marathi: [],
      },
      dailyObservations: [],
      annualActivities: [],
    }
  );

  console.log("Data in PranamayaKosha:", data);

  // Helper function to update data and notify parent
  const updateData = (newData) => {
    setData(newData);
    if (onDataChange) {
      onDataChange(newData);
    }
  };

  // Helper functions for editing
  const handleAddItem = (category, subCategory) => {
    const newItem = { id: Date.now().toString(), name: "नवीन आयटम" };
    const newData = {
      ...data,
      [category]: {
        ...data[category],
        [subCategory]: [...data[category][subCategory], newItem],
      },
    };
    updateData(newData);
  };

  const handleEditItem = (category, subCategory, index, newName) => {
    const newData = { ...data };
    newData[category][subCategory][index].name = newName;
    updateData(newData);
  };

  const handleDeleteItem = (category, subCategory, index) => {
    const newData = {
      ...data,
      [category]: {
        ...data[category],
        [subCategory]: data[category][subCategory].filter(
          (_, i) => i !== index
        ),
      },
    };
    updateData(newData);
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

  // Reusable Add Button Component
  const AddButton = ({ onClick, label }) => (
    <button
      onClick={onClick}
      className="flex items-center mb-4 bg-blue-600 text-white border-none py-2 px-4 cursor-pointer hover:bg-blue-700"
    >
      <Plus size={16} className="mr-2" /> {label}
    </button>
  );

  // Render functions for each section
  const renderChhandavarga = () => (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        छंदवर्ग
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Music */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b border-gray-300">
            <h3 className="text-center font-semibold">संगीत</h3>
          </div>
          <ul className="divide-y divide-gray-300">
            {data.chhandavarga.music.map((item, index) => (
              <li
                key={item.id}
                className="p-3 flex justify-between items-center"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleEditItem(
                        "chhandavarga",
                        "music",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-grow p-1 border border-gray-300 rounded mr-2"
                  />
                ) : (
                  <span className="flex-grow">{item.name}</span>
                )}
                {isEditing && (
                  <button
                    onClick={() =>
                      handleDeleteItem("chhandavarga", "music", index)
                    }
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button
              onClick={() => handleAddItem("chhandavarga", "music")}
              className="w-full flex items-center justify-center py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" /> नवीन संगीत
            </button>
          )}
        </div>

        {/* Computer */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b border-gray-300">
            <h3 className="text-center font-semibold">संगणक</h3>
          </div>
          <ul className="divide-y divide-gray-300">
            {data.chhandavarga.computer.map((item, index) => (
              <li
                key={item.id}
                className="p-3 flex justify-between items-center"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleEditItem(
                        "chhandavarga",
                        "computer",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-grow p-1 border border-gray-300 rounded mr-2"
                  />
                ) : (
                  <span className="flex-grow">{item.name}</span>
                )}
                {isEditing && (
                  <button
                    onClick={() =>
                      handleDeleteItem("chhandavarga", "computer", index)
                    }
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button
              onClick={() => handleAddItem("chhandavarga", "computer")}
              className="w-full flex items-center justify-center py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" /> नवीन संगणक
            </button>
          )}
        </div>

        {/* Art */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b border-gray-300">
            <h3 className="text-center font-semibold">चित्रकला</h3>
          </div>
          <ul className="divide-y divide-gray-300">
            {data.chhandavarga.art.map((item, index) => (
              <li
                key={item.id}
                className="p-3 flex justify-between items-center"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleEditItem(
                        "chhandavarga",
                        "art",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-grow p-1 border border-gray-300 rounded mr-2"
                  />
                ) : (
                  <span className="flex-grow">{item.name}</span>
                )}
                {isEditing && (
                  <button
                    onClick={() =>
                      handleDeleteItem("chhandavarga", "art", index)
                    }
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button
              onClick={() => handleAddItem("chhandavarga", "art")}
              className="w-full flex items-center justify-center py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" /> नवीन चित्रकला
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderYogabhyas = () => (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        योगाभ्यास
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Asanas - Column 1 */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b border-gray-300">
            <h3 className="text-center font-semibold">आसन (१-१०)</h3>
          </div>
          <ul className="divide-y divide-gray-300">
            {data.yogabhyas.asanas.slice(0, 10).map((item, index) => (
              <li
                key={item.id}
                className="p-3 flex justify-between items-center"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleEditItem(
                        "yogabhyas",
                        "asanas",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-grow p-1 border border-gray-300 rounded mr-2"
                  />
                ) : (
                  <span className="flex-grow">{item.name}</span>
                )}
                {isEditing && (
                  <button
                    onClick={() =>
                      handleDeleteItem("yogabhyas", "asanas", index)
                    }
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Asanas - Column 2 */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b border-gray-300">
            <h3 className="text-center font-semibold">आसन (११-२०)</h3>
          </div>
          <ul className="divide-y divide-gray-300">
            {data.yogabhyas.asanas.slice(10).map((item, index) => (
              <li
                key={item.id}
                className="p-3 flex justify-between items-center"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleEditItem(
                        "yogabhyas",
                        "asanas",
                        index + 10,
                        e.target.value
                      )
                    }
                    className="flex-grow p-1 border border-gray-300 rounded mr-2"
                  />
                ) : (
                  <span className="flex-grow">{item.name}</span>
                )}
                {isEditing && (
                  <button
                    onClick={() =>
                      handleDeleteItem("yogabhyas", "asanas", index + 10)
                    }
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button
              onClick={() => handleAddItem("yogabhyas", "asanas")}
              className="w-full flex items-center justify-center py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" /> नवीन आसन
            </button>
          )}
        </div>

        {/* Pranayam */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b border-gray-300">
            <h3 className="text-center font-semibold">प्राणायाम</h3>
          </div>
          <ul className="divide-y divide-gray-300">
            {data.yogabhyas.pranayam.map((item, index) => (
              <li
                key={item.id}
                className="p-3 flex justify-between items-center"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleEditItem(
                        "yogabhyas",
                        "pranayam",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-grow p-1 border border-gray-300 rounded mr-2"
                  />
                ) : (
                  <span className="flex-grow">{item.name}</span>
                )}
                {isEditing && (
                  <button
                    onClick={() =>
                      handleDeleteItem("yogabhyas", "pranayam", index)
                    }
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button
              onClick={() => handleAddItem("yogabhyas", "pranayam")}
              className="w-full flex items-center justify-center py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" /> नवीन प्राणायाम
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderPathantar = () => (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        पाठांतर
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sanskrit */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b border-gray-300">
            <h3 className="text-center font-semibold">संस्कृत पाठांतर</h3>
          </div>
          <ul className="divide-y divide-gray-300">
            {data.pathantar.sanskrit.map((item, index) => (
              <li
                key={item.id}
                className="p-3 flex justify-between items-center"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleEditItem(
                        "pathantar",
                        "sanskrit",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-grow p-1 border border-gray-300 rounded mr-2"
                  />
                ) : (
                  <span className="flex-grow">{item.name}</span>
                )}
                {isEditing && (
                  <button
                    onClick={() =>
                      handleDeleteItem("pathantar", "sanskrit", index)
                    }
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button
              onClick={() => handleAddItem("pathantar", "sanskrit")}
              className="w-full flex items-center justify-center py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" /> नवीन संस्कृत
            </button>
          )}
        </div>

        {/* Marathi */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b border-gray-300">
            <h3 className="text-center font-semibold">मराठी पाठांतर</h3>
          </div>
          <ul className="divide-y divide-gray-300">
            {data.pathantar.marathi.map((item, index) => (
              <li
                key={item.id}
                className="p-3 flex justify-between items-center"
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleEditItem(
                        "pathantar",
                        "marathi",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-grow p-1 border border-gray-300 rounded mr-2"
                  />
                ) : (
                  <span className="flex-grow">{item.name}</span>
                )}
                {isEditing && (
                  <button
                    onClick={() =>
                      handleDeleteItem("pathantar", "marathi", index)
                    }
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button
              onClick={() => handleAddItem("pathantar", "marathi")}
              className="w-full flex items-center justify-center py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" /> नवीन मराठी
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4  mx-auto">
      {renderChhandavarga()}
      {renderYogabhyas()}
      {renderPathantar()}
      <DailyObservations
        isEditing={isEditing}
        observations={data.dailyObservations || []}
        onChange={handleDailyObservationsChange}
      />

      <AnnualActivities
        isEditing={isEditing}
        activities={data.annualActivities || []}
        onChange={handleAnnualActivitiesChange}
      />
    </div>
  );
};

export default PranamayaKosha;
