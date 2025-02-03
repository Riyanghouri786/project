"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={`bg-blue-600 ${pathname === "/login" || pathname === "/register" ? "hidden" : ""} text-white shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold">
          <Link href="/">
            NoBroker
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/">
            <p className="hover:text-gray-300">Home</p>
          </Link>
          <Link href="/buy">
            <p className="hover:text-gray-300">Buy</p>
          </Link>
          <Link href="/sell">
            <p className="hover:text-gray-300">Sell</p>
          </Link>
          <Link href="/contact">
            <p className="hover:text-gray-300">Contact</p>
          </Link>
          <Link href="/about">
            <p className="hover:text-gray-300">About</p>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={toggleSidebar}
      >
        {/* Sidebar content */}
        <div
  className="w-4/4 sm:w-2/3 bg-blue-600 text-white h-full p-6 overflow-y-auto flex flex-col"
  onClick={(e) => e.stopPropagation()}
>
  {/* Close Button */}
  <button
    onClick={toggleSidebar}
    className="self-end text-white text-2xl mb-4"
  >
    &times; {/* This is the close button */}
  </button>

  {/* Navigation */}
  <nav className="space-y-6">
    <Link href="/">
      <p className="block text-xl hover:text-gray-300 transition-colors duration-300">Home</p>
    </Link>
    <Link href="/buy">
      <p className="block text-xl hover:text-gray-300 transition-colors duration-300">Buy</p>
    </Link>
    <Link href="/sell">
      <p className="block text-xl hover:text-gray-300 transition-colors duration-300">Sell</p>
    </Link>
    <Link href="/contact">
      <p className="block text-xl hover:text-gray-300 transition-colors duration-300">Contact</p>
    </Link>
    <Link href="/about">
      <p className="block text-xl hover:text-gray-300 transition-colors duration-300">About</p>
    </Link>
  </nav>
</div>

      </div>
    </header>
  );
};

export default Header;
