import React from 'react';
import { StyleSheet, View } from 'react-native';
import KcalSection from './src/KcalSection.js';

export default function App() {
  return (
    <View style={styles.container}>
      <KcalSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5DC',
  },
});
