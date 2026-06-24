"use server"

import { fetchFromBackend } from "../serverApi";

// 1. featured classes api
export const getFeaturedClasses = async () => {
    return await fetchFromBackend("/api/featured-classes");
}

// 2. latest forum posts api
export const getForumPosts = async () => {
    return await fetchFromBackend('/api/latest-forum-posts')
}

