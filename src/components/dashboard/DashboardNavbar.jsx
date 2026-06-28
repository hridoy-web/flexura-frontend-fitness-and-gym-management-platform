"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaBars, FaSignOutAlt, FaUser } from "react-icons/fa";

const DashboardNavbar = ({ setSidebarOpen }) => {
  const { data: session } = useSession();
  const router = useRouter();

  // Handle user logout
  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  // Dynamic glow styles for different user roles
  const getRoleBadgeStyle = (role) => {
    const userRole = role?.toLowerCase();
    if (userRole === "admin") {
      return "border-rose-500/30 text-rose-400 bg-rose-500/5 shadow-[0_0_10px_rgba(244,63,94,0.15)]";
    }
    if (userRole === "trainer") {
      return "border-emerald-500/30 text-emerald-400 bg-emerald-500/5 shadow-[0_0_10px_rgba(16,185,129,0.15)]";
    }
    return "border-flexuraNeon/30 text-flexuraNeon bg-flexuraNeon/5 shadow-[0_0_10px_rgba(0,240,255,0.15)]";
  };

  return (
    <header className="h-20 w-full bg-zinc-950/40 backdrop-blur-md border-b border-zinc-900/50 flex items-center justify-between px-6 md:px-8 z-30">
      
      {/* Mobile sidebar */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2.5 -ml-2 rounded-xl lg:hidden text-zinc-400 hover:text-flexuraNeon hover:bg-zinc-900/50 transition-all duration-200"
        >
          <FaBars size={18} />
        </button>

        <div>
          <h1 className="text-sm md:text-lg font-black text-zinc-100 tracking-wider uppercase font-display leading-none">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon to-blue-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.25)]">{session?.user?.name || "Athlete"}</span>
          </h1>
          <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-black hidden sm:block mt-1.5 font-display">
            Tactical Overview & Control Panel
          </p>
        </div>
      </div>

      {/* Profile and dropdown menu controls */}
      <div className="flex items-center gap-4 md:gap-5">
        
        {/* Dynamic role badge and name for desktop navigation */}
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-zinc-200 tracking-wide uppercase font-sans">
            {session?.user?.name || "Athlete"}
          </p>
          <span className={`inline-block text-[9px] font-black uppercase tracking-widest mt-1 border px-2 py-0.5 rounded font-display ${getRoleBadgeStyle(session?.user?.role)}`}>
            {session?.user?.role || "User"}
          </span>
        </div>

        {/* Profile dropdown menu */}
        <div className="dropdown dropdown-end">
          <label 
            tabIndex={0} 
            className="btn btn-ghost btn-circle avatar ring-2 ring-zinc-900 hover:ring-flexuraNeon/40 transition-all duration-300"
          >
            <div className="w-9 rounded-full relative bg-zinc-900 flex items-center justify-center overflow-hidden">
              {session?.user?.image ? (
                <Image 
                  src={session?.user?.image} 
                  alt="Avatar" 
                  fill 
                  className="rounded-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 bg-zinc-900 rounded-full font-black text-sm">
                  <FaUser size={14} />
                </div>
              )}
            </div>
          </label>
          
          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content mt-3 p-2 shadow-2xl bg-zinc-950/95 backdrop-blur-md border border-zinc-900 rounded-2xl w-56 text-zinc-300 z-[100]"
          >
            {/* profile details and role inside dropdown */}
            <div className="px-4 py-3 border-b border-zinc-900/80">
              <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest font-display">Profile Info</p>
              <p className="text-xs font-bold text-zinc-200 mt-3 truncate font-sans">{session?.user?.name}</p>
              <p className="text-[10px] mt-1 text-zinc-400 truncate font-sans">{session?.user?.email}</p>
              <div className="mt-3">
                <span className={`inline-block text-[8px] font-black uppercase tracking-widest border px-2 py-0.5 rounded font-display ${getRoleBadgeStyle(session?.user?.role)}`}>
                  Role: {session?.user?.role || "User"}
                </span>
              </div>
            </div>
            
            <li>
              <button 
                onClick={handleLogout} 
                className="text-red-400 hover:text-red-300 hover:bg-red-500/5 font-bold text-xs py-2.5 rounded-xl uppercase tracking-widest font-display transition-colors duration-200 w-full flex items-center gap-2"
              >
                <FaSignOutAlt size={12} />
              Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;