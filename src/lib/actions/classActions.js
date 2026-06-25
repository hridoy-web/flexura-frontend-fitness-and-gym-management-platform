"use server";

import { fetchFromBackend } from "../serverApi";
import { getUserSession } from "../session";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// all classes api
export const getPaginatedClasses = async ({ page = 1, limit = 9, search = "", category = "" }) => {
    try {

        let url = `${BACKEND_URL}/api/classes?page=${page}&limit=${limit}`;

        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (category && category !== 'All') url += `&category=${encodeURIComponent(category)}`;

        const res = await fetch(url, {
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
        console.error("Error fetching classes:", error.message);
        return { data: [], totalPage: 1 };
    }
};

// single classes api
export const getSingleClass = async (id) => {

    const res = await fetchFromBackend(`/api/classes/single/${id}`);

    const user = await getUserSession()

    return {
        data: res,
        user: user
    }
}

// favorite check api
export const checkIsFavorite = async (classId, userEmail) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/favorites/check?classId=${classId}&userEmail=${userEmail}`, {
            cache: "no-store",
        });

        if (!res.ok) return false;
        const result = await res.json();
        return result.isFavorite || false;

    } catch (error) {
        console.error("Error checking favorite status:", error.message);
        return false;
    }
};

// favorite add or remove
export const toggleFavorite = async (favoriteData) => {
    try {

        const res = await fetch(`${BACKEND_URL}/api/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(favoriteData),
        });

        if (!res.ok) return { success: false, message: "Failed to process request." };
        return await res.json();

    } catch (error) {
        console.error("Error toggling favorite:", error.message);
        return { success: false, message: "Something went wrong!" };
    }
};