import React, { useState } from 'react'
import { Menu, X } from "lucide-react";

const Navbar = ({ selectedTab, onTabChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const tabs = ["Home", "Trending", "Popular", "Upcoming"];

  return (
    <nav className="bg-pink-200 shadow-md px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left: Logo/Title */}
        <h1 className="text-xl md:text-2xl font-bold text-pink-500">
          🎬 <span className='text-pink-800'>Cine</span> Explorer
        </h1>

        {/* Desktop Tabs: Right */}
        <ul className="hidden md:flex gap-4 font-semibold text-pink-800 text-lg">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer px-3 py-1 rounded-md ${
                selectedTab === tab
                  ? "bg-pink-500 text-white"
                  : "hover:bg-pink-300"
              }`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>

        {/* Mobile: Hamburger icon on the right */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Tabs */}
      {mobileOpen && (
        <ul className="flex flex-col gap-2 mt-4 md:hidden text-pink-800 font-semibold max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                selectedTab === tab
                  ? "bg-pink-500 text-white"
                  : "hover:bg-pink-300"
              }`}
              onClick={() => {
                onTabChange(tab);
                setMobileOpen(false);
              }}
            >
              {tab}
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
