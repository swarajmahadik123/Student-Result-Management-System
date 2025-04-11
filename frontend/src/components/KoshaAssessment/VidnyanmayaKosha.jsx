
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import DailyObservations from "./shared/DailyObservations";
import AnnualActivities from "./shared/AnnualActivities";

const VidnyanmayaKosha = ({
  isEditing,
  VidData,
  onDataChange,
  academicYear,
}) => {
  const [data, setData] = React.useState(VidData);

  // Helper function to update data and notify parent
  const updateData = (newData) => {
    setData(newData);
    if (onDataChange) {
      onDataChange(newData);
    }
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

  const handleAddSubject = () => {
    const newId = Date.now().toString();
    const newData = {
      ...data,
      marks: [...data.marks, { id: newId, label: "नवीन विषय" }],
      marksData: {
        ...data.marksData,
        [newId]: {
          unit1: { total: "25", obtained: "0" },
          semester1: { total: "50", obtained: "0" },
          unit2: { total: "25", obtained: "0" },
          terminal: { total: "100", obtained: "0" },
          grade: "C",
        },
      },
    };
    updateData(newData);
  };

  const handleDeleteSubject = (subjectId) => {
    const updatedMarks = data.marks.filter(
      (subject) => subject.id !== subjectId
    );
    const updatedMarksData = { ...data.marksData };
    delete updatedMarksData[subjectId];

    const newData = {
      ...data,
      marks: updatedMarks,
      marksData: updatedMarksData,
    };
    updateData(newData);
  };

  const handleUpdateSubjectName = (subjectId, newName) => {
    const newData = {
      ...data,
      marks: data.marks.map((subject) =>
        subject.id === subjectId ? { ...subject, label: newName } : subject
      ),
    };
    updateData(newData);
  };

 const renderAnnualResult = () => {
   const handleAddSubject = () => {
     const newId = Date.now().toString();
     const newData = {
       ...data,
       subjects: [...(data.subjects || []), { id: newId, label: "नवीन विषय" }],
     };
     updateData(newData);
   };

   const handleDeleteSubject = (subjectId) => {
     const newData = {
       ...data,
       subjects: (data.subjects || []).filter(
         (subject) => subject.id !== subjectId
       ),
     };
     updateData(newData);
   };

   const handleUpdateSubjectName = (subjectId, newName) => {
     const newData = {
       ...data,
       subjects: (data.subjects || []).map((subject) =>
         subject.id === subjectId ? { ...subject, label: newName } : subject
       ),
     };
     updateData(newData);
   };

   return (
     <div className="space-y-6 p-5 bg-white rounded-lg shadow-md">
       <h2 className="text-center text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
         वार्षिक परिणाम विषय
       </h2>

       {isEditing && (
         <button
           onClick={handleAddSubject}
           className="flex items-center mb-4 bg-blue-600 text-white border-none py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
         >
           <Plus size={16} className="mr-2" /> नवीन विषय
         </button>
       )}

       <div className="overflow-x-auto">
         <table className="w-full border-collapse border border-gray-300">
           <thead>
             <tr className="bg-gray-100">
               <th className="border border-gray-300 p-2">विषय</th>
               {isEditing && (
                 <th className="border border-gray-300 p-2 w-20">क्रिया</th>
               )}
             </tr>
           </thead>
           <tbody>
             {(data.subjects || []).map((subject) => (
               <tr key={subject.id}>
                 <td className="border border-gray-300 p-2">
                   {isEditing ? (
                     <input
                       type="text"
                       value={subject.label}
                       onChange={(e) =>
                         handleUpdateSubjectName(subject.id, e.target.value)
                       }
                       className="w-full p-1 border border-gray-300 rounded"
                     />
                   ) : (
                     subject.label
                   )}
                 </td>
                 {isEditing && (
                   <td className="border border-gray-300 p-2 text-center">
                     <button
                       onClick={() => handleDeleteSubject(subject.id)}
                       className="text-red-600 hover:text-red-800"
                     >
                       <Trash2 size={16} />
                     </button>
                   </td>
                 )}
               </tr>
             ))}
             {(data.subjects || []).length === 0 && (
               <tr>
                 <td
                   colSpan={isEditing ? 2 : 1}
                   className="border border-gray-300 p-4 text-center text-gray-500"
                 >
                   कोणतेही विषय जोडलेले नाहीत
                 </td>
               </tr>
             )}
           </tbody>
         </table>
       </div>
     </div>
   );
 };


const renderMaunAbhyas = () => {
  // Define initial data structure if not present
  const maunAbhyasData = data.maunAbhyasActivities || {
    mukhyaVishay: [],
    anubhavLekhan: [],
    charitryaAbhyas: [],
    prakatVachan: [],
    rasGrahan: [],
  };

  const handleAddItem = (category) => {
    const newData = {
      ...data,
      maunAbhyasActivities: {
        ...(data.maunAbhyasActivities || {}),
        [category]: [
          ...(data.maunAbhyasActivities?.[category] || []),
          { id: Date.now().toString(), name: "नवीन" },
        ],
      },
    };
    updateData(newData);
  };

  const handleUpdateItem = (category, id, newContent) => {
    const newData = {
      ...data,
      maunAbhyasActivities: {
        ...(data.maunAbhyasActivities || {}),
        [category]: (data.maunAbhyasActivities?.[category] || []).map((item) =>
          item.id === id ? { ...item, name: newContent } : item
        ),
      },
    };
    updateData(newData);
  };

  const handleDeleteItem = (category, id) => {
    const newData = {
      ...data,
      maunAbhyasActivities: {
        ...(data.maunAbhyasActivities || {}),
        [category]: (data.maunAbhyasActivities?.[category] || []).filter(
          (item) => item.id !== id
        ),
      },
    };
    updateData(newData);
  };

  // Get the maximum length among all categories for table rows
  const maxLength = Math.max(
    maunAbhyasData.mukhyaVishay?.length || 0,
    maunAbhyasData.anubhavLekhan?.length || 0,
    maunAbhyasData.charitryaAbhyas?.length || 0,
    maunAbhyasData.prakatVachan?.length || 0,
    maunAbhyasData.rasGrahan?.length || 0
  );

  // Create array of indices for rendering rows
  const rowIndices = Array.from({ length: maxLength }, (_, i) => i);

  // Helper function to render a cell based on category and index
  const renderCell = (category, index) => {
    const items = maunAbhyasData[category] || [];

    if (isEditing && index < items.length) {
      return (
        <div className="flex items-center">
          <input
            type="text"
            value={items[index].name}
            onChange={(e) =>
              handleUpdateItem(category, items[index].id, e.target.value)
            }
            className="w-full p-1 border border-gray-300 rounded"
          />
          <button
            onClick={() => handleDeleteItem(category, items[index].id)}
            className="ml-1 text-red-500"
          >
            ×
          </button>
        </div>
      );
    } else if (index < items.length) {
      return items[index].name;
    }
    return null;
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        मौनाभ्यास
      </h2>

      {isEditing && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleAddItem("mukhyaVishay")}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            + मुख्य विषय
          </button>
          <button
            onClick={() => handleAddItem("anubhavLekhan")}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            + अनुभव लेखन
          </button>
          <button
            onClick={() => handleAddItem("charitryaAbhyas")}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            + चरित्राभ्यास
          </button>
          <button
            onClick={() => handleAddItem("prakatVachan")}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            + प्रकट वाचन
          </button>
          <button
            onClick={() => handleAddItem("rasGrahan")}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            + रस ग्रहण
          </button>
        </div>
      )}

      <table className="w-full border-collapse border border-black text-center">
        <thead>
          <tr>
            <th className="border border-black p-2 text-lg font-bold">
              मुख्य विषय
            </th>
            <th className="border border-black p-2 text-lg font-bold">
              अनुभव लेखन
            </th>
            <th className="border border-black p-2 text-lg font-bold">
              चरित्राभ्यास
            </th>
            <th className="border border-black p-2 text-lg font-bold">
              प्रकट वाचन
            </th>
            <th className="border border-black p-2 text-lg font-bold">
              रस ग्रहण
            </th>
          </tr>
        </thead>
        <tbody>
          {rowIndices.map((index) => (
            <tr key={index}>
              <td className="border border-black p-2">
                {renderCell("mukhyaVishay", index)}
              </td>
              <td className="border border-black p-2">
                {renderCell("anubhavLekhan", index)}
              </td>
              <td className="border border-black p-2">
                {renderCell("charitryaAbhyas", index)}
              </td>
              <td className="border border-black p-2">
                {renderCell("prakatVachan", index)}
              </td>
              <td className="border border-black p-2">
                {renderCell("rasGrahan", index)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

  return (
    <div className="space-y-6">
      {/* Annual Result Table */}
      {renderAnnualResult()}

      {/* Maun Abhyas Table */}
      {renderMaunAbhyas()}

      <DailyObservations
        isEditing={isEditing}
        observations={data.dailyObservations || []}
        onChange={handleDailyObservationsChange}
      />
      <AnnualActivities
        isEditing={isEditing}
        activities={data.annualActivities || []}
        onChange={handleAnnualActivitiesChange}
        year={academicYear}
      />
    </div>
  );
};

export default VidnyanmayaKosha;
