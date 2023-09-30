import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalFetch from '../config/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  // Token'i AsyncStorage'den al ve duruma (state) kaydet.
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error("Token alma hatası: ", e);
      }

      setToken(userToken);
    };

    bootstrapAsync();
  }, []);

  const login = async (phone, password) => {
    try {
      const data = await globalFetch({
        endpoint: '/auth/login',
        body: {
          phone,
          password
        },
        method: 'POST'
      })

      if(data.token) {
        setUser({
          name: data.name,
          email: data.email,
          phone: data.phone,
          verify_phone: data.verify_phone,
          user: data.user
        });
        setToken(data.token);
        
        // Token'i AsyncStorage'ye kaydet
        await AsyncStorage.setItem('userToken', data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken('');
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
