import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { callPostGatewayApi, callPostLambda } from '../src/request';
import { getBase64, getHashKey } from '../src/generators';

import ImageViewer from '../components/ImageViewer.js'; 
import Button from '../components/Button.js';

const PlaceholderImage = require('../assets/logo_green.png');
const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;

const countries =[{
  key: 'United States'},
  {key: 'Turkey'},
  {key: 'Uganda'}
];

export default function Test({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChosen, setIsChosen] = useState(false);
  const [base64, setBase64] = useState<string>();
  const [detectedList, setDetectedList] = useState<Array<{ key: string, label: string, selected: boolean }>>([]);
  const [stepsList, setStepsList] = useState<Array<{ number: number, description: string }>>([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecipe, setIsRecipe] = useState(false);
  const [labelChosen, setLabelChosen] = useState(false);
  const [labelsGenerated, setLabelsGenerated] = useState(false);

  const handleListItemClick = (key: string) => {
    setDetectedList((prevList) =>
      prevList.map((detectedList) => ({
        ...detectedList,
        selected: detectedList.key === key
      }))
    )
	  setLabelChosen(true);
  }
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
	  //setFile(e.target.files?.[0]);
	  setDetectedList([]);
	  setIsChosen(false);
  }
  const handleRecipeClick = () => {
    setIsLoading(true)
	  setIsRecipe(true)
    console.log(detectedList)
    const selectedKey = detectedList.find((detectedList) => detectedList.selected)?.key

    console.log(selectedKey)
    const data = {
      label: selectedKey
    }

    const response = callPostLambda(data)
      .then(result => {
        setStepsList(result.steps)
        setIngredientList(result.ingredients)
        setIsLoading(false)
      })
      .catch(error => {
        console.error(error)
      })
    console.log(response)
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const b64 = base64
      const id = getHashKey()
      const data = {
        b_image: b64,
        bucket: 'gereral-bucket',
        key: `user-image/${id}.png`
      }

      if (!callPostGatewayApi('s3_upload', data)) {
        console.error("Picture wasn't uploaded to s3")
      }

      callPostGatewayApi('rekognision', data)
        .then(result => {
          interface DetectList {
            name: string
            confidence: number
          }
          const detected: DetectList[] = result.labels

          const dictionaryArray: Array<{ key: string, label: string, selected: boolean }> = []
          detected.forEach(element => {
            const dic = {
              key: element.name,
              label: element.name,
              selected: false
            }
            dictionaryArray.push(dic)
          })

          setDetectedList(dictionaryArray)
          setLabelsGenerated(true)
        })
        .catch(error => {
          console.error(error)
        })
    } catch (e: any) {
      console.error(e)
    }
  }

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
      base64: true,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setBase64(result.assets[0].base64)
      setIsChosen(true);
      setLabelChosen(false);
    }  else {
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
      base64: true,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setBase64(result.assets[0].base64)
      setIsChosen(true);
      setDetectedList([]);
	    setLabelChosen(false);
    } else {
      alert('You did not select any image.');
    }
    //}
  };

  const Item = ({ title }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={()=>handleListItemClick(title)}>
        <Text style={styles.label}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  const listItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.listItem}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
    {/* <View style={styles.container}> */}
      
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
        </View>

        {/* <View style={styles.listContainer}>
          <FlatList
            data={countries}
            renderItem={({item}) => <Item title={item.key} />}
            keyExtractor={item => item.key}
          />
        </View> */}

        {!labelsGenerated &&
        <View>
          <Button theme="primary" label="Choose a Photo" onPress={chooseImageOrigin} />
          {isChosen &&
            <Button theme="secondary" label="Generate Labels" onPress={onSubmit}/>}
        </View>}
      
        {labelsGenerated &&
          <View style={styles.listContainer}>
            <FlatList
              data={detectedList}
              renderItem={({item}) => <Item title={item.key} />}
              keyExtractor={item => item.key}
            />
          </View>
        }

        {labelChosen &&
          <View>
            <Button theme="secondary" label="Generate Recipe" onPress={handleRecipeClick}/>
          </View>
        }

        {!isLoading && isRecipe &&
          <View style={styles.listContainer}>
            <Text style={styles.title}>Ingredients:</Text>
            <FlatList
              data={ingredientList}
              renderItem={listItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <Text style={styles.title}>Steps:</Text>
            <FlatList
              data={stepsList}
              renderItem={listItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        }

      </ScrollView>
    </SafeAreaView>
      // <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  imageContainer: {
    
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  item: {
    backgroundColor: "#25292e",
    padding: 10,
    marginVertical: 0,
    width: windowWidth,
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  label: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center'
  },
  listItem: {
    fontSize: 20,
    color: '#ffffff',
  },
  title: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    paddingTop: 10,
    paddingLeft: 5
  }
});