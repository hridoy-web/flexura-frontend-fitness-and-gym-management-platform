"use client";
import { useState } from "react";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaImage, FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { imageUpload } from "@/lib/imageUpload";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    // useState
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");

    // password rules
    const validationRules = {
        minLength: passwordInput.length >= 8,
        hasUppercase: /[A-Z]/.test(passwordInput),
        hasLowercase: /[a-z]/.test(passwordInput),
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Form data collect
        const formData = new FormData(e.currentTarget);
        const { name, email, image, password } = Object.fromEntries(formData.entries());

        // validation check condition
        if (!validationRules.minLength || !validationRules.hasUppercase || !validationRules.hasLowercase) {
            toast.error("Please follow all password requirements!");
            setIsLoading(false);
            return;
        }

        try {
            // Imagebb Upload
            const imageData = await imageUpload(image);

            if (!imageData?.url) {
                toast.error("Failed to upload profile image!");
                setIsLoading(false);
                return;
            }

            // betterAuth Setup
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                image: imageData.url,
                password
            });

            if (error) {
                toast.error(error?.message || "Registration failed!");
                setIsLoading(false);
                return;
            } else {
                toast.success(`Registration successful ${data?.user?.name}`);
                setIsLoading(false);
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            toast.error("Something went wrong!");
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setIsGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Google authentication failed!");
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-zinc-950 text-white flex items-center justify-center relative overflow-hidden px-4 py-12 sm:py-16">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0" />

            {/* Register Card Main */}
            <div className="w-full max-w-lg bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-6 sm:p-10 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="font-display text-2xl sm:text-3xl font-black uppercase italic tracking-wider">
                        CREATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon to-flexuraPurple">ACCOUNT</span>
                    </h2>
                </div>

                {/* Google Sign-In Button */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        disabled={isLoading || isGoogleLoading}
                        className="w-full flex items-center justify-center gap-3 font-display text-xs font-black tracking-widest uppercase bg-zinc-950 border border-zinc-800 text-zinc-200 py-3.5 px-4 rounded-none hover:border-zinc-700 hover:text-white transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGoogleLoading ? (
                            <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <FcGoogle size={18} />
                        )}
                        {isGoogleLoading ? "CONNECTING..." : "CONTINUE WITH GOOGLE"}
                    </button>

                    <div className="relative flex py-4 items-center">
                        <div className="flex-grow border-t border-zinc-800/80"></div>
                        <span className="flex-shrink mx-4 font-display text-[10px] font-bold text-zinc-600 tracking-widest uppercase">OR REGISTER WITH EMAIL</span>
                        <div className="flex-grow border-t border-zinc-800/80"></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                        <label className="block font-display text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-2">Full Name</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                                <FaUser size={14} />
                            </span>
                            <input
                                type="text"
                                name="name"
                                required
                                disabled={isLoading || isGoogleLoading}
                                placeholder="John Doe"
                                className="w-full bg-zinc-950/80 border border-zinc-800 pl-11 pr-4 py-3 text-sm rounded-none focus:outline-none focus:border-flexuraNeon text-white disabled:opacity-50"
                            />
                        </div>
                    </div>

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

                    {/* Image Upload Field */}
                    <div>
                        <label className="block font-display text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-2">Profile Image</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                                <FaImage size={14} />
                            </span>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                required
                                disabled={isLoading || isGoogleLoading}
                                className="w-full bg-zinc-950/80 border border-zinc-800 pl-11 pr-4 py-2.5 text-sm rounded-none focus:outline-none focus:border-flexuraNeon file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:bg-zinc-800 file:text-zinc-300 text-zinc-500 cursor-pointer disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block font-display text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-2">Secure Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                                <FaLock size={14} />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
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

                    <div className="bg-zinc-950/60 border border-zinc-800 p-3.5 space-y-2 rounded-none">
                        <p className="font-sans text-[11px] font-semibold text-zinc-400 tracking-wide uppercase">
                            Password Requirements:
                        </p>
                        <ul className="font-sans text-xs space-y-1.5">
                            {/* Rule 1: length  🛠️ */}
                            <li className={`flex items-center gap-2 transition-colors duration-300 ${validationRules.minLength ? "text-emerald-400" : "text-zinc-500"}`}>
                                {validationRules.minLength ? <FaCheck size={10} /> : <FaTimes size={10} className="opacity-40" />}
                                <span>Must be at least 8 characters long.</span>
                            </li>
                            {/* Rule 2: Uppercase */}
                            <li className={`flex items-center gap-2 transition-colors duration-300 ${validationRules.hasUppercase ? "text-emerald-400" : "text-zinc-500"}`}>
                                {validationRules.hasUppercase ? <FaCheck size={10} /> : <FaTimes size={10} className="opacity-40" />}
                                <span>Must include at least one uppercase letter (A-Z).</span>
                            </li>
                            {/* Rule 3: Lowercase */}
                            <li className={`flex items-center gap-2 transition-colors duration-300 ${validationRules.hasLowercase ? "text-emerald-400" : "text-zinc-500"}`}>
                                {validationRules.hasLowercase ? <FaCheck size={10} /> : <FaTimes size={10} className="opacity-40" />}
                                <span>Must include at least one lowercase letter (a-z).</span>
                            </li>
                        </ul>
                    </div>

                    {/* Confirm Button with Spinner */}
                    <button
                        type="submit"
                        disabled={isLoading || isGoogleLoading}
                        className="w-full flex items-center justify-center gap-2 font-display text-xs font-black tracking-widest uppercase bg-gradient-to-r from-flexuraNeon to-flexuraPurple text-white py-4 rounded-none hover:shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {isLoading ? "UPLOADING & REGISTERING..." : "CONFIRM REGISTRATION"}
                    </button>
                </form>

                <p className="font-sans text-xs text-center text-zinc-500 mt-6">
                    Already have an elite account?{" "}
                    <Link href="/login" className="text-flexuraNeon hover:underline font-medium">
                        Log In Here
                    </Link>
                </p>
            </div>
        </div>
    );
}