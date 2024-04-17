import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Actor, Movie, Review } from '../../networking/MovieSDK';
import useMovieDetails from '../../hooks/useMovieDetails';
import colors from '../../common/colors';
import { ActorCard, AppText, KeywordChip, ReviewCard } from '../../components';

const MovieDetails: React.FC = () => {

  const route = useRoute();

  const movie: Movie = route?.params?.movie;

  const { isLoading, movieDetails } = useMovieDetails(movie['#IMDB_ID']);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.titleView}>
          <AppText style={styles.title}>{movie['#TITLE']}</AppText>
          <AppText style={styles.subTitle}>{movie['#YEAR']}</AppText>
        </View>

        <Image
          source={{ uri: movie['#IMG_POSTER'] }}
          style={styles.posterImage}
        />

        <View style={styles.body}>
          <AppText style={styles.descriptionText}>
            {movieDetails?.description}
          </AppText>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ padding: 5 }}
          >
            {movieDetails?.keywords?.map((keyword: string) => <KeywordChip word={keyword} />)}
          </ScrollView>

          <View style={styles.sectionContainer}>
            <AppText style={styles.sectionTitle}>Cast</AppText>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ padding: 5 }}
            >
              {movieDetails?.actors?.map((actor: Actor) => <ActorCard actor={actor} />)}
            </ScrollView>
          </View>

          <View style={styles.sectionContainer}>
            <AppText style={styles.sectionTitle}>Featured Reviews</AppText>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ padding: 5 }}
            >
              {movieDetails?.reviews?.map((review: Review) => <ReviewCard review={review} />)}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  titleView: {
    margin: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  subTitle: {
    color: colors.fontSecondary,
    marginTop: 8,
  },
  posterImage: {
    width: '100%',
    height: 220,
  },
  body: {
    paddingHorizontal: 15,
  },
  descriptionText: {
    color: colors.fontSecondary,
    marginVertical: 15,
  },
  keywordsView: {

  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 8,
  }
});
