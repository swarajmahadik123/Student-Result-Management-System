import React, { useState } from "react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const PranamayaKoshaAssessment = ({
  isEditing,
  studentData,
  rformat,
  onUpdate,
}) => {
  const [localData, setLocalData] = useState(() => {
    const initializeSection = (section, subSection) => {
      return (
        rformat?.[section]?.[subSection]?.map((item) => {
          const existingItem = studentData.result?.pranamayaKosha?.[section]?.[
            subSection
          ]?.find((si) => si.id === item.id);
          return {
            id: item.id,
            name: item.name,
            isPresent: existingItem?.isPresent || false,
          };
        }) || []
      );
    };

    return {
      chhandavarga: {
        music: initializeSection("chhandavarga", "music"),
        computer: initializeSection("chhandavarga", "computer"),
        art: initializeSection("chhandavarga", "art"),
      },
      yogabhyas: {
        asanas: initializeSection("yogabhyas", "asanas"),
        pranayam: initializeSection("yogabhyas", "pranayam"),
      },
      pathantar: {
        sanskrit: initializeSection("pathantar", "sanskrit"),
        marathi: initializeSection("pathantar", "marathi"),
      },
      dailyObservations:
        studentData.result?.pranamayaKosha?.dailyObservations || [],
      annualActivities:
        studentData.result?.pranamayaKosha?.annualActivities || [],
    };
  });

  // Handle checkbox changes for activities
  const handleCheckboxChange = (section, subSection, id) => {
    if (!isEditing) return;

    const updatedSection = {
      ...localData[section],
      [subSection]: localData[section][subSection].map((item) =>
        item.id === id ? { ...item, isPresent: !item.isPresent } : item
      ),
    };

    const updatedData = {
      ...localData,
      [section]: updatedSection,
    };

    setLocalData(updatedData);
    onUpdate(updatedData);
  };

  // Handle Select All functionality
  const handleSelectAll = (section, subSection) => {
    if (!isEditing) return;

    const updatedSection = {
      ...localData[section],
      [subSection]: localData[section][subSection].map((item) => ({
        ...item,
        isPresent: true,
      })),
    };

    const updatedData = {
      ...localData,
      [section]: updatedSection,
    };

    setLocalData(updatedData);
    onUpdate(updatedData);
  };

  // Render a section with checkboxes and Select All button
  const renderSection = (title, section, subSections, labels) => (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subSections.map((subSection, index) => (
          <div
            key={subSection}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <div className="bg-gray-100 p-3 border-b border-gray-300 flex justify-between items-center">
              <h3 className="text-center font-semibold">{labels[index]}</h3>
              {isEditing && (
                <button
                  onClick={() => handleSelectAll(section, subSection)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Select All
                </button>
              )}
            </div>
            <ul className="divide-y divide-gray-300">
              {localData[section][subSection].map((item) => (
                <li key={item.id} className="p-3 flex items-center gap-2">
                  {isEditing && (
                    <input
                      type="checkbox"
                      checked={item.isPresent}
                      onChange={() =>
                        handleCheckboxChange(section, subSection, item.id)
                      }
                      className="h-5 w-5"
                    />
                  )}
                  <span
                    className={`flex-grow ${
                      item.isPresent && !isEditing ? "font-semibold" : ""
                    }`}
                  >
                    {item.name}
                    {item.isPresent && !isEditing && " ✓"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4 mx-auto">
      {/* Chhandavarga Section */}
      {renderSection(
        "छंदवर्ग",
        "chhandavarga",
        ["music", "computer", "art"],
        ["संगीत", "संगणक", "चित्रकला"]
      )}

      {/* Yogabhyas Section */}
      {renderSection(
        "योगाभ्यास",
        "yogabhyas",
        ["asanas", "pranayam"],
        ["आसन", "प्राणायाम"]
      )}

      {/* Pathantar Section */}
      {renderSection(
        "पाठांतर",
        "pathantar",
        ["sanskrit", "marathi"],
        ["संस्कृत पाठांतर", "मराठी पाठांतर"]
      )}

      {/* Daily Observations */}
      <DailyObservations
        isEditing={isEditing}
        observations={localData.dailyObservations}
        rformat={rformat}
        onUpdate={(updated) => {
          setLocalData((prev) => ({ ...prev, dailyObservations: updated }));
          onUpdate({ ...localData, dailyObservations: updated });
        }}
      />

      {/* Annual Activities */}
      <AnnualActivities
        isEditing={isEditing}
        activities={localData.annualActivities}
        rformat={rformat}
        academicYear={studentData.academicYear}
        onActivityChange={(updated) => {
          setLocalData((prev) => ({ ...prev, annualActivities: updated }));
          onUpdate({ ...localData, annualActivities: updated });
        }}
      />
    </div>
  );
};

export default PranamayaKoshaAssessment;
