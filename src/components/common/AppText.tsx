import React from 'react';
import { ColorValue, TextProps, Text as RNText, StyleSheet } from 'react-native';
import colors from '../../common/colors';

interface Props extends TextProps {
  center?: boolean;
  right?: boolean;
  size?: number;
  color?: ColorValue;
}

const AppText: React.FC<Props> = (props) => {

  const {
    center,
    right,
    style,
    size = 14,
    color = colors.fontPrimary,
    children,
  } = props;

  return (
    <RNText
      {...props}
      style={[
        styles.text,
        center && styles.center,
        right && styles.right,
        { fontSize: size },
        { color },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
});

export default AppText;
