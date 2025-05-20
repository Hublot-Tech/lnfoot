"use client"
import Link from "next/link";
import React, { useState } from "react";

const navbarItems = [
	{ name: "Accueil", path: "/" },
	{ name: "Actualités", path: "/news" },
	{ name: "Scores", path: "/scores" },
	{ name: "Shop", path: "/shop" },
	{ name: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="fixed top-2 w-full bg-transparent z-50 mt-2 flex flex-col items-center">

			<div className="flex items-center bg-blue-950 rounded w-full max-w-4xl px-8">
				{/* Logo */}
				<Link href="/" className="flex items-center py-4">
					<img
						src="/LN.png"
						alt="Logo"
						className="h-10 w-auto animate-bounce"
					/>
					<span className="text-white text-2xl font-bold ml-2">FOOT</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden lg:flex flex-1 justify-end gap-8 py-3">
					{navbarItems.map(({ name, path }) => (
						<Link
							key={name}
							href={path}
							className="text-white font-medium hover:text-orange-500 transition-colors"
						>
							{name}
						</Link>
					))}
				</nav>
				{/* Mobile Navigation */}
				<div className="flex-1 flex justify-end lg:hidden py-3">
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="text-white p-2 focus:outline-none"
						aria-label="Toggle menu"
					>
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
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
					{isMenuOpen && (
						<div className="absolute top-full right-0 mt-2 w-48 py-2 bg-blue-900 rounded-lg shadow-xl z-50">
							{navbarItems.map(({ name, path }) => (
								<Link
									key={name}
									href={path}
									className="block px-4 py-2 text-sm text-white hover:bg-blue-800"
									onClick={() => setIsMenuOpen(false)}
								>
									{name}
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
