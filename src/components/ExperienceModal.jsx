import { useEffect } from "react"
import { Link } from "react-router-dom"
import { FaTimes, FaBriefcase, FaGraduationCap, FaCertificate, FaArrowRight, FaCode } from "react-icons/fa"

const experience = [
    {
        company: "Fullstack Labs — Tecnoparque, SENA",
        role: "Desarrollador Full Stack · Prácticas Profesionales",
        period: "Jul 2025 – Ene 2026",
        bullets: [
            "Desarrollé ECPL, sistema de certificación de competencias laborales con gestión de candidatos, proyectos y normas NCL.",
            "Implementé VIVU, plataforma académica SENA con dashboard ejecutivo, verificación de usuarios y generador de QR para cursos.",
        ],
        tags: ["Laravel", "PHP", "MySQL", "Livewire"],
        projects: [
            { slug: "ecpl", label: "ECPL" },
            { slug: "vivu", label: "VIVU" },
        ],
    },
    {
        company: "Akademia",
        role: "Desarrollador Full Stack · Remoto",
        period: "Dic 2024 – Jun 2025",
        bullets: [
            "Generador automático de horarios académicos con validación multi-restricción y algoritmos de optimización.",
            "Integración bidireccional con sistema legacy Oracle para gestión de datos académicos.",
            "Diagnóstico automático de conflictos y reportes en tiempo real de ocupación de recursos.",
        ],
        tags: ["Laravel", "Livewire", "MySQL", "Oracle"],
        projects: [
            { slug: "app-akadem-ia", label: "app-akadem-ia" },
        ],
    },
    {
        company: "Proveify",
        role: "Desarrollador Backend · Remoto",
        period: "Abr 2024 – Dic 2025",
        bullets: [
            "Marketplace B2B con API REST, autenticación JWT con refresh tokens e integración Google Cloud Storage.",
            "Sistema de categorización multi-nivel y suite completa de tests unitarios con Jest.",
            "WebSockets en tiempo real para envío y seguimiento de cotizaciones.",
        ],
        tags: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "GCS"],
        projects: [
            { slug: "proveify-back", label: "Proveify" },
        ],
    },
    {
        company: "Semillero — Tecnoparque, SENA",
        role: "Desarrollador Web",
        period: "Abr 2024 – Sep 2024",
        bullets: [
            "Desarrollé múltiples aplicaciones y landings para proyectos internos del semillero tecnológico.",
            "Lab Sensorial SENA: sistema de gestión de laboratorios con control de inventario y reservas.",
            "Proyectos web para emprendimientos y entidades: Agrosena, CONTEB, TVD, Alerta Roja.",
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
        desc: "Plataforma educativa con Stripe, JWT, CI/CD a VPS y biblioteca de PDFs.",
        tags: ["NestJS", "React", "Supabase", "Stripe"],
    },
    {
        slug: "wedoitweb",
        title: "WeDoItBranding",
        desc: "SaaS de identidad de marca con IA, Three.js, GSAP y cuestionario de 13 pasos.",
        tags: ["React", "Three.js", "GSAP", "Vite"],
    },
    {
        slug: "sistema-contable-pr",
        title: "Sistema Contable PR",
        desc: "15+ tipos de cotejos fiscales, gestión de clientes y tests E2E con Playwright.",
        tags: ["Next.js", "Prisma", "PostgreSQL", "Playwright"],
    },
    {
        slug: "greythium",
        title: "GREYTHIUM",
        desc: "Plataforma B2B/B2C con dual payment gateway (Stripe + PayPal) y 51 jurisdicciones fiscales.",
        tags: ["PHP", "MySQL", "Stripe", "PayPal"],
    },
    {
        slug: "school-management-app",
        title: "School Management",
        desc: "Sistema de gestión escolar multi-módulo con calendario, portal de padres y nómina.",
        tags: ["React", "NestJS", "PostgreSQL", "ApexCharts"],
    },
    {
        slug: "crystalberylmedia",
        title: "CrystalBeryl Media",
        desc: "Landing para agencia de medios con identidad de marca, animaciones y formulario de contacto.",
        tags: ["React", "Tailwind", "Vite"],
    },
]

const education = [
    {
        title: "Análisis y Desarrollo de Software",
        institution: "SENA",
        period: "2023 – 2025",
        note: "Técnico · Full Stack, APIs REST, bases de datos relacionales, Git, Docker",
    },
    {
        title: "Programación de Software",
        institution: "SENA",
        period: "2020 – 2021",
        note: "Media Técnica · Java, MySQL, NetBeans",
    },
]

const certifications = [
    { name: "Power BI", issuer: "SENA", year: "2024" },
    { name: "Ofimática", issuer: "SENA", year: "2024" },
]

const languages = [
    { name: "Español", level: "Nativo", bar: 100 },
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
                className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-gray-950 border border-gray-800 rounded-lg shadow-2xl"
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
