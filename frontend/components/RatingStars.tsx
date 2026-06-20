"use client";

interface Props {
    onRate: (rating: number) => void;
}

export default function RatingStars({ onRate }: Props) {

    return (

        <div className="flex gap-2">

            {[1, 2, 3, 4, 5].map((star) => (

                <button

                    key={star}

                    onClick={() => onRate(star)}

                    className="text-3xl hover:scale-110 transition"

                >

                    ⭐

                </button>

            ))}

        </div>

    );

}