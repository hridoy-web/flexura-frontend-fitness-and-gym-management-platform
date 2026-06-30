"use client";
import { useEffect, useState } from "react";
import { getTrainerApplications, handleTrainerApplicationAction } from "@/lib/actions/adminApiActions";

export default function TrainerApplicationsPage() {
    const [apps, setApps] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [feedback, setFeedback] = useState("");

    useEffect(() => { loadApps(); }, []);

    const loadApps = async () => {
        const data = await getTrainerApplications();
        if (data) setApps(data);
    };

    const submitAction = async (status) => {
        const res = await handleTrainerApplicationAction(selectedId, status, feedback);
        if (res.success) {
            setSelectedId(null);
            setFeedback("");
            loadApps();
        }
    };

    const selectedApp = apps.find(app => app._id === selectedId);

    return (
        <div className="space-y-8 p-6 min-h-screen bg-black text-zinc-100">
            {/* Header Section */}
            <div className="border-b border-zinc-900 pb-6">
                <h1 className="text-3xl font-black text-white font-display tracking-wider uppercase">
                    Applied <span className="text-flexuraNeon">Trainers</span>
                </h1>
                <p className="text-zinc-500 text-xs mt-1 font-sans tracking-wide">
                    Review Pending Instructor Submissions
                </p>
            </div>

            {/* Table Section */}
            <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider font-display">
                            <tr>
                                <th className="p-4 border-b border-zinc-800/80">Applicant Info</th>
                                <th className="p-4 border-b border-zinc-800/80">Experience & Core Skills</th>
                                <th className="p-4 border-b border-zinc-800/80 text-right">Evaluation</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-zinc-900 text-sm font-sans">
                            {apps.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center text-zinc-600 py-16 font-medium tracking-wide">
                                        No pending trainer applications..!
                                    </td>
                                </tr>
                            ) : (
                                apps.map((app) => (
                                    <tr 
                                        key={app._id} 
                                        className="hover:bg-zinc-900/30 transition-all duration-200 group border-b border-zinc-900"
                                    >
                                        {/* Name and Email */}
                                        <td className="p-4">
                                            <div className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                                {app.name}
                                            </div>
                                            <div className="text-xs text-zinc-500 font-mono mt-0.5">
                                                {app.email}
                                            </div>
                                        </td>

                            
                                        <td className="p-4 text-zinc-400 font-medium max-w-xs">
                                            <div className="text-zinc-200 font-semibold text-xs uppercase tracking-wider text-flexuraNeon">
                                                {app.trainerApplication?.specialty || "General"}
                                            </div>
                                            <div className="text-xs text-zinc-500 mt-0.5">
                                                Experience: {app.trainerApplication?.experience ? `${app.trainerApplication.experience} Years` : "N/A"}
                                            </div>
                                        </td>

                                        {/* Review Button */}
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => setSelectedId(app._id)} 
                                                className="inline-flex items-center justify-center bg-flexuraNeon text-zinc-950 font-black px-4 py-2 text-xs font-display tracking-widest uppercase rounded transition-all active:scale-95 hover:bg-white cursor-pointer shadow-[0_0_15px_rgba(245,245,245,0.05)]"
                                            >
                                                Review Application
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/*  Modal */}
            {selectedId && selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                    <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl relative space-y-6">
                        
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-flexuraNeon to-transparent"></div>
                        
                        {/* Modal Title */}
                        <div>
                            <h3 className="text-xl font-black text-white font-display uppercase tracking-tight">
                                Evaluation <span className="text-flexuraNeon">Statement</span>
                            </h3>
                            <p className="text-zinc-500 text-xs mt-0.5">
                                Review details and provide administrative feedback for {selectedApp.name}
                            </p>
                        </div>

                        <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-lg p-4 space-y-2">
                            <h4 className="text-xs font-bold font-display uppercase text-zinc-400 tracking-wider">Candidate Bio / Motivation:</h4>
                            <p className="text-zinc-300 text-sm leading-relaxed italic font-sans bg-zinc-950/40 p-3 rounded border border-zinc-900">
                                "{selectedApp.trainerApplication?.bio || "No description provided by the applicant."}"
                            </p>
                        </div>
                       
                        <textarea 
                            className="w-full h-24 p-3 bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-lg text-sm focus:outline-none focus:border-zinc-700 font-sans resize-none transition-all" 
                            placeholder="Write administrative feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button 
                                onClick={() => setSelectedId(null)} 
                                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer"
                            >
                                Close
                            </button>
                            <button 
                                onClick={() => submitAction('rejected')} 
                                className="px-4 py-2 bg-red-600/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-black text-xs font-bold font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.15)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                            >
                                Reject
                            </button>
                            <button 
                                onClick={() => submitAction('approved')} 
                                className="px-4 py-2 bg-emerald-600/20 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black text-xs font-bold font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.15)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}