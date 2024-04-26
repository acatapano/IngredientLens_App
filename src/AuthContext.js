// AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Create Context
export const AuthContext = createContext();

// 2. Provider Component
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      //console.log(userToken + " = new token");
      console.log("logged in");
      //console.log(await AsyncStorage.getItem('userToken'));
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const logger = (token) => {
    setUserToken(token);
    console.log("logger ", userToken);
  };

  const logout = async () => {
    try {
      setUserToken(null);
      await AsyncStorage.removeItem('userToken');
      console.log("logged out");
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  const isLoggedIn = async () => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch(e) {
      console.log('isLoggedIn error');
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, logger, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};