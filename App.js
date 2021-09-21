import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
/* Navigation */
import NavigationStack from './navigation/NavigationStack'
import { SafeAreaProvider } from 'react-native-safe-area-context';


/* FONT */
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


/* DOWNLOAD FONTS */
const fetchFonts = () =>
  Font.loadAsync({
    'Laila-Bold': require('./assets/fonts/Laila-Bold.ttf'),
    'Laila-Regular': require('./assets/fonts/Laila-Regular.ttf'),
    'Laila-Light': require('./assets/fonts/Laila-Light.ttf'),
    'Laila-Medium': require('./assets/fonts/Laila-Medium.ttf'),
    'Laila-SemiBold': require('./assets/fonts/Laila-SemiBold.ttf'),
  });
const App = () => {
  const [dataLoaded, setDataLoaded] = React.useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationStack/>
    </SafeAreaProvider>
  )
}


export default App





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:30,
  },
  text:{
    fontFamily:"Laila-Bold"
  }
});
