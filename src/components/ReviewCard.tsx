import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../common/colors';
import { AppText } from '.';
import { Review } from '../networking/MovieSDK';

interface Props {
  review: Review;
}

const ReviewCard: React.FC<Props> = ({ review }) => {

  return (
    <View style={styles.container}>
      <AppText>{review.summary}</AppText>
      <AppText numberOfLines={7} style={styles.reviewText}>{review.text}</AppText>
    </View>
  );
}

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    width: 250,
    marginRight: 8,
    padding: 10,
    backgroundColor: colors.black,
    shadowOpacity: 0.2,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  reviewText: {
    marginTop: 5,
    color: colors.fontSecondary,
  }
});
