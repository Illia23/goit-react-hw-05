import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
const MovieList = ({ data }) => {
    const location = useLocation();
    console.log('location', location)
    return (
        <ul>
            {data.map(movie => (
                <li key={movie.id}><Link to={`/movies/${movie.id}`} state={location }>{movie.original_title }</Link></li>
            ))}
        </ul>
  )
}

export default MovieList