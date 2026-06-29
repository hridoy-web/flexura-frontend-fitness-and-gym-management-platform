"use client";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaDumbbell, FaAward } from "react-icons/fa";

const trainers = [
    {
        id: 1,
        name: "Alex Mercer",
        role: "Head Coach / Biomechanics Specialist",
        specialty: "Powerlifting & Hypertrophy",
        experience: "8+ Years Experience",
        image: "/images/trainer-3.jpg",
    },
    {
        id: 2,
        name: "Seraphina Vane",
        role: "Elite Tactical Trainer",
        specialty: "High-Intensity Cardio & Calisthenics",
        experience: "6+ Years Experience",
        image: "/images/girl-trainer-2.jpg",
    },
    {
        id: 3,
        name: "Jaxson Reed",
        role: "Kinesiology Expert",
        specialty: "Functional Mobility & Shredding",
        experience: "5+ Years Experience",
        image: "/images/trainer-1.jpg",
    }
];

// Framer Motion Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut" } 
    }
};

export default function EliteTrainers() {
    return (
        <section className="bg-zinc-950 text-white py-16 sm:py-24 relative overflow-hidden px-4 border-t border-zinc-900">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-flexuraNeon font-display text-xs font-black tracking-widest uppercase mb-3 bg-flexuraNeon/5 border border-flexuraNeon/20 px-3 py-1">
                        <FaDumbbell className="animate-spin-slow" /> MASTER ARCHITECTS
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-black uppercase italic tracking-wider">
                        MEET YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon to-flexuraPurple">ELITE TRAINERS</span>
                    </h2>
                    <p className="text-zinc-500 text-sm mt-3 font-sans max-w-md mx-auto leading-relaxed">
                        Shatter your limits with tactical guidance from certified professionals dedicated to optimizing your human potential.
                    </p>
                </div>

                {/* Animated Trainers Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {trainers.map((trainer) => (
                        <motion.div 
                            key={trainer.id}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md group hover:border-flexuraNeon/50 transition-all duration-300 flex flex-col relative overflow-hidden"
                        >
                            {/* Trainer Image */}
                            <div className="relative h-80 w-full overflow-hidden bg-zinc-950">
                                <img 
                                    src={trainer.image} 
                                    alt={trainer.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                                
                                {/* Experience Floating Badge */}
                                <div className="absolute top-4 right-4 bg-zinc-950/90 border border-zinc-800 px-2.5 py-1 flex items-center gap-1">
                                    <FaAward size={10} className="text-flexuraNeon" />
                                    <span className="text-[10px] font-bold text-zinc-300 tracking-wider uppercase">{trainer.experience}</span>
                                </div>
                            </div>

                            {/* Trainer Info */}
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-display font-black tracking-widest text-flexuraPurple uppercase block mb-1">
                                        {trainer.role}
                                    </span>
                                    <h3 className="font-display text-xl font-black uppercase italic tracking-wide group-hover:text-flexuraNeon transition-colors mb-3">
                                        {trainer.name}
                                    </h3>
                                    <p className="text-xs text-zinc-400 font-sans border-l-2 border-flexuraNeon pl-3 py-0.5 mb-6">
                                        <span className="text-zinc-500 font-medium block uppercase text-[9px] tracking-wider mb-0.5">Specialization:</span>
                                        {trainer.specialty}
                                    </p>
                                </div>

                                {/* Social Links */}
                                <div className="border-t border-zinc-800/60 pt-4 flex items-center gap-4 text-zinc-500">
                                    <a href="#" className="hover:text-flexuraNeon transition-colors"><FaInstagram size={16} /></a>
                                    <a href="#" className="hover:text-flexuraNeon transition-colors"><FaTwitter size={16} /></a>
                                </div>
                            </div>

                            {/* Tech Accent Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-800 group-hover:bg-gradient-to-r group-hover:from-flexuraNeon group-hover:to-flexuraPurple transition-colors" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}