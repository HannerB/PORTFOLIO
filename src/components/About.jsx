import React from "react"
import img_about from "/img_about1.png"

const stats = [
    { label: 'location', value: 'Venezuela' },
    { label: 'experience', value: '2+ years' },
    { label: 'specialty', value: 'FullStack' },
    { label: 'status', value: 'Available' },
]

export default function About() {
    return (
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
                    className="flex flex-wrap justify-center gap-4 relative"
                >
                    <div className="h-[200px] sm:h-[300px] w-[300px] sm:w-[400px] lg:h-[300px] lg:w-[500px] bg-gradient-to-l from-[#6d2897] via-[#6c95f5] to-[#bb61c5] absolute transform rotate-12 z-0 right-5 -top-2 md:top-10 rounded-full opacity-70" />

                    <img
                        src={img_about}
                        alt="about picture 1"
                        className="absolute -top-2 left-5 sm:left-10 transform -translate-y-12 z-20 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-lg border border-gray-800"
                    />
                    <img
                        src={img_about}
                        alt="about picture 2"
                        className="relative z-10 w-36 h-44 sm:w-40 sm:h-40 md:w-72 md:h-96 rounded-lg shadow-lg border border-gray-800"
                    />
                    <img
                        src={img_about}
                        alt="about picture 3"
                        className="absolute bottom-0 right-5 sm:right-10 transform translate-y-12 z-10 w-20 h-20 sm:w-32 sm:h-32 rounded-2xl shadow-lg border border-gray-800"
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
                                // 01 — about
                            </span>
                        </div>

                        <header>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight">
                                About <span className="text-purple-400">Me</span>
                            </h2>
                        </header>

                        <p className="text-base sm:text-lg text-gray-400 mb-7 leading-relaxed">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa officia
                            necessitatibus id eum, molestias possimus vitae inventore sed pariatur quidem
                            sunt quia explicabo numquam doloribus. Commodi velit adipisci architecto.
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
                            <button className="inline-flex items-center gap-2 text-white border border-purple-700 py-2 px-6 hover:bg-purple-800 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] rounded-full text-sm font-mono transition-all duration-300">
                                <span className="text-purple-400">$</span> learn_more
                            </button>
                        </footer>
                    </div>
                </article>
            </div>
        </section>
    )
}
