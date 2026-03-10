import React from 'react'
import Navbar from './Navbar'
import imghero from '/imghero.png'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Hanner from '/hanner.pdf'

export default function Hero() {
    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[600px] flex flex-col items-center bg-gray-950'>
            {/* Grid texture */}
            <div
                className='absolute inset-0 opacity-[0.04]'
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            {/* Decorative rotated card */}
            <div className='md:h-[550px] h-[500px] w-[450px] bg-gradient-to-r absolute from-[#6d2897] via-[#8e6cf5] to-[#bb61c5] transform rotate-45 z-0 right-2 top-28 rounded-3xl opacity-75' />

            <Navbar />

            <main
                id='home'
                className='flex flex-col md:flex-row items-center justify-center w-full px-4 md:px-52 pb-4 md:pb-24 md:pt-32 pt-24 mt-14 md:mt-0 z-10'
            >
                <section
                    className='flex-1 md:mr-28 md:text-left mt-10 md:mt-0 relative'
                    data-aos='fade-up'
                    data-aos-delay='500'
                >
                    <div className='absolute -z-10 w-60 h-60 bg-[#cd3cf5] rounded-full blur-3xl opacity-40 -top-5 -left-12' />

                    {/* Terminal label */}
                    <div className='flex items-center gap-2 mb-4'>
                        <span className='font-mono text-purple-400 text-xs'>// hello, world</span>
                    </div>

                    <header>
                        <h1 className='text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight'>
                            Hanner Barros
                        </h1>
                        <div className='flex items-center gap-2 mb-5'>
                            <span className='font-mono text-xs text-gray-600 select-none'>&gt;_</span>
                            <h2 className='text-xl md:text-2xl font-mono text-purple-400'>
                                FullStack Developer
                            </h2>
                            <span className='w-0.5 h-5 bg-purple-400 animate-pulse' />
                        </div>
                    </header>

                    <p className='text-base md:text-lg text-gray-400 mb-6 leading-relaxed max-w-md'>
                        Full Stack Developer with 2+ years of experience building production-ready web platforms.
                        Specialized in React, NestJS and TypeScript — from REST APIs and Stripe integrations
                        to relational databases and clean, responsive UIs.
                    </p>

                    <div className='flex items-center space-x-3 mb-7'>
                        <a
                            href="https://github.com/HannerB"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='w-9 h-9 border border-gray-800 hover:border-purple-600 hover:bg-purple-900/30 rounded flex items-center justify-center transition-all duration-200'
                        >
                            <FaGithub className='text-gray-400 hover:text-white transition-colors' size={16} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/hannerb-undefined-95a3572a7/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='w-9 h-9 border border-gray-800 hover:border-purple-600 hover:bg-purple-900/30 rounded flex items-center justify-center transition-all duration-200'
                        >
                            <FaLinkedin className='text-gray-400 hover:text-white transition-colors' size={16} />
                        </a>
                        <a
                            href="https://es.fiverr.com/hannerv?public_mode=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='w-9 h-9 border border-gray-800 hover:border-purple-600 hover:bg-purple-900/30 rounded flex items-center justify-center transition-all duration-200'
                        >
                            <img src="https://cdn.simpleicons.org/fiverr/9ca3af" alt="Fiverr" className='w-4 h-4' />
                        </a>
                    </div>

                    <a href={Hanner} download>
                        <button className='inline-flex items-center gap-2 text-white border border-purple-700 py-2 px-6 hover:bg-purple-800 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] rounded-full text-sm font-mono transition-all duration-300 cursor-pointer'>
                            <span className='text-purple-400'>$</span> download_cv
                        </button>
                    </a>
                </section>

                <figure
                    data-aos='fade-up'
                    data-aos-delay='600'
                    className='flex-1 flex justify-center md:justify-end mt-8 md:mt-0'
                >
                    <img
                        src={imghero}
                        alt="Hanner Barros — Full Stack Developer"
                        className='h-[300px] sm:h-[400px] md:h-[485px] w-[250px] sm:w-[480px] object-cover'
                    />
                </figure>
            </main>
        </div>
    )
}
