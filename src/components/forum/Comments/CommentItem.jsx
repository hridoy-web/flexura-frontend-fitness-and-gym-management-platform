"use client";
import { useState } from "react";
import { FaTrashAlt, FaEdit, FaTimes, FaReply, FaExclamationTriangle } from "react-icons/fa";
import { editForumComment, deleteForumComment, addCommentReply } from "@/lib/actions/forumActions";
import toast from "react-hot-toast";

export default function CommentItem({ comment, post, currentUser, setComments, comments }) {

    const currentCommentId = (comment.commentId || comment._id)?.toString();

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [showDeletePopover, setShowDeletePopover] = useState(false);

    // comment delete
    const handleDelete = async () => {
        setShowDeletePopover(false);
        const previousComments = [...comments];
        setComments(comments.filter(c => (c.commentId || c._id)?.toString() !== currentCommentId));

        const loadingToast = toast.loading("Deleting comment...", {
            style: { background: "#09090b", border: "1px solid #27272a", color: "#fff", borderRadius: "0px" }
        });

        try {
            const result = await deleteForumComment(post._id, currentCommentId, currentUser.email);
            if (result === true || result?.success === true) {
                toast.success("Comment deleted successfully!", { id: loadingToast });
            } else {
                setComments(previousComments);
                toast.error("Failed to delete!", { id: loadingToast });
            }
        } catch (error) {
            setComments(previousComments);
            toast.error("Something went wrong!", { id: loadingToast });
        }
    };

    // comment edit
    const handleSaveEdit = async () => {
        if (!editText.trim()) return;
        const previousComments = [...comments];
        setComments(comments.map(c => (c.commentId || c._id)?.toString() === currentCommentId ? { ...c, text: editText } : c));
        setIsEditing(false);

        const result = await editForumComment(post._id, currentCommentId, currentUser.email, editText);
        if (!result) {
            toast.error("Failed to update.");
            setComments(previousComments);
        } else {
            toast.success("Comment updated!");
        }
    };

    // reply add
    const handleAddReply = async () => {
        if (!replyText.trim() || !currentUser) return;
        const replyBody = {
            commentId: currentCommentId,
            userName: currentUser.name,
            userEmail: currentUser.email,
            userImage: currentUser.image,
            text: replyText
        };
        const newReplyFromServer = await addCommentReply(post._id, replyBody);

        if (newReplyFromServer) {
            setComments(comments.map(c => {
                if ((c.commentId || c._id)?.toString() === currentCommentId) {
                    return { ...c, replies: [...(c.replies || []), newReplyFromServer] };
                }
                return c;
            }));

            setReplyText("");
            setIsReplying(false);
            toast.success("Reply added!");
        } else {
            toast.error("Failed to add reply.");
        }
    };

    return (
        <div className="bg-zinc-900/40 border border-zinc-900 p-4 flex gap-3 items-start flex-col w-full">
            <div className="flex gap-3 items-start w-full">
                <img src={comment.userImage} alt={comment.userName} className="w-8 h-8 rounded-full border border-zinc-800 object-cover shrink-0" />

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1 gap-2">
                        <span className="font-display text-[11px] font-black uppercase tracking-wide text-zinc-300 truncate">{comment.userName}</span>
                        <span className="text-[9px] font-sans text-zinc-600 uppercase shrink-0">
                            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Just Now'}
                        </span>
                    </div>

                    {isEditing ? (
                        <div className="mt-2 flex flex-col gap-2">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 text-xs p-2 text-white focus:outline-none"
                            />
                            <div className="flex gap-2 justify-end">
                                <button onClick={() => setIsEditing(false)} className="px-2 py-1 bg-zinc-800 text-[10px] uppercase font-display font-bold flex items-center gap-1"><FaTimes size={10} /> Cancel</button>
                                <button onClick={handleSaveEdit} className="px-2 py-1 bg-flexuraNeon text-black text-[10px] uppercase font-display font-black">Save</button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-zinc-400 text-xs font-sans leading-relaxed break-words">{comment.text}</p>
                    )}

                    {/* Actions Area */}
                    <div className="flex flex-wrap gap-4 mt-3 text-zinc-600 text-[10px] uppercase font-display tracking-wider items-center">
                        <button onClick={() => { setIsReplying(!isReplying); setReplyText(""); }} className="hover:text-flexuraNeon flex items-center gap-1 transition-colors"><FaReply size={9} /> Reply</button>

                        {comment.userEmail === currentUser?.email && !isEditing && (
                            <>
                                <button onClick={() => setIsEditing(true)} className="hover:text-flexuraNeon flex items-center gap-1 transition-colors"><FaEdit size={10} /> Edit</button>

                                <div className="relative inline-block">
                                    <button onClick={() => setShowDeletePopover(!showDeletePopover)} className={`flex items-center gap-1 transition-colors ${showDeletePopover ? 'text-red-500' : 'hover:text-red-500'}`}><FaTrashAlt size={10} /> Delete</button>

                                    {/* modal */}
                                    {showDeletePopover && (
                                        <>
                                            <div
                                                onClick={() => setShowDeletePopover(false)}
                                                className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
                                            />
                                            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
                                                w-[90vw] max-w-xs sm:max-w-sm bg-zinc-950 border border-zinc-800 p-5 shadow-2xl
                                                md:absolute md:top-1/2 md:left-full md:bottom-auto md:right-auto md:translate-x-0 md:-translate-y-1/2
                                                md:mt-0 md:ml-3 md:w-56 md:sm:w-64
                                                animate-in fade-in zoom-in-95 md:zoom-in-100 md:slide-in-from-left-2 duration-150
                                            ">
                                                <div className="hidden md:block absolute top-1/2 -left-[5px] -translate-y-1/2 w-2 h-2 bg-zinc-950 border-b border-l border-zinc-800 rotate-45"></div>

                                                <div className="flex items-center gap-2 text-red-500 mb-2">
                                                    <FaExclamationTriangle size={14} />
                                                    <h4 className="font-display text-[10px] sm:text-xs md:text-[10px] font-black uppercase tracking-wider text-white">
                                                        Delete Comment?
                                                    </h4>
                                                </div>
                                                <p className="text-zinc-500 text-[11px] md:text-[10px] font-sans mb-4 normal-case tracking-normal leading-normal">
                                                    Are you sure you want to delete this comment?
                                                </p>
                                                <div className="flex gap-2 justify-end">
                                                    <button onClick={() => setShowDeletePopover(false)} className="px-3 py-1.5 md:px-2 md:py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] md:text-[9px] uppercase font-display font-bold">
                                                        No
                                                    </button>
                                                    <button onClick={handleDelete} className="px-3 py-1.5 md:px-2 md:py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] md:text-[9px] uppercase font-display font-black">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="w-full pl-6 md:pl-10 mt-2 space-y-3 border-l-2 border-zinc-800/60">
                    {comment.replies.map((reply, rIdx) => (
                        <div key={reply.replyId || reply._id || rIdx} className="flex gap-2 items-start bg-zinc-950/30 p-2.5 border border-zinc-900/50 w-full">
                            <img src={reply.userImage} alt={reply.userName} className="w-6 h-6 rounded-full border border-zinc-800 object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5 gap-2">
                                    <span className="font-display text-[10px] font-black uppercase text-zinc-400 truncate">{reply.userName}</span>
                                    <span className="text-[8px] font-sans text-zinc-600 uppercase shrink-0">{reply.createdAt ? new Date(reply.createdAt).toLocaleDateString() : 'Just Now'}</span>
                                </div>
                                <p className="text-zinc-400 text-[11px] font-sans break-words">{reply.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Reply Input Form */}
            {isReplying && (
                <div className="w-full pl-6 md:pl-10 mt-2 flex gap-2 items-center bg-zinc-950 p-2 border border-zinc-800/80">
                    <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full bg-transparent py-1 px-2 text-xs font-sans text-white focus:outline-none"
                    />
                    <button onClick={handleAddReply} className="bg-zinc-800 text-flexuraNeon px-3 py-2 hover:bg-zinc-700 transition-all text-xs uppercase font-display font-black shrink-0">Reply</button>
                </div>
            )}
        </div>
    );
}