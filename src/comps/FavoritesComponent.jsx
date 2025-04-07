import { useState } from "react";
import { Heart } from "lucide-react";
import MealDetailComponent from "./MealDetailComponent";
import StarRating from "./StarRating";

const FavoritesComponent = ({ favorites, toggleFavorite, updateMealRating }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const isFavorite = (meal) => {
    return favorites.some((fav) => fav.idMeal === meal.idMeal);
  };

  const handleRate = (idMeal, newRating) => {
    updateMealRating(idMeal, newRating);
    const updated = favorites.find((m) => m.idMeal === idMeal);
    if (updated) setSelectedMeal({ ...updated, rating: newRating });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-xl font-bold mb-6">Mina favoriter</h2>

      {favorites.length === 0 ? (
        <p>Du har inga sparade favoriter än.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* vänster kolumn - kort */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((meal) => (
              <div
                key={meal.idMeal}
                className="card bg-white shadow-md p-4 rounded-lg cursor-pointer hover:shadow-lg transition duration-200 relative"
                onClick={() => setSelectedMeal(meal)}
              >
                {/* hjärta */}
                <div
                  className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-all duration-200 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(meal);
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

                {/* stjärnor */}
                <StarRating
                  rating={meal.rating || 0}
                  onRate={(newRating) => handleRate(meal.idMeal, newRating)}
                />

                <h3 className="text-lg font-bold mt-2">{meal.strMeal}</h3>

                {!isFavorite(meal) && (
                  <p className="text-sm text-gray-500 mt-2">
                    Receptet togs bort från listan – uppdatera sidan för att uppdatera listan.
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* höger kolumn - detaljvy */}
          <div>
            {selectedMeal && (
              <MealDetailComponent
                meal={selectedMeal}
                updateMealRating={handleRate}
              />
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default FavoritesComponent;
