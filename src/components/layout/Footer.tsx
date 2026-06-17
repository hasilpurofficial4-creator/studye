import Link from "next/link";
import { IoSchoolOutline } from "react-icons/io5";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { APP_NAME, APP_OWNER, ROUTES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark-900/80">
      {/* Neon divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IoSchoolOutline className="w-7 h-7 text-neon-blue" />
              <span className="font-display font-bold text-lg neon-text">{APP_NAME}</span>
            </div>
            <p className="text-white/40 text-sm font-body leading-relaxed">
              Premium gaming-style academy platform for modern education.
              Empowering students and teachers with cutting-edge technology.
            </p>
            <p className="mt-3 text-sm font-display text-neon-purple">
              By {APP_OWNER}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/80 mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", href: ROUTES.HOME },
                { label: "Student Portal", href: ROUTES.STUDENT.LOGIN },
                { label: "Teacher Portal", href: ROUTES.TEACHER.LOGIN },
                { label: "About Us", href: ROUTES.ABOUT },
                { label: "Contact", href: ROUTES.CONTACT },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-white/40 hover:text-neon-blue transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/80 mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-white/40">
                <FiMail className="text-neon-blue" />
                <span>info@studyhublahore.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <FiPhone className="text-neon-blue" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <FiMapPin className="text-neon-blue" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-xs text-white/30 font-body">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved. Designed & Developed by {APP_OWNER}.
          </p>
          <p className="text-xs text-white/20 mt-1">
            Demo Version 1.0 | Premium Academy Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
