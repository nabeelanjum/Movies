import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { MovieCard } from '../../components';
import useMovies from '../../hooks/useMovies';

const MoviesList: React.FC = () => {

  const { isLoading, fetchMovies, searchQuery, setSearchQuery, movies } = useMovies();

  return (
    <View style={styles.container}>
      <Searchbar
        style={{ margin: 15 }}
        placeholder='Search...'
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={fetchMovies}
        right={() => null}
      />
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
        refreshing={isLoading}
        onRefresh={fetchMovies}
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
