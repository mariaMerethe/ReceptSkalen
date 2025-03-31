const FavoritesComponent = ({ favorites, onSelectedMeal }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mt-4 mb-2">
                Mina favoriter
            </h2>
            {favorites.length === 0 ? (
                <p>Du har inga sparade favoriter än.</p>
            ) : (
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map((meal) => (
                        <div
                            key={meal.idMeal}
                            className="card bg-base-100 shadow-md p-4 rounded-lg cursor-pointer hover:shadow-lg transition duration-200"
                            onClick={() => onSelectedMeal(meal)}
                        >
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

export default FavoritesComponent;