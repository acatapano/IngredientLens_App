// AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Create Context
export const AuthContext = createContext();

// 2. Provider Component
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const login = (token) => {
    setUserToken(token);
    AsyncStorage.setItem('userToken', token);
    console.log(userToken);
    console.log("logged in");
  }

  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    console.log("logged out");
  }

  const isLoggedIn = async () => {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
    } catch(e) {
      console.log('isLoggedIn error');
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};