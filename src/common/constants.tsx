import { Dimensions } from 'react-native';
import { BaseToastProps, BaseToast } from 'react-native-toast-message';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;


export const toastConfigs = {
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 10,
        height: undefined,
      }}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      text1Props={{
        numberOfLines: 3,
      }}
      text2Props={{
        numberOfLines: 3,
      }}
    />
  ),
};
