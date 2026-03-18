import { useState } from "react"
import { Link } from "react-router-dom"
import { projects } from "../data/projects"

const CATEGORIES = [
    { id: "all", label: "All" },
    { id: "platform", label: "Full-Stack Platforms" },
    { id: "webapp", label: "Web Applications" },
    { id: "landing", label: "Landings & Websites" },
]

const CATEGORY_DOT = {
    platform: "bg-purple-500",
    webapp: "bg-blue-500",
    landing: "bg-emerald-500",
}

const PLACEHOLDER_STYLES = {
    platform: { bg: "from-purple-950 to-gray-900", text: "text-purple-400", border: "border-purple-900/40" },
    webapp:   { bg: "from-blue-950 to-gray-900",   text: "text-blue-400",   border: "border-blue-900/40"   },
    landing:  { bg: "from-emerald-950 to-gray-900", text: "text-emerald-400", border: "border-emerald-900/40" },
}

const ProjectPlaceholder = ({ title, category, tags }) => {
    const s = PLACEHOLDER_STYLES[category]
    return (
        <figure className="relative overflow-hidden shrink-0">
            <div className={`w-full h-44 bg-gradient-to-br ${s.bg} flex flex-col items-center justify-center gap-3 px-6 relative`}>
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
                <span className={`font-mono text-[9px] uppercase tracking-[0.25em] ${s.text} opacity-60`}>
                    {category}
                </span>
                <h3 className="text-white font-bold text-sm text-center leading-snug relative z-10">
                    {title}
                </h3>
                <div className="flex flex-wrap justify-center gap-1.5 relative z-10">
                    {tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={`font-mono text-[9px] ${s.text} border ${s.border} px-2 py-0.5 rounded opacity-80`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-purple-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-xs text-white border border-purple-400 px-4 py-2 rounded-full">
                    → view project
                </span>
            </div>
        </figure>
    )
}

const ProjectCard = ({ slug, image, title, tagline, tags, category, index }) => {
    const [imgFailed, setImgFailed] = useState(false)
    const showImage = image && !imgFailed

    return (
    <Link
        to={`/projects/${slug}`}
        className="relative border border-gray-800 hover:border-purple-600 bg-gray-900/40 hover:bg-gray-900/70 rounded overflow-hidden group transition-all duration-300 flex flex-col"
    >
        {/* Terminal chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-800/60 bg-gray-900/60 shrink-0">
            <span className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-red-500 transition-colors duration-300" />
            <span className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-yellow-400 transition-colors duration-300" />
            <span className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-green-400 transition-colors duration-300" />
            <span className="ml-auto font-mono text-[10px] text-gray-700">
                project_{String(index + 1).padStart(2, "0")}
            </span>
        </div>

        {/* Image or styled placeholder */}
        {showImage ? (
            <figure className="relative overflow-hidden shrink-0">
                <img
                    src={image}
                    alt={title}
                    onError={() => setImgFailed(true)}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-purple-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-xs text-white border border-purple-400 px-4 py-2 rounded-full">
                        → view project
                    </span>
                </div>
            </figure>
        ) : (
            <ProjectPlaceholder title={title} category={category} tags={tags} />
        )}

        {/* Content */}
        <div className="px-5 py-4 flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${CATEGORY_DOT[category]}`} />
                <h3 className="text-white font-bold text-sm group-hover:text-purple-300 transition-colors duration-200 leading-snug">
                    {title}
                </h3>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed flex-1">{tagline}</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
                {tags.slice(0, 4).map((tag) => (
                    <span
                        key={tag}
                        className="font-mono text-[10px] text-purple-400/70 border border-purple-900/50 bg-purple-950/20 px-2 py-0.5 rounded"
                    >
                        {tag}
                    </span>
                ))}
                {tags.length > 4 && (
                    <span className="font-mono text-[10px] text-gray-600 px-1 py-0.5">
                        +{tags.length - 4}
                    </span>
                )}
            </div>
        </div>
    </Link>
    )
}

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState("all")

    const filtered =
        activeCategory === "all"
            ? projects
            : projects.filter((p) => p.category === activeCategory)

    return (
        <section id="projects" className="relative py-20 px-4 text-white overflow-hidden">
            {/* Grid texture */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <header data-aos="fade-up" data-aos-delay="300" className="text-center mb-10">
                    <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                        // 04 — projects
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
                        My <span className="text-purple-400">Projects</span>
                    </h2>
                    <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
                        From production platforms to landing pages — real work across the full stack.
                    </p>
                </header>

                {/* Legend */}
                <div data-aos="fade-up" data-aos-delay="350" className="flex justify-center gap-5 mb-6">
                    {[
                        { dot: "bg-purple-500", label: "Platform" },
                        { dot: "bg-blue-500", label: "Web App" },
                        { dot: "bg-emerald-500", label: "Landing" },
                    ].map(({ dot, label }) => (
                        <div key={label} className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                            <span className="font-mono text-[10px] text-gray-600">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Category filters */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`font-mono text-xs px-4 py-2 rounded border transition-all duration-200 cursor-pointer ${
                                activeCategory === cat.id
                                    ? "border-purple-500 bg-purple-600/20 text-purple-300"
                                    : "border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300"
                            }`}
                        >
                            {cat.label}
                            <span className="ml-2 text-[10px] opacity-50">
                                ({cat.id === "all" ? projects.length : projects.filter((p) => p.category === cat.id).length})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Cards */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {filtered.map((project, index) => (
                        <ProjectCard key={project.slug} {...project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
