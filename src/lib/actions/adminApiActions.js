"use server"
import { fetchFromBackend } from "../serverApi";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getOverviewStats = async () => {
    return await fetchFromBackend('/api/admin/dashboard/overview-stats');
};

export const getAllUsers = async () => {
    return await fetchFromBackend('/api/admin/users');
};

export const getTrainerApplications = async () => {
    return await fetchFromBackend('/api/admin/trainer-applications');
};

export const getActiveTrainers = async () => {
    return await fetchFromBackend('/api/admin/active/trainers');
};

export const getTrainerClasses = async () => {
    return await fetchFromBackend('/api/admin/trainer-classes');
};

export const getAllForumPosts = async () => {
    return await fetchFromBackend('/api/admin/find/all-forum-posts');
};

export const getTransactions = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/admin/transactions`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            return { success: false, totalRevenue: 0, payments: [] };
        }

        const data = await res.json();
        return data || {
            success: false,
            totalRevenue: 0, payments: []
        };

    } catch (err) {
        console.error("getTransactions Action Error:", err);
        return {
            success: false,
            totalRevenue: 0, payments: []
        };
    }
};

export const handleUserAction = async (id, actionType) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/admin/users/action/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ actionType })
        });
        return await res.json();
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export const handleTrainerApplicationAction = async (id, status, feedback = "") => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/admin/trainer-applications/action/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, feedback })
        });
        return await res.json();
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export const demoteTrainer = async (id) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/admin/trainers/demote/${id}`, {
            method: 'PATCH'
        });
        return await res.json();
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export const handleClassStatus = async (id, status) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/admin/classes/status/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return await res.json();
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export const deleteForumPost = async (id) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/forum-posts/delete/${id}`, {
            method: 'DELETE'
        });
        return await res.json();
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export const deleteClass = async (id) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/classes/delete/${id}`, {
            method: 'DELETE'
        });
        return await res.json();
    } catch (err) {
        return { success: false, error: err.message };
    }
};