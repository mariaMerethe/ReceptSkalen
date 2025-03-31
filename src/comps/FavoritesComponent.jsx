import { useState } from "react";
import { Heart } from "lucide-react";

const FavoritesComponent = ({ favorites, onSelectedMeal, toggleFavorite }) => {
    //kopiera ursprungliga favorites EN gång
    const [visibleMeals] = useState(favorites);

    const isFavorite = (meal) => {
        return favorites.some((fav) => fav.idMeal === meal.idMeal);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mt-4 mb-2">Mina favoriter</h2>

            {visibleMeals.length === 0 ? (
                <p>Du har inga sparade favoriter än.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visibleMeals.map((meal) => (
                        <div
                            key={meal.idMeal}
                            className="card bg-base-100 shadow-md p-4 rounded-lg cursor-pointer hover:shadow-lg transition duration-200 relative"
                            onClick={() => onSelectedMeal(meal)}
                        >
                            {/*hjärtikon*/}
                            <div
                                className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-all duration-200 z-10"
                                onClick={(e) => {
                                    e.stopPropagation(); //förhindrar att kortet klickas
                                    toggleFavorite(meal); //togglar favorit
                                }}
                            >
                                <Heart 
                                    className={`w-6 h-6 ${
                                        isFavorite(meal)
                                            ? "fill-red-600 text-red-600"
                                            : "text-gray-400"
                                    }`} 
                                />
                            </div>

                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="w-full h-auto rounded-t-lg"
                            />
                            <h3 className="text-lg font-bold mt-2">{meal.strMeal}</h3>

                            {!isFavorite(meal) && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Receptet är inte längre en favorit – ladda om för att uppdatera listan
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesComponent;