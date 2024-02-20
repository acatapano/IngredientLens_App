import React, {Component} from 'react';
import { Alert, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
  
          <Image
            style={styles.imageLogo}
            source={require('../assets/logo_green.png')}
          />
  
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
  
          <TouchableHighlight onPress={() => navigation.navigate("ImageUpload")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Docs</Text>
            </View>
          </TouchableHighlight>
  
          <TouchableHighlight onPress={() => navigation.navigate("ImageUpload")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Popular Dishes</Text>
            </View>
          </TouchableHighlight>
  
          <TouchableHighlight onPress={() => navigation.navigate("ImageUpload")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Image Upload</Text>
            </View>
          </TouchableHighlight>
  
          <TouchableHighlight onPress={() => navigation.navigate("About")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>About</Text>
            </View>
          </TouchableHighlight>
  
          <TouchableHighlight onPress={() => navigation.navigate("ImageUpload")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>GitHub</Text>
            </View>
          </TouchableHighlight>
  
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
  imageLogo: {
    width: 100,
    height: 100,
  },
});
