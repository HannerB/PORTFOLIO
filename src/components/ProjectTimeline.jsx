import { useState } from "react"
import { Link } from "react-router-dom"
import { projects } from "../data/projects"

const CATEGORY_DOT = {
    platform: "bg-purple-500",
    webapp:   "bg-blue-500",
    landing:  "bg-emerald-500",
}

const PLACEHOLDER_STYLES = {
    platform: { bg: "from-purple-950 to-gray-900", text: "text-purple-400", border: "border-purple-900/40" },
    webapp:   { bg: "from-blue-950 to-gray-900",   text: "text-blue-400",   border: "border-blue-900/40"   },
    landing:  { bg: "from-emerald-950 to-gray-900", text: "text-emerald-400", border: "border-emerald-900/40" },
}

const sorted = [...projects].sort((a, b) => new Date(b.dateEnd) - new Date(a.dateEnd))

function groupByYearMonth(list) {
    const result = []
    let currentKey = null
    let currentGroup = null
    let prevYear = null

    list.forEach(p => {
        const d = new Date(p.dateEnd)
        const year = d.getFullYear()
        const monthIdx = d.getMonth()
        const key = `${year}-${monthIdx}`

        if (key !== currentKey) {
            const isNewYear = year !== prevYear
            currentGroup = {
                year,
                month: d.toLocaleString("en", { month: "long" }),
                projects: [],
                isNewYear,
            }
            result.push(currentGroup)
            currentKey = key
            prevYear = year
        }
        currentGroup.projects.push(p)
    })

    return result
}

const GROUPS = groupByYearMonth(sorted)

function TimelineCard({ slug, image, title, tagline, tags, category, index }) {
    const [imgFailed, setImgFailed] = useState(false)
    const showImage = image && !imgFailed
    const s = PLACEHOLDER_STYLES[category]

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

            {/* Image or placeholder */}
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
                            {tags.slice(0, 3).map(tag => (
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
                    {tags.slice(0, 4).map(tag => (
                        <span key={tag} className="font-mono text-[10px] text-purple-400/70 border border-purple-900/50 bg-purple-950/20 px-2 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                    {tags.length > 4 && (
                        <span className="font-mono text-[10px] text-gray-600 px-1 py-0.5">+{tags.length - 4}</span>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default function ProjectTimeline() {
    return (
        <div className="relative">
            {/* Vertical spine */}
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gray-800" />

            {GROUPS.map((group) => (
                <div key={`${group.year}-${group.month}`} className="mb-10 relative">

                    {/* Year marker */}
                    {group.isNewYear && (
                        <div className="flex items-center gap-3 mb-5 pl-0">
                            <div className="w-4 h-4 rounded-full bg-gray-900 border-2 border-gray-500 shrink-0 z-10" />
                            <span className="font-mono text-base font-bold text-gray-300">{group.year}</span>
                            <div className="flex-1 h-px bg-gray-700" />
                        </div>
                    )}

                    {/* Month marker */}
                    <div className="flex items-center gap-3 mb-4 pl-0">
                        <div className="w-4 h-4 flex items-center justify-center shrink-0 z-10">
                            <div className="w-2 h-2 rounded-full bg-gray-600" />
                        </div>
                        <span className="font-mono text-[11px] text-gray-500 uppercase tracking-widest">
                            {group.month} {group.year}
                        </span>
                    </div>

                    {/* Cards */}
                    <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {group.projects.map((p, i) => (
                            <TimelineCard key={p.slug} {...p} index={sorted.indexOf(p)} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
