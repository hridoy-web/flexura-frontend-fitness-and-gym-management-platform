"use client";
import { useEffect, useState } from "react";
import { getActiveTrainers, demoteTrainer } from "@/lib/actions/adminApiActions";

export default function ManageTrainersPage() {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => { loadTrainers(); }, []);

    const loadTrainers = async () => {
        const data = await getActiveTrainers();
        if (data) setTrainers(data);
    };

    const handleDemote = async (id) => {
        const res = await demoteTrainer(id);
        if (res.success) {
            loadTrainers();
        }
    };

    return (
        <div className="space-y-8 p-6 min-h-screen bg-black text-zinc-100">
            {/* Header Section */}
            <div className="border-b border-zinc-900 pb-6">
                <h1 className="text-3xl font-black text-white font-display tracking-wider uppercase">
                    Manage <span className="text-flexuraNeon">Trainers</span>
                </h1>
                <p className="text-zinc-500 text-xs mt-1 font-sans tracking-wide">
                    Active Network Instructors Registry and Professional Level Demotion Control
                </p>
            </div>

          
            <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                    
                        <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider font-display">
                            <tr>
                                <th className="p-4 border-b border-zinc-800/80">Trainer Information</th>
                                <th className="p-4 border-b border-zinc-800/80 text-right">Action Authority</th>
                            </tr>
                        </thead>

               
                        <tbody className="divide-y divide-zinc-900 text-sm font-sans">
                            {trainers.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="text-center text-zinc-600 py-16 font-medium tracking-wide">
                                        No active trainers located in network registries.
                                    </td>
                                </tr>
                            ) : (
                                trainers.map((t) => (
                                    <tr 
                                        key={t._id} 
                                        className="hover:bg-zinc-900/30 transition-all duration-200 group border-b border-zinc-900"
                                    >
                                        {/* Trainer Name & Email */}
                                        <td className="p-4">
                                            <div className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                                {t.name}
                                            </div>
                                            <div className="text-xs text-zinc-500 font-mono mt-0.5">
                                                {t.email}
                                            </div>
                                        </td>

                                 
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => handleDemote(t._id)} 
                                                className="inline-flex items-center justify-center bg-red-600/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-black font-bold px-4 py-2 text-xs font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.15)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                            >
                                                Demote to User
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}