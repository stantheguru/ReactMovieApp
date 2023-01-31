import { useEffect, useState } from 'react';
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=8ff3a3d";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [isMovie, setIsMovie] = useState("")
  const [error, setError] = useState("")



  const searchMovies = async (title) => {
    setError("")
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search)
    setIsMovie(data.Response)
   
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, [])

  return (

    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder='Search for movies' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
      
        <img alt="search" onClick={searchTerm.length>2?() => searchMovies(searchTerm):()=>setError("Please enter search term (at least 3 characters)")} src={SearchIcon} />
      </div>
      <h4 style={{color:'red'}} className="error">{error}</h4>

      {isMovie==="True" ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          )

          )}

        </div>
      ) : (
        <div className='container'>
        <div className='empty'>
          <h2>No Movies Found</h2>
          </div>

        </div>
      )}

    </div>

  );
}

export default App;
