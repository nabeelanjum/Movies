import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../components';

const ListEmptyComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppText size={18}>No Results</AppText>
      <AppText>Try refreshing or changing the search query</AppText>
    </View>
  );
}

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: '30%',
    alignItems: 'center',
  },
});
