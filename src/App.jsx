import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Navigation from "./components/Navigation/Navigation"

// import HomePage from "./pages/HomePage/HomePage"
// import MoviesPage from "./pages/MoviesPage/MoviesPage"
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage"
// import MovieCast from "./components/MovieCast/MovieCast"
// import MovieReviews from "./components/MovieReviews/MovieReviews"

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"));


import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import Loader from "./components/Loader/Loader"
const App = () => {
  return (
    <div >
      <Navigation />
       <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage /> } />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="reviews" element={<MovieReviews />} />
          <Route path="cast" element={<MovieCast />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
    </div>
  )
}

export default App