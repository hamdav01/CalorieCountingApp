import React from 'react';
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

const getAllData = () => {
  AsyncStorage.getAllKeys().then((keys) => {
    return AsyncStorage.multiGet(keys)
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

const saveArticle = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    getAllData();
  } catch (e) {
    console.log(e);
  }
};

import { AntDesign } from '@expo/vector-icons';

export default function KcalSection() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header text={'Kcal Calculator'} />
        <View style={styles.saveButton}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('press');
            }}
          >
            <AntDesign name='save' size={34} color='black' />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Table data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { marginRight: 10, marginBottom: 10 },
  container: { marginTop: StatusBar.currentHeight || 0 },
});
