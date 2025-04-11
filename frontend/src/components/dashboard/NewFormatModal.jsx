// components/dashboard/NewFormatModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { createResultFormat } from "../../services/api";

const NewFormatModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    standard: "",
    academicYear: "2024-25",
    createdBy: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.standard || !formData.createdBy) {
      setError("कृपया सर्व आवश्यक माहिती भरा");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const newFormat = {
        ...formData,
        annamayaKosha: {
          physicalMeasurements: [],
          dailyObservations: [],
          annualActivities: [],
        },
        pranamayaKosha: {
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
        },
        manomayaKosha: {
          dailyObservations: [],
          annualActivities: [],
        },
        vidnyanmayaKosha: {
          marks: [],
          maunAbhyasActivities: {
            mukhyaVishay: [],
            anubhavLekhan: [],
            charitryaAbhyas: [],
            prakatVachan: [],
            rasGrahan: [],
          },
          dailyObservations: [],
          annualActivities: [],
        },
        anandmayaKosha: {
          dailyObservations: [],
          annualActivities: [],
        },
      };

      await createResultFormat(newFormat);
      onSuccess();
    } catch (error) {
      console.error("Error creating format:", error);
      setError("स्वरूप तयार करण्यात त्रुटी आली");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">नवीन परिणाम स्वरूप</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="standard">
              इयत्ता
            </label>
            <select
              id="standard"
              name="standard"
              value={formData.standard}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">इयत्ता निवडा</option>
              <option value="1">इयत्ता १ ली</option>
              <option value="2">इयत्ता २ री</option>
              <option value="3">इयत्ता ३ री</option>
              <option value="4">इयत्ता ४ थी</option>
              <option value="5">इयत्ता ५ वी</option>
              <option value="6">इयत्ता ६ वी</option>
              <option value="7">इयत्ता ७ वी</option>
              <option value="8">इयत्ता ८ वी</option>
              <option value="9">इयत्ता ९ वी</option>
              <option value="10">इयत्ता १० वी</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="academicYear">
              शैक्षणिक वर्ष
            </label>
            <select
              id="academicYear"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="2024-25">2024-25</option>
              <option value="2025-26">2025-26</option>
              <option value="2026-27">2026-27</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="createdBy">
              निर्माता
            </label>
            <input
              type="text"
              id="createdBy"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700"
              disabled={loading}
            >
              रद्द करा
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "प्रक्रिया सुरू आहे..." : "तयार करा"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFormatModal;
