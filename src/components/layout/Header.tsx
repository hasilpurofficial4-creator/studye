"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { ROUTES, APP_NAME } from "@/lib/constants";
import { FiLock } from "react-icons/fi";

const navLinks = [
  { label: "Main", href: ROUTES.HOME },
  { label: "Student", href: ROUTES.STUDENT.LOGIN },
  { label: "Teacher", href: ROUTES.TEACHER.LOGIN },
  { label: "Contact Us", href: ROUTES.CONTACT },
  { label: "About Us", href: ROUTES.ABOUT },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <IoSchoolOutline className="w-8 h-8 text-neon-blue group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all" />
            <span className="font-display font-bold text-lg neon-text hidden sm:block">{APP_NAME}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  px-4 py-2 rounded-lg text-sm font-display uppercase tracking-wider transition-all duration-300
                  ${pathname === link.href
                    ? "text-neon-blue bg-neon-blue/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Admin Lock Icon */}
            <Link href="/admin" className="relative p-2 text-white/60 hover:text-neon-purple transition-colors" title="Admin Panel">
              <FiLock size={20} />
            </Link>

            {/* Auth */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href={user.role === "admin" ? ROUTES.ADMIN.HOME : user.role === "teacher" ? ROUTES.TEACHER.DASHBOARD : ROUTES.STUDENT.DASHBOARD}
                  className="px-3 py-1.5 text-sm font-display text-neon-green hover:bg-neon-green/10 rounded-lg transition-colors"
                >
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-sm font-display text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href={ROUTES.STUDENT.LOGIN}
                className="hidden md:block px-4 py-2 text-sm font-display font-bold uppercase tracking-wider border border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] rounded-lg transition-all"
              >
                Login
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white"
            >
              {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-white/[0.06] animate-slide-down">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  px-4 py-3 rounded-lg text-sm font-display uppercase tracking-wider transition-all
                  ${pathname === link.href
                    ? "text-neon-blue bg-neon-blue/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href={user.role === "admin" ? ROUTES.ADMIN.HOME : ROUTES.STUDENT.DASHBOARD}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-display text-neon-green"
                >
                  Dashboard ({user.name})
                </Link>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="px-4 py-3 rounded-lg text-sm font-display text-red-400 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href={ROUTES.STUDENT.LOGIN}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-display font-bold uppercase text-neon-blue"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
