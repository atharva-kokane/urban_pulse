"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { MapPin, PanelLeft } from "lucide-react"

export function TopHeader() {

  const router = useRouter()

  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)

  
  const dropdownRef = useRef(null)

  useEffect(() => {

    getUser()

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [])

  async function getUser() {

    const { data } = await supabase.auth.getUser()

    if (data.user) {
      setUser(data.user)
    }

  }

  async function handleLogout() {

    await supabase.auth.signOut()

    router.push("/login")

  }

  const firstLetter = user?.email?.charAt(0).toUpperCase() || "A"

  return (

    <div className="flex items-center justify-between px-6 py-3 border-b bg-white">

      {/* LEFT SIDE (unchanged UI) */}
      <div className="flex items-center gap-4">

        <PanelLeft className="w-5 h-5 text-gray-600" />

        <div className="flex items-center gap-2 text-sm text-gray-700">

          <MapPin className="w-4 h-4" />

          Pune City

        </div>

      </div>

      {/* RIGHT SIDE (Admin profile with dropdown) */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>

        {/* Time (optional, keep if already exists) */}
        <div className="text-sm text-gray-600 hidden md:block">
          {new Date().toLocaleTimeString()}
        </div>

        {/* Profile section */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer"
        >

          {/* Avatar circle */}
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
            {firstLetter}
          </div>

          {/* Admin text */}
          <div className="hidden md:block text-right">

            

            

          </div>

        </div>

        {/* Dropdown */}
        {open && (

          <div className="absolute right-0 top-12 w-56 bg-white border rounded-lg shadow-lg">

            <div className="px-4 py-3 border-b">

              <div className="text-sm font-medium">
                {user?.email}
              </div>


            </div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </div>

  )

}