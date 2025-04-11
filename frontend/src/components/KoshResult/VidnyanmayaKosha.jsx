import React, { useState, useEffect } from "react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const VidnyanmayaKoshaAssessment = ({
  isEditing,
  rformat,
  studentData,
  onUpdate,
}) => {
  // Initialize with local state to avoid dependency issues
  const [localData, setLocalData] = useState(() => {
    // Helper function to initialize subjects
    const initializeSubjects = () => {
      return (
        rformat?.subjects?.map((item) => {
          const existingItem =
            studentData?.result?.vidnyanmayaKosha?.subjects?.find(
              (si) => si.id === item.id
            );
          return {
            id: item.id,
            label: item.label,
            unit1: existingItem?.unit1 || { total: "25", obtained: "0" },
            semester1: existingItem?.semester1 || {
              total: "50",
              obtained: "0",
            },
            unit2: existingItem?.unit2 || { total: "25", obtained: "0" },
            terminal: existingItem?.terminal || { total: "100", obtained: "0" },
            grade: existingItem?.grade || "",
          };
        }) || []
      );
    };

    // Helper function to initialize maunAbhyas activities
    const initializeMaunAbhyas = () => {
      const result = {};
      if (rformat?.maunAbhyasActivities) {
        Object.keys(rformat.maunAbhyasActivities).forEach((category) => {
          result[category] = rformat.maunAbhyasActivities[category].map(
            (item) => {
              const existingItem =
                studentData?.result?.vidnyanmayaKosha?.maunAbhyasActivities?.[
                  category
                ]?.find((si) => si.id === item.id);
              return {
                id: item.id,
                name: item.name,
                isPresent: existingItem?.isPresent || false,
              };
            }
          );
        });
      }
      return result;
    };

    return {
      subjects: initializeSubjects(),
      maunAbhyasActivities: initializeMaunAbhyas(),
      dailyObservations:
        studentData?.result?.vidnyanmayaKosha?.dailyObservations || [],
      annualActivities:
        studentData?.result?.vidnyanmayaKosha?.annualActivities || [],
    };
  });

  // Calculate grade based on percentage
  const calculateGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 35) return "D";
    return "F";
  };

  // Handle marks input changes and auto-calculate grades
  const handleMarksChange = (subjectId, field, type, value) => {
    if (!isEditing) return;

    // Only allow numbers for marks
    if (type !== "grade" && value !== "" && isNaN(value)) return;

    const updatedSubjects = localData.subjects.map((subject) => {
      if (subject.id !== subjectId) return subject;

      const updatedSubject = { ...subject };

      // Update the specific field
      if (type === "grade") {
        updatedSubject.grade = value;
      } else {
        updatedSubject[field] = {
          ...updatedSubject[field],
          [type]: value,
        };

        // Auto-calculate grade when marks are entered
        const exams = ["unit1", "semester1", "unit2", "terminal"];
        const allExamsHaveMarks = exams.every(
          (exam) => updatedSubject[exam].total && updatedSubject[exam].obtained
        );

        if (allExamsHaveMarks) {
          const totalPossible = exams.reduce(
            (sum, exam) => sum + parseFloat(updatedSubject[exam].total),
            0
          );

          const totalObtained = exams.reduce(
            (sum, exam) => sum + parseFloat(updatedSubject[exam].obtained),
            0
          );

          const percentage = (totalObtained / totalPossible) * 100;
          updatedSubject.grade = calculateGrade(percentage);
        }
      }

      return updatedSubject;
    });

    const updatedData = {
      ...localData,
      subjects: updatedSubjects,
    };

    setLocalData(updatedData);
    if (onUpdate) onUpdate(updatedData);
  };

  // Handle Maun Abhyas activity toggle
  const handleActivityToggle = (category, activityId) => {
    if (!isEditing) return;

    const updatedMaunAbhyas = {
      ...localData.maunAbhyasActivities,
      [category]: localData.maunAbhyasActivities[category].map((activity) =>
        activity.id === activityId
          ? { ...activity, isPresent: !activity.isPresent }
          : activity
      ),
    };

    const updatedData = {
      ...localData,
      maunAbhyasActivities: updatedMaunAbhyas,
    };

    setLocalData(updatedData);
    if (onUpdate) onUpdate(updatedData);
  };

  // Handle daily observation changes
  const handleDailyObservationsChange = (updatedObservations) => {
    const updatedData = {
      ...localData,
      dailyObservations: updatedObservations,
    };
    setLocalData(updatedData);
    if (onUpdate) onUpdate(updatedData);
  };

  // Handle annual activities changes
  const handleAnnualActivitiesChange = (updatedActivities) => {
    const updatedData = {
      ...localData,
      annualActivities: updatedActivities,
    };
    setLocalData(updatedData);
    if (onUpdate) onUpdate(updatedData);
  };

  // If no format is available, show loading or error message
  if (!rformat) {
    return <div className="p-4 text-center">Loading format data...</div>;
  }

  // Render Annual Result section
  const renderAnnualResult = () => (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        विषय आणि ग्रेड
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">विषय</th>
              <th className="border border-gray-300 p-2 text-left">ग्रेड</th>
            </tr>
          </thead>
          <tbody>
            {localData.subjects.map((subject) => (
              <tr key={subject.id}>
                <td className="border border-gray-300 p-2">{subject.label}</td>
                <td className="border border-gray-300 p-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={subject.grade || ""}
                      onChange={(e) => {
                        const updatedSubjects = localData.subjects.map((sub) =>
                          sub.id === subject.id
                            ? { ...sub, grade: e.target.value }
                            : sub
                        );
                        setLocalData({
                          ...localData,
                          subjects: updatedSubjects,
                        });
                        onUpdate({ ...localData, subjects: updatedSubjects });
                      }}
                      className="w-full p-1 border border-gray-300 rounded"
                      placeholder="ग्रेड टाका"
                    />
                  ) : (
                    <span className="font-semibold">{subject.grade}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


  // Render Maun Abhyas section
  const renderMaunAbhyas = () => {
    const categories = [
      { key: "mukhyaVishay", label: "मुख्य विषय" },
      { key: "anubhavLekhan", label: "अनुभव लेखन" },
      { key: "charitryaAbhyas", label: "चरित्राभ्यास" },
      { key: "prakatVachan", label: "प्रकट वाचन" },
      { key: "rasGrahan", label: "रस ग्रहण" },
    ];

    const maxLength = Math.max(
      ...categories.map(
        (cat) => localData.maunAbhyasActivities[cat.key]?.length || 0
      )
    );

    const handleSelectAll = (categoryKey) => {
      const updatedActivities = {
        ...localData.maunAbhyasActivities,
        [categoryKey]: localData.maunAbhyasActivities[categoryKey].map(
          (item) => ({ ...item, isPresent: true })
        ),
      };

      const updatedData = {
        ...localData,
        maunAbhyasActivities: updatedActivities,
      };

      setLocalData(updatedData);
      onUpdate(updatedData);
    };

    return (
      <div className="p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          मौनाभ्यास
        </h2>

        <table className="w-full border-collapse border border-black text-center">
          <thead>
            <tr>
              {categories.map((category) => (
                <th key={category.key} className="border border-black p-2">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-bold mb-2">
                      {category.label}
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => handleSelectAll(category.key)}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        सर्व निवडा
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxLength }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {categories.map((category) => (
                  <td key={category.key} className="border border-black p-2">
                    {rowIndex <
                      (localData.maunAbhyasActivities[category.key]?.length ||
                        0) && (
                      <div className="flex items-center justify-center">
                        {isEditing && (
                          <input
                            type="checkbox"
                            checked={
                              localData.maunAbhyasActivities[category.key][
                                rowIndex
                              ]?.isPresent || false
                            }
                            onChange={() =>
                              handleActivityToggle(
                                category.key,
                                localData.maunAbhyasActivities[category.key][
                                  rowIndex
                                ].id
                              )
                            }
                            className="mr-2 h-5 w-5"
                          />
                        )}
                        <span
                          className={`${
                            !isEditing &&
                            localData.maunAbhyasActivities[category.key][
                              rowIndex
                            ]?.isPresent
                              ? "font-semibold"
                              : ""
                          }`}
                        >
                          {
                            localData.maunAbhyasActivities[category.key][
                              rowIndex
                            ]?.name
                          }
                          {!isEditing &&
                            localData.maunAbhyasActivities[category.key][
                              rowIndex
                            ]?.isPresent &&
                            " ✓"}
                        </span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  return (
    <div className="space-y-6">
      {renderAnnualResult()}
      {renderMaunAbhyas()}

      {/* Using reusable DailyObservations component */}
      <DailyObservations
        isEditing={isEditing}
        observations={localData.dailyObservations}
        rformat={rformat}
        onUpdate={handleDailyObservationsChange}
      />

      {/* Using reusable AnnualActivities component */}
      <AnnualActivities
        isEditing={isEditing}
        activities={localData.annualActivities}
        rformat={rformat}
        academicYear={studentData?.academicYear}
        onActivityChange={handleAnnualActivitiesChange}
      />
    </div>
  );
};

export default VidnyanmayaKoshaAssessment;
