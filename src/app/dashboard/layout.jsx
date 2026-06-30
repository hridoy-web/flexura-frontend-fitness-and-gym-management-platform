"use client"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useState } from "react";

const DashboardLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <DashboardNavbar setSidebarOpen={setSidebarOpen} />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-zinc-900/40 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>

        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;