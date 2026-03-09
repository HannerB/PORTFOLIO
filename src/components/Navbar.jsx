import React, { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const NavbarLinks = [
        { id: 1, name: 'Home', link: '#home' },
        { id: 2, name: 'About', link: '#about' },
        { id: 3, name: 'Skills', link: '#skills' },
        { id: 4, name: 'Projects', link: '#projects' },
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
                    <span className='text-xl font-bold italic text-white'>Portfolio</span>
                </a>

                <button className='md:hidden focus:outline-none' onClick={() => setIsOpen(!isOpen)}>
                    <FiMenu className='w-6 h-6 text-white' />
                </button>

                <nav className='hidden md:flex items-center space-x-7'>
                    {NavbarLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.link}
                            className='text-gray-400 hover:text-white text-sm transition-colors duration-200'
                        >
                            {link.name}
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
                <button className='absolute top-5 right-5 text-white' onClick={() => setIsOpen(false)}>
                    <FiX className='w-6 h-6' />
                </button>

                <span className='font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]'>// navigation</span>

                {NavbarLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.link}
                        className='text-gray-300 hover:text-white text-lg transition-colors duration-200'
                        onClick={() => setIsOpen(false)}
                    >
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
