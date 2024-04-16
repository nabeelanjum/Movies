import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import MovieSDK from '../../networking/MovieSDK';
import { RootState } from '../../store';
import { setRandomMovies } from '../../store/slices/movieSlice';

const movieSDK = new MovieSDK('https://search.imdbot.workers.dev');

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
        renderItem={({ item }) => <Text>{item['#TITLE']}</Text>}
      />
    </View>
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
