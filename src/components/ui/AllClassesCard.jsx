"use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegClock, FaUserCircle, FaUsers } from "react-icons/fa";

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
        difficultyLevel,
        description
    } = item;

    return (
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-xl overflow-hidden group hover:border-flexuraNeon/40 transition-all duration-300 flex flex-col h-full shadow-lg shadow-black/40">

            {/* 1. IMAGE SECTION */}
            <div className="relative h-52 w-full overflow-hidden bg-zinc-950">

                <Image
                    src={image || "/public/images/flexura_gym_image.jpg"}
                    alt={className || "Fitness Class"}
                    fill
                    priority={true}
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 z-10" />

                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur-md border border-flexuraNeon/50 text-flexuraNeon text-[10px] font-display font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg shadow-black/50 z-20">
                    {category}
                </span>

                {/* Price Badge Top Right */}
                <span className="absolute top-4 right-4 bg-flexuraNeon text-black text-xs font-display font-black px-3 py-1 rounded-md flex items-center gap-1 shadow-md z-20">
                    ${price}
                </span>
            </div>

            {/* 2. CONTENT SECTION */}
            <div className="p-6 flex flex-col flex-grow">

                {/* Title & Trainer */}
                <div className="mb-4">
                    <h3 className="font-display text-xl font-black uppercase tracking-wide text-white group-hover:text-flexuraNeon transition-colors">
                        {className}
                    </h3>
                    <p className="text-zinc-500 flex gap-2 text-sm font-sans mt-3">
                        <FaUserCircle size={20} /> By Trainer: <span className="text-zinc-300 font-medium">{trainerName || "Expert Trainer"}</span>
                    </p>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-xs font-sans line-clamp-3 leading-relaxed mb-4">
                    {description || "No description available for this fitness program."}
                </p>

                {/* Info Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-sans mb-5 border-b border-zinc-800/60 pb-4">
                    <span className="bg-zinc-950 border border-zinc-800 text-flexuraNeon text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {difficultyLevel || "General"}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <FaRegClock className="text-zinc-500" size={13} /> {duration || "60 mins"}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <FaUsers className="text-zinc-500" size={14} /> {bookingCount || 0} Joined
                    </span>
                </div>

                {/* 3. PRICE & BUTTON ACTION */}
                <div className="mt-auto pt-2 flex items-center justify-between gap-4">
                    <div>
                        <span className="text-2xl font-display font-black text-white">${price}</span>
                        <span className="text-zinc-600 text-[10px] block font-sans uppercase tracking-wider">/ session</span>
                    </div>

                    <Link
                        href={`/classes/${_id}`}
                        className="font-display text-[11px] font-black tracking-widest uppercase bg-zinc-950 border border-zinc-800 text-zinc-200 py-3 px-5 rounded-none hover:bg-gradient-to-r hover:from-flexuraNeon hover:to-flexuraPurple hover:text-white hover:border-transparent transition-all duration-300 transform active:scale-[0.98] flex items-center gap-1"
                    >
                        VIEW DETAILS
                    </Link>
                </div>

            </div>
        </div>
    );
}