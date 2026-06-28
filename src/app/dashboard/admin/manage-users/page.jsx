"use client";
import { useEffect, useState } from "react";
import { getAllUsers, handleUserAction } from "@/lib/actions/adminApiActions";

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await getAllUsers();
        if (data) setUsers(data);
    };

    const triggerAction = async (id, type) => {
        const res = await handleUserAction(id, type);
        if (res.success) {
            loadUsers();
        }
    };

    return (
        <div className="space-y-8 p-6 min-h-screen bg-black text-zinc-100">
   
            <div className="border-b border-zinc-900 pb-6">
                <h1 className="text-3xl font-black text-white font-display tracking-wider uppercase">
                    Manage <span className="text-flexuraNeon">Users</span>
                </h1>
                <p className="text-zinc-500 text-xs mt-1 font-sans tracking-wide">
                    Administrative Core Control Panel Access User Status
                </p>
            </div>

     
            <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                       
                        <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider font-display">
                            <tr>
                                <th className="p-4 border-b border-zinc-800/80">User Profile</th>
                                <th className="p-4 border-b border-zinc-800/80">Current Role</th>
                                <th className="p-4 border-b border-zinc-800/80">Status</th>
                                <th className="p-4 border-b border-zinc-800/80 text-right">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-zinc-900 text-sm font-sans">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center text-zinc-600 py-16 font-medium tracking-wide">
                                        No active users found in database files.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr 
                                        key={user._id} 
                                        className="hover:bg-zinc-900/30 transition-all duration-200 group border-b border-zinc-900"
                                    >
                                        {/* User Details */}
                                        <td className="p-4">
                                            <div className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-zinc-500 font-mono mt-0.5">
                                                {user.email}
                                            </div>
                                        </td>

                                        {/* Role Badge */}
                                        <td className="p-4">
                                            <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded border border-zinc-800 bg-zinc-950 text-zinc-400 group-hover:border-flexuraPurple/50 group-hover:text-flexuraNeon transition-colors uppercase">
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Status Indicator */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5">
                                                <span 
                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                        user.status === 'blocked' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                                                    }`}
                                                ></span>
                                                <span className={`text-xs font-semibold tracking-wide uppercase ${
                                                    user.status === 'blocked' ? 'text-red-400' : 'text-emerald-400'
                                                }`}>
                                                    {user.status || 'active'}
                                                </span>
                                            </div>
                                        </td>

                                     
                                        <td className="p-4 text-right space-x-2">
                                            {user.role !== 'admin' && (
                                                <button 
                                                    onClick={() => triggerAction(user._id, 'makeAdmin')} 
                                                   className="inline-flex items-center justify-center bg-amber-600/20 border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-bold px-3 py-1.5 text-xs font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.1)] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                            
                                            {user.status === 'blocked' ? (
                                                <button 
                                                    onClick={() => triggerAction(user._id, 'unblock')} 
                                                    className="inline-flex items-center justify-center bg-emerald-600/20 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black font-bold px-3 py-1.5 text-xs font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                                >
                                                    Unblock
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => triggerAction(user._id, 'block')} 
                                                    className="inline-flex items-center justify-center bg-red-600/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-black font-bold px-3 py-1.5 text-xs font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                                >
                                                    Block
                                                </button>
                                            )}
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