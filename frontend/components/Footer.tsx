export default function Footer() {
    return (
        <footer className="bg-white/60 backdrop-blur-xl backdrop-saturate-150 border-t border-stone-200 mt-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo / Project Name */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold text-stone-900 flex items-center justify-center md:justify-start gap-1.5">
                            <span>🎬</span>
                            <span>
                                Movie
                                <span className="bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">
                                    AI
                                </span>
                            </span>
                        </h2>

                        <p className="text-stone-500 text-sm mt-1">
                            AI-Powered Movie Recommendation System
                        </p>
                    </div>

                    {/* Developer Info */}
                    <div className="text-center md:text-right">
                        <p className="text-stone-600">
                            Developed by{" "}
                            <span className="font-semibold text-stone-900">
                                Isuru Shehara
                            </span>
                        </p>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="border-t border-stone-200 mt-6 pt-6 text-center">
                    <p className="text-stone-400 text-sm">
                        © 2026 MovieAI Recommendation System. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}