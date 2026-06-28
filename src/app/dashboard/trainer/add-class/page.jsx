"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { addTrainerClass } from "@/lib/actions/trainerDashboardApi";
import { FaPlusCircle, FaDumbbell, FaList, FaLevelUpAlt, FaClock, FaCalendar, FaDollarSign, FaPen, FaSpinner, FaCloudUploadAlt } from "react-icons/fa";
import { imageUpload } from "@/lib/imageUpload";

export default function AddClassPage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        className: "",
        image: "",
        category: "Home Workout",
        difficultyLevel: "Intermediate",
        duration: "",
        scheduleDays: [],
        time: "",
        price: "",
        description: ""
    });

    const availableDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const customCategories = [
        "Home Workout",
        "Six Pack",
        "Fat Loss",
        "Yoga",
        "Cardio",
        "Calisthenics"
    ];

    const handleDaySelect = (day) => {
        const updated = formData.scheduleDays.includes(day)
            ? formData.scheduleDays.filter((d) => d !== day)
            : [...formData.scheduleDays, day];
        setFormData({ ...formData, scheduleDays: updated });
    };

    // imageUpload function
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            const uploadData = await imageUpload(file);
            if (uploadData && uploadData.url) {
                setFormData({ ...formData, image: uploadData.url });
            }
        } catch (err) {
            console.error("Image upload failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session?.user?.email) return;

        setLoading(true);
        try {
            const res = await addTrainerClass({
                ...formData,
                trainerEmail: session.user.email,
                trainerName: session.user.name
            });
            if (res.success) {
                setSuccess(true);
                setFormData({
                    className: "",
                    image: "",
                    category: "Home Workout",
                    difficultyLevel: "Intermediate",
                    duration: "",
                    scheduleDays: [],
                    time: "",
                    price: "",
                    description: ""
                });
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-wider uppercase font-display">Deploy New Class</h1>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1.5 font-display">Schedules will be active post Admin approval</p>
            </div>

            {success && (              
                < div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 font-display text-xs uppercase tracking-widest font-black">
            Class deployed successfully and pending Admin validation!
        </div>
    ) 
}

<form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 space-y-6 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-500 to-teal-500" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Class Name */}
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaDumbbell className="text-emerald-400" /> Class Name</label>
            <input type="text" required placeholder="e.g. Iron Shred 101" value={formData.className} onChange={(e) => setFormData({ ...formData, className: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-emerald-500/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 focus:outline-none transition" />
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaList className="text-emerald-400" /> Category</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-emerald-500/50 rounded-xl px-4 py-3.5 text-sm text-zinc-300 focus:outline-none transition">
                {customCategories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
        </div>

        {/* Image Upload Area */}
        <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaCloudUploadAlt className="text-emerald-400" /> Class Image Cover</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload-input" />
                    <label htmlFor="image-upload-input" className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 hover:border-emerald-500/40 bg-zinc-900/20 rounded-xl p-6 cursor-pointer text-center group transition">
                        <FaCloudUploadAlt className="text-zinc-500 group-hover:text-emerald-400 text-3xl mb-2 transition" />
                        <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-200">Click to upload class poster</span>

                    </label>
                </div>
                {formData.image && (
                    <div className="relative w-full sm:w-44 h-28 rounded-xl border border-zinc-900 bg-zinc-900 overflow-hidden shrink-0">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
        </div>

        {/* Difficulty Level */}
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaLevelUpAlt className="text-emerald-400" /> Difficulty Level</label>
            <select value={formData.difficultyLevel} onChange={(e) => setFormData({ ...formData, difficultyLevel: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-emerald-500/50 rounded-xl px-4 py-3.5 text-sm text-zinc-300 focus:outline-none transition">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
        </div>

        {/* Duration */}
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaClock className="text-emerald-400" /> Duration (mins)</label>
            <input type="number" required placeholder="e.g. 60" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-emerald-500/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 focus:outline-none transition" />
        </div>

        {/* Class Time */}
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaClock className="text-emerald-400" /> Time Slot</label>
            <input type="text" required placeholder="e.g. 08:00 AM" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-emerald-500/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 focus:outline-none transition" />
        </div>

        {/* Price */}
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaDollarSign className="text-emerald-400" /> Price Tag ($)</label>
            <input type="number" step="0.01" required placeholder="e.g. 29.99" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-emerald-500/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 focus:outline-none transition" />
        </div>

        {/* Schedule Days */}
        <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaCalendar className="text-emerald-400" /> Weekly Schedule Days</label>
            <div className="flex flex-wrap gap-2 pt-1">
                {availableDays.map((day) => {
                    const selected = formData.scheduleDays.includes(day);
                    return (
                        <button type="button" key={day} onClick={() => handleDaySelect(day)} className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide border transition-all ${selected ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "border-zinc-900 bg-zinc-900/30 text-zinc-500 hover:border-zinc-800"}`}>
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Description */}
        <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaPen className="text-emerald-400" /> Description Matrix</label>
            <textarea required rows={4} placeholder="Summarize class telemetry and details..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-emerald-500/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 focus:outline-none transition resize-none" />
        </div>
    </div>

    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/25 transition-all text-emerald-400 text-xs font-black tracking-widest uppercase font-display disabled:opacity-50">
        {loading ? <FaSpinner className="animate-spin text-emerald-400" size={14} /> : <><FaPlusCircle size={12} /> Deploy Class</>}
    </button>
</form>
    </div >
  );
}