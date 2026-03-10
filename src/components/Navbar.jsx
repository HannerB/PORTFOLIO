import React, { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const sections = ['home', 'about', 'skills', 'projects', 'contact']
        const observers = sections.map((id) => {
            const el = document.getElementById(id)
            if (!el) return null
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
                { threshold: 0.3 }
            )
            obs.observe(el)
            return obs
        })
        return () => observers.forEach((obs) => obs?.disconnect())
    }, [])

    const NavbarLinks = [
        { id: 1, name: 'Home', link: '#home', section: 'home' },
        { id: 2, name: 'About', link: '#about', section: 'about' },
        { id: 3, name: 'Skills', link: '#skills', section: 'skills' },
        { id: 4, name: 'Projects', link: '#projects', section: 'projects' },
    ]

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-sm border-b border-gray-800/60' : ''}`}
            data-aos='fade-up'
            data-aos-delay='300'
        >
            <div className='container mx-auto flex items-center justify-between px-6 py-4'>
                <a href="#home" className='flex items-center gap-1.5'>
                    <span className='font-mono text-purple-400 text-sm select-none'>&gt;_</span>
                    <span className='text-xl font-bold italic text-white'>hanner.dev</span>
                </a>

                <button className='md:hidden focus:outline-none cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                    <FiMenu className='w-6 h-6 text-white' />
                </button>

                <nav className='hidden md:flex items-center space-x-7'>
                    {NavbarLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.link}
                            className={`text-sm transition-colors duration-200 relative group ${
                                activeSection === link.section
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-px bg-purple-400 transition-all duration-300 ${
                                activeSection === link.section ? 'w-full' : 'w-0 group-hover:w-full'
                            }`} />
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className='font-mono text-sm text-white border border-purple-700 py-1.5 px-5 hover:bg-purple-800 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] rounded-full transition-all duration-300'
                    >
                        Contact
                    </a>
                </nav>
            </div>

            {/* Mobile menu */}
            <div className={`${isOpen ? 'flex' : 'hidden'} md:hidden bg-gray-950/95 backdrop-blur-sm absolute top-0 left-0 w-full h-screen flex-col items-center justify-center space-y-7`}>
                <button className='absolute top-5 right-5 text-white cursor-pointer' onClick={() => setIsOpen(false)}>
                    <FiX className='w-6 h-6' />
                </button>

                <span className='font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]'>// navigation</span>

                {NavbarLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.link}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg transition-colors duration-200 ${
                            activeSection === link.section ? 'text-white' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {activeSection === link.section && (
                            <span className="text-purple-400 mr-2 font-mono text-sm">▸</span>
                        )}
                        {link.name}
                    </a>
                ))}

                <a
                    href="#contact"
                    className='font-mono text-sm text-white border border-purple-700 py-2 px-6 hover:bg-purple-800 rounded-full transition-all duration-300'
                    onClick={() => setIsOpen(false)}
                >
                    Contact
                </a>
            </div>
        </header>
    )
}
