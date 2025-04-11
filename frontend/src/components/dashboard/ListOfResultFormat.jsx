// components/dashboard/ListOfResultFormat.jsx
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash, FileText } from "lucide-react";
import { toast } from "sonner";
import { fetchAllResultFormats, deleteResultFormat } from "../../services/api";
import NewFormatModal from "./NewFormatModal";

const ListOfResultFormat = ({ onSelectFormat }) => {
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchFormats();
  }, []);

  const fetchFormats = async () => {
    try {
      setLoading(true);
      const data = await fetchAllResultFormats();
      setFormats(data);
    } catch (error) {
      console.error("Error fetching result formats:", error);
      toast.error("परिणाम स्वरूप आणण्यात त्रुटी आली");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFormat = async (id) => {
    if (window.confirm("तुम्हाला खात्री आहे की हे स्वरूप हटवायचे आहे?")) {
      try {
        await deleteResultFormat(id);
        toast.success("स्वरूप यशस्वीरित्या हटवले");
        fetchFormats(); // Refresh the list
      } catch (error) {
        console.error("Error deleting format:", error);
        toast.error("स्वरूप हटवण्यात त्रुटी आली");
      }
    }
  };

  const handleCreateSuccess = () => {
    setShowModal(false);
    fetchFormats(); // Refresh the list after creating
    toast.success("नवीन स्वरूप यशस्वीरित्या तयार केले");
  };

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">परिणाम स्वरूप यादी</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-2" />
          नवीन स्वरूप
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">लोड होत आहे...</div>
      ) : formats.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">कोणतेही परिणाम स्वरूप सापडले नाही</p>
          <p className="text-gray-500 mt-2">
            नवीन स्वरूप तयार करण्यासाठी वरील बटणावर क्लिक करा
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  इयत्ता
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  शैक्षणिक वर्ष
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  निर्माता
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  अद्यतनित
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  कृती
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formats.map((format) => (
                <tr
                  key={format._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onSelectFormat(format)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format.standard}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format.academicYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format.createdBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(format.updatedAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFormat(format);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="संपादित करा"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFormat(format._id);
                        }}
                        className="text-red-600 hover:text-red-900"
                        title="हटवा"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <NewFormatModal
          onClose={() => setShowModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </div>
  );
};

export default ListOfResultFormat;
