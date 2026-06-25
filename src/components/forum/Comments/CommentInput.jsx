"use client";
import { useState, memo } from "react";
import { FaPaperPlane } from "react-icons/fa";

const CommentInput = memo(({ onAddComment }) => {
    
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (!text.trim()) return;
        onAddComment(text);
        setText("");
    };

    return (
        <div className="flex gap-2 mb-8 bg-zinc-950 border border-zinc-800 p-2 items-center">
            <input
                type="text"
                placeholder="Write a constructive comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-transparent py-2 px-3 text-xs font-sans text-white placeholder-zinc-600 focus:outline-none"
            />
            <button
                onClick={handleSubmit}
                className="bg-flexuraNeon text-black p-3 hover:bg-opacity-90 transition-all rounded-none"
            >
                <FaPaperPlane size={12} />
            </button>
        </div>
    );
});

CommentInput.displayName = "CommentInput";

export default CommentInput;