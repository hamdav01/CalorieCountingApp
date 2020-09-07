import React, { useEffect, useState, useReducer } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import Table from './components/item/Table';
import shortid from 'shortid';
import Header from './components/header/Header.js';

import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { productReducer, ProductActions } from './reducers/ProductReducer';
import { compose, map, andThen } from 'ramda';

const initData = [
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

const getAndParseItem = compose(andThen(JSON.parse), AsyncStorage.getItem);
const mapGetAndParseItem = map(getAndParseItem);

const useAsynchStorage = () => {
  const [currentData, dispatchData] = useReducer(productReducer, initData);
  useEffect(() => {
    const getData = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const data = await Promise.all(mapGetAndParseItem(keys));
      dispatchData({ type: ProductActions.INIT, data });
    };
    getData();
  }, []);
  return [currentData, dispatchData];
};

const saveArticle = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

// initData.forEach(({ name, ...rest }) => {
// saveArticle(name, { name, ...rest });
//});

export default function KcalSection() {
  const [currentData, dispatchData] = useAsynchStorage();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header text={'Kcal Calculator'} />
        <View style={styles.saveButton}>
          <TouchableWithoutFeedback
            onPress={() => {
              currentData.forEach((data) => {
                saveArticle(data.name, data);
              });
              console.log('press');
            }}
          >
            <AntDesign name='save' size={34} color='black' />
          </TouchableWithoutFeedback>
        </View>
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
