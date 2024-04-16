import React from 'react';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import colors from '../common/colors';
import { AppText, Overlay } from '.';

interface Props {
  posterPath: string;
  title: string;
  onPress?: () => void;
}

const MovieCard: React.FC<Props> = (props) => {

  const {
    posterPath,
    title,
    onPress
  } = props;

  return (
    <Pressable
      onPress={() => onPress?.()}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.6 }]}
    >
      <ImageBackground
        source={{ uri: posterPath }}
        style={styles.posterContainer}
        resizeMode='cover'
      >
        <Overlay />
        <AppText style={styles.title}>{title}</AppText>
      </ImageBackground>
    </Pressable>
  );
}

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  posterContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  title: {
    margin: 20,
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
