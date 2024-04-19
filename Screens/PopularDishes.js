import React, {Component} from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PopularDishes() {

    const onPress = (imageSrc) => {
        const localURI = Image.resolveAssetSource(imageSrc).uri;
        Linking.openURL(localURI).catch(err =>
            console.error('An error occurred on press', err)
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Popular Dishes</Text>
            <Text style={styles.baseText}>Don't have a dish? Try uploading one of these!</Text>
            <Text style={styles.smallText}>Tap to Download</Text>

            <View style={styles.columns}>
                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/soup.jpg'))}>
                    <Image source={require('../Screens/images_app/soup.jpg')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/salad.jpg'))}>
                    <Image source={require('../Screens/images_app/salad.jpg')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/fruit.jpg'))}>
                    <Image source={require('../Screens/images_app/fruit.jpg')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/vegetables.jpg'))}>
                    <Image source={require('../Screens/images_app/vegetables.jpg')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/sandwich.jpg'))}>
                    <Image source={require('../Screens/images_app/sandwich.jpg')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/hamburger.jpg'))}>
                    <Image source={require('../Screens/images_app/hamburger.jpg')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/pizza.jpg'))}>
                    <Image source={require('../Screens/images_app/pizza.jpg')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/pasta.png'))}>
                    <Image source={require('../Screens/images_app/pasta.png')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/seafood.jpg'))}>
                    <Image source={require('../Screens/images_app/seafood.jpg')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/steak.jpeg'))}>
                    <Image source={require('../Screens/images_app/steak.jpeg')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/icecream.jpg'))}>
                    <Image source={require('../Screens/images_app/icecream.jpg')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPress(require('../Screens/images_app/cake.png'))}>
                    <Image source={require('../Screens/images_app/cake.png')} style={styles.buttonImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'black',
      paddingTop: 110,
    },
    buttonImage: {
        width: 120,
        height: 120,
    },
    columns: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        paddingBottom: 10,
    },
    baseText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        paddingBottom: 10,
    },
    smallText: {
        fontSize: 12,
        paddingBottom: 20,
        color: 'white',
      },
});
