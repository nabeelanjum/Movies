import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../networking/MovieSDK';

interface MovieState {
  randomMovies: Movie[];
  selectedMovie: Movie | null;
}

const initialState: MovieState = {
  randomMovies: [],
  selectedMovie: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setRandomMovies(state, action: PayloadAction<Movie[]>) {
      state.randomMovies = action.payload;
    },
    setSelectedMovie(state, action: PayloadAction<Movie | null>) {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setRandomMovies, setSelectedMovie } = movieSlice.actions;

export default movieSlice.reducer;
