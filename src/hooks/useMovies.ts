import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { RootState } from '../store';
import { setMovies } from '../store/slices/movieSlice';
import movieSDK from '../networking/MovieSDK';

const useMovies = () => {

  const dispatch = useDispatch();

  const movies = useSelector((state: RootState) => state.movie.movies);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchMovies();
  }, []);

  // TODO: add saga or thunk (my 1st choice is thunk) and make action creators to separate out invoking APIs //

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const movies = searchQuery.trim()
        ? await movieSDK.searchMovies(searchQuery)
        : await movieSDK.fetchMovies();
      dispatch(setMovies(movies));
    } catch (e) {
      console.error(e);
      Toast.show({
        type: 'error',
        text1: e.toString()
      });
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  return {
    movies,
    fetchMovies,
    isLoading,
    searchQuery,
    setSearchQuery,
  };

};

export default useMovies;
