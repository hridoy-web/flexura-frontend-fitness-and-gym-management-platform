"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { createForumPost } from "@/lib/actions/trainerDashboardApi";
import { imageUpload } from "@/lib/imageUpload";
import { FaPenSquare, FaFileAlt, FaPenNib, FaCloudUploadAlt, FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function AddForumPostPage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: ""
    });

    // Image Upload function
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            const uploadData = await imageUpload(file);
            if (uploadData && uploadData.url) {
                setFormData({ ...formData, image: uploadData.url });
            }
        } catch (err) {
            console.error("Image upload failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session?.user?.email) return;

        setLoading(true);
        try {
            const res = await createForumPost({
                ...formData,
                authorName: session.user.name,
                authorEmail: session.user.email,
                authorRole: session.user.role || "trainer"
            });
            if (res.success) {
                setSuccess(true);
                setFormData({ title: "", image: "", description: "" });
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-wider uppercase font-display">Create Forum Post</h1>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1.5 font-display">Write articles and telemetry studies for Community Forum</p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-flexuraNeon to-flexuraPurple" />

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaFileAlt className="text-flexuraNeon" /> Article Title</label>
                    <input type="text" required placeholder="e.g. Advanced Biomechanics of Squats" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-flexuraNeon/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 focus:outline-none transition" />
                </div>

                {/* Imgbb Image Selector */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaCloudUploadAlt className="text-flexuraNeon" /> Article Banner</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative flex-1 w-full">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="forum-image-upload" />
                            <label htmlFor="forum-image-upload" className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 hover:border-flexuraNeon/40 bg-zinc-900/20 rounded-xl p-6 cursor-pointer text-center group transition">
                                <FaCloudUploadAlt className="text-zinc-500 group-hover:text-flexuraNeon text-3xl mb-2 transition" />
                                <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-200">Upload Your Posts Thumbnail Image</span>
                            </label>
                        </div>
                        {formData.image && (
                            <div className="relative w-full sm:w-44 h-28 rounded-xl border border-zinc-900 bg-zinc-950 overflow-hidden shrink-0">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-display"><FaPenNib className="text-flexuraNeon" /> Article Content</label>
                    <textarea required rows={6} placeholder="Draft the article and philosophy matrices here..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-zinc-900/60 border border-zinc-900 focus:border-flexuraNeon/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 focus:outline-none transition resize-none" />
                </div>

                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-flexuraNeon/20 bg-flexuraNeon/10 hover:bg-flexuraNeon/25 transition-all text-flexuraNeon text-xs font-black tracking-widest uppercase font-display disabled:opacity-50">
                    {loading ? <FaSpinner className="animate-spin text-flexuraNeon" size={14} /> : <><FaPenSquare size={12} /> Publish Post</>}
                </button>
            </form>
            {success && (
                <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 font-display text-xs uppercase tracking-widest font-black flex items-center gap-2">
                    <FaCheckCircle /> Post successfully deployed to the Community Forum matrix!
                </div>
            )}
        </div>
    );
}