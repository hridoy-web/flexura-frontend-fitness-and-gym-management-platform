"use client";
import Link from "next/link";
import { FaComments, FaArrowRight } from "react-icons/fa";
import ForumCard from "../ui/ForumCard";

const mockPosts = [
    {
        _id: "post1",
        title: "Hypertrophy Blueprint: Science of Muscle Growth",
        description: "Master the mechanics of progressive overload. Our elite training staff breaks down the optimal set-to-rep ratios and recovery protocols required to shatter genetic plateaus.",
        userName: "Hridoy",
        userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
        userRole: "admin", 
        category: "Training",
        postImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop", 
        upvotes: 184,
        commentsCount: 42,
        createdAt: "10 mins ago"
    },
    {
        _id: "post2",
        title: "Fixing Lumbar Flexion During Heavy Squats",
        description: "Are you suffering from lower back pain or 'butt wink' at the bottom of your squats? Let's analyze hip anatomy, ankle mobility, and proper bracing techniques to safeguard your spine.",
        userName: "Alex Mercer",
        userImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop",
        userRole: "trainer", 
        category: "Biomechanics",
        postImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop", 
        upvotes: 112,
        commentsCount: 29,
        createdAt: "2 hours ago"
    },
    {
        _id: "post4",
        title: "Anabolic Kitchen: High-Protein Meal Prep Guide",
        description: "Hit your daily macro targets effortlessly. Here are 5 calorie-efficient, meal-prep friendly recipes packed with micronutrients to fuel high-intensity training sessions.",
        userName: "Seraphina Vane",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
        userRole: "trainer", 
        category: "Nutrition",
        postImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop", 
        upvotes: 95,
        commentsCount: 18,
        createdAt: "1 day ago"
    }
];

export default function LatestForumPosts() {
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
                    {mockPosts.map((post) => (
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