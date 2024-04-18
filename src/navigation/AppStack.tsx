import { createStackNavigator } from '@react-navigation/stack';
import { MovieDetails, MoviesList } from '../screens';
import { MainStackRoutes } from './routes';
import { stackConfig } from './configs';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={stackConfig}>
      <Stack.Screen
        name={MainStackRoutes.Home}
        component={MoviesList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MainStackRoutes.MovieDetails}
        component={MovieDetails}
        options={{
          title: 'Details',
        }}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
