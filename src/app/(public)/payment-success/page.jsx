"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaSpinner, FaArrowRight, FaReceipt, FaTimesCircle } from "react-icons/fa";
import { saveBookingInfo } from "@/lib/actions/bookingActions";
import toast from "react-hot-toast";

export default function PaymentSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sessionId = searchParams.get("session_id");
    const classId = searchParams.get("classId");
    const price = searchParams.get("price");

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("processing");
    const [userEmail, setUserEmail] = useState("");

    const hasEffectRun = useRef(false);

    useEffect(() => {
        const fetchLoggedUser = async () => {
            try {
                const emailParam = searchParams.get("email") || "authenticated_user@flexura.com";
                setUserEmail(emailParam);
                return emailParam;
            } catch (err) {
                console.error("Auth context read error", err);
                return null;
            }
        };

        if (!sessionId || !classId) {
            setStatus("error");
            setLoading(false);
            return;
        }

       
        if (hasEffectRun.current) return;

        const verifyAndSaveToDb = async () => {
            try {
                hasEffectRun.current = true;
                setLoading(true);
                const currentEmail = await fetchLoggedUser();

                const bookingData = {
                    sessionId: sessionId,
                    classId: classId,
                    userEmail: currentEmail,
                    price: price ? Number(price) : 0
                };

                const result = await saveBookingInfo(bookingData);

             
                if (result && result.success) {
                    setStatus("success");
                    toast.success("Payment Successful! Congratulations");
                }

                else {
                    console.log("Server response on duplicate/error check:", result);

                    const errorStr = JSON.stringify(result).toLowerCase();

                    if (
                        errorStr.includes("already") ||
                        errorStr.includes("duplicate") ||
                        errorStr.includes("recorded") ||
                        errorStr.includes("e11000")
                    ) {
                        setStatus("success");
                    } else {
                        setStatus("error");
                        toast.error(result?.message || "Failed to sync transaction info.");
                    }
                }
            } catch (error) {
                console.error("Verification processing error:", error);
                const catchErrorStr = error.message?.toLowerCase() || "";
                if (catchErrorStr.includes("already") || catchErrorStr.includes("duplicate")) {
                    setStatus("success");
                } else {
                    setStatus("error");
                    toast.error("An error occurred during verification.");
                }
            } finally {
                setLoading(false);
            }
        };

        verifyAndSaveToDb();
    }, [sessionId, classId, price, searchParams]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 text-white">
                <FaSpinner className="text-flexuraNeon animate-spin" size={40} />
                <div className="text-center space-y-1">
                    <p className="text-sm font-display uppercase tracking-widest text-zinc-200">Verifying Payment & Syncing Database...</p>
                    <p className="text-xs text-zinc-500">Please do not refresh or close this window.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 selection:bg-flexuraNeon selection:text-black">
            <div className="max-w-md w-full bg-zinc-900/30 backdrop-blur-md border border-zinc-900 p-8 rounded-xs text-center space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-flexuraNeon to-transparent"></div>

                {status === "success" ? (
                    <>
                        <div className="flex justify-center">
                            <div className="p-3 bg-flexuraNeon/10 border border-flexuraNeon/30 rounded-full text-flexuraNeon animate-bounce">
                                <FaCheckCircle size={48} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-2xl font-display font-black uppercase tracking-tight text-white">
                                Payment Confirmed!
                            </h1>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Your enrollment is successful. The gym class has been added to your dashboard in training schedule.
                            </p>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xs text-left space-y-2.5 text-xs font-sans">
                            <div className="flex items-center gap-2 text-zinc-400 font-display uppercase tracking-wider text-[10px] font-bold border-b border-zinc-900 pb-2">
                                <FaReceipt className="text-flexuraNeon" /> Transaction Details
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">User Email:</span>
                                <span className="text-zinc-300 font-medium truncate max-w-[180px]">{userEmail || "N/A"}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-zinc-500">Amount Paid:</span>
                                <span className="text-flexuraNeon font-bold">${price || 0}</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={() => router.push("/dashboard/user/booked-classes")}
                                className="w-full py-3 bg-flexuraNeon text-black hover:bg-white text-xs uppercase font-display font-black tracking-widest transition-all rounded-xs flex items-center justify-center gap-2 group"
                            >
                                Go to Dashboard <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center">
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-full text-red-500">
                                <FaTimesCircle size={48} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-2xl font-display font-black uppercase tracking-tight text-red-500">
                                Verification Failed
                            </h1>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                We encountered an issue syncing your schedule. If your payment was completed, please contact our support desk with your Session ID for manual verification.
                            </p>
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={() => router.push("/classes")}
                                className="w-full py-3 bg-transparent border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all text-xs uppercase font-display font-bold tracking-wider rounded-xs"
                            >
                                Back to Classes
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}