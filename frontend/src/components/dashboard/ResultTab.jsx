import React from "react";
import { dummyData } from "../../utils/dummyData";

const ResultTab = ({ selectedStudent, selectedKosha, onKoshaChange }) => {
  const koshaTabs = [
    { id: "AnnamayaKosha", name: "अन्नमय कोश" },
    { id: "PranamayaKosha", name: "प्राणमय कोश" },
    { id: "ManomayaKosha", name: "मनोमय कोश" },
    { id: "VidnyanmayaKosha", name: "विज्ञानमय कोश" },
    { id: "AnandmayaKosha", name: "आनंदमय कोश" },
  ];

  const renderKoshaData = () => {
    if (!selectedStudent) return null;
    const koshaData = dummyData[selectedKosha];

    return (
      <div className="space-y-6">
        {/* Daily Observations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            दैनंदिन निरीक्षणे
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {koshaData.dailyObservations.map((obs) => (
              <div key={obs.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {obs.category}
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={obs.selectedOption || ""}
                  onChange={(e) =>
                    console.log("Update:", obs.id, e.target.value)
                  }
                >
                  {obs.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Annual Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            वार्षिक उपक्रम
          </h3>
          <div className="space-y-4">
            {koshaData.annualActivities.map((activity) => (
              <div key={activity.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {activity.name}
                </label>
                <textarea
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={activity.defaultValue || ""}
                  onChange={(e) =>
                    console.log("Update:", activity.id, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1">
      {selectedStudent ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedStudent.name} चे निकाल
              </h2>
              <div className="text-sm text-gray-500">
                ID: {selectedStudent.id}
              </div>
            </div>
          </div>

          {/* Kosha Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {koshaTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onKoshaChange(tab.id)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    selectedKosha === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Kosha Data */}
          <div className="p-6">{renderKoshaData()}</div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            कृपया विद्यार्थी निवडा
          </h3>
          <p className="text-sm text-gray-500">
            डाव्या बाजूला विद्यार्थी यादीमधून निवडा
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultTab;
