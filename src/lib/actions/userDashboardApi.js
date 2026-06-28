import { fetchFromBackend } from "../serverApi";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// user overview api
export const getUserOverview = async (email) => {
    try {
        const response = await fetch(`${BACKEND_URL}/user-overview?email=${email}`, {
            cache: "no-store",
        });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Error in getUserOverview:", error.message);
        return null;
    }
};

// user booked class api
export const getBookedClasses = async (email) => {
    try {
        const response = await fetch(`${BACKEND_URL}/booked-classes?email=${email}`, {
            cache: "no-store",
        });
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error("Error in getBookedClasses:", error.message);
        return [];
    }
};

// get favorites class api
export const getFavoriteClasses = async (email) => {
    return await fetchFromBackend(`/api/favorites/${email}`, {
    })
}

//  Delete Favorite Class 
export const deleteFavoriteClass = async (id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/favorites/delete/${id}`,
            {
                method: "DELETE",
            });

        if (!response.ok) return { success: false };
        return await response.json();

    } catch (error) {
        console.error("Error in deleteFavoriteClass:", error.message);
        return { success: false };
    }
};

// Apply Trainer Application api
export const applyAsTrainer = async (data) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/user/apply-trainer`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) return { success: false };
        return await response.json();
    } catch (error) {
        console.error("Error in applyAsTrainer:", error.message);
        return { success: false };
    }
};