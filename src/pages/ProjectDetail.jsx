import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import { getProjectBySlug } from "../data/projects"
import { FiArrowLeft, FiGithub, FiExternalLink, FiCode, FiLayers, FiZap, FiStar } from "react-icons/fi"

const CATEGORY_LABELS = {
    platform: "Full-Stack Platform",
    webapp: "Web Application",
    landing: "Landing & Website",
}

const CATEGORY_COLORS = {
    platform: "text-purple-400 border-purple-800 bg-purple-950/30",
    webapp: "text-blue-400 border-blue-800 bg-blue-950/30",
    landing: "text-emerald-400 border-emerald-800 bg-emerald-950/30",
}

const StackSection = ({ stack }) => {
    const labels = {
        frontend: "Frontend",
        backend: "Backend",
        database: "Database",
        infra: "Infrastructure",
        ui: "UI Libraries",
        components: "Components",
        modules: "Modules",
        packages: "Packages",
        storage: "Storage",
        payments: "Payments",
        base: "Base",
        exports: "Exports",
        tooling: "Tooling",
    }

    return (
        <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(stack).map(([layer, techs]) => (
                <div key={layer} className="border border-gray-800 bg-gray-900/30 rounded p-4">
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block mb-2">
                        {labels[layer] || layer}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                        {techs.map((tech) => (
                            <span
                                key={tech}
                                className="font-mono text-xs text-purple-300/80 border border-purple-900/50 bg-purple-950/20 px-2 py-0.5 rounded"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function ProjectDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const project = getProjectBySlug(slug)

    const metaDescRef = useRef(document.querySelector('meta[name="description"]'))

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!project) return

        const prevTitle = document.title
        const prevDesc = metaDescRef.current?.getAttribute('content') ?? ''

        document.title = `${project.title} | Hanner Barros`
        if (metaDescRef.current) {
            metaDescRef.current.setAttribute('content', project.tagline)
        }

        return () => {
            document.title = prevTitle
            if (metaDescRef.current) {
                metaDescRef.current.setAttribute('content', prevDesc)
            }
        }
    }, [slug, project])

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white gap-4">
                <span className="font-mono text-purple-400 text-4xl">404</span>
                <p className="text-gray-400">Project not found.</p>
                <Link to="/" className="font-mono text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    ← back to portfolio
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Top bar */}
            <div className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800/60">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                        <span className="font-mono text-xs">back</span>
                    </button>

                    {/* Breadcrumb */}
                    <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-gray-600">
                        <Link to="/" className="hover:text-gray-400 transition-colors">portfolio</Link>
                        <span>/</span>
                        <Link to="/#projects" className="hover:text-gray-400 transition-colors">projects</Link>
                        <span>/</span>
                        <span className="text-gray-400">{project.slug}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 font-mono text-xs text-white border border-purple-700 px-3 py-1.5 rounded-full hover:bg-purple-800 transition-colors duration-200">
                                <FiExternalLink size={12} /> Live
                            </a>
                        )}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 font-mono text-xs text-gray-300 border border-gray-700 px-3 py-1.5 rounded-full hover:border-gray-500 hover:text-white transition-colors duration-200">
                                <FiGithub size={12} /> {project.githubPrivate ? "GitHub Profile" : "Repository"}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

                {/* ── HERO ─────────────────────────────────────── */}
                <header className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`font-mono text-[11px] border px-2.5 py-1 rounded ${CATEGORY_COLORS[project.category]}`}>
                            {CATEGORY_LABELS[project.category]}
                        </span>
                        <span className="font-mono text-[11px] text-gray-600">{project.year}</span>
                    </div>

                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                            {project.title}
                        </h1>
                        <p className="mt-3 text-lg text-gray-400 max-w-2xl leading-relaxed">
                            {project.tagline}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span key={tag}
                                className="font-mono text-xs text-purple-300/70 border border-purple-900/50 bg-purple-950/20 px-2.5 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* ── HERO IMAGE / SCREENSHOTS ─────────────────── */}
                <div className="rounded-lg overflow-hidden border border-gray-800 bg-gray-900/40">
                    {/* Terminal chrome */}
                    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900/80 border-b border-gray-800/60">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                        <span className="ml-auto font-mono text-[10px] text-gray-600">{project.slug}</span>
                    </div>

                    {project.screenshots.length > 0 ? (
                        <div className="grid gap-0.5">
                            {project.screenshots.map((src, i) => (
                                <img key={i} src={src} alt={`${project.title} screenshot ${i + 1}`}
                                    className="w-full object-cover" />
                            ))}
                        </div>
                    ) : (
                        <div className="relative">
                            <img src={project.image} alt={project.title}
                                className="w-full h-64 sm:h-80 object-cover opacity-40" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                <span className="font-mono text-xs text-gray-600">// screenshots coming soon</span>
                                <span className="font-mono text-[10px] text-gray-700">project is deployed — visuals being captured</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── OVERVIEW ─────────────────────────────────── */}
                <section className="space-y-4">
                    <SectionLabel icon={<FiLayers size={13} />} label="Overview" />
                    <p className="text-gray-300 leading-relaxed text-base max-w-3xl whitespace-pre-line">
                        {project.overview}
                    </p>

                    {project.demoNote && (
                        <div className="border border-purple-800/40 bg-purple-950/20 rounded-lg p-5 space-y-4 max-w-3xl">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                <span className="font-mono text-[11px] text-purple-400 uppercase tracking-widest">
                                    live demo
                                </span>
                            </div>
                            <p className="text-sm text-gray-300">{project.demoNote.status}</p>
                            <div className="space-y-3">
                                {project.demoNote.steps.map((step, i) => (
                                    <div key={i} className="flex gap-3 text-sm">
                                        <span className="font-mono text-purple-500 shrink-0 text-xs mt-0.5">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <div>
                                            <span className="text-white font-medium">{step.label} — </span>
                                            <span className="text-gray-400">{step.detail}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* ── THE CHALLENGE + MY ROLE ──────────────────── */}
                <div className="grid sm:grid-cols-2 gap-6">
                    <section className="border border-gray-800 bg-gray-900/30 rounded p-6 space-y-3">
                        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block">
                            // the challenge
                        </span>
                        <p className="text-gray-400 text-sm leading-relaxed">{project.problem}</p>
                    </section>
                    <section className="border border-gray-800 bg-gray-900/30 rounded p-6 space-y-3">
                        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block">
                            // my role
                        </span>
                        <p className="text-gray-400 text-sm leading-relaxed">{project.role}</p>
                    </section>
                </div>

                {/* ── KEY FEATURES ─────────────────────────────── */}
                <section className="space-y-6">
                    <SectionLabel icon={<FiStar size={13} />} label="Key Features" />
                    <div className="grid sm:grid-cols-2 gap-4">
                        {project.features.map((feature, i) => (
                            <div key={i}
                                className="border border-gray-800 hover:border-gray-700 bg-gray-900/20 hover:bg-gray-900/40 rounded p-5 transition-colors duration-200 space-y-2">
                                <div className="flex items-start gap-2">
                                    <span className="font-mono text-purple-500 text-xs mt-0.5 shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-white text-sm font-semibold leading-snug">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-gray-500 text-xs leading-relaxed pl-6">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── TECH STACK ───────────────────────────────── */}
                <section className="space-y-6">
                    <SectionLabel icon={<FiCode size={13} />} label="Tech Stack" />
                    <StackSection stack={project.stack} />
                </section>

                {/* ── TECHNICAL HIGHLIGHTS ─────────────────────── */}
                {project.highlights?.length > 0 && (
                    <section className="space-y-6">
                        <SectionLabel icon={<FiZap size={13} />} label="Technical Highlights" />
                        <div className="space-y-3">
                            {project.highlights.map((h, i) => (
                                <div key={i}
                                    className="flex gap-4 border-l-2 border-purple-800/50 hover:border-purple-600 pl-4 py-1 transition-colors duration-200">
                                    <p className="text-gray-400 text-sm leading-relaxed">{h}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── BOTTOM CTA ───────────────────────────────── */}
                <footer className="border-t border-gray-800 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors duration-200 group">
                        <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                        <span className="font-mono text-xs">back to projects</span>
                    </button>

                    <div className="flex gap-3">
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 font-mono text-sm text-white border border-purple-700 px-5 py-2 rounded-full hover:bg-purple-800 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                                <FiExternalLink size={14} /> Live preview
                            </a>
                        )}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 font-mono text-sm text-gray-300 border border-gray-700 px-5 py-2 rounded-full hover:border-gray-500 hover:text-white transition-all duration-300">
                                <FiGithub size={14} /> {project.githubPrivate ? "GitHub Profile" : "View Repository"}
                            </a>
                        )}
                    </div>
                </footer>
            </div>
        </div>
    )
}

function SectionLabel({ icon, label }) {
    return (
        <div className="flex items-center gap-2 text-white">
            <span className="text-purple-400">{icon}</span>
            <h2 className="text-lg font-bold tracking-tight">{label}</h2>
            <div className="flex-1 h-px bg-gray-800 ml-2" />
        </div>
    )
}
