import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { projects } from "../data/projects"

const MotionLink = motion.create(Link)

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

const CARD_W    = 260  // px per card column
const CARD_AREA = 320  // px — height reserved above AND below the line

// Sort newest → oldest (left to right)
const sorted = [...projects].sort((a, b) => new Date(b.dateEnd) - new Date(a.dateEnd))

// Flatten with global alternating index + month boundary info
function buildEntries(list) {
    const entries = []
    let prevKey = null
    let prevYear = null

    list.forEach((p, i) => {
        const d        = new Date(p.dateEnd)
        const year     = d.getFullYear()
        const monthIdx = d.getMonth()
        const key      = `${year}-${monthIdx}`
        const above    = i % 2 === 0   // even = above line, odd = below

        entries.push({
            ...p,
            above,
            isFirstInMonth: key !== prevKey,
            isNewYear:      key !== prevKey && year !== prevYear,
            monthLabel:     d.toLocaleString("en", { month: "short" }),
            yearLabel:      year,
        })

        if (key !== prevKey) prevKey = key
        if (year !== prevYear) prevYear = year
    })

    return entries
}

const ENTRIES = buildEntries(sorted)

function TimelineCard({ slug, image, title, tagline, tags, category, index, animDelay = 0 }) {
    const [imgFailed, setImgFailed] = useState(false)
    const showImage = image && !imgFailed
    const s = PLACEHOLDER_STYLES[category]

    return (
        <MotionLink
            layoutId={`card-${slug}`}
            to={`/projects/${slug}`}
            className="relative border border-gray-800 hover:border-purple-600 bg-gray-900/40 hover:bg-gray-900/70 rounded overflow-hidden group flex flex-col"
            transition={{ type: "spring", stiffness: 180, damping: 26 }}
        >
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-800/60 bg-gray-900/60 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-800 group-hover:bg-red-500 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-800 group-hover:bg-yellow-400 transition-colors duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-800 group-hover:bg-green-400 transition-colors duration-300" />
                <span className="ml-auto font-mono text-[10px] text-gray-700">
                    project_{String(index + 1).padStart(2, "0")}
                </span>
            </div>

            {showImage ? (
                <figure className="relative overflow-hidden shrink-0">
                    <img
                        src={image}
                        alt={title}
                        onError={() => setImgFailed(true)}
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-purple-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-mono text-xs text-white border border-purple-400 px-3 py-1.5 rounded-full">→ view</span>
                    </div>
                </figure>
            ) : (
                <figure className="relative overflow-hidden shrink-0">
                    <div className={`w-full h-32 bg-gradient-to-br ${s.bg} flex flex-col items-center justify-center gap-2 px-3 relative`}>
                        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                        <h3 className="text-white font-bold text-xs text-center leading-snug relative z-10">{title}</h3>
                        <div className="flex flex-wrap justify-center gap-1 relative z-10">
                            {tags.slice(0, 2).map(tag => (
                                <span key={tag} className={`font-mono text-[8px] ${s.text} border ${s.border} px-1.5 py-0.5 rounded opacity-80`}>{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-purple-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-mono text-xs text-white border border-purple-400 px-3 py-1.5 rounded-full">→ view</span>
                    </div>
                </figure>
            )}

            <div className="px-3 py-3 flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${CATEGORY_DOT[category]}`} />
                    <h3 className="text-white font-bold text-xs group-hover:text-purple-300 transition-colors duration-200 leading-snug">{title}</h3>
                </div>
                <p className="text-gray-500 text-[10px] leading-relaxed flex-1 line-clamp-2">{tagline}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {tags.slice(0, 3).map(tag => (
                        <span key={tag} className="font-mono text-[9px] text-purple-400/70 border border-purple-900/50 bg-purple-950/20 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                    {tags.length > 3 && <span className="font-mono text-[9px] text-gray-600 px-1 py-0.5">+{tags.length - 3}</span>}
                </div>
            </div>
        </MotionLink>
    )
}

export default function ProjectTimeline() {
    const scrollRef = useRef(null)

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        const onWheel = (e) => {
            if (e.deltaY === 0) return
            const { scrollLeft, scrollWidth, clientWidth } = el
            const atLeftEnd  = scrollLeft <= 0 && e.deltaY < 0
            const atRightEnd = scrollLeft + clientWidth >= scrollWidth - 1 && e.deltaY > 0
            if (atLeftEnd || atRightEnd) return   // let page scroll naturally
            e.preventDefault()
            el.scrollLeft += e.deltaY
        }
        el.addEventListener("wheel", onWheel, { passive: false })
        return () => el.removeEventListener("wheel", onWheel)
    }, [])

    return (
        <div ref={scrollRef} className="timeline-scroll overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex" style={{ minWidth: "max-content" }}>
                {ENTRIES.map((entry, i) => (
                    <div key={entry.slug} className="flex flex-col shrink-0" style={{ width: CARD_W }}>

                        {/* ── TOP CARD AREA ── */}
                        <div
                            className="flex flex-col justify-end pb-3 px-2"
                            style={{ height: CARD_AREA }}
                        >
                            {entry.above && <TimelineCard {...entry} index={i} animDelay={i * 55} />}
                        </div>

                        {/* ── TIMELINE LINE + DOT + MONTH LABEL ── */}
                        <div className="relative flex items-center shrink-0" style={{ height: 48 }}>
                            {/* Full-width line */}
                            <div className="absolute inset-x-0 top-1/2 h-px bg-gray-700" />

                            {/* Month label badge — sits on the line at the start of each month */}
                            {entry.isFirstInMonth && (
                                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-20" style={{ top: 0 }}>
                                    {entry.isNewYear && (
                                        <span className="font-mono text-[10px] font-bold text-gray-300 mb-0.5">
                                            {entry.yearLabel}
                                        </span>
                                    )}
                                    <span className="font-mono text-[9px] text-gray-400 bg-gray-950 border border-gray-700 px-2 py-0.5 rounded-full uppercase tracking-widest">
                                        {entry.monthLabel}
                                    </span>
                                </div>
                            )}

                            {/* Dot */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gray-900 border-2 border-gray-500 z-10" />
                        </div>

                        {/* ── BOTTOM CARD AREA ── */}
                        <div
                            className="flex flex-col justify-start pt-3 px-2"
                            style={{ height: CARD_AREA }}
                        >
                            {!entry.above && <TimelineCard {...entry} index={i} animDelay={i * 55} />}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
