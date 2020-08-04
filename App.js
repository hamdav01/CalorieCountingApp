import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Header from './src/components/header/Header.js';
import KcalSection from './src/KcalSection.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Header text={'Kcal Calculator'} />
      <KcalSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
});
