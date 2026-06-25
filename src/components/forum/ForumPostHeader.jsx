
import { FaUser, FaCalendarAlt } from "react-icons/fa";

export default function ForumPostHeader({ post }) {
    return (
        <div className="border-b border-zinc-900 pb-6 mb-6">

            {/* Full Image */}
            <div className="relative w-full h-[300px] md:h-[450px] mb-6 overflow-hidden border border-zinc-800">
                <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Title */}
            <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-5">
                {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-display uppercase tracking-widest text-zinc-500 mb-6">
                <div className="flex justify-center text-center gap-2 text-flexuraNeon">
                    <FaUser size={12} />
                    <span>By {post.authorRole}: {post.authorName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <FaCalendarAlt size={12} />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm font-sans leading-relaxed whitespace-pre-line">
                {post.description}
            </p>
        </div>
    );
}