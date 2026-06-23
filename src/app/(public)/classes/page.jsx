"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaDumbbell } from "react-icons/fa";
import AllClassesCard from "@/components/ui/AllClassesCard";

const MOCK_ALL_CLASSES = [
    {
        _id: "class1",
        className: "Cyber Strength & Conditioning",
        trainerName: "Alex Mercer",
        category: "Weights",
        price: 49,
        duration: "60 mins",
        bookingCount: 142,
        status: "Approved",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
    },
    {
        _id: "class2",
        className: "Neon Flow Yoga",
        trainerName: "Seraphina Vane",
        category: "Yoga",
        price: 35,
        duration: "45 mins",
        bookingCount: 98,
        status: "Approved",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop"
    },
    {
        _id: "class3",
        className: "Hyperdrive Cardio Blast",
        trainerName: "Jaxson Reed",
        category: "Cardio",
        price: 40,
        duration: "50 mins",
        bookingCount: 87,
        status: "Approved",
        image: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?q=80&w=600&auto=format&fit=crop"
    },
    {
        _id: "class4",
        className: "Iron Core Shred",
        trainerName: "Alex Mercer",
        category: "Cardio",
        price: 45,
        duration: "45 mins",
        bookingCount: 110,
        status: "Approved",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
    },
    {
        _id: "class5",
        className: "Tactical Powerlifting",
        trainerName: "Jaxson Reed",
        category: "Weights",
        price: 55,
        duration: "75 mins",
        bookingCount: 64,
        status: "Approved",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
    }
];

export default function AllClassesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Weights", "Yoga", "Cardio"];

    const filteredClasses = MOCK_ALL_CLASSES.filter((item) => {
        const isApproved = item.status === "Approved";
        const matchesSearch = item.className.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        
        return isApproved && matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-zinc-950 text-white py-18 px-4 sm:px-6 relative overflow-hidden">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none z-0" />

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-flexuraNeon/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* PAGE HEADER (CENTER ALIGNED) */}
                <div className="border-b border-zinc-900 pb-8 lg:mb-6 flex flex-col items-center text-center">

                    <div className="flex items-center gap-2 text-flexuraNeon font-display text-xs font-black tracking-widest uppercase mb-2">
                        <FaDumbbell />EXPLORE PROGRAMS
                    </div>
                    <h1 className="font-display text-4xl lg:text-5xl font-black uppercase italic tracking-wider">

                        OUR FITNESS <span className="text-transparent bg-clip-text bg-gradient-to-r from-flexuraNeon to-flexuraPurple">CLASSES</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-sans mt-3 tracking-wide uppercase max-w-72 lg:max-w-xl">
                        Find the perfect workout regime and book your session with expert trainers.
                    </p>
                </div>

                {/* SEARCH & FILTER CONTROLS */}
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-zinc-900/20 border border-zinc-900 p-5 backdrop-blur-sm mb-10">
                    <div className="relative w-full lg:max-w-md group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 group-focus-within:text-flexuraNeon transition-colors">
                            <FaSearch size={13} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search classes by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 py-3 pl-11 pr-4 text-xs font-sans text-white placeholder-zinc-600 focus:outline-none focus:border-flexuraNeon transition-all duration-300 rounded-none"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 text-[10px] font-display font-black tracking-widest uppercase transition-all duration-200 border ${
                                    selectedCategory === cat
                                        ? "bg-flexuraNeon text-black border-flexuraNeon"
                                        : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CLASSES GRID */}
                {filteredClasses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredClasses.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.04 }}
                            >
                                <AllClassesCard item={item} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-zinc-900/10 border border-zinc-900/60 border-dashed p-4">
                        <p className="font-display text-xs font-bold tracking-widest uppercase text-zinc-500">
                            No classes found matching your search or category filter.
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
}