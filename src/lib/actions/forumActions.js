
"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getPaginatedForumPosts = async (page = 1, limit = 6) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/forum-posts?page=${page}&limit=${limit}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) return { data: [], totalPage: 1 };

        const result = await res.json();

        if (result.success) {
            return {
                data: result.data,
                totalPage: result.totalPage
            };
        }

        return { data: [], totalPage: 1 };

    } catch (error) {
        console.error("Error fetching forum posts:", error.message);
        return { data: [], totalPage: 1 };
    }
};