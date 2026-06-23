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
        <div className="flex items-center gap-3">
            <div className="flex gap-1">
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
                                    ? "text-amber-400 drop-shadow-sm"
                                    : "text-stone-300"
                            }
                        >
                            ★
                        </span>
                    </button>
                ))}
            </div>

            {(hovered || selected) > 0 && (
                <span className="text-stone-500 font-medium text-sm">
                    {hovered || selected} / 5
                </span>
            )}
        </div>
    );
}