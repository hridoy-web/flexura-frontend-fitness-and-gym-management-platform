"use server";
const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const fetchFromBackend = async (path, options) => {
    try {
        const res = await fetch(`${BACKEND_URL}${path}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                ...options?.headers
            },

            ...options,
        });

        if (!res.ok) return null;

        const result = await res.json();
        return result.success ? result.data : null;

    } catch (error) {
        console.error(`Error fetching ${path}:`, error.message);
        return null;
    }
}