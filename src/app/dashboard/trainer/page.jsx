"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getTrainerOverview } from "@/lib/actions/trainerDashboardApi";
import { FaDumbbell, FaUsers, FaNewspaper, FaUserCircle, FaSpinner } from "react-icons/fa";
import Image from "next/image";

export default function TrainerDashboardHomePage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      if (!session?.user?.email) return;
      try {
        setLoading(true);
        const data = await getTrainerOverview(session.user.email);
        if (data) setStats(data);
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
        <p className="text-zinc-500 text-xs font-display uppercase tracking-widest animate-pulse">Preparing your workspace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-wider uppercase font-display">Trainer workspace</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1.5 font-display font-black text-emerald-400">Authorized Personnel Only</p>
      </div>

      {/* Visual Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="relative group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-display">Classes Created</p>
              <h3 className="text-4xl font-black text-zinc-100 font-display mt-2 group-hover:text-emerald-400 transition-colors">{stats?.totalClasses || 0}</h3>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 text-emerald-400 border border-zinc-800"><FaDumbbell size={20} /></div>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-flexuraNeon/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-display">Students Enrolled</p>
              <h3 className="text-4xl font-black text-zinc-100 font-display mt-2 group-hover:text-flexuraNeon transition-colors">{stats?.totalStudents || 0}</h3>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 text-flexuraNeon border border-zinc-800"><FaUsers size={20} /></div>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-flexuraPurple/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-display">Forum Contributions</p>
              <h3 className="text-4xl font-black text-zinc-100 font-display mt-2 group-hover:text-flexuraPurple transition-colors">{stats?.totalForumPosts || 0}</h3>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 text-flexuraPurple border border-zinc-800"><FaNewspaper size={20} /></div>
          </div>
        </div>
      </div>

      {/* Profile Details Panel */}
      <div className="max-w-xl rounded-2xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-24 h-24 rounded-full border-2 border-emerald-500/20 p-1 bg-zinc-950 overflow-hidden">
            {session?.user?.image ? (
              <Image src={session.user.image} alt="Avatar" fill className="rounded-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600"><FaUserCircle size={60} /></div>
            )}
          </div>
          <div className="text-center sm:text-left space-y-2">
            <span className="inline-block text-[9px] text-emerald-400 font-black uppercase tracking-widest border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-500/5 shadow-[0_0_10px_rgba(16,185,129,0.1)] font-display">
              Verified Trainer
            </span>
            <h4 className="text-xl font-black text-zinc-100 uppercase tracking-wide font-display">{session?.user?.name}</h4>
            <p className="text-sm text-zinc-400 font-sans">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}