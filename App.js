import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen.js';
import Docs from './Screens/Docs.js';
import PopularDishes from './Screens/PopularDishes.js';
import ImageUpload from './Screens/ImageUpload.js';
import About from './Screens/About.js';
import Test from './Screens/Test.tsx'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Docs" component={Docs} />
        <Stack.Screen name="PopularDishes" component={PopularDishes} />
        <Stack.Screen name="ImageUpload" component={ImageUpload} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}