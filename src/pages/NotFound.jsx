import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function NotFound() {
    const { t } = useTranslation()

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Grid texture */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-800 blur-[120px] opacity-10 rounded-full" />

            <div className="relative z-10 text-center max-w-md">
                {/* Terminal window */}
                <div className="border border-gray-800 bg-gray-900/40 rounded-lg overflow-hidden mb-8">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-800/60 bg-gray-900/60">
                        <span className="w-2 h-2 rounded-full bg-red-500/80" />
                        <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                        <span className="w-2 h-2 rounded-full bg-green-400/80" />
                        <span className="ml-auto font-mono text-[10px] text-gray-700">bash</span>
                    </div>
                    <div className="px-6 py-8">
                        <p className="font-mono text-sm text-gray-600 mb-4">
                            <span className="text-purple-400">$</span> cd {window.location.pathname}
                        </p>
                        <p className="font-mono text-sm text-red-400 mb-1">
                            bash: {window.location.pathname}: {t('notFound.noSuchFile')}
                        </p>
                        <p className="font-mono text-sm text-gray-700">
                            exit code: <span className="text-red-400">404</span>
                        </p>
                    </div>
                </div>

                <h1 className="text-7xl font-bold text-white mb-3 tracking-tight">
                    4<span className="text-purple-400">0</span>4
                </h1>
                <p className="text-gray-500 text-sm mb-8 font-mono">
                    {t('notFound.message')}
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-white border border-purple-700 py-2 px-6 hover:bg-purple-800 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] rounded-full text-sm font-mono transition-all duration-300"
                >
                    <span className="text-purple-400">$</span> {t('notFound.back')}
                </Link>
            </div>
        </div>
    )
}
