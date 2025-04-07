const StarRating = ({ rating, onRate }) => {
    return (
        <div className="flex items-center space-x-1 mt-1">
            {Array.from({ length: 5 }, (_, i) => (
                <span
                    key={i}
                    className="cursor-pointer text-xl"
                    onClick={(e) => {
                        e.stopPropagation(); //hindra bubbling
                        onRate?.(i + 1);
                    }}
                >
                    {i < rating ? "★" : "☆"}
                </span>
            ))}
        </div>
    );
};

export default StarRating;