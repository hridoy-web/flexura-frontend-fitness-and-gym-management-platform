"use client";
import { motion } from "framer-motion";
import { FaBolt, FaLock, FaGlobe, FaAward } from "react-icons/fa"; 

export default function CoreInfrastructure() {

    const fadeInLeft = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
    };

    return (
        <section className="bg-zinc-950 text-white py-20 sm:py-28 relative overflow-hidden px-4 border-t border-zinc-900">
            {/* Background Cyber Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-flexuraNeon/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#141416_1px,transparent_1px)] bg-[size:6rem] opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* LEFT SIDE: Premium Gym Visual */}
                    <motion.div 
                        variants={fadeInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:col-span-5 relative group"
                    >
                        <div className="absolute -inset-3 border border-zinc-800 pointer-events-none group-hover:border-flexuraNeon/30 transition-colors duration-500 z-0" />
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-flexuraNeon z-20" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-flexuraPurple z-20" />

                        <div className="relative h-[450px] sm:h-[520px] w-full overflow-hidden bg-zinc-900 z-10">
                            <img 
                                src= "/images/flexura_gym_image.jpg" 
                                alt="Flexura Elite Infrastructure" 
                                className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60" />
                        </div>

                        <div className="absolute bottom-6 -right-4 bg-zinc-900 border-2 border-flexuraNeon px-5 py-4 backdrop-blur-md z-20 rounded-none shadow-2xl">
                            <div className="font-display text-3xl font-black text-white italic tracking-tighter">99.8%</div>
                            <div className="text-[9px] font-display font-bold tracking-widest text-zinc-400 uppercase mt-0.5">TARGET OPTIMIZATION</div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE: Cybernetic Value Props */}
                    <motion.div 
                        variants={fadeInRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-flexuraPurple font-display text-xs font-black tracking-widest uppercase mb-3">
                                <FaBolt className="animate-pulse text-flexuraNeon" /> WHY ENTER THE MATRIX
                            </div>
                            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase italic tracking-wider leading-none">
                                BREAK THE RULES.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon via-white to-flexuraPurple">BUILD THE BODY.</span>
                            </h2>
                            <p className="text-zinc-400 text-sm font-sans mt-4 max-w-xl leading-relaxed">
                                Flexura isn't just a standard booking panel. It's a high-performance ecosystem designed to streamline your training schedules, plug you into specialized cohorts, and secure your raw execution metrics.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Protocol 1 */}
                            <div className="bg-zinc-900/30 border border-zinc-800/60 p-5 flex gap-4 hover:bg-zinc-900/50 hover:border-flexuraNeon/40 transition-all duration-300 group/item">
                                <div className="w-10 h-10 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-flexuraNeon group-hover/item:bg-flexuraNeon group-hover/item:text-black transition-colors flex-shrink-0">
                                    <FaAward size={18} /> 
                                </div>
                                <div>
                                    <h4 className="font-display text-base font-black uppercase tracking-wide group-hover/item:text-flexuraNeon transition-colors">
                                        Elite Allocation Matrix
                                    </h4>
                                    <p className="text-xs text-zinc-500 font-sans mt-1 leading-relaxed">
                                        No endless queues. Lock down high-tier spots in muscle hypertrophy, tactical combat cardio, or biomechanics repairs with a single token reservation.
                                    </p>
                                </div>
                            </div>

                            {/* Protocol 2 */}
                            <div className="bg-zinc-900/30 border border-zinc-800/60 p-5 flex gap-4 hover:bg-zinc-900/50 hover:border-flexuraPurple/40 transition-all duration-300 group/item">
                                <div className="w-10 h-10 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-flexuraPurple group-hover/item:bg-flexuraPurple group-hover/item:text-white transition-colors flex-shrink-0">
                                    <FaGlobe size={16} />
                                </div>
                                <div>
                                    <h4 className="font-display text-base font-black uppercase tracking-wide group-hover/item:text-flexuraPurple transition-colors">
                                        Unified Knowledge Exchange
                                    </h4>
                                    <p className="text-xs text-zinc-500 font-sans mt-1 leading-relaxed">
                                        Gain unrestricted, read-only clearance to nutritional vaults and split-routine breakdowns compiled exclusively by master level instructors.
                                    </p>
                                </div>
                            </div>

                            {/* Protocol 3 */}
                            <div className="bg-zinc-900/30 border border-zinc-800/60 p-5 flex gap-4 hover:bg-zinc-900/50 hover:border-rose-500/40 transition-all duration-300 group/item">
                                <div className="w-10 h-10 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-rose-400 group-hover/item:bg-rose-500 group-hover/item:text-black transition-colors flex-shrink-0">
                                    <FaLock size={14} />
                                </div>
                                <div>
                                    <h4 className="font-display text-base font-black uppercase tracking-wide group-hover/item:text-rose-400 transition-colors">
                                        Ironclad Operational Safety
                                    </h4>
                                    <p className="text-xs text-zinc-500 font-sans mt-1 leading-relaxed">
                                        Full architecture transparency governed by dedicated administrators. Verified instructor profiles guarantee safe, expert-level training cycles.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}