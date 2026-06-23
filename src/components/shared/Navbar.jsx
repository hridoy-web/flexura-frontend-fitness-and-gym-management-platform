"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // console.log(user);

  const handleLogOut = async () => {
    await authClient.signOut()
    router.push('/login')
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Classes", path: "/classes" },
    { name: "Community Forum", path: "/forum" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <div className="shrink-0">
            <Link href="/" className="group">
              <span className="font-display text-2xl font-black tracking-widest uppercase italic text-white transition-colors">
                FLEX<span className="text-flexuraNeon drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">URA</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-display text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-1
                  ${isActive(link.path)
                    ? "text-flexuraNeon"
                    : "text-zinc-400 hover:text-white"
                  }
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-flexuraNeon after:transition-all after:duration-300
                  ${isActive(link.path) ? "after:w-full shadow-[0_4px_10px_rgba(0,240,255,0.2)]" : "after:w-0 hover:after:w-full"}
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Zone - Desktop */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <div className="flex items-center gap-6">

                <Link
                  href={`/dashboard/${user?.role}`}
                  className={`font-display text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-1
                    ${isActive(`/dashboard/${user?.role}`) ? "text-flexuraNeon" : "text-zinc-400 hover:text-white"}`}
                >
                  Dashboard
                </Link>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end dropdown-hover">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-flexuraNeon/30 hover:ring-flexuraNeon shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative">

                      <Image
                        src={user?.image || "/default-avatar.png"}
                        alt="User Profile"
                        width={40}
                        height={40}
                        priority={true}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </label>

                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-0 z-[1] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-zinc-900 border border-zinc-800 rounded-none w-56 text-zinc-200 backdrop-blur-md">
                    <li className="px-4 py-3 border-b border-zinc-800 font-sans pointer-events-none">
                      <p className="font-bold text-white truncate text-sm">{user?.name}</p>
                      <p className="text-[10px] text-flexuraNeon uppercase font-bold tracking-widest font-display mt-0.5">{user?.role}</p>
                    </li>
                    <li className="mt-1">
                      <Link href={`/dashboard/${user?.role}`} className="font-sans py-2.5 hover:bg-zinc-800 rounded-none">
                        My Dashboard
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut} className="text-red-400 font-medium font-sans py-2.5 hover:bg-red-500/10 rounded-none">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="font-display text-[11px] font-bold tracking-widest uppercase bg-zinc-900/50 text-zinc-300 border border-zinc-800 px-6 py-3 rounded-none hover:border-flexuraNeon hover:text-white transition-all duration-300"
                >
                  LOG IN
                </Link>
                <Link
                  href="/register"
                  className="font-display text-[11px] font-bold tracking-widest uppercase bg-gradient-to-r from-flexuraNeon to-flexuraPurple text-white px-6 py-3 rounded-none hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 transform active:scale-95"
                >
                  REGISTER
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white focus:outline-none p-2 transition-colors"
            >
              {isOpen ? <IoClose size={26} className="text-flexuraNeon" /> : <HiMenuAlt3 size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-4 pt-2 pb-6 space-y-3 bg-zinc-950 border-t border-zinc-900">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`block font-display text-sm font-medium uppercase tracking-widest px-4 py-3 rounded-none transition-colors
                ${isActive(link.path) ? "bg-flexuraNeon/10 text-flexuraNeon border-l-2 border-flexuraNeon" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <Link
              href={`/dashboard/${user?.role}`}
              onClick={() => setIsOpen(false)}
              className={`block font-display text-sm font-medium uppercase tracking-widest px-4 py-3 rounded-none transition-colors
                ${isActive(`/dashboard/${user?.role}`) ? "bg-flexuraNeon/10 text-flexuraNeon border-l-2 border-flexuraNeon" : "text-zinc-400 hover:bg-zinc-900"}`}
            >
              Dashboard
            </Link>
          )}

          <div className="pt-4 border-t border-zinc-900 flex flex-col gap-4">
            {user ? (
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/40 border border-zinc-900 font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative ring-2 ring-flexuraNeon">

                    <Image
                      src={user?.image || "/default-avatar.png"}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm truncate max-w-[120px]">{user?.name}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-display">{user?.role}</p>
                  </div>
                </div>
                <button onClick={() => { handleLogOut, setIsOpen(false); }} className="text-red-400 text-xs font-bold uppercase tracking-wider underline hover:text-red-300">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 px-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center font-display text-sm font-bold tracking-widest uppercase bg-transparent border border-zinc-800 text-zinc-300 py-3 rounded-none active:bg-zinc-900"
                >
                  LOG IN
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center font-display text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-flexuraNeon to-flexuraPurple text-white py-3 rounded-none"
                >
                  REGISTER
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}