import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../common/colors';
import { AppText } from '.';
import { Actor } from '../networking/MovieSDK';

interface Props {
  actor: Actor;
}

const ActorCard: React.FC<Props> = ({ actor }) => {

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: actor.image }}
        style={styles.image}
      />
      <View style={styles.namesView}>
        <AppText numberOfLines={2} size={12} center>{actor.originalName}</AppText>
        <AppText numberOfLines={2} size={12} center color={colors.fontSecondary}>{actor.castName}</AppText>
      </View>
    </View>
  );
}

export default ActorCard;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 190,
    marginRight: 8,
  },
  namesView: {
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: colors.imagePlaceholder,
  },
});
