import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom"
import { getMovieDetailsCast } from "../../Api";
const notify = () => toast("Ups, try again");
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
  
const MovieCast = () => {
  const { movieId } = useParams();
  const [movieDetailsCast, setMovieDetailsCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovieDetailsCast = async (movieId) => {
      setError(false);
      setIsLoading(true);
      try {
        const data = await getMovieDetailsCast(movieId);
        setMovieDetailsCast(data.cast);
        setIsLoading(false);
      } catch (error) {
        notify(); 
        console.log(error);
        setError(true);
        
      }
   }
    fetchMovieDetailsCast(movieId);
  }, [movieId])

  console.log('movieDetailsCast', movieDetailsCast)
  // const {character, name, profile_path} = movieDetailsCast
  
  return (
    <>
       {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <ul>
      {
        movieDetailsCast.length > 0
          ? movieDetailsCast.map(({name, id, character, profile_path  }) => (
            <li key={id}>
              <img src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt="" />
              <h3>{name}</h3>
              <p>Character: {character}</p>
          </li>  
        ))
        : "Sorry"
      }
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
    </>
    
  )
}

export default MovieCast