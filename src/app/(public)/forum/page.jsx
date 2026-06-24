"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaComments, FaSpinner } from "react-icons/fa";
import ForumCard from "@/components/ui/ForumCard";
import { getPaginatedForumPosts } from "@/lib/actions/forumActions"; 

export default function CommunityForumPage() {

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const limitPerPage = 6;

    useEffect(() => {
        const fetchForumData = async () => {
            setLoading(true);
            const response = await getPaginatedForumPosts(currentPage, limitPerPage);
    
            setPosts(response.data || []);
            setTotalPages(response.totalPage || 1);
            setLoading(false);
        };

        fetchForumData();
    }, [currentPage]);

    return (
        <main className="min-h-screen bg-zinc-950 text-white pt-18 pb-20 px-4 sm:px-6 relative overflow-hidden">
            {/* Background Grid & Glow */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none z-0" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-flexuraPurple/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* PAGE HEADER */}
                <div className="border-b border-zinc-900 pb-8 mb-12 flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 text-flexuraNeon font-display text-xs font-black tracking-widest uppercase mb-2">
                        <FaComments /> KNOWLEDGE BASE
                    </div>
                   <h1 className="font-display text-4xl lg:text-5xl font-black uppercase italic tracking-wider">
                        OUR FORUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon to-flexuraPurple">ARTICLES</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-sans mt-3 tracking-wide uppercase max-w-md lg:max-w-lg">
                        Insights, expert tips, and platform announcements directly from our trainers and administration.
                    </p>
                </div>

                {/* LOADER CONTROLS */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <FaSpinner className="text-flexuraNeon animate-spin" size={30} />
                        <p className="text-zinc-200 text-xs font-display uppercase tracking-widest animate-pulse">Synchronizing Articles...</p>
                    </div>
                ) : posts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
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

                        {/*  PAGINATION CONTROLS */}
                        <div className="flex justify-center items-center gap-2 mt-16 border-t border-zinc-900/60 pt-10">
                            {/* PREV BUTTON */}
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className="px-5 py-3 text-[10px] font-display font-black tracking-widest uppercase bg-zinc-950 border border-zinc-800 text-zinc-400 disabled:opacity-20 disabled:pointer-events-none hover:border-flexuraNeon hover:text-white transition-all duration-300 transform active:scale-[0.97]"
                            >
                                PREV
                            </button>

                            {/* DYNAMIC PAGE NUMBERS */}
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-10 h-10 text-[11px] font-display font-black transition-all duration-300 transform active:scale-[0.95] ${
                                            currentPage === pageNum
                                                ? "bg-flexuraNeon text-black font-black shadow-lg shadow-flexuraNeon/20"
                                                : "bg-zinc-950 text-zinc-300 border border-zinc-900 hover:border-zinc-700 hover:text-zinc-300"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {/* NEXT BUTTON */}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                className="px-5 py-3 text-[10px] font-display font-black tracking-widest uppercase bg-zinc-950 border border-zinc-800 text-zinc-300 disabled:opacity-20 disabled:pointer-events-none hover:border-flexuraNeon hover:text-white transition-all duration-300 transform active:scale-[0.97]"
                            >
                                NEXT
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16 bg-zinc-900/10 border border-zinc-900/60 border-dashed p-4">
                        <p className="font-display text-xs font-bold tracking-widest uppercase text-zinc-500">
                            No forum articles found.
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
}