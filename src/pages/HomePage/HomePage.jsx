import { getTrendingMovies } from "../../Api";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useLocation } from "react-router-dom";
import css from './HomePage.module.css'

const notify = () => toast("Ups try again!");

const HomePage = () => {
  const [trendingMovies, settrendingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setError(false);
      setIsLoading(true)

      try {
        const data = await getTrendingMovies();
        settrendingMovies(data.results)
        // console.log('data', data.results)
        setIsLoading(false);
      } catch (error) {
        notify();
        console.error(error);
        setError(true);
      }
    }
    fetchTrendingMovies();
  
    
  }, [])

  
  return (
    <div>
        {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <h1>Trending Today</h1>
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}><Link className={css.link} to={`/movies/${movie.id}`} state={location}>{movie.title }</Link></li>
        ))}
      </ul>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default HomePage

