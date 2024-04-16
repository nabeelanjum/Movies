import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { setRandomMovies } from '../../store/slices/movieSlice';
import movieSDK from '../../networking/MovieSDK';
import { MovieCard } from '../../components';

const MoviesList: React.FC = () => {

  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movie.movies);

  useEffect(() => {
    movieSDK.fetchMovies()
      .then((movies) => dispatch(setRandomMovies(movies)))
      .catch(error => console.error('Error fetching random movies:', error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item['#IMDB_ID']}
        renderItem={({ item }) => (
          <MovieCard
            title={item['#TITLE']}
            posterPath={item['#IMG_POSTER']}
            onPress={() => { }}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 15,
  }
});
