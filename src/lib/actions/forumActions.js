
"use server";

import { fetchFromBackend } from "../serverApi";
import { getUserSession } from "../session";

// forum posts api with server side pagination
export const getPaginatedForumPosts = async (page = 1, limit = 9) => {
    const data = await fetchFromBackend(`/api/forum-posts?page=${page}&limit=${limit}`);

    if (data) {
        return {
            data: data.posts || data,
            totalPage: data.totalPage || 1
        };
    }

    return { data: [], totalPage: 1 };
};

// get forum data in single page
export const getSingleForumPostDetails = async (id) => {

    const postData = await fetchFromBackend(`/api/forum-posts/${id}`);

    const user = await getUserSession();

    return {
        post: postData,
        user: user
    };

};

// like and dislike api fetched
export const voteForumPost = async (id, userEmail, voteType) => {

    const result = await fetchFromBackend(`/api/forum-posts/like/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ userEmail, voteType })
    });

    return result;
};

// add comment api
export const addForumComment = async (postId, commentData) => {

    return await fetchFromBackend(`/api/forum-posts/comment/${postId}`, {
        method: "PATCH",
        body: JSON.stringify(commentData)
    });

};

// comment edit api
export const editForumComment = async (postId, commentId, userEmail, newText) => {

    return await fetchFromBackend(`/api/forum-posts/comment/edit/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({ commentId, userEmail, newText })
    });

};

// comment delete api
export const deleteForumComment = async (postId, commentId, userEmail) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || ''}/api/forum-posts/comment/delete/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ commentId, userEmail })
        });

        const data = await response.json();
        return data?.success || false; 
    } catch (error) {
        console.error(error);
        return false;
    }
};

// comment reply api
export const addCommentReply = async (postId, replyData) => {

    return await fetchFromBackend(`/api/forum-posts/comment/reply/${postId}`, {
        method: "PATCH",
        body: JSON.stringify(replyData)
    });

};