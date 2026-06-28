"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

export default function Footer() {
  const pathname = usePathname()

  if (pathname.includes('dashboard')) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 relative overflow-hidden">

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-flexuraPurple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/*Logo & About */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-black tracking-widest uppercase italic text-white">
                FLEX<span className="text-flexuraNeon drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">URA</span>
              </span>
            </Link>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              Experience the next generation of athletic evolution. Premium facilities, high-performance tracking, and expert-led tactical training.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-flexuraNeon hover:border-flexuraNeon transition-all duration-300 rounded-none">
                <FaFacebookF size={16} />
              </a>

              <a href="#" className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-flexuraNeon hover:border-flexuraNeon transition-all duration-300 rounded-none">
                <FaXTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-flexuraNeon hover:border-flexuraNeon transition-all duration-300 rounded-none">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-flexuraNeon hover:border-flexuraNeon transition-all duration-300 rounded-none">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/*  Links */}
          <div>
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-white border-l-2 border-flexuraNeon pl-3 mb-6">
              QUICK LINKS
            </h4>
            <ul className="space-y-3 font-sans text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-flexuraNeon transition-colors duration-300 flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-flexuraNeon text-xs">→</span> Home
                </Link>
              </li>
              <li>
                <Link href="/classes" className="hover:text-flexuraNeon transition-colors duration-300 flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-flexuraNeon text-xs">→</span> All Classes
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-flexuraNeon transition-colors duration-300 flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-flexuraNeon text-xs">→</span> Community Forum
                </Link>
              </li>
            </ul>
          </div>

          {/*  Legal Links */}
          <div>
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-white border-l-2 border-flexuraNeon pl-3 mb-6">
              RESOURCES
            </h4>
            <ul className="space-y-3 font-sans text-sm text-zinc-400">
              <li>
                <Link href="#" className="hover:text-flexuraNeon transition-colors duration-300">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-flexuraNeon transition-colors duration-300">Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-flexuraNeon transition-colors duration-300">Support Center</Link>
              </li>
            </ul>
          </div>

          {/*  Contact Information */}
          <div>
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-white border-l-2 border-flexuraNeon pl-3 mb-6">
              CONTACT INFO
            </h4>
            <ul className="space-y-4 font-sans text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-flexuraNeon mt-0.5 flex-shrink-0" size={18} />
                <span>Chittagong, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="text-flexuraNeon flex-shrink-0" size={18} />
                <span className="hover:text-white transition-colors">01610964475</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-flexuraNeon flex-shrink-0" size={18} />
                <span className="hover:text-white transition-colors truncate">t.okay383@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/*  Copyright Info */}
        <div className="border-t border-zinc-900/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="font-sans text-xs text-zinc-500">
            &copy; {currentYear} <span className="text-zinc-300 font-medium">FLEXURA</span>. All Rights Reserved.
          </p>
          <p className="font-display text-[10px] tracking-[0.15em] text-zinc-600 uppercase">
            DESIGNED FOR <span className="text-zinc-500">HIGH PERFORMANCE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}