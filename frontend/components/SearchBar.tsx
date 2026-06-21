interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
    return (
        <div className="relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z"
                />
            </svg>

            <input
                type="text"
                placeholder="Search movies..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
          w-full
          bg-white
          border
          border-stone-200
          rounded-xl
          pl-12
          pr-12
          py-4
          text-stone-900
          placeholder-stone-400
          shadow-sm
          transition-colors
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-500
          focus:border-emerald-500
        "
            />

            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                    className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            h-6 w-6
            flex items-center justify-center
            rounded-full
            text-stone-400
            hover:text-stone-700
            hover:bg-stone-100
            transition-colors
          "
                >
                    ✕
                </button>
            )}
        </div>
    );
}