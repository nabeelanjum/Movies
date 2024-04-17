import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { RootState } from '../store';
import { setSelectedMovie } from '../store/slices/movieSlice';
import movieSDK, { MovieDetails } from '../networking/MovieSDK';

const useMovieDetails = (id: string) => {

  const dispatch = useDispatch();

  const movieDetails: MovieDetails | null = useSelector((state: RootState) => state.movie.selectedMovie);

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  const fetchMovieDetails = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const movieDetails = await movieSDK.getMovieDetails(id);
      dispatch(setSelectedMovie(movieDetails));
    } catch (e) {
      console.error(e);
      Toast.show({
        type: 'error',
        text1: e.toString()
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    isLoading,
    movieDetails,
  };

};

export default useMovieDetails;
