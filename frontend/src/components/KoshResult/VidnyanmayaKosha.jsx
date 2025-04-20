import React, { useState, useEffect } from "react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const VidnyanmayaKoshaAssessment = ({
  isEditing,
  rformat,
  studentData,
  onUpdate,
}) => {
  const [localData, setLocalData] = useState(() => {
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
            grade: {
              sem1: existingItem?.grade?.sem1 || "",
              sem2: existingItem?.grade?.sem2 || "",
            },
            minimumMarks: existingItem?.minimumMarks || "",
            sem2obtainedMarks: existingItem?.sem2obtainedMarks || "",
            remarks: existingItem?.remarks || "",
          };
        }) || []
      );
    };

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
      totalMarks: studentData?.result?.vidnyanmayaKosha?.totalMarks || "",
      percentage: studentData?.result?.vidnyanmayaKosha?.percentage || "",
      overallRemarks:
        studentData?.result?.vidnyanmayaKosha?.overallRemarks || "",
      maunAbhyasActivities: initializeMaunAbhyas(),
      dailyObservations:
        studentData?.result?.vidnyanmayaKosha?.dailyObservations || [],
      annualActivities:
        studentData?.result?.vidnyanmayaKosha?.annualActivities || [],
    };
  });

  const isMiddleSchool =
    studentData?.standard === "६" || studentData?.standard === "७";
  const handleMarksChange = (subjectId, field, value) => {
    if (!isEditing) return;

    const updatedSubjects = localData.subjects.map((subject) => {
      if (subject.id !== subjectId) return subject;

      // Handle grade updates differently from other fields
      if (typeof field === "object") {
        // This is for grade updates (sem1 or sem2)
        return {
          ...subject,
          grade: {
            ...subject.grade,
            ...field, // Spread the grade update (either {sem1: value} or {sem2: value})
          },
        };
      } else {
        // This is for other fields (minimumMarks, sem2obtainedMarks, remarks)
        return {
          ...subject,
          [field]: value,
        };
      }
    });

    const updatedData = {
      ...localData,
      subjects: updatedSubjects,
    };
    setLocalData(updatedData);
    if (onUpdate) onUpdate(updatedData);
  };

  const handleTotalPercentageChange = (field, value) => {
    if (!isEditing) return;

    const updatedData = {
      ...localData,
      [field]: value,
    };

    setLocalData(updatedData);
    if (onUpdate) onUpdate(updatedData);
  };

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

  const handleDailyObservationsChange = (updatedObservations) => {
    const updatedData = {
      ...localData,
      dailyObservations: updatedObservations,
    };
    setLocalData(updatedData);
    if (onUpdate) onUpdate(updatedData);
  };

  const handleAnnualActivitiesChange = (updatedActivities) => {
    const updatedData = {
      ...localData,
      annualActivities: updatedActivities,
    };
    setLocalData(updatedData);
    if (onUpdate) onUpdate(updatedData);
  };

  if (!rformat) {
    return <div className="p-4 text-center">Loading format data...</div>;
  }

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
              <th className="border border-gray-300 p-2 text-left">
                श्रेणी (सेम 1)
              </th>
              <th className="border border-gray-300 p-2 text-left">
                श्रेणी (सेम 2)
              </th>
              {!isMiddleSchool && (
                <>
                  <th className="border border-gray-300 p-2 text-left">
                    किमान गुण
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    सेम 2 मध्ये प्राप्त गुण
                  </th>
                  <th className="border border-gray-300 p-2 text-left">शेरा</th>
                </>
              )}
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
                      value={subject.grade.sem1 || ""}
                      onChange={(e) =>
                        handleMarksChange(
                          subject.id,
                          { sem1: e.target.value },
                          e.target.value
                        )
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                      placeholder="ग्रेड टाका (सेम 1)"
                    />
                  ) : (
                    <span className="font-semibold">{subject.grade.sem1}</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={subject.grade.sem2 || ""}
                      onChange={(e) =>
                        handleMarksChange(
                          subject.id,
                          { sem2: e.target.value },
                          e.target.value
                        )
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                      placeholder="ग्रेड टाका (सेम 2)"
                    />
                  ) : (
                    <span className="font-semibold">{subject.grade.sem2}</span>
                  )}
                </td>
                {!isMiddleSchool && (
                  <>
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={subject.minimumMarks || ""}
                          onChange={(e) =>
                            handleMarksChange(
                              subject.id,
                              "minimumMarks",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border border-gray-300 rounded"
                          placeholder="किमान गुण"
                        />
                      ) : (
                        <span className="font-semibold">
                          {subject.minimumMarks}
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={subject.sem2obtainedMarks || ""}
                          onChange={(e) =>
                            handleMarksChange(
                              subject.id,
                              "sem2obtainedMarks",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border border-gray-300 rounded"
                          placeholder="सेम 2 मध्ये प्राप्त गुण"
                        />
                      ) : (
                        <span className="font-semibold">
                          {subject.sem2obtainedMarks}
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={subject.remarks || ""}
                          onChange={(e) =>
                            handleMarksChange(
                              subject.id,
                              "remarks",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border border-gray-300 rounded"
                          placeholder="शेरा"
                        />
                      ) : (
                        <span className="font-semibold">{subject.remarks}</span>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isMiddleSchool && (
        <div className="flex flex-wrap gap-4 justify-center items-center mt-4">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              एकूण गुण:
            </label>
            {isEditing ? (
              <input
                type="text"
                value={localData.totalMarks || ""}
                onChange={(e) =>
                  handleTotalPercentageChange("totalMarks", e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="एकूण गुण"
              />
            ) : (
              <span className="font-semibold">{localData.totalMarks}</span>
            )}
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              टक्केवारी:
            </label>
            {isEditing ? (
              <input
                type="text"
                value={localData.percentage || ""}
                onChange={(e) =>
                  handleTotalPercentageChange("percentage", e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="टक्केवारी"
              />
            ) : (
              <span className="font-semibold">{localData.percentage}</span>
            )}
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              एकूण शेरा:
            </label>
            {isEditing ? (
              <input
                type="text"
                value={localData.overallRemarks || ""}
                onChange={(e) =>
                  handleTotalPercentageChange("overallRemarks", e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="एकूण शेरा (उदा. पास/फेल)"
              />
            ) : (
              <span className="font-semibold">{localData.overallRemarks}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );

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
