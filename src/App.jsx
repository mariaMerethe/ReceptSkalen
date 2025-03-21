import './App.css'
import SearchComponent from './comps/SearchComponent'
import ResultsComponent from './comps/ResultsComponent'
import { useState, useEffect } from "react"

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === "") return; //om söktermen är tom, gör inget API-anrop
  
    //anropa API:et när serachTerm ändras
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        setRecipes(data.meals || []); //spara resultaten, eller tom array om inga resultat
      } catch (error) {
        console.error("Fel vid hämtning av recept:", error);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>ReceptSkålen</h1>
      <SearchComponent onSearch={setSearchTerm} />
      <ResultsComponent recipes={recipes} />
    </div>
  )
};

export default App;