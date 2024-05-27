import axios from "axios";

// const Api_Key = "e7141518f899478ca1ca66789fb986f5";
const Token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzE0MTUxOGY4OTk0NzhjYTFjYTY2Nzg5ZmI5ODZmNSIsInN1YiI6IjY2NTI0NzVmYWQ0NzJkMmE1OGVjZDYzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OeNrCLLOk2LZms_2uLnSInOsRu3RpamB8cS0Y3790HE';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

 export const getTrendingMovies = async () => {
    const response = await axios.get('/trending/movie/day', {
         headers: {
    accept: 'application/json',
    Authorization: Token
  }
    })
    // console.log(response.data);
    return response.data;
    
}

export const getMovieDetails = async (movieId) => {
    const response = await axios.get(`/movie/${movieId}`, {
         headers: {
    accept: 'application/json',
    Authorization: Token
  }
    })
    // console.log(response.data);
    return response.data;
    
}

export const getMovieDetailsCast = async (movieId) => {
    const response = await axios.get(`movie/${movieId}/credits`, {
         headers: {
    accept: 'application/json',
    Authorization: Token
  }
    })
    return response.data;
}

export const getMovieDetailsReviews = async (movieId) => {
    const response = await axios.get(`movie/${movieId}/reviews`, {
         headers: {
    accept: 'application/json',
    Authorization: Token
  }
    })
    return response.data;
}

 export const getSearchMovies = async (topic) => {
    const response = await axios.get('/search/movie', {
         headers: {
    accept: 'application/json',
    Authorization: Token
      },
      params: {
        query: topic
      }
    })
    // console.log(response.data);
    return response.data;
    
}

