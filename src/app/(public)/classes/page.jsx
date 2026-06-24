"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaDumbbell, FaSpinner } from "react-icons/fa";
import AllClassesCard from "@/components/ui/AllClassesCard";
import { getAllClasses } from "@/lib/actions/homeActions";


export default function AllClassesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClassesData = async () => {
            setLoading(true);
            const data = await getAllClasses(searchQuery, selectedCategory);
            console.log(data);
            setClasses(data || []);
            setLoading(false);
        };

        const delayDebounce = setTimeout(() => {
            fetchClassesData();
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, selectedCategory]);


    const categories = ["All", "Home Workout", "Weights", "Yoga", "Cardio"];

    return (
        <main className="min-h-screen bg-zinc-950 text-white py-18 px-4 sm:px-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none z-0" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-flexuraNeon/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* PAGE HEADER */}
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

                    {/* Dynamic Category Buttons */}
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

                {/* CLASSES GRID & LOADING STATES */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <FaSpinner className="text-flexuraNeon animate-spin" size={30} />
                        <p className="text-zinc-500 text-[10px] font-display uppercase tracking-widest animate-pulse">Syncing catalog...</p>
                    </div>
                ) : classes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {classes.map((item, index) => (
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
                            No classes found matching your criteria.
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
}