import React, {Component} from 'react';
import { Image, Linking, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Logo from '../src/Icons/logo';

export default function HomeScreen({ navigation }) {

  const githubURL = 'https://github.com/acatapano/IngredientLens_App';

    return (
        <View style={styles.container}>
          
          <View style={styles.logoContainer}>
            <Logo width={100} height={100} />
          </View>
  
          <Text style={styles.titleText}>
            Welcome to
            <Text style={styles.greenText}> Ingredient Lens</Text>
          </Text>
  
          <Text style={styles.baseText}>
            Use the power of AI to find recipes for dishes you've seen
          </Text>
  
          <Text style={styles.cookText}>
            Cook like a machine
          </Text>

          {/* indentation */}
          <Text></Text>

          <Text style={styles.baseText}>
            TUTORIAL
          </Text>

          <Text style={styles.infoText}>
            Swipe from left to right to navigate the app
          </Text>

          <Text style={styles.infoText}>
            Login to save recipes and set preferences
          </Text>

          <Text style={styles.infoText}>
            See Docs page for more info
          </Text>

          {/* <TouchableHighlight onPress={() => navigation.navigate("Docs")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Docs</Text>
            </View>
          </TouchableHighlight>
  
          <TouchableHighlight onPress={() => navigation.navigate("PopularDishes")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Popular Dishes</Text>
            </View>
          </TouchableHighlight>
  
          <TouchableHighlight onPress={() => navigation.navigate("Test")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Image Upload</Text>
            </View>
          </TouchableHighlight>
  
          <TouchableHighlight onPress={() => navigation.navigate("About")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>About</Text>
            </View>
          </TouchableHighlight>
  
          <TouchableHighlight onPress={() => Linking.openURL(githubURL)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>GitHub</Text>
            </View>
          </TouchableHighlight> */}
  
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
  titleText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    paddingBottom: 10,
  },
  baseText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 10,
  },
  cookText: {
    paddingBottom: 20,
    color: 'white',
    fontSize: 14,
  },
  greenText: {
    color: '#229A32',
  },
  infoText: {
    color: 'white',
    fontSize: 16,
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
  logoContainer: {
    marginBottom: 10,
    marginTop: -10
  }
});
