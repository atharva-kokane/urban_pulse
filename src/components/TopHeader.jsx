"use client";

import { Bell, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TopHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const isLoggedIn =
    typeof window !== "undefined" &&
    localStorage.getItem("adminAuth");

  const adminEmail =
    typeof window !== "undefined" &&
    localStorage.getItem("adminEmail");

  // 🔥 Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-[#1f2a44] bg-[#061226]">

      {/* Logo */}
      <h1 className="text-xl font-semibold text-cyan-400">
        Urban Pulse
      </h1>

      <div className="flex items-center gap-6 relative">

        <Bell className="text-gray-400 cursor-pointer" />

        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>

          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center cursor-pointer shadow-lg"
          >
            <User size={18} />
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-56 bg-[#0B1B33] border border-[#1f2a44]/60 rounded-xl shadow-2xl p-4 space-y-3 animate-fadeIn z-50">

              {isLoggedIn ? (
                <>
                  {/* Admin Info */}
                  <div className="border-b border-[#1f2a44]/40 pb-3">
                    <p className="text-sm text-gray-300 truncate">
                      {adminEmail}
                    </p>
                    <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full">
                      Admin
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      localStorage.removeItem("adminAuth");
                      router.push("/login");
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm 
                    hover:bg-[#0e1f35] text-red-400 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/login")}
                    className="w-full text-left px-3 py-2 rounded-md text-sm 
                    hover:bg-[#0e1f35] transition"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => router.push("/signup")}
                    className="w-full text-left px-3 py-2 rounded-md text-sm 
                    hover:bg-[#0e1f35] transition"
                  >
                    Signup
                  </button>
                </>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}