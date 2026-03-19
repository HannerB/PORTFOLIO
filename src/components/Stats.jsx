import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

function Counter({ value, suffix }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true
                    const duration = 1200
                    const steps = 40
                    const increment = value / steps
                    let current = 0
                    const timer = setInterval(() => {
                        current += increment
                        if (current >= value) {
                            setCount(value)
                            clearInterval(timer)
                        } else {
                            setCount(Math.floor(current))
                        }
                    }, duration / steps)
                }
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [value])

    return (
        <span ref={ref} className="text-4xl sm:text-5xl font-bold text-white tabular-nums">
            {count}{suffix}
        </span>
    )
}

export default function Stats() {
    const { t } = useTranslation()

    const stats = [
        { value: 18, suffix: "+", label: t('stats.projects') },
        { value: 25, suffix: "",  label: t('stats.technologies') },
        { value: 3,  suffix: "",  label: t('stats.companies') },
        { value: 2,  suffix: "+", label: t('stats.years') },
    ]

    return (
        <section className="relative py-14 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-gray-950 to-purple-950/20" />
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{ background: "linear-gradient(90deg, transparent, #8e6cf5 40%, #c744ec 60%, transparent)" }}
            />
            <div
                className="absolute bottom-0 left-0 w-full h-px"
                style={{ background: "linear-gradient(90deg, transparent, #8e6cf5 40%, #c744ec 60%, transparent)" }}
            />

            <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center gap-1">
                        <Counter value={stat.value} suffix={stat.suffix} />
                        <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.2em]">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}
