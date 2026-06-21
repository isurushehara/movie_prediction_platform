interface Props {

    value: string;

    onChange: (value: string) => void;

}

export default function SearchBar({

    value,

    onChange,

}: Props) {

    return (

        <input
            type="text"
            placeholder="Search movies..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
        w-full
        bg-slate-800
        border
        border-slate-700
        rounded-xl
        px-5
        py-4
        text-white
        placeholder-slate-500
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
    "
        />

    );

}