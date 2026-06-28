"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getUserOverview } from "@/lib/actions/userDashboardApi";
import { FaBookmark, FaHeart, FaUserAlt, FaHourglassHalf, FaTimesCircle, FaCheckCircle, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function UserOverviewPage() {
    const { data: session } = useSession();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverview = async () => {
            if (!session?.user?.email) return;
            try {
                setLoading(true);
                const result = await getUserOverview(session.user.email);
                if (result) setData(result);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOverview();
    }, [session]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <FaSpinner className="text-flexuraNeon animate-spin text-4xl" />
                <p className="text-zinc-400 text-xs font-display uppercase tracking-widest animate-pulse">Preparing your workspace...</p>
            </div>
        );
    }

    const stats = data?.stats || { totalBooked: 0, totalFavorites: 0 };
    const profile = data?.profile || session?.user;
    const application = data?.trainerApplication || { status: "none", feedback: null };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-wider uppercase font-display">Overview Matrix</h1>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-display">Personal fitness statistics and credentials</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-display">Total Booked Classes</p>
                            <h3 className="text-4xl font-black text-zinc-100 font-display mt-2">{stats.totalBooked}</h3>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-900/60 text-flexuraNeon border border-zinc-800"><FaBookmark className="text-xl" /></div>
                    </div>
                </div>

                <div className="relative group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-display">Total Favorites</p>
                            <h3 className="text-4xl font-black text-zinc-100 font-display mt-2">{stats.totalFavorites}</h3>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-900/60 text-flexuraPurple border border-zinc-800"><FaHeart className="text-xl" /></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-flexuraNeon to-flexuraPurple" />
                    <div className="relative w-24 h-24 rounded-full border-2 border-zinc-800 p-1 bg-zinc-950 mb-4 overflow-hidden">
                        {profile?.image ? <Image src={profile.image} alt="Avatar" fill className="rounded-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-full text-zinc-500"><FaUserAlt size={35} /></div>}
                    </div>
                    <h4 className="text-lg font-black text-zinc-100 font-display uppercase tracking-wide">{profile?.name || "Athlete"}</h4>
                    <p className="text-xs text-zinc-500 truncate w-full mt-1">{profile?.email}</p>
                    <span className="badge badge-sm mt-4 bg-flexuraNeon/10 border-flexuraNeon/30 text-flexuraNeon font-black uppercase tracking-widest py-3 px-4 rounded-md font-display text-[10px]">Role: {profile?.role || "User"}</span>
                </div>

                <div className="lg:col-span-2 rounded-2xl border border-zinc-900 bg-zinc-950 p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 font-display mb-4">Trainer Application Status</h4>
                        {application.status === "pending" && (
                            <div className="flex items-start gap-4 p-4 rounded-xl border border-yellow-500/10 bg-yellow-500/5 text-yellow-500">
                                <FaHourglassHalf className="text-2xl shrink-0 mt-0.5 animate-pulse" />
                                <div>
                                    <h5 className="font-bold text-sm uppercase font-display tracking-wider">Status: Pending</h5>
                                    <p className="text-xs leading-relaxed text-zinc-300 mt-1 ">Your trainer application has been submitted successfully.
                                        Our administrative team will review and verify your information shortly.
                                    </p>
                                </div>
                            </div>
                        )}
                        {application.status === "rejected" && (
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-red-500">
                                    <FaTimesCircle className="text-2xl shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="font-bold text-sm uppercase font-display tracking-wider">Status: Rejected</h5>
                                        <p className="text-xs text-zinc-400 mt-1">Unfortunately, your application did not meet our verification standards.</p>
                                    </div>
                                </div>
                                {application.feedback && (
                                    <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/40">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-display">Feedback:</p>
                                        <p className="text-sm text-zinc-300 mt-1.5 italic">"{application.feedback}"</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {application.status === "approved" && (
                            <div className="flex items-start gap-4 p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-500">
                                <FaCheckCircle className="text-2xl shrink-0 mt-0.5" />
                                <div>
                                    <h5 className="font-bold text-sm uppercase font-display tracking-wider">Status: Approved</h5>
                                    <p className="text-xs text-zinc-400 mt-1">Congratulations! You are now a verified instructor on Flexura network.</p>
                                </div>
                            </div>
                        )}
                        {application.status === "none" && (
                            <div className="flex flex-col items-center justify-center py-6 text-center text-zinc-500">
                                <p className="text-xs uppercase tracking-wider font-semibold">No active trainer application registered.</p>
                                <Link href="/dashboard/user/apply-trainer" className="mt-3 px-4 py-2 border border-zinc-800 hover:border-flexuraNeon/30 hover:text-flexuraNeon rounded-xl text-xs font-black uppercase tracking-widest font-display transition duration-300">Start Application</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}