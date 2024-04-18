import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../common/colors';
import { AppText } from '.';

interface Props {
  word: string;
}

const KeywordChip: React.FC<Props> = ({ word }) => (
  <View style={styles.container}>
    <AppText>{word}</AppText>
  </View>
);

export default KeywordChip;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 4,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    marginRight: 12,
  },
});
