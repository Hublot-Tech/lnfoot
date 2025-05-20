import React from 'react'
import Link from 'next/link'

export default function Header() {
  const navLinks = [
    { href: "/", label: "Acceuil" },
    { href: "/news", label: "Actus" },
    { href: "/shop", label: "Shop" },
    { href: "scores", label: "Scores" },
    { href: "/gallery", label: "Gallerie" },
    { href: "contact", label: "Contact" }

  ];

  return (
    <header className="bg-[#0f1038] text-white flex items-center justify-between px-8 lg:px-24 py-2.5 font-sans min-h-[48px]">
      <div className="flex items-center">
        <Link className=" flex items-center btn-ghost text-2xl font-semibold text-white transition duration-300 hover:text-orange-500" href="/">
        <img className="h-10" alt="Football News" src="/ln.png" />
           FOOT
        </Link>
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
