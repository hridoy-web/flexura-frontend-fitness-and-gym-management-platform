import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient BG Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-flexuraPurple/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center relative z-10 max-w-md">
        {/* Error Code Graphic */}
        <h1 className="font-display text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-900 tracking-tighter mb-4 italic select-none">
          404
        </h1>
        
        <h2 className="font-display text-xl font-black uppercase tracking-wider mb-3">
          PAGE NOT FOUND
        </h2>
        
        <p className="text-zinc-500 text-xs font-sans leading-relaxed mb-8 uppercase">
          The tactical route you are trying to access does not exist or has been decommissioned by the admin.
        </p>

        {/* Back to Home CTA */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 font-display text-xs font-black tracking-widest uppercase bg-zinc-900 border border-zinc-800 text-zinc-300 py-4 px-6 rounded-none hover:border-flexuraPurple hover:text-white transition-all duration-300 group"
        >
          <FaArrowLeft size={10} className="text-flexuraPurple transform group-hover:-translate-x-1 transition-transform" />
          BACK TO HOME
        </Link>
      </div>
    </main>
  );
}