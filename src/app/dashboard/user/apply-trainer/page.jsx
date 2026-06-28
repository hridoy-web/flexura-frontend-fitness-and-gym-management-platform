"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { applyAsTrainer } from "@/lib/actions/userDashboardApi";
import { FaPaperPlane, FaBriefcase, FaGraduationCap, FaPenNib, FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function ApplyTrainerPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ experience: "", specialty: "", bio: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    setLoading(true);
    try {
      const result = await applyAsTrainer({
        email: session.user.email,
        experience: formData.experience,
        specialty: formData.specialty,
        bio: formData.bio
      });

      if (result?.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 bg-zinc-950/40 border border-zinc-900 rounded-2xl max-w-2xl mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <FaCheckCircle className="text-flexuraNeon text-5xl mb-4 drop-shadow-[0_0_10px_#00F0FF]" />
        <h2 className="text-xl font-black text-zinc-100 uppercase tracking-widest font-display">Transmission Successful</h2>
        <p className="text-xs text-zinc-500 mt-4 max-w-md uppercase tracking-wider leading-relaxed">Your credentials have been successfully uploaded. The board admins will verify your background shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-wider uppercase font-display">Trainer Application</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-display">Elevate status to certified platform instructor</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-flexuraNeon to-flexuraPurple" />
        
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaBriefcase className="text-flexuraNeon" /> Total Experience (Years)</label>
          <input type="number" required min="0" placeholder="e.g. 5" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-flexuraNeon/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 focus:outline-none transition-all duration-300" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaGraduationCap className="text-flexuraNeon" /> Training Specialty Focus</label>
          <select required value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-flexuraNeon/50 rounded-xl px-4 py-3.5 text-sm text-zinc-300 focus:outline-none transition-all duration-300">
            <option value="" disabled>Select Your Category</option>
            <option value="Yoga & Mindfulness">Yoga & Mindfulness</option>
            <option value="Strength & Powerlifting">Strength & Powerlifting</option>
            <option value="Cardio & HIIT">Cardio</option>
            <option value="Bodybuilding">Bodybuilding</option>
            <option value="Calisthenics">Calisthenics</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaPenNib className="text-flexuraNeon" /> Bio & Motivation Statement</label>
          <textarea required rows="5" placeholder="Tell us about your fitness philosophy..." value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-flexuraNeon/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 focus:outline-none transition-all duration-300 resize-none" />
        </div>

        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-flexuraNeon/20 bg-flexuraNeon/10 hover:bg-flexuraNeon/25 transition-all text-flexuraNeon text-xs font-black tracking-widest uppercase font-display disabled:opacity-50">
          {loading ? <FaSpinner className="text-flexuraNeon animate-spin" size={14} /> : <><FaPaperPlane size={11} /> Submit Application</>}
        </button>
      </form>
    </div>
  );
}