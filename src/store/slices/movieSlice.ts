import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails } from '../../networking/MovieSDK';

interface MovieState {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    setSelectedMovie(state, action: PayloadAction<MovieDetails | null>) {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setMovies, setSelectedMovie } = movieSlice.actions;

export default movieSlice.reducer;
