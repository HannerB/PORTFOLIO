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

const CARD_W = 260 // px — each card column width

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
            currentGroup = {
                key,
                year,
                month: d.toLocaleString("en", { month: "short" }),
                isNewYear: year !== prevYear,
                projects: [],
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
            className="relative border border-gray-800 hover:border-purple-600 bg-gray-900/40 hover:bg-gray-900/70 rounded overflow-hidden group transition-all duration-300 flex flex-col h-full"
        >
            {/* Terminal chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-800/60 bg-gray-900/60 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-800 group-hover:bg-red-500 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-800 group-hover:bg-yellow-400 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-800 group-hover:bg-green-400 transition-colors duration-300" />
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
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-purple-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-mono text-xs text-white border border-purple-400 px-3 py-1.5 rounded-full">
                            → view
                        </span>
                    </div>
                </figure>
            ) : (
                <figure className="relative overflow-hidden shrink-0">
                    <div className={`w-full h-32 bg-gradient-to-br ${s.bg} flex flex-col items-center justify-center gap-2 px-3 relative`}>
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                            }}
                        />
                        <h3 className="text-white font-bold text-xs text-center leading-snug relative z-10">{title}</h3>
                        <div className="flex flex-wrap justify-center gap-1 relative z-10">
                            {tags.slice(0, 2).map(tag => (
                                <span key={tag} className={`font-mono text-[8px] ${s.text} border ${s.border} px-1.5 py-0.5 rounded opacity-80`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-purple-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-mono text-xs text-white border border-purple-400 px-3 py-1.5 rounded-full">
                            → view
                        </span>
                    </div>
                </figure>
            )}

            {/* Content */}
            <div className="px-3 py-3 flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${CATEGORY_DOT[category]}`} />
                    <h3 className="text-white font-bold text-xs group-hover:text-purple-300 transition-colors duration-200 leading-snug">
                        {title}
                    </h3>
                </div>
                <p className="text-gray-500 text-[10px] leading-relaxed flex-1 line-clamp-2">{tagline}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {tags.slice(0, 3).map(tag => (
                        <span key={tag} className="font-mono text-[9px] text-purple-400/70 border border-purple-900/50 bg-purple-950/20 px-1.5 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                    {tags.length > 3 && (
                        <span className="font-mono text-[9px] text-gray-600 px-1 py-0.5">+{tags.length - 3}</span>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default function ProjectTimeline() {
    return (
        <div className="overflow-x-auto pb-6 -mx-4 px-4">
            {/* Outer flex row — each group expands to fit its cards */}
            <div className="flex" style={{ minWidth: "max-content" }}>
                {GROUPS.map((group) => {
                    const sectionW = group.projects.length * CARD_W

                    return (
                        <div key={group.key} className="flex flex-col" style={{ width: sectionW }}>

                            {/* Month / year label row */}
                            <div className="flex items-end gap-1.5 px-2 pb-2 h-12">
                                {group.isNewYear && (
                                    <span className="font-mono text-xs font-bold text-gray-300">{group.year}</span>
                                )}
                                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                                    {group.month}
                                </span>
                            </div>

                            {/* Timeline line — dot at left edge, line spans full section width */}
                            <div className="relative h-5 shrink-0">
                                {/* Full-width horizontal line */}
                                <div className="absolute inset-x-0 top-1/2 h-px bg-gray-700" />
                                {/* Dot at the start of this month section */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-900 border-2 border-gray-500 z-10" />
                            </div>

                            {/* Cards — side by side in a flex row */}
                            <div className="flex pt-4 gap-0">
                                {group.projects.map((p) => (
                                    <div key={p.slug} className="px-2" style={{ width: CARD_W }}>
                                        <TimelineCard {...p} index={sorted.indexOf(p)} />
                                    </div>
                                ))}
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}
