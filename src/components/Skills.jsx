import { useState } from "react"
import { useTranslation } from "react-i18next"

const skills = [
    // ── FRONTEND ────────────────────────────────────────────────────
    { category: "frontend", icon: "https://cdn.simpleicons.org/react/61DAFB",       name: "React",          level: "Advanced",     note: "v18 & v19 — hooks, context, lazy loading, Suspense" },
    { category: "frontend", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",   name: "Next.js",        level: "Advanced",     note: "App Router, API routes, server components, Turbopack" },
    { category: "frontend", icon: "https://cdn.simpleicons.org/typescript/3178C6",  name: "TypeScript",     level: "Advanced",     note: "Strict typing, generics, Zod schemas, type-safe APIs" },
    { category: "frontend", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", name: "Tailwind CSS",   level: "Advanced",     note: "v3 & v4, custom config, responsive design systems" },
    { category: "frontend", icon: "https://cdn.simpleicons.org/vite/646CFF",        name: "Vite",           level: "Advanced",     note: "SWC compiler, manual chunk splitting, asset optimization" },
    { category: "frontend", icon: "https://cdn.simpleicons.org/framer/0055FF",      name: "Framer Motion",  level: "Intermediate", note: "Scroll animations, transitions, gesture interactions" },
    { category: "frontend", icon: "https://cdn.simpleicons.org/threedotjs/FFFFFF",  name: "Three.js",       level: "Intermediate", note: "WebGL scenes, particle systems, mouse-interactive 3D" },
    { category: "frontend", icon: "https://cdn.simpleicons.org/greensock/88CE02",   name: "GSAP",           level: "Intermediate", note: "ScrollTrigger, timelines, RAF-throttled animations" },
    { category: "frontend", icon: "https://cdn.simpleicons.org/redux/764ABC",       name: "Redux Toolkit",  level: "Intermediate", note: "Slices, async thunks, RTK Query, global state management" },
    { category: "frontend", icon: "https://cdn.simpleicons.org/sass/CC6699",        name: "SASS",           level: "Advanced",     note: "Nesting, mixins, variables, BEM-compatible stylesheets" },
    { category: "frontend", icon: "https://cdn.simpleicons.org/bootstrap/7952B3",   name: "Bootstrap",      level: "Advanced",     note: "Grid system, components, SASS customization" },
    // ── BACKEND ─────────────────────────────────────────────────────
    { category: "backend",  icon: "https://cdn.simpleicons.org/nestjs/E0234E",      name: "NestJS",         level: "Advanced",     note: "Modules, guards, interceptors, WebSockets, Swagger" },
    { category: "backend",  icon: "https://cdn.simpleicons.org/laravel/FF2D20",     name: "Laravel",        level: "Advanced",     note: "Livewire, Eloquent, Artisan commands, Excel exports" },
    { category: "backend",  icon: "https://cdn.simpleicons.org/php/777BB4",         name: "PHP",            level: "Advanced",     note: "Custom MVC, FPDF, PHPMailer, PHPRunner extensions" },
    { category: "backend",  icon: "https://cdn.simpleicons.org/dotnet/512BD4",      name: "C# / .NET",      level: "Intermediate", note: "ASP.NET Core Web API, DTOs, Entity Framework migrations" },
    { category: "backend",  icon: "https://cdn.simpleicons.org/nodedotjs/339933",   name: "Node.js",        level: "Advanced",     note: "REST APIs, Express, Multer file uploads, pm2" },
    // ── DATABASE ────────────────────────────────────────────────────
    { category: "database", icon: "https://cdn.simpleicons.org/postgresql/4169E1",  name: "PostgreSQL",     level: "Advanced",     note: "Relational schemas, RLS policies, triggers, migrations" },
    { category: "database", icon: "https://cdn.simpleicons.org/mysql/4479A1",       name: "MySQL",          level: "Advanced",     note: "Complex joins, migrations, procedure-driven constraints" },
    { category: "database", icon: "https://cdn.simpleicons.org/prisma/2D3748",      name: "Prisma ORM",     level: "Advanced",     note: "Split schema, migrations, seeding, repository pattern" },
    { category: "database", icon: "https://cdn.simpleicons.org/supabase/3ECF8E",    name: "Supabase",       level: "Advanced",     note: "Auth, RLS, realtime, storage, SQL migrations" },
    // ── DEVOPS & TOOLS ──────────────────────────────────────────────
    { category: "devops",   icon: "https://cdn.simpleicons.org/docker/2496ED",      name: "Docker",         level: "Intermediate", note: "Dockerfile, docker-compose, multi-service stacks" },
    { category: "devops",   icon: "https://cdn.simpleicons.org/githubactions/2088FF",name: "GitHub Actions", level: "Advanced",     note: "CI/CD pipelines, build in CI, SCP deploys, secrets management" },
    { category: "devops",   icon: "https://cdn.simpleicons.org/nginx/009639",       name: "Nginx",          level: "Intermediate", note: "Reverse proxy, SSL termination, static file serving, virtual hosts" },
    { category: "devops",   icon: "https://cdn.simpleicons.org/jest/C21325",        name: "Jest",           level: "Intermediate", note: "Unit and integration testing, mocks, coverage reports" },
    { category: "devops",   icon: "https://cdn.simpleicons.org/playwright/2EAD33",  name: "Playwright",     level: "Intermediate", note: "E2E testing, cross-browser automation, CI integration" },
    { category: "devops",   icon: "https://cdn.simpleicons.org/stripe/635BFF",      name: "Stripe",         level: "Intermediate", note: "Payments, webhooks, subscription lifecycle management" },
    { category: "devops",   icon: "https://cdn.simpleicons.org/vercel/FFFFFF",      name: "Vercel",         level: "Intermediate", note: "Deployments, Speed Insights, environment management" },
    { category: "devops",   icon: "https://cdn.simpleicons.org/git/F05032",         name: "Git",            level: "Advanced",     note: "Branching strategies, Husky hooks, conventional commits" },
    { category: "devops",   icon: "https://cdn.simpleicons.org/googlecloud/4285F4", name: "Google Cloud",   level: "Intermediate", note: "Cloud Storage buckets, structured file upload pipelines" },
]

const LEVEL_STYLE = {
    Advanced: "text-purple-400 border-purple-800/60 bg-purple-950/30",
    Intermediate: "text-blue-400 border-blue-800/60 bg-blue-950/30",
}

const SkillCard = ({ icon, name, level, note, index }) => (
    <article className="relative border border-gray-800 hover:border-purple-600/60 bg-gray-900/30 hover:bg-gray-900/60 rounded p-4 transition-all duration-300 group flex gap-3 items-start">
        <img src={icon} alt={name} className="w-7 h-7 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white text-sm font-semibold group-hover:text-purple-300 transition-colors duration-200">
                    {name}
                </h3>
                <span className={`font-mono text-[9px] border px-1.5 py-0.5 rounded shrink-0 ${LEVEL_STYLE[level]}`}>
                    {level}
                </span>
            </div>
            <p className="text-gray-600 text-[11px] leading-relaxed">{note}</p>
        </div>
        <span className="font-mono text-[9px] text-gray-800 shrink-0 mt-0.5">
            {String(index + 1).padStart(2, "0")}
        </span>
    </article>
)

export default function Skills() {
    const [active, setActive] = useState("all")
    const { t } = useTranslation()

    const CATEGORIES = [
        { id: "all",      label: t('skills.categories.all') },
        { id: "frontend", label: t('skills.categories.frontend') },
        { id: "backend",  label: t('skills.categories.backend') },
        { id: "database", label: t('skills.categories.database') },
        { id: "devops",   label: t('skills.categories.devops') },
    ]

    const filtered = active === "all" ? skills : skills.filter((s) => s.category === active)

    const counts = Object.fromEntries(
        CATEGORIES.map((c) => [c.id, c.id === "all" ? skills.length : skills.filter((s) => s.category === c.id).length])
    )

    return (
        <section
            id="skills"
            className="relative overflow-hidden text-white px-4 py-20"
        >
            {/* Grid texture */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-36 bg-[#cd3cf5] rounded-full blur-3xl opacity-10" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <header data-aos="fade-up" data-aos-delay="300" className="text-center mb-10">
                    <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                        {t('skills.label')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
                        {t('skills.title')} <span className="text-purple-400">{t('skills.titleHighlight')}</span>
                    </h2>
                    <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
                        {t('skills.subtitle')}
                    </p>
                </header>

                {/* Filters */}
                <div data-aos="fade-up" data-aos-delay="400" className="flex flex-wrap justify-center gap-2 mb-8">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActive(cat.id)}
                            className={`font-mono text-xs px-4 py-2 rounded border transition-all duration-200 cursor-pointer ${
                                active === cat.id
                                    ? "border-purple-500 bg-purple-600/20 text-purple-300"
                                    : "border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300"
                            }`}
                        >
                            {cat.label}
                            <span className="ml-2 text-[10px] opacity-50">({counts[cat.id]})</span>
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                    {filtered.map((skill, i) => (
                        <SkillCard key={skill.name} {...skill} index={i} />
                    ))}
                </div>

                {/* Summary bar */}
                <div data-aos="fade-up" data-aos-delay="600" className="mt-10 border border-gray-800 bg-gray-900/30 rounded p-4 flex flex-wrap justify-center gap-6">
                    {[
                        { label: t('skills.categories.frontend'), count: skills.filter(s => s.category === "frontend").length },
                        { label: t('skills.categories.backend'),  count: skills.filter(s => s.category === "backend").length },
                        { label: t('skills.categories.database'), count: skills.filter(s => s.category === "database").length },
                        { label: t('skills.categories.devops'),   count: skills.filter(s => s.category === "devops").length },
                    ].map(({ label, count }) => (
                        <div key={label} className="text-center">
                            <span className="block text-2xl font-bold text-purple-400">{count}</span>
                            <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
