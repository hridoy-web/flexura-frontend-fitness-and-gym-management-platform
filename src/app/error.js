"use client"; 
import { useEffect } from "react";
import { FaSyncAlt } from "react-icons/fa";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application Runtime Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center relative z-10 max-w-md">
        <h1 className="font-display text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-900 tracking-tighter mb-4 italic select-none">
          500
        </h1>
        
        <h2 className="font-display text-xl font-black text-rose-500 uppercase tracking-wider mb-3">
          RUNTIME ERROR
        </h2>
        
        <p className="text-zinc-500 text-xs font-sans leading-relaxed mb-8 uppercase">
          {error?.message || "Something went wrong during data fetching or client-side evaluation."}
        </p>

        {/* Retry Button */}
        <button
          onClick={() => reset()} 
          className="inline-flex items-center gap-2 font-display text-xs font-black tracking-widest uppercase bg-rose-950/20 border border-rose-900/50 text-rose-400 py-4 px-6 rounded-none hover:bg-rose-950/40 hover:text-rose-300 transition-all duration-300"
        >
          <FaSyncAlt size={10} />
          RETRY SEGMENT
        </button>
      </div>
    </main>
  );
}