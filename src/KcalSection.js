import React, { useEffect, useState, useReducer } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import Table from './components/item/Table';
import Header from './components/header/Header.js';

import { productReducer } from './reducers/ProductReducer';

export default function KcalSection() {
  const [currentData, dispatchData] = useReducer(productReducer, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header text={'Kcal Calculator'} />
      </View>
      <Table data={currentData} dispatchData={dispatchData} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { marginRight: 10, marginBottom: 10 },
  container: { marginTop: StatusBar.currentHeight || 0 },
});
