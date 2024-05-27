import { getMovieDetailsReviews } from "../../Api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

const notify = () => toast("Ups try again!");

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieDetailsReviews, setMovieDetailsReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovieDetailsReviews = async (movieId) => {
      setError(false)
      setIsLoading(true)
      try { 
        const data = await getMovieDetailsReviews(movieId);
        setMovieDetailsReviews(data.results);
        setIsLoading(false);
      } catch (error) {
        notify();
        console.error(error); 
        setError(true);

      }
    }
  
    fetchMovieDetailsReviews(movieId);
  }, [movieId])
  console.log('movieDetailsReviews', movieDetailsReviews)
  return (
    <>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
    <ul>
      {
        movieDetailsReviews.length > 0
          ? movieDetailsReviews.map(({id, content, author }) => (
            <li key={id}>
              <p>{author }</p>
              <p>{content }</p>
          </li>
        )):"sorry"
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

export default MovieReviews