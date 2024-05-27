import { useState, useEffect } from "react"
import { getSearchMovies } from "../../Api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { ToastContainer, toast } from "react-toastify"
import css from './MoviesPage.module.css'
import 'react-toastify/dist/ReactToastify.css';


const notify = () => toast("Ups try again!");


const MoviesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchMovie, setSearchMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  

  useEffect(() => {
    const fetchSearchMovie = async () => {
      if (query.trim() === "") {
        return;
      }

      setError(false);
      setIsLoading(true)

      try {
        const data = await getSearchMovies(query);
        console.log('film', data)
        setSearchMovies(data.results)
        setIsLoading(false);

      } catch (error) {
        notify();
        console.error(error);
        setError(true);
      }
  }

    fetchSearchMovie();
  }, [query])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const topic = form.elements.topic.value;
    if (form.elements.topic.value.trim() === "") {
      toast.warn('Please enter search term!')
			return;
        }
    console.log('topic:', topic)
    handleSearch(topic);
    form.reset();

  }

    const handleSearch = (topic) => {
      setSearchParams({ query: topic });

  }
  
  return (
    <div >
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <MovieList data={searchMovie} />
      <form className={css.formContainer}  onSubmit={handleSubmit}>
        <input className={css.formInput} type="text" name="topic"  />
        <button className={css.formButton} type="submit">ok</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default MoviesPage