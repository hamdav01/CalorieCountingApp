import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Table from './components/item/Table';
import shortid from 'shortid';
import Header from './components/header/Header.js';

const data = [
  {
    id: shortid.generate(),
    name: 'Chicken',
    kcal: 200,
    grams: 20,
  },
  {
    id: shortid.generate(),
    name: 'Sallad',
    kcal: 20,
    grams: 60,
  },
  {
    id: shortid.generate(),
    name: 'Potatoes',
    kcal: 110,
    grams: 100,
  },
];

export default function KcalSection() {
  return (
    <View style={styles.container}>
      <Header text={'Kcal Calculator'} />
      <Table data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: StatusBar.currentHeight || 0 },
});
