"use client";
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { addForumComment } from "@/lib/actions/forumActions";
import toast from "react-hot-toast";
import CommentInput from "./Comments/CommentInput";
import CommentItem from "./Comments/CommentItem";


export default function ForumCommentSection({ post, currentUser }) {

    const [comments, setComments] = useState(post.comments || []);

    // new comment add function
    const handleAddComment = async (text) => {
        if (!currentUser) return;
        const commentBody = {
            userName: currentUser.name,
            userEmail: currentUser.email,
            userImage: currentUser.image,
            text
        };
        const newCommentFromServer = await addForumComment(post._id, commentBody);
        if (newCommentFromServer) {
            setComments([newCommentFromServer, ...comments]);
            toast.success("Comment posted!");
        } else {
            toast.error("Failed to post comment.");
        }
    };

    return (
        <div className="relative">
            <h3 className="font-display text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-flexuraNeon">
                <FaComment /> Comments ({comments.length})
            </h3>

            <CommentInput onAddComment={handleAddComment} />

            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <CommentItem
                            key={(comment.commentId || comment._id)?.toString() || index}
                            comment={comment}
                            post={post}
                            currentUser={currentUser}
                            setComments={setComments}
                            comments={comments}
                        />
                    ))
                ) : (
                    <p className="text-center text-zinc-600 text-xs py-4 font-display uppercase tracking-widest">
                        No comments yet. Start the discussion!
                    </p>
                )}
            </div>
        </div>
    );
}