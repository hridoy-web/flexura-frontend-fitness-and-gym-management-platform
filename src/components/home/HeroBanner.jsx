"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroBanner() {
    return (
        <div
            suppressHydrationWarning={true}
            className="min-h-[calc(100vh-80px)] bg-zinc-950 text-white overflow-hidden relative flex items-center"
        >

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 z-0 pointer-events-none" />

            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-flexuraPurple/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute right-10 top-1/4 w-96 h-96 bg-flexuraNeon/5 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

                    <div className="lg:col-span-7 xl:col-span-7 text-center lg:text-left order-2 lg:order-1 w-full">

                        {/* Tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 px-4 py-2 mb-6 backdrop-blur-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-flexuraNeon animate-pulse shadow-[0_0_10px_#00F0FF]" />
                            <p className="font-display text-[8px] md:text-xs font-black tracking-[0.25em] text-zinc-300 uppercase">
                                THE NEXT GENERATION OF ATHLETIC EVOLUTION
                            </p>
                        </motion.div>

                        <h1
                            suppressHydrationWarning={true}
                            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-black uppercase italic tracking-normal leading-[1.25] sm:leading-[1.2] md:leading-[1.2] lg:leading-[1.2] xl:leading-[1.2] mb-6 block"
                        >
                            FORGE YOUR BODY
                            <br className="hidden sm:block" />
                            <span className="mt-1 block text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon via-cyan-400 to-flexuraPurple drop-shadow-[0_0_30px_rgba(0,240,255,0.25)] py-1">
                                BREAK ALL LIMITS
                            </span>
                        </h1>

                        {/* Brief Description */}
                        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-10 tracking-wide leading-relaxed">
                            Welcome to Flexura. Streamline your fitness journey on a unified tactical platform. Book elite trainer-led classes, track biometric milestones, and dominate your goals alongside a high-performance cyber-gym community.
                        </p>

                        {/* Interactive Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full">
                            <Link
                                href="/classes"
                                className="w-full sm:w-auto font-display text-xs font-black tracking-widest uppercase bg-gradient-to-r from-flexuraNeon to-flexuraPurple text-white px-10 py-4 rounded-none hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-center"
                            >
                                EXPLORE CLASSES
                            </Link>

                            <Link
                                href="/forum"
                                className="w-full sm:w-auto font-display text-xs font-black tracking-widest uppercase bg-zinc-900/60 text-zinc-300 border border-zinc-800 px-10 py-4 rounded-none hover:border-flexuraNeon hover:text-white transition-all duration-300 text-center backdrop-blur-md"
                            >
                                JOIN COMMUNITY
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 w-full lg:mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[450px] aspect-[427/540] group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-flexuraPurple to-flexuraNeon opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500 rounded-none -z-10" />
                            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-flexuraNeon" />
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-flexuraPurple" />

                            <div className="w-full h-full overflow-hidden border border-zinc-800 bg-zinc-900 relative">
                                <Image
                                    src="/images/gym-boy-hero-banner.jpg"
                                    alt="Flexura Tactical Training"
                                    fill
                                    sizes="(max-w-7xl) 100vw, 40vw"
                                    priority
                                    className="object-cover object-center transition-all duration-700 ease-in-out transform group-hover:scale-105"
                                />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/*  Stats */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md hidden lg:block z-20">
                <div className="max-w-7xl mx-auto grid grid-cols-3 divide-x divide-zinc-900 text-center py-5">
                    <div>
                        <p className="font-display text-lg font-black text-white">05+</p>
                        <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Elite Programs</p>
                    </div>
                    <div>
                        <p className="font-display text-lg font-black text-flexuraNeon">2000+</p>
                        <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Active Members</p>
                    </div>
                    <div>
                        <p className="font-display text-lg font-black text-white">99.4%</p>
                        <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Success Rate</p>
                    </div>
                </div>
            </div>

        </div>
    );
}