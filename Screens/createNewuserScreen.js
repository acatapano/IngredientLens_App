import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateUserScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [allergies, setAllergies] = useState('');
  const [dislikedFoods, setDislikedFoods] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = () => {
    // Perform user creation logic here
    //need to store this top a database
    console.log('User created:', { email, username, allergies, dislikedFoods, password });
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Enter your username"
        autoCapitalize="none"
      />

      <Text>Allergies:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAllergies}
        value={allergies}
        placeholder="Enter any allergies"
      />

      <Text>Disliked Foods:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDislikedFoods}
        value={dislikedFoods}
        placeholder="Enter disliked foods"
      />

      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Button title="Create User" onPress={handleCreateUser} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default CreateUserScreen;
