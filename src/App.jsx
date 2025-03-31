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
        setRecipes(data.meals);
        setSelectedMeal(data.meals[0]);
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

  return (
    <Router>
      <Header />
      <div className='min-h-screen bg-[#FFFEFC] text-gray-800 font-sans p-8'>

        <Routes>
          <Route path="/" element={
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* vänster kolumn */}
              <div className='lg:col-span-2 space-y-6'>
                <SearchComponent onSearch={setSearchTerm} />
                <ResultsComponent
                  recipes={recipes}
                  error={error}
                  loading={loading}
                  onSelectedMeal={handleSelectedMeal}
                  searchTerm={searchTerm}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </div>

              {/* höger kolumn */}
              <div>
                {selectedMeal && <MealDetailComponent meal={selectedMeal} />}
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
