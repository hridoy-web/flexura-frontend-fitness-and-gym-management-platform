"use client";
import { useEffect, useState } from "react";
import { getAllForumPosts, deleteForumPost } from "@/lib/actions/adminApiActions";

export default function ManageForumPage() {
    const [posts, setPosts] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => { loadPosts(); }, []);

    const loadPosts = async () => {
        const data = await getAllForumPosts();
        if (data) setPosts(data);
    };

    const triggerDeleteModal = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            const res = await deleteForumPost(deleteId);
            if (res.success) {
                loadPosts();
            }
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-8 p-6 min-h-screen bg-black text-zinc-100">
            {/* Header Section */}
            <div className="border-b border-zinc-900 pb-6">
                <h1 className="text-3xl font-black text-white font-display tracking-wider uppercase">
                    Forum Post <span className="text-flexuraNeon">Manage</span>
                </h1>
                <p className="text-zinc-500 text-xs mt-1 font-sans tracking-wide">
                    Community Discussion Supervision and Network Content Moderation Panel
                </p>
            </div>


            <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">

                        <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider font-display">
                            <tr>
                                <th className="p-4 border-b border-zinc-800/80">Post Title</th>
                                <th className="p-4 border-b border-zinc-800/80">Author</th>
                                <th className="p-4 border-b border-zinc-800/80 text-right">Moderation Action</th>
                            </tr>
                        </thead>


                        <tbody className="divide-y divide-zinc-900 text-sm font-sans">
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center text-zinc-600 py-16 font-medium tracking-wide">
                                        No community forum posts located in database.
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr
                                        key={post._id}
                                        className="hover:bg-zinc-900/30 transition-all duration-200 group border-b border-zinc-900"
                                    >
                                        {/* Post Title */}
                                        <td className="p-4 font-semibold text-zinc-200 group-hover:text-white transition-colors max-w-xs truncate">
                                            {post.title}
                                        </td>

                                        {/* Author Info */}
                                        <td className="p-4 text-zinc-400 font-medium">
                                            {post.authorName || post.authorEmail}
                                        </td>


                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => triggerDeleteModal(post._id)}
                                                className="inline-flex items-center justify-center bg-red-600/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-black font-bold px-4 py-2 text-xs font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                            >
                                                Delete Post
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
                    <div className="max-w-sm w-full bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl relative space-y-6">
                        {/* Glow Line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

                        {/* Modal Warning Message */}
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-black text-white font-display uppercase tracking-wider">
                                Content <span className="text-red-500">Delete !</span>
                            </h3>
                            <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                                Are you sure you want to permanently delete this forum post? This action cannot be restored.
                            </p>
                        </div>

                        {/* Modal Controls */}
                        <div className="flex items-center justify-center gap-3 pt-2">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="w-1/2 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="w-1/2 py-2.5 bg-red-600 border border-red-500 text-white hover:bg-red-700 text-xs font-bold font-display tracking-wider uppercase rounded transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}