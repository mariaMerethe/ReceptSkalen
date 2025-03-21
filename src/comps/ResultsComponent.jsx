const ResultsComponent = ({recipes}) => {
    return (
        <div>
            <h2 className="text-xl font-bold mt-4">Sökresultat</h2>
            {recipes.length === 0 ? (
                <p>Inga resultat än...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {recipes.map((meal) => (
                        <div key={meal.idMeal} className="card bg-base-100 shadow-md p-4 rounded-lg">
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