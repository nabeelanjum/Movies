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

  // TODO: add param types //
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
            {!!movieDetails?.description && (
              <AppText style={styles.descriptionText}>
                {movieDetails?.description}
              </AppText>
            )}

            {!!movieDetails?.keywords?.length && (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ padding: 5 }}
                style={styles.keywordsView}
              >
                {movieDetails?.keywords?.map((keyword, index) => <KeywordChip key={index.toString()} word={keyword} />)}
              </ScrollView>
            )}

            {!!movieDetails?.actors?.length && (
              <View style={styles.sectionContainer}>
                <AppText style={styles.sectionTitle}>Cast</AppText>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  contentContainerStyle={{ padding: 5 }}
                >
                  {movieDetails?.actors?.map((actor, index) => <ActorCard key={index.toString()} actor={actor} />)}
                </ScrollView>
              </View>
            )}

            <View style={styles.sectionContainer}>
              <AppText style={styles.sectionTitle}>Rating</AppText>
              <View style={styles.ratingView}>
                <OctIcons name='star-fill' color={colors.themePrimary} size={28} />
                <AppText style={styles.ratingText}>
                  {movieDetails?.rating?.averageRating}
                  <AppText color={colors.fontSecondary}>/10</AppText>
                </AppText>
              </View>
              {!!movieDetails?.rating?.reviews?.length && (
                <View style={{ marginTop: 15 }}>
                  <AppText style={[styles.sectionTitle, { fontSize: 18 }]}>Featured reviews</AppText>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ padding: 5 }}
                  >
                    {movieDetails?.rating?.reviews?.map((review, index) => <ReviewCard key={index.toString()} review={review} />)}
                  </ScrollView>
                </View>
              )}
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
    backgroundColor: colors.imagePlaceholder,
  },
  body: {
    paddingHorizontal: 15,
  },
  descriptionText: {
    color: colors.fontSecondary,
    marginTop: 20,
  },
  keywordsView: {
    marginTop: 20,
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
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
