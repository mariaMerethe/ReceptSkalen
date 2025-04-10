import { Heart } from "lucide-react";

const ResultsComponent = ({recipes, error, loading, onSelectedMeal, searchTerm, favorites, toggleFavorite, updateMealRating}) => {
    if (loading) {
        return <p className="mt-2 text-blue-500 font-semibold">Laddar recept...</p>;
    }

    const isFavorite = (meal) => {
        return favorites.some((fave) => fave.idMeal === meal.idMeal);
    };

    const showWelcome = searchTerm.trim() === "";
    const title = showWelcome ? "Kocken tipsar" : "Sökresultat";

    return (
        <div>
            {error && (
                <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}
            
            {!error && recipes.length === 0 && (
                <p>Inga resultat än...</p>
            )}

            {!error && recipes.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recipes.map((meal) => (
                        <div 
                            key={meal.idMeal} 
                            className="card bg-base-100 shadow-md p-4 rounded-lg cursor-pointer hover:shadow-lg transition duration-200"
                            onClick={() => onSelectedMeal(meal)} //gör korten klickbara
                        >
                            {/*hjärta från Lucide */}
                            <div
                                className="absolute top-10 right-10 cursor-pointer hover:scale-110 transition-all duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(meal);
                                }}
                            >
                                <Heart 
                                    className={`w-6 h-6 ${
                                        isFavorite(meal)
                                            ? "fill-red-600 text-red-600"
                                            : "text-white"
                                    }`}
                                />
                            </div>

                            <img 
                                src={meal.strMealThumb} 
                                alt={meal.strMeal}
                                className="w-full h-auto rounded-t-lg"
                            />

                            <div className="flex items-center space-x-1 mt-1" onClick={(e) => e.stopPropagation()}>
                                {Array.from({ length: 5}, (_, i) => (
                                    <span 
                                    key={i}
                                    className="cursor-pointer text-xl"
                                    onClick={() => updateMealRating(meal.idMeal, i + 1)}
                                    >
                                        {i < meal.rating ? "★" : "☆"}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-lg font-bold mt-2">{meal.strMeal}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultsComponent;