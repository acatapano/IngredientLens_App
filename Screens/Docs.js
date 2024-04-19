import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Docs() {

  const openBrowser = (url) => {
    Linking.openURL(url).catch(err =>
        console.error('An error occurred on press', err)
    );
  };

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>How to Use</Text>
        <Text style={styles.baseText}>1. Tap &quot;Image Upload&quot;</Text>
        <Text style={styles.baseText}>2. Upload an image of food</Text>
        <Text style={styles.baseText}>3. Tap &quot;Generate Labels&quot;</Text>
        <Text style={styles.baseText}>4. Choose what food to make</Text>
        <Text style={styles.baseText}>5. Tap &quot;Generate Recipes&quot;</Text>
        <Text style={styles.baseText}>6. Enjoy your recipe!</Text>
        <Text style={styles.baseText}>7. Repeat the process for a new recipe</Text>
        
        <Text></Text>
        
        <View style={styles.twocolumns}>
          <TouchableOpacity onPress={() => openBrowser('https://openai.com/chatgpt')}>
            <Image source={require('../Screens/images_app/chatgpt.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => openBrowser('https://aws.amazon.com/about-aws/')}>
            <Image source={require('../Screens/images_app/aws.jpg')} style={styles.buttonImage} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openBrowser('https://snack.expo.dev/')}>
            <Image source={require('../Screens/images_app/exposnack.png')} style={styles.buttonImage} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openBrowser('https://www.monmouth.edu/')}>
            <Image source={require('../Screens/images_app/mu_logo.png')} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'black',
    },
    baseText: {
      fontSize: 14,
      color: 'white',
      textAlign: 'center',
      paddingBottom: 10,
    },
    titleText: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      paddingBottom: 10,
    },
    button: {
      marginBottom: 20,
      width: 260,
      height: 60,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: 'green',
    },
    buttonText: {
      textAlign: 'center',
      padding: 20,
      color: 'white',
    },
    buttonImage: {
      width: 150,
      height: 150,
    },
    twocolumns: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'center',
    }
});
  