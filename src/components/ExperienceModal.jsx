import { useEffect } from "react"
import { Link } from "react-router-dom"
import { FaTimes, FaBriefcase, FaGraduationCap, FaCertificate, FaArrowRight, FaCode } from "react-icons/fa"

const experience = [
    {
        company: "Fullstack Labs — Tecnoparque, SENA",
        role: "Full Stack Developer · Professional Internship",
        period: "Jul 2025 – Jan 2026",
        bullets: [
            "Built ECPL, a labor competency certification system with candidate, project and NCL standards management.",
            "Implemented VIVU, the SENA academic management platform with executive dashboard, user verification and QR code generator for courses.",
        ],
        tags: ["Laravel", "PHP", "MySQL", "Livewire"],
        projects: [
            { slug: "ecpl", label: "ECPL" },
            { slug: "vivu", label: "VIVU" },
        ],
    },
    {
        company: "Akademia",
        role: "Full Stack Developer · Remote",
        period: "Dec 2024 – Jun 2025",
        bullets: [
            "Automatic academic schedule generator with multi-constraint validation and optimization algorithms.",
            "Bidirectional integration with a legacy Oracle system for academic data management.",
            "Automatic conflict detection and real-time resource occupancy reports.",
        ],
        tags: ["Laravel", "Livewire", "MySQL", "Oracle"],
        projects: [
            { slug: "app-akadem-ia", label: "app-akadem-ia" },
        ],
    },
    {
        company: "Proveify",
        role: "Backend Developer · Remote",
        period: "Apr 2024 – Dec 2025",
        bullets: [
            "B2B marketplace REST API with JWT authentication, refresh token rotation and Google Cloud Storage integration.",
            "Multi-level categorization system and full Jest unit test suite across all modules.",
            "Real-time WebSockets for quote submission and status tracking.",
        ],
        tags: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "GCS"],
        projects: [
            { slug: "proveify-back", label: "Proveify" },
        ],
    },
    {
        company: "Semillero — Tecnoparque, SENA",
        role: "Web Developer",
        period: "Apr 2024 – Sep 2024",
        bullets: [
            "Developed multiple web apps and landing pages for internal tech incubator projects.",
            "Lab Sensorial SENA: laboratory management system with inventory control and reservations.",
            "Web projects for startups and organizations: Agrosena, CONTEB, TVD, Alerta Roja.",
        ],
        tags: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
        projects: [
            { slug: "lab-sensorial-sena", label: "Lab Sensorial" },
            { slug: "agrosena", label: "Agrosena" },
            { slug: "tvd", label: "TVD" },
            { slug: "conteb", label: "CONTEB" },
        ],
    },
]

const freelance = [
    {
        slug: "1tomilion",
        title: "1TOMILLION",
        desc: "Educational platform with Stripe payments, JWT auth, CI/CD to VPS and a PDF book library.",
        tags: ["NestJS", "React", "Supabase", "Stripe"],
    },
    {
        slug: "wedoitweb",
        title: "WeDoItBranding",
        desc: "AI-powered brand identity SaaS with Three.js WebGL hero, GSAP animations and a 13-step questionnaire.",
        tags: ["React", "Three.js", "GSAP", "Vite"],
    },
    {
        slug: "sistema-contable-pr",
        title: "Sistema Contable PR",
        desc: "Accounting platform with 15+ fiscal cotejo types, client management and full Playwright E2E test suite.",
        tags: ["Next.js", "Prisma", "PostgreSQL", "Playwright"],
    },
    {
        slug: "greythium",
        title: "GREYTHIUM",
        desc: "B2B/B2C international trade platform with dual payment gateway (Stripe + PayPal) across 51 tax jurisdictions.",
        tags: ["PHP", "MySQL", "Stripe", "PayPal"],
    },
    {
        slug: "school-management-app",
        title: "School Management",
        desc: "Multi-module school management system with academic calendar, parent portal and payroll processing.",
        tags: ["React", "NestJS", "PostgreSQL", "ApexCharts"],
    },
    {
        slug: "crystalberylmedia",
        title: "CrystalBeryl Media",
        desc: "Landing page for a media agency with brand identity design, scroll animations and contact form.",
        tags: ["React", "Tailwind", "Vite"],
    },
]

const education = [
    {
        title: "Software Analysis & Development",
        institution: "SENA",
        period: "2023 – 2025",
        note: "Technical Degree · Full Stack, REST APIs, relational databases, Git, Docker",
    },
    {
        title: "Software Programming",
        institution: "SENA",
        period: "2020 – 2021",
        note: "Technical High School · Java, MySQL, NetBeans",
    },
]

const certifications = [
    { name: "Power BI", issuer: "SENA", year: "2024" },
    { name: "Office Suite", issuer: "SENA", year: "2024" },
]

const languages = [
    { name: "Spanish", level: "Native", bar: 100 },
    { name: "English", level: "B2 — Upper Intermediate", bar: 72 },
]

export default function ExperienceModal({ onClose }) {
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onClose])

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => { document.body.style.overflow = "" }
    }, [])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <div
                className="modal-scroll relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-gray-950 border border-gray-800 rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Terminal header */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                        <span className="ml-3 font-mono text-[11px] text-purple-400 uppercase tracking-widest">
                            // hanner_barros.profile
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-white transition-colors duration-200 p-1 cursor-pointer"
                    >
                        <FaTimes size={13} />
                    </button>
                </div>

                <div className="px-6 py-6 space-y-8">

                    {/* ── EXPERIENCE ───────────────────────────── */}
                    <section>
                        <div className="flex items-center gap-2 mb-5">
                            <FaBriefcase size={11} className="text-purple-400" />
                            <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                                Experience
                            </span>
                        </div>

                        <div className="relative space-y-4">
                            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gray-800" />

                            {experience.map((item, i) => (
                                <div key={i} className="pl-6 relative">
                                    <div className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full bg-gray-950 border border-purple-600" />

                                    <div className="border border-gray-800 hover:border-gray-700 bg-gray-900/30 rounded p-4 transition-colors duration-200">
                                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                            <div>
                                                <h3 className="text-white font-semibold text-sm leading-snug">
                                                    {item.company}
                                                </h3>
                                                <p className="text-purple-400 font-mono text-[11px] mt-0.5">
                                                    {item.role}
                                                </p>
                                            </div>
                                            <span className="font-mono text-[10px] text-gray-600 border border-gray-800 px-2 py-1 rounded shrink-0">
                                                {item.period}
                                            </span>
                                        </div>

                                        <ul className="space-y-1.5 mb-3">
                                            {item.bullets.map((b, j) => (
                                                <li key={j} className="text-gray-500 text-xs leading-relaxed flex gap-2">
                                                    <span className="text-purple-700 shrink-0 mt-0.5">▸</span>
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-800/60">
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="font-mono text-[9px] text-purple-400/60 border border-purple-900/40 bg-purple-950/20 px-2 py-0.5 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.projects.map((p) => (
                                                    <Link
                                                        key={p.slug}
                                                        to={`/projects/${p.slug}`}
                                                        onClick={onClose}
                                                        className="inline-flex items-center gap-1 font-mono text-[10px] text-purple-400 hover:text-white border border-purple-900/50 hover:border-purple-500 bg-purple-950/20 hover:bg-purple-900/30 px-2.5 py-1 rounded transition-all duration-200"
                                                    >
                                                        {p.label}
                                                        <FaArrowRight size={8} />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── FREELANCE ────────────────────────────── */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <FaCode size={11} className="text-purple-400" />
                            <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                                Freelance &amp; Fiverr
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {freelance.map((item) => (
                                <Link
                                    key={item.slug}
                                    to={`/projects/${item.slug}`}
                                    onClick={onClose}
                                    className="group border border-gray-800 hover:border-purple-600/60 bg-gray-900/30 hover:bg-gray-900/60 rounded p-4 transition-all duration-200 flex flex-col gap-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-white text-sm font-semibold group-hover:text-purple-300 transition-colors duration-200">
                                            {item.title}
                                        </h3>
                                        <FaArrowRight size={9} className="text-gray-700 group-hover:text-purple-400 transition-colors duration-200" />
                                    </div>
                                    <p className="text-gray-600 text-[11px] leading-relaxed flex-1">{item.desc}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-mono text-[9px] text-purple-400/60 border border-purple-900/40 bg-purple-950/20 px-2 py-0.5 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* ── EDUCATION ────────────────────────────── */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <FaGraduationCap size={11} className="text-purple-400" />
                            <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                                Education
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {education.map((item, i) => (
                                <div key={i} className="border border-gray-800 bg-gray-900/30 rounded p-4">
                                    <div className="flex justify-between items-start gap-2 mb-1">
                                        <h3 className="text-white text-sm font-semibold leading-snug">{item.title}</h3>
                                        <span className="font-mono text-[10px] text-gray-600 shrink-0">{item.period}</span>
                                    </div>
                                    <p className="font-mono text-[11px] text-purple-400">{item.institution}</p>
                                    {item.note && (
                                        <p className="text-gray-600 text-[11px] mt-1.5 leading-relaxed">{item.note}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── CERTS + LANGUAGES ────────────────────── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <FaCertificate size={11} className="text-purple-400" />
                                <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                                    Certifications
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {certifications.map((cert) => (
                                    <div
                                        key={cert.name}
                                        className="border border-gray-800 bg-gray-900/30 rounded px-4 py-2.5"
                                    >
                                        <span className="text-white text-sm font-medium block">{cert.name}</span>
                                        <span className="font-mono text-[10px] text-gray-600">{cert.issuer} · {cert.year}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-purple-400 text-[11px]">◈</span>
                                <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                                    Languages
                                </span>
                            </div>
                            <div className="flex flex-col gap-3">
                                {languages.map((lang) => (
                                    <div key={lang.name} className="border border-gray-800 bg-gray-900/30 rounded px-4 py-2.5">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-white text-sm font-medium">{lang.name}</span>
                                            <span className="font-mono text-[10px] text-purple-400">{lang.level}</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-purple-700 to-purple-400 rounded-full"
                                                style={{ width: `${lang.bar}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                </div>
            </div>
        </div>
    )
}
