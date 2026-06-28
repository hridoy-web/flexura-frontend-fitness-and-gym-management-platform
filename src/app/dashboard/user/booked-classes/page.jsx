"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { FaSpinner, FaCalendarAlt, FaChevronRight, FaDumbbell, FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { getBookedClasses } from "@/lib/actions/userDashboardApi";


export default function BookedClassesPage() {
  const { data: session } = useSession();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.email) return;
      try {
        setLoading(true);
        const data = await getBookedClasses(session.user.email);
        setClasses(data || []);
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <FaSpinner className="text-flexuraNeon animate-spin text-4xl" />
        <p className="text-zinc-500 text-xs font-display uppercase tracking-widest animate-pulse">
          Synchronizing Booked Classes...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Grid */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-wider uppercase font-display">
          Booked Classes
        </h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1.5 font-display">
          Registry of certified classes & training schedules
        </p>
      </div>

      {classes.length === 0 ? (
        <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-12 text-center text-zinc-500">
          <p className="text-sm font-semibold uppercase tracking-wider font-display">
            No active booked classes detected.
          </p>
          <Link
            href="/classes"
            className="mt-4 inline-block px-5 py-3 border border-zinc-800 hover:border-flexuraNeon/30 hover:text-flexuraNeon rounded-xl text-xs font-black uppercase tracking-widest font-display transition duration-300"
          >
            Explore Classes
          </Link>
        </div>
      ) : (
        /* 💎 Modern Glassmorphism Table Layout - Matching image_082e14 layout with Cyber Theme */
        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-900/60 bg-zinc-950/40 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.6)]">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-950/90 text-[10px] font-black uppercase tracking-widest text-zinc-400 font-display">
                <th className="py-5 px-6">Class</th>
                <th className="py-5 px-6">Trainer</th>
                <th className="py-5 px-6">Schedule</th>
                <th className="py-5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/40">
              {classes.map((item) => {
                // ফলব্যাক ক্লাস নেম এবং ইমেজের জন্য বুদ্ধিমান চেক
                const displayClassName = item.className && item.className !== "N/A" ? item.className : "Premium Fitness Session";
                const displayTrainer = item.trainerName && item.trainerName !== "Expert Trainer" ? item.trainerName : "Certified Instructor";
                const displaySchedule = Array.isArray(item.scheduleDays) && item.scheduleDays.length > 0 
                  ? item.scheduleDays.join(", ") 
                  : "Mon, Wed, Fri";
                const displayTime = item.time && item.time !== "Flexible" ? item.time : "08:00 AM";

                return (
                  <tr key={item.bookingId || item.classId} className="hover:bg-zinc-900/30 transition-all duration-300 group">
                    {/* Class Column: Rounded image and info side-by-side (As requested in reference) */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-xl border border-zinc-800/80 bg-zinc-900 overflow-hidden shrink-0 group-hover:border-flexuraNeon/40 transition-colors duration-300">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={displayClassName}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-900">
                              <FaDumbbell size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-zinc-100 text-sm tracking-wide group-hover:text-flexuraNeon transition-colors duration-200">
                            {displayClassName}
                          </div>
                          <div className="text-[9px] font-black uppercase text-zinc-500 mt-1 tracking-widest font-display">
                            {item.category || "Fitness Matrix"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Trainer Column */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800/50 text-zinc-400">
                          <FaUser size={10} />
                        </div>
                        <div>
                          <div className="font-bold text-zinc-300 text-xs uppercase tracking-wider font-display">
                            {displayTrainer}
                          </div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">
                            {item.trainerEmail || "verified@flexura.com"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Schedule Column */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <FaCalendarAlt className="text-flexuraNeon drop-shadow-[0_0_5px_rgba(0,240,255,0.4)]" size={12} />
                        <span className="font-semibold tracking-wide">{displaySchedule}</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-1 font-display uppercase tracking-wider">
                        Slot: {displayTime}
                      </div>
                    </td>

                    {/* Action Column with view class styling */}
                    <td className="py-5 px-6 text-right">
                      <Link
                        href={`/classes/${item.classId}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 border border-zinc-800 hover:border-flexuraNeon/30 rounded-xl bg-zinc-900/40 text-zinc-400 hover:text-flexuraNeon text-[10px] font-black uppercase tracking-widest font-display transition-all duration-300 shadow-lg hover:shadow-flexuraNeon/5"
                      >
                        View Class <FaChevronRight size={7} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}