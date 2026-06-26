"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getSingleClass, checkIsFavorite, toggleFavorite } from "@/lib/actions/classActions";
import { checkBookingStatus } from "@/lib/actions/bookingActions"; 
import { FaHeart, FaRegHeart, FaArrowLeft, FaSpinner, FaBookOpen, FaCheckCircle } from "react-icons/fa";
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
    
    const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false); 

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
            const loadingToast = toast.loading("Initiating secure checkout...");

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

    const handleFavoriteToggle = async () => {
        if (!currentUser) { toast.error("Please login first!"); return; }
        try {
            setFavoriteLoading(true);
            const result = await toggleFavorite({
                classId: singleClass._id, userEmail: currentUser.email,
                className: singleClass.className, image: singleClass.image, category: singleClass.category
            });
            if (result.success) { setIsFavorite(result.isFavorite); toast.success(result.message); }
        } catch (error) { toast.error("Action failed."); } finally { setFavoriteLoading(false); }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-3 text-white">
                <FaSpinner className="text-flexuraNeon animate-spin" size={35} />
                <p className="text-zinc-500 text-xs font-display uppercase tracking-widest">Loading Class Details...</p>
            </div>
        );
    }

    if (!singleClass) return <div className="text-white text-center py-20">Class unavailable.</div>;

    return (
        <div className="min-h-screen bg-black text-zinc-100 py-12 px-4 sm:px-6 md:px-8 selection:bg-flexuraNeon selection:text-black">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-400 hover:text-flexuraNeon text-xs uppercase tracking-wider mb-8">
                    <FaArrowLeft /> Back to classes
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left & Middle Column Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative w-full aspect-video border border-zinc-900 overflow-hidden bg-zinc-950 shadow-2xl">
                            <img src={singleClass.image} alt={singleClass.className} className="w-full h-full object-cover" />
                            <span className="absolute top-4 left-4 bg-black/80 border border-flexuraNeon/30 text-flexuraNeon font-display text-[10px] font-black uppercase tracking-widest px-3 py-1.5">
                                {singleClass.category}
                            </span>
                        </div>

                        <div className="bg-zinc-900/10 border border-zinc-900 p-6 sm:p-8 space-y-6 rounded-xs">
                            <h1 className="text-2xl sm:text-4xl font-display font-black uppercase text-white leading-tight">{singleClass.className}</h1>
                            <div className="w-14 h-[3px] bg-flexuraNeon"></div>
                            
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

                    {/* Right Column Sidebar  */}
                    <div className="lg:sticky lg:top-24 bg-zinc-900/30 border border-zinc-900 p-6 space-y-6 rounded-xs shadow-xl">
                        <div className="flex justify-between items-baseline border-b border-zinc-800 pb-5">
                            <span className="text-xs font-bold text-zinc-500 uppercase">Registration Fee</span>
                            <span className="text-3xl font-display font-black text-flexuraNeon">${singleClass.price}</span>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="flex justify-between border-b border-zinc-900 pb-3"><span>Trainer</span><strong className="text-zinc-200 uppercase">{singleClass.trainerName}</strong></div>
                            <div className="flex justify-between border-b border-zinc-900 pb-3"><span>Difficulty</span><strong className="text-flexuraNeon uppercase">{singleClass.difficultyLevel}</strong></div>
                            <div className="flex justify-between border-b border-zinc-900 pb-3"><span>Duration</span><strong className="text-zinc-300">{singleClass.duration}</strong></div>
                        </div>

                        <div className="pt-4 space-y-3">
                            <button
                                onClick={handleBooking}
                                disabled={isAlreadyBooked || bookingLoading}
                                className={`w-full py-3.5 text-xs uppercase font-display font-black tracking-widest text-center transition-all rounded-xs flex items-center justify-center gap-2 ${
                                    isAlreadyBooked
                                        ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
                                        : "bg-flexuraNeon text-black hover:bg-white active:scale-[0.99] font-black"
                                }`}
                            >
                                {bookingLoading ? (
                                    <FaSpinner className="animate-spin text-black" size={14} />
                                ) : isAlreadyBooked ? (
                                    <>
                                        <FaCheckCircle className="text-zinc-600" size={14} /> Already Booked
                                    </>
                                ) : (
                                    "Book Now"
                                )}
                            </button>

                            <button onClick={handleFavoriteToggle} disabled={favoriteLoading} className="w-full py-3 bg-transparent border border-zinc-800 text-zinc-400 text-xs uppercase font-bold flex items-center justify-center gap-2 rounded-xs">
                                {isFavorite ? <><FaHeart className="text-red-500" /> Saved to Favorites</> : <><FaRegHeart /> Add to Favorites</>}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}