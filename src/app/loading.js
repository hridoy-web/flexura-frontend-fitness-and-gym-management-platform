import { FaSpinner } from "react-icons/fa";

export default function Loading() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">

            {/*  Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-flexuraPurple/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="text-center relative z-10 flex flex-col items-center gap-4">
                {/* Animated Custom Spinner */}
                <div className="relative flex items-center justify-center">
                    <FaSpinner className="text-flexuraPurple animate-spin" size={40} />
                    <div className="absolute w-2 h-2 bg-flexuraNeon rounded-full animate-ping" />
                </div>

                {/* Tactical Text */}
                <h2 className="font-display text-xs font-black uppercase tracking-[0.2em] text-zinc-400 animate-pulse">
                    Connecting to server...
                </h2>
            </div>
        </main>
    );
}