import { createStackNavigator } from '@react-navigation/stack';
import { MoviesList } from '../screens';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'MoviesList'} component={MoviesList} />
    </Stack.Navigator>
  );
}

export default AppStack;
