"use client";
import Link from "next/link";
import Image from "next/image"; 
import { FaThumbsUp, FaRegComment, FaCalendarAlt, FaChevronRight, FaShieldAlt, FaUserCheck, FaUserCircle } from "react-icons/fa";

export default function ForumCard({ post }) {

    const {
        _id,
        title,
        image,
        description,
        authorName,
        authorRole,
        like = [],
        comments = [],
        createdAt
    } = post || {};

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "Date Unknown";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    //  badge based on author role
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
        return null;
    };

    return (
        <div className="bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md group hover:border-flexuraPurple/50 transition-all duration-300 flex flex-col justify-between relative w-full overflow-hidden">

            {/* Post Image Container */}
            {image && (
                <div className="relative h-40 w-full overflow-hidden bg-zinc-950 border-b border-zinc-800/50">
                    <Image
                        src={image}
                        alt={title || "Forum Post"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={false}
                    />
                </div>
            )}

            {/* Content Area */}
            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    {/* Header  */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                         <FaUserCircle size={32} />
                            {/* <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-800">
                                <Image
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
                                    alt={authorName || "Author"}
                                    fill
                                    sizes="32px"
                                    className="object-cover"
                                />
                            </div> */}
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h4 className="text-xs font-bold text-zinc-300 truncate max-w-[110px]">{authorName}</h4>
                                    {renderRoleBadge(authorRole)}
                                </div>
                                <p className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5">
                                    <FaCalendarAlt size={9} /> {formatDate(createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-base font-black uppercase tracking-wide group-hover:text-flexuraPurple transition-colors leading-7 mb-2">
                        {title}
                    </h3>

                    {/*  Description */}
                    <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-4 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Footer  */}
                <div className="border-t border-zinc-800/60 pt-3 mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {/* Likes Count */}
                        <div className="flex items-center gap-1 text-zinc-500 hover:text-flexuraNeon transition-colors cursor-pointer">
                            <FaThumbsUp size={11} />
                            <span className="font-display text-xs font-bold">{like.length}</span>
                        </div>
                        {/* Comments Count */}
                        <div className="flex items-center gap-1 text-zinc-500">
                            <FaRegComment size={11} />
                            <span className="font-display text-xs font-bold">{comments.length}</span>
                        </div>
                    </div>

                    {/* Read Post Link */}
                    <Link
                        href={`/forum/${_id}`}
                        className="font-display text-[9px] font-black tracking-widest uppercase text-zinc-400 hover:text-flexuraPurple flex items-center gap-1 transition-colors group/btn"
                    >
                        READ POST <FaChevronRight size={7} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Tech Design Corner */}
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-zinc-800 group-hover:bg-flexuraPurple transition-colors" />
        </div>
    );
}