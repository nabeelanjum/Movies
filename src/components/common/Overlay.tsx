import React from 'react';
import { View } from 'react-native';
import colors from '../../common/colors';

const Overlay: React.FC<{}> = () => (
  <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: colors.overlay }} />
);

export default Overlay;
