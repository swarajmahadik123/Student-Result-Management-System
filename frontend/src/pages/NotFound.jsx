import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">४०४</h1>
        <p className="text-xl text-gray-800 mb-6">अरेरे! पृष्ठ सापडले नाही</p>
        <p className="text-gray-600 mb-8">
          आपण शोधत असलेले पृष्ठ अस्तित्वात नाही किंवा हलवले गेले असू शकते.
        </p>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>मुख्यपृष्ठावर परत जा</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
