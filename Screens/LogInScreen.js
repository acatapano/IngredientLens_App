import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableHighlight, Text, StyleSheet, Alert } from 'react-native';
import Logo from '../src/Icons/logo';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {

    // add methoad to check databse
    if (username === 'example' && password === 'password') {
      // Successful login
      Alert.alert('Login Successful', 'Welcome!');
    } else {
      // Failed login
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

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
        value={username}
        onChangeText={text => setUsername(text)}
        textColor="white"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableHighlight onPress={handleLogin}>
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


export default LoginScreen;
