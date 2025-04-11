import React from "react";
import { Plus, Trash2 } from "lucide-react";

const EditableList = ({
  title,
  items,
  isEditing,
  onAdd,
  onRemove,
  onUpdate,
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">{title}</h4>
        {isEditing && (
          <button
            onClick={onAdd}
            className="text-blue-600 text-sm flex items-center"
          >
            <Plus size={14} className="mr-1" /> जोडा
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center">
            {isEditing ? (
              <div className="flex items-center flex-grow">
                <input
                  type="text"
                  value={item.label || item.name}
                  onChange={(e) => onUpdate(index, e.target.value)}
                  className="flex-grow p-1 border rounded text-sm"
                />
                <button
                  onClick={() => onRemove(index)}
                  className="ml-2 text-red-500 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <span>{item.label || item.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditableList;
