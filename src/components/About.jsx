import React, { useState } from "react"
import aboutAvatar from "/about-avatar.png"
import ExperienceModal from "./ExperienceModal"
import { useTranslation } from "react-i18next"

export default function About() {
    const [showModal, setShowModal] = useState(false)
    const { t } = useTranslation()

    const stats = [
        { label: t('about.stats.location'), value: 'Colombia' },
        { label: t('about.stats.experience'), value: '2+ years' },
        { label: t('about.stats.specialty'), value: 'FullStack' },
        { label: t('about.stats.status'), value: t('about.stats.available') },
    ]

    return (
        <>
        <section
            id="about"
            className="min-h-screen overflow-hidden flex items-center justify-center text-white px-4 sm:px-6 py-20 relative"
        >
            {/* Grid texture */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
                <figure
                    data-aos="fade-right"
                    data-aos-delay="500"
                    className="flex justify-center items-center relative"
                >
                    <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-[#6d2897] via-[#8e6cf5] to-[#bb61c5] rounded-full blur-3xl opacity-40 z-0" />
                    <img
                        src={aboutAvatar}
                        alt="Developer avatar"
                        className="relative z-10 w-64 sm:w-80 md:w-96 drop-shadow-2xl"
                    />
                </figure>

                <article
                    data-aos="fade-left"
                    data-aos-delay="500"
                    className="text-center lg:text-left relative"
                >
                    <div className="absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#cd3cf5] rounded-full blur-3xl opacity-25 -top-5 left-10" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
                            <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                                {t('about.label')}
                            </span>
                        </div>

                        <header>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight">
                                {t('about.title')} <span className="text-purple-400">{t('about.titleHighlight')}</span>
                            </h2>
                        </header>

                        <p className="text-base sm:text-lg text-gray-400 mb-7 leading-relaxed">
                            {t('about.description')}
                        </p>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3 mb-8 text-left">
                            {stats.map((item) => (
                                <div
                                    key={item.label}
                                    className="border border-gray-800 hover:border-purple-700 rounded p-3 bg-gray-900/40 hover:bg-gray-900/70 transition-colors duration-200"
                                >
                                    <span className="block font-mono text-[10px] text-purple-400 uppercase tracking-wider mb-1">
                                        {item.label}
                                    </span>
                                    <span className="text-white text-sm font-medium">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <footer>
                            <button
                                onClick={() => setShowModal(true)}
                                className="inline-flex items-center gap-2 text-white border border-purple-700 py-2 px-6 hover:bg-purple-800 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] rounded-full text-sm font-mono transition-all duration-300 cursor-pointer"
                            >
                                <span className="text-purple-400">$</span> {t('about.learnMore')}
                            </button>
                        </footer>
                    </div>
                </article>
            </div>
        </section>

        {showModal && <ExperienceModal onClose={() => setShowModal(false)} />}
        </>
    )
}
