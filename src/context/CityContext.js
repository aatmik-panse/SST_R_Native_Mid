import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCity();
  }, []);

  const loadCity = async () => {
    try {
      const savedCity = await AsyncStorage.getItem('selectedCity');
      if (savedCity) {
        setCity(savedCity);
      }
    } catch (e) {
      console.error('Failed to load city', e);
    } finally {
      setLoading(false);
    }
  };

  const selectCity = async (cityName) => {
    try {
      if (cityName) {
        await AsyncStorage.setItem('selectedCity', cityName);
      } else {
        await AsyncStorage.removeItem('selectedCity');
      }
      setCity(cityName);
    } catch (e) {
      console.error('Failed to save city', e);
    }
  };

  return (
    <CityContext.Provider value={{ city, selectCity, loading }}>
      {children}
    </CityContext.Provider>
  );
};
