import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gurukulLogo, hindaviLogo, logo } from "../assets/images";
import { authAPI } from "../services/api";

const Home = () => {
 const [userRole, setUserRole] = useState(null);
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const { data } = await authAPI.verify();
          setUserRole(data.role);
        } catch (error) {
          console.log("User not logged in or error verifying auth");
          setUserRole(null);
        }
      };

      checkAuth();
    }, []);

    // Function to determine dashboard path based on role
    const getDashboardPath = () => {
      if (userRole === "hindavi") return "/dashboard-hindavi";
      if (userRole === "gurukul") return "/dashboard-gurukul";
      return "/login"; // Default to login if no role or not logged in
    };
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 overflow-x-hidden font-['Poppins']">
      {/* Navigation - Modern Glass Morphism */}
      <nav className="bg-white/70 backdrop-blur-lg shadow-sm border-b border-purple-100/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <img
                src={hindaviLogo}
                alt="Hindavi Logo"
                className="h-12 w-auto transition-all duration-300 hover:scale-110"
              />
              <span className="text-xl p-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                हिंदवी पब्लिक स्कूल
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {["मुख्यपृष्ठ", "आमच्याबद्दल", "पंचकोश", "गॅलरी", "संपर्क"].map(
                (item) => (
                  <Link
                    key={item}
                    to="/"
                    className="text-purple-800 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    {item}
                  </Link>
                )
              )}
              <Link
                to={getDashboardPath()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 hover:scale-105"
              >
                डॅशबोर्ड
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern Gradient + Floating Elements */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center bg-transparent">
                <img
                  src={hindaviLogo}
                  alt="Hindavi Logo"
                  className="h-14 w-auto mr-4"
                />
                <div className="h-10 w-0.5 bg-gradient-to-b from-purple-300 to-blue-300 mr-4"></div>
                <h3 className="text-transparent  bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-medium text-lg">
                  श्रीनिधी एज्युकेशन सोसायटी, सातारा
                </h3>
              </div>

              <h3 className="text-3xl  md:text-3xl lg:text-3xl  text-gray-900 leading-tight">
                हिंदवी पब्लिक स्कूल
              </h3>
              <h2 className="text-4xl md:text-4xl  bg-clip-text font-bold bg-gradient-to-r from-purple-500 to-blue-500">
                हिंदवी पंचकोशाधारित गुरुकुल
              </h2>

              <p className="text-gray-600 text-lg max-w-2xl">
                आमचे गुरुकुल पंचकोश तत्त्वज्ञानावर आधारित आहे - अन्नमयकोश,
                प्राणमयकोश, मनोमयकोश, विज्ञानमयकोश आणि आनंदमयकोश या पाच घटकांचा
                समतोल विकास करणारी अभिनव शिक्षण पद्धती.
              </p>

              <div className="flex space-x-5 pt-4">
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 hover:scale-105">
                  डॅशबोर्ड
                </button>
                <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                  <span>डेमो पहा</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-400 to-blue-500 rounded-3xl opacity-20 blur-3xl "></div>
              <div className="relative z-10 group">
                <img
                  src={logo}
                  alt="Student Meditation"
                  className="relative z-20 max-h-[500px] transform transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section - Floating Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-transparent p-2 bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-16">
            पंचकोशाधारित शिक्षण
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="col-span-1 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                <img
                  src={hindaviLogo}
                  alt="School Logo"
                  className="relative z-10 max-h-[280px] transform transition-all duration-500 group-hover:-translate-y-2"
                />
              </div>
            </div>

            <div className="col-span-1 flex justify-center items-center">
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  ॥ स्वयमेव मृगेंद्रता ॥
                </h3>
                <p className="text-gray-600 text-lg">
                  पंचकोश पद्धतीने विद्यार्थ्यांचा सर्वांगीण विकास हेच आमचे
                  उद्दिष्ट
                </p>

                <div className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-600 rounded-full text-purple-600 bg-white hover:bg-purple-50 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
                  <span className="font-medium">
                    श्रीनिधी एज्युकेशन सोसायटी, सातारा
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-1 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                <img
                  src={gurukulLogo}
                  alt="Panchakosha Chart"
                  className="relative z-10 max-h-[280px] transform transition-all duration-500 group-hover:-translate-y-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Card Grid */}
      <section className="py-20 bg-gradient-to-b from-purple-50/50 to-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-transparent p-2 bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
              पंचकोश शिक्षणाचे पैलू
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              आमच्या अभिनव शिक्षण पद्धतीचे मूलभूत स्तंभ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "अन्नमयकोश",
                desc: "शारीरिक शिक्षण आणि आरोग्यावर लक्ष केंद्रित करते. यामध्ये योग्य आहार, व्यायाम, योगासने आणि क्रीडा समाविष्ट आहेत.",
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "प्राणमयकोश",
                desc: "प्राणायाम आणि श्वासोच्छवास व्यायामांद्वारे ऊर्जेचे व्यवस्थापन आणि निर्णय क्षमता विकसित करण्यावर भर देते.",
                color: "from-green-500 to-green-600",
              },
              {
                title: "मनोमयकोश",
                desc: "मनाचे प्रशिक्षण, एकाग्रता वाढवणे आणि भावनिक बुद्धिमत्ता विकसित करण्यासाठी मार्गदर्शन करते.",
                color: "from-yellow-500 to-yellow-600",
              },
              {
                title: "विज्ञानमयकोश",
                desc: "बौद्धिक क्षमता, विवेक आणि निर्णय क्षमता विकसित करण्यावर भर देते.",
                color: "from-purple-500 to-purple-600",
              },
              {
                title: "आनंदमयकोश",
                desc: "आंतरिक आनंद, शांती आणि स्वतःच्या सर्वोच्च क्षमतेचा शोध घेण्यास मदत करते.",
                color: "from-red-500 to-red-600",
              },
              {
                title: "एकात्मिक विकास",
                desc: "सर्व पाच कोशांचा एकत्रित विकास करून विद्यार्थ्यांचे संपूर्ण व्यक्तिमत्व घडवणे.",
                color: "from-pink-500 to-pink-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient Background */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              आमच्या गुरुकुल पद्धतीचा अनुभव घ्या
            </h2>
            <p className="text-xl text-purple-100 mb-10">
              पंचकोश पद्धतीवर आधारित आमच्या अभिनव शिक्षण पद्धतीद्वारे आपल्या
              मुलांना संपूर्ण विकासाची संधी द्या.
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 hover:scale-105">
                प्रवेश प्रक्रिया
              </button>
              <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-200/30 hover:scale-105">
                भेट द्या
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Modern Glass Morphism */}
      <footer className="bg-white/80 backdrop-blur-lg border-t border-purple-100/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img
                src={hindaviLogo}
                alt="Hindavi Public School Logo"
                className="h-12 w-auto mr-4"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  हिंदवी पब्लिक स्कूल
                </h3>
                <p className="text-gray-600">
                  श्रीनिधी एज्युकेशन सोसायटी, सातारा
                </p>
              </div>
            </div>

            <div className="text-center md:text-right space-y-2">
              <p className="text-gray-600">
                संपर्क: info@hindavipublicschool.in
              </p>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} हिंदवी पब्लिक स्कूल. सर्व हक्क
                राखीव.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
