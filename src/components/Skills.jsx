import React from "react"

const skillsData = [
    {
        id: 1,
        image: "https://cdn.simpleicons.org/vuedotjs/4FC08D",
        title: "Vue.js",
        description: "Progressive JS framework for building reactive user interfaces and single-page applications.",
    },
    {
        id: 2,
        image: "https://cdn.simpleicons.org/react/61DAFB",
        title: "React",
        description: "Component-based library for building fast, scalable frontend applications and UIs.",
    },
    {
        id: 3,
        image: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        title: "Tailwind CSS",
        description: "Utility-first CSS framework for rapid and consistent UI development.",
    },
    {
        id: 4,
        image: "https://cdn.simpleicons.org/laravel/FF2D20",
        title: "Laravel",
        description: "Elegant PHP framework for building robust backend systems and REST APIs.",
    },
]

const SkillCard = ({ image, title, description, index }) => (
    <article className="relative border border-gray-800 hover:border-purple-600 bg-gray-900/40 hover:bg-gray-900/80 rounded p-5 transition-all duration-300 group">
        {/* Terminal window chrome */}
        <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-gray-800/60">
            <span className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-red-500 transition-colors duration-300" />
            <span className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-yellow-400 transition-colors duration-300" />
            <span className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-green-400 transition-colors duration-300" />
            <span className="ml-auto font-mono text-[10px] text-gray-700">
                skill_{String(index + 1).padStart(2, '0')}.js
            </span>
        </div>

        <figure className="flex justify-start mb-3">
            <img src={image} alt={title} className="w-9 h-9" />
        </figure>

        <header className="mb-2">
            <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors duration-200">
                {title}
            </h3>
        </header>

        <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
    </article>
)

export default function Skills() {
    return (
        <section
            id="skills"
            className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-white px-4 py-20"
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

            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-36 bg-[#cd3cf5] rounded-full blur-3xl opacity-15" />

            <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative z-10 text-center space-y-10 w-full max-w-4xl"
            >
                <header>
                    <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                        // 02 — skills
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
                        My Expertise &amp;{' '}
                        <span className="text-purple-400">Skills</span>
                    </h2>
                    <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
                        Technologies I use to build full-stack applications from idea to deployment.
                    </p>
                </header>

                <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {skillsData.map((skill, i) => (
                        <SkillCard key={skill.id} {...skill} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
