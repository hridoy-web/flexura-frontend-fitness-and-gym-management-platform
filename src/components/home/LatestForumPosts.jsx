"use client";
import Link from "next/link";
import { FaComments, FaArrowRight } from "react-icons/fa";
import ForumCard from "../ui/ForumCard";

export default function LatestForumPosts({latestForumPosts}) {
    return (
        <section className="bg-zinc-950 text-white py-16 sm:py-24 relative overflow-hidden px-4 border-t border-zinc-900">
            {/* Ambient Purple Glow */}
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-flexuraPurple/10 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-flexuraPurple font-display text-xs font-black tracking-widest uppercase mb-3 bg-flexuraPurple/5 border border-flexuraPurple/20 px-3 py-1">
                        <FaComments /> COMMUNITY HUB
                    </div>
                    
                    <h2 className="font-display text-3xl sm:text-4xl font-black uppercase italic tracking-wider">
                        LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-flexuraPurple to-flexuraNeon">FORUM ARTICLES</span>
                    </h2>
                    
                    <p className="text-zinc-500 text-sm mt-3 font-sans max-w-md mx-auto leading-relaxed">
                        Explore professional training insights, biomechanics breakdowns, and tactical nutrition logs from the elite squad.
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {latestForumPosts.map((post) => (
                        <ForumCard key={post._id} post={post} />
                    ))}
                </div>

                {/* Bottom CTA Button */}
                <div className="text-center">
                    <Link 
                        href="/forum"
                        className="inline-flex items-center gap-2 font-display text-xs font-black tracking-widest uppercase bg-zinc-900 border border-zinc-800 text-zinc-300 py-4 px-8 rounded-none hover:border-flexuraPurple hover:text-white transition-all duration-300 group"
                    >
                        EXPLORE COMMUNITY FORUM 
                        <FaArrowRight size={10} className="text-flexuraPurple transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}