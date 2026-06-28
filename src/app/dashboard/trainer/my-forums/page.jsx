"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getTrainerForumPosts, deleteForumPost } from "@/lib/actions/trainerDashboardApi";
import { FaTrash, FaSpinner, FaEye, FaRegComments, FaNewspaper, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function MyForumPostsPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for handling custom delete modal
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchPosts = async () => {
    if (!session?.user?.email) return;
    try {
      setLoading(true);
      const data = await getTrainerForumPosts(session.user.email);
      if (data) setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [session]);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleteLoading(true);
      const res = await deleteForumPost(deleteId);
      if (res.success) {
        setPosts(posts.filter((p) => p._id !== deleteId));
        closeDeleteModal();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <FaSpinner className="text-flexuraNeon animate-spin text-4xl" />
        <p className="text-zinc-500 text-xs font-display uppercase tracking-widest animate-pulse">Loading Publications Matrix...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/*  Titles */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-wider uppercase font-display">My Published Forum Articles</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1.5 font-display">Review, moderate or remove your forum posts</p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-12 text-center text-zinc-500">
          <p className="text-sm font-semibold uppercase tracking-wider font-display">No articles published under this account.</p>
          <Link href="/dashboard/trainer/add-forum" className="mt-4 inline-block px-5 py-3 border border-zinc-800 hover:border-flexuraNeon/30 hover:text-flexuraNeon rounded-xl text-xs font-black uppercase tracking-widest font-display transition duration-300">Create Forum Articles</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="group relative rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm overflow-hidden flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-flexuraNeon/30">

              {/*  Image */}
              <div className="relative w-full h-44 bg-zinc-900">
                {post.image ? (
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700"><FaNewspaper size={40} /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>

              {/* Contents */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-base font-bold text-zinc-100 tracking-wide line-clamp-2 uppercase font-display text-sm">{post.title}</h4>
                  <p className="text-xs text-zinc-500 mt-2 line-clamp-3 leading-relaxed font-sans">{post.description}</p>
                </div>

                {/* Footer and moderation buttons */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-zinc-900">
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-display">
                    <FaRegComments size={11} className="text-flexuraNeon" />
                    <span>{post.comments?.length || 0} Comments</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => openDeleteModal(post._id)} className="p-2.5 text-rose-500 hover:text-white border border-zinc-900 hover:border-rose-500/30 hover:bg-rose-500/10 rounded-xl transition" title="Delete Post"><FaTrash size={11} /></button>
                    <Link href={`/forum`} className="p-2.5 text-flexuraNeon hover:text-white border border-zinc-900 hover:border-flexuraNeon/30 hover:bg-flexuraNeon/10 rounded-xl transition" title="View Forum"><FaEye size={11} /></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md rounded-2xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 relative space-y-6 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
            <button onClick={closeDeleteModal} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition">
              <FaTimes size={16} />
            </button>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full border border-rose-500/30 bg-rose-500/10 flex items-center justify-center text-rose-500 animate-pulse">
                <FaExclamationTriangle size={18} />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-100 uppercase tracking-widest font-display">Delete Publication</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-display mt-1">This operation cannot be undone</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={closeDeleteModal} disabled={deleteLoading} className="flex-1 py-3 rounded-xl border border-zinc-900 bg-zinc-900/40 hover:bg-zinc-900 transition text-zinc-400 text-xs font-black tracking-widest uppercase font-display disabled:opacity-50">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} disabled={deleteLoading} className="flex-1 py-3 rounded-xl border border-rose-500/30 bg-rose-500/15 hover:bg-rose-500/30 transition text-rose-500 text-xs font-black tracking-widest uppercase font-display disabled:opacity-50 flex items-center justify-center gap-2">
                {deleteLoading ? <FaSpinner className="animate-spin text-rose-500" size={14} /> : "Delete Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}