import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from './src/contexts/AuthContext';
import axios from 'axios';
import MainStack from './src/stacks/MainStack';
import AuthStack from './src/stacks/AuthStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font'
import { Text, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

const AppContainer = () => {
  const { token } = useContext(AuthContext);
  const [isTokenValid, setIsTokenValid] = useState(false);

  let [fontsLoaded] = useFonts({
        'euclidBold': require('./assets/fonts/Euclid_Circular_A_Bold.ttf'),
        'euclidItalic': require('./assets/fonts/Euclid_Circular_A_Italic.ttf'),
        'euclidLight': require('./assets/fonts/Euclid_Circular_A_Light.ttf'),
        'euclidMedium': require('./assets/fonts/Euclid_Circular_A_Medium.ttf'),
        'euclidRegular': require('./assets/fonts/Euclid_Circular_A_Regular.ttf'),
        'euclidSemiBold': require('./assets/fonts/Euclid_Circular_A_SemiBold.ttf'),
  })

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.post('YOUR_API_URL/checkToken', { token });
        if (response.data.valid) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        setIsTokenValid(false);
        console.error(error);
      }
    };

    // checkTokenValidity();
  }, [token]);

  if(!fontsLoaded) {
    return (
      <View>
        <Text>Fontlar yükleniyor</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => (
  <SafeAreaProvider>
    <RootSiblingParent>
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    </RootSiblingParent>
  </SafeAreaProvider>
);

export default App;
