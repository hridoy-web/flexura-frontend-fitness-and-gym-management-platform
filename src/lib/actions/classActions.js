"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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