import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from './components/ImageViewer.js'; 
import Button from './components/Button.js';

const PlaceholderImage = require('./assets/favicon.png');

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const chooseImageOrigin = async () =>
    Alert.alert('Camera or Library', 'Would you like to upload an image using your Camera or from your Library?', [
      {text: 'Camera', onPress: takePhoto},
      {text: 'Photo Library', onPress: pickImageAsync},
      {text: 'Cancel', onPress: () => console.log('cancelled')},
    ]);  

  const takePhoto = async () => {
    //const {status} = ImagePicker.requestCameraPermissionsAsync();
    //if(status !== "granted"){
    //  alert("Sorry, permission not granted.")
    //}
    //else{
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        alert('You did not select any image.');
      }
    //}
  };

  const pickImageAsync = async () => {
    //const {status} = ImagePicker.requestMediaLibraryPermissionsAsync();
    //if(status !== "granted"){
      //alert("Sorry, not granted.")
    //}
    //else{
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        alert('You did not select any image.');
      }
    //}
  };

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={chooseImageOrigin} />
        <Button label="Use this photo" onPress={ImagePicker.launchCameraAsync()}/>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});