import { Text, View, TouchableOpacity, Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { callPostGatewayApi, callPostLambda } from '../src/request';
import { getHashKey } from '../src/generators';

import ImageViewer from '../components/ImageViewer.js'; 
import Button from '../components/Button.js';
import Logo from '../src/Icons/logo';
import { AuthContext } from '../src/AuthContext';
import { checkToken } from '../src/cookies';

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;
const PlaceholderImage = require('../assets/logo_green.png');

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

  const [user, setUser] = useState<string>("Guest");
  const [allergies, setAllergies] = useState([]);
  const [diet, setDiet] = useState("");
  const {userToken} = useContext(AuthContext);
  const [imageHash, setImageHash] = useState("");

  useEffect(() => {
    const checked = checkToken({userToken}.userToken);

		if (checked && typeof checked.login === 'string') {
			console.log('Login:', checked.login);
			setUser(checked.login);
      var data = {
          login: checked.login,
          item: 'diet'
      }
      callPostGatewayApi('get-history', data)
      .then(async result => {
          console.log(result.item);
          setDiet(result.item);
      })
      .catch(error => {
          console.error(error);
      });
      data = {
          login: checked.login,
          item: 'allergies'
      }
      callPostGatewayApi('get-history', data)
      .then(async result => {
          console.log(result.item);
          setAllergies(result.item);
      })
      .catch(error => {
          console.error(error);
      });
		}

	}, []);

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
      label: selectedKey,
      allergies: allergies,
      diet: diet
    }

    const response = callPostLambda(data)
      .then(result => {
        setStepsList(result.steps)
        setIngredientList(result.ingredients)
        setIsLoading(false)

        const currentDateTime = new Date()
        const formattedDateTime = currentDateTime.toLocaleString('en-US', {hour12: false})

        const historyData = {
          date: formattedDateTime,
          imageHash: imageHash,
          labels: detectedList.map(item => item.label),
          recepie: {
            ingredients: result.ingredients,
            steps: result.steps
          }
        }

        console.log("History: ", historyData);
        const data = {
          login: user,
          historyItem: historyData
        }

        callPostGatewayApi('dynamo-update', data)
          .then(result => {
            console.log(result)
          })
          .catch(error => {
            console.error(error)
          })
        
        console.log(response)
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
      const id = await getHashKey()
      setImageHash(id)
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

  const reset = () => {
    setSelectedImage(null);
    setIsChosen(false);
    setBase64("");
    setDetectedList(([]));
    setStepsList([]);
    setIngredientList([]);
    setIsLoading(false);
    setIsRecipe(false);
    setLabelChosen(false);
    setLabelsGenerated(false);
  }

  const chooseImageOrigin = async () => {
    Alert.alert('Camera or Library', 'Would you like to upload an image using your Camera or from your Library?', [
      {text: 'Camera', onPress: takePhoto},
      {text: 'Photo Library', onPress: pickImageAsync},
      {text: 'Cancel', onPress: () => console.log('cancelled')},
    ])};  

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
      
        <View style={styles.imageContainer}>
          {!isChosen &&
            <Logo width={windowWidth} height={440} />
          }
          
          {isChosen &&
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
          }
        </View>

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
            <Text style={styles.blank}></Text>
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
            <Text> </Text>
            <Button theme="third" label="Reset" onPress={reset}/>
          </View>
        }

      </ScrollView>
    </SafeAreaView>
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
  },
  blank: {
    flex: 1,
    fontSize: 10
  }
});