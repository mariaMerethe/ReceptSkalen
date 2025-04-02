import { Heart } from "lucide-react";

const ResultsComponent = ({recipes, error, loading, onSelectedMeal, searchTerm, favorites, toggleFavorite}) => {
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
            {showWelcome && (
                <div className="bg-accent text-white p-6 rounded-lg mb-8 shadow-md">
                    <h1 className="text-3xl font-bold font-archivo mb-2">Välkommen till ReceptSkålen</h1>
                    <p className="text-lg">
                        Hitta din nästa favoritmåltid – inspireras av handplockade recept!
                    </p>
                </div> 
            )}
            
            <h2 className="text-xl font-bold mt-4 mb-2">{title}</h2>

           {searchTerm.trim() === "" && (
                <p className="text-gray-600 mt-1 mb-4">
                    Här kommer några handplockade recept som kocken gillar extra mycket!
                </p>
           )}

            {error && (
                <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}
            
            {!error && recipes.length === 0 && (
                <p>Inga resultat än...</p>
            )}

            {!error && recipes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                            <h3 className="text-lg font-bold mt-2">{meal.strMeal}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultsComponent;