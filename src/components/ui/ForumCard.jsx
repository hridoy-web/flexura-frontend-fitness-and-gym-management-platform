"use client";
import Link from "next/link";
import { FaThumbsUp, FaRegComment, FaCalendarAlt, FaChevronRight, FaShieldAlt, FaUserCheck } from "react-icons/fa";

export default function ForumCard({ post }) {
    // 🛠️ ইউজারের রোল অনুযায়ী ব্যাজ ও কালার ডিফাইন করার লজিক
    const renderRoleBadge = (role) => {
        if (role === "admin") {
            return (
                <span className="flex items-center gap-1 text-[9px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 uppercase tracking-wider">
                    <FaShieldAlt size={8} /> Admin
                </span>
            );
        }
        if (role === "trainer") {
            return (
                <span className="flex items-center gap-1 text-[9px] font-bold text-flexuraNeon bg-flexuraNeon/10 border border-flexuraNeon/20 px-1.5 py-0.5 uppercase tracking-wider">
                    <FaUserCheck size={8} /> Trainer
                </span>
            );
        }
        return null; // সাধারণ ইউজার হলে আলাদা ব্যাজ লাগবে না
    };

    return (
        <div className="bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md group hover:border-flexuraPurple/50 transition-all duration-300 flex flex-col justify-between relative w-full overflow-hidden">
            
            {/* 📸 ১. পোস্ট ইমেজ (যদি পোস্টে ইমেজ থাকে) */}
            {post.postImage && (
                <div className="relative h-40 w-full overflow-hidden bg-zinc-950 border-b border-zinc-800/50">
                    <img 
                        src={post.postImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                </div>
            )}

            {/* Content Area */}
            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    {/* Header: User Meta, Role badge & Category */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                            <img 
                                src={post.userImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"} 
                                alt={post.userName} 
                                className="w-8 h-8 rounded-full object-cover border border-zinc-800"
                            />
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h4 className="text-xs font-bold text-zinc-300 truncate max-w-[90px]">{post.userName}</h4>
                                    {/* 🛠️ ২. রোল চেক সেকশন */}
                                    {renderRoleBadge(post.userRole)}
                                </div>
                                <p className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5">
                                    <FaCalendarAlt size={9} /> {post.createdAt}
                                </p>
                            </div>
                        </div>
                        {/* Category Badge */}
                        <span className="font-display text-[9px] font-black tracking-widest uppercase bg-zinc-950 border border-zinc-800 text-flexuraPurple px-2 py-1 flex-shrink-0">
                            {post.category}
                        </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="font-display text-base font-black uppercase tracking-wide group-hover:text-flexuraPurple transition-colors line-clamp-1 mb-2">
                        {post.title}
                    </h3>

                    {/* Post Description Snippet */}
                    <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-4 leading-relaxed">
                        {post.description}
                    </p>
                </div>

                {/* Footer: Votes, Comments & Read Button */}
                <div className="border-t border-zinc-800/60 pt-3 mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {/* Upvotes */}
                        <div className="flex items-center gap-1 text-zinc-500 hover:text-flexuraNeon transition-colors cursor-pointer">
                            <FaThumbsUp size={11} />
                            <span className="font-display text-xs font-bold">{post.upvotes}</span>
                        </div>
                        {/* Comments Count */}
                        <div className="flex items-center gap-1 text-zinc-500">
                            <FaRegComment size={11} />
                            <span className="font-display text-xs font-bold">{post.commentsCount}</span>
                        </div>
                    </div>

                    {/* Read Post Link */}
                    <Link 
                        href={`/forum/${post._id}`}
                        className="font-display text-[9px] font-black tracking-widest uppercase text-zinc-400 hover:text-flexuraPurple flex items-center gap-1 transition-colors group/btn"
                    >
                        READ POST <FaChevronRight size={7} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Tech Corner Accent */}
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-zinc-800 group-hover:bg-flexuraPurple transition-colors" />
        </div>
    );
}