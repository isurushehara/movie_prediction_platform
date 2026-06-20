interface Props {

    value: string;

    onChange: (value: string) => void;

}

export default function SearchBar({

    value,

    onChange

}: Props) {

    return (

        <input

            type="text"

            placeholder="Search movies..."

            value={value}

            onChange={(e) => onChange(e.target.value)}

            className="border rounded-lg p-3 w-full"

        />

    );

}