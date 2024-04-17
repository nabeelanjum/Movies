import React, { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MovieCard } from '../../components';
import useMovies from '../../hooks/useMovies';
import colors from '../../common/colors';
import { MainStackRoutes } from '../../navigation/routes';

const MoviesList: React.FC = () => {

  const navigation = useNavigation();
  const bottomSafe = useSafeAreaInsets().bottom;

  const { isLoading, fetchMovies, searchQuery, setSearchQuery, movies } = useMovies();

  const renderHeader = useMemo(() => {
    // We could also have searchBar as ListHeaderComponent but to me it looks better in the Header itself //
    return (
      <View style={styles.headerContainer}>
        <SafeAreaView edges={['top']} />
        <View style={styles.headerContentContainer}>
          <Searchbar
            style={styles.searchBarContainer}
            placeholder='Search...'
            value={searchQuery}
            onChangeText={setSearchQuery}
            onBlur={fetchMovies}
            right={() => null}
          />
        </View>
      </View>
    );
  }, [searchQuery]);

  return (
    <>
      {renderHeader}
      <View style={styles.container}>
        <FlatList
          data={movies}
          keyExtractor={(item) => item['#IMDB_ID']}
          renderItem={({ item }) => (
            <MovieCard
              title={item['#TITLE']}
              posterPath={item['#IMG_POSTER']}
              onPress={() => navigation.navigate(MainStackRoutes.MovieDetails, { movie: item })}
            />
          )}
          contentContainerStyle={[styles.listContainer, { paddingBottom: bottomSafe + 15 }]}
          refreshing={isLoading}
          onRefresh={fetchMovies}
        />
      </View>
    </>
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  headerContainer: {
    backgroundColor: colors.white,
  },
  headerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 10,
  },
  searchBarContainer: {
    flex: 1,
    marginHorizontal: 25,
  },
});
