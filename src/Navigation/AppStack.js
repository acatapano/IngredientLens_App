import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from "react-native";

import CustomDrawer from "../../components/CustomDrawer.js";

import HomeScreen from '../../Screens/HomeScreen.js';
import Docs from '../../Screens/Docs.js';
import PopularDishes from '../../Screens/PopularDishes.js';
import About from '../../Screens/About.js';
import createNewuserScreen from '../../Screens/createNewuserScreen.js';
import LogInScreen from '../../Screens/LogInScreen.js';
import Test from "../../Screens/Test";

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} 
                          screenOptions={{
                            headerShown: false, 
                            drawerActiveBackgroundColor: '#008000',
                            drawerActiveTintColor: '#ffffff',
                            drawerInactiveTintColor: '#333',
                            drawerLabelStyle:styles.label}
                          }>
            <Drawer.Screen name="Home" component={HomeScreen} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                ) }}/>
            <Drawer.Screen name="Login" component={LogInScreen} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="log-in-outline" size={22} color={color} />
                ) }}/>
            <Drawer.Screen name="Docs" component={Docs} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="document-text-outline" size={22} color={color} />
                ) }}/>
            <Drawer.Screen name="Popular Dishes" component={PopularDishes} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="fast-food-outline" size={22} color={color} />
                ) }}/>
            <Drawer.Screen name="Image Upload" component={Test} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="cloud-upload-outline" size={22} color={color} />
                ) }}/>
            <Drawer.Screen name="About" component={About} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="help-circle-outline" size={22} color={color} />
                ) }}/>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    label: {
        marginLeft: -25,
        fontSize: 15
    }
});

export default AppStack;