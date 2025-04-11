import React from "react";
import { cn } from "@/lib/utils";

const DashboardLayout = ({
  children,
  title = "मराठी परिणाम व्यवस्थापन प्रणाली",
  subtitle = "विद्यार्थ्यांचे सर्वांगीण मूल्यांकन",
}) => {
  return (
    <div className="min-h-screen bg-custom-light">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-10 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-xl md:text-2xl font-bold text-custom-dark">
                {title}
              </h1>
              <p className="text-custom-dark/60 text-sm md:text-base">
                {subtitle}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="glass-effect rounded-full p-2 px-4 text-sm text-custom-dark/80">
                शिक्षक पॅनल
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="border-t border-custom-secondary/50 py-4 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-custom-dark/60">
            © 2023 मराठी परिणाम व्यवस्थापन प्रणाली. सर्व हक्क राखीव.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
