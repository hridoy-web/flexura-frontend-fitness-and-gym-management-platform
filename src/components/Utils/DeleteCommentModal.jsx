"use client";
import { FaExclamationTriangle } from "react-icons/fa";

export default function DeleteCommentModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-8 z-50 w-64 bg-zinc-950 border border-zinc-800 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.9)] animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-2 text-red-500 mb-2">
                <FaExclamationTriangle size={12} />
                <h4 className="font-display text-[11px] font-black uppercase tracking-wider">
                    Delete Comment?
                </h4>
            </div>
            
            {/* Description */}
            <p className="text-zinc-400 text-[10px] font-sans leading-relaxed mb-4">
                Are you sure you want to remove this comment?
            </p>
            
            {/* Actions */}
            <div className="flex gap-2 justify-end">
                <button 
                    onClick={onClose}
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[9px] uppercase font-display font-bold hover:bg-zinc-800 hover:text-white transition-all"
                >
                    Cancel
                </button>
                <button 
                    onClick={onConfirm}
                    className="px-2.5 py-1 bg-red-600/20 border border-red-500 text-red-500 text-[9px] uppercase font-display font-black hover:bg-red-600 hover:text-white transition-all"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}