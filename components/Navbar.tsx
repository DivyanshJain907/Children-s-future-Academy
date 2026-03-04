'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Online Registration Button - Only visible on mobile */}
            <Link 
              href="/admissions" 
              className="lg:hidden bg-accent text-white px-4 py-2 rounded font-semibold text-sm hover:bg-orange-600 transition"
            >
              📝 Online Registration
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-4 xl:space-x-8 text-xs xl:text-sm font-semibold flex-1 justify-center">
              <Link href="/" className="hover:text-gray-200 transition uppercase tracking-wide">
                Home
              </Link>
              <Link href="/about" className="hover:text-gray-200 transition uppercase tracking-wide">
                About School
              </Link>
              <Link href="/academics" className="hover:text-gray-200 transition uppercase tracking-wide">
                Academics
              </Link>
              <Link href="/achievements" className="hover:text-gray-200 transition uppercase tracking-wide whitespace-nowrap">
                Achievements
              </Link>
              <Link href="/virtual-tour" className="hover:text-gray-200 transition uppercase tracking-wide whitespace-nowrap">
                Virtual Tour
              </Link>
              <Link href="/gallery" className="hover:text-gray-200 transition uppercase tracking-wide">
                Gallery
              </Link>
              <Link href="/admissions" className="hover:text-gray-200 transition uppercase tracking-wide">
                Admission
              </Link>
              <Link href="/fee" className="hover:text-gray-200 transition uppercase tracking-wide">
                Fee
              </Link>
              <Link href="/tc" className="hover:text-gray-200 transition uppercase tracking-wide">
                TC
              </Link>
              <Link href="/contact" className="hover:text-gray-200 transition uppercase tracking-wide">
                Contact Us
              </Link>
            </div>



            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-2xl focus:outline-none z-50"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl"
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* Menu Items */}
          <div className="flex-1 pt-16 overflow-y-auto">
            <Link
              href="/"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 border-b border-gray-200 font-semibold uppercase text-sm"
              onClick={toggleMenu}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 border-b border-gray-200 font-semibold uppercase text-sm"
              onClick={toggleMenu}
            >
              ABOUT SCHOOL
              <span>›</span>
            </Link>
            <Link
              href="/academics"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 border-b border-gray-200 font-semibold uppercase text-sm"
              onClick={toggleMenu}
            >
              ACADEMICS
              <span>›</span>
            </Link>
            <Link
              href="/achievements"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 border-b border-gray-200 font-semibold uppercase text-sm"
              onClick={toggleMenu}
            >
              ACHIEVEMENTS
            </Link>
            <Link
              href="/virtual-tour"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 border-b border-gray-200 font-semibold uppercase text-sm"
              onClick={toggleMenu}
            >
              VIRTUAL TOUR
            </Link>
            <Link
              href="/gallery"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 border-b border-gray-200 font-semibold uppercase text-sm"
              onClick={toggleMenu}
            >
              GALLERY
            </Link>
            <Link
              href="/admissions"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 border-b border-gray-200 font-semibold uppercase text-sm"
              onClick={toggleMenu}
            >
              ADMISSION
              <span>›</span>
            </Link>
            <Link
              href="/fee"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 border-b border-gray-200 font-semibold uppercase text-sm"
              onClick={toggleMenu}
            >
              FEE
            </Link>
            <Link
              href="/tc"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 border-b border-gray-200 font-semibold uppercase text-sm"
              onClick={toggleMenu}
            >
              TC
              <span>›</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 border-b border-gray-200 font-semibold uppercase text-sm"
              onClick={toggleMenu}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
