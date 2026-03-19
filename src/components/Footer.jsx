import React, { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const socialLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/HannerB',
        icon: <FaGithub size={15} />,
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/hannerb-undefined-95a3572a7/',
        icon: <FaLinkedin size={15} />,
    },
    {
        label: 'Fiverr',
        href: 'https://es.fiverr.com/hannerv?public_mode=true',
        icon: <img src="https://cdn.simpleicons.org/fiverr/ffffff" alt="Fiverr" className="w-[15px] h-[15px]" />,
    },
]

export default function Footer() {
    const [showTop, setShowTop] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 400)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    const navLinks = [
        { name: t('navbar.home'),     href: '#home' },
        { name: t('navbar.about'),    href: '#about' },
        { name: t('navbar.skills'),   href: '#skills' },
        { name: t('navbar.projects'), href: '#projects' },
    ]

    return (
        <>
            {/* Back to top */}
            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                style={{
                    opacity: showTop ? 1 : 0,
                    pointerEvents: showTop ? 'auto' : 'none',
                    transform: showTop ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 0.3s, transform 0.3s',
                }}
                className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-purple-700 hover:bg-purple-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] cursor-pointer"
            >
                <FaArrowUp size={13} />
            </button>

            <footer className="relative bg-gray-950 text-white overflow-hidden">
                {/* Glowing top border */}
                <div
                    className="absolute top-0 left-0 w-full h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #8e6cf5 40%, #c744ec 60%, transparent)' }}
                />

                {/* Subtle grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />

                {/* Ambient glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-24 bg-purple-800 blur-[90px] opacity-20 rounded-full" />

                <div className="relative z-10 container mx-auto px-6 pt-14 pb-8">
                    {/* Main grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

                        {/* Brand */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-purple-400 text-sm select-none">&gt;_</span>
                                <h2 className="text-xl font-bold italic tracking-tight text-white">
                                    Hanner Barros
                                </h2>
                            </div>
                            <p className="text-gray-500 text-sm font-mono leading-relaxed">
                                {t('footer.tagline1')}<br />
                                <span className="text-purple-400">{t('footer.tagline2')}</span><br />
                                <span className="text-gray-700">{t('footer.tagline3')}</span>
                            </p>
                            {/* Available badge */}
                            <div className="inline-flex items-center gap-2 border border-gray-800 rounded-full px-3 py-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                                </span>
                                <span className="text-xs text-gray-400 font-mono">{t('footer.available')}</span>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em]">
                                {t('footer.navigation')}
                            </h3>
                            <nav className="space-y-[10px]">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="flex items-center gap-2 text-gray-500 hover:text-white text-sm group transition-colors duration-200"
                                    >
                                        <span className="font-mono text-purple-700 group-hover:text-purple-400 transition-colors duration-200 text-xs">
                                            →
                                        </span>
                                        {link.name}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Connect */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em]">
                                {t('footer.connect')}
                            </h3>
                            <div className="space-y-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-gray-500 hover:text-white group transition-colors duration-200"
                                    >
                                        <span className="w-8 h-8 rounded border border-gray-800 group-hover:border-purple-600 flex items-center justify-center transition-colors duration-200 group-hover:bg-purple-900/30">
                                            {social.icon}
                                        </span>
                                        <span className="text-sm">{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-gray-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-gray-700 font-mono">
                            <span className="text-purple-700">©</span>{' '}
                            {new Date().getFullYear()} Hanner Barros. {t('footer.rights')}
                        </p>
                        <p className="text-xs text-gray-700 font-mono">
                            {t('footer.builtWith')}{' '}
                            <span className="text-purple-500">♥</span>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
