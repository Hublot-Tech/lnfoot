import React from 'react'
import Link from 'next/link'

export default function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#", label: "Join Us" },
    { href: "#", label: "Customer Care" },
    { href: "#", label: "Reach Out" },
    { href: "#", label: "About Us" }
  ];

  return (
    <header className="bg-black text-white flex items-center justify-between px-8 py-2.5 font-sans min-h-[48px]">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg tracking-wide">
          <span className="text-white">⠿</span> LET'SREAD
        </span>
      </div>
      <nav className="flex gap-7 items-center">
        {navLinks.map((link, index) => (
          <Link 
            key={index}
            href={link.href} 
            className="text-white no-underline text-[15px] hover:text-gray-300 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button className="bg-[#FF4B11] text-white border-none rounded-lg px-4.5 py-1.5 font-semibold text-[15px] cursor-pointer hover:bg-[#E0400F] transition-colors">
        Subscribe
      </button>
    </header>
  );
}
