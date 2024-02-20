import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';


const LoginScreen = () => {
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
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});


export default LoginScreen;
