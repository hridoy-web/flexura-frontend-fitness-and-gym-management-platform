"use client";
import { useEffect, useState } from "react";
import { getTrainerClasses, handleClassStatus, deleteClass } from "@/lib/actions/adminApiActions";

export default function ManageClassesPage() {
    const [classesList, setClassesList] = useState([]);
    const [deleteId, setDeleteId] = useState(null); // কাস্টম মোডালের জন্য স্টেট

    useEffect(() => { loadClasses(); }, []);

    const loadClasses = async () => {
        const data = await getTrainerClasses();
        if (data) setClassesList(data);
    };

    const updateStatus = async (id, status) => {
        const res = await handleClassStatus(id, status);
        if (res.success) loadClasses();
    };

    const triggerDeleteModal = (id) => {
        setDeleteId(id); // ডিলিট আইডি সেট করে মোডাল ওপেন করা
    };

    const confirmDelete = async () => {
        if (deleteId) {
            const res = await deleteClass(deleteId);
            if (res.success) {
                loadClasses();
            }
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-8 p-6 min-h-screen bg-black text-zinc-100">
            {/* Header Section */}
            <div className="border-b border-zinc-900 pb-6">
                <h1 className="text-3xl font-black text-white font-display tracking-wider uppercase">
                    Manage <span className="text-flexuraNeon">Classes</span>
                </h1>
                <p className="text-zinc-500 text-xs mt-1 font-sans tracking-wide">
                    Approve, Reject or Permanently Remove Program Schedules and Training Slots
                </p>
            </div>

            {/* Custom Modern Table Wrapper (No daisyUI) */}
            <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        {/* Custom Pure Tailwind Table Header */}
                        <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider font-display">
                            <tr>
                                <th className="p-4 border-b border-zinc-800/80">Class Title</th>
                                <th className="p-4 border-b border-zinc-800/80">Status Indicator</th>
                                <th className="p-4 border-b border-zinc-800/80 text-right">Actions Panel</th>
                            </tr>
                        </thead>

                        {/* Table Body with glassy rows */}
                        <tbody className="divide-y divide-zinc-900 text-sm font-sans">
                            {classesList.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center text-zinc-600 py-16 font-medium tracking-wide">
                                        No program schedules located in databases.
                                    </td>
                                </tr>
                            ) : (
                                classesList.map((c) => (
                                    <tr 
                                        key={c._id} 
                                        className="hover:bg-zinc-900/30 transition-all duration-200 group border-b border-zinc-900"
                                    >
                                        {/* Class Title */}
                                        <td className="p-4 font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                            {c.title || c.className}
                                        </td>

                                        {/* Status Layout with Neon Dots */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span 
                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                        c.status === 'approved' 
                                                            ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' 
                                                            : c.status === 'rejected' 
                                                            ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
                                                            : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                                                    }`}
                                                ></span>
                                                <span className={`text-xs font-bold tracking-wide uppercase ${
                                                    c.status === 'approved' ? 'text-emerald-400' : c.status === 'rejected' ? 'text-red-400' : 'text-amber-400'
                                                }`}>
                                                    {c.status || 'pending'}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Highly Visible and Responsive Action Buttons Panel */}
                                        <td className="p-4 text-right space-x-2">
                                            <button 
                                                onClick={() => updateStatus(c._id, 'approved')} 
                                                className="inline-flex items-center justify-center bg-emerald-600/20 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black font-bold px-3 py-1.5 text-xs font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                            >
                                                Approve
                                            </button>
                                            
                                            <button 
                                                onClick={() => updateStatus(c._id, 'rejected')} 
                                                className="inline-flex items-center justify-center bg-amber-600/20 border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-bold px-3 py-1.5 text-xs font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.1)] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                                            >
                                                Reject
                                            </button>

                                            <button 
                                                onClick={() => triggerDeleteModal(c._id)} 
                                                className="inline-flex items-center justify-center bg-red-600/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-black font-bold px-3 py-1.5 text-xs font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
                    <div className="max-w-sm w-full bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl relative space-y-6">
                        {/*  Glow Line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                        
                        {/* Modal */}
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-black text-white font-display uppercase tracking-wider">
                                Delete <span className="text-red-500">Action !</span>
                            </h3>
                            <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                                Are you sure you want to permanently delete this training class? This data entry cannot be restored.
                            </p>
                        </div>

                        {/* Action Layout */}
                        <div className="flex items-center justify-center gap-3 pt-2">
                            <button 
                                onClick={() => setDeleteId(null)} 
                                className="w-1/2 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete} 
                                className="w-1/2 py-2.5 bg-red-600 border border-red-500 text-white hover:bg-red-700 text-xs font-bold font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}