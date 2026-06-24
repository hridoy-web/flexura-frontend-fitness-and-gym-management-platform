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

// 3. Fetch all approved classes with dynamic search and category filters api
export const getAllClasses = async (search = "", category = "") => {

    const queryParams = new URLSearchParams();
    
    if (search) queryParams.append("search", search);
    if (category) queryParams.append("category", category);
    
    const queryString = queryParams.toString();
    const path = `/api/classes${queryString ? `?${queryString}` : ""}`;

    return await fetchFromBackend(path);
}