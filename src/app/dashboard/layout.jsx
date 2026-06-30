
// import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
// import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
// import { useState } from "react";

// const DashboardLayout = async ({ children }) => {

//   const session = await auth.api.getSession({ headers: await headers() });

//   console.log('dashboard layout session', session?.user?.role);

//   if (!session) {
//     console.log('no session in layout, redirecting to login');
//     redirect('/login');
//   }

//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
//       {/* Sidebar */}
//       <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">

//         {/* Top Navbar */}
//         <DashboardNavbar setSidebarOpen={setSidebarOpen} />

//         {/* Dynamic Page Content */}
//         <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-zinc-900/40 custom-scrollbar">
//           <div className="max-w-7xl mx-auto space-y-6">
//             {children}
//           </div>

//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log('dashboard layout session', session?.user?.role);
  console.log('session pending', isPending);

  useEffect(() => {
    if (!isPending && !session) {
      console.log('no session in layout, redirecting to login');
      router.replace('/login');
    }
  }, [isPending, session, router]);

  if (isPending) {
    return null;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar setSidebarOpen={setSidebarOpen} />
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