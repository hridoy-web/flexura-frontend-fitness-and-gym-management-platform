"use client";

import Link from "next/link";
import { FaRegClock, FaUsers, FaTag } from "react-icons/fa";

export default function AllClassesCard({ item }) {

    const {
        _id,
        className,
        trainerName,
        category,
        price,
        duration,
        bookingCount,
        image,
        difficulty = "Beginner"
    } = item;

    return (
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-xl overflow-hidden group hover:border-flexuraNeon/40 transition-all duration-300 flex flex-col h-full shadow-lg shadow-black/40">

            {/* 1. IMAGE SECTION  */}
            <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
                <img
                    src={image}
                    alt={className}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                {/* Gradient Overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

                {/* Category Badge (Top Left) */}
                <span className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur-md border border-flexuraNeon/50 text-flexuraNeon text-[10px] font-display font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg shadow-black/50">
                    {category}
                </span>

                {/* Price Badge Overlay (Top Right) */}
                <span className="absolute top-4 right-4 bg-flexuraNeon text-black text-xs font-display font-black px-3 py-1 rounded-md flex items-center gap-1 shadow-md">
                    ${price}
                </span>
            </div>

            {/* 2. CONTENT SECTION */}
            <div className="p-6 flex flex-col flex-grow">

                {/* Title & Trainer */}
                <div className="mb-4">
                    <h3 className="font-display text-xl font-black uppercase tracking-wide text-white group-hover:text-flexuraNeon transition-colors line-clamp-1">
                        {className}
                    </h3>
                    <p className="text-zinc-500 text-xs font-sans mt-1">
                        by <span className="text-zinc-300 font-medium">{trainerName || "Expert Trainer"}</span>
                    </p>
                </div>

                {/* Meta Info Badges (Difficulty, Duration, Booking Count) */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-sans mb-5 border-b border-zinc-800/60 pb-4">
                    {/* Difficulty Badge */}
                    <span className="bg-zinc-950 border border-zinc-800 text-flexuraNeon text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {difficulty}
                    </span>

                    {/* Duration */}
                    <span className="flex items-center gap-1.5">
                        <FaRegClock className="text-zinc-500" size={13} /> {duration || "60 mins"}
                    </span>

                    {/* Booking Count / Enrolled Students */}
                    <span className="flex items-center gap-1.5">
                        <FaUsers className="text-zinc-500" size={14} /> {bookingCount || 0} Joined
                    </span>
                </div>

                {/* 3. PRICE & BUTTON ACTION (Bottom aligned) */}
                <div className="mt-auto pt-2 flex items-center justify-between gap-4">
                    <div>
                        <span className="text-2xl font-display font-black text-white">${price}</span>
                        <span className="text-zinc-600 text-[10px] block font-sans uppercase tracking-wider">/ session</span>
                    </div>

                    {/* REQUIRED: View Details Button Linked dynamically */}
                    <Link
                        href={`/classes/${_id}`}
                        className="bg-zinc-950 border border-zinc-800 text-white hover:bg-flexuraNeon hover:text-black hover:border-flexuraNeon text-[10px] font-display font-black tracking-widest uppercase px-5 py-3 rounded-lg transition-all duration-300 flex items-center gap-1"
                    >
                        VIEW DETAILS
                    </Link>
                </div>

            </div>
        </div>
    );
}