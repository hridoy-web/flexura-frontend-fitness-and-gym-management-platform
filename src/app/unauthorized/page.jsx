"use client"; 
import { useRouter } from "next/navigation";
import { IoWarningOutline } from "react-icons/io5";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6 font-sans antialiased">
      
      <div className="max-w-md w-full text-center bg-zinc-900 border border-red-500/20 p-8 rounded-2xl shadow-2xl shadow-red-500/5 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/10">
          <IoWarningOutline className="w-11 h-11" />
        </div>

        <h1 className="text-2xl font-bold tracking-widest uppercase text-red-500 mb-3 font-display">
          Access Denied
        </h1>
        
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed px-4 font-sans">
          Unauthorized navigation attempt detected! Manually altering or changing URLs violates our platform's security policy.
        </p>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md shadow-red-600/10 hover:shadow-red-600/30 cursor-pointer text-xs tracking-widest uppercase active:scale-[0.98] font-display"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
}