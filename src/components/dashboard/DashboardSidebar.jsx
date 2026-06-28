"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
    FaChartPie,
    FaTicketAlt,
    FaUserPlus,
    FaHeart,
    FaPlusCircle,
    FaDumbbell,
    FaPlusSquare,
    FaNewspaper,
    FaShieldAlt,
    FaUsers,
    FaIdCard,
    FaUserTimes,
    FaCheckSquare,
    FaReceipt,
    FaComments,
    FaHome,
    FaTimes
} from "react-icons/fa";

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();
    const { data: session, isPending } = useSession();

    const isActive = (path) => pathname === path;

    const userLinks = [
        { name: "Overview", path: "/dashboard/user", icon: FaChartPie },
        { name: "Booked Classes", path: "/dashboard/user/booked-classes", icon: FaTicketAlt },
        { name: "Apply as Trainer", path: "/dashboard/user/apply-trainer", icon: FaUserPlus },
        { name: "Favorite Classes", path: "/dashboard/user/favorites", icon: FaHeart },
    ];

    const trainerLinks = [
        { name: "Overview", path: "/dashboard/trainer", icon: FaChartPie },
        { name: "Add Class", path: "/dashboard/trainer/add-class", icon: FaPlusCircle },
        { name: "My Classes", path: "/dashboard/trainer/my-classes", icon: FaDumbbell },
        { name: "Add Forum Post", path: "/dashboard/trainer/add-forum", icon: FaPlusSquare },
        { name: "My Forum Posts", path: "/dashboard/trainer/my-forums", icon: FaNewspaper },
    ];

    const adminLinks = [
        { name: "Overview", path: "/dashboard/admin", icon: FaShieldAlt },
        { name: "Manage Users", path: "/dashboard/admin/manage-users", icon: FaUsers },
        { name: "Applied Trainers", path: "/dashboard/admin/applied-trainers", icon: FaIdCard },
        { name: "Manage Trainers", path: "/dashboard/admin/manage-trainers", icon: FaUserTimes },
        { name: "Manage Classes", path: "/dashboard/admin/manage-classes", icon: FaCheckSquare },
        { name: "Add Forum Post", path: "/dashboard/admin/add-forum", icon: FaPlusSquare },
        { name: "Transactions", path: "/dashboard/admin/transactions", icon: FaReceipt },
        { name: "Forum Post Manage", path: "/dashboard/admin/manage-forums", icon: FaComments },
    ];

    // dashboard path
    const getActiveDashboardLinks = () => {
        if (pathname.startsWith("/dashboard/admin")) return adminLinks;
        if (pathname.startsWith("/dashboard/trainer")) return trainerLinks;
        return userLinks;
    };

    const currentLinks = getActiveDashboardLinks();

    const getRoleBadgeStyle = () => {
        if (pathname.startsWith("/dashboard/admin")) {
            return "border-rose-500/30 text-rose-400 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.15)] font-display";
        }
        if (pathname.startsWith("/dashboard/trainer")) {
            return "border-emerald-500/30 text-emerald-400 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-display";
        }
        return "border-flexuraNeon/30 text-flexuraNeon bg-flexuraNeon/5 shadow-[0_0_15px_rgba(0,240,255,0.15)] font-display";
    };

    const getRoleText = () => {
        if (pathname.startsWith("/dashboard/admin")) return "Admin";
        if (pathname.startsWith("/dashboard/trainer")) return "Trainer";
        return "User";
    };

    return (
        <>
            {/* Mobile Sidebar */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden" onClick={() => setIsOpen(false)} />
            )}

            <aside className={`fixed inset-y-0 left-0 w-72 bg-zinc-950 border-r border-zinc-900/80 flex flex-col justify-between shrink-0 z-50 transition-all duration-300 lg:translate-x-0 lg:static ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div>
                    
                    <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-900/50">
                        <Link href="/" className="flex items-center gap-3">
                            <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon via-flexuraPurple to-indigo-500 font-display uppercase">
                                FLEX<span className="text-zinc-100 font-bold">URA</span>
                            </span>
                            <span className={`text-[9px] font-black uppercase tracking-widest py-1 px-2.5 rounded border ${getRoleBadgeStyle()}`}>
                                {isPending ? "..." : getRoleText()}
                            </span>
                        </Link>

                        <button onClick={() => setIsOpen(false)} className="lg:hidden text-zinc-500 hover:text-flexuraNeon transition-colors duration-200">
                            <FaTimes size={18} />
                        </button>
                    </div>

                    <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
                        <div className="px-3 mb-3 text-[10px] font-black text-zinc-600 uppercase tracking-widest font-display">
                            Main Control Panel
                        </div>

                        {currentLinks.map((link) => {
                            const IconComponent = link.icon;
                            const active = isActive(link.path);
                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 group font-bold text-sm border relative ${active
                                        ? "bg-zinc-900/40 text-flexuraNeon border-flexuraNeon/20 shadow-[0_0_20px_rgba(0,240,255,0.06)]"
                                        : "text-zinc-400 hover:bg-zinc-900/20 hover:text-zinc-100 border-transparent"
                                        }`}
                                >
                                    {active && (
                                        <div className="absolute left-0 w-[4px] h-1/2 bg-flexuraNeon rounded-r-md shadow-[0_0_12px_#00F0FF]" />
                                    )}
                                    <IconComponent
                                        size={16}
                                        className={`transition-all duration-300 group-hover:scale-110 ${active ? "text-flexuraNeon drop-shadow-[0_0_5px_#00F0FF]" : "text-zinc-500 group-hover:text-zinc-300"
                                            }`}
                                    />
                                   
                                    <span className="font-display uppercase text-[11px] tracking-widest">{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Back Home  */}
                <div className="p-4 border-t border-zinc-900/50 bg-zinc-950">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-zinc-900 hover:border-flexuraNeon/30 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all text-zinc-400 hover:text-flexuraNeon text-xs font-black tracking-widest uppercase font-display"
                    >
                        <FaHome size={13} />
                        Back to Home
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default DashboardSidebar;
