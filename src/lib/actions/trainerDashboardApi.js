'use server'

import { fetchFromBackend } from "@/lib/serverApi";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// 1. Trainer Overview API 
export const getTrainerOverview = async (email) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/trainer/overview/${email}`, {
            cache: "no-store",
        });

        if (!response.ok) return null;
        const result = await response.json();
        return result.success ? result.stats : null;

    } catch (error) {
        console.error("Error fetching trainer overview:", error.message);
        return null;
    }
};

// 2. Add Class API 
export const addTrainerClass = async (classData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/trainer/classes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(classData),
        });

        if (!response.ok) return { success: false };
        return await response.json();

    } catch (error) {
        console.error("Error adding class:", error.message);
        return { success: false };
    }
};

// 3. Get Trainer - My Classes
export const getTrainerClasses = async (email) => {
    return await fetchFromBackend(`/api/trainer/my-classes/${email}`);
};

// 4. Update Trainer Class API
export const updateTrainerClass = async (id, updatedData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/trainer/classes/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) return { success: false };
        return await response.json();

    } catch (error) {
        console.error("Error updating class:", error.message);
        return { success: false };
    }
};

// 5. Get My Forum Posts 
export const getTrainerForumPosts = async (email) => {
    return await fetchFromBackend(`/api/trainer/my-forum-posts/${email}`);
};

// 6. Get Enrolled Students
export const getClassStudents = async (classId) => {
    return await fetchFromBackend(`/api/trainer/classes/students/${classId}`);
};

// 7. Create Forum Post 
export const createForumPost = async (postData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/forum-posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),

        });
        if (!response.ok) return { success: false };
        return await response.json();

    } catch (error) {
        console.error("Error creating forum post:", error.message);
        return { success: false };
    }
};

// 8. Delete Class 
export const deleteTrainerClass = async (id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/classes/delete/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) return { success: false };
        return await response.json();

    } catch (error) {
        console.error("Error deleting class:", error.message);
        return { success: false };
    }
};

// 9. Delete Forum Post
export const deleteForumPost = async (id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/forum-posts/delete/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) return { success: false };
        return await response.json();

    } catch (error) {
        console.error("Error deleting forum post:", error.message);
        return { success: false };
    }
};