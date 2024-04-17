import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Movie } from '../../networking/MovieSDK';
import useMovieDetails from '../../hooks/useMovieDetails';
import colors from '../../common/colors';
import { AppText } from '../../components';

const MovieDetails: React.FC = () => {

  const route = useRoute();

  const movie: Movie = route?.params?.movie;

  const { isLoading, movieDetails } = useMovieDetails(movie['#IMDB_ID']);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleView}>
          <AppText style={styles.title}>{movie['#TITLE']}</AppText>
          <AppText style={styles.subTitle}>{movie['#YEAR']}</AppText>
        </View>

        <Image
          source={{ uri: movie['#IMG_POSTER'] }}
          style={styles.posterImage}
        />

        <AppText style={styles.descriptionText}>
          {movieDetails?.short.description}
        </AppText>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ padding: 5 }}
        >
          {movieDetails?.short?.keywords?.split(',')?.map((keyword: string) => (
            <View style={styles.keywordChip}>
              <AppText>{keyword}</AppText>
            </View>
          ))}
        </ScrollView>

        <View>
          <AppText>
            Cast
          </AppText>
          <ScrollView horizontal>
          </ScrollView>
        </View>

      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  subTitle: {
    color: colors.fontSecondary,
    marginTop: 8,
  },
  posterImage: {
    width: '100%',
    height: 200,
  },
  titleView: {
    marginVertical: 20,
  },
  descriptionText: {
    color: colors.fontSecondary,
    marginVertical: 15,
  },
  keywordsView: {

  },
  keywordChip: {
    padding: 8,
    borderRadius: 4,
    shadowOpacity: 0.1,
    backgroundColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.fontSecondary,
    marginRight: 12,
  },
  castView: {

  },
});
