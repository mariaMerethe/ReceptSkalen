const ResultsComponent = ({recipes, error, loading, onSelectedMeal, searchTerm}) => {
    if (loading) {
        return <p className="mt-2 text-blue-500 font-semibold">Laddar recept...</p>;
    }

    const title = searchTerm.trim() === "" ? "Kocken tipsar" : "Sökresultat";

    return (
        <div>
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
                            <img 
                                src={meal.strMealThumb} 
                                alt={meal.strMeal}
                                className="w-full h-auto rounded-lg"
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