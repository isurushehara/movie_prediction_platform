"use client";

import { useState } from "react";

interface Props {
    onRate: (rating: number) => void;
}

export default function RatingStars({ onRate }: Props) {

    const [hovered, setHovered] = useState(0);

    const [selected, setSelected] = useState(0);

    const handleClick = (rating: number) => {

        setSelected(rating);

        onRate(rating);

    };

    return (

        <div className="flex gap-2">

            {[1, 2, 3, 4, 5].map((star) => (

                <button

                    key={star}

                    onMouseEnter={() => setHovered(star)}

                    onMouseLeave={() => setHovered(0)}

                    onClick={() => handleClick(star)}

                    className="
                        text-5xl
                        transition-all
                        duration-200
                        hover:scale-125
                    "

                >

                    <span

                        className={

                            star <= (hovered || selected)

                                ? "text-yellow-400"

                                : "text-slate-500"

                        }

                    >

                        ★

                    </span>

                </button>

            ))}

        </div>

    );

}