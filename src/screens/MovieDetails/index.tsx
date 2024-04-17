import { useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OctIcons from 'react-native-vector-icons/Octicons';
import { Actor, Movie, Review } from '../../networking/MovieSDK';
import useMovieDetails from '../../hooks/useMovieDetails';
import colors from '../../common/colors';
import { ActorCard, AppText, KeywordChip, ReviewCard } from '../../components';

const MovieDetails: React.FC = () => {

  const route = useRoute();
  const bottomSafe = useSafeAreaInsets().bottom;

  const movie: Movie = route?.params?.movie;

  const { isLoading, movieDetails } = useMovieDetails(movie['#IMDB_ID']);

  const loadingIndicator = useMemo(() => {
    return isLoading && (
      <View style={{ marginTop: 20 }}>
        <ActivityIndicator size='large' color={colors.fontSecondary} />
      </View>
    );
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: bottomSafe + 15 }}>
        <View style={styles.titleView}>
          <AppText style={styles.title}>{movie['#TITLE']}</AppText>
          <AppText style={styles.subTitle}>{movie['#YEAR']}</AppText>
        </View>

        <Image
          source={{ uri: movie['#IMG_POSTER'] }}
          style={styles.posterImage}
        />

        {loadingIndicator}

        {!isLoading && (
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
              <AppText style={styles.sectionTitle}>Rating</AppText>
              <View>
                <View style={styles.ratingView}>
                  <OctIcons name='star-fill' color={colors.yellow} size={28} />
                  <AppText style={styles.ratingText}>
                    {movieDetails?.rating?.averageRating}
                    <AppText color={colors.fontSecondary}>/10</AppText>
                  </AppText>
                </View>
              </View>
              <AppText style={[styles.sectionTitle, { fontSize: 18 }]}>Featured reviews</AppText>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ padding: 5 }}
              >
                {movieDetails?.rating?.reviews?.map((review: Review) => <ReviewCard review={review} />)}
              </ScrollView>
            </View>
          </View>
        )}
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
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 8,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginStart: 5,
    fontSize: 28,
  }
});
