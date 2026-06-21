export default function Footer() {

    return (

        <footer
            className="
                bg-slate-900
                border-t
                border-slate-700
                mt-20
            "
        >

            <div className="max-w-7xl mx-auto px-8 py-8">

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Logo / Project Name */}

                    <div>

                        <h2 className="text-xl font-bold text-blue-400">

                            🎬 MovieAI

                        </h2>

                        <p className="text-slate-400 text-sm mt-1">

                            AI-Powered Movie Recommendation System

                        </p>

                    </div>

                    {/* Developer Info */}

                    <div className="text-center md:text-right">

                        <p className="text-slate-300">

                            Developed by <span className="font-semibold text-white">Isuru Shehara</span>

                        </p>

                    </div>

                </div>

                {/* Bottom Copyright */}

                <div className="border-t border-slate-800 mt-6 pt-6 text-center">

                    <p className="text-slate-500 text-sm">

                        © 2026 MovieAI Recommendation System. All Rights Reserved.

                    </p>

                </div>

            </div>

        </footer>

    );

}