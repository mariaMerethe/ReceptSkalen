import './App.css'
import SearchComponent from './comps/SearchComponent'
import ResultsComponent from './comps/ResultsComponent'

function App() {

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>ReceptSkålen</h1>
      <SearchComponent />
      <ResultsComponent />
    </div>
  )
};

export default App;