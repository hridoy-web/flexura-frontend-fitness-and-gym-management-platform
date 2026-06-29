"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getSingleClass, checkIsFavorite, toggleFavorite } from "@/lib/actions/classActions";
import { checkBookingStatus } from "@/lib/actions/bookingActions"; 
import { FaCalendarAlt, FaClock, FaHeart, FaRegHeart, FaUser, FaDumbbell, FaArrowLeft, FaSpinner, FaUsers, FaBookOpen, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ClassDetailsPage({ params: paramsPromise }) {

    const params = use(paramsPromise);
    const classId = params.id;
    const router = useRouter();

    const [singleClass, setSingleClass] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false); 

    const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);

    useEffect(() => {
        if (!classId) return;

        const fetchClassAndUserData = async () => {
            try {
                setLoading(true);
                const response = await getSingleClass(classId);

                if (response && response.data) {
                    setSingleClass(response.data);
                    setCurrentUser(response.user);

                    if (response.user?.email) {

                        const favStatus = await checkIsFavorite(classId, response.user.email);
                        setIsFavorite(favStatus);

                        const checkData = await checkBookingStatus(classId, response.user.email);
                        if (checkData.success && checkData.booked) {
                            setIsAlreadyBooked(true);
                        }
                    }
                } else {
                    toast.error("Class not found!");
                }
            } catch (error) {
                console.error("Error loading details:", error.message);
                toast.error("Error loading details.");
            } finally {
                setLoading(false);
            }
        };

        fetchClassAndUserData();
    }, [classId]);

    const handleFavoriteToggle = async () => {
        if (!currentUser) {
            toast.error("Please login first!");
            return;
        }

        try {
            setFavoriteLoading(true);
            const favoriteData = {
                classId: singleClass._id,
                userEmail: currentUser.email,
                className: singleClass.className,
                image: singleClass.image,
                category: singleClass.category
            };

            const result = await toggleFavorite(favoriteData);

            if (result.success) {
                setIsFavorite(result.isFavorite);
                toast.success(result.message);
            } else {
                toast.error(result.message || "Something went wrong.");
            }
        } catch (error) {
            toast.error("Action failed.");
        } finally {
            setFavoriteLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!currentUser) {
            toast.error("Please login first to book a class!");
            return;
        }

        if (isAlreadyBooked) {
            toast.error("You have already booked this class!");
            return;
        }

        try {
            setBookingLoading(true);
            const loadingToast = toast.loading("Redirecting to Stripe checkout...");

            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    classId: singleClass._id,
                    className: singleClass.className,
                    price: singleClass.price,
                    image: singleClass.image,
                    userEmail: currentUser.email 
                })
            });

            const data = await res.json();
            toast.dismiss(loadingToast);

            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error(data.error || "Failed to initiate payment session.");
            }
        } catch (error) {
            console.error("Stripe Checkout Error:", error);
            toast.error("Something went wrong with Stripe checkout.");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-3 text-white">
                <FaSpinner className="text-flexuraNeon animate-spin" size={35} />
                <p className="text-zinc-500 text-xs font-display uppercase tracking-widest">Loading Class Details...</p>
            </div>
        );
    }

    if (!singleClass) {
        return (
            <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white gap-4">
                <p className="font-display uppercase tracking-widest text-zinc-500 text-sm">Class Data Unavailable</p>
                <button onClick={() => router.back()} className="text-xs text-flexuraNeon uppercase font-display border border-flexuraNeon/30 px-4 py-2 hover:bg-flexuraNeon/10 transition-all">Go Back</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-zinc-100 py-12 px-4 sm:px-6 md:px-8 selection:bg-flexuraNeon selection:text-black">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2.5 text-zinc-400 hover:text-flexuraNeon transition-colors text-xs uppercase font-display tracking-wider mb-8"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={10} /> Back to classes
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left & Middle Column Banner & Info */}
                    <div className="lg:col-span-2 space-y-6">
                      
                        <div className="relative w-full aspect-video border border-zinc-900 rounded-xs overflow-hidden bg-zinc-950 shadow-2xl group">
                            <img
                                src={singleClass.image}
                                alt={singleClass.className}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-flexuraNeon/30 text-flexuraNeon font-display text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xs">
                                {singleClass.category}
                            </span>
                        </div>

                        {/* Title */}
                        <div className="bg-zinc-900/10 backdrop-blur-xs border border-zinc-900/80 p-6 sm:p-8 space-y-6 rounded-xs">
                            <div className="space-y-3">
                                <h1 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight text-white leading-tight">
                                    {singleClass.className}
                                </h1>
                                <div className="w-14 h-[3px] bg-flexuraNeon"></div>
                            </div>
                            
                            {/* Description */}
                            <div className="space-y-3 pt-2">
                                <h2 className="text-sm font-display font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
                                    <FaBookOpen className="text-flexuraNeon" size={18} /> Course Overview
                                </h2>
                                <p className="text-zinc-400 text-sm font-sans leading-relaxed break-words bg-zinc-950/30 p-4 border border-zinc-900 rounded-xs">
                                    {singleClass.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Sidebar */}
                    <div className="lg:sticky lg:top-24 space-y-6">
                        <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-900 p-6 space-y-6 rounded-xs shadow-xl">

                            {/* Price & Booking Details */}
                            <div className="border-b border-zinc-800/80 pb-5 space-y-4">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-display text-xs font-bold text-zinc-500 uppercase tracking-wider">Registration Fee</span>
                                    <span className="text-3xl font-display font-black text-flexuraNeon">${singleClass.price}</span>
                                </div>
                                
                                {/* Booking Count */}
                                <div className="flex items-center justify-between bg-zinc-950/80 border border-zinc-900 px-3 py-2.5 rounded-xs">
                                    <span className="text-[11px] uppercase tracking-wider font-display font-semibold text-zinc-400 flex items-center gap-2">
                                        <FaUsers className="text-flexuraNeon/70" size={14} /> Total Enrolled
                                    </span>
                                    <span className="text-xs font-display font-black bg-flexuraNeon/10 text-flexuraNeon px-2.5 py-0.5 rounded-full border border-flexuraNeon/20">
                                        {singleClass.bookingCount || 0} Students
                                    </span>
                                </div>
                            </div>

                            {/* Class Details */}
                            <div className="space-y-4 text-xs font-sans">
                                <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-900 pb-3">
                                    <span className="flex items-center gap-2.5"><FaUser className="text-zinc-600 shrink-0" size={12} /> Trainer</span>
                                    <strong className="text-zinc-200 uppercase font-display font-bold tracking-wide truncate max-w-[150px]">{singleClass.trainerName}</strong>
                                </div>
                                <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-900 pb-3">
                                    <span className="flex items-center gap-2.5"><FaDumbbell className="text-zinc-600 shrink-0" size={12} /> Difficulty</span>
                                    <strong className="text-flexuraNeon uppercase text-[10px] font-display bg-flexuraNeon/5 px-2.5 py-0.5 border border-flexuraNeon/10 rounded-xs">{singleClass.difficultyLevel}</strong>
                                </div>
                                <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-900 pb-3">
                                    <span className="flex items-center gap-2.5"><FaClock className="text-zinc-600 shrink-0" size={12} /> Duration</span>
                                    <strong className="text-zinc-300 font-medium">{singleClass.duration}</strong>
                                </div>
                                
                                <div className="flex items-start gap-3.5 text-zinc-400 pt-1">
                                    <FaCalendarAlt className="text-zinc-600 mt-0.5 shrink-0" size={12} />
                                    <div className="space-y-2.5 w-full">
                                        <span className="block text-zinc-500 font-display uppercase tracking-wider text-[10px] font-bold">Schedule Days</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {singleClass.scheduleDays?.map((day, index) => (
                                                <span key={index} className="bg-zinc-950 border border-zinc-850 text-zinc-300 font-display text-[9px] font-black uppercase px-2 py-1 rounded-xs">
                                                    {day}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-[11px] text-zinc-400 font-display block pt-1 bg-zinc-950/40 p-2 border border-zinc-900/50 rounded-xs">🕒 Class Time: {singleClass.time}</span>
                                    </div>
                                </div>
                            </div>

                            {/*  CTA Action Buttons */}
                            <div className="pt-4 space-y-3">
                                <button
                                    onClick={handleBooking}
                                    disabled={isAlreadyBooked || bookingLoading}
                                    className={`w-full py-3.5 text-xs uppercase font-display font-black tracking-widest text-center transition-all rounded-xs flex items-center justify-center gap-2 ${
                                        isAlreadyBooked
                                            ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed font-bold"
                                            : "bg-flexuraNeon text-black hover:bg-white active:scale-[0.99] font-black shadow-lg shadow-flexuraNeon/10"
                                    }`}
                                >
                                    {bookingLoading ? (
                                        <FaSpinner className="animate-spin text-black" size={14} />
                                    ) : isAlreadyBooked ? (
                                        <>
                                            <FaCheckCircle className="text-sky-500" size={14} /> Already Booked
                                        </>
                                    ) : (
                                        "Book Now"
                                    )}
                                </button>

                                <button
                                    onClick={handleFavoriteToggle}
                                    disabled={favoriteLoading}
                                    className="w-full py-3 bg-transparent border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900/40 hover:border-zinc-700 transition-all text-xs uppercase font-display font-bold tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 rounded-xs"
                                >
                                    {isFavorite ? (
                                        <><FaHeart className="text-red-500" size={12} /> Saved to Favorites</>
                                    ) : (
                                        <><FaRegHeart className="text-zinc-500" size={12} /> Add to Favorites</>
                                    )}
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}