import React, { useState, useEffect, useMemo } from 'react'
import Navbar from './Navbar'
import imghero from '/imghero.png'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const CV = {
    en: '/cv/general/Hanner Barros — Full Stack Developer.pdf',
    es: '/cv/general/Hanner Barros — Desarrollador Full Stack.pdf',
}

function useTyping(titles) {
    const [titleIndex, setTitleIndex] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        setTitleIndex(0)
        setDisplayed('')
        setDeleting(false)
    }, [titles])

    useEffect(() => {
        const current = titles[titleIndex] ?? ''
        let timeout

        if (!deleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
        } else if (!deleting && displayed.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 2000)
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45)
        } else if (deleting && displayed.length === 0) {
            setDeleting(false)
            setTitleIndex((i) => (i + 1) % titles.length)
        }

        return () => clearTimeout(timeout)
    }, [displayed, deleting, titleIndex, titles])

    return displayed
}

export default function Hero() {
    const { t, i18n } = useTranslation()
    const titles = useMemo(() => t('hero.titles', { returnObjects: true }), [t])
    const typedTitle = useTyping(titles)
    const cvFile = CV[i18n.language] ?? CV.en

    return (
        <div className='relative overflow-hidden min-h-[100svh] sm:min-h-[600px] flex flex-col items-center bg-gray-950'>
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
                className='flex flex-col md:flex-row items-center justify-center w-full px-4 md:px-52 pb-4 md:pb-24 md:pt-32 pt-14 mt-6 md:mt-0 z-10'
            >
                <section
                    className='flex-1 md:mr-28 md:text-left mt-4 md:mt-0 relative'
                    data-aos='fade-up'
                    data-aos-delay='500'
                >
                    <div className='absolute -z-10 w-60 h-60 bg-[#cd3cf5] rounded-full blur-3xl opacity-40 -top-5 -left-12' />

                    {/* Terminal label */}
                    <div className='flex items-center gap-2 mb-4'>
                        <span className='font-mono text-purple-400 text-xs'>{t('hero.greeting')}</span>
                    </div>

                    <header>
                        <h1 className='text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight'>
                            Hanner Barros
                        </h1>
                        <div className='flex items-center gap-2 mb-5'>
                            <span className='font-mono text-xs text-gray-600 select-none'>&gt;_</span>
                            <h2 className='text-xl md:text-2xl font-mono text-purple-400'>
                                {typedTitle}
                            </h2>
                            <span className='w-0.5 h-5 bg-purple-400 animate-pulse' />
                        </div>
                    </header>

                    <p className='text-base md:text-lg text-gray-300 mb-4 md:mb-6 leading-relaxed max-w-md'>
                        {t('hero.description')}
                    </p>

                    <div className='flex items-center space-x-3 mb-4 md:mb-7'>
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

                    <a href={cvFile} download>
                        <button className='inline-flex items-center gap-2 text-white border border-purple-700 py-2 px-6 hover:bg-purple-800 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] rounded-full text-sm font-mono transition-all duration-300 cursor-pointer'>
                            <span className='text-purple-400'>$</span> {t('hero.downloadCv')}
                            <span className='text-[10px] font-mono text-purple-400 border border-purple-800 bg-purple-950/40 px-1.5 py-0.5 rounded'>
                                {i18n.language.toUpperCase()}
                            </span>
                        </button>
                    </a>
                </section>

                <figure
                    data-aos='fade-up'
                    data-aos-delay='600'
                    className='flex-1 flex justify-center md:justify-end mt-4 md:mt-0'
                >
                    <img
                        src={imghero}
                        alt="Hanner Barros — Full Stack Developer"
                        className='h-[270px] sm:h-[400px] md:h-[485px] w-[220px] sm:w-[480px] object-cover'
                    />
                </figure>
            </main>
        </div>
    )
}
