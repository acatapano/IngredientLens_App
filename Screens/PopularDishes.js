import React, {Component} from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PopularDishes() {
    return (
        <View style={styles.container}>
            <Image source={require('../Screens/images_app/soup.jpg')} style={styles.buttonImage} />
            <Image source={require('../Screens/images_app/salad.jpg')} style={styles.buttonImage} />
            <Image source={require('../Screens/images_app/fruit.jpg')} style={styles.buttonImage} />
            <Image source={require('../Screens/images_app/vegetables.jpg')} style={styles.buttonImage} />
            <Image source={require('../Screens/images_app/sandwich.jpg')} style={styles.buttonImage} />
            <Image source={require('../Screens/images_app/hamburger.jpg')} style={styles.buttonImage} />
            <Image source={require('../Screens/images_app/pizza.jpg')} style={styles.buttonImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'black',
    },
    buttonImage: {
        width: 100,
        height: 100,
    },
});
