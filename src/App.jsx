import './App.css'
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Header from './comps/Header';
import SearchComponent from './comps/SearchComponent'
import ResultsComponent from './comps/ResultsComponent'
import MealDetailComponent from './comps/MealDetailComponent'
import FavoritesComponent from './comps/FavoritesComponent'
import USPComponent from './comps/USPComponent';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null); // sparar klickad maträtt
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //anropa API bara när searchTerm ändras
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;

        if (searchTerm.trim()) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
          data = await response.json();
        } else {
          const responses = await Promise.all([
            fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
            fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
          ]);
          const jsonData = await Promise.all(responses.map(res => res.json()));
          data = { meals: jsonData.flatMap(res => res.meals) };
        }

        if (!data.meals) {
          setRecipes([]);
          setError("Inga träffar på sökningen.");
        } else {
          const mealsWithRatings = data.meals.map(meal => ({
            ...meal,
            rating: Math.floor(Math.random() * 5) + 1 //betyg mellan 1-5
          }));
          setRecipes(mealsWithRatings);
          setSelectedMeal(mealsWithRatings[0]);

          console.log(mealsWithRatings);
        }

      } catch (error) {
        console.error("Fel vid hämtning av recept:", error);
        setError("Ett tekniskt fel uppstod. Försök igen senare.");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  //funktion för att lägga till/ta bort favorit
  const toggleFavorite = (meal) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.idMeal === meal.idMeal);
      return exists ? prev.filter((fav) => fav.idMeal !== meal.idMeal) : [...prev, meal];
    });
  };

  //funktion för att hantera klick på en maträtt
  const handleSelectedMeal = (meal) => {
    setSelectedMeal(meal); //uppdaterar den valda maträtten
  };

  const updateMealRating = (idMeal, newRating) => {
    setRecipes(prev =>
      prev.map(meal =>
        meal.idMeal === idMeal ? { ...meal, rating: newRating } : meal
      )
    );
  };

  return (
    <Router>
      <Header />
      <div className='min-h-screen bg-[#FFFEFC] text-gray-800 font-sans p-8'>

        <Routes>
          <Route path="/" element={
            <div className='max-w-6xl mx-auto px-6 space-y-8'>

              {/* ENDA välkomstrutan */}
              <div className='bg-accent text-white rounded-lg p-6 shadow-md'>
                <h2 className='text-2xl font-bold'>Välkommen till ReceptSkålen</h2>
                <p className='mt-2'>Hitta din nästa favoritmåltid – inspireras av handplockade recept!</p>
              </div>

              <USPComponent />

              {/* Sökfält + titel ovanför grid-layouten */}
              <div className='space-y-2'>
                <SearchComponent onSearch={setSearchTerm} />
                <h2 className="text-xl font-bold">
                  {searchTerm.trim() === "" ? "Kocken tipsar" : "Sökresultat"}
                </h2>
                {searchTerm.trim() === "" && (
                  <p className="text-gray-600">
                    Här kommer några handplockade recept som kocken gillar extra mycket!
                  </p>
                )}
              </div>

              {/* 2 kolumner: vänster = kort, höger = detaljer */}
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>

                {/* vänster kolumn - receptkort */}
                <div className='lg:col-span-2'>
                  <ResultsComponent
                    recipes={recipes}
                    error={error}
                    loading={loading}
                    onSelectedMeal={handleSelectedMeal}
                    searchTerm={searchTerm}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    updateMealRating={updateMealRating}
                  />
                </div>

                {/* höger kolumn - detaljer */}
                <div>
                  {selectedMeal && <MealDetailComponent meal={selectedMeal} />}
                </div>

              </div>
            </div>
          } />
          
          {/* sida för favoriter */}
          <Route path="/favoriter" element={
            <FavoritesComponent
              favorites={favorites}
              onSelectedMeal={handleSelectedMeal}
              toggleFavorite={toggleFavorite}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;