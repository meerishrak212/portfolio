import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import companylogo from '../images/companylogo.png';

const navLinks = ['Home', 'About', 'Services', 'Process', 'Portfolio'];

function Header() {
    const [activeLink, setActiveLink] = useState('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const sections = navLinks.map(link => document.getElementById(link.toLowerCase()));
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const linkName = entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1);
                    setActiveLink(linkName);
                }
            });
        }, { 
            rootMargin: "-90px 0px -40% 0px", 
            threshold: 0 
        });

        sections.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="sticky top-0 z-50 py-2 shadow-sm bg-white/90 backdrop-blur-md"
            >
                <div className="flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link to="/" className="flex items-center gap-3 transition-transform duration-300 ease-in-out hover:scale-105">
                        <img 
                            src={companylogo} 
                            alt="Softcode Ultra Logo" 
                            className="w-auto h-14"
                            width="56"
                            height="56"
                            fetchPriority="high"
                        />
                        <span className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                            Softcode Ultra
                        </span>
                    </Link>

                    <div className="items-center hidden gap-4 md:flex">
                        <nav className="items-center hidden gap-1 px-3 py-2 border rounded-full shadow-sm md:flex bg-white/60 backdrop-blur-md border-gray-200/80">
                            {navLinks.map(link => (
                                <a
                                    href={`#${link.toLowerCase()}`}
                                    key={link}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeLink === link ? 'bg-violet-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {link}
                                </a>
                            ))}
                        </nav>
                        <Link 
                            to="/contact" 
                            className="px-6 py-3 text-sm font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105"
                        >
                            Contact
                        </Link>
                    </div>

                    <button
                        aria-label="Open menu"
                        className="p-2 rounded-md md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </motion.header>
            
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed z-40 p-4 bg-white shadow-lg md:hidden top-20 left-4 right-4 rounded-xl"
                >
                    <nav className="flex flex-col gap-4">
                        {navLinks.map(link => (
                            <a href={`#${link.toLowerCase()}`} key={link} onClick={() => setIsMenuOpen(false)}
                                className={`px-4 py-2 rounded-lg text-center font-medium ${activeLink === link ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                            >{link}</a>
                        ))}
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="w-full px-5 py-3 mt-2 font-semibold text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-violet-600 to-indigo-600">Contact</Link>
                    </nav>
                </motion.div>
            )}
        </>
    );
}

export default memo(Header);