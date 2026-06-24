"use server"

import { fetchFromBackend } from "../serverApi";

export const getFeaturedClasses = async () => {
    return await fetchFromBackend("/api/featured-classes");
}

export const getForumPosts = async () => {
    return await fetchFromBackend('/api/latest-forum-posts')
}