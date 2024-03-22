import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Screens/HomeScreen.js';
import Docs from './Screens/Docs.js';
import PopularDishes from './Screens/PopularDishes.js';
import About from './Screens/About.js';
import createNewuserScreen from './Screens/createNewuserScreen.js';
import LogInScreen from './Screens/LogInScreen.js';
import Test from './Screens/Test.tsx';

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LogInScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Docs" component={Docs} />
        <Drawer.Screen name="Popular Dishes" component={PopularDishes} />
        <Drawer.Screen name="Image Upload" component={Test} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}