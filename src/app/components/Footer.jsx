"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname  = usePathname();
  return (
    <footer className={`bg-blue-600 ${pathname === "/login" || pathname === "/register" ? "hidden" : ""} text-white py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link href="/">
                  <p className="hover:text-gray-300">Home</p>
                </Link>
              </li>
              <li>
                <Link href="/buy">
                  <p className="hover:text-gray-300">Buy</p>
                </Link>
              </li>
              <li>
                <Link href="/sell">
                  <p className="hover:text-gray-300">Sell</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p className="hover:text-gray-300">Contact</p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p className="hover:text-gray-300">About</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul>
              <li className="mb-2">
                <p>Phone: +123 456 7890</p>
              </li>
              <li className="mb-2">
                <p>Email: info@propertyhub.com</p>
              </li>
              <li>
                <p>Address: 123 Property Street, City, Country</p>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <Link href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white hover:text-gray-300 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M22 2L2 22M15 12l9 9m-9 0l-9-9"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white hover:text-gray-300 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white hover:text-gray-300 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 12h-6M6 12h6M6 12v6m12-6v6"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for updates and offers.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded bg-blue-500 text-white w-full mb-4"
            />
            <button className="w-full bg-blue-700 hover:bg-blue-800 py-2 rounded text-white transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-300">© 2025 PropertyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
