import React from "react"

const ProjectCard = ({ image, title, description, link, index }) => (
    <article className="relative border border-gray-800 hover:border-purple-600 bg-gray-900/40 hover:bg-gray-900/70 rounded overflow-hidden group transition-all duration-300 max-w-sm w-full">
        {/* Terminal window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-800/60 bg-gray-900/60">
            <span className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-red-500 transition-colors duration-300" />
            <span className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-yellow-400 transition-colors duration-300" />
            <span className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-green-400 transition-colors duration-300" />
            <span className="ml-auto font-mono text-[10px] text-gray-700">
                project_{String(index + 1).padStart(2, '0')}
            </span>
        </div>

        <figure className="relative overflow-hidden">
            <img
                src={image}
                alt={title}
                className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <a
                href={link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-purple-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <span className="font-mono text-xs text-white border border-purple-400 px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-200">
                    → live preview
                </span>
            </a>
        </figure>

        <div className="px-5 py-4">
            <header className="mb-1">
                <h3 className="text-white font-bold text-sm group-hover:text-purple-300 transition-colors duration-200">
                    {title}
                </h3>
            </header>
            <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
        </div>
    </article>
)

export default function Projects() {
    const listProjects = [
        {
            image: "https://picsum.photos/seed/proj1/600/400",
            title: "Portfolio website 1",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            link: "",
        },
        {
            image: "https://picsum.photos/seed/proj2/600/400",
            title: "Portfolio website 2",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            link: "",
        },
        {
            image: "https://picsum.photos/seed/proj3/600/400",
            title: "Portfolio website 3",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            link: "",
        },
        {
            image: "https://picsum.photos/seed/proj4/600/400",
            title: "Portfolio website 4",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            link: "",
        },
        {
            image: "https://picsum.photos/seed/proj5/600/400",
            title: "Portfolio website 5",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            link: "",
        },
        {
            image: "https://picsum.photos/seed/proj6/600/400",
            title: "Portfolio website 6",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            link: "",
        },
    ]

    return (
        <section id="projects" className="relative py-20 px-4 text-white overflow-hidden">
            {/* Grid texture */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">
                <header data-aos="fade-up" data-aos-delay="300" className="text-center mb-12">
                    <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                        // 03 — projects
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
                        My <span className="text-purple-400">Projects</span>
                    </h2>
                    <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
                        A selection of things I've built — from personal experiments to production work.
                    </p>
                </header>

                <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    className="flex flex-wrap gap-5 justify-center"
                >
                    {listProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
