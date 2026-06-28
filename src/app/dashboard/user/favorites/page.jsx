"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getFavoriteClasses, deleteFavoriteClass } from "@/lib/actions/userDashboardApi";
import { FaTrash, FaDumbbell, FaSpinner, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function FavoriteClassesPage() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!session?.user?.email) return;
    try {
      setLoading(true);
      const data = await getFavoriteClasses(session.user.email);
      if (data) setFavorites(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [session]);

  const handleDelete = async (id) => {
    try {
      const result = await deleteFavoriteClass(id);
      if (result?.success) {
        setFavorites(favorites.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <FaSpinner className="text-flexuraNeon animate-spin text-4xl" />
        <p className="text-zinc-500 text-xs font-display uppercase tracking-widest animate-pulse">Synchronizing Favorites Classes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-wider uppercase font-display">Favorite Classes</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-display">Saves and quick-access classes catalog</p>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-12 text-center text-zinc-500">
          <p className="text-sm font-semibold uppercase tracking-wider">No favorite classes registered.</p>
          <Link href="/classes" className="mt-4 inline-block px-5 py-3 border border-zinc-800 hover:border-flexuraNeon/30 hover:text-flexuraNeon rounded-xl text-xs font-black uppercase tracking-widest font-display transition duration-300">Explore Classes</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div key={item._id} className="group relative rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm overflow-hidden flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-flexuraNeon/30">
              <div className="relative w-full h-44 bg-zinc-900">
                {item.image ? <Image src={item.image} alt="Class Cover" fill className="object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="w-full h-full flex items-center justify-center text-zinc-700"><FaDumbbell size={40} /></div>}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <span className="absolute top-4 left-4 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest bg-zinc-950 border border-zinc-800 rounded text-flexuraNeon font-display">{item.category || "Fitness"}</span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-base font-bold text-zinc-100 tracking-wide">{item.className}</h4>
                  <p className="text-xs text-zinc-500 mt-2 line-clamp-2">{item.description || "Take this expert-led fitness course to push your ultimate boundaries."}</p>
                </div>
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-zinc-900">
                  <button onClick={() => handleDelete(item._id)} className="p-3 text-red-500 hover:text-white border border-zinc-900 hover:border-red-500/30 hover:bg-red-500/10 rounded-xl transition-all duration-300"><FaTrash size={12} /></button>
                  <Link href={`/classes/${item.classId}`} className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 border border-zinc-800 hover:border-flexuraNeon/30 rounded-xl bg-zinc-900/40 text-zinc-400 hover:text-flexuraNeon text-[10px] font-black uppercase tracking-widest font-display transition duration-300">View Details <FaChevronRight size={8} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}