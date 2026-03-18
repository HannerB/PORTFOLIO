const services = [
    {
        icon: "⬡",
        title: "Full Stack Development",
        desc: "End-to-end web applications built with React, NestJS and TypeScript — from database schema to production deploy.",
        tags: ["React", "NestJS", "TypeScript", "PostgreSQL"],
    },
    {
        icon: "⬡",
        title: "REST API Design",
        desc: "Scalable, well-documented APIs with JWT authentication, role-based access control and Swagger documentation.",
        tags: ["Node.js", "NestJS", "Laravel", "Swagger"],
    },
    {
        icon: "⬡",
        title: "Payment Integration",
        desc: "Stripe, PayPal and Wompi integrations including webhooks, subscription lifecycle, checkout sessions and tax handling.",
        tags: ["Stripe", "PayPal", "Wompi", "Webhooks"],
    },
    {
        icon: "⬡",
        title: "Landing Pages & Websites",
        desc: "Fast, responsive and visually polished landing pages and corporate websites with modern animations.",
        tags: ["React", "Tailwind", "GSAP", "Vite"],
    },
    {
        icon: "⬡",
        title: "Database Design",
        desc: "Relational database modeling, migrations, query optimization and Row Level Security policies.",
        tags: ["PostgreSQL", "MySQL", "Prisma", "Supabase"],
    },
    {
        icon: "⬡",
        title: "Frontend Development",
        desc: "Component-driven UIs with React or Next.js, responsive design systems and interactive animations.",
        tags: ["React", "Next.js", "Three.js", "Framer Motion"],
    },
]

export default function Services() {
    return (
        <section id="services" className="relative py-20 px-4 text-white overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">
                <header data-aos="fade-up" data-aos-delay="300" className="text-center mb-12">
                    <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                        // 02 — services
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
                        What I <span className="text-purple-400">Offer</span>
                    </h2>
                    <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
                        From idea to production — services I provide as a freelance full stack developer.
                    </p>
                </header>

                <div
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {services.map((service, i) => (
                        <article
                            key={service.title}
                            className="border border-gray-800 hover:border-purple-600/60 bg-gray-900/30 hover:bg-gray-900/60 rounded p-6 transition-all duration-300 group flex flex-col gap-3"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-purple-400 text-lg leading-none">⬡</span>
                                <h3 className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors duration-200">
                                    {service.title}
                                </h3>
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed flex-1">
                                {service.desc}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-800/60">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="font-mono text-[9px] text-purple-400/60 border border-purple-900/40 bg-purple-950/20 px-2 py-0.5 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
