import { createStackNavigator } from '@react-navigation/stack';
import { MovieDetails, MoviesList } from '../screens';
import { MainStackRoutes } from './routes';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MainStackRoutes.Home}
        component={MoviesList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MainStackRoutes.MovieDetails}
        component={MovieDetails}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
