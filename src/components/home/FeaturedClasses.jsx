"use client";
import Link from "next/link";
import { FaFire, FaChevronRight } from "react-icons/fa";
import ClassCard from "../ui/ClassCard";


export default function FeaturedClasses({ featuredClasses }) {
    return (
        <section className="bg-zinc-950 text-white py-16 sm:py-24 relative overflow-hidden px-4">
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none z-0" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-flexuraNeon/10 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-flexuraNeon font-display text-xs font-black tracking-widest uppercase mb-2">
                            <FaFire className="animate-pulse" /> POPULAR PROTOCOLS
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl font-black uppercase italic tracking-wider">
                            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon to-flexuraPurple">CLASSES</span>
                        </h2>
                    </div>
                    <Link
                        href="/classes"
                        className="font-display text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-flexuraNeon transition-colors flex items-center gap-1.5 group"
                    >
                        VIEW ALL CLASSES <FaChevronRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredClasses.map((item) => (
                        <ClassCard key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}