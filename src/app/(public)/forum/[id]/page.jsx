"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { getSingleForumPostDetails } from "@/lib/actions/forumActions";
import ForumPostHeader from "@/components/forum/ForumPostHeader";
import ForumPostActions from "@/components/forum/ForumPostActions";
import ForumCommentSection from "@/components/forum/ForumCommentSection";

export default function ForumPostDetailsPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const res = await getSingleForumPostDetails(id);

                if (res.post) {
                    setPost(res.post);
                    setCurrentUser(res.user);
                }
            } catch (error) {
                console.error("Error fetching forum post details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-3 text-white">
                <FaSpinner className="text-flexuraNeon animate-spin" size={35} />
                <p className="text-zinc-500 text-xs font-display uppercase tracking-widest">Loading Post Details...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500 font-display text-sm uppercase">
                Post Not Found!
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-white pb-20 px-4 sm:px-6 relative overflow-hidden">
            {/* Background  */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none z-0" />

            <div className="max-w-4xl mx-auto relative z-10 bg-zinc-900/20 border border-zinc-900 p-6 md:p-10 backdrop-blur-sm">

                <ForumPostHeader post={post} />

                <ForumPostActions post={post} currentUser={currentUser} />

                <ForumCommentSection post={post} currentUser={currentUser} />
            </div>
        </main>
    );
}