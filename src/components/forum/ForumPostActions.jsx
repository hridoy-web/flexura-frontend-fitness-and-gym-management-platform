"use client";

import { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from "react-icons/fa";
import { voteForumPost } from "@/lib/actions/forumActions";
import toast from "react-hot-toast";

export default function ForumPostActions({ post, currentUser }) {
    const [likes, setLikes] = useState(post?.like || []);
    const [dislikes, setDislikes] = useState(post?.dislike || []);

    const userEmail = currentUser?.email;
    const hasLiked = userEmail ? likes.includes(userEmail) : false;
    const hasDisliked = userEmail ? dislikes.includes(userEmail) : false;

    const handleVote = async (type) => {
        if (!userEmail) {
            toast.error("Please login first!");
            return;
        }

        if (type === "like") {
            if (hasLiked) {
                setLikes(likes.filter(email => email !== userEmail));
            } else {
                setLikes([...likes, userEmail]);
                setDislikes(dislikes.filter(email => email !== userEmail));
            }
        } else if (type === "dislike") {
            if (hasDisliked) {
                setDislikes(dislikes.filter(email => email !== userEmail));
            } else {
                setDislikes([...dislikes, userEmail]);
                setLikes(likes.filter(email => email !== userEmail));
            }
        }

        await voteForumPost(post._id, userEmail, type);
    };

    return (
        <div className="flex items-center gap-5 pb-6 border-b border-zinc-900 mb-8 select-none">
            {/* Like Button */}
            <button
                onClick={() => handleVote("like")}
                className={`flex items-center gap-2 px-5 py-2.5 border text-xs font-display font-black uppercase tracking-wider transition-all duration-300 rounded-sm group ${hasLiked
                    ? "bg-flexuraNeon text-black border-flexuraNeon shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                    : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:text-flexuraNeon hover:border-flexuraNeon hover:shadow-[0_0_10px_rgba(0,242,254,0.15)]"
                    }`}
            >
                <span className={`transition-transform duration-200 ${hasLiked ? "scale-110" : "group-hover:scale-110"}`}>
                    {hasLiked ? <FaThumbsUp size={14} /> : <FaRegThumbsUp size={14} />}
                </span>
                <span>{likes.length} Likes</span>
            </button>

            {/* Dislike Button */}
            <button
                onClick={() => handleVote("dislike")}
                className={`flex items-center gap-2 px-5 py-2.5 border text-xs font-display font-black uppercase tracking-wider transition-all duration-300 rounded-sm group ${hasDisliked
                    ? "bg-red-500/20 text-red-500 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                    : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:text-red-500 hover:border-red-500 hover:shadow-[0_0_10px_rgba(239,68,68,0.15)]"
                    }`}
            >
                <span className={`transition-transform duration-200 ${hasDisliked ? "scale-110" : "group-hover:scale-110"}`}>
                    {hasDisliked ? <FaThumbsDown size={14} /> : <FaRegThumbsDown size={14} />}
                </span>
                <span>{dislikes.length} Dislikes</span>
            </button>
        </div>
    );
}