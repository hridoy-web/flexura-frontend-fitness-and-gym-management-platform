"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaComments } from "react-icons/fa";
import ForumCard from "@/components/ui/ForumCard";

const MOCK_FORUM_POSTS = [
    {
        _id: "post1",
        title: "The Ultimate Guide to Hypertrophy & Muscle Growth",
        userName: "Alex Mercer",
        userRole: "trainer",
        userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
        category: "TRAINING",
        description: "Maximize your gains with these scientifically proven hypertrophy training blocks. We break down volume, intensity, and optimal recovery cycles for elite athletes.",
        postImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
        createdAt: "June 20, 2026",
        upvotes: 42,
        commentsCount: 12
    },
    {
        _id: "post2",
        title: "Nutrition Protocols for Combat Cardio & HIIT Sessions",
        userName: "Seraphina Vane",
        userRole: "trainer",
        userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
        category: "NUTRITION",
        description: "Fueling your body correctly before high-intensity interval training can make or break your performance. Discover the exact carb-loading secrets inside this guide.",
        postImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
        createdAt: "June 18, 2026",
        upvotes: 38,
        commentsCount: 7
    },
    {
        _id: "post3",
        title: "Platform Update: New Security Features & Rules",
        userName: "Admin Core",
        userRole: "admin",
        userImage: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=100&auto=format&fit=crop",
        category: "ANNOUNCEMENT",
        description: "We have deployed advanced authentication structures to keep your data secure. Read our updated community guidelines regarding forum interactions.",
        postImage: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?q=80&w=600&auto=format&fit=crop",
        createdAt: "June 15, 2026",
        upvotes: 56,
        commentsCount: 24
    }
];

export default function CommunityForumPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = MOCK_FORUM_POSTS.filter((post) => {
        const matchesTitle = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAuthor = post.userName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTitle || matchesAuthor;
    });

    return (
        <main className="min-h-screen bg-zinc-950 text-white pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
            {/* Background Grid & Glow */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none z-0" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-flexuraPurple/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* PAGE HEADER */}
                <div className="border-b border-zinc-900 pb-8 mb-10 flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 text-flexuraNeon font-display text-xs font-black tracking-widest uppercase mb-2">
                        <FaComments /> KNOWLEDGE BASE
                    </div>
                    <h1 className="font-display text-2xl sm:text-4xl font-black uppercase italic tracking-wider">
                        COMMUNITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon to-flexuraPurple">FORUM</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-sans mt-2 tracking-wide uppercase max-w-md">
                        Insights, expert tips, and platform announcements directly from our trainers and administration.
                    </p>
                </div>

                {/* SEARCH BAR */}
                <div className="bg-zinc-900/20 border border-zinc-900 p-5 backdrop-blur-sm mb-10 flex justify-center">
                    <div className="relative w-full lg:max-w-xl group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 group-focus-within:text-flexuraNeon transition-colors">
                            <FaSearch size={13} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search forum discussions or authors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 py-3.5 pl-11 pr-4 text-xs font-sans text-white placeholder-zinc-600 focus:outline-none focus:border-flexuraNeon transition-all duration-300 rounded-none"
                        />
                    </div>
                </div>

                {/* FORUM POSTS GRID */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.04 }}
                            >
                                <ForumCard post={post} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-zinc-900/10 border border-zinc-900/60 border-dashed p-4">
                        <p className="font-display text-xs font-bold tracking-widest uppercase text-zinc-500">
                            No forum articles found matching your search.
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
}