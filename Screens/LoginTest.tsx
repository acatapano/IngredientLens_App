import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Image, TouchableHighlight, Text, StyleSheet, Alert } from 'react-native';
import Logo from '../src/Icons/logo';
import CreateUserScreen from './createNewuserScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { callPostGatewayApi, callPostLambda } from '../src/request';
import { createToken } from '../src/cookies';
import { AuthContext } from '../src/AuthContext';

export default function LoginTest({ navigation }) {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const {login} = useContext(AuthContext);
  const {logger} = useContext(AuthContext);

  const [isUserDataWrong, setIsUserDataWrong] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLoginClick = async () => {
    const data = {
      login: userLogin,
      password: userPassword
    }
    callPostGatewayApi("dynamo-get",data)
    .then(response => {
      if(response['status']){
        var token = createToken(userLogin);
        Alert.alert('Login Successful', 'Welcome!');
        navigation.navigate("Home");
        login(token);
        logger(token);
      }else{
        setIsUserDataWrong(true);
        console.log('called');
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    })
    .catch(error => {
      console.error(error);
    });

  }
  const handlePasswordChange = (e : any) => {
    setUserPassword(e.target.value);
  }
  const handleLoginChange = (e : any) => {
    setUserLogin(e.target.value);
  }

  return (
    
    <View style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Logo width={200} height={400} />
      </View>

      <Text style={styles.titleText}>
        Ingredient Lens
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        value={userLogin}
        onChangeText={text => setUserLogin(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry
        value={userPassword}
        onChangeText={text => setUserPassword(text)}
      />

      <TouchableHighlight onPress={handleLoginClick}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => navigation.navigate("createNewuserScreen")}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Create New User</Text>
        </View>
      </TouchableHighlight>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white'
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
  titleText: {
    textAlign: 'center',
    paddingBottom: 20,
    color: 'white',
    fontSize: 32,
  },
  placeholder: {
    color: "white"
  },
  logoContainer: {
    marginBottom: -85,
    marginTop: -85
  }
});