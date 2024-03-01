import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Screens/HomeScreen.js';
import Docs from './Screens/Docs.js';
import PopularDishes from './Screens/PopularDishes.js';
import ImageUpload from './Screens/ImageUpload.js';
import About from './Screens/About.js';
import createNewuserScreen from './Screens/createNewuserScreen.js';
import LogInScreen from './Screens/LogInScreen.js';
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LogInScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Docs" component={Docs} />
        <Drawer.Screen name="PopularDishes" component={PopularDishes} />
        <Drawer.Screen name="ImageUpload" component={ImageUpload} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}