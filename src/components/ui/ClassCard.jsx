"use client";
import Link from "next/link";
import { FaUserAlt, FaClock, FaTag } from "react-icons/fa";

export default function ClassCard({ item }) {
    return (
        <div className="bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md group hover:border-flexuraNeon/50 transition-all duration-300 flex flex-col relative w-full">
            
            {/* Card Image Area with Hot Badge */}
            <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
                <img 
                    src={item.image} 
                    alt={item.className}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" // original color kept 🎨
                />
                {/* Booking Count Hot Badge */}
                <div className="absolute top-4 left-4 bg-zinc-950/90 border border-flexuraNeon/40 px-2.5 py-1 flex items-center gap-1.5 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-flexuraNeon animate-ping" />
                    <span className="font-display text-[10px] font-black tracking-wider text-flexuraNeon uppercase">
                        {item.bookingCount} BOOKED
                    </span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-grow flex flex-col">
                {/* Category */}
                <div className="flex items-center gap-1 text-[11px] font-display font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    <FaTag size={10} className="text-flexuraPurple" /> {item.category}
                </div>

                {/* Class Title */}
                <h3 className="font-display text-xl font-black uppercase italic tracking-wide group-hover:text-flexuraNeon transition-colors line-clamp-1 mb-4">
                    {item.className}
                </h3>

                {/* Trainer & Duration Meta Grid */}
                <div className="grid grid-cols-2 border-t border-b border-zinc-800/60 py-3 mb-6 gap-2">
                    <div className="flex items-center gap-2 text-zinc-400">
                        <FaUserAlt size={12} className="text-zinc-600 flex-shrink-0" />
                        <span className="text-xs font-medium truncate">{item.trainerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 justify-end">
                        <FaClock size={12} className="text-zinc-600 flex-shrink-0" />
                        <span className="text-xs font-medium">{item.duration}</span>
                    </div>
                </div>

                {/* Price & Action Button */}
                <div className="mt-auto flex items-center justify-between gap-4">
                    <div>
                        <span className="block text-[10px] font-display font-bold text-zinc-500 uppercase tracking-wider">Access Fee</span>
                        <span className="font-display text-2xl font-black text-white">${item.price}</span>
                    </div>
                    
                    <Link 
                        href={`/classes/${item._id}`}
                        className="font-display text-[11px] font-black tracking-widest uppercase bg-zinc-950 border border-zinc-800 text-zinc-200 py-3 px-5 rounded-none hover:bg-gradient-to-r hover:from-flexuraNeon hover:to-flexuraPurple hover:text-white hover:border-transparent transition-all duration-300 transform active:scale-[0.98]"
                    >
                        DETAILS
                    </Link>
                </div>
            </div>

            {/* Decorative Corner Line for Cyber Vibe */}
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-zinc-800 group-hover:bg-flexuraNeon transition-colors" />
        </div>
    );
}