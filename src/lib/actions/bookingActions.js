"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// booking status check
export const checkBookingStatus = async (classId, email) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/bookings/check?email=${email}&classId=${classId}`, {
            cache: 'no-store'
        });

        if (!res.ok) throw new Error("Failed to fetch booking status");

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in checkBookingStatus action:", error.message);
        return { success: false, booked: false };
    }
};

// class booking save
export const saveBookingInfo = async (bookingData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/bookings/save`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
        });

        if (!res.ok) throw new Error("Failed to save booking");

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error in saveBookingInfo action:", error.message);
        return {
            success: false,
            message: error.message
        };
    }
};