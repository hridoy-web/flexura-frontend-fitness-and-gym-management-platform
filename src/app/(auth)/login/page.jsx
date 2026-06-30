"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData.entries());

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(error?.message || "Invalid email or password!");
                setIsLoading(false);
                return;

            } else {
                toast.success("Login successful!");
                setIsLoading(false);
                window.location.href = "/";
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again!");
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Google login failed!");
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-zinc-950 text-white flex items-center justify-center relative overflow-hidden px-4 py-12 sm:py-16">
            {/* Background  Grid Layout */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0" />

            {/* Login Card Main */}
            <div className="w-full max-w-lg bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-6 sm:p-10 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="font-display text-2xl sm:text-3xl font-black uppercase italic tracking-wider">
                        LOGIN YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon to-flexuraPurple">ACCOUNT</span>
                    </h2>
                </div>

                {/* Google Sign-In/Login Button */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isLoading || isGoogleLoading}
                        className="w-full flex items-center justify-center gap-3 font-display text-xs font-black tracking-widest uppercase bg-zinc-950 border border-zinc-800 text-zinc-200 py-3.5 px-4 rounded-none hover:border-zinc-700 hover:text-white transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGoogleLoading ? (
                            <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <FcGoogle size={18} />
                        )}
                        {isGoogleLoading ? "VERIFYING..." : "CONTINUE WITH GOOGLE"}
                    </button>

                    <div className="relative flex py-4 items-center">
                        <div className="flex-grow border-t border-zinc-800/80"></div>
                        <span className="flex-shrink mx-4 font-display text-[10px] font-bold text-zinc-600 tracking-widest uppercase">OR SIGN IN WITH EMAIL</span>
                        <div className="flex-grow border-t border-zinc-800/80"></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label className="block font-display text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-2">Email Address</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                                <FaEnvelope size={14} />
                            </span>
                            <input
                                type="email"
                                name="email"
                                required
                                disabled={isLoading || isGoogleLoading}
                                placeholder="example@flexura.com"
                                className="w-full bg-zinc-950/80 border border-zinc-800 pl-11 pr-4 py-3 text-sm rounded-none focus:outline-none focus:border-flexuraNeon text-white disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block font-display text-[11px] font-bold tracking-wider text-zinc-400 uppercase">Password</label>

                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                                <FaLock size={14} />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                disabled={isLoading || isGoogleLoading}
                                placeholder="••••••••"
                                className="w-full bg-zinc-950/80 border border-zinc-800 pl-11 pr-12 py-3 text-sm rounded-none focus:outline-none focus:border-flexuraNeon text-white disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading || isGoogleLoading}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-500"
                            >
                                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button with Spinner */}
                    <button
                        type="submit"
                        disabled={isLoading || isGoogleLoading}
                        className="w-full flex items-center justify-center gap-2 font-display text-xs font-black tracking-widest uppercase bg-gradient-to-r from-flexuraNeon to-flexuraPurple text-white py-4 rounded-none hover:shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {isLoading && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {isLoading ? "AUTHORIZING..." : "SIGN IN TO SYSTEM"}
                    </button>
                </form>

                <p className="font-sans text-xs text-center text-zinc-500 mt-6">
                    New to the elite network?{" "}
                    <Link href="/register" className="text-flexuraNeon hover:underline font-medium">
                        Create An Account
                    </Link>
                </p>
            </div>
        </div>
    );
}