import './App.css'
import { useState, useEffect } from "react" 
import SearchComponent from './comps/SearchComponent'
import ResultsComponent from './comps/ResultsComponent'
import MealDetailComponent from "./comps/MealDetailComponent"

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null); //sparar klickad maträtt
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //anropa API:et när searchTerm ändras
    const fetchRecipes = async () => {
      try {
        setLoading(true); //visa laddar
        setError(null); //nollställ tidigare fel

        let data;

        if (searchTerm.trim()) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
          data = await response.json();
        } else {
          //hämta 3 slumpade recept parallellt
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

  //funktion för att hantera klick på en maträtt
  const handleSelectedMeal = (meal) => {
    setSelectedMeal(meal); //uppdaterar den valda maträtten
  };

  return (
    <div className='min-h-screen bg-neutral-100s text-gray-800 font-sans p-8 py-6'>
      <h1 className='text-3xl font-bold mb-12 text-center'>ReceptSkålen</h1>
      
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'> {/*div för innehåll */}
        {/*vänster kolumn */}
        <div className='lg:col-span-2 space-y-6'> {/*div för sökfält och sökresultat */}
          <SearchComponent onSearch={setSearchTerm} />
          <ResultsComponent 
            recipes={recipes} 
            error={error} 
            loading={loading} 
            onSelectedMeal={handleSelectedMeal} 
            searchTerm={searchTerm}
          />
        </div>

      {/*höger kolumn */}  
      <div>
        {selectedMeal && <MealDetailComponent meal={selectedMeal} />}
      </div>
    </div>
  </div>)
};

export default App;