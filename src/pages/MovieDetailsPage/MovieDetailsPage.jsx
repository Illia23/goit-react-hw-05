import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../Api";
import { NavLink, Outlet, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useLocation } from "react-router-dom";
import { useRef } from "react";
const notify = () => toast("Ups try again!");

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movie');
    useEffect(() => {
        const fetchMovieDetails = async () => {
                  setError(false);
            setIsLoading(true);

            try {
                const data = await getMovieDetails(movieId);
                setMovieDetails(data);
                setIsLoading(false);
            }
            catch(error) { 
              notify();
                console.error(error);
                setError(true);
            }
        }
        
        fetchMovieDetails();
    }, [movieId])

    const {original_title, overview, genres, poster_path, vote_average } = movieDetails;
    // console.log('Det', movieDetails)
    
  return (
      <div>
            {error && <Loader />}
            {isLoading && <ErrorMessage /> }
      <div>
        <Link to={backLinkRef.current} >
          Go Back
        </Link>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
              <div>
                  <h1>{original_title}</h1>
                  <p>Use score:{vote_average }</p>
                  <h2>Owerview</h2>
                  <p>{overview }</p>
                  <h3>Genres</h3>
                  <ul>
                      {genres &&
                        genres.length &&
                          genres.map(({ id, name }) => <li key={id}>{name}</li>)
                      }
                 </ul>
              </div>
          </div>
          <ul>
              <li><NavLink to="reviews">reviews</NavLink></li>
              <li><NavLink to="cast">cast</NavLink></li>
          </ul>
          <Outlet /> 
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

export default MovieDetailsPage